import { Helmet } from 'react-helmet-async'

export const SEO = ({ props }) => {
  const title = props?.title
  const description = props?.description
  const image = props?.image
  const name = props?.name
  const type = props?.type || 'website'
  const url = props?.url || 'https://soon1.gear5.io/'
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <meta charset='UTF-8' />

      <title>{title}</title>
      <meta name='description' content={description} />

      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='author' content='Gear5' />
      <meta name='keywords'
        content='Gear5, Crypto Projects, DApps, Ventures, Exchanges, Upcomings, ICO, IDO, IFO, Scam address, Website phishing' />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property='og:title' content={title + '123'} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      <meta property='og:url' content={url} />
      <meta property='og:type' content={type} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content={type} />
      {/* End Twitter tags */}
    </Helmet>
  )
}

export default SEO
