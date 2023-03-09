const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Cryptocurrency Insights Hub | Gear5`,
  image: `/insight.webp`,
  description: `Gear 5 for crypto insights with chart`
}

module.exports.getMetaTagInsight = () => getMetaTag(staticData.title, staticData.image, staticData.description)
