const { getMetaTag } = require('../modal/MetaTag')
const { toCammelCase } = require('../utils/formatText')
const totalSoonProject = `45+`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `All ${totalSoonProject} ICO/IDO/IEO Projects | Review, Discuss & Details | Gear5`
const LIST_DESCRIPTION = `Discover Gear5's comprehensive list of ${totalSoonProject} ICO/IDO/IEO Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead! `

const IMAGE = `/list-soon.webp`

const SUB_CATEGORY_TITLE = `${toCammelCase(REPLACE_SUB_CATEGORY)} ICO/IDO/IEO Projects | Review, Discuss & Details | Gear5`
const SUB_CATEGORY_DESCRIPTION = `Real-time ${toCammelCase(REPLACE_SUB_CATEGORY)} List with Current Stage, Target Raising and Gear5's Score and Leave your Review if you have invested in any of those !`

const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListSoon = (subCategory, uniqueLink) => getMetaTag(
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
