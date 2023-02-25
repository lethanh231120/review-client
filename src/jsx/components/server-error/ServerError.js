import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const ServerError = () => {
  const navigate = useNavigate()
  return (
    <div className='authincation'>
      <div className='container'>
        <div className='row justify-content-center h-100 align-items-center'>
          <div className='col-md-7'>
            <div className='form-input-content text-center error-page'>
              <h1 className='error-text fw-bold'>500</h1>
              <h4>
                <i className='fa fa-times-circle text-danger' />{' '}
                Service Unavailable
              </h4>
              <p>Sorry, we are under maintenance, try again later!</p>
              <div>
                <Button className='btn btn-primary' onClick={() => navigate('/') }>
                      Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
