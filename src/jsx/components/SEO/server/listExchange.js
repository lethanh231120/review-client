const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `Top Crypto Exchanges List | Rating, Discuss & Details | Gear5`
const SUB_CATEGORY_TITLE = `Top ${REPLACE_SUB_CATEGORY} Crypto Exchanges List | Rating, Discuss & Details | Gear 5`

export const getHeaderListExchange = (subCategory) => subCategory
  ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
  : LIST_TITLE // List
