import React from 'react'
import ProductDetailHeader from './ProductDetailHeader'
import ProductDetailInfo from './ProductDetailInfo'
import ProductDetailSummary from './ProductDetailSummary'
import ProductDetailChart from './ProductDetailChart'
import ProductDetailReview from './ProductDetailReview'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import { Skeleton } from 'antd'
import './skeleton.scss'

const ProductDetailEmpty = () => {
  return (
    <>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='profile card card-body'>
            <ProductDetailHeader/>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-xl-5'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='card'>
                <div className='card-body'>
                  <div className='profile-statistics'>
                    <ProductDetailSummary/>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-12'>
              <div className='card'>
                <ProductDetailInfo/>
              </div>
            </div>

            <div className='col-lg-12'>
              <div className='card'>
                <ProductDetailInfo/>
              </div>
            </div>

            <div className='col-lg-12 mt-4'>
              <div className='card'>
                <MySkeletonLoadinng count={5} height={50}/>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-7'>
          <div className='card cus-margin-top'>
            <ProductDetailChart/>
          </div>
          <div className='product-detail'>
            <Skeleton.Input active/>
            <Skeleton.Input active/>
            <Skeleton.Input active/>
            <Skeleton.Input active/>
          </div>

          <div className='card mt-4'>
            <ProductDetailReview/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailEmpty
