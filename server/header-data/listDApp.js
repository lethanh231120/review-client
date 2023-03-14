const { getMetaTag } = require('../modal/MetaTag')
const { toCammelCase } = require('../utils/formatText')

const totalDAppProject = `12K+`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `${totalDAppProject} Dapp Projects List | Review, Discuss & Details | Gear5`
const LIST_DESCRIPTION = `Discover our comprehensive list of Dapp projects includes detailed ratings, reviews, and essential information and watch out which projects are reported as Scam or Dead!`

const IMAGE = `/list-dApp.webp`

const SUB_CATEGORY_TITLE = `Top ${toCammelCase(REPLACE_SUB_CATEGORY)} Dapps Projects List | Review, Discuss & Details | Gear5`
const SUB_CATEGORY_DESCRIPTION = `Explore the ${toCammelCase(REPLACE_SUB_CATEGORY)} and its top Dapps Projects on Gear5 with detailed ratings, reviews, and essential information and watch out which projects are reported as Scam or Dead!`

const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
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
    ? SUB_CATEGORY_DESCRIPTION?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
    : LIST_DESCRIPTION // List
)
