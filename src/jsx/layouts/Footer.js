import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  var d = new Date()
  return (
    <div className='footer out-footer'>
      <div className='copyright'>
        <p>
          Copyright © Developed by{' '}
          <NavLink to={'/'} target='_blank' rel='noreferrer' style={{ color: 'green' }}>
            Nika Guru
          </NavLink>{' '}
          {d.getFullYear()}
        </p>
      </div>
    </div>
  )
}

export default Footer
