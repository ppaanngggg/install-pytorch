import { MetadataRoute } from "next";
import { labels } from "@/app/utils/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl: string = "https://install.pytorch.site/";
  const sitemaps: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
  for (const device of labels.device) {
    const params: URLSearchParams = new URLSearchParams();
    params.set("device", device);
    sitemaps.push({
      url: `${baseUrl}?${params.toString()}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
  }
  for (const python of labels.python) {
    const params: URLSearchParams = new URLSearchParams();
    params.set("python", python);
    sitemaps.push({
      url: `${baseUrl}?${params.toString()}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
  }
  for (const os of labels.os) {
    const params: URLSearchParams = new URLSearchParams();
    params.set("os", os);
    sitemaps.push({
      url: `${baseUrl}?${params.toString()}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
  }
  for (const arch of labels.arch) {
    const params: URLSearchParams = new URLSearchParams();
    params.set("arch", arch);
    sitemaps.push({
      url: `${baseUrl}?${params.toString()}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    });
  }

  return sitemaps;
}
