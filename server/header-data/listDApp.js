const { getMetaTag } = require('../modal/MetaTag')

const totalDAppProject = `12K+`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `Top Dapp Projects List | Rating, Review & Details | Gear5`
const LIST_DESCRIPTION = `Discover Gear5's comprehensive list of ${totalDAppProject} Dapp Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead! `
const LIST_DESCRIPTION_OTHER = `Discover our comprehensive list of Dapp projects includes detailed ratings, reviews, and essential information and watch out which projects are reported as Scam or Dead!`

const SUB_CATEGORY_TITLE = `Top ${REPLACE_SUB_CATEGORY} dApp Projects List | User Reviews, Rating & Details | Gear5 `
const SUB_CATEGORY_DESCRIPTION = `Explore the ${REPLACE_SUB_CATEGORY} and its top Dapps Projects on Gear5 with detailed ratings, reviews, and essential information and watch out which projects are reported as Scam or Dead!
`

const staticData = {
  title: LIST_TITLE,
  image: `/list-dApp.webp`,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListDApp = (subCategory) => getMetaTag(
  subCategory
    ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_TITLE // List
  ,
  staticData.image
  ,
  subCategory
    ? (subCategory?.toLowerCase() === 'other') ? LIST_DESCRIPTION_OTHER : SUB_CATEGORY_DESCRIPTION?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_DESCRIPTION // List
)
