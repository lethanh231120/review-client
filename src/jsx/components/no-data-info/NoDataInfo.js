import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const NoDataInfo = () => {
  const navigate = useNavigate()

  return (
    <div className='authincation '>
      <div className='container'>
        <div className='row justify-content-center h-100 align-items-center '>
          <div className='col-md-7'>
            <div className='form-input-content text-center error-page'>
              <h1 className='error-text fw-bold'></h1>
              <h4>
                <i className='fa fa-exclamation-triangle text-warning' />{' '}
                   No data founded
              </h4>
              <p>

              </p>
              <div>
                <Button className='btn btn-primary' onClick={() => navigate(-1)}>
                      Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
