const totalSoonProject = `45+`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `All ${totalSoonProject} Projects | Rating, Discuss & Details | Gear5`
const SUB_CATEGORY_TITLE = `All ${REPLACE_SUB_CATEGORY} Projects | Rating, Discuss & Details | Gear5`

export const getHeaderListSoon = (subCategory) => subCategory
  ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
  : LIST_TITLE // List
