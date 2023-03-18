const { getMetaTag } = require('../modal/MetaTag')
const { getTotalCrypto } = require('./listCrypto')
const totalCrypto = getTotalCrypto()
const TITLE = `Gear 5: 99%+ Scam/Dead Crypto Projects Among Total Of ${totalCrypto} | Review, Discuss & Details`
const IMAGE = `/logo.webp`
const DESCRIPTION = `Stay up-to-date on the latest Cryptocurrency trends, Gear5 provide in-depth reviews and comprehensive information on Real-time ${totalCrypto} Crypto Database, helping you make well-informed investment decisions. `
const UNIQUE_LINK = `https://gear5.io`

const staticData = {
  title: TITLE,
  image: IMAGE,
  description: DESCRIPTION,
  uniqueLink: UNIQUE_LINK
}

module.exports.getMetaTagHome = () => getMetaTag(staticData.title, staticData.image, staticData.description, staticData.uniqueLink)
