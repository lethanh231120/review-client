const { getMetaTag } = require('../modal/MetaTag')

const LIST_TITLE = `Gear5 Data Insights in Cryptocurrency | Gear5`
const LIST_DESCRIPTION = `Get powerful insights into the world of cryptocurrency with Gear5's data analytics tools. Stay ahead of the game and make informed investment decisions today!`

const staticData = {
  title: LIST_TITLE,
  image: `/insight.webp`,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagInsight = (uniqueLink) => getMetaTag(staticData.title, staticData.image, staticData.description, uniqueLink)
