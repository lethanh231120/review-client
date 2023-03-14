const { getMetaTag } = require('../modal/MetaTag')

const LIST_TITLE = `Crypto Launchpads Projects List | Review, Discuss & Details | Gear 5`
const IMAGE = `/list-launchpad.webp`
const LIST_DESCRIPTION = `Discover Gear5's comprehensive list of Crypto Launchpads includes detailed ratings, reviews, and essential information on each project and helping you make informed investment decision.`

const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListLaunchpad = () => getMetaTag(staticData.title, staticData.image, staticData.description)
