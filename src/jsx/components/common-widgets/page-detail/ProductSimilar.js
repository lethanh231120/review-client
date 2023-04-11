import React from 'react'
import Similar from '../../product-detail/similar/Similar'
import _ from 'lodash'

export const ProductSimilar = ({ productType, similarList }) => {
  return !_.isEmpty(similarList) && (
    <>
      <div className='card-header border-0 pb-0 cus-card-header'>
        <div className='heading text-primary cus-heading'>Similar</div>
      </div>
      {/* <div className='card-body pt-3'> */}
      <div className='profile-interest '>
        <Similar type={productType} listProjectId={similarList}/>
      </div>
      {/* </div> */}
    </>
  )
}
