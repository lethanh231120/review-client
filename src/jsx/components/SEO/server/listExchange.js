import { toCammelCase } from '../../../../utils/formatText'
import { REPLACE_SUB_CATEGORY, SUB_TITLE } from './listCrypto'

const totalExchange = `570+`
const totalCountCEX = `209+`
const totalCountDEX = `359+`
const typeCEX = `CEX`
const typeDEX = `DEX`

const LIST_TITLE = `All ${totalExchange} Exchanges List${SUB_TITLE}`
const SUB_CATEGORY_CEX_TITLE = `${totalCountCEX} ${typeCEX} Crypto Exchanges${SUB_TITLE}`
const SUB_CATEGORY_DEX_TITLE = `${totalCountDEX} ${typeDEX} Crypto Exchanges${SUB_TITLE}`
const SUB_CATEGORY_TITLE = `${REPLACE_SUB_CATEGORY} Crypto Exchanges${SUB_TITLE}`
export const getHeaderListExchange = (subCategory) =>subCategory
  ? (subCategory === typeCEX)
    ? SUB_CATEGORY_CEX_TITLE
    : (subCategory === typeDEX)
      ? SUB_CATEGORY_DEX_TITLE
      : SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory)) // SubCategory
  : LIST_TITLE // List
