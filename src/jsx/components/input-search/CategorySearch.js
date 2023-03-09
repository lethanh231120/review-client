import React, { useState, useRef } from 'react'
import { Input, Spin, Empty } from 'antd'
import _ from 'lodash'
import { search } from '../../../api/BaseRequest'
import './globalSearch.scss'
import { useNavigate } from 'react-router-dom'
import nodata from '../../../images/product/nodata.png'
import ItemCrypto from './item-crypto/ItemCrypto'
import ItemLaunch from './item-launchpad/ItemLaunpad'
import ItemDapp from './item-dapp/ItemDapp'
import ItemExchange from './item-exchange/ItemExchange'
import ItemSoon from './item-soon/ItemSoon'
import ItemVenture from './item-venture/ItemVenture'

import { CRYPTO, EXCHANGE, VENTURE, SOON, DAPP, LIST_CRYPTO, LIST_EXCHANGE, LIST_DAPP, LIST_SOON, LIST_VENTURE, LAUNCHPAD, LIST_LAUNCHPAD } from '../../../jsx/constants/category'

const CategorySearch = ({ type }) => {
  const navigate = useNavigate()
  const refInput = useRef()
  const [dataSearch, setDataSearch] = useState({
    data: null,
    loading: false,
    status: '',
    isActive: false
  })
  const [itemSubmit, setItemSubmit] = useState()

  const handleSearch = _.debounce(async(value) => {
    if (value !== '') {
      setDataSearch({
        ...dataSearch,
        data: {},
        status: '',
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
              loading: false,
              data: {
                listDapp: {
                  dapps: (data?.data[LIST_DAPP]?.dapps !== null) ? data?.data[LIST_DAPP]?.dapps : null
                }
              },
              isNull: data?.data[LIST_DAPP]?.dapps === null
            })
            setItemSubmit(data?.data[LIST_DAPP]?.dapps[0])
            break
          case CRYPTO:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              loading: false,
              data: {
                listCrypto: {
                  cryptos: (data?.data[LIST_CRYPTO]?.cryptos !== null) ? data?.data[LIST_CRYPTO]?.cryptos : null
                }
              },
              isNull: data?.data[LIST_CRYPTO]?.cryptos === null
            })
            setItemSubmit(data?.data[LIST_CRYPTO]?.cryptos[0])
            break
          case EXCHANGE:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              loading: false,
              data: {
                listExchange: {
                  exchanges: (data?.data[LIST_EXCHANGE]?.exchanges !== null) ? data?.data[LIST_EXCHANGE]?.exchanges : null
                }
              },
              isNull: data?.data[LIST_EXCHANGE]?.exchanges === null
            })
            setItemSubmit(data?.data[LIST_EXCHANGE]?.exchanges[0])
            break
          case VENTURE:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              loading: false,
              data: {
                listVenture: {
                  ventures: (data?.data[LIST_VENTURE]?.ventures !== null) ? data?.data[LIST_VENTURE]?.ventures : null
                }
              },
              isNull: data?.data[LIST_VENTURE]?.ventures === null
            })
            setItemSubmit(data?.data[LIST_VENTURE]?.ventures[0])
            break
          case SOON:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              loading: false,
              data: {
                listSoon: {
                  soons: (data?.data[LIST_SOON]?.soons !== null) ? data?.data[LIST_SOON]?.soons : null
                }
              },
              isNull: data?.data[LIST_SOON]?.soons === null
            })
            setItemSubmit(data?.data[LIST_SOON]?.soons[0])
            break
          case LAUNCHPAD:
            setDataSearch({
              ...dataSearch,
              status: 'done',
              isActive: true,
              loading: false,
              data: {
                listLaunchpad: {
                  launchPads: (data?.data[LIST_LAUNCHPAD]?.launchPads !== null) ? data?.data[LIST_LAUNCHPAD]?.launchPads : null
                }
              },
              isNull: data?.data[LIST_LAUNCHPAD]?.launchPads === null
            })
            setItemSubmit(data?.data[LIST_LAUNCHPAD]?.launchPads[0])
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
      setItemSubmit()
    }
  }, 250)

  const subMitForm = () => {
    if (itemSubmit) {
      const productId = itemSubmit?.cryptoId
        ? `${itemSubmit?.cryptoId?.split('_')[1]}/${itemSubmit?.cryptoId?.split('_')[2]}/${itemSubmit?.cryptoId?.split('_')[1] === 'token' ? itemSubmit?.cryptoId?.split('_')[3] : ''}`
        : itemSubmit?.dappId
          ? `${itemSubmit?.dappId?.split('_')[2]}`
          : itemSubmit?.exchangeId
            ? `${itemSubmit?.exchangeId?.split('_')[2]}`
            : itemSubmit?.soonId
              ? `${itemSubmit?.soonId?.split('_')[2]}`
              : itemSubmit?.ventureId
                ? `${itemSubmit?.ventureId?.split('_')[2]}`
                : `${itemSubmit?.launchPadId?.split('_')[2]}`

      navigate(
        `../../products/${
          itemSubmit?.cryptoId
            ? 'crypto'
            : itemSubmit?.dappId
              ? 'dapp'
              : itemSubmit?.exchangeId
                ? 'exchange'
                : itemSubmit?.soonId
                  ? 'soon'
                  : itemSubmit?.ventureId
                    ? 'venture'
                    : 'launchpad'
        }/${productId}`
      )
    }
    refInput.current.value = ''
  }

  const handleSubmitSearch = (e) => {
    if (e.key === 'Enter') {
      subMitForm()
    }
  }

  const clearText = (e) =>{
    if (e.target.value !== '') {
      // e.target.value = ''
      refInput.current.value = ''
    }
  }
  return (
    <div className='item-search cus-form'>
      <Input
        ref={refInput}
        className='form-control cus-form-control'
        placeholder={`Search by  ${type === CRYPTO ? 'Coins/ Token Contracts' : (type === EXCHANGE ? 'Exchange(s)' : (type === DAPP ? 'D-App(s)' : (type === VENTURE ? 'Venture(s)' : (type === SOON ? 'ICOs/ IDOs/ IEOs' : (type === LAUNCHPAD ? 'Launchpad(s)' : '')))))}`}
        onChange={(e) => handleSearch(e.target.value)}
        autoComplete='off'
        onBlur={(e) => {
          // e.preventDefault()
          // e.stopPropagation()
          handleSearch('')
          clearText(e)
        }}
        onKeyPress={handleSubmitSearch}
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
                {dataSearch?.data?.listCrypto && dataSearch?.data?.listCrypto?.cryptos !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listCrypto?.cryptos?.map(
                      (item, index) => (
                        <ItemCrypto
                          key={index}
                          item={item}
                          index={index}
                          global={false}
                          itemSubmit={itemSubmit}
                          refInput={refInput}
                        />
                      )
                    )}
                  </div>
                )}
                {dataSearch?.data?.listLaunchpad && dataSearch?.data?.listLaunchpad?.launchPads !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listLaunchpad?.launchPads?.map(
                      (item, index) => (
                        <ItemLaunch
                          key={index}
                          item={item}
                          index={index}
                          global={false}
                          itemSubmit={itemSubmit}
                          refInput={refInput}
                        />
                      )
                    )}
                  </div>
                )}
                {dataSearch?.data?.listDapp && dataSearch?.data?.listDapp?.dapps !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listDapp?.dapps?.map(
                      (item, index) => (
                        <ItemDapp
                          key={index}
                          item={item}
                          index={index}
                          global={false}
                          itemSubmit={itemSubmit}
                          refInput={refInput}
                        />
                      )
                    )}
                  </div>
                )}
                {dataSearch?.data?.listExchange && dataSearch?.data?.listExchange?.exchanges !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listExchange?.exchanges?.map(
                      (item, index) => (
                        <ItemExchange
                          key={index}
                          item={item}
                          index={index}
                          global={false}
                          itemSubmit={itemSubmit}
                          refInput={refInput}
                        />
                      )
                    )}
                  </div>
                )}
                {dataSearch?.data?.listSoon && dataSearch?.data?.listSoon?.soons !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listSoon?.soons?.map((item) => (
                      <ItemSoon
                        item={item}
                        key={item?.soonId}
                        global={false}
                        itemSubmit={itemSubmit}
                        refInput={refInput}
                      />
                    ))}
                  </div>
                )}
                {dataSearch?.data?.listVenture && dataSearch?.data?.listVenture?.ventures !== null && (
                  <div className='form-search-data-box'>
                    {dataSearch?.data?.listVenture?.ventures?.map(
                      (item, index) => (
                        <ItemVenture
                          key={index}
                          item={item}
                          index={index}
                          itemSubmit={itemSubmit}
                          global={false}
                          refInput={refInput}
                        />
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <Empty
                image={nodata}
                description={
                  <span style={{ padding: '1rem' }}>
                    <span
                      style={{
                        fontSize: '1.125rem',
                        color: 'red',
                        fontWeight: 600
                      }}
                    >
                            SORRY{' '}
                    </span>
                    <span
                      style={{
                        fontSize: '1rem',
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
