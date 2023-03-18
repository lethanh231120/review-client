const { getMetaTag } = require('../modal/MetaTag')
const { toCammelCase } = require('../utils/formatText')
const { getSubTitle, getReplaceSubCategory } = require('./listCrypto')

const totalDAppProject = `12K+`
const SUB_TITLE = getSubTitle()
const REPLACE_SUB_CATEGORY = getReplaceSubCategory()

const LIST_TITLE = `Discuss & Details All ${totalDAppProject} DApps in the market Crypto${SUB_TITLE}`
const LIST_DESCRIPTION = `Discover the DApps World of ${totalDAppProject} Projects included DeFi platforms, NFT marketplaces,... Check out for Gear5's Score and Leave your Review if any of those is considered as Scam or Dead !`

const IMAGE = `/list-dApp.webp`

const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} DApps Projects List${SUB_TITLE}`
const SUB_CATEGORY_DESCRIPTION = `Explore the ${REPLACE_SUB_CATEGORY} and its top DApps Projects on Gear5 with detailed ratings, reviews, and essential information and watch out which projects are reported as Scam or Dead!`

const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListDApp = (subCategory, uniqueLink) => getMetaTag(
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
