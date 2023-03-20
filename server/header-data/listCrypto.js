const { getMetaTag } = require('../modal/MetaTag')
const { toCammelCase } = require('../utils/formatText')
const totalCryptoProject = `2,3M+`
const SUB_TITLE = ` | Review, Discuss & Details | Gear5`
const REPLACE_SUB_CATEGORY = '[SUB_CATEGORY]'
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

const LIST_TITLE = `${totalCryptoProject} Cryptos| Review & Discuss | Gear5`
const LIST_DESCRIPTION = `Discover Gear5's comprehensive list of ${totalCryptoProject} Cryptos includes detailed ratings, reviews & essential information and watch out which projects are reported as Scam or Dead! `

const IMAGE = `/list-crypto.webp`

const SUB_CATEGORY_TITLE = `Review & Discuss ${REPLACE_TOTAL}${REPLACE_SUB_CATEGORY} Cryptos | Gear5`
const SUB_CATEGORY_DESCRIPTION = `Join our community in reviewing and discussing over ${REPLACE_TOTAL}${REPLACE_SUB_CATEGORY} cryptocurrencies. Stay informed and help protect others from scams!`
const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRIPTION
}

module.exports.getTotalCrypto = () => totalCryptoProject
module.exports.getSubTitle = () =>SUB_TITLE
module.exports.getReplaceSubCategory = () => REPLACE_SUB_CATEGORY
module.exports.getMetaTagListCrypto = (subCategory, uniqueLink) => {
  let totalSubcategory = null
  if (subCategory) {
    totalSubcategory = subcategoryTotalMap.get(subCategory)
    if (totalSubcategory) {
      totalSubcategory += ' '
    } else {
      totalSubcategory = ''
    }
  }
  return getMetaTag(
    subCategory
      ? SUB_CATEGORY_TITLE?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory))?.replace(REPLACE_TOTAL, totalSubcategory) // SubCategory
      : LIST_TITLE // List
    ,
    staticData.image
    ,
    subCategory
      ? SUB_CATEGORY_DESCRIPTION?.replace(REPLACE_SUB_CATEGORY, toCammelCase(subCategory))?.replace(REPLACE_TOTAL, totalSubcategory) // SubCategory
      : LIST_DESCRIPTION // List
    ,
    uniqueLink
  )
}

