require('babel-register')({
  presets: ['es2015', 'react']
})
const router = require('./sitemap-routes').default
const Sitemap = require('react-router-sitemap').default
const sitemapName = 'Nikadinhdanquanthanhvinhhieploclongtrieu2cbf59c08fe46d17670ea6aed38ec895b5bbb95bd89134dacbcbca82243ade31'

function generateSitemap() {
  var sitemap = new Sitemap(router).build('https://gear5.io')
  const date = new Date().toISOString().slice(0, 10)

  for (const entry of sitemap.sitemaps[0].urls) {
    entry.lastmod = date
  }

  // return (
  //   new Sitemap(router)
  //     .build('https://gear5.io')
  //     .save(`./public/${sitemapName}.xml`)
  // )
  sitemap.save(`./public/${sitemapName}.xml`)
}

generateSitemap()
