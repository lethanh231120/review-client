const { getMetaTag } = require('../modal/MetaTag')

const LIST_TITLE = `Gear5 Data Insights in Cryptocurrency | Gear5`
const LIST_DESCRIPTION = `A collection of charts and statistics showing market data, on-chain data, network data, top statistics, and contract data of the Ethereum, BSC, ... Blockchain.`

const staticData = {
  title: LIST_TITLE,
  image: `/insight.webp`,
  description: LIST_DESCRIPTION
}

module.exports.getMetaTagInsight = () => getMetaTag(staticData.title, staticData.image, staticData.description)
