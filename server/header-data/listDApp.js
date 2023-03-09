const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Top Dapp Projects List | Rating, Review & Details | Gear5`,
  image: `/list-dApp.webp`,
  description: `Discover Gear5's comprehensive list of 12K+ Dapp Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead!`
}

module.exports.getMetaTagListDApp = () => getMetaTag(
  staticData.title,
  staticData.image,
  staticData.description
)
