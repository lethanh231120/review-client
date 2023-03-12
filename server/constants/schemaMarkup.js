const { getMetaTagHome } = require('../header-data/home')

const DOMAIN_FE = 'https://soon1.gear5.io'
const ORGANIZATION_NAME = 'soon1.gear5.io'
const DEFAULT_LOGO = 'logo.webp'
const GEAR5_EMAIL = 'gear5@nika.guru'
const CTO_TITLE = 'CTO'
const CTO_TELEPHONE = '0394 308 320'
const ADDRESS_COUNTRY = 'Việt Nam'
const ADDRESS_POSTAL_CODE = '100000'
const urlSchemaOrg = 'https://schema.org'
const urlSearch = 'https://www.google.com/search?q=' // using google search
const sameAs1 = 'https://www.topcv.vn/cong-ty/cong-ty-co-phan-dau-tu-va-cong-nghe-nika/117660.html'
// Default meta tag
const metaTagHome = getMetaTagHome()
const META_TITLE = metaTagHome.title

// ##########################################
// Sitelinks search box schema markup
const schemaMarkupSiteLinkSearchBox = `{"@context":"${urlSchemaOrg}","@type":"WebSite","url":"${DOMAIN_FE}","potentialAction":[{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"${urlSearch}{search_term_string}"},"query-input":"required name=search_term_string"}]}`
// Person schema markup
const schemaMarkupPerson = `{"@context":"${urlSchemaOrg}","@type":"Person","name":"CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ CÔNG NGHỆ NIKA","url":"${DOMAIN_FE}","sameAs":["${sameAs1}"]}`
// WebSite schema markup
const schemaMarkupWebSite = `{"@context":"${urlSchemaOrg}","@type":"WebSite","name":"${META_TITLE}","url":"${DOMAIN_FE}"}`
// Organization schema markup
const schemaMarkupOrganization = `{"@context":"${urlSchemaOrg}","@type":"Organization","name":"${ORGANIZATION_NAME}","url":"${DOMAIN_FE}","logo":"${DOMAIN_FE}/${DEFAULT_LOGO}","email":"mailto: ${GEAR5_EMAIL}","sameAs":["${sameAs1}"],"contactPoint":[{"@type":"ContactPoint","telephone":"${CTO_TELEPHONE}","contactType":"${CTO_TITLE}"}],"address":{"@type":"PostalAddress","addressLocality":"","addressRegion":"","addressCountry":"${ADDRESS_COUNTRY}","postalCode":"${ADDRESS_POSTAL_CODE}","streetAddress":""}}`
// ##########################################

const REPLACE_JSON = `REPLACE_JSON`
const scriptLdJson = `<script type="application/ld+json">${REPLACE_JSON}</script>`

module.exports.getScriptSchemaMarkupSiteLinkSearchBox = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupSiteLinkSearchBox)

module.exports.getScriptSchemaMarkupPerson = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupPerson)

module.exports.getScriptSchemaMarkupWebSite = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupWebSite)

module.exports.getScriptSchemaMarkupOrganization = () =>
  scriptLdJson?.replace(REPLACE_JSON, schemaMarkupOrganization)
