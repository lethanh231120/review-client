const { getMetaTag } = require('../modal/MetaTag')
const { toCammelCase } = require('../utils/formatText')
const totalCryptoProject = `2,3M+`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `All ${totalCryptoProject} Cryptos| Review, Discuss & Details | Gear5`
const LIST_DESCRIPTION = `Discover Gear5's comprehensive list of ${totalCryptoProject} Cryptos includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead! `

const IMAGE = `/list-crypto.webp`

const SUB_CATEGORY_TITLE = `All ${toCammelCase(REPLACE_SUB_CATEGORY)} Cryptos  | Review, Discuss & Details | Gear5`
const SUB_CATEGORY_DESCRIPTION = `This is the list of ${toCammelCase(REPLACE_SUB_CATEGORY)} with Real-time Price, Marketcap & Gear5's Score. Leave your Review if any of those is considered as Scam or Dead !`
const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListCrypto = (subCategory, uniqueLink) => getMetaTag(
  subCategory
    ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_TITLE // List
  ,
  staticData.image
  ,
  subCategory
    ? SUB_CATEGORY_DESCRIPTION?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_DESCRIPTION // List
  ,
  uniqueLink
)

