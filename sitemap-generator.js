require('babel-register')({
  presets: ['es2015', 'react']
})
// const sitemapName = 'Nikadinhdanquanthanhvinhhieploclongtrieu2cbf59c08fe46d17670ea6aed38ec895b5bbb95bd89134dacbcbca82243ade31'
const sitemapName = 'general'

const pages = [
  '', 'report-scam', 'insight',
  'crypto', 'dapp', 'launchpad', 'soon', 'venture', 'exchange', 'terms-of-service', 'privacy-policy'
]

const gear5Url = 'https://gear5.io/'
const newTokenPages = 10
const newUpdateTokenUrl = 'https://new-update-info-crypto.gear5.io/'
const newExchangeUrl = 'https://crawl-exchange.gear5.io/new_exchange'
const newVentureUrl = 'https://crawl-venture.gear5.io/new_venture'
const newAdminUpdateUrl = 'https://api-admin.gear5.io/reviews/sitemap/'
const fs = require('fs')

const generateUrl = (content) => {
  // const date = new Date().toISOString()
  return `<url>
  <loc>${content}</loc>
  </url>`
}

const generateGeneralSitemap = () => {
  let data = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'

  pages.forEach(item => {
    data = data + generateUrl(`${gear5Url}${item}`)
  })

  data = data + '</urlset>'
  fs.writeFile(`./public/${sitemapName}.xml`, data, (err) => {
    if (err) throw err
  })
}

const generateIndexSitemap = () =>{
  const fileName = 'NikaSitemap'
  const tokenPages = 57
  const listIndex = ['general', 'coins', 'dapps', 'idos', 'exchanges', 'ventures', 'launchpads']
  const listAdmin = ['idos', 'ventures', 'cryptos', 'exchanges', 'dapps', 'launchpads']

  let data = '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

  listIndex.forEach(name => {
    data = data + `<sitemap><loc>${gear5Url}${name}.xml</loc></sitemap>`
  })

  Array(tokenPages).fill().forEach((item, index) => {
    data = data + `<sitemap><loc>${gear5Url}token_${index + 1}.xml</loc></sitemap>`
  })

  Array(newTokenPages).fill().forEach((item, index) => {
    data = data + `<sitemap><loc>${newUpdateTokenUrl}new_token${index + 1}.xml</loc></sitemap>`
  })

  data = data + `<sitemap><loc>${newExchangeUrl}.xml</loc></sitemap>`
  data = data + `<sitemap><loc>${newVentureUrl}.xml</loc></sitemap>`

  listAdmin.forEach(name =>{
    data = data + `<sitemap><loc>${newAdminUpdateUrl}${name}.xml</loc></sitemap>`
  })

  data = data + '</sitemapindex>'
  fs.writeFile(`./public/${fileName}.xml`, data, (err) => {
    if (err) throw err
  })
}

generateGeneralSitemap()
generateIndexSitemap()
