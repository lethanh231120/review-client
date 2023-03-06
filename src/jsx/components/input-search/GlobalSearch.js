import React, { useEffect, useState, useRef, useContext } from 'react'
import { Form, Empty
  // Spin
} from 'antd'
import './globalSearch.scss'
import { search } from '../../../api/BaseRequest'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import nodata from '../../../images/product/nodata.png'
import ItemCrypto from './item-crypto/ItemCrypto'
import ItemLaunch from './item-launchpad/ItemLaunpad'
import ItemDapp from './item-dapp/ItemDapp'
import ItemExchange from './item-exchange/ItemExchange'
import ItemSoon from './item-soon/ItemSoon.js'
import ItemVenture from './item-venture/ItemVenture'
import { SummaryHomeContext } from '../../../App'
import { formatLargeNumber } from '../../../utils/formatNumber'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'

const InputSearch = ({ isFormReport, setItem }) => {
  const summaryData = useContext(SummaryHomeContext)
  const FIRST_SEARCH_PLACEHOLDER_TEXT = 'Search your projects here'
  const LAST_SEARCH_PLACEHOLDER_TEXT = `Search for ${summaryData?.soons ? `${formatLargeNumber(summaryData?.soons)}+ ` : ''}ICOs/ IDOs/ IEOs`
  const SEARCH_PLACEHOLDER_TEXT = [
    FIRST_SEARCH_PLACEHOLDER_TEXT,
    `Search for ${summaryData?.coins ? `${formatLargeNumber(summaryData?.coins)}+ ` : ''}Coins`,
    `Search for ${summaryData?.tokens ? `${formatLargeNumber(summaryData?.tokens)}+ ` : ''}Tokens`,
    `Search for ${summaryData?.dApps ? `${formatLargeNumber(summaryData?.dApps)}+ ` : ''}DApps`,
    `Search for ${summaryData?.ventures ? `${formatLargeNumber(summaryData?.ventures)}+ ` : ''}Ventures`,
    `Search for ${summaryData?.exchanges ? `${formatLargeNumber(summaryData?.exchanges)}+ ` : ''}Exchanges`,
    LAST_SEARCH_PLACEHOLDER_TEXT
  ]
  const refInput = useRef()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [isSubmit, setIsSubmit] = useState(false)
  const [listDataSearch, setListDataSearch] = useState()
  const [itemSubmit, setItemSubmit] = useState()
  const [dataSearch, setDataSearch] = useState({
    data: {},
    loading: false,
    status: '',
    isActive: false
  })
  const [keyWord, setKeyWord] = useState()
  const [txtDisplaySearchHeader, setTxtDisplaySearchHeader] = useState(FIRST_SEARCH_PLACEHOLDER_TEXT)

  const handleSearch = _.debounce(async(value) => {
    setDataSearch({
      ...dataSearch,
      data: {},
      status: '',
      loading: true,
      isActive: true
    })
    if (value !== '') {
      setKeyWord(value)
      const data = await search('search/suggest', { keyword: value })
      if (data) {
        setListDataSearch({
          listCrypto: {
            cryptos: (data?.data['listCrypto']?.cryptos !== null) ? data?.data['listCrypto']?.cryptos?.splice(0, 10) : null
          },
          listDapp: {
            dapps: (data?.data['listDapp']?.dapps !== null) ? data?.data['listDapp']?.dapps?.splice(0, 10) : null
          },
          listExchange: {
            exchanges: (data?.data['listExchange']?.exchanges !== null) ? data?.data['listExchange']?.exchanges?.splice(0, 10) : null
          },
          listSoon: {
            soons: (data?.data['listSoon']?.soons !== null) ? data?.data['listSoon']?.soons?.splice(0, 10) : null
          },
          listVenture: {
            ventures: (data?.data['listVenture']?.ventures !== null) ? data?.data['listVenture']?.ventures?.splice(0, 10) : null
          },
          listLaunchpad: {
            launchPads: (data?.data['listLaunchpad']?.launchPads !== null) ? data?.data['listLaunchpad']?.launchPads?.splice(0, 10) : null
          }
        })
      } else {
        setDataSearch({
          loading: false,
          data: {},
          status: 'done',
          isActive: true
        })
      }
    } else {
      setDataSearch({ isActive: false, data: {}, loading: false, status: '' })
    }
  }, 250)

  useEffect(() => {
    if (listDataSearch) {
      setDataSearch({
        loading: false,
        data: listDataSearch,
        status: 'done',
        isActive: true,
        isNull:
          listDataSearch?.listCrypto?.cryptos === null &&
          listDataSearch?.listDapp?.dapps === null &&
          listDataSearch?.listExchange?.exchanges === null &&
          listDataSearch?.listSoon?.soons === null &&
          listDataSearch?.listVenture?.ventures === null &&
          listDataSearch?.listLaunchpad?.launchPads === null
      })
      setItemSubmit(
        listDataSearch?.listCrypto !== null &&
          !_.isEmpty(listDataSearch?.listCrypto?.cryptos)
          ? listDataSearch?.listCrypto?.cryptos[0]
          : listDataSearch?.listDapp !== null && !_.isEmpty(listDataSearch?.listDapp?.dapps)
            ? listDataSearch?.listDapp?.dapps[0]
            : listDataSearch?.listExchange !== null &&
            !_.isEmpty(listDataSearch?.listExchange?.exchanges)
              ? listDataSearch?.listExchange?.exchanges[0]
              : listDataSearch?.listSoon !== null && !_.isEmpty(listDataSearch?.listSoon?.soons)
                ? listDataSearch?.listSoon?.soons[0]
                : listDataSearch?.listVenture !== null &&
            !_.isEmpty(listDataSearch?.listVenture?.ventures)
                  ? listDataSearch?.listVenture?.ventures[0]
                  : listDataSearch?.listLaunchpad !== null &&
                  !_.isEmpty(listDataSearch?.listLaunchpad?.launchPads)
                    ? listDataSearch?.listLaunchpad?.launchPads[0] : ''
      )
    }
  }, [listDataSearch])

  const subMitForm = () => {
    if (isFormReport) {
      setItem(itemSubmit)
    } else {
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
        setKeyWord()
        setDataSearch({
          isActive: false, data: {}, loading: false, status: ''
        })
      }
    }
    refInput.current.value = ''
  }

  const handleSubmitSearch = (e) => {
    if (e.key === 'Enter') {
      subMitForm()
    }
  }

  useEffect(() => {
    if (isSubmit) {
      if (keyWord) {
        form.resetFields()
        setIsSubmit(false)
        navigate(`../../../search/crypto/${keyWord}`)
        setDataSearch({
          isActive: false, data: {}, loading: false, status: ''
        })
      }
    }
  }, [isSubmit])

  if (!isFormReport) {
    // runner text
    useEffect(() => {
      runnerTextSearch()
    }, [txtDisplaySearchHeader])
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms))
  const millSecChangeText = 1000
  const millSecAppendChar = 150
  const runnerTextSearch = async() =>{
    await sleep(millSecChangeText)
    if (txtDisplaySearchHeader) {
      // reset for begin text in arrary
      if (txtDisplaySearchHeader === LAST_SEARCH_PLACEHOLDER_TEXT) {
        await runnerEachCharOfText(FIRST_SEARCH_PLACEHOLDER_TEXT)
      }
      let isFind = false
      for (const txtItem of SEARCH_PLACEHOLDER_TEXT) {
        if (isFind) {
          await runnerEachCharOfText(txtItem)
          break
        }
        // current text --> set value again for next value
        if (txtItem === txtDisplaySearchHeader) {
          isFind = true
        }
      }
    }
  }

  const runnerEachCharOfText = async(text) =>{
    const globalSearchHTML = document.querySelector('#globalSearch')
    let chars = ''
    for (const char of text) {
      await sleep(millSecAppendChar)
      chars += char
      // while focus search elk global
      while (document.activeElement === globalSearchHTML) {
        await sleep(500)
      }
      globalSearchHTML.placeholder = chars
    }
    // while focus search elk global
    while (document.activeElement === globalSearchHTML) {
      await sleep(500)
    }
    setTxtDisplaySearchHeader(chars) // active effect
  }

  const clearText = (e) =>{
    if (e.target.value !== '') {
      e.target.value = ''
    }
  }

  return (
    <div className='input-group search-area cus-input-group search-box-global' style={{ width: '100%' }}>
      <div className='nav-item d-flex align-items-center' style={{ width: '100%' }}>
        <div className='input-group search-area' style={{ width: '100%' }}>
          <span
            className={`input-group-text cus-input-group-text ${isFormReport ? 'cus-form-report' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (isFormReport) {
                subMitForm()
              } else {
                setIsSubmit(true)
                refInput.current.value = ''
              }
            }}
          >
            <svg className='me-1' width='24' height='24' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z' fill='#fff'/>
            </svg>
          </span>
          <input
            ref={refInput}
            type='text'
            className={`form-control cus-form-control`}
            placeholder={`${isFormReport ? 'Search for the project you want to report with us' : txtDisplaySearchHeader}`}
            onChange={(e) => {
              handleSearch(e.target.value)
              if (isFormReport) {
                setItem()
              }
            }}
            onKeyPress={handleSubmitSearch}
            autoComplete='off'
            onBlur={(e) => {
              handleSearch('')
              clearText(e)
            }}
            id='globalSearch'
          />
        </div>
      </div>
      <div
        className={`form-search-data ${dataSearch?.isActive ? 'active' : ''}`}
        style={{ position: isFormReport ? '' : 'absolute' }}
      >
        {dataSearch?.loading ? (
          <>
            <MySkeletonLoadinng count={5} height={50}/>
          </>
        ) : (
          <>
            {dataSearch?.status === 'done' && (
              <>
                {!dataSearch?.isNull ? (
                  <>
                    {dataSearch?.data?.listCrypto &&
                      dataSearch?.data?.listCrypto?.cryptos !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title d-flex align-items-center justify-content-between'>
                          Cryptos
                          <span
                            className='text-primary'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              navigate(`../../../search/crypto/${keyWord}`)
                            }}
                          >
                            View All
                          </span>
                        </h4>
                        {dataSearch?.data?.listCrypto?.cryptos?.map(
                          (item, index) => (
                            <>
                              <ItemCrypto
                                item={item}
                                index={index}
                                itemSubmit={itemSubmit}
                                // use in component modal search
                                setItemSubmit={setItemSubmit}
                                refInput={refInput}
                                // if global === true, search global reverse, search in table of category
                                global={true}
                                // use in form report
                                setItem={setItem}
                                isFormReport={isFormReport}
                              />
                            </>
                          )
                        )}
                      </div>
                    )}
                    {dataSearch?.data?.listDapp &&
                      dataSearch?.data?.listDapp?.dapps !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title d-flex align-items-center justify-content-between'>
                          Dapps
                          <span
                            className='text-primary'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              navigate(`../../../search/dapp/${keyWord}`)
                            }}
                          >
                            View All
                          </span>
                        </h4>
                        {dataSearch?.data?.listDapp?.dapps?.map(
                          (item, index) => (
                            <ItemDapp
                              key={index}
                              item={item}
                              index={index}
                              itemSubmit={itemSubmit}
                              // setOpenModalSearch={setOpenModalSearch}
                              setItemSubmit={setItemSubmit}
                              refInput={refInput}
                              global={true}

                              setItem={setItem}
                              isFormReport={isFormReport}
                            />
                          )
                        )}
                      </div>
                    )}
                    {dataSearch?.data?.listExchange &&
                      dataSearch?.data?.listExchange?.exchanges !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title d-flex align-items-center justify-content-between'>
                          Exchanges
                          <span
                            className='text-primary'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              navigate(`../../../search/exchange/${keyWord}`)
                            }}
                          >
                            View All
                          </span>
                        </h4>
                        {dataSearch?.data?.listExchange?.exchanges?.map(
                          (item, index) => (
                            <ItemExchange
                              key={index}
                              item={item}
                              index={index}
                              itemSubmit={itemSubmit}
                              // setOpenModalSearch={setOpenModalSearch}
                              setItemSubmit={setItemSubmit}
                              refInput={refInput}
                              global={true}

                              setItem={setItem}
                              isFormReport={isFormReport}
                            />
                          )
                        )}
                      </div>
                    )}
                    {dataSearch?.data?.listSoon &&
                      dataSearch?.data?.listSoon?.soons !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title d-flex align-items-center justify-content-between'>
                          Soons
                          <span
                            className='text-primary'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              navigate(`../../../search/soon/${keyWord}`)
                            }}
                          >
                            View All
                          </span>
                        </h4>
                        {dataSearch?.data?.listSoon?.soons?.map((item) => (
                          <ItemSoon
                            key={item?.soonId}
                            item={item}
                            itemSubmit={itemSubmit}
                            // setOpenModalSearch={setOpenModalSearch}
                            setItemSubmit={setItemSubmit}
                            refInput={refInput}
                            global={true}

                            setItem={setItem}
                            isFormReport={isFormReport}
                          />
                        ))}
                      </div>
                    )}
                    {dataSearch?.data?.listVenture &&
                      dataSearch?.data?.listVenture?.ventures !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title d-flex align-items-center justify-content-between'>
                          Ventures
                          <span
                            className='text-primary'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              navigate(`../../../search/venture/${keyWord}`)
                            }}
                          >
                            View All
                          </span>
                        </h4>
                        {dataSearch?.data?.listVenture?.ventures?.map(
                          (item, index) => (
                            <ItemVenture
                              key={index}
                              item={item}
                              index={index}
                              itemSubmit={itemSubmit}
                              // setOpenModalSearch={setOpenModalSearch}
                              setItemSubmit={setItemSubmit}
                              refInput={refInput}
                              global={true}

                              setItem={setItem}
                              isFormReport={isFormReport}
                            />
                          )
                        )}
                      </div>
                    )}
                    {dataSearch?.data?.listLaunchpad &&
                      dataSearch?.data?.listLaunchpad?.launchPads !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title d-flex align-items-center justify-content-between'>
                          LaunchPads
                          <span
                            className='text-primary'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              navigate(`../../../search/launchpad/${keyWord}`)
                            }}
                          >
                            View All
                          </span>
                        </h4>
                        {dataSearch?.data?.listLaunchpad?.launchPads?.map(
                          (item, index) => (
                            <ItemLaunch
                              key={index}
                              item={item}
                              index={index}
                              itemSubmit={itemSubmit}
                              setItemSubmit={setItemSubmit}
                              refInput={refInput}
                              global={true}

                              setItem={setItem}
                              isFormReport={isFormReport}
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
          </>
        )}
      </div>
    </div>
  )
}

export default InputSearch
