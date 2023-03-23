import React, { useEffect, useState } from 'react'
import { Avatar, Image } from 'antd'

export const altSoon = 'soon'
export const altCrypto = 'crypto'
export const altDApp = 'dapp'
export const altVenture = 'venture'
export const altExchange = 'exchange'
export const altLaunchpad = 'launchpad'
export const sizeImg48 = 48
export const sizeImg23_4 = 23.4
export const ProductNoImage = ({ projectName, size }) =>{
  return <Avatar size={size} className='image-list-no-data-detail'>
    {projectName?.slice(0, 3)}
  </Avatar>
}

const ProductImage = ({ imageUrl, productName, altImageType, size }) => {
  const [hasImgData, setHasImgData] = useState(false)

  useEffect(() => {
    setHasImgData(imageUrl)
  }, [])

  return <div className='profile-photo'>
    {hasImgData
      ? <Image
        alt={altImageType}
        src={imageUrl}
        preview={false}
        width={size}
        height={size}
        onError={() => setHasImgData(false)}
      />
      : <ProductNoImage projectName={productName} size={size} />
    }
  </div>
}

export default ProductImage
