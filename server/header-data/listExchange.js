const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Top Crypto Exchanges List | Rating, Review & Details | Gear5`,
  image: `/list-exchange.webp`,
  description: `Discover Gear5's comprehensive list of Crypto Exchanges projects includes detailed ratings, reviews, and essential information on each project and helping you make informed investment decision!`
}

module.exports.getMetaTagListExchange = () => getMetaTag(staticData.title, staticData.image, staticData.description)
