import { Image } from 'antd'
import React from 'react'
import { formatImgUrlFromProductId, isValidProductId } from '../../../../utils/formatText'

export const altSoon = 'soon'
export const altCrypto = 'crypto'

const altImgSoon = 'IDO/ICO/IEO Logo'
const altImgCrypto = 'Cryptocurrency Logo'
const ProductNoImage = ({ projectName }) =>{
  return <span className='image-list-no-data-detail'>
    {projectName?.slice(0, 3)}
  </span>
}

const ProductImage = ({ productId, productName, altImageType }) => {
  let txtAlt
  switch (altImageType) {
    case altSoon:{
      txtAlt = altImgSoon
      break
    }
    case altCrypto:{
      txtAlt = altImgCrypto
      break
    }
  }
  return <div className='profile-photo'>
    {productId ? (
      <Image alt={txtAlt} src={isValidProductId(productId) ? formatImgUrlFromProductId(productId) : <ProductNoImage projectName={productName} />} preview={false}/>
    )
      : (
        <ProductNoImage projectName={productName} />
      )}
  </div>
}

export default ProductImage
