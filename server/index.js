const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
const DOMAIN_READ = process.env.REACT_APP_API_READ
const PATH_DETAIL_PRODUCT = '/reviews/product/detail?productId='
const PATH_DETAIL_INSIGHT = '/reviews/chart/detail?chartId='
const DOMAIN_IMAGE = process.env.REACT_APP_API_IMAGE
const PORT = process.env.PORT || 3000
const API_TIME_LIMIT = 3000 // millisecond
const app = express()

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
const isbot = require('isbot')

const { getMetaTagHome } = require('./header-data/home')
const { getMetaTagListCrypto, getSubTitle } = require('./header-data/listCrypto')
const { getMetaTagListDApp } = require('./header-data/listDApp')
const { getMetaTagListVenture } = require('./header-data/listVenture')
const { getMetaTagListExchange } = require('./header-data/listExchange')
const { getMetaTagListSoon } = require('./header-data/listSoon')
const { getMetaTagListLaunchpad } = require('./header-data/listLaunchpad')
const { getMetaTagInsight } = require('./header-data/insight')
const { getMetaTag } = require('./modal/MetaTag')
const { getMetaTagAddProject } = require('./header-data/add-project')
const { getMetaTagReportScam } = require('./header-data/report-scam')
const { toCammelCase } = require('./utils/formatText')
const { getScriptSchemaMarkupSiteLinkSearchBoxHomePage } = require('./constants/schemaMarkup')
const { getMetaTagLiveNewToken } = require('./header-data/new-live-token')

// ######## Default meta tag
const metaTagHome = getMetaTagHome()
const META_TITLE = metaTagHome.title
const META_IMAGE = metaTagHome.image
const META_DESCRIPTION = metaTagHome.description
const META_UNIQUE_LINK = metaTagHome.uniqueLink // DOMAIN
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
  let dynamicMetaIndexHtml = file?.getIndexHtml()
  // ##### replace all unique link first #####
  dynamicMetaIndexHtml = dynamicMetaIndexHtml
    ?.split(META_UNIQUE_LINK)?.join(metaTag?.uniqueLink) // equal replace all

  // ##### replace next image (contain link) #####
  const isInternalImage = metaTag?.image && metaTag?.image?.length >= 1 && metaTag?.image[0] === '/'
  let linkImgTwitter = ''
  let linkImgOg = ''
  if (isInternalImage) {
    linkImgTwitter = `${META_UNIQUE_LINK}${metaTag?.image}`
    linkImgOg = metaTag?.image
  } else {
    // External image
    linkImgTwitter = metaTag?.image
    linkImgOg = metaTag?.image
  }
  // twitter:image (contain link replace above + image file name og:image below)
  dynamicMetaIndexHtml = dynamicMetaIndexHtml
    ?.replace(`${metaTag?.uniqueLink}${META_IMAGE}`, linkImgTwitter)
  // og:image
  dynamicMetaIndexHtml = dynamicMetaIndexHtml
    ?.replace(META_IMAGE, linkImgOg)

  // ##### replace all others #####
  dynamicMetaIndexHtml = dynamicMetaIndexHtml
    ?.split(META_TITLE)?.join(metaTag?.title)
    ?.split(META_DESCRIPTION)?.join(metaTag?.description)

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
    txtAdditional = '[SCAMMED!]'
  } else
  // Warning project
  if (isWarning) {
    txtAdditional = '[WARNING!]'
  }
  const rawScore = score
  const txtTop = '[TOP]'
  const minScoreTop = 8
  if (txtAdditional === '' && (calculateScore(rawScore, type) >= minScoreTop)) {
    txtAdditional = txtTop
  }
  if (txtAdditional !== '') {
    txtAdditional += ' '
  }
  return txtAdditional
}

const getCurrentTimeUnix = () => {
  let myCurrentDateTimeUnix = (new Date())
  myCurrentDateTimeUnix = myCurrentDateTimeUnix?.getTime()
  return myCurrentDateTimeUnix
}

