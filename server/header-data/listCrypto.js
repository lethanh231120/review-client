const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `All 2.3M+ Crypto Projects | Rating, Review & Details | Gear5`,
  description: `Discover Gear5's comprehensive list of 2,3M+ Crypto Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead!`,
  image: `%PUBLIC_URL%/logo.png`
}

module.exports.getMetaTagListCrypto = () => getMetaTag(staticData.title, staticData.description, staticData.image)
