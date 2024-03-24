import bs4
import requests

host = "https://download.pytorch.org"

resp = requests.get(f"{host}/whl/torch/")
resp.raise_for_status()

soup = bs4.BeautifulSoup(resp.text, "html.parser")
for a in soup.find_all("a"):
    print(a.get("href"), a.text)
