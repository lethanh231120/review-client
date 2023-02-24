import { Helmet } from 'react-helmet-async'
import gear5Icon from '../../../images/logo/logo.png'
import { mainColorHex } from '../../constants/color'

export const SEO = ({ props }) => {
  const title = props?.title || `Gear5 - Don't trust, verify`
  const description = props?.description
  const image = props?.image

  const baseKeywords = 'Gear5, Crypto Projects, DApps, Ventures, Exchanges, Upcomings, ICOs, IDOs, IFOs, Launchpads, Scam address, Website phishing'
  const keywords = props?.keywords ? `${props?.keywords}, ${baseKeywords}` : baseKeywords
  const currentHostName = window.location.hostname
  const name = props?.name || currentHostName
  const fullCurrentURl = window.location.href
  const url = props?.url || fullCurrentURl

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <link rel='icon' href={gear5Icon} />
      {/* manifest.json provides metadata used when your web app is installed on a user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
      <link rel='manifest' href='%PUBLIC_URL%/manifest.json' />
      <meta charset='UTF-8' />
      <meta name='theme-color' content={mainColorHex} />
      {/* Setting the viewport to make your website look good on all devices: */}
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <title>{title}</title>
      <meta name='description' content={description} />
      {/* Define the author of a page */}
      <meta name='author' content={name} />
      {/* Define keywords for search engines */}
      <meta name='keywords' content={keywords} />
      {/* End standard metadata tags */}

      {/* Facebook tags */}
      {/* share as post in facebook, ... */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      {/* Image display when comment on facebook, chat on slack, ... */}
      <meta property='og:image' content={image} />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      {/* End Facebook tags */}

      {/* Twitter tags */}
      {/* share as post in only tweeter */}
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      <meta name='twitter:card' content={'summary_large_image'} />
      <meta name='twitter:site' content={`@${url}`} />
      <meta name='twitter:creator' content={name} />
      {/* End Twitter tags */}
    </Helmet>
  )
}

export default SEO
