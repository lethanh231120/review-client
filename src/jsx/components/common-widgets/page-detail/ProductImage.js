import { Image } from 'antd'
import React from 'react'
import { formatImgUrlFromProductId, isValidProductId } from '../../../../utils/formatText'

export const ProductNoImage = ({ projectName }) =>{
  return <span className='image-list-no-data-detail'>
    {projectName?.slice(0, 3)}
  </span>
}
const ProductImage = ({ productId, productName }) => {
  return <div className='profile-photo'>
    {productId ? (
      <Image alt='IDO/ICO/IEO Logo' src={isValidProductId(productId) ? formatImgUrlFromProductId(productId) : <ProductNoImage projectName={productName} />} preview={false}/>
    )
      : (
        <ProductNoImage projectName={productName} />
      )}
  </div>
}

export default ProductImage
