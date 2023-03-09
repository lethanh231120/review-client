class MetaTag {
  constructor(title, image, description) {
    this.title = title
    this.image = image
    this.description = description
  }
}

module.exports.getMetaTag = (title, image, description) => new MetaTag(title, image, description)

