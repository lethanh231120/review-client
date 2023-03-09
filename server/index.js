const express = require('express')
const app = express()
const path = require('path')
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html')
const fs = require('fs')
const axios = require('axios')
const constantRoute = require('./constants/route')
const constantData = require('./constants/data')
const constantErrMsg = require('./constants/errorMsg')
const constantRespCode = require('./constants/responseCode')
const constantHeaderTag = require('./constants/headerTag')
const PORT = process.env.PORT || 3000

// ####### START LOGIC ########
// get dynamic data for header tag by [productId] analysed from client url
// default [productId] is absent data, it mean no override header dynamic data
const genDetailHeader = (res, productId = constantData?.emptyString) =>{
  // read file index.html to override
  fs.readFile(indexPath, 'utf8', (error, htmlData) => {
    // read file error
    if (error) {
      console.error(constantErrMsg?.errorReadingFile, error)
      return res.status(constantRespCode?.codeNotFound).end()
    }
    // has data productId
    if (productId) {
      productId = `${constantRoute?.prefixDetailProduct}${constantRoute?.splitDetailProduct}${productId}`
      try {
        console.log(`===============product id`, productId)
        axios.get(`https://api-client.gear5.io/reviews/product/detail?productId=${productId}`).then((resp) => {
          const respData = resp?.data?.data?.details
          // no data from [productId] found
          if (!respData) {
            throw new Error(constantErrMsg?.errorNoDataDynamicHeaderDetail)
          }
          // inject meta tags
          const title = respData?.name || respData?.dAppName || respData?.ventureName || respData?.projectName || constantHeaderTag?.defaultTitle
          const image = respData?.bigLogo || respData?.dAppLogo || respData?.ventureLogo || respData?.smallLogo || respData?.thumbLogo || constantHeaderTag?.defaultImage
          const description = respData?.description || respData?.fullDescription || respData?.shortDescription || respData?.fullDesc || respData?.shortDesc || constantHeaderTag?.defaultDescription
          console.log(`===============dynamic header `, title, image, description)

          htmlData.replace(
            '<title>React App</title>',
            `<title>${title}</title>`
          )
            .replace('__META_OG_TITLE__', title)
            .replace('__META_OG_DESCRIPTION__', description)
            .replace('__META_DESCRIPTION__', description)
            .replace('__META_OG_IMAGE__', image)
          return res.send(htmlData)
        })
      } catch (error) {
        console.error(`===err1`, constantErrMsg?.errorDynamicHeaderDetail, error)
        // return res.status(constantRespCode?.codeServerError).end()
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        return res.send(htmlData)
      }
    }
    return res.send(htmlData)
  })
}
// ####### END LOGIC   ########

// static resources should just be served as they are
app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxAge: '30d' }
))

// dApp, venture, exchange, soon, launchpad
app.get(`${constantData?.slash}${constantRoute?.pathProduct}${constantData?.slash}:category${constantData?.slash}:productName`, async(req, res) => {
  const category = req?.params?.category
  const isCorrectPath = [constantRoute?.pathDapp, constantRoute?.pathVenture, constantRoute?.pathExchange, constantRoute?.pathSoon, constantRoute?.pathLaunchpad].includes(category)
  const productName = req?.params?.productName
  genDetailHeader(res, (productName && isCorrectPath) ? `${category}${constantRoute?.splitDetailProduct}${productName}` : constantData?.emptyString)
})
// crypto(coin)
app.get(`${constantData?.slash}${constantRoute?.pathProduct}${constantData?.slash}${constantRoute?.pathCrypto}${constantData?.slash}${constantRoute?.pathCryptoCoin}${constantData?.slash}:coinName`, (req, res) => {
  const coinName = req?.params?.coinName
  genDetailHeader(res, coinName ? `${constantRoute?.pathCryptoCoin}${constantRoute?.splitDetailProduct}${coinName}` : constantData?.emptyString)
})
// crypto(token)
app.get(`${constantData?.slash}${constantRoute?.pathProduct}${constantData?.slash}${constantRoute?.pathCrypto}${constantData?.slash}${constantRoute?.pathCryptoToken}${constantData?.slash}:chainName${constantData?.slash}:tokenAddress`, (req, res) => {
  const chainName = req?.params?.chainName
  const tokenAddress = req?.params?.tokenAddress
  genDetailHeader(res, (chainName && tokenAddress) ? `${constantRoute?.pathCryptoToken}${constantRoute?.splitDetailProduct}${chainName}${constantRoute?.splitDetailProduct}${tokenAddress}` : constantData?.emptyString)
})
// Other
app.get(`${constantData?.slash}*`, (req, res)=>{
  genDetailHeader(res)
})

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.error(constantErrMsg?.errorRunApp, error)
  }
  console.log('listening on ' + PORT + '...')
})
