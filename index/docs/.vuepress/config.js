module.exports = {
  title: "网址导航",
  theme: "antdocs",
  base: "/",
  // base: process.env.NODE_ENV === "production" ? './' : '/',
  dest: "public",
  head: [
    ["link", { rel: "icon", href: "/assets/logo.svg" }],
    ["script", { type: "text/javascript", src: "/assets/js/push.js" }],

    ["meta", { name: "referrer", content: "never" }],
  ],
  plugins: {
    "@vuepress/active-header-links": {},
    "sitemap": {
      hostname: "https://kukuqi666.github.io/sitemap/"
    },
    "@vssue/vuepress-plugin-vssue": {
      // 设置 `platform` 而不是 `api`
      platform: "github",

      // 其他的 Vssue 配置
      owner: "keac",
      repo: "wiki-talk",
      clientSecret: "GITHUB_ClientSecret",
      autoCreateIssue: true
    }
  },
  markdown: {
    lineNumbers: true,
    anchor: {
      permalinkBefore: false
    }
  },
  themeConfig: {
    backToTop: true,
    smoothScroll: true,
    logo: "/assets/logo.svg",
    nav: require("./config/nav"),
    sidebarDepth: 0,
    activeHeaderLinks: false,
    lastUpdated: "上次更新",
    repo: "https://github.com/kukuqi666",
    editLinks: false,
  }
};
