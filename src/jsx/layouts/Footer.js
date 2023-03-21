import React from 'react'
import { Link } from 'react-router-dom'
import { txtTermsOfService } from '../components/term-of-service/TermOfService'
import { emailNika, txtPrivacyPolicy } from './../components/privacy-policy/PrivacyPolicy'

const Footer = () => {
  var d = new Date()
  return (
    <div className='footer out-footer'>
      <div className='copyright'>
        <p>
          Copyright © Developed by{' '}
          <Link
            to={'/'}
            className = 'text-primary txt-link'
          >
            Nika Guru
          </Link>{' '}
          {d.getFullYear()}
          .{' '}Our{' '}
          <Link
            to={'/terms-of-service'}
            className = 'text-primary txt-link'>
            {txtTermsOfService}
          </Link>
          {' '}and{' '}
          <Link
            to={'/privacy-policy'}
            className = 'text-primary txt-link'>
            {txtPrivacyPolicy}
          </Link>
          . Contact us on <span className = 'text-primary txt-link' href='#'>{emailNika}</span>.
        </p>
      </div>
    </div>
  )
}

export default Footer
