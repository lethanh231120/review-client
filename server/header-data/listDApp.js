const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Top Dapp Projects List | Rating, Review & Details | Gear5`,
  description: `Discover Gear5's comprehensive list of [Count] Dapp Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead!`,
  image: `%PUBLIC_URL%/logo.png`
}

module.exports.getMetaTagListDApp = () => getMetaTag(staticData.title, staticData.description, staticData.image)
