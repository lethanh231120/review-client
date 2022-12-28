import React, { useState, useEffect } from 'react'
import ProjectSearch from '../projects/project-search/ProjectSearch'
import './categoryItem.scss'
import { useLocation } from 'react-router-dom'
import { get, post } from '../../api/products'
import { Pagination, Spin, Empty } from 'antd'
import nodata from '../../assets/images/nodata.png'
import _ from 'lodash'

const CategoryItem = () => {
  const PAGE_SIZE = 50
  const [listProduct, setListProduct] = useState([])
  const [total, setTotal] = useState()
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState({
    page: 1,
    type: '',
    category: '',
    subcategory: '',
  })
  const location = useLocation()

  useEffect(() => {
    const getData = async() => {
      setLoading(true)
      let param = {}
      if (location?.state !== null) {
        if (location?.state?.dataSearch) {
          const listProductId = []
          location?.state?.dataSearch?.forEach((item) => {
            listProductId.push(item?.id)
          })
          if (!_.listProductId) {
            const data = await post('reviews/product/products', { productIds: listProductId })
            setListProduct(data?.data?.products)
          }
          setLoading(false)
        } else {
          param = {
            ...params,
            ...location?.state?.params
          }
        }
      } else {
        param = params
      }
      const dataBySearch = await get ('reviews/product/filters', param)
      setListProduct(dataBySearch?.data?.products !== null ? dataBySearch?.data?.products : [])
      setTotal(dataBySearch?.data?.productCount)
      setLoading(false)
      setParams(param)
    }
    getData()
  }, [location])

  const handleChangePage = async(value) => {
    setLoading(true)
    const param = {
      ...params,
      page: value
    }
    const dataBySearch = await get ('reviews/product/filters', param)
    setListProduct(dataBySearch?.data?.products !== null ? dataBySearch?.data?.products : [])
    setTotal(dataBySearch?.data?.productCount)
    setLoading(false)
    setParams(param)
  }

  console.log(location)
  return (
    <div
      className='category-page'
    >
      {loading ? (<Spin wrapperClassName='spin' tip="Loading" size="large">
          <div className="content" />
        </Spin>) : (
        <div className='category-list'>
          {_.isEmpty(listProduct) ? (
            <Empty
              image={nodata}
              description={
                <span>
                  <span style={{ fontSize: '2.2rem', color: 'red', fontWeight: 600 }}>SORRY </span>
                  <span style={{ fontSize: '1.8rem', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '600' }}>NO DATA FOUND</span>
                </span>
              }
            />
          ) : (
            <>
              {listProduct?.map((item, index) => (
                <ProjectSearch data={item} total={total} key={index}/>
              ))}
            </>
          )}
        </div>
      )}
      {total > PAGE_SIZE && (
        <>
          {!loading && (
            <div className='category-paginate'>
              <Pagination
                total={total}
                current={params?.page}
                pageSize={PAGE_SIZE}
                showSizeChanger={false}
                onChange={(value) => handleChangePage(value)}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CategoryItem
