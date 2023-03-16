const { getMetaTag } = require('../modal/MetaTag')

const staticData = {
  title: `Add Project | Gear5`,
  image: `/add-project.webp`,
  description: `Is there any Project you're looking for not listed in our Database? If YES, please COME HERE to implement yours. We are so thankful if you give a hand helping us as well as the Crypto Community`
}

module.exports.getMetaTagAddProject = () => getMetaTag(staticData.title, staticData.image, staticData.description)
