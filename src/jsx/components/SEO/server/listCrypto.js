import { toCammelCase } from '../../../../utils/formatText'

export const totalCryptoProject = `2.3M+`
export const SUB_TITLE = ` | Review, Discuss & Details | Gear5`
export const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'
const REPLACE_TOTAL = '[TOTAL_SUB_CATEGORY]'
const subcategoryTotalMap = new Map()
subcategoryTotalMap.set('Cryptocurrency', '260+')
subcategoryTotalMap.set('Binance Ecosystem', '1,6M+')
subcategoryTotalMap.set('Ethereum Ecosystem', '490K+')
subcategoryTotalMap.set('Avalanche Ecosystem', '48K+')
subcategoryTotalMap.set('Polygon Ecosystem', '32K+')
subcategoryTotalMap.set('Cronos Ecosystem', '17K+')
subcategoryTotalMap.set('Solana Ecosystem', '12K+')
subcategoryTotalMap.set('Decentralized Finance', '460+')
subcategoryTotalMap.set('Centralized Exchange', '45+')
subcategoryTotalMap.set('Gambling', '30+')
subcategoryTotalMap.set('Games', '250+')
subcategoryTotalMap.set('Meme', '100+')
subcategoryTotalMap.set('NFT', '390+')
subcategoryTotalMap.set('Decentralized Exchange', '135+')

const LIST_TITLE = `${totalCryptoProject} Cryptos | Review & Discuss | Gear5`
const SUB_CATEGORY_TITLE = `Review & Discuss ${REPLACE_TOTAL}${REPLACE_SUB_CATEGORY} Cryptos | Gear5`

export const getHeaderListCrypto = (subCategory) => {
  let totalSubcategory = null
  if (subCategory) {
    totalSubcategory = subcategoryTotalMap.get(subCategory)
    if (totalSubcategory) {
      totalSubcategory += ' '
    } else {
      totalSubcategory = ''
    }
  }
  return subCategory
    ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory))?.replace(REPLACE_TOTAL, totalSubcategory) // SubCategory
    : LIST_TITLE // List
}

