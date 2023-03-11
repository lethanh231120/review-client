const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Gear 5 | 99%+ Marked As Scam or Dead/2,3M+ Crypto Projects`,
  image: `/logo.webp`,
  description: `Stay up-to-date on the latest cryptocurrency trends, Gear5 provide in-depth reviews and comprehensive information on 2,3M+ cryptocurrencies, helping you make well-informed investment decisions.`
}

module.exports.getMetaTagHome = () => getMetaTag(staticData.title, staticData.image, staticData.description)
