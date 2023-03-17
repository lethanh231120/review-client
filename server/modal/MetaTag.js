class MetaTag {
  constructor(title, image, description, uniqueLink) {
    this.title = title
    this.image = image
    this.description = description
    this.uniqueLink = uniqueLink
  }
}

module.exports.getMetaTag = (title, image, description, uniqueLink) => new MetaTag(title, image, description, uniqueLink)

