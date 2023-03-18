const { getMetaTag } = require('../modal/MetaTag')
const { toCammelCase } = require('../utils/formatText')
const { getSubTitle, getReplaceSubCategory } = require('./listCrypto')
const REPLACE_SUB_CATEGORY = getReplaceSubCategory()
const SUB_TITLE = getSubTitle()
const totalSoonProject = `40+`

const LIST_TITLE = `All ${totalSoonProject} ICO/IDO/IEO Projects${SUB_TITLE}`
const LIST_DESCRIPTION = `All Ongoing/Soon ICO/IDO/IEO Projects with Live Discussions, Reviews & Details, providing Investors with overall perspectives in the Market !`

const IMAGE = `/list-soon.webp`

const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} ICO/IDO/IEO Projects${SUB_TITLE}`
const SUB_CATEGORY_DESCRIPTION = `Real-time ${REPLACE_SUB_CATEGORY} List with Current Stage, Target Raising and Gear5's Score and Leave your Review if you have invested in any of those !`

const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListSoon = (subCategory, uniqueLink) => getMetaTag(
  subCategory
    ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory)) // SubCategory
    : LIST_TITLE // List
  ,
  staticData.image
  ,
  subCategory
    ? SUB_CATEGORY_DESCRIPTION?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory)) // SubCategory
    : LIST_DESCRIPTION // List
  ,
  uniqueLink
)
