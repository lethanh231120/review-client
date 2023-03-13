import { Helmet } from 'react-helmet-async'

export const SEO = ({ props }) => {
  // <!-- Title data from index.html -->
  const title = props?.title || `Gear 5 | 99%+ Marked As Scam or Dead /2,3M+ Crypto Projects`

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default SEO
