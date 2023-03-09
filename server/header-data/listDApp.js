const { getMetaTag } = require('../modal/MetaTag')

const totalDAppProject = `12K+`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const DESCRIPTION = `Discover Gear5's comprehensive list of ${totalDAppProject} Dapp Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead! `
const DESCRIPTION_WITH_SUB_CATEGORY = `Explore the ${REPLACE_SUB_CATEGORY} and its top Dapps Projects on Gear5 with detailed ratings, reviews, and essential information and watch out which projects are reported as Scam or Dead!`
const staticData = {
  title: `${REPLACE_SUB_CATEGORY} Dapp Projects List | Rating, Review & Details | Gear5`,
  image: `/list-dApp.webp`,
  description: `Discover Gear5's comprehensive list of 12K+ Dapp Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead!`
}

module.exports.getMetaTagListDApp = (subCategory) => getMetaTag(
  subCategory
    ? staticData.title.replace(REPLACE_SUB_CATEGORY, `All ${subCategory}`)// Sub category
    : staticData.title.replace(REPLACE_SUB_CATEGORY, `${totalDAppProject}`) // List
  ,
  staticData.image
  ,
  subCategory
    ? DESCRIPTION_WITH_SUB_CATEGORY.replace(REPLACE_SUB_CATEGORY, subCategory)// Sub category
    : DESCRIPTION // List
)
