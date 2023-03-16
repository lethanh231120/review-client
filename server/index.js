const express = require('express')
require('dotenv').config()
// const DOMAIN_READ = process.env.REACT_APP_API_READ
const DOMAIN_READ = 'https://api-ver1.gear5.io'
const PATH_DETAIL_PRODUCT = '/reviews/product/detail?productId='
const PATH_DETAIL_INSIGHT = '/reviews/chart/detail?chartId='
// const DOMAIN_IMAGE = process.env.REACT_APP_API_IMAGE
const DOMAIN_IMAGE = 'https://gear5.s3.ap-northeast-1.amazonaws.com'
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
const { getMetaTagAddProject } = require('./header-data/add-project')
const { getMetaTagReportScam } = require('./header-data/report-scam')

// ######## Default meta tag
const metaTagHome = getMetaTagHome()
const META_TITLE = metaTagHome.title
const META_IMAGE = metaTagHome.image
const META_DESCRIPTION = metaTagHome.description
const metaTagInsight = getMetaTagInsight()
const META_TITLE_INSIGHT = metaTagInsight.title
const META_IMAGE_INSIGHT = metaTagInsight.image

// static resources should just be served as they are
const oneDay = 86400000 // in milliseconds
app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxage: oneDay }
))

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

const encodeSpecialCharacterUrl = (url) =>{
  url = url?.split('+')?.join('%2B')
  return url
}

const LAUNCHPAD = 'launchpad'
const VENTURE = 'venture'
const EXCHANGE = 'exchange'
const CRYPTO = 'crypto'
const DAPP = 'dapp'
const SOON = 'soon'
const calculateScore = (rawScore, type) =>{
  let score = 0
  if (rawScore <= 0) {
    score = 0
  } else {
    if (type === LAUNCHPAD) {
      score = rawScore / 3.5
    }
    if (type === VENTURE || type === EXCHANGE) {
      score = rawScore / 20
    }
    if (type === CRYPTO || type === DAPP) {
      score = rawScore / 10
    }
  }
  return score
}
const getTxtAdditional = (isScam, isWarning, score, type) =>{
  let txtAdditional = ''
  // Scam project
  if (isScam) {
    txtAdditional = 'SCAMMED!'
  } else
  // Warning project
  if
  (isWarning) {
    txtAdditional = 'WARNING!'
  }
  const rawScore = score
  const txtTop = 'TOP'
  const minScoreTop = 8
  if (txtAdditional === '' && (calculateScore(rawScore, type) >= minScoreTop)) {
    txtAdditional = txtTop
  }
  txtAdditional += ' '
  return txtAdditional
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
      url: `${DOMAIN_READ}${PATH_DETAIL_PRODUCT}${productId}`,
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
        const isScam = data?.isScam
        const isWarning = data?.isWarning
        const rawScore = data?.score
        switch (productId) {
          case data?.cryptoId :{
            imgPath = CRYPTO
            title = `${title}${data?.symbol ? ` (${data?.symbol})` : ''},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, CRYPTO)}Crypto Projects ${extraData}${brandDate}`
            break
          }
          case data?.dAppId :{
            imgPath = DAPP
            title = `${title},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, DAPP)}Decentralized Application ${extraData}${brandDate}`
            break
          }
          case data?.ventureId :{
            imgPath = VENTURE
            title = `${title},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, VENTURE)}Crypto Ventures ${extraData}${brandDate}`
            break
          }
          case data?.exchangeId :{
            imgPath = EXCHANGE
            title = `${title},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, EXCHANGE)}Crypto Exchanges ${extraData}${brandDate}`
            break
          }
          // Soon Project
          case data?.projectId :{
            imgPath = SOON
            title = `${title}${data?.projectSymbol ? ` (${data?.projectSymbol})` : ''},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, SOON)}ICO/IDO/IEO Projects ${extraData}${brandDate}`
            break
          }
          case data?.launchPadId :{
            imgPath = LAUNCHPAD
            title = `${title},${totalInteract}${getTxtAdditional(isScam, isWarning, rawScore, LAUNCHPAD)}Crypto Launchpads ${extraData}${brandDate}`
            break
          }
        }
        // small logo: s3 (SOON) meaning has data, exchange: smallLogo
        const hasImage = data?.bigLogo || data?.dAppLogo || data?.ventureLogo || data?.smallLogo || data?.thumbLogo
        const image = (productId && hasImage) ? `${DOMAIN_IMAGE}/image/${imgPath}/bigLogo/${productId}.png` : META_IMAGE

        return res.send(injectHtmlHeader(getMetaTag(title, image, cleanDescription)))
      }).catch((error) => {
        console.error(`Error call API detail product | ${error.name}: ${error.message}`)
        return res?.send(injectHtmlHeader(getMetaTagHome()))
      })
  } else {
    // don't have product id
    return res?.send(injectHtmlHeader(getMetaTagHome()))
  }
}

const getDetailInsightHeader = (res, chartName = '') =>{
  if (chartName) {
    chartName = encodeSpecialCharacterUrl(chartName)
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${DOMAIN_READ}${PATH_DETAIL_INSIGHT}${chartName}`,
      timeout: 1000 // 1 second
    })
      .then((resp) =>{
        const data = resp?.data?.data
        const title = data?.description ? `${data?.description} | Insights by Gear5` : META_TITLE_INSIGHT
        const image = META_IMAGE_INSIGHT
        const description = `Take a look at ${data?.title ? (data?.title + ' ') : ''}by Gear5 and make well-informed investment decisions.`
        return res.send(injectHtmlHeader(getMetaTag(title, image, description)))
      }).catch((error) => {
        console.error(`Error call API detail insight | ${error.name}: ${error.message}`)
        return res?.send(injectHtmlHeader(getMetaTagHome()))
      })
  } else {
    // don't have product id
    return res?.send(injectHtmlHeader(getMetaTagInsight()))
  }
}

// Report Scam page
app.get(`/report-scam`, (req, res) => {
  // console.log(`/report-scam`)
  genStaticHeader(res, getMetaTagReportScam())
})

// Add Project page
app.get(`/add-project`, (req, res) => {
  // console.log(`/add-project`)
  genStaticHeader(res, getMetaTagAddProject())
})

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

// detail: insight
app.get(`/insight/:chartName`, (req, res) => {
  const chartName = req?.params?.chartName
  getDetailInsightHeader(res, chartName)
})

// ######## Otherwise page,..

const genStaticHeader = (res, metaTag) => {
  return res?.send(injectHtmlHeader(metaTag))
}

const genListHeader = (res, category, subCategory) => {
  switch (category) {
    case CRYPTO:{
      genStaticHeader(res, getMetaTagListCrypto(subCategory))
      break
    }
    case DAPP:{
      genStaticHeader(res, getMetaTagListDApp(subCategory))
      break
    }
    case VENTURE:{
      genStaticHeader(res, getMetaTagListVenture())
      break
    }
    case EXCHANGE:{
      genStaticHeader(res, getMetaTagListExchange(subCategory))
      break
    }
    case SOON:{
      genStaticHeader(res, getMetaTagListSoon(subCategory))
      break
    }
    case LAUNCHPAD:{
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