// getEndDate = true (plus one day to get next day)
const convertStringDDMMYYYYToUnix = (ddmmyyyy, getEndDate = false) =>{
  let dateUnix = new Date(ddmmyyyy?.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'))
  dateUnix.setTime(dateUnix?.getTime()) // Local user to GMT + 0
  if (getEndDate) {
    const millSecInOneDay = 1000 * 60 * 60 * 24 // 86400000 milliseconds.
    // convert start day to end day --> (>=start && <end of endDate) still in status ongoing project IDO/ ICO/ IEO
    dateUnix.setTime(dateUnix?.getTime() + millSecInOneDay)
  }
  dateUnix = dateUnix?.getTime()
  return (dateUnix)
}

// match with BE
const statusUpcoming = 'upcoming'
const statusOngoing = 'ongoing'
const statusPast = 'past'

const getURLFromRequest = (req) => {
  // META_UNIQUE_LINK is home page
  return META_UNIQUE_LINK + req?.originalUrl
}

const getStatusFromStartDateAndEndDate = (startDate, endDate) => {
  const myCurrentDateTimeUnix = getCurrentTimeUnix()

  if (startDate !== null && endDate !== null) {
    // string "15-05-2018" to date unix time
    const startDateUnix = convertStringDDMMYYYYToUnix(startDate)

    const endDateUnix = convertStringDDMMYYYYToUnix(endDate, true)

    // Ongoing
    if (myCurrentDateTimeUnix >= startDateUnix && myCurrentDateTimeUnix <= endDateUnix) {
      return statusOngoing
    } else
    // Past
    if (myCurrentDateTimeUnix > endDateUnix) {
      return statusPast
    } else
    // Upcoming
    if (myCurrentDateTimeUnix < startDateUnix) {
      return statusUpcoming
    }
    return ''
  } else {
    return ''
  }
}

const genDetailHeader = (req, res, productId = '') => {
  const uniqueLink = getURLFromRequest(req)
  if (productId) {
    productId = encodeSpecialCharacterUrl(productId)
    productId = `gear5_${productId}`
    axios({
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${DOMAIN_READ}${PATH_DETAIL_PRODUCT}${productId}`,
      timeout: API_TIME_LIMIT
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
        // have data, and at least one in two has data is number greater than 0
        const totalScam = data?.totalIsScam
        const totalReview = data?.totalReviews
        if ((isInteger(totalScam) && isInteger(totalReview))) {
          if (totalScam !== 0 && totalReview !== 0) {
            const txtTotalScam = `${data?.totalIsScam} Scam Report${data?.totalIsScam === 1 ? '' : 's'}`
            const txtTotalReviews = `${data?.totalReviews} Review${data?.totalReviews === 1 ? '' : 's'}`
            // prefer display total review first
            if (totalReview > totalScam) {
              totalInteract += ` ${txtTotalReviews}, ${txtTotalScam} | `
            } else {
              totalInteract += ` ${txtTotalScam}, ${txtTotalReviews} | `
            }
          } else if (totalScam !== 0) {
            const txtTotalScam = `${data?.totalIsScam} User${data?.totalIsScam === 1 ? '' : 's'} Report${data?.totalIsScam === 1 ? 's' : ''} As Scam`
            totalInteract += ` ${txtTotalScam} | `
          } else if (totalReview !== 0) {
            const txtTotalReviews = `${data?.totalReviews} User${data?.totalReviews === 1 ? '' : 's'} Contribute${data?.totalReviews === 1 ? 's' : ''} Review`
            totalInteract += ` ${txtTotalReviews} | `
          }
        } else {
          totalInteract += ' '
        }

        const extraData = getSubTitle()
        const isScam = data?.isScam
        const isWarning = data?.isWarning
        const rawScore = data?.score
        switch (productId) {
          case data?.cryptoId :{
            imgPath = CRYPTO
            if (data?.type === 'token') {
              title = `${data?.name} (${data?.symbol}) ${data?.address} review on Gear5`
              // overide description
              if (isScam) {
                cleanDescription = `Token ${data?.name} (${data?.symbol}) ${data?.address} is marked as a scam/dead project by our system and our community`
              } else if (isInteger(totalScam) && isInteger(totalReview) && totalScam > 0 && totalReview > 0) {
                cleanDescription = `Token ${data?.name} (${data?.symbol}) ${data?.address} has ${totalReview} comment and ${totalScam} reported as a scam. Please join us to discuss and review this project.`
              } else if (isInteger(totalScam) && totalScam > 0) {
                cleanDescription = `Token ${data?.name} (${data?.symbol}) ${data?.address} is reported as a scam project by ${totalScam} invester.`
              } else {
                cleanDescription = `Token ${data?.name} (${data?.symbol}) ${data?.address} please join us to discuss and review project`
              }
            } else if (data?.type === 'coin') {
              if ((isInteger(totalScam) && totalScam > 0) || (isInteger(totalReview) && totalReview > 0)) {
                title = `Review & Discuss ${data?.name} (${data?.symbol}) -${totalScam ? ` ${totalScam} reported as a scam` : ''}${totalReview ? ` ${totalReview} comment` : ''} | Gear5`
              } else {
                title = `${data?.name} (${data?.symbol}) - Review & Discuss Cryptocurrency projects | Gear5`
              }
            } else {
              title = `${getTxtAdditional(isScam, isWarning, rawScore, CRYPTO)}${title}${data?.symbol ? ` (${data?.symbol})` : ''},${totalInteract} Crypto Projects${extraData}`
            }
            break
          }
          case data?.dAppId :{
            imgPath = DAPP
            if ((isInteger(totalScam) && totalScam > 0) || (isInteger(totalReview) && totalReview > 0)) {
              title = `Review ${data?.dAppName} project -${totalScam ? ` ${totalScam} reported as a scam` : ''}${totalReview ? ` ${totalReview} comment` : ''} | Gear5`
            } else {
              title = `Reviews & Discuss ${data?.dAppName} - project Dapps | Gear5`
            }
            break
          }
          case data?.ventureId :{
            imgPath = VENTURE
            title = `${data?.ventureName} Crypto Ventures | Portfolio & Details | Gear5`
            break
          }
          case data?.exchangeId :{
            imgPath = EXCHANGE
            if ((isInteger(totalScam) && totalScam > 0) || (isInteger(totalReview) && totalReview > 0)) {
              title = `${data?.name} ${data?.subCategory} -${totalScam ? ` ${totalScam} reported as a scam` : ''}${totalReview ? ` ${totalReview} comment` : ''} | Crypto Exchanges | Gear5`
            } else {
              title = `${data?.name} ${data?.subCategory} | Reviews & Discuss Crypto Exchanges | Gear5`
            }
            break
          }
          // Soon Project
          case data?.projectId :{
            imgPath = SOON
            let soonStatus = getStatusFromStartDateAndEndDate(data?.startDate, data?.endDate)
            if (isInteger(totalReview) && totalReview > 0) {
              soonStatus = soonStatus ? `${soonStatus} |` : soonStatus
              title = `${data?.projectName} (${data?.projectSymbol}) - ${data?.roundType} - ${totalReview} Reviews |${soonStatus ? ` ${toCammelCase(soonStatus)}` : ''} Gear5`
            } else {
              title = `${data?.projectName} (${data?.projectSymbol}) - ${data?.roundType} |${soonStatus ? ` ${toCammelCase(soonStatus)}` : ''} | Project details | Gear5`
            }
            break
          }
          case data?.launchPadId :{
            imgPath = LAUNCHPAD
            title = `${data?.name} Crypto Launchpads | Invest Data & Details | Gear5`
            break
          }
        }
        // small logo: s3 (SOON) meaning has data, exchange: smallLogo
        const hasImage = data?.bigLogo || data?.dAppLogo || data?.ventureLogo || data?.smallLogo || data?.thumbLogo || data?.nativeLogo
        const image = (productId && hasImage) ? `${DOMAIN_IMAGE}/image/${imgPath}/bigLogo/${productId}.png` : META_IMAGE

        return res.send(injectHtmlHeader(getMetaTag(title, image, cleanDescription, uniqueLink)))
      }).catch((error) => {
        console.error(`Error call API detail product | ${error.name}: ${error.message}`)
        return res?.send(injectHtmlHeader(getMetaTag(META_TITLE, META_IMAGE, META_DESCRIPTION, uniqueLink)))
      })
  } else {
    // don't have product id
    return res?.send(injectHtmlHeader(getMetaTag(META_TITLE, META_IMAGE, META_DESCRIPTION, uniqueLink)))
  }
}

const getDetailInsightHeader = (req, res, chartName = '') =>{
  const uniqueLink = getURLFromRequest(req)
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
        return res.send(injectHtmlHeader(getMetaTag(title, image, description, uniqueLink)))
      }).catch((error) => {
        console.error(`Error call API detail insight | ${error.name}: ${error.message}`)
        return res?.send(injectHtmlHeader(getMetaTagInsight(uniqueLink)))
      })
  } else {
    // don't have product id
    return res?.send(injectHtmlHeader(getMetaTagInsight(uniqueLink)))
  }
}

const genStaticHeader = (res, metaTag) => {
  return res?.send(injectHtmlHeader(metaTag))
}

const genListHeader = (req, res, category, subCategory) => {
  if (subCategory) {
    // split between word category from '-' to ' '
    subCategory = subCategory?.split('-')?.join(' ')
  }
  const uniqueLink = getURLFromRequest(req)
  switch (category) {
    case CRYPTO:{
      genStaticHeader(res, getMetaTagListCrypto(subCategory, uniqueLink))
      break
    }
    case DAPP:{
      genStaticHeader(res, getMetaTagListDApp(subCategory, uniqueLink))
      break
    }
    case VENTURE:{
      genStaticHeader(res, getMetaTagListVenture(uniqueLink))
      break
    }
    case EXCHANGE:{
      genStaticHeader(res, getMetaTagListExchange(subCategory, uniqueLink))
      break
    }
    case SOON:{
      genStaticHeader(res, getMetaTagListSoon(subCategory, uniqueLink))
      break
    }
    case LAUNCHPAD:{
      genStaticHeader(res, getMetaTagListLaunchpad(uniqueLink))
      break
    }
    case 'insight':{
      genStaticHeader(res, getMetaTagInsight(uniqueLink))
      break
    }
    default: {
      genStaticHeader(res, getMetaTag(META_TITLE, META_IMAGE, META_DESCRIPTION, uniqueLink))
      break
    }
  }
}

const isBotRequest = (req) => {
  return isbot(req.get('user-agent'))
}

// ######## detail page
// detail: crypto(coin)
app.get(`/products/crypto/coin/:coinName`, (req, res) => {
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    // console.log('detail: crypto(coin)')
    const coinName = req?.params?.coinName
    genDetailHeader(req, res, coinName ? `coin_${coinName}` : '')
  }
})

// detail: crypto(token)
app.get(`/products/crypto/token/:chainName/:tokenAddress`, (req, res) => {
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    // console.log('detail: crypto(token)')
    const chainName = req?.params?.chainName
    const tokenAddress = req?.params?.tokenAddress
    genDetailHeader(req, res, (chainName && tokenAddress) ? `token_${chainName}_${tokenAddress}` : '')
  }
})

// detail: dApp, venture, exchange, soon, launchpad
app.get(`/products/:category/:productName`, (req, res) => {
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    const category = req?.params?.category
    const productName = req?.params?.productName
    // console.log('detail', category, productName)
    genDetailHeader(req, res, (category && productName) ? `${category}_${productName}` : '')
  }
})

// detail: insight
app.get(`/insight/:chartName`, (req, res) => {
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    const chartName = req?.params?.chartName
    getDetailInsightHeader(req, res, chartName)
  }
})

// ######## Otherwise page,..

// Live new token
app.get(`/new-tokens`, (req, res)=>{
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
  // console.log(`/new-tokens`)
    genStaticHeader(res, getMetaTagLiveNewToken(getURLFromRequest(req)))
  }
})

// Report Scam page
app.get(`/report-scam`, (req, res) => {
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    // console.log(`/report-scam`)
    genStaticHeader(res, getMetaTagReportScam(getURLFromRequest(req)))
  }
})

// Add Project page
app.get(`/add-project`, (req, res) => {
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    // console.log(`/add-project`)
    genStaticHeader(res, getMetaTagAddProject(getURLFromRequest(req)))
  }
})

// list
app.get('/:category', (req, res) => {
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    const category = req?.params?.category
    // console.log('list', category)
    genListHeader(req, res, category)
  }
})

// list with sub-category
app.get('/:category/:subCategory', (req, res) =>{
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    const category = req?.params?.category
    const subCategory = req?.params?.subCategory
    // console.log('list', category, 'subCategory', subCategory)
    genListHeader(req, res, category, subCategory)
  }
})

// home (NOT WORKING when use express.static)
app.get('/', (req, res) => {
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    // console.log('home')
    genStaticHeader(res, getMetaTagHome())
  }
})

// otherwise page
app.get('/*', (req, res) => {
  if (isBotRequest(req)) {
    res.send('rate limit')
  } else {
    // console.log('other')
    const uniqueLink = getURLFromRequest(req)
    genStaticHeader(res, getMetaTag(META_TITLE, META_IMAGE, META_DESCRIPTION, uniqueLink))
  }
})

// listening...
app.listen(PORT, (error) => {
  if (error) {
    console.error('Error during app startup', error)
  }
  console.log('listening on ' + PORT + '...')
  console.log(`DOMAIN_READ`, DOMAIN_READ)
  console.log(`DOMAIN_IMAGE`, DOMAIN_IMAGE)
})
