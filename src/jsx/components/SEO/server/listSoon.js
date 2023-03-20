import { toCammelCase } from '../../../../utils/formatText'
import { REPLACE_SUB_CATEGORY } from './listCrypto'

const totalSoonProject = `45+`

const LIST_TITLE = `Review & Discuss ${totalSoonProject} ICO/IDO/IEO Projects Ongoing | Gear5`
const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} ICO/IDO/IEO Project List Ongoing | Gear5`

export const getHeaderListSoon = (subCategory) => subCategory
  ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory)) // SubCategory
  : LIST_TITLE // List
