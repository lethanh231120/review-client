const express = require('express')
require('dotenv').config()
const DOMAIN_READ = process.env.REACT_APP_API_READ
// const DOMAIN_READ = 'https://api-ver1.gear5.io'
const PATH_DETAIL = '/reviews/product/detail?productId='
const DOMAIN_IMAGE = process.env.REACT_APP_API_IMAGE
// const DOMAIN_IMAGE = 'https://gear5.s3.ap-northeast-1.amazonaws.com'
const PORT = process.env.PORT || 3000
const app = express()

const path = require('path')
const fs = require('fs')
const indexFileName = 'index.html'
const indexPath = path.resolve(__dirname, '..', 'build', indexFileName)
const file = (function() {
  let indexHtml = '' // default string, avoid handle undefined with logic
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error(`Error during reading file ${indexFileName} (file not exist, i/o problem, ...)`)
      process.exit(1)
    }
    console.log(`Reaing file ${indexFileName} successfully`)
    indexHtml = htmlData
  })

  // Read only
  return {
    getIndexHtml: () => indexHtml
  }
}())

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
const { getScriptSchemaMarkupSiteLinkSearchBoxHomePage } = require('./constants/schemaMarkup')

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
  url = url?.split('+')?.join('%2B')
  return url
}

const isInteger = (number) => {
  return (typeof number === 'number') && Math.floor(number) === number
}

const injectHtmlHeader = (metaTag) => {
  const dynamicMetaIndexHtml = file?.getIndexHtml()
    ?.split(META_TITLE)?.join(metaTag.title) // euqal replace all
    ?.split(META_DESCRIPTION)?.join(metaTag.description)
    ?.split(META_IMAGE)?.join(metaTag.image)
  const schemaMarkupIndexHtml = dynamicMetaIndexHtml?.replace(getScriptSchemaMarkupSiteLinkSearchBoxHomePage(), '')
  return schemaMarkupIndexHtml
}

const genDetailHeader = (res, productId = '') => {
  if (productId) {
    productId = encodeSpecialCharacterUrl(productId)
    productId = `gear5_${productId}`
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${DOMAIN_READ}${PATH_DETAIL}${productId}`,
      timeout: 1000 // 1 second
    })
      .then((resp) =>{
        const data = resp?.data?.data?.details
        let title = data?.name || data?.ventureName || data?.dAppName || data?.projectName || META_TITLE
        let cleanDescription = data?.description || data?.fullDescription || data?.fullDesc || data?.shortDescription || data?.shortDesc || META_DESCRIPTION
        cleanDescription = cleanDescription?.replace(/(<([^>]+)>)/ig, '') // strip HTML tags (from BE)
        cleanDescription = cleanDescription?.substring(0, 200) // good for SEO(twitter prefer) <= 200
        cleanDescription = cleanDescription?.split('"')?.join('&quot;') // clean double quotes in html meta tag to html entity, avoid break content
        const productId = data?.cryptoId || data?.dAppId || data?.ventureId || data?.exchangeId || data?.projectId || data?.launchPadId
        let imgPath = ''

        let totalInteract = ''
        let hasInteract = false
        // have data, and at least one in two has data is number greater than 0
        const totalScam = data?.totalIsScam
        const totalReview = data?.totalReviews
        if ((isInteger(totalScam) && isInteger(totalReview)) && (totalScam > 0 || totalReview > 0)) {
          const txtTotalScam = `${data?.totalIsScam} Scam Reports`
          const txtTotalReviews = `${data?.totalReviews} Reviews`

          // prefer display total review first
          if (totalReview > totalScam) {
            totalInteract += ` ${txtTotalReviews}, ${txtTotalScam} | `
          } else {
            totalInteract += ` ${txtTotalScam}, ${txtTotalReviews} | `
          }
          hasInteract = true
        } else {
          totalInteract += ' '
        }

        const extraData = hasInteract ? '' : '| Reviews, Discuss & Details '
        const brandDate = '| Gear5'
        const txtTop = 'TOP '
        switch (productId) {
          case data?.cryptoId :{
            imgPath = 'crypto'
            title = `${title}${data?.symbol ? ` (${data?.symbol})` : ''},${totalInteract}${txtTop}Crypto Projects ${extraData}${brandDate}`
            break
          }
          case data?.dAppId :{
            imgPath = 'dapp'
            title = `${title},${totalInteract}${txtTop}Decentralized Application ${extraData}${brandDate}`
            break
          }
          case data?.ventureId :{
            imgPath = 'venture'
            title = `${title},${totalInteract}${txtTop}Crypto Ventures ${extraData}${brandDate}`
            break
          }
          case data?.exchangeId :{
            imgPath = 'exchange'
            title = `${title},${totalInteract}${txtTop}Crypto Exchanges ${extraData}${brandDate}`
            break
          }
          // Soon Project
          case data?.projectId :{
            imgPath = 'soon'
            title = `${title}${data?.projectSymbol ? ` (${data?.projectSymbol})` : ''},${totalInteract}${txtTop}ICO/IDO/IEO Projects ${extraData}${brandDate}`
            break
          }
          case data?.launchPadId :{
            imgPath = 'launchpad'
            title = `${title},${totalInteract}${txtTop}Crypto Launchpads ${extraData}${brandDate}`
            break
          }
        }
        // small logo: s3 (SOON) meaning has data
        const hasImage = data?.bigLogo || data?.dAppLogo || data?.ventureLogo || data?.smallLogo || data?.thumbLogo
        const image = (productId && hasImage) ? `${DOMAIN_IMAGE}/image/${imgPath}/bigLogo/${productId}.png` : META_IMAGE

        return res.send(injectHtmlHeader(getMetaTag(title, image, cleanDescription)))
      }).catch((error) => {
        console.error(`Error call API detail | ${error.name}: ${error.message}`)
        return res?.send(injectHtmlHeader(getMetaTagHome()))
      })
  } else {
    // don't have product id
    return res?.send(injectHtmlHeader(getMetaTagHome()))
  }
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

const genStaticHeader = (res, metaTag) => {
  return res?.send(injectHtmlHeader(metaTag))
}

const genListHeader = (res, category, subCategory) => {
  switch (category) {
    case 'crypto':{
      genStaticHeader(res, getMetaTagListCrypto(subCategory))
      break
    }
    case 'dapp':{
      genStaticHeader(res, getMetaTagListDApp(subCategory))
      break
    }
    case 'venture':{
      genStaticHeader(res, getMetaTagListVenture())
      break
    }
    case 'exchange':{
      genStaticHeader(res, getMetaTagListExchange(subCategory))
      break
    }
    case 'soon':{
      genStaticHeader(res, getMetaTagListSoon(subCategory))
      break
    }
    case 'launchpad':{
      genStaticHeader(res, getMetaTagListLaunchpad())
      break
    }
    case 'insight':{
      genStaticHeader(res, getMetaTagInsight())
      break
    }
    default: {
      genStaticHeader(res, getMetaTagHome())
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
  genStaticHeader(res, getMetaTagHome())
})

// otherwise page
app.get('/*', (_, res) => {
  // console.log('other')
  genStaticHeader(res, getMetaTagHome())
})

// listening...
app.listen(PORT, (error) => {
  if (error) {
    console.error('Error during app startup', error)
  }
  console.log('listening on ' + PORT + '...')
})
