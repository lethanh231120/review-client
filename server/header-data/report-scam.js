const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Report Project | Gear5`,
  image: `/report-scam.webp`,
  description: `Found any Crypto Project Suspicious, Scammed or Honeypot? Raise your voice HERE to warn other Investors to make a better Cryptocurrency Community `
}

module.exports.getMetaTagReportScam = () => getMetaTag(staticData.title, staticData.image, staticData.description)
