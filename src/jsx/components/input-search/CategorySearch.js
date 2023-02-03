import React, { useState } from 'react'
import { Input, Spin, Empty, Image } from 'antd'
import _ from 'lodash'
import { search } from '../../../api/BaseRequest'
import './globalSearch.scss'
import { Link, useNavigate } from 'react-router-dom'
import nodata from '../../../images/product/nodata.png'
import ItemCrypto from './item-crypto/ItemCrypto'
import ItemDapp from './item-dapp/ItemDapp'
import ItemExchange from './item-exchange/ItemExchange'
import ItemSoon from './item-soon/ItemSoon'

import { CRYPTO, EXCHANGE, VENTURE, SOON, DAPP, LIST_CRYPTO, LIST_EXCHANGE, LIST_DAPP, LIST_SOON, LIST_VENTURE } from '../../../jsx/constants/category'

const CategorySearch = ({ type }) => {
  const navigate = useNavigate()
  const [dataSearch, setDataSearch] = useState({
    data: null,
    loading: false,
    status: '',
    isActive: false
  })
  const handleSearch = _.debounce(async(e, value) => {
    if (value !== '') {
      setDataSearch({
        ...dataSearch,
        loading: true,
        isActive: true
      })
      const data = await search('search/suggest', { keyword: value })
      if (data) {
        switch (type) {
          case DAPP:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              data: {
                listDapp: {
                  dapps: (data?.data[LIST_DAPP]?.dapps !== null) ? data?.data[LIST_DAPP]?.dapps?.splice(0, 10) : null
                }
              },
              isNull: data?.data[LIST_DAPP]?.dapps === null
            })
            break
          case CRYPTO:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              data: {
                listCrypto: {
                  cryptos: (data?.data[LIST_CRYPTO]?.cryptos !== null) ? data?.data[LIST_CRYPTO]?.cryptos?.splice(0, 10) : null
                }
              },
              isNull: data?.data[LIST_CRYPTO]?.cryptos === null
            })
            break
          case EXCHANGE:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              data: {
                listExchange: {
                  exchanges: (data?.data[LIST_EXCHANGE]?.exchanges !== null) ? data?.data[LIST_EXCHANGE]?.exchanges?.splice(0, 10) : null
                }
              },
              isNull: data?.data[LIST_EXCHANGE]?.exchanges === null
            })
            break
          case VENTURE:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              data: {
                listVenture: {
                  ventures: (data?.data[LIST_VENTURE]?.ventures !== null) ? data?.data[LIST_VENTURE]?.ventures?.splice(0, 10) : null
                }
              },
              isNull: data?.data[LIST_VENTURE]?.ventures === null
            })
            break
          case SOON:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              data: {
                listSoon: {
                  soons: (data?.data[LIST_SOON]?.soons !== null) ? data?.data[LIST_SOON]?.soons?.splice(0, 10) : null
                }
              },
              isNull: data?.data[LIST_SOON]?.soons === null
            })
            break
          default:
            break
        }
      } else {
        setDataSearch({
          loading: false,
          data: null,
          status: 'done',
          isActive: true
        })
      }
    } else {
      setDataSearch({ isActive: false, data: null, loading: false, status: '' })
    }
  }, 250)

  console.log(dataSearch)

  const handleBlurInput = () => {
    setDataSearch({
      data: null,
      loading: false,
      status: '',
      isActive: false
    })
  }

  return (
    <div className='item-search'>
      <Input
        placeholder='Search by Token / Coin / Exchange / Dapp / Venture...'
        onChange={(e) => handleSearch(e, e.target.value)}
        autoComplete='off'
        onBlur={handleBlurInput}
      />
      <div className={`item-search-data ${dataSearch?.isActive ? 'active' : ''}`}>
        {dataSearch?.loading ? (
          <>
            <Spin size='large' />
          </>
        ) : (
          <>
            {!dataSearch?.isNull ? (
              <>
                {dataSearch?.data?.listCrypto &&
                        dataSearch?.data?.listCrypto?.cryptos !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listCrypto?.cryptos?.map(
                      (item, index) => (
                        <ItemCrypto
                          key={index}
                          item={item}
                          index={index}
                          global={false}
                        />
                      )
                    )}
                  </div>
                )}
                {dataSearch?.data?.listDapp &&
                        dataSearch?.data?.listDapp?.dapps !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listDapp?.dapps?.map(
                      (item, index) => (
                        <ItemDapp
                          key={index}
                          item={item}
                          index={index}
                          global={false}
                        />
                      )
                    )}
                  </div>
                )}
                {dataSearch?.data?.listExchange &&
                        dataSearch?.data?.listExchange?.exchanges !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listExchange?.exchanges?.map(
                      (item, index) => (
                        <ItemExchange
                          key={index}
                          item={item}
                          index={index}
                          global={false}
                        />
                      )
                    )}
                  </div>
                )}
                {dataSearch?.data?.listSoon &&
                        dataSearch?.data?.listSoon?.soons !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listSoon?.soons?.map((item) => (
                      <ItemSoon
                        item={item}
                        key={item?.soonId}
                        global={false}
                      />
                    ))}
                  </div>
                )}
                {dataSearch?.data?.listVenture &&
                        dataSearch?.data?.listVenture?.ventures !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listVenture?.ventures?.map(
                      (item, index) => (
                        <Link
                          to={`../../products/venture/${item?.ventureId?.split('_')[2]}/${item?.ventureId?.split('_')[3]}`}
                          key={index}
                          className='form-search-data-item'
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            navigate(`../../products/venture/${item?.ventureId?.split('_')[2]}/${item?.ventureId?.split('_')[3]}`)
                          }}
                        >
                          <div className='form-search-data-item-data'>
                            {item?.image ? (
                              <Image src={item?.image} preview={false} />
                            ) : (
                              <span className='table-icon-coin-logo'>
                                {item?.name?.slice(0, 3)?.toUpperCase()}
                              </span>
                            )}
                            <div>
                              <div className='form-search-data-item-data-content'>
                                <div className='form-search-data-item-data-name'>
                                  {item?.name}
                                </div>
                              </div>
                              {item?.location && (
                                <span className='form-search-data-item-data-content-list'>
                                  <div
                                    className='form-search-data-item-data-tag'
                                  >
                                    {item?.location}
                                  </div>
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <Empty
                image={nodata}
                description={
                  <span>
                    <span
                      style={{
                        fontSize: '1.8em',
                        color: 'red',
                        fontWeight: 600
                      }}
                    >
                            SORRY{' '}
                    </span>
                    <span
                      style={{
                        fontSize: '1.6rem',
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontWeight: '600'
                      }}
                    >
                            NO DATA FOUND
                    </span>
                  </span>
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CategorySearch
