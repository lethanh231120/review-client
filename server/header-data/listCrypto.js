const { getMetaTag } = require('../modal/MetaTag')

const totalCryptoProject = `2.3M+`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'
const DESCRIPTION = `Discover Gear5's comprehensive list of ${totalCryptoProject} Crypto Projects includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead!`
const DESCRIPTION_WITH_SUB_CATEGORY = `Explore the ${REPLACE_SUB_CATEGORY} and its top Crypto Projects on Gear5 with detailed ratings, reviews, and essential information and watch out which projects are reported as Scam or Dead!`
const staticData = {
  title: `${REPLACE_SUB_CATEGORY} Crypto Projects | Rating, Review & Details | Gear5`,
  image: `/list-crypto.webp`,
  description: DESCRIPTION
}

module.exports.getMetaTagListCrypto = (subCategory) => getMetaTag(
  subCategory
    ? staticData.title.replace(REPLACE_SUB_CATEGORY, `All ${subCategory}`) // Sub category
    : staticData.title.replace(REPLACE_SUB_CATEGORY, `${totalCryptoProject}`) // List
  ,
  staticData.image
  ,
  subCategory
    ? DESCRIPTION_WITH_SUB_CATEGORY.replace(REPLACE_SUB_CATEGORY, subCategory)// Sub category
    : DESCRIPTION // List
)

