import json

import bs4
import requests
from loguru import logger

"""
Detail Docs:
https://pytorch.org/get-started/previous-versions/
"""

host = "https://download.pytorch.org"

python_table = {
    "cp27": "Python 2.7",
    "cp35": "Python 3.5",
    "cp36": "Python 3.6",
    "cp37": "Python 3.7",
    "cp38": "Python 3.8",
    "cp39": "Python 3.9",
    "cp310": "Python 3.10",
    "cp311": "Python 3.11",
    "cp312": "Python 3.12",
}

device_table = {
    "cpu": "CPU",
    "cpu.cxx11.abi": "CPU with CXX11 ABI",
    "cpu-cxx11-abi": "CPU with CXX11 ABI",
    "cu75": "CUDA 7.5",
    "cu80": "CUDA 8.0",
    "cu90": "CUDA 9.0",
    "cu91": "CUDA 9.1",
    "cu92": "CUDA 9.2",
    "cu100": "CUDA 10.0",
    "cu101": "CUDA 10.1",
    "cu102": "CUDA 10.2",
    "cu110": "CUDA 11.0",
    "cu111": "CUDA 11.1",
    "cu113": "CUDA 11.3",
    "cu115": "CUDA 11.5",
    "cu116": "CUDA 11.6",
    "cu117": "CUDA 11.7",
    "cu117_pypi_cudnn": "CUDA 11.7 with cuDNN",
    "cu118": "CUDA 11.8",
    "cu121": "CUDA 12.1",
    "cu121_pypi_cudnn": "CUDA 12.1 with cuDNN",
    "rocm3.7": "ROCm 3.7",
    "rocm3.8": "ROCm 3.8",
    "rocm3.10": "ROCm 3.10",
    "rocm4.0.1": "ROCm 4.0.1",
    "rocm4.1": "ROCm 4.1",
    "rocm4.2": "ROCm 4.2",
    "rocm4.3.1": "ROCm 4.3.1",
    "rocm4.5.2": "ROCm 4.5.2",
    "rocm5.0": "ROCm 5.0",
    "rocm5.1.1": "ROCm 5.1.1",
    "rocm5.2": "ROCm 5.2",
    "rocm5.3": "ROCm 5.3",
    "rocm5.4.2": "ROCm 5.4.2",
    "rocm5.5": "ROCm 5.5",
    "rocm5.6": "ROCm 5.6",
    "rocm5.7": "ROCm 5.7",
}

macos_table = {
    "macosx_10_6": "macOS 10.6",
    "macosx_10_7": "macOS 10.7",
    "macosx_10_9": "macOS 10.9",
    "macosx_11_0": "macOS 11.0",
    "macosx_11_1": "macOS 11.1",
}

arch_table = {
    "x86_64": "x86_64",
    "amd64": "x86_64",
    "aarch64": "arm64",
    "arm64": "arm64",
}


def gen_record(filename: str, uri: str):
    # get sha256 and url
    url = f"{host}{uri}"
    uri, sha256 = uri.split("#")
    assert sha256.startswith("sha256=")
    ret = {"url": url}
    # split filename
    assert filename.startswith("torch-") and filename.endswith(".whl")
    filename = filename[len("torch-") : -len(".whl")]
    parts = filename.split("-")
    assert len(parts) == 4
    # clean python
    python1, python2 = parts[1], parts[2]
    if python2 != "none":
        assert python2.startswith(python1)
    python = python_table[python1]
    ret["python"] = python
    # clean version
    version = parts[0]
    if "+" in version:
        version, _ = version.split("+")
    ret["version"] = version
    # clean device
    assert uri.startswith("/whl/")
    device = uri[len("/whl/") :]
    if device.startswith("torch-"):
        device = "CPU"
    else:
        device = device.split("/", maxsplit=1)[0]
        device = device_table[device]
    ret["device"] = device
    # parse os and arch
    os_and_arch = parts[3]
    if "linux" in os_and_arch:
        os = "Linux"
        if "x86_64" in os_and_arch:
            arch = "x86_64"
        elif "aarch64" in os_and_arch:
            arch = "aarch64"
        else:
            raise ValueError(f"Unknown os_and_arch: {os_and_arch}")
    elif "macosx" in os_and_arch:
        if "x86_64" in os_and_arch:
            arch = "x86_64"
            os = os_and_arch[: -len("_x86_64")]
        elif "arm64" in os_and_arch:
            arch = "arm64"
            os = os_and_arch[: -len("_arm64")]
        else:
            raise ValueError(f"Unknown os_and_arch: {os_and_arch}")
        os = macos_table[os]
    elif "win" in os_and_arch:
        os = "Windows"
        _, arch = os_and_arch.split("_", maxsplit=1)
    else:
        raise ValueError(f"Unknown os_and_arch: {os_and_arch}")
    ret["os"] = os
    ret["arch"] = arch_table[arch]
    return ret


def main():
    resp = requests.get(f"{host}/whl/torch/")
    resp.raise_for_status()
    soup = bs4.BeautifulSoup(resp.text, "html.parser")
    records = []
    for a in soup.find_all("a"):
        filename = a.text
        try:
            if filename.startswith("torch-2.0.0-1"):  # skip this version
                continue
            records.append(gen_record(filename, a.get("href")))
        except Exception as e:
            logger.exception(filename, e)
    records.sort(
        key=lambda x: (x["version"], x["python"], x["device"], x["os"], x["arch"]),
        reverse=True,
    )
    for i, record in enumerate(records):
        record["id"] = str(i)
    with open("../public/records.json", "w") as f:
        json.dump(records, f, indent=2)


if __name__ == "__main__":
    main()
