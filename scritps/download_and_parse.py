import json

import bs4
import requests
from loguru import logger

host = "https://download.pytorch.org"


def gen_record(filename: str, uri: str):
    ret = {
        "filename": filename,
        "url": f"{host}{uri}",
    }
    assert filename.startswith("torch-") and filename.endswith(".whl")
    filename = filename[len("torch-"):-len(".whl")]
    parts = filename.split("-")
    assert len(parts) == 4
    # parse version and device
    python1, python2 = parts[1], parts[2]
    os_and_arch = parts[-1]
    version = parts[0]
    if '+' in version:
        version, device = version.split("+")
    else:
        # if not specific device, use cpu, and os must be macosx or arch must be aarch64
        assert os_and_arch.startswith("macosx") or os_and_arch.endswith("aarch64")
        device = "cpu"
    return ret


def main():
    resp = requests.get(f"{host}/whl/torch/")
    resp.raise_for_status()
    soup = bs4.BeautifulSoup(resp.text, "html.parser")
    records = {}
    for a in soup.find_all("a"):
        filename = a.text
        if filename in records:
            continue
        try:
            if filename.startswith("torch-2.0.0-1"):  # skip this version
                continue
            records[filename] = (gen_record(filename, a.get("href")))
        except Exception as e:
            logger.exception(filename, e)
    with open("records.json", "w") as f:
        json.dump(records, f, indent=2)


if __name__ == '__main__':
    main()
