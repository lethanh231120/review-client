import React, { useRef, useState, useEffect } from 'react'
import './categoryItem.scss'
import { useParams } from 'react-router-dom'
import { Pagination, Row, Col } from 'antd'
// import { SearchOutlined } from '@ant-design/icons'
import Dapp from '../table/dapp/Dapp'
import Exchange from '../table/exchange/Exchange'
import Crypto from '../table/crypto/Crypto'
import Venture from '../table/venture/Venture'
import Soon from '../table/soon/Soon'
import {
  DAPP,
  EXCHANGE,
  CRYPTO,
  SOON,
  SCAM,
  VENTURE,
  CRYPTO_COIN,
  CRYPTO_TOKEN
} from '../../constants/category'
import { get, search } from '../../../api/BaseRequest'
// import { search } from '../../api/BaseRequest'
import SpinLoading from '../spin-loading/SpinLoading'
import TabSearch from './TabSearch'
import { PAGE_SIZE, MAX_PAGE } from '../../constants/pagination'
import { useNavigate } from 'react-router-dom'
import { decodeUrl } from '../../../utils/formatUrl'
import _ from 'lodash'

const CategoryItem = () => {
  const navigate = useNavigate()
  const refabc = useRef()
  const [listProduct, setListProduct] = useState({})
  const [total, setTotal] = useState()
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState()
  const { category, subCategory, keyword } = useParams()
  const [keywordSearch, setKeyWordSearch] = useState(keyword)

  const defaultParams = {
    dapp: { page: 1, sort: 'desc', orderBy: 'score', tag: subCategory || '' },
    crypto: {
      type:
        subCategory === CRYPTO_COIN || subCategory === CRYPTO_TOKEN
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
    soon: { roundType: '', tag: subCategory || '', orderBy: 'startDate', sort: 'desc', page: 1 }
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
        default:
          break
      }
    }
  }
  useEffect(() => {
    setParram()
  }, [category, subCategory])

  const getData = async(category, paramSort) => {
    setListProduct([]) // reset for loading
    paramSort['tag'] = decodeUrl(paramSort?.tag)
    switch (category) {
      case DAPP: {
        const dataDapp = await get('reviews/dapp/filter', paramSort)
        setListProduct(dataDapp?.data?.dApps)
        setTotal(dataDapp?.data?.dAppCount)
        break
      }
      case CRYPTO: {
        const dataCrypto = await get('reviews/crypto/filter', paramSort)
        setListProduct(dataCrypto?.data?.cryptos)
        setTotal(dataCrypto?.data?.cryptoCount)
        break
      }
      case EXCHANGE: {
        const dataExchange = await get('reviews/exchange/filter', paramSort)
        setListProduct(dataExchange?.data?.exchanges)
        setTotal(dataExchange?.data?.exchangeCount)
        break
      }
      case VENTURE: {
        const dataVenture = await get('reviews/venture/filter', paramSort)
        setListProduct(dataVenture?.data?.ventures)
        setTotal(dataVenture?.data?.ventureCount)
        break
      }
      case SOON: {
        const dataSoon = await get('reviews/soon/filter', paramSort)
        setListProduct(dataSoon?.data?.soons)
        setTotal(dataSoon?.data?.soonCount)
        break
      }
      case SCAM: {
        const dataScam = await get('reviews/scam/filter', paramSort)
        setListProduct(dataScam?.data?.cryptos)
        setTotal(dataScam?.data?.cryptoCount)
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

  const renderComponent = (item) => {
    let projectType = category
    if (projectType === SCAM) {
      let commonItemId = ''
      if (item?.dAppId) {
        commonItemId = item.dAppId
      } else if (item?.projectId) {
        // soon project
        commonItemId = item.projectId
      } else if (item?.ventureId) {
        commonItemId = item.ventureId
      } else if (item?.cryptoId) {
        commonItemId = item.cryptoId
      } else if (item?.exchangeId) {
        commonItemId = item.exchangeId
      }
      // sample common item id: "gear5_exchange_tokocrypto_coinmarketcap"
      const parts = commonItemId.split('_')
      // need keyword above: exchange
      if (parts.length >= 2) {
        projectType = parts[1]
        // path API token, coin (product id) is detail screen of crypto
        if (projectType === CRYPTO_TOKEN || projectType === CRYPTO_COIN) {
          projectType = CRYPTO
        }
      }
    }
    switch (projectType) {
      case DAPP:
        return (
          <Col span={24}>
            <Dapp
              listProduct={listProduct}
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
              listProduct={listProduct}
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
            listProduct={listProduct}
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
            listProduct={listProduct}
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
            listProduct={listProduct}
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
    // params['tag'] = params['tag'] + '123'
    // setParams(params)
    setLoading(true)
    params && getData(category, params)
  }, [params, category])

  const handleFilter = (param) => {
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

  const handleChangeInput = (e) => {
    setKeyWordSearch(e.target.value)
  }

  const getDataSearch = async(content) => {
    const data = await search('search/suggest', { keyword: content })
    if (data) {
      setListProduct(data?.data)
      setLoading(false)
      setKeyWordSearch()
    }
  }

  useEffect(() => {
    if (keyword) {
      setLoading(true)
      getDataSearch(keyword)
    }
  }, [keyword])

  const handleSubmitSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search/${keywordSearch}`, { replace: true })
    }
  }

  const handleSubmitBtn = () => {
    navigate(`/search/${keywordSearch}`, { replace: true })
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
                keyword={keyword}
                handleChangeInput={handleChangeInput}
                handleSubmitSearch={handleSubmitSearch}
                handleSubmitBtn={handleSubmitBtn}
                setLoading={setLoading}
                loading={loading}
              />
            </Col>
          ) : (
            <>
              {loading ? (
                <SpinLoading />
              ) : (
                <>{renderComponent(listProduct && listProduct[0])}</>
              )}
            </>
          )}
        </Row>
      </div>
      {total > PAGE_SIZE && (
        <>
          {!loading && (
            <div className='category-paginate'>
              <Pagination
                // total={total}
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
