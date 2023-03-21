const { getMetaTag } = require('../modal/MetaTag')
const { getTotalCrypto } = require('./listCrypto')
const totalCrypto = getTotalCrypto()
const TITLE = `Gear 5: Review & Discuss 99%+ Scam/Dead Crypto Projects Among Total Of ${totalCrypto}`
const IMAGE = `/logo.webp`
const DESCRIPTION = `You got scammed, lost money?
Please join us in warning everyone in the community!`
const UNIQUE_LINK = `https://gear5.io`

const staticData = {
  title: TITLE,
  image: IMAGE,
  description: DESCRIPTION,
  uniqueLink: UNIQUE_LINK
}

module.exports.getMetaTagHome = () => getMetaTag(staticData.title, staticData.image, staticData.description, staticData.uniqueLink)
