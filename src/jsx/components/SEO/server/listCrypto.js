const totalCryptoProject = `2.3M+`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'
const LIST_TITLE = `All ${totalCryptoProject} Crypto Projects | Rating, Discuss & Details | Gear5`
const SUB_CATEGORY_TITLE = `All ${REPLACE_SUB_CATEGORY} Projects | Rating, Discuss & Details | Gear5`

export const getHeaderListCrypto = (subCategory) => subCategory
  ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
  : LIST_TITLE // List

