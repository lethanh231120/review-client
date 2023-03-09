const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Gear 5: Explore 2,3M+ Crypto Projects and [Number]+ Marked As Scam/Dead!`,
  image: `/list-venture.webp`,
  description: `Stay up-to-date on the latest cryptocurrency trends, Gear5 provide in-depth reviews and comprehensive information on 2,3M+ cryptocurrencies, helping you make well-informed investment decisions.`
}

module.exports.getMetaTagListVenture = () => getMetaTag(staticData.title, staticData.image, staticData.description)
