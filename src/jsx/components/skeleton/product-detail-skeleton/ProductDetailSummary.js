import React from 'react'
import { Skeleton } from 'antd'

const ProductDetailSummary = () => {
  return (
    <div className='text-center'>
      <div className='row'>
        <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
          <div>
            <Skeleton.Input
              active={true}
              style={{
                height: '25px',
                lineHeight: '25px',
                minWidth: '25px',
                width: '25px',
                borderRadius: '0.4rem'
              }}
            />
          </div>
          <Skeleton.Input
            active
            style={{
              margin: '1rem',
              height: '15px',
              minWidth: '50px',
              width: '50px',
              borderRadius: '2rem'
            }}
          />
        </div>

        <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
          <div>
            <Skeleton.Input
              active={true}
              style={{
                height: '25px',
                lineHeight: '25px',
                minWidth: '25px',
                width: '25px',
                borderRadius: '0.4rem'
              }}
            />
          </div>
          <Skeleton.Input
            active
            style={{
              margin: '1rem',
              height: '15px',
              minWidth: '50px',
              width: '50px',
              borderRadius: '2rem'
            }}
          />
        </div>

        <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
          <div>
            <Skeleton.Input
              active={true}
              style={{
                height: '25px',
                lineHeight: '25px',
                minWidth: '25px',
                width: '25px',
                borderRadius: '0.4rem'
              }}
            />
          </div>
          <Skeleton.Input
            active
            style={{
              margin: '1rem',
              height: '15px',
              minWidth: '50px',
              width: '50px',
              borderRadius: '2rem'
            }}
          />
        </div>
      </div>
      <div className='mt-4 '>
        <Skeleton.Input
          active={true}
          style={{
            height: '30px',
            lineHeight: '30px',
            minWidth: '100px',
            width: '100px',
            borderRadius: '2rem',
            marginRight: '0.5rem'
          }}
        />
        <Skeleton.Input
          active={true}
          style={{
            height: '30px',
            lineHeight: '30px',
            minWidth: '100px',
            width: '100px',
            borderRadius: '2rem',
            marginRight: '0.5rem'
          }}
        />
      </div>
    </div>
  )
}

export default ProductDetailSummary
