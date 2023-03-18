const { getMetaTag } = require('../modal/MetaTag')
const { getSubTitle } = require('./listCrypto')
const totalVenture = '8000+'

const LIST_TITLE = `List ${totalVenture} Ventures Crypto Projects${getSubTitle()}`
const IMAGE = `/list-venture.webp`
const LIST_DESCRIPTION = `Discover all ${totalVenture} Ventures included Detailed Reviews, Informations and Total Investments and Leave your Review if any of those is considered as Scam !`

const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListVenture = (uniqueLink) => getMetaTag(staticData.title, staticData.image, staticData.description, uniqueLink)
