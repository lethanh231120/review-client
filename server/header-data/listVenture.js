const { getMetaTag } = require('../modal/MetaTag')

const LIST_TITLE = `Top Crypto Ventures List | Rating, Review & Details | Gear5`
const LIST_DESCRIPTION = `Discover Gear5's comprehensive list of Crypto Venture projects includes detailed ratings, reviews, and essential information on each project and helping you make informed investment decision!`

const staticData = {
  title: LIST_TITLE,
  image: `/list-venture.webp`,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListVenture = () => getMetaTag(staticData.title, staticData.image, staticData.description)
