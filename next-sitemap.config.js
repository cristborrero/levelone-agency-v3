/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://leveloneagency.co.uk",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/privacy", "/terms"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
module.exports = config;
