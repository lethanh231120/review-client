const { getMetaTag } = require('../modal/MetaTag')

const TITLE = `Gear 5: 99%+ Scam/Dead Crypto Projects Among Total Of 2,3M+ | Discuss, Review & Details`
const IMAGE = `/logo.webp`
const DESCRIPTION = `Stay up-to-date on the latest cryptocurrency trends, Gear5 provide in-depth reviews and comprehensive information on 2,3M+ cryptocurrencies, helping you make well-informed investment decisions. `
const UNIQUE_LINK = `https://gear5.io`

const staticData = {
  title: TITLE,
  image: IMAGE,
  description: DESCRIPTION,
  uniqueLink: UNIQUE_LINK
}

module.exports.getMetaTagHome = () => getMetaTag(staticData.title, staticData.image, staticData.description, staticData.uniqueLink)
