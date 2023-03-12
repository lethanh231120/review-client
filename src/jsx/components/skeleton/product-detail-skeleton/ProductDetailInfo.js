import React from 'react'
import { Skeleton } from 'antd'

const ProductDetailInfo = () => {
  return (
    <>
      <Skeleton.Input
        active={true}
        style={{
          height: '20px',
          lineHeight: '20px',
          minWidth: '120px',
          width: '120px',
          borderRadius: '2rem',
          marginBottom: '1rem',
          margin: '1rem'
        }}
      />

      <div>
        <Skeleton.Input
          active
          style={{
            margin: '1rem',
            height: '20px',
            lineHeight: '20px',
            minWidth: '200px',
            width: '200px',
            borderRadius: '2rem',
            marginBottom: '1rem'
          }}
        />
        <Skeleton.Input
          active
          style={{
            margin: '1rem',
            height: '20px',
            lineHeight: '20px',
            minWidth: '250px',
            width: '250px',
            borderRadius: '2rem',
            marginBottom: '1rem'
          }}
        />
        <Skeleton.Input
          active
          style={{
            margin: '1rem',
            height: '20px',
            lineHeight: '20px',
            minWidth: '280px',
            width: '280px',
            borderRadius: '2rem',
            marginBottom: '1rem'
          }}
        />
      </div>
    </>
  )
}

export default ProductDetailInfo
