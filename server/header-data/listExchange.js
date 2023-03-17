const { getMetaTag } = require('../modal/MetaTag')
const { toCammelCase } = require('../utils/formatText')
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'
const totalCountCEX = `209+`
const totalCountDEX = `359+`
const typeCEX = `CEX`
const typeDEX = `DEX`

const LIST_TITLE = `Top Crypto Exchange List | Review, Discuss & Details | Gear5`
const SUB_CATEGORY_CEX_TITLE = `${totalCountCEX} ${typeCEX} Project | Review, Discuss & Details | Gear5`
const SUB_CATEGORY_DEX_TITLE = `${totalCountDEX} ${typeDEX} Project | Review, Discuss & Details | Gear5`
const SUB_CATEGORY_TITLE = `Top ${REPLACE_SUB_CATEGORY} Crypto Exchanges List | Rating, Discuss & Details | Gear 5`

const IMAGE = `/list-exchange.webp`

const LIST_DESCRTIPION = `Discover Gear5's comprehensive list of Crypto Exchanges projects includes detailed ratings, reviews, and essential information on each project and helping you make informed investment decision!`
const SUB_CATEGORY_DESCRTIPION = `Explore the ${toCammelCase(REPLACE_SUB_CATEGORY)} and its top Crypto Exchanges projects on Gear5. Our detailed ratings, reviews, and essential information on each project help you make informed investment decisions. Gain valuable insights to take your investment strategy to the next level!`

const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRTIPION
}

module.exports.getMetaTagListExchange = (subCategory, uniqueLink) => getMetaTag(
  subCategory
    ? (subCategory === typeCEX)
      ? SUB_CATEGORY_CEX_TITLE
      : (subCategory === typeDEX)
        ? SUB_CATEGORY_DEX_TITLE
        : SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_TITLE // List
  ,
  staticData.image
  ,
  subCategory
    ? SUB_CATEGORY_DESCRTIPION?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_DESCRTIPION // List
  ,
  uniqueLink
)
