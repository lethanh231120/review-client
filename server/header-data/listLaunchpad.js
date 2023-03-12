const { getMetaTag } = require('../modal/MetaTag')

const LIST_TITLE = `Top Crypto Launchpads List | Rating, Discuss & Details | Gear 5`
const LIST_DESCRIPTION = `Discover Gear5's comprehensive list of Crypto Launchpads includes detailed ratings, discuss, and essential information on each project and helping you make informed investment decision. `

const staticData = {
  title: LIST_TITLE,
  image: `/list-launchpad.webp`,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListLaunchpad = () => getMetaTag(staticData.title, staticData.image, staticData.description)
