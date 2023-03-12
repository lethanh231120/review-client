const { getMetaTag } = require('../modal/MetaTag')

const staticData =
`

`

module.exports.getMetaTagHome = () => getMetaTag(staticData.title, staticData.image, staticData.description)
