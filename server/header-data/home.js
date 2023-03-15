const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Gear 5: 99%+ Scam/Dead Crypto Projects Among Total Of 2,3M+ | Discuss, Review & Details`,
  image: `/logo.webp`,
  description: `Stay up-to-date on the latest cryptocurrency trends, Gear5 provide in-depth reviews and comprehensive information on 2,3M+ cryptocurrencies, helping you make well-informed investment decisions. `
}

module.exports.getMetaTagHome = () => getMetaTag(staticData.title, staticData.image, staticData.description)
