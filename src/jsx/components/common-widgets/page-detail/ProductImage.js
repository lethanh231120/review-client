import React, { useEffect, useState } from 'react'
import { Avatar, Image } from 'antd'
import { ImageLoading } from '../../skeleton/product-detail-skeleton/ProductDetailHeader'

export const altSoon = 'soon'
export const altCrypto = 'crypto'
export const altDApp = 'dapp'
export const altVenture = 'venture'
export const altExchange = 'exchange'
export const altLaunchpad = 'launchpad'
export const sizeImg48 = 48
export const sizeImg35 = 35
export const sizeImg25 = 25
export const sizeImg23_4 = 23.4
export const sizeImg32_4 = 32.4
export const ProductNoImage = ({ projectName, size, noMarginRight = false }) =>{
  return <Avatar
    size={size}
    className={`product-no-image ${noMarginRight ? 'me-0' : ''}`}
  >
    {projectName?.slice(0, 3)}
  </Avatar>
}

const ProductImage = ({ imageUrl, productName, altImageType, size, noMarginRight = false }) => {
  const [hasImgData, setHasImgData] = useState(null) // loading state

  useEffect(() => {
    if (imageUrl) {
      setHasImgData(true)
    } else {
      setHasImgData(false)
    }
  }, [imageUrl])

  return <div className='profile-photo' style={{ marginRight: '0.8rem' }}>
    { hasImgData === true
      ? <Image
        alt={altImageType}
        src={imageUrl}
        preview={false}
        width={size}
        height={size}
        style={{ borderRadius: '50%', border: '1px solid rgba(0, 0, 0, 0.1)' }}
        onError={() => setHasImgData(false)}
      />
      : hasImgData === false
        ? <ProductNoImage
          projectName={productName}
          size={size}
          noMarginRight={noMarginRight}
        />
        : ImageLoading(size)
    }
  </div>
}

export default ProductImage
