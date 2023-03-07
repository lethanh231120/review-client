import React, { useRef, useState, useEffect } from 'react'
import './categoryItem.scss'
import { useParams } from 'react-router-dom'
import { Pagination, Row, Col } from 'antd'
import Dapp from '../table/dapp/Dapp'
import Exchange from '../table/exchange/Exchange'
import Crypto from '../table/crypto/Crypto'
import Venture from '../table/venture/Venture'
import Soon from '../table/soon/Soon'
import { DAPP, EXCHANGE, CRYPTO, SOON, VENTURE, CRYPTO_COIN, CRYPTO_TOKEN, LAUNCHPAD } from '../../constants/category'
import { get, search } from '../../../api/BaseRequest'
import TabSearch from './TabSearch'
import { PAGE_SIZE, MAX_PAGE } from '../../constants/pagination'
import { useNavigate } from 'react-router-dom'
import { decodeUrl } from '../../../utils/formatUrl'
import _ from 'lodash'
import LaunchpadList from '../table/launchpad/LaunchpadTable'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'

const CategoryItem = () => {
  const navigate = useNavigate()
  const { category, subCategory, keyword, categorySearch } = useParams()
  const refabc = useRef()
  const [listProduct, setListProduct] = useState()
  const [total, setTotal] = useState()
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState()
  const [keywordSearch, setKeyWordSearch] = useState()

  const defaultParams = {
    dapp: { page: 1, sort: 'desc', orderBy: 'score', tag: subCategory || '' },
    crypto: {
      type:
      subCategory && subCategory === CRYPTO_COIN || subCategory === CRYPTO_TOKEN
        ? subCategory
        : '',
      tag:
        subCategory && subCategory !== CRYPTO_COIN && subCategory !== CRYPTO_TOKEN
          ? subCategory
          : '',
      orderBy: 'score',
      sort: 'desc',
      page: 1
    },
    exchange: { page: 1, sort: 'desc', orderBy: 'score', tag: subCategory || '' },
    venture: { location: '', orderBy: 'score', sort: 'desc', page: 1 },
    soon: { roundType: '', tag: subCategory || '', orderBy: 'endDate', sort: 'desc', page: 1 },
    launchpad: { page: 1, sort: 'desc', orderBy: 'score' }
  }
  // check category and set params
  const setParram = async() => {
    if (category) {
      switch (category) {
        case DAPP:
          setParams(defaultParams?.dapp)
          break
        case CRYPTO:
          setParams(defaultParams?.crypto)
          break
        case EXCHANGE:
          setParams(defaultParams?.exchange)
          break
        case VENTURE:
          setParams(defaultParams?.venture)
          break
        case SOON:
          setParams(defaultParams?.soon)
          break
        case LAUNCHPAD:
          setParams(defaultParams?.launchpad)
          break
        default:
          navigate('/not-found')
          break
      }
    }
  }

  useEffect(() => {
    setListProduct()
    setParram()
  }, [category, subCategory])

  const getData = async(category, paramSort) => {
    setListProduct() // reset for loading
    paramSort['tag'] = decodeUrl(paramSort?.tag)
    switch (category) {
      case DAPP: {
        const dataDapp = await get('reviews/dapp/filter', paramSort)
        setListProduct({ dapp: dataDapp?.data?.dApps })
        setTotal(dataDapp?.data?.dAppCount)
        break
      }
      case CRYPTO: {
        const dataCrypto = await get('reviews/crypto/filter', paramSort)
        setListProduct({ crypto: dataCrypto?.data?.cryptos })
        setTotal(dataCrypto?.data?.cryptoCount)
        break
      }
      case EXCHANGE: {
        const dataExchange = await get('reviews/exchange/filter', paramSort)
        setListProduct({ exchange: dataExchange?.data?.exchanges })
        setTotal(dataExchange?.data?.exchangeCount)
        break
      }
      case VENTURE: {
        const dataVenture = await get('reviews/venture/filter', paramSort)
        setListProduct({ venture: dataVenture?.data?.ventures })
        setTotal(dataVenture?.data?.ventureCount)
        break
      }
      case SOON: {
        const dataSoon = await get('reviews/soon/filter', paramSort)
        setListProduct({ soon: dataSoon?.data?.soons })
        setTotal(dataSoon?.data?.soonCount)
        break
      }
      case LAUNCHPAD: {
        const dataLaunchpad = await get('reviews/launchpad/filter', paramSort)
        setListProduct({ launchpad: dataLaunchpad?.data?.launchPads })
        setTotal(dataLaunchpad?.data?.launchPadCount)
        break
      }
      default:
        break
    }
    setLoading(false)
  }

  const handleChangePage = async(value) => {
    setParams({
      ...params,
      page: value
    })
    // scroll to the top page
    const [xCoord, yCoord] = [0, 0]
    window.scrollTo(xCoord, yCoord)
  }

  const handleChangeTable = (pagination, filters, sorter, extra) => {
    let sort

    if (sorter?.order) {
      sort = {
        ...params,
        sort: params?.sort === 'asc' ? 'desc' : 'asc',
        orderBy: sorter?.field
      }
    } else {
      if (category === SOON) {
        sort = {
          ...params,
          sort: 'desc',
          orderBy: 'fundRaisingGoals'
        }
      } else {
        sort = {
          ...params,
          sort: 'desc',
          orderBy: 'score'
        }
      }
    }
    setParams(sort)
  }

  const renderComponent = () => {
    const projectType = category
    switch (projectType) {
      case DAPP:
        return (
          <Col span={24}>
            <Dapp
              listProduct={listProduct?.dapp}
              handleChangeTable={handleChangeTable}
              params={params}
              loading={loading}
              handleFilter={handleFilter}
              total={total}
            />
          </Col>
        )
      case CRYPTO:
        return (
          <Col span={24}>
            <Crypto
              listProduct={listProduct?.crypto}
              handleChangeTable={handleChangeTable}
              params={params}
              loading={loading}
              handleFilter={handleFilter}
              total={total}
            />
          </Col>
        )
      case EXCHANGE:
        return (
          <Exchange
            listProduct={listProduct?.exchange}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        )
      case VENTURE:
        return (
          <Venture
            listProduct={listProduct?.venture}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        )
      case SOON:
        return (
          <Soon
            listProduct={listProduct?.soon}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        )
      case LAUNCHPAD:
        return (
          <LaunchpadList
            listProduct={listProduct?.launchpad}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        )
      default:
        break
    }
  }

  // change param(tag: in state)
  useEffect(() => {
    setLoading(true)
    params && getData(category, params)
  }, [params])

  const handleFilter = (param) => {
    console.log(param)
    if (_.isEmpty(param)) {
      setParram()
    } else {
      setParams({
        ...params,
        ...param,
        page: params?.page
      })
    }
  }

  const getDataSearch = async(content) => {
    const data = await search('search/list', { keyword: content })
    if (data) {
      setListProduct(data?.data)
      if (categorySearch !== CRYPTO) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (keyword) {
      setLoading(true)
      getDataSearch(keyword)
      setKeyWordSearch(keyword)
    }
  }, [keyword])

  const handleSubmitSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search/${categorySearch}/${keywordSearch}`, { replace: true })
    }
  }

  const handleSubmitBtn = () => {
    navigate(`/search/${categorySearch}/${keywordSearch}`, { replace: true })
  }

  return (
    <div className='category-page section' ref={refabc}>
      <div className={`category-list detail ${category === SOON ? 'format-list-soon-background' : ''}`}>
        <Row gutter={[10, 10]}>
          {keyword ? (
            <Col span={24}>
              <TabSearch
                listProduct={listProduct}
                keywordSearch={keywordSearch}
                setKeyWordSearch={setKeyWordSearch}
                handleSubmitSearch={handleSubmitSearch}
                handleSubmitBtn={handleSubmitBtn}
                setLoading={setLoading}
                loading={loading}
                activeTab={categorySearch}
              />
            </Col>
          ) : (
            <>
              {loading ? (
                <div style={{ width: '100%' }}>  <MySkeletonLoadinng count={50} height={70} /></div>
              ) : (
                <>{renderComponent()}</>
              )}
            </>
          )}
        </Row>
      </div>
      {/* Pagination */}
      {total > PAGE_SIZE && (
        <>
          {!loading && (
            <div className='category-paginate'>
              <Pagination
                total={
                  total > MAX_PAGE * PAGE_SIZE ? MAX_PAGE * PAGE_SIZE : total
                }
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
