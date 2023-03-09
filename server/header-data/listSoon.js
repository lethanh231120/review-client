const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `All [count] ICO / IDO / IEO Projects| Gear5`,
  description: `Discover Gear5's comprehensive list of [Count] ICO/IDO/IEO Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead!`,
  image: `%PUBLIC_URL%/logo.png`
}

module.exports.getMetaTagListSoon = () => getMetaTag(staticData.title, staticData.description, staticData.image)
