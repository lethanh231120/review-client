import React from 'react'
import { Skeleton } from 'antd'
export const ImageLoading = (size = 60) => <Skeleton.Avatar active={true} size={size} shape='circle' />
const ProductDetailHeader = () => {
  return (
    <div className='profile-info'>
      <div className='profile-details'>
        <>
          {ImageLoading()}
          <div className='profile-name px-2'>
            <div>
              <Skeleton.Input
                active={true}
                style={{
                  height: '20px',
                  minWidth: '120px',
                  width: '120px',
                  borderRadius: '2rem',
                  marginBottom: '1rem'
                }}
              />
            </div>
            <div>
              <Skeleton.Input
                active={true}
                style={{
                  height: '20px',
                  minWidth: '75px',
                  width: '75px',
                  borderRadius: '2rem'
                }}
              />
            </div>
          </div>
        </>
        <div className='detail-button ms-auto'>
          <Skeleton.Input
            active={true}
            style={{
              height: '30px',
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
              minWidth: '100px',
              width: '100px',
              borderRadius: '2rem'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailHeader
