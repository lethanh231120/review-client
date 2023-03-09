const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Top Crypto Launchpads List | Rating, Reviews & Details | Gear 5`,
  description: `Discover Gear5's comprehensive list of Crypto Launchpads includes detailed ratings, reviews, and essential information on each project and helping you make informed investment decision. `,
  image: `%PUBLIC_URL%/logo.png`
}

module.exports.getMetaTagListLaunchpad = () => getMetaTag(staticData.title, staticData.description, staticData.image)
