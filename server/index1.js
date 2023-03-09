const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const axios = require('axios')
const { getMetaTag } = require('./modal/MetaTag')
const { getMetaTagHome } = require('./header-data/home')
const { getMetaTagListCrypto } = require('./header-data/listCrypto')
const { getMetaTagListDApp } = require('./header-data/listDApp')
const { getMetaTagListVenture } = require('./header-data/listVenture')
const { getMetaTagListExchange } = require('./header-data/listExchange')
const { getMetaTagListSoon } = require('./header-data/listSoon')
const { getMetaTagListLaunchpad } = require('./header-data/listLaunchpad')
const { getMetaTagInsight } = require('./header-data/insight')

const PORT = process.env.PORT || 3000
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html')

// ######## Default meta tag
const metaTagHome = getMetaTagHome()
const META_TITLE = metaTagHome.title
const META_IMAGE = metaTagHome.image
const META_DESCRIPTION = metaTagHome.description

// static resources should just be served as they are
const oneDay = 86400000 // in milliseconds
app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxage: oneDay }
))

const genDetailHeader = (res, productId = '') => {
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error during file reading', err)
      return res.status(404).end()
    }

    if (productId) {
      axios.get(`https://api-client.gear5.io/reviews/product/detail?productId=gear5_${productId}`).then((resp) =>{
        const data = resp?.data?.data?.details
        // inject meta tags
        htmlData = htmlData.replaceAll(META_TITLE, data?.name || data?.ventureName || data?.dAppName || data?.projectName || META_TITLE)
          .replaceAll(META_DESCRIPTION, data?.description || data?.fullDescription || data?.fullDesc || data?.shortDescription || data?.shortDesc || META_DESCRIPTION)
          .replaceAll(META_IMAGE, data?.bigLogo || data?.dAppLogo || data?.ventureLogo || data?.smallLogo || data?.thumbLogo || META_IMAGE)
        return res.send(htmlData)
      })
    }
  })
}

// ######## detail page
// detail: crypto(coin)
app.get(`/products/crypto/coin/:coinName`, (req, res) => {
  console.log('detail: crypto(coin)')
  const coinName = req?.params?.coinName
  genDetailHeader(res, coinName ? `coin_${coinName}` : '')
})

// detail: crypto(token)
app.get(`/products/crypto/token/:chainName/:tokenAddress`, (req, res) => {
  console.log('detail: crypto(token)')
  const chainName = req?.params?.chainName
  const tokenAddress = req?.params?.tokenAddress
  genDetailHeader(res, (chainName && tokenAddress) ? `token_${chainName}_${tokenAddress}` : '')
})

// detail: dApp, venture, exchange, soon, launchpad
app.get(`/products/:category/:productName`, (req, res) => {
  console.log('detail: dApp, venture, exchange, soon, launchpad')
  const category = req?.params?.category
  const productName = req?.params?.productName
  genDetailHeader(res, (category && productName) ? `${category}_${productName}` : '')
})

// ######## Otherwise page,..
const injectHtmlHeader = (htmlData, metaTag) => {
  return htmlData.replaceAll(META_TITLE, metaTag.title)
    .replaceAll(META_DESCRIPTION, metaTag.description)
    .replaceAll(META_IMAGE, metaTag.image)
}

const genHeader = (res, metaTag) => {
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error during file reading', err)
      return res.status(404).end()
    }

    // inject meta tags
    return res.send(injectHtmlHeader(htmlData, metaTag))
  })
}

// list
app.get('/:category', (req, res) => {
  const category = req?.params?.category
  console.log('list', category)
  switch (category) {
    case 'crypto':{
      genHeader(res, getMetaTagListCrypto())
      break
    }
    case 'dapp':{
      genHeader(res, getMetaTagListDApp())
      break
    }
    case 'venture':{
      genHeader(res, getMetaTagListVenture())
      break
    }
    case 'exchange':{
      genHeader(res, getMetaTagListExchange())
      break
    }
    case 'soon':{
      genHeader(res, getMetaTagListSoon())
      break
    }
    case 'launchpad':{
      genHeader(res, getMetaTagListLaunchpad())
      break
    }
    case 'insight':{
      genHeader(res, getMetaTagInsight())
      break
    }
    default: {
      genHeader(res, getMetaTag(`Gear5 - Don't trust, verify`, `%PUBLIC_URL%/logo.png`, `Gear5 is a website that help you connect to the web3 world.`))
      break
    }
  }
})

// home (NOT WORKING when use express.static)
app.get('/', (_, res) => {
  console.log('home')
  genHeader(res, getMetaTagHome())
})

// otherwise page
app.get('/*', (_, res) => {
  console.log('other')
  genHeader(res, getMetaTagHome())
})

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error during app startup', error)
  }
  console.log('listening on ' + PORT + '...')
})
