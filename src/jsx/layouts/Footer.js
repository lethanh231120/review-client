import React from 'react'
import { Link } from 'react-router-dom'

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
          ,{' '}
          <Link
            to={'/terms-of-service'}
            className = 'text-primary txt-link'>
            Term and Service
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}

export default Footer
