import React from 'react'
import { Skeleton } from 'antd'

const SekeletonReviewItem = () => {
  return (
    <div className='col-lg-6 col-xl-4 col-md-6'>
      <div className='card cus-review-card'>
        <div className='card-body cus-review-card-item'>
          <div className='new-arrival-content'>
            <div className='row'>
              <div className='col-10 d-flex '>
                <Skeleton.Avatar active={true} size={50} shape='circle' />
                <div className=' ms-2 mt-1'>
                  <div>
                    <Skeleton.Input
                      active={true}
                      style={{
                        height: '15px',
                        lineHeight: '15px',
                        minWidth: '50px',
                        width: '50px',
                        borderRadius: '2rem'
                      }}
                    />
                  </div>
                  <div>
                    <Skeleton.Input
                      active={true}
                      style={{
                        height: '15px',
                        lineHeight: '15px',
                        minWidth: '75px',
                        width: '75px',
                        borderRadius: '2rem'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-3'>
              <Skeleton.Input
                active={true}
                style={{
                  height: '15px',
                  lineHeight: '15px',
                  minWidth: '200px',
                  width: '100%',
                  borderRadius: '2rem'
                }}
              />
              <Skeleton.Input
                active={true}
                style={{
                  height: '15px',
                  lineHeight: '15px',
                  minWidth: '270px',
                  width: '100%',
                  borderRadius: '2rem'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SekeletonReviewItem
