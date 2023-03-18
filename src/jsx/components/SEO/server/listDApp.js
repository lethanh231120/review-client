import { toCammelCase } from '../../../../utils/formatText'
import { REPLACE_SUB_CATEGORY, SUB_TITLE } from './listCrypto'

const totalDAppProject = `12K+`

const LIST_TITLE = `Discuss & Details All ${totalDAppProject} DApps in the market Crypto${SUB_TITLE}`
const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} Dapps Projects List${SUB_TITLE}`

export const getHeaderListDApp = (subCategory) => subCategory
  ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory)) // SubCategory
  : LIST_TITLE // List
