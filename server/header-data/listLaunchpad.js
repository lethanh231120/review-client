const { getMetaTag } = require('../modal/MetaTag')
const { getSubTitle } = require('./listCrypto')
const totalLunchpad = '100+'

const LIST_TITLE = `${totalLunchpad} Launchpads Projects List${getSubTitle()}`
const IMAGE = `/list-launchpad.webp`
const LIST_DESCRIPTION = `Total ${totalLunchpad} existing in the Market with Current / ATH ROI, Total Raised and Gear5's Score, helping you make well-informed investment decisions`

const staticData = {
  title: LIST_TITLE,
  image: IMAGE,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagListLaunchpad = (uniqueLink) => getMetaTag(staticData.title, staticData.image, staticData.description, uniqueLink)
