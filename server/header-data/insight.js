const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Cryptocurrency Insights Hub | Gear5`,
  description: ``,
  image: `%PUBLIC_URL%/logo.png`
}

module.exports.getMetaTagInsight = () => getMetaTag(staticData.title, staticData.description, staticData.image)
