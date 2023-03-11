const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const axios = require('axios')
const { getMetaTagHome } = require('./header-data/home')
const { getMetaTagListCrypto } = require('./header-data/listCrypto')
const { getMetaTagListDApp } = require('./header-data/listDApp')
const { getMetaTagListVenture } = require('./header-data/listVenture')
const { getMetaTagListExchange } = require('./header-data/listExchange')
const { getMetaTagListSoon } = require('./header-data/listSoon')
const { getMetaTagListLaunchpad } = require('./header-data/listLaunchpad')
const { getMetaTagInsight } = require('./header-data/insight')
const { getMetaTag } = require('./modal/MetaTag')

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

const encodeSpecialCharacterUrl = (url) =>{
  url = url?.split('+').join('%2B')
  return url
}

const genDetailHeader = (res, productId = '') => {
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error during file reading', err)
      return res.status(404).end()
    }

    if (productId) {
      productId = encodeSpecialCharacterUrl(productId)
      axios.get(`https://api-client.gear5.io/reviews/product/detail?productId=gear5_${productId}`).then((resp) =>{
        const data = resp?.data?.data?.details
        let title = data?.name || data?.ventureName || data?.dAppName || data?.projectName || META_TITLE
        let cleanDescription = data?.description || data?.fullDescription || data?.fullDesc || data?.shortDescription || data?.shortDesc || META_DESCRIPTION
        cleanDescription = cleanDescription?.replace(/(<([^>]+)>)/ig, '') // strip HTML tags (from BE)
        cleanDescription = cleanDescription?.substring(0, 300) // good for SEO, <= 300
        const productId = data?.cryptoId || data?.dAppId || data?.ventureId || data?.exchangeId || data?.projectId || data?.launchPadId
        let imgPath = ''
        const totalScam = `${(data?.totalIsScam && data?.totalIsScam > 0) ? `${data?.totalIsScam} Scam Report` : ''}`
        const totalReviews = `${(data?.totalReviews && data?.totalReviews > 0) ? `${data?.totalReviews} Review` : ''}`
        let totalInteract = totalScam
        if (totalInteract) {
          totalInteract += `, ${totalReviews}`
        } else {
          totalInteract = totalReviews
        }
        if (totalInteract) {
          totalInteract = ` ${totalInteract}, `
        } else {
          totalInteract += ' '
        }
        switch (productId) {
          case data?.cryptoId :{
            imgPath = 'crypto'
            title = `${title}${data?.symbol ? ` (${data?.symbol})` : ''},${totalInteract}TOP Crypto Projects | Reviews, Rating & Details | Gear5`
            break
          }
          case data?.dAppId :{
            imgPath = 'dapp'
            title = `${title},${totalInteract}Decentralized Application Rating, Reviews & Details | Gear5`
            break
          }
          case data?.ventureId :{
            imgPath = 'venture'
            title = `${title},${totalInteract}Crypto Ventures Rating, Reviews & Details | Gear5`
            break
          }
          case data?.exchangeId :{
            imgPath = 'exchange'
            title = `${title},${totalInteract}Crypto Exchanges Rating, Reviews & Details | Gear5`
            break
          }
          // Soon Project
          case data?.projectId :{
            imgPath = 'soon'
            title = `${title}${data?.projectSymbol ? ` (${data?.projectSymbol})` : ''},${totalInteract}ICO/IDO/IEO Projects | Reviews, Rating & Details | Gear5`
            break
          }
          case data?.launchPadId :{
            imgPath = 'launchpad'
            title = `${title},${totalInteract}Crypto Launchpads Rating, Reviews & Details | Gear5`
            break
          }
        }
        let image = data?.bigLogo || data?.dAppLogo || data?.ventureLogo || data?.smallLogo || data?.thumbLogo
        image = (productId && image) ? `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${imgPath}/bigLogo/${productId}.png` : META_IMAGE

        return res.send(injectHtmlHeader(htmlData, getMetaTag(title, image, cleanDescription)))
      }).catch((error) => {
        console.log(error)
        return res.send(htmlData)
      })
    }
  })
}

// ######## detail page
// detail: crypto(coin)
app.get(`/products/crypto/coin/:coinName`, (req, res) => {
  // console.log('detail: crypto(coin)')
  const coinName = req?.params?.coinName
  genDetailHeader(res, coinName ? `coin_${coinName}` : '')
})

// detail: crypto(token)
app.get(`/products/crypto/token/:chainName/:tokenAddress`, (req, res) => {
  // console.log('detail: crypto(token)')
  const chainName = req?.params?.chainName
  const tokenAddress = req?.params?.tokenAddress
  genDetailHeader(res, (chainName && tokenAddress) ? `token_${chainName}_${tokenAddress}` : '')
})

// detail: dApp, venture, exchange, soon, launchpad
app.get(`/products/:category/:productName`, (req, res) => {
  const category = req?.params?.category
  const productName = req?.params?.productName
  // console.log('detail', category, productName)
  genDetailHeader(res, (category && productName) ? `${category}_${productName}` : '')
})

// ######## Otherwise page,..
const injectHtmlHeader = (htmlData, metaTag) => {
  return htmlData
    .split(META_TITLE).join(metaTag.title) // euqal replace all
    .split(META_DESCRIPTION).join(metaTag.description)
    .split(META_IMAGE).join(metaTag.image)
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

const genListHeader = (res, category, subCategory) => {
  switch (category) {
    case 'crypto':{
      genHeader(res, getMetaTagListCrypto(subCategory))
      break
    }
    case 'dapp':{
      genHeader(res, getMetaTagListDApp(subCategory))
      break
    }
    case 'venture':{
      genHeader(res, getMetaTagListVenture())
      break
    }
    case 'exchange':{
      genHeader(res, getMetaTagListExchange(subCategory))
      break
    }
    case 'soon':{
      genHeader(res, getMetaTagListSoon(subCategory))
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
      genHeader(res, getMetaTagHome())
      break
    }
  }
}

// list
app.get('/:category', (req, res) => {
  const category = req?.params?.category
  // console.log('list', category)
  genListHeader(res, category)
})

// list with sub-category
app.get('/:category/:subCategory', (req, res) =>{
  const category = req?.params?.category
  const subCategory = req?.params?.subCategory
  // console.log('list', category, 'subCategory', subCategory)
  genListHeader(res, category, subCategory)
})

// home (NOT WORKING when use express.static)
app.get('/', (_, res) => {
  // console.log('home')
  genHeader(res, getMetaTagHome())
})

// otherwise page
app.get('/*', (_, res) => {
  // console.log('other')
  genHeader(res, getMetaTagHome())
})

// listening...
app.listen(PORT, (error) => {
  if (error) {
    console.error('Error during app startup', error)
  }
  console.log('listening on ' + PORT + '...')
})
