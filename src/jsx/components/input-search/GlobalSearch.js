import React, { useEffect, useState } from 'react'
// import React, { useEffect, useState, useContext } from 'react'
import { Form, Empty, Spin } from 'antd'
// import { Form, Input, Select, Empty, Spin } from 'antd'
// import { SearchOutlined } from '@ant-design/icons'
import './globalSearch.scss'
import { search } from '../../../api/BaseRequest'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import nodata from '../../../images/product/nodata.png'
// import { CategoryContext } from '../Main'
// import { CategoryContext } from '../../../jsx/index'
// import {
//   LIST_CRYPTO,
//   LIST_DAPP,
//   LIST_EXCHANGE,
//   LIST_SOON,
//   LIST_VENTURE
// } from '../../constants/category'
import ItemCrypto from './item-crypto/ItemCrypto'
import ItemDapp from './item-dapp/ItemDapp'
import ItemExchange from './item-exchange/ItemExchange'
import ItemSoon from './item-soon/ItemSoon.js'
import ItemVenture from './item-venture/ItemVenture'
import { Link } from 'react-router-dom'

// const { Option } = Select

// const defaultValue = [
//   { name: 'category', value: 'all' },
//   { name: 'address', value: '' }
// ]

const InputSearch = ({ setOpenModalSearch, type }) => {
  // const categoryContext = useContext(CategoryContext)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [isSubmit, setIsSubmit] = useState(false)
  // const [categories, setCategories] = useState([])
  // const [category, setCategory] = useState('all')
  const [listDataSearch, setListDataSearch] = useState()
  const [itemSubmit, setItemSubmit] = useState()
  const [dataSearch, setDataSearch] = useState({
    data: {},
    loading: false,
    status: '',
    isActive: false
  })
  const [keyWord, setKeyWord] = useState()

  const handleSearch = _.debounce(async(e, value) => {
    if (value !== '') {
      setDataSearch({
        ...dataSearch,
        loading: true,
        isActive: true
      })
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
      // let listData = {}
      // if (category === 'all') {
      //   listData = listDataSearch
      // } else {
      //   listData[category] = listDataSearch[category]
      // }
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
          listDataSearch?.listVenture?.ventures === null
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
                  : ''
      )
    }
  }, [listDataSearch])
  // }, [listDataSearch, category])

  // const subMitForm = () => {
  //   if (itemSubmit) {
  //     const productId = itemSubmit?.cryptoId
  //       ? `${itemSubmit?.cryptoId?.split('_')[1]}/${itemSubmit?.cryptoId?.split('_')[2]}/${itemSubmit?.cryptoId?.split('_')[1] === 'token' ? itemSubmit?.cryptoId?.split('_')[3] : ''}`
  //       : itemSubmit?.dappId
  //         ? `${itemSubmit?.dappId?.split('_')[2]}/${itemSubmit?.dappId?.split('_')[3]}`
  //         : itemSubmit?.exchangeId
  //           ? `${itemSubmit?.exchangeId?.split('_')[2]}/${itemSubmit?.exchangeId?.split('_')[3]}`
  //           : itemSubmit?.soonId
  //             ? `${itemSubmit?.soonId?.split('_')[2]}${itemSubmit?.soonId?.split('_')[3] ? `/${itemSubmit?.soonId?.split('_')[3]}` : ''}`
  //             : `${itemSubmit?.ventureId?.split('_')[2]}/${itemSubmit?.ventureId?.split('_')[3]}`
  //     navigate(
  //       `../../products/${
  //         itemSubmit?.cryptoId
  //           ? 'crypto'
  //           : itemSubmit?.dappId
  //             ? 'dapp'
  //             : itemSubmit?.exchangeId
  //               ? 'exchange'
  //               : itemSubmit?.soonId
  //                 ? 'soon'
  //                 : 'venture'
  //       }/${productId}`
  //     )
  //   }
  // }

  // const handleSubmit = () => {
  //   if (_.isEmpty(dataSearch?.data)) {
  //     navigate('/notfound')
  //   } else {
  //     subMitForm()
  //   }
  // }

  // const handleSubmitSearch = (e) => {
  //   if (e.key === 'Enter') {
  //     subMitForm()
  //   }
  // }

  useEffect(() => {
    if (isSubmit) {
      if (!dataSearch?.isNull) {
        if (type) {
          setOpenModalSearch(false)
        }
        form.resetFields()
        form.setFieldsValue({
          category: 'all'
        })
        setIsSubmit(false)
        navigate(`../../../search/${keyWord}`)
      }
    }
  }, [isSubmit])

  // useEffect(() => {
  //   const categories = [
  //     {
  //       name: 'All filter',
  //       key: 'all'
  //     }
  //   ]

  //   for (const key in categoryContext) {
  //     let keySearch
  //     switch (categoryContext[key]?.category?.name) {
  //       case 'DApps':
  //         keySearch = LIST_DAPP
  //         break
  //       case 'Upcomings':
  //         keySearch = LIST_SOON
  //         break
  //       case 'Ventures':
  //         keySearch = LIST_VENTURE
  //         break
  //       case 'Crypto Projects':
  //         keySearch = LIST_CRYPTO
  //         break
  //       case 'Exchanges':
  //         keySearch = LIST_EXCHANGE
  //         break

  //       default:
  //         break
  //     }
  //     if (categoryContext[key]?.category?.name !== 'Scams') {
  //       categories.push({
  //         name: categoryContext[key]?.category?.name,
  //         key: keySearch
  //       })
  //     }
  //   }
  //   setCategories(categories)
  // }, [categoryContext])

  // const handleEnterSelect = (e) => {
  //   if (e.which === 13) {
  //     handleSubmit()
  //   }
  // }

  return (
    <div className='input-group search-area cus-input-group'>
      <input
        type='text'
        className='form-control cus-form-control'
        placeholder='Search here...'
        onChange={(e) => handleSearch(e, e.target.value)}
        onBlur={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSearch(e, '')
        }}
      />
      <span className='input-group-text cus-input-group-text'>
        <Link to={'#'}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z'
              fill='var(--secondary)'
            />
          </svg>
        </Link>
      </span>
      {/* <input
        placeholder='Search by Token / Coin / Exchange / Dapp / Venture...'
        // onChange={(e) => handleSearch(e, e.target.value)}
        // onKeyPress={handleSubmitSearch}
        className='form-control'
        // autoComplete='off'
        // addonBefore={
        //   <Form.Item name='category'>
        //     <Select
        //       className='text-select'
        //       style={{ minWidth: '15rem' }}
        //       value={category}
        //       onChange={(value) => setCategory(value)}
        //       onBlur={(e) => handleSearch(e, '')}
        //       onKeyDown={handleEnterSelect}
        //     >
        //       {categories.map((item) => (
        //         <Option value={item?.key} key={item?.key}>
        //           {item?.name}
        //         </Option>
        //       ))}
        //     </Select>
        //   </Form.Item>
        // }
        // suffix={
        //   <Form.Item>
        //     <SearchOutlined
        //       onClick={(e) => {
        //         e.preventDefault()
        //         e.stopPropagation()
        //         setIsSubmit(true)
        //       }}
        //       style={{
        //         color: '#fff',
        //         fontSize: '2rem',
        //         backgroundColor: '#039F7F',
        //         borderRadius: '0px 10px 10px 0px'
        //       }}
        //     />
        //   </Form.Item>
        // }
        onBlur={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSearch(e, '')
        }}
      /> */}
      {/* </Form.Item>
      </Form> */}
      <div
        className={`form-search-data ${dataSearch?.isActive ? 'active' : ''}`}
      >
        {dataSearch?.loading ? (
          <>
            <Spin size='large' />
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
                        <h4 className='card-title card-intro-title form-search-data-title'>Cryptos</h4>
                        {dataSearch?.data?.listCrypto?.cryptos?.map(
                          (item, index) => (
                            <>
                              <ItemCrypto
                                item={item}
                                index={index}
                                itemSubmit={itemSubmit}
                                setOpenModalSearch={setOpenModalSearch}
                                setItemSubmit={setItemSubmit}
                                global={true}
                              />
                              {/* <Link
                                  to={`../../products/crypto/${item?.cryptoId?.split('_')[1]}/${item?.cryptoId?.split('_')[2]}/${item?.cryptoId?.split('_')[1] === 'token' ? item?.cryptoId?.split('_')[3] : ''}`}
                                  key={index}
                                  className={`${
                                    itemSubmit?.cryptoId === item?.cryptoId
                                      ? "hover"
                                      : ""
                                  } form-search-data-item`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    navigate(`../../products/crypto/${item?.cryptoId?.split('_')[1]}/${item?.cryptoId?.split('_')[2]}/${item?.cryptoId?.split('_')[1] === 'token' ? item?.cryptoId?.split('_')[3] : ''}`)
                                    if (setOpenModalSearch !== undefined) {
                                      setOpenModalSearch(false)
                                    }
                                  }}
                                  onMouseEnter={() => setItemSubmit(item)}
                                >
                                  <div className="form-search-data-item-data">
                                    {item?.image ? (
                                      <Image src={item?.image} preview={false} />
                                    ) : (
                                      <span className="table-icon-coin-logo">
                                        {item?.name?.slice(0, 3)?.toUpperCase()}
                                      </span>
                                    )}
                                    <div>
                                      <div className="form-search-data-item-data-content">
                                          <div className="form-search-data-item-data-name">
                                              {item?.name}
                                          </div>
                                          <div className="form-search-data-item-data-symbol">
                                              ({item?.symbol})
                                          </div>
                                          {item?.isScam ? (
                                              <Image src={scam} preview={false} />
                                          ) : item?.isWarning ? (
                                              <Image src={warning} preview={false} />
                                          ) : (
                                              ""
                                          )}
                                      </div>
                                      <div className="form-search-data-item-data-list">
                                        {item?.addressShow && (
                                          <div className="form-search-data-item-data-address">
                                            {item?.addressShow}
                                          </div>
                                        )}
                                      </div>
                                      {item?.chainname && (
                                          <div className="form-search-data-item-data-tag">
                                              {item?.chainname}
                                          </div>
                                      )}
                                    </div>
                                  </div>
                                </Link> */}
                            </>
                          )
                        )}
                      </div>
                    )}
                    {dataSearch?.data?.listDapp &&
                      dataSearch?.data?.listDapp?.dapps !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title'>Dapps</h4>
                        {dataSearch?.data?.listDapp?.dapps?.map(
                          (item, index) => (
                            <ItemDapp
                              key={index}
                              item={item}
                              index={index}
                              itemSubmit={itemSubmit}
                              setOpenModalSearch={setOpenModalSearch}
                              setItemSubmit={setItemSubmit}
                              global={true}
                            />
                            // <Link
                            //   to={`../../products/dapp/${item?.dappId?.split('_')[2]}/${item?.dappId?.split('_')[3]}`}
                            //   key={index}
                            //   className={`${
                            //     itemSubmit?.dappId === item?.dappId
                            //       ? "hover"
                            //       : ""
                            //   } form-search-data-item`}
                            //   onClick={(e) => {
                            //       navigate(`../../products/dapp/${item?.dappId?.split('_')[2]}/${item?.dappId?.split('_')[3]}`)
                            //       setOpenModalSearch(false)
                            //   }}
                            //   onMouseEnter={() => setItemSubmit(item)}
                            // >
                            //   <div className="form-search-data-item-data">
                            //     {item?.image ? (
                            //       <Image src={item?.image} preview={false} />
                            //     ) : (
                            //       <span className="table-icon-coin-logo">
                            //         {item?.name?.slice(0, 3)?.toUpperCase()}
                            //       </span>
                            //     )}
                            //     <div>
                            //       <div className="form-search-data-item-data-content">
                            //         <div className="form-search-data-item-data-name">
                            //           {item?.name}
                            //         </div>
                            //         {item?.isScam ? (
                            //           <Image src={scam} preview={false} />
                            //         ) : item?.isWarning ? (
                            //           <Image src={warning} preview={false} />
                            //         ) : (
                            //           ""
                            //         )}
                            //       </div>
                            //       <div className="form-search-data-item-data-list">
                            //         {item?.chainName && (
                            //           <div className="form-search-data-item-data-tag">
                            //             {item?.chainName}
                            //           </div>
                            //         )}
                            //         {item?.user24h > 0 && (
                            //           <div className="form-search-data-item-data-tag">
                            //             {item?.user24h
                            //               ?.toFixed(2)
                            //               .replace(
                            //                 /\d(?=(\d{3})+\.)/g,
                            //                 "$&,"
                            //               )}{" "}
                            //             User 24H
                            //           </div>
                            //         )}
                            //       </div>
                            //       {item?.chains && (
                            //         <span className="form-search-data-item-data-content-list">
                            //           {item?.chains
                            //             ?.split(",")
                            //             ?.map((itemChain) => (
                            //               <div
                            //                 className="form-search-data-item-data-tag"
                            //                 key={itemChain}
                            //               >
                            //                 {itemChain}
                            //               </div>
                            //             ))}
                            //         </span>
                            //       )}
                            //     </div>
                            //   </div>
                            //   {item?.category && (
                            //     <div className="form-search-data-item-data-content-tag">
                            //       {item?.category}
                            //     </div>
                            //   )}
                            // </Link>
                          )
                        )}
                      </div>
                    )}
                    {dataSearch?.data?.listExchange &&
                      dataSearch?.data?.listExchange?.exchanges !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title'>Exchanges</h4>
                        {dataSearch?.data?.listExchange?.exchanges?.map(
                          (item, index) => (
                            <ItemExchange
                              key={index}
                              item={item}
                              index={index}
                              itemSubmit={itemSubmit}
                              setOpenModalSearch={setOpenModalSearch}
                              setItemSubmit={setItemSubmit}
                              global={true}
                            />
                            // <Link
                            //   to={`../../products/exchange/${item?.exchangeId?.split('_')[2]}/${item?.exchangeId?.split('_')[3]}`}
                            //   key={index}
                            //   className={`${
                            //     itemSubmit?.exchangeId === item?.exchangeId
                            //       ? "hover"
                            //       : ""
                            //   } form-search-data-item`}
                            //   onClick={() => {
                            //     navigate(`../../products/exchange/${item?.exchangeId?.split('_')[2]}/${item?.exchangeId?.split('_')[3]}`)
                            //     setOpenModalSearch(false)
                            //   }}
                            //   onMouseEnter={() => setItemSubmit(item)}
                            // >
                            //   <div className="form-search-data-item-data">
                            //     {item?.image ? (
                            //       <Image src={item?.image} preview={false} />
                            //     ) : (
                            //       <span className="table-icon-coin-logo">
                            //         {item?.name?.slice(0, 3)?.toUpperCase()}
                            //       </span>
                            //     )}
                            //     <div>
                            //       <div className="form-search-data-item-data-content">
                            //         <div className="form-search-data-item-data-name">
                            //           {item?.name}
                            //         </div>
                            //         {item?.isScam ? (
                            //           <Image src={scam} preview={false} />
                            //         ) : item?.isWarning ? (
                            //           <Image src={warning} preview={false} />
                            //         ) : (
                            //           ""
                            //         )}
                            //       </div>
                            //       <div className="form-search-data-item-data-list">
                            //         {item?.volume7d > 0 && (
                            //           <div className="form-search-data-item-data-tag">
                            //             {item?.volume7d
                            //               ?.toFixed(2)
                            //               .replace(
                            //                 /\d(?=(\d{3})+\.)/g,
                            //                 "$&,"
                            //               )}{" "}
                            //             Volume 7D
                            //           </div>
                            //         )}
                            //         {item?.category && (
                            //           <div className="form-search-data-item-data-tag">
                            //             {item?.category}
                            //           </div>
                            //         )}
                            //       </div>
                            //     </div>
                            //   </div>
                            // </Link>
                          )
                        )}
                      </div>
                    )}
                    {dataSearch?.data?.listSoon &&
                      dataSearch?.data?.listSoon?.soons !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title'>Soons</h4>
                        {dataSearch?.data?.listSoon?.soons?.map((item) => (
                          <ItemSoon
                            key={item?.soonId}
                            item={item}
                            itemSubmit={itemSubmit}
                            setOpenModalSearch={setOpenModalSearch}
                            setItemSubmit={setItemSubmit}
                            global={true}
                          />
                          // <Link
                          //   to={`../../products/soon/${item?.soonId?.split('_')[2]}${item?.soonId?.split('_')[3] ? `/${item?.soonId?.split('_')[3]}` : ''}`}
                          //   key={item?.soonId}
                          //   className={`${
                          //     itemSubmit?.soonId === item?.soonId
                          //       ? "hover"
                          //       : ""
                          //   } form-search-data-item`}
                          //   onClick={() => {
                          //     navigate(`../../products/soon/${item?.soonId?.split('_')[2]}${item?.soonId?.split('_')[3] ? `/${item?.soonId?.split('_')[3]}` : ''}`)
                          //     setOpenModalSearch(false)
                          //   }}
                          //   onMouseEnter={() => setItemSubmit(item)}
                          // >
                          //   <div className="form-search-data-item-data">
                          //     {item?.image ? (
                          //       <Image src={item?.image} preview={false} />
                          //     ) : (
                          //       <span className="table-icon-coin-logo">
                          //         {item?.name?.slice(0, 3)?.toUpperCase()}
                          //       </span>
                          //     )}
                          //     <div>
                          //       <div className="form-search-data-item-data-content">
                          //         <div className="form-search-data-item-data-name">
                          //           {item?.name}
                          //         </div>
                          //         <div className="form-search-data-item-data-symbol">
                          //           ({item?.symbol})
                          //         </div>
                          //         {item?.isScam ? (
                          //           <Image src={scam} preview={false} />
                          //         ) : item?.isWarning ? (
                          //           <Image src={warning} preview={false} />
                          //         ) : (
                          //           ""
                          //         )}
                          //       </div>
                          //       <div className="form-search-data-item-data-list">
                          //         {item?.roundType && (
                          //           <div className="form-search-data-item-data-tag">
                          //             {item?.roundType}
                          //           </div>
                          //         )}
                          //         {item?.blockchain && (
                          //           <span className="form-search-data-item-data-content-list">
                          //             {item?.blockchain
                          //               ?.split("")
                          //               ?.map((itemSoon) => (
                          //                 <div
                          //                   className="form-search-data-item-data-tag"
                          //                   key={itemSoon}
                          //                 >
                          //                   {itemSoon}
                          //                 </div>
                          //               ))}
                          //           </span>
                          //         )}
                          //       </div>
                          //     </div>
                          //   </div>
                          // </Link>
                        ))}
                      </div>
                    )}
                    {dataSearch?.data?.listVenture &&
                      dataSearch?.data?.listVenture?.ventures !== null && (
                      <div className='form-search-data-box'>
                        <h4 className='card-title card-intro-title form-search-data-title'>Ventures</h4>
                        {dataSearch?.data?.listVenture?.ventures?.map(
                          (item, index) => (
                            <ItemVenture
                              key={index}
                              item={item}
                              index={index}
                              itemSubmit={itemSubmit}
                              setOpenModalSearch={setOpenModalSearch}
                              setItemSubmit={setItemSubmit}
                              global={true}
                            />
                            // <Link
                            //   to={`../../products/venture/${item?.ventureId?.split('_')[2]}/${item?.ventureId?.split('_')[3]}`}
                            //   key={index}
                            //   className={`${
                            //     itemSubmit?.ventureId === item?.ventureId
                            //       ? "hover"
                            //       : ""
                            //   } form-search-data-item`}
                            //   onClick={() => {
                            //       navigate(`../../products/venture/${item?.ventureId?.split('_')[2]}/${item?.ventureId?.split('_')[3]}`)
                            //       setOpenModalSearch(false)
                            //   }}
                            //   onMouseEnter={() => setItemSubmit(item)}
                            // >
                            //   <div className="form-search-data-item-data">
                            //     {item?.image ? (
                            //       <Image src={item?.image} preview={false} />
                            //     ) : (
                            //       <span className="table-icon-coin-logo">
                            //         {item?.name?.slice(0, 3)?.toUpperCase()}
                            //       </span>
                            //     )}
                            //     <div>
                            //       <div className="form-search-data-item-data-content">
                            //         <div className="form-search-data-item-data-name">
                            //           {item?.name}
                            //         </div>
                            //       </div>
                            //       {item?.location && (
                            //         <span className="form-search-data-item-data-content-list">
                            //           <div
                            //             className="form-search-data-item-data-tag"
                            //           >
                            //             {item?.location}
                            //           </div>
                            //         </span>
                            //       )}
                            //     </div>
                            //   </div>
                            // </Link>
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
