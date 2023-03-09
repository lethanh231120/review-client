const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const axios = require('axios')

const PORT = process.env.PORT || 3000
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html')
const { getMetaTagHome } = require('./header-data/home')
const { getMetaTag } = require('./modal/MetaTag')
const { getMetaTagListCrypto } = require('./header-data/listCrypto')
const { getMetaTagListDApp } = require('./header-data/listDApp')
const { getMetaTagListVenture } = require('./header-data/listVenture')
const { getMetaTagListExchange } = require('./header-data/listExchange')
const { getMetaTagListSoon } = require('./header-data/listSoon')
const { getMetaTagListLaunchpad } = require('./header-data/listLaunchpad')

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
        htmlData = htmlData.replace(
          '<title>React App</title>',
          `<title>${data?.name || data?.ventureName || data?.dAppName || data?.projectName || `Gear5 - Don't trust, verify`}</title>`
        )
          .replace('__META_OG_TITLE__', data?.name || data?.ventureName || data?.dAppName || data?.projectName || `Gear5 - Don't trust, verify`)
          .replace('__META_OG_DESCRIPTION__', data?.description || data?.fullDescription || data?.fullDesc || data?.shortDescription || data?.shortDesc || `Gear5 is a website that help you connect to the web3 world.`)
          .replace('__META_DESCRIPTION__', data?.description || data?.fullDescription || data?.fullDesc || data?.shortDescription || data?.shortDesc || `Gear5 is a website that help you connect to the web3 world.`)
          .replace('__META_OG_IMAGE__', data?.bigLogo || data?.dAppLogo || data?.ventureLogo || data?.smallLogo || data?.thumbLogo || `%PUBLIC_URL%/logo.png`)
        return res.send(htmlData)
      })
    }
  })
}

// detail: crypto(coin)
app.get(`/products/crypto/coin/:coinName`, (req, res) => {
  const coinName = req?.params?.coinName
  genDetailHeader(res, coinName ? `coin_${coinName}` : '')
})

// detail: crypto(token)
app.get(`/products/crypto/token/:chainName/:tokenAddress`, (req, res) => {
  const chainName = req?.params?.chainName
  const tokenAddress = req?.params?.tokenAddress
  genDetailHeader(res, (chainName && tokenAddress) ? `token_${chainName}_${tokenAddress}` : '')
})

// detail: dApp, venture, exchange, soon, launchpad
app.get(`/products/:category/:productName`, (req, res) => {
  const category = req?.params?.category
  const productName = req?.params?.productName
  genDetailHeader(res, (category && productName) ? `${category}_${productName}` : '')
})

const injectHtmlHeader = (htmlData, metaTag) => {
  return htmlData.replace(
    '<title>React App</title>',
    `<title>${metaTag.title}</title>`
  )
    .replace('__META_OG_TITLE__', metaTag.title)
    .replace('__META_OG_DESCRIPTION__', metaTag.description)
    .replace('__META_DESCRIPTION__', metaTag.description)
    .replace('__META_OG_IMAGE__', metaTag.image)
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
    default: {
      genHeader(res, getMetaTag(`Gear5 - Don't trust, verify`, `%PUBLIC_URL%/logo.png`, `Gear5 is a website that help you connect to the web3 world.`))
      break
    }
  }
})

// home
app.get('/', (_, res) => {
  genHeader(res, getMetaTagHome())
})

// here we serve the index.html page
app.get('/*', (req, res, next) => {
  genHeader(res, getMetaTag(`Gear5 - Don't trust, verify`, `%PUBLIC_URL%/logo.png`, `Gear5 is a website that help you connect to the web3 world.`))
})

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error during app startup', error)
  }
  console.log('listening on ' + PORT + '...')
})
