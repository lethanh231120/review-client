import React, { useState, useEffect } from 'react'
import ProjectSearch from '../projects/project-search/ProjectSearch'
import './categoryItem.scss'
import { useLocation } from 'react-router-dom'
import { get } from '../../api/products'
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
  console.log(location)

  useEffect(() => {
    const getData = async() => {
      let param = {}
      if (location?.state !== null) {
        if (location?.state?.dataSearch) {
          console.log(location?.state?.dataSearch)
          setListProduct(location?.state?.dataSearch)
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
      console.log(param)
      setParams(param)
    }
    getData()
  }, [location])

  useEffect(() => {
    if (!location?.state?.dataSearch) {
      setLoading(true)
      const getData = async() => {
        const dataBySearch = await get ('reviews/product/filters', params)
        console.log(dataBySearch)
        setListProduct(dataBySearch?.data?.products !== null ? dataBySearch?.data?.products : [])
        setTotal(dataBySearch?.data?.productCount)
        setLoading(false)
      }
      getData()
    }
  }, [params])

  const handleChangePage = (value) => {
    console.log(value)
    setLoading(true)
    setParams({
      ...params,
      page: value
    })
  }

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
              // imageStyle={{
              //   height: 60,
              // }}
              description={
                <span>
                  <span style={{ fontSize: '2.2rem', color: 'red', fontWeight: 600 }}>SORRY </span>
                  <span style={{ fontSize: '1.8rem', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '600' }}>NO DATA FOUND</span>
                </span>
              }
            />
          ) : (
            <>
              {listProduct?.map((item) => (
                <ProjectSearch data={item} total={total}/>
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
                onChange={handleChangePage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CategoryItem
