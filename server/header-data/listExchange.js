const { getMetaTag } = require('../modal/MetaTag')
const { getSubTitle, getReplaceSubCategory } = require('./listCrypto')
const REPLACE_SUB_CATEGORY = getReplaceSubCategory()
const SUB_TITLE = getSubTitle()

const totalExchange = `570+`
const totalCountCEX = `350+`
const totalCountDEX = `210+`
const typeCEX = `CEX`
const typeDEX = `DEX`

const LIST_TITLE = `Review & Discuss ${totalExchange} Crypto Exchanges | Gear5`
const SUB_CATEGORY_CEX_TITLE = `Discuss & Review ${totalCountCEX} Exchanges ${typeCEX} in the market Crypto | Gear5`
const SUB_CATEGORY_DEX_TITLE = `Discuss & Review ${totalCountDEX} Exchanges ${typeDEX} in the market Crypto | Gear5`
const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} Crypto Exchanges${SUB_TITLE}`

const IMAGE = `/list-exchange.webp`

const LIST_DESCRTIPION = `Review all ${totalExchange} Exchanges in the market Crypto. 24H Volume and Gear5's Score. Leave your Review if any of those is considered as Scam!`
const SUB_CATEGORY_CEX_DESCRTIPION = `Discover ${totalCountCEX} Crypto Exchanges ${REPLACE_SUB_CATEGORY} includes detailed ratings, reviews, and essential information on each project and helping you make informed investment decision!`
const SUB_CATEGORY_DEX_DESCRTIPION = `Discover ${totalCountDEX} Crypto Exchanges ${REPLACE_SUB_CATEGORY} includes detailed ratings, reviews, and essential information on each project and helping you make informed investment decision!`
const SUB_CATEGORY_DESCRTIPION = `All ${REPLACE_SUB_CATEGORY} with Latest Transaction Fee, 24H Volume and Gear5's Score. Leave your Review if any of those is considered as Scam or Dead !`

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
    ? (subCategory === typeCEX)
      ? SUB_CATEGORY_CEX_DESCRTIPION?.replace(REPLACE_SUB_CATEGORY, subCategory)
      : (subCategory === typeDEX)
        ? SUB_CATEGORY_DEX_DESCRTIPION?.replace(REPLACE_SUB_CATEGORY, subCategory)
        : SUB_CATEGORY_DESCRTIPION?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_DESCRTIPION // List
  ,
  uniqueLink
)
