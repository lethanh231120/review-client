import { toCammelCase } from '../../../../utils/formatText'

export const totalCryptoProject = `2.3M+`
export const SUB_TITLE = ` | Review, Discuss & Details | Gear5`
export const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'

const LIST_TITLE = `All ${totalCryptoProject} Cryptos${SUB_TITLE}`
const SUB_CATEGORY_TITLE = `All ${REPLACE_SUB_CATEGORY} Cryptos${SUB_TITLE}`

export const getHeaderListCrypto = (subCategory) => subCategory
  ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory)) // SubCategory
  : LIST_TITLE // List

