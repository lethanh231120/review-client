import { toCammelCase } from '../../../../utils/formatText'
import { REPLACE_SUB_CATEGORY, SUB_TITLE } from './listCrypto'

const totalExchange = `570+`
const totalCountCEX = `350+`
const totalCountDEX = `210+`
const typeCEX = `CEX`
const typeDEX = `DEX`

const LIST_TITLE = `Review & Discuss ${totalExchange} Crypto Exchanges | Gear5`
const SUB_CATEGORY_CEX_TITLE = `Discuss & Review ${totalCountCEX} Exchanges ${typeCEX} in the market Crypto | Gear5`
const SUB_CATEGORY_DEX_TITLE = `Discuss & Review ${totalCountDEX} Exchanges ${typeDEX} in the market Crypto | Gear5`
const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} Crypto Exchanges${SUB_TITLE}`
export const getHeaderListExchange = (subCategory) =>subCategory
  ? (subCategory === typeCEX)
    ? SUB_CATEGORY_CEX_TITLE
    : (subCategory === typeDEX)
      ? SUB_CATEGORY_DEX_TITLE
      : SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, subCategory) // SubCategory
  : LIST_TITLE // List
