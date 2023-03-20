const { getMetaTag } = require('../modal/MetaTag')
const { toCammelCase } = require('../utils/formatText')
const { getReplaceSubCategory } = require('./listCrypto')
const REPLACE_SUB_CATEGORY = getReplaceSubCategory()
const totalSoonProject = `45+`

const LIST_TITLE = `Review & Discuss ${totalSoonProject} ICO/IDO/IEO Projects Ongoing | Gear5`
const LIST_DESCRIPTION = `The list of ${totalSoonProject} ongoing ICO/IDO projects, including detailed ratings and information. Please leave your review if you have invested in any of these projects.`

const IMAGE = `/list-soon.webp`

const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} ICO/IDO/IEO Project List Ongoing | Gear5`
const SUB_CATEGORY_DESCRIPTION = `ICO/IDO/IEO details about all ongoing ${REPLACE_SUB_CATEGORY} projects in Crypto market. Please leave your review if you have invested in any of these projects.`

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
