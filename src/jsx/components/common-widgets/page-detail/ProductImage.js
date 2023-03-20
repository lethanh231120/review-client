import { Avatar, Image } from 'antd'
import React from 'react'
// import { formatImgUrlFromProductId, isValidProductId } from '../../../../utils/formatText'

export const altSoon = 'soon'
export const altCrypto = 'crypto'

const altImgSoon = 'IDO/ICO/IEO Logo'
const altImgCrypto = 'Cryptocurrency Logo'
const ProductNoImage = ({ projectName }) =>{
  return <Avatar size={72} className='image-list-no-data-detail'>
    {projectName?.slice(0, 3)}
  </Avatar>
}

const ProductImage = ({ imageUrl, productName, altImageType }) => {
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
    {imageUrl ? (
      <Image alt={txtAlt} src={imageUrl} preview={false}/>
    )
      : (
        <ProductNoImage projectName={productName} />
      )}
  </div>
}

export default ProductImage
