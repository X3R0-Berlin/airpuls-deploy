/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://airimpuls.de",
  generateRobotsTxt: false, // We have a manual robots.txt
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],
  additionalPaths: async () => [
    { loc: "/", changefreq: "daily", priority: 1.0 },
    { loc: "/produkte", changefreq: "weekly", priority: 0.9 },
    { loc: "/product/vitair", changefreq: "weekly", priority: 0.9 },
    { loc: "/product/solitair", changefreq: "weekly", priority: 0.8 },
    { loc: "/product/preventair", changefreq: "weekly", priority: 0.7 },
    { loc: "/kontakt", changefreq: "monthly", priority: 0.6 },
    { loc: "/faq", changefreq: "monthly", priority: 0.6 },
    { loc: "/impressum", changefreq: "yearly", priority: 0.3 },
    { loc: "/datenschutz", changefreq: "yearly", priority: 0.3 },
    { loc: "/agb", changefreq: "yearly", priority: 0.3 },
    { loc: "/widerruf", changefreq: "yearly", priority: 0.3 },
    { loc: "/versand", changefreq: "monthly", priority: 0.5 },
  ],
};
