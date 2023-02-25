import React from 'react'
import { NavLink } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className='authincation '>
      <div className='container'>
        <div className='row justify-content-center h-100 align-items-center '>
          <div className='col-md-7'>
            <div className='form-input-content text-center error-page'>
              <h1 className='error-text fw-bold'>404</h1>
              <h4>
                <i className='fa fa-exclamation-triangle text-warning' />{' '}
                   The page you were looking for is not found!
              </h4>
              <p>
                   You may have mistyped the address or the page may have
                   moved.
              </p>
              <div>
                <NavLink className='btn btn-primary' to='/'>
                      Back to Home
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
