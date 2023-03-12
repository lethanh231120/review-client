const { getMetaTagHome } = require('../header-data/home')

const DOMAIN_FE = 'https://soon1.gear5.io'
const ORGANIZATION_NAME = 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ CÔNG NGHỆ NIKA'
const DEFAULT_LOGO = 'logo.webp'
const GEAR5_EMAIL = 'gear5@nika.guru'
const CTO_TITLE = 'CTO'
const CTO_TELEPHONE = '0394 308 320'
const ADDRESS_COUNTRY = 'Việt Nam'
const ADDRESS_POSTAL_CODE = '100000'
const urlSchemaOrg = 'https://schema.org'
const urlSearch = 'https://www.google.com/search?q=' // using google search
const sameAs1 = 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-dau-tu-va-cong-nghe-nika/117660.html'
const breadcrumbHome = 'Home'
const dateRefreshArticle = '2023-01-01T00:00:00Z'
// Default meta tag
const metaTagHome = getMetaTagHome()
const META_TITLE = metaTagHome.title

// ##########################################
// *** ONLY HOME: Sitelinks search box schema markup
const schemaMarkupSiteLinkSearchBoxHomePage = `{"@context":"${urlSchemaOrg}","@type":"WebSite","url":"${DOMAIN_FE}","potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"${urlSearch}{search_term_string}"},"query-input":"required name=search_term_string"}]}`
// Person schema markup
const schemaMarkupPerson = `{"@context":"${urlSchemaOrg}","@type":"Person","name":"${ORGANIZATION_NAME}","url":"${DOMAIN_FE}","sameAs":["${sameAs1}"]}`
// WebSite schema markup
const schemaMarkupWebSite = `{"@context":"${urlSchemaOrg}","@type":"WebSite","name":"${META_TITLE}","url":"${DOMAIN_FE}"}`
// Organization schema markup
const schemaMarkupOrganization = `{"@context":"${urlSchemaOrg}","@type":"Organization","name":"${ORGANIZATION_NAME}","url":"${DOMAIN_FE}","logo":"${DOMAIN_FE}/${DEFAULT_LOGO}","email":"mailto: ${GEAR5_EMAIL}","sameAs":["${sameAs1}"],"contactPoint":[{"@type":"ContactPoint","telephone":"${CTO_TELEPHONE}","contactType":"${CTO_TITLE}"}],"address":{"@type":"PostalAddress","addressLocality":"","addressRegion":"","addressCountry":"${ADDRESS_COUNTRY}","postalCode":"${ADDRESS_POSTAL_CODE}","streetAddress":""}}`
// BreadcrumbList schema markup
const schemaMarkupBreadcrumbList = `{"@context":"${urlSchemaOrg}","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"${breadcrumbHome}","item":"${DOMAIN_FE}"}]}`
// Article schema markup
const schemaMarkupArticle = `{"@context":"${urlSchemaOrg}","@type":"Article","name":"${META_TITLE}","url":"${DOMAIN_FE}","sameAs":"${DOMAIN_FE}","mainEntity":"${DOMAIN_FE}","author":{"@type":"Organization","name":"${ORGANIZATION_NAME}","url":"${DOMAIN_FE}"},"publisher":{"@type":"Organization","name":"${ORGANIZATION_NAME}","logo":{"@type":"ImageObject","url":"${DOMAIN_FE}/${DEFAULT_LOGO}"}},"datePublished":"${dateRefreshArticle}","dateModified":"${dateRefreshArticle}","image":"${DOMAIN_FE}/${DEFAULT_LOGO}","headline":"${META_TITLE}"}`
// BlogPosting schema markup
const schemaMarkupBlogPosting = `{"@context":"${urlSchemaOrg}","@type":"BlogPosting","mainEntityOfPage":{"@type":"WebPage","@id":"${DOMAIN_FE}"},"headline":"${META_TITLE}","image":"${DOMAIN_FE}","author":{"@type":"Person","name":"${ORGANIZATION_NAME}","url":"${DOMAIN_FE}/${DEFAULT_LOGO}"},"publisher":{"@type":"Organization","name":"${ORGANIZATION_NAME}","logo":{"@type":"ImageObject","url":"${DOMAIN_FE}/${DEFAULT_LOGO}"}},"datePublished":"${dateRefreshArticle}","dateModified":"${dateRefreshArticle}"}`

// *** ONLY DETAIL: NewsArticle search box schema markup
const jsonNewsArticle = `
{
   "@context": "https://schema.org",
   "@type": "NewsArticle",
   "url": "http://www.bbc.com/news/world-us-canada-39324587",
   "publisher":{
      "@type":"Organization",
      "name":"BBC News",
      "logo":"http://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1"
   },
   "headline": "Trump Russia claims: FBI's Comey confirms investigation of election 'interference'",
   "mainEntityOfPage": "http://www.bbc.com/news/world-us-canada-39324587",
   "articleBody": "Director Comey says the probe into last year's US election would assess if crimes were committed.",
   "image":[
      "http://ichef-1.bbci.co.uk/news/560/media/images/75306000/jpg/_75306515_line976.jpg",
      "http://ichef.bbci.co.uk/news/560/cpsprodpb/8AB9/production/_95231553_comey2.jpg",
      "http://ichef.bbci.co.uk/news/560/cpsprodpb/17519/production/_95231559_committee.jpg",
      "http://ichef.bbci.co.uk/news/560/cpsprodpb/CC81/production/_95235325_f704a6dc-c017-4971-aac3-04c03eb097fb.jpg",
      "http://ichef-1.bbci.co.uk/news/560/cpsprodpb/11AA1/production/_95235327_c0b59f9e-316e-4641-aa7e-3fec6daea62b.jpg",
      "http://ichef.bbci.co.uk/news/560/cpsprodpb/0F99/production/_95239930_trumptweet.png",
      "http://ichef-1.bbci.co.uk/news/560/cpsprodpb/10DFA/production/_95241196_mediaitem95241195.jpg",
      "http://ichef.bbci.co.uk/news/560/cpsprodpb/2CA0/production/_95242411_comey.jpg",
      "http://ichef.bbci.co.uk/news/560/cpsprodpb/11318/production/_95242407_mediaitem95242406.jpg",
      "http://ichef-1.bbci.co.uk/news/560/cpsprodpb/BCED/production/_92856384_line976.jpg",
      "http://ichef-1.bbci.co.uk/news/560/cpsprodpb/12B64/production/_95244667_mediaitem95244666.jpg"
   ],
   "datePublished":"2017-03-20T20:30:54+00:00"
}
`

const REPLACE_JSON = `REPLACE_JSON`
const scriptLdJson = `<script type="application/ld+json">${REPLACE_JSON}</script>`
// QA, review
const schemaMarkupNewsArticleDetailPage = scriptLdJson?.replace(REPLACE_JSON, jsonNewsArticle)
// ##########################################

module.exports.getScriptSchemaMarkupSiteLinkSearchBoxHomePage = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupSiteLinkSearchBoxHomePage)

module.exports.getScriptSchemaMarkupNewsArticleDetailPage = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupNewsArticleDetailPage)

module.exports.getScriptSchemaMarkupPerson = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupPerson)

module.exports.getScriptSchemaMarkupWebSite = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupWebSite)

module.exports.getScriptSchemaMarkupOrganization = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupOrganization)

module.exports.getScriptSchemaMarkupBreadcrumbList = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupBreadcrumbList)

module.exports.getScriptSchemaMarkupArticle = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupArticle)

module.exports.getScriptSchemaMarkupBlogPosting = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupBlogPosting)

