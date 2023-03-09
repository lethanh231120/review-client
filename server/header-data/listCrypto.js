const { getMetaTag } = require('../modal/MetaTag')
const totalCryptoProject = `2.3M+`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `All ${totalCryptoProject} Crypto Projects | Rating, Review & Details | Gear5`
const LIST_DESCRIPTION = `Discover Gear5's comprehensive list of ${totalCryptoProject} Crypto Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead! `

const SUB_CATEGORY_TITLE = `All ${REPLACE_SUB_CATEGORY} Projects | Rating, Review & Details | Gear5`
const SUB_CATEGORY_DESCRIPTION = `Explore the ${REPLACE_SUB_CATEGORY} and its top Crypto Projects on Gear5 with detailed ratings, reviews, and essential information and watch out which projects are reported as Scam or Dead!
`
const staticData = {
  title: LIST_TITLE,
  image: `/list-crypto.webp`,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListCrypto = (subCategory) => getMetaTag(
  subCategory
    ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_TITLE // List
  ,
  staticData.image
  ,
  subCategory
    ? SUB_CATEGORY_DESCRIPTION?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_DESCRIPTION // List
)

