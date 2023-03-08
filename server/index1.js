const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const axios = require('axios')

const PORT = process.env.PORT || 3000
const indexPath = path.resolve(__dirname, '..', 'build', 'index.html')

// static resources should just be served as they are
app.use(express.static(
  path.resolve(__dirname, '..', 'build'),
  { maxAge: '30d' }
))

const genDetailHeader = (res, productId = '') => {
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error during file reading', err)
      return res.status(404).end()
    }

    console.log(`1===productId`, productId)
    if (productId) {
      axios.get(`https://api-client.gear5.io/reviews/product/detail?productId=gear5_${productId}`).then((resp) =>{
        const data = resp?.data?.data?.details
        console.log(`2===data`, data?.name)
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

// crypto(coin)
app.get(`/products/crypto/coin/:coinName`, (req, res) => {
  const coinName = req?.params?.coinName
  genDetailHeader(res, coinName ? `coin_${coinName}` : '')
})

// crypto(coin)
app.get(`/products/crypto/token/:chainName/:tokenAddress`, (req, res) => {
  const chainName = req?.params?.chainName
  const tokenAddress = req?.params?.tokenAddress
  genDetailHeader(res, (chainName && tokenAddress) ? `token_${chainName}_${tokenAddress}` : '')
})

// dApp, venture, exchange, soon, launchpad
app.get(`/products/:category/:productName`, (req, res) => {
  const category = req?.params?.category
  const productName = req?.params?.productName
  genDetailHeader(res, (category && productName) ? `${category}_${productName}` : '')
})

// test active expressJs
app.get(`/trieudd`, (req, res) => {
  console.log(`trieudd`)
})

// here we serve the index.html page
app.get('/*', (req, res, next) => {
  console.log(`other`)
  fs.readFile(indexPath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error during file reading', err)
      return res.status(404).end()
    }
    htmlData = htmlData.replace(
      '<title>React App</title>',
      '<title>Gear5 - Don`t trust, verify</title>'
    )
      .replace('__META_OG_TITLE__', 'Gear5 - Don`t trust, verify')
      .replace('__META_OG_DESCRIPTION__', `Gear5 is a website that help you connect to the web3 world.`)
      .replace('__META_DESCRIPTION__', `Gear5 is a website that help you connect to the web3 world.`)
      .replace('__META_OG_IMAGE__', `%PUBLIC_URL%/logo.png`)
    return res.send(htmlData)
  })
})
// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error during app startup', error)
  }
  console.log('listening on ' + PORT + '...')
})
