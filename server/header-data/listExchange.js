const { getMetaTag } = require('../modal/MetaTag')
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `Top Crypto Exchanges List | Rating, Review & Details | Gear5`
const SUB_CATEGORY_TITLE = `Top ${REPLACE_SUB_CATEGORY} Crypto Exchanges List | Rating, Review & Details | Gear 5`

const LIST_DESCRTIPION = `Discover Gear5's comprehensive list of Crypto Exchanges projects includes detailed ratings, reviews, and essential information on each project and helping you make informed investment decision!`
const SUB_CATEGORY_DESCRTIPION = `Explore the ${REPLACE_SUB_CATEGORY} and its top Crypto Exchanges projects on Gear5. Our detailed ratings, reviews, and essential information on each project help you make informed investment decisions. Gain valuable insights to take your investment strategy to the next level!`

const staticData = {
  title: LIST_TITLE,
  image: `/list-exchange.webp`,
  description: LIST_DESCRTIPION
}

module.exports.getMetaTagListExchange = (subCategory) => getMetaTag(
  subCategory
    ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_TITLE // List
  ,
  staticData.image
  ,
  subCategory
    ? SUB_CATEGORY_DESCRTIPION?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_DESCRTIPION // List
)
