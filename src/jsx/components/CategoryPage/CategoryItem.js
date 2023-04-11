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
import SEO from '../SEO/SEO'
import { LIST_CRYPTO, LIST_DAPP, LIST_EXCHANGE, LIST_SOON, LIST_VENTURE, LIST_LAUNCHPAD } from '../../constants/category'
import { read } from '../../../api/BaseRequest'
import { genListHeader } from '../SEO/server/ExpressGenerHeader'
import { formatData } from '../drawer-filter/FilterHelperFunctions'
import { notifyTopRightFail } from '../Forms/form-report/FormReport'
import { Ads } from './../ads/Ads'

const CategoryItem = () => {
  const navigate = useNavigate()
  const { category, subCategory, keyword, categorySearch } = useParams()
  const refabc = useRef()
  const [listProduct, setListProduct] = useState()
  const [total, setTotal] = useState()
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState()
  const [keywordSearch, setKeyWordSearch] = useState()
  const [titleSEO, setTitleSEO] = useState()
  const [tab, setTab] = useState()
  const [listData, setListData] = useState({
    dapp: [],
    venture: [],
    exchange: [],
    soon: [],
    launchpad: [],
    crypto: []
  })
  const [status, setStatus] = useState()
  const [xCoord, yCoord] = [0, 0]

  // only main-menu changed
  useEffect(() => {
    const parts = window.location.href?.replaceAll('http://', '')?.replaceAll('https://', '')?.split('/')
    let category, subCategory
    // click subCategory
    if (parts.length === 3) {
      subCategory = parts[parts.length - 1]
      category = parts[parts.length - 2]
    } else
    // click category
    if (parts.length === 2) {
      category = parts[parts.length - 1]
    }
    // aleast click category(include subCategory)
    if (category) {
      setTitleSEO(genListHeader(category, subCategory))
    }
  }, [category, subCategory, total])

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
    const parsedData = formatData(category)
    if (category) {
      switch (category) {
        case DAPP:
          setParams(parsedData ? { ...defaultParams?.dapp, ...parsedData } : defaultParams?.dapp)
          break
        case CRYPTO:
          setParams(parsedData ? { ...defaultParams?.crypto, ...parsedData } : defaultParams?.crypto)
          break
        case EXCHANGE:
          setParams(parsedData ? { ...defaultParams?.exchange, ...parsedData } : defaultParams?.exchange)
          break
        case VENTURE:
          setParams(parsedData ? { ...defaultParams?.venture, ...parsedData } : defaultParams?.venture)
          break
        case SOON:
          setParams(parsedData ? { ...defaultParams?.soon, ...parsedData } : defaultParams?.soon)
          break
        case LAUNCHPAD:
          setParams(parsedData ? { ...defaultParams?.launchpad, ...parsedData } : defaultParams?.launchpad)
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
    try {
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
    } catch (error) {
      notifyTopRightFail(error?.response?.data?.error)
    }
  }

  const handleChangePage = async(value) => {
    setParams({
      ...params,
      page: value
    })
    // scroll to the top page
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
    let htmlOutput = ''
    const projectType = category
    switch (projectType) {
      case DAPP:
        htmlOutput = <Col span={24}>
          <Dapp
            listProduct={listProduct?.dapp}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        </Col>
        break
      case CRYPTO:
        htmlOutput = <Col span={24}>
          <Crypto
            listProduct={listProduct?.crypto}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        </Col>
        break
      case EXCHANGE:
        htmlOutput = <Col span={24}>
          <Exchange
            listProduct={listProduct?.exchange}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        </Col>
        break
      case VENTURE:
        htmlOutput = <Col span={24}>
          <Venture
            listProduct={listProduct?.venture}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        </Col>
        break
      case SOON:
        htmlOutput = <Col span={24}>
          <Soon
            listProduct={listProduct?.soon}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        </Col>
        break
      case LAUNCHPAD:
        htmlOutput = <Col span={24}>
          <LaunchpadList
            listProduct={listProduct?.launchpad}
            handleChangeTable={handleChangeTable}
            params={params}
            loading={loading}
            handleFilter={handleFilter}
            total={total}
          />
        </Col>
        break
      default:
        break
    }

    return <>
      {htmlOutput}
    </>
  }

  // change param(tag: in state)
  useEffect(() => {
    setLoading(true)
    params && getData(category, params)
  }, [params])

  const handleFilter = (param) => {
    if (_.isEmpty(param)) {
      setParram()
    } else {
      switch (category) {
        case DAPP:
          setParams({
            orderBy: params?.orderBy,
            sort: params?.sort,
            page: 1,
            tag: params?.tag,
            ...param
          })
          break
        case CRYPTO:
          setParams({
            type: params?.type,
            tag: params?.tag,
            orderBy: params?.orderBy,
            sort: params?.sort,
            page: 1,
            ...param
          })
          break
        case EXCHANGE:
          setParams({
            orderBy: params?.orderBy,
            sort: params?.sort,
            page: 1,
            tag: params?.tag,
            ...param
          })
          break
        case VENTURE:
          setParams({
            orderBy: params?.orderBy,
            sort: params?.sort,
            page: 1,
            location: params?.location,
            ...param
          })
          break
        case SOON:
          setParams({
            orderBy: params?.orderBy,
            sort: params?.sort,
            page: 1,
            tag: params?.tag,
            roundType: params?.roundType,
            ...param
          })
          break
        case LAUNCHPAD:
          setParams({
            orderBy: params?.orderBy,
            sort: params?.sort,
            page: 1,
            ...param
          })
          break
        default:
          navigate('/not-found')
          break
      }
      // setParams({
      //   ...params,
      //   ...param,
      //   page: params?.page
      // })
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

  useEffect(() => {
    setTab(categorySearch)
    setStatus('done')
  }, [categorySearch, keyword])

  useEffect(() => {
    const getData = async() => {
      if (tab) {
        setLoading(true)
        switch (tab) {
          case DAPP: {
            const listDappId = []
            listProduct[LIST_DAPP]?.dapps?.forEach((itemDapp) => {
              listDappId.push(itemDapp?.dappId)
            })
            if (!_.isEmpty(listDappId)) {
              const dataDapp = await read('reviews/dapp/list', { dAppIds: listDappId })
              setListData({
                dapp: dataDapp?.data?.dApps ? dataDapp?.data?.dApps : []
              })
              setLoading(false)
            } else {
              setListData({
                dapp: []
              })
            }
            break
          }
          case CRYPTO: {
            const listCryptoId = []
            listProduct[LIST_CRYPTO]?.cryptos?.forEach((itemCrypto) => {
              listCryptoId.push(itemCrypto?.cryptoId)
            })
            if (!_.isEmpty(listCryptoId)) {
              const dataCrypto = await read('reviews/crypto/list', { cryptoIds: listCryptoId })
              setListData({
                crypto: dataCrypto?.data?.cryptos ? dataCrypto?.data?.cryptos : []
              })
              setLoading(false)
            } else {
              setListData({
                crypto: []
              })
            }
            break
          }
          case EXCHANGE: {
            const listExchangeId = []
            listProduct[LIST_EXCHANGE]?.exchanges?.forEach((itemExchange) => {
              listExchangeId.push(itemExchange?.exchangeId)
            })
            if (!_.isEmpty(listExchangeId)) {
              const dataExchange = await read('reviews/exchange/list', { exchangeIds: listExchangeId })
              setListData({
                exchange: dataExchange?.data?.exchanges ? dataExchange?.data?.exchanges : []
              })
              setLoading(false)
            } else {
              setListData({
                exchange: []
              })
            }
            break
          }
          case VENTURE: {
            const listVentureId = []
            listProduct[LIST_VENTURE]?.ventures?.forEach((itemVenture) => {
              listVentureId.push(itemVenture?.ventureId)
            })
            if (!_.isEmpty(listVentureId)) {
              const dataVenture = await read('reviews/venture/list', { ventureIds: listVentureId })
              setListData({
                venture: dataVenture?.data?.ventures ? dataVenture?.data?.ventures : []
              })
              setLoading(false)
            } else {
              setListData({
                venture: []
              })
            }
            break
          }
          case LAUNCHPAD: {
            const listLaunchPadId = []
            listProduct[LIST_LAUNCHPAD]?.launchPads?.forEach((itemLaunchPad) => {
              listLaunchPadId.push(itemLaunchPad?.launchPadId)
            })
            if (!_.isEmpty(listLaunchPadId)) {
              const dataLaunchPad = await read('reviews/launchpad/list', { launchpadIds: listLaunchPadId })
              setListData({
                launchpad: dataLaunchPad?.data?.launchPads ? dataLaunchPad?.data?.launchPads : []
              })
              setLoading(false)
            } else {
              setListData({
                launchpad: []
              })
            }
            break
          }
          case SOON: {
            const listSoonId = []
            listProduct[LIST_SOON]?.soons?.forEach((itemSoon) => {
              listSoonId.push(itemSoon?.soonId)
            })
            if (!_.isEmpty(listSoonId)) {
              const dataSoon = await read('reviews/soon/list', { projectIds: listSoonId })
              setListData({
                soon: dataSoon?.data?.soons ? dataSoon?.data?.soons : []
              })
              setLoading(false)
            } else {
              setListData({
                soone: []
              })
            }
            break
          }
          default:
            break
        }
        setLoading(false)
      }
    }
    listProduct && status === 'done' && getData()
  }, [tab, listProduct, status])

  // scroll to the top page when back from detail
  window.scrollTo(xCoord, yCoord)

  return (
    <>
      {titleSEO ? <SEO props={{ title: titleSEO }} /> : ''}
      <div className='category-page section' ref={refabc}>
        <div className={`category-list detail ${category === SOON ? 'format-list-soon-background' : ''}`}>
          <Row gutter={[10, 10]}>
            {keyword ? (
              <Col span={24}>
                <TabSearch
                  listData={listData}
                  setListData={setListData}
                  listProduct={listProduct}
                  setStatus={setStatus}
                  keywordSearch={keywordSearch}
                  setKeyWordSearch={setKeyWordSearch}
                  handleSubmitSearch={handleSubmitSearch}
                  handleSubmitBtn={handleSubmitBtn}
                  setLoading={setLoading}
                  loading={loading}
                  tab={tab}
                  setTab={setTab}
                  // activeTab={categorySearch}
                />
              </Col>
            ) : (
              <>
                {loading ? (
                  <div style={{ width: '100%' }}>  <MySkeletonLoadinng count={50} height={70} /></div>
                ) : <>
                  {renderComponent()}
                </>
                }
              </>
            )}
          </Row>
        </div>

        {/* Ads */}
        <Ads pageType={category} />

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
    </>
  )
}
export default CategoryItem
