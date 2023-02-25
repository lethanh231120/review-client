import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const NotFoundProduct = () => {
  const navigate = useNavigate()
  return (
    <div className='authincation '>
      <div className='container'>
        <div className='row justify-content-center h-100 align-items-center '>
          <div className='col-md-7'>
            <div className='form-input-content text-center error-page'>
              <h1 className='error-text fw-bold'>WOW</h1>
              <h4>
                <i className='fa fa-exclamation-triangle text-info' />{` This product don't exist in system.`}
              </h4>
              <p>
                We are very happy if you contribute product you are finding, to make a extraordinary thing, it is valuable to our social and community.
              </p>
              <div>
                {/* 0 currrent not found product page -->  -1 back not found page --> -2 before not found page */}
                <Button className='btn btn-primary' onClick={() => navigate('/add-project') }>
                  Contribute
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
