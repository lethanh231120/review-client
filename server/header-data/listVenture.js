const { getMetaTag } = require('../modal/MetaTag')
const totalVenture = '8000+'

const LIST_TITLE = `Review & Discuss ${totalVenture} Ventures Crypto Projects | Gear5`
const IMAGE = `/list-venture.webp`
const LIST_DESCRIPTION = `Discover all ${totalVenture} Ventures included Detailed Reviews, Informations and Total Investments and Leave your Review if any of those is considered as Scam !`

const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListVenture = (uniqueLink) => getMetaTag(staticData.title, staticData.image, staticData.description, uniqueLink)
