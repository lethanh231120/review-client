import { toCammelCase } from '../../../../utils/formatText'
import { REPLACE_SUB_CATEGORY, SUB_TITLE } from './listCrypto'

const totalSoonProject = `40+`

const LIST_TITLE = `All ${totalSoonProject} ICO/IDO/IEO Projects${SUB_TITLE}`
const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} ICO/IDO/IEO Projects${SUB_TITLE}`

export const getHeaderListSoon = (subCategory) => subCategory
  ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory)) // SubCategory
  : LIST_TITLE // List
