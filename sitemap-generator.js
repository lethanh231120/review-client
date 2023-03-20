require('babel-register')({
  presets: ['es2015', 'react']
})
// const sitemapName = 'Nikadinhdanquanthanhvinhhieploclongtrieu2cbf59c08fe46d17670ea6aed38ec895b5bbb95bd89134dacbcbca82243ade31'
const sitemapName = 'NikaSitemap'

const pages = [
  '', 'add-project', 'report-scam', 'exchanges.xml', 'ventures.xml', 'launchpads.xml', 'dapps.xml', 'idos.xml', 'coins.xml', 'confirm-email', 'search', 'insight',
  'products', 'products/crypto', 'products/dapp', 'products/launchpad', 'products/soon', 'products/venture', 'products/exchange', 'terms-of-service', 'privacy-policy'
  //  'products/not-found-product', 'server-error',
  // 'not-found',  'not-found-product', 'server-error', 'not-found'
]

const tokenPages = 47
const gear5Url = 'https://gear5.io/'
const newTokenPages = 10
const newUpdateTokenUrl = 'https://new-update-info-crypto.gear5.io/'
const newExchangeUrl = 'https://crawl-exchange.gear5.io/new_exchange.xml'
const newVentureUrl = 'https://crawl-venture.gear5.io/new_venture.xml'
const fs = require('fs')

const generateUrl = (content) => {
  // const date = new Date().toISOString()
  return `<url>
  <loc>${content}</loc>
  </url>`
}

const generateSitemap = () => {
  let data = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'

  pages.forEach(item => {
    data = data + generateUrl(`${gear5Url}${item}`)
  })

  Array(tokenPages).fill().forEach((item, index) => {
    data = data + generateUrl(`${gear5Url}token_${index + 1}.xml`)
  })

  Array(newTokenPages).fill().forEach((item, index) => {
    data = data + generateUrl(`${newUpdateTokenUrl}new_token${index + 1}.xml`)
  })

  data = data + generateUrl(`${newExchangeUrl}`)
  data = data + generateUrl(`${newVentureUrl}`)
  data = data + '</urlset>'
  fs.writeFile(`./public/${sitemapName}.xml`, data, (err) => {
    if (err) throw err
  })
}

generateSitemap()
