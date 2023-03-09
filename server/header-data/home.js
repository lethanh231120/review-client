const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Gear5 | Review, Rate All Cryptocurrencies & HOT ICO/IDO/IEO Project List`,
  description: `Stay up-to-date on the latest cryptocurrency trends, Gear5 provide in-depth reviews and comprehensive information on 2,3M+ cryptocurrencies, helping you make well-informed investment decisions.`,
  image: `%PUBLIC_URL%/logo.png`
}

module.exports.getMetaTagHome = () => getMetaTag(staticData.title, staticData.description, staticData.image)
