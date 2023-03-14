import { Helmet } from 'react-helmet-async'
import { getHeaderHome } from './server/home'

export const SEO = ({ props }) => {
  // <!-- Title data from index.html -->
  const title = props?.title || getHeaderHome()

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default SEO
