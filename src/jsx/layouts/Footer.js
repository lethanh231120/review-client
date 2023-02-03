import React from 'react'

const Footer = () => {
  var d = new Date()
  return (
    <div className='footer out-footer'>
      <div className='copyright'>
        <p>
          Copyright © Developed by{' '}
          <a href='#' target='_blank' rel='noreferrer' style={{ color: 'green' }}>
            Nika Guru
          </a>{' '}
          {d.getFullYear()}
        </p>
      </div>
    </div>
  )
}

export default Footer
