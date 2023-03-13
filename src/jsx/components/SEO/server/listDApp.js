const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `Top D-App Projects List | Rating, Discuss & Details | Gear5`
const SUB_CATEGORY_TITLE = `Top ${REPLACE_SUB_CATEGORY} D-App Projects List | User Discuss, Rating & Details | Gear5 `

export const getHeaderListDApp = (subCategory) => subCategory
  ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
  : LIST_TITLE // List
