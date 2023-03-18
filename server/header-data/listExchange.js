const { getMetaTag } = require('../modal/MetaTag')
const { toCammelCase } = require('../utils/formatText')
const { getSubTitle, getReplaceSubCategory } = require('./listCrypto')
const REPLACE_SUB_CATEGORY = getReplaceSubCategory()
const SUB_TITLE = getSubTitle()

const totalExchange = `570+`
const totalCountCEX = `209+`
const totalCountDEX = `359+`
const typeCEX = `CEX`
const typeDEX = `DEX`

const LIST_TITLE = `All ${totalExchange} Exchanges List${SUB_TITLE}`
const SUB_CATEGORY_CEX_TITLE = `${totalCountCEX} ${typeCEX} Crypto Exchanges${SUB_TITLE}`
const SUB_CATEGORY_DEX_TITLE = `${totalCountDEX} ${typeDEX} Crypto Exchanges${SUB_TITLE}`
const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} Crypto Exchanges${SUB_TITLE}`

const IMAGE = `/list-exchange.webp`

const LIST_DESCRTIPION = `Discover Gear5's comprehensive list of Crypto Exchanges projects includes detailed ratings, reviews, and essential information on each project and helping you make informed investment decision!`
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
        : SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory)) // SubCategory
    : LIST_TITLE // List
  ,
  staticData.image
  ,
  subCategory
    ? SUB_CATEGORY_DESCRTIPION?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory)) // SubCategory
    : LIST_DESCRTIPION // List
  ,
  uniqueLink
)
