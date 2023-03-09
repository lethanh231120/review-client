const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `All [count] ICO / IDO / IEO Projects| Gear5`,
  image: `/list-soon.webp`,
  description: `Discover Gear5's comprehensive list of ICO/IDO/IEO Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead!`
}

module.exports.getMetaTagListSoon = () => getMetaTag(staticData.title, staticData.image, staticData.description)
