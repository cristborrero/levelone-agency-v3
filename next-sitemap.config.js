/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://leveloneagency.co.uk",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: [
    "/api/*",
    "/privacy",
    "/terms",
    "/robots.txt",
    "/sitemap.xml",
    "/sitemap-0.xml",
    "/icon.png",
    "/og-image.webp",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://leveloneagency.co.uk/sitemap.xml"],
  },
};
module.exports = config;
