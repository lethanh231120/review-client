const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `New coins, tokens on many blockchains, its contract, price, holders | Gear5`,
  image: `/live-new-token.webp`,
  description: `Gear5, the gateway to DEFI, real-time charts, history and all token info from blockchain.`
}

module.exports.getMetaTagLiveNewToken = (uniqueLink) => getMetaTag(staticData.title, staticData.image, staticData.description, uniqueLink)
