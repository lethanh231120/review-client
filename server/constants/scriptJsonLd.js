const domain = `https://soon1.gear5.io`

const scriptBreadscrumbList = `

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "${domain}"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Science Fiction",
    "item": "https://example.com/books/sciencefiction"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Award Winners"
  }]
}
</script>

`

// News Article schema markup
const scriptSchemaMarkupNewsArticleForDetail = `
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://soon1.gear5.io"
  },
  "headline": "Gear 5 | 99%+ Marked As Scam or Dead/2,3M+ Crypto Projects",
  "description": "Stay up-to-date on the latest cryptocurrency trends, Gear5 provide in-depth reviews and comprehensive information on 2,3M+ cryptocurrencies, helping you make well-informed investment decisions. ",
  "image": {
    "@type": "ImageObject",
    "url": "https://soon1.gear5.io/logo.webp",
    "width": 1200,
    "height": 675
  },
  "datePublished": "2023-03-12T06:22:03+0700",
  "dateModified": "2023-03-12T01:22:08+0700",
  "author": {
    "@type": "Person",
    "name": "Bài và ảnh: Hương Giang",
    "url": "https://soon1.gear5.io"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Báo Nhân Dân điện tử",
    "logo": {
      "@type": "ImageObject",
      "url": "https://static-cms-nhandan.epicdn.me/web/styles/img/logo.png"
    }
  }
}
</script>
`
// Q&A schema markup
const scriptSchemaMarkupQAForDetail = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "QAPage",
  "mainEntity": {
    "@type": "Question",
    "name": "How many ounces are there in a pound?",
    "text": "I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?",
    "answerCount": 3,
    "upvoteCount": 26,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "1 pound (lb) is equal to 16 ounces (oz).",
      "upvoteCount": 1337,
      "url": "https://example.com/question1#acceptedAnswer"
      },
    "suggestedAnswer": [
      {
        "@type": "Answer",
        "text": "Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.",
        "upvoteCount": 42,
        "url": "https://example.com/question1#suggestedAnswer1"
      }, {
        "@type": "Answer",
        "text": " I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.",
        "upvoteCount": 0,
        "url": "https://example.com/question1#suggestedAnswer2"
      }
    ]
  }
}
</script>
`

// Review Product schema markup
const scriptSchemaMarkupProductReviewForDetail = `
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Executive Anvil",
  "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4",
      "bestRating": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Fred Benson"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "reviewCount": "89"
  }
}
</script>
`

module.exports.getScriptBreadscrumbList = () => scriptBreadscrumbList

// ##### For detail page
module.exports.getScriptSchemaMarkupNewsArticleForDetail = () => {
  return scriptSchemaMarkupNewsArticleForDetail
}
module.exports.getScriptSchemaMarkupQAForDetail = () => {
  return scriptSchemaMarkupQAForDetail
}
module.exports.getScriptSchemaMarkupProductReviewForDetail = () => {
  return scriptSchemaMarkupProductReviewForDetail
}
// #####

