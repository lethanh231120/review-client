import React, { useState, useContext, useEffect, useRef } from 'react'
import { Form, Input, Select, Spin, Image, Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { search, post } from '../../../../api/BaseRequest'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { CategoryContext, SignInContext, Authenticated } from '../../../../App'
import './report.scss'
import nodata from '../../../../images/product/nodata.png'
import Description from '../../product-detail/description/Description'
import FormReport from '../../Forms/form-report/FormReport'
import { LIST_CRYPTO, LIST_DAPP, LIST_EXCHANGE, LIST_SOON, LIST_VENTURE } from '../../../constants/category'
import { ReportModalContext } from '../../../index'

const { Option } = Select

const ModalReport = ({ openModalReport, setOpenModalReport, logout }) => {
  const categoryContext = useContext(CategoryContext)
  const signInContext = useContext(SignInContext)
  const reportModal = useContext(ReportModalContext)
  const auth = useContext(Authenticated)

  const recapcharRef = useRef(null)

  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [dataSearch, setDataSearch] = useState({
    data: {},
    loading: false,
    status: '',
    isActive: false
  })
  const [listDataSearch, setListDataSearch] = useState()
  const [isSubmit, setIsSubmit] = useState(false)
  const [categories, setCategories] = useState([])
  const [defaultValue, setDefaultValue] = useState()
  const [category, setCategory] = useState(LIST_CRYPTO)
  const [item, setItem] = useState()
  const [validateTextArea, setValidateTextArea] = useState(false)
  const [fileList, setFileList] = useState([])
  const [isRecaptcha, setIsRecaptcha] = useState(false)
  const [typeComment, setTypeComment] = useState(false)
  const [errorLink, setErrorLink] = useState()
  const [errorType, setErrorType] = useState()
  const [productId, setProductId] = useState()
  // const [itemSubmit, setItem] = useState()
  const [data, setData] = useState({
    isScam: false,
    content: '',
    sources: [],
    image: '',
    star: 5
  })

  const handleSearch = _.debounce(async(value) => {
    if (value !== '') {
      setDataSearch({
        ...dataSearch,
        loading: true,
        isActive: true
      })
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
      let listData = {}
      if (category === 'all') {
        listData = listDataSearch
      } else {
        listData[category] = listDataSearch[category]
      }
      setDataSearch({
        loading: false,
        data: listData,
        status: 'done',
        isActive: true,
        isNull:
                    listDataSearch?.listCrypto?.cryptos === null &&
                    listDataSearch?.listDapp?.dapps === null &&
                    listDataSearch?.listExchange?.exchanges === null &&
                    listDataSearch?.listSoon?.soons === null &&
                    listDataSearch?.listVenture?.ventures === null
      })
      setItem()
    }
  }, [listDataSearch, category])

  useEffect(() => {
    if (typeComment === 'login') {
      if (!auth?.isAuthenticated) {
        signInContext?.handleSetOpenModal(true)
      }
    }
  }, [typeComment, signInContext, auth])

  const subMitForm = () => {
    switch (category) {
      case 'all':
        setItem((dataSearch?.data?.listCrypto !== null && !_.isEmpty(dataSearch?.data?.listCrypto?.cryptos)) && dataSearch?.data?.listCrypto?.cryptos[0])
        break
      case 'listDapp':
        setItem((dataSearch?.data?.listDapp !== null && !_.isEmpty(dataSearch?.data?.listDapp?.dapps)) && dataSearch?.data?.listDapp?.dapps[0])
        break
      case 'listSoon':
        setItem((dataSearch?.data?.listSoon !== null && !_.isEmpty(dataSearch?.data?.listSoon?.soons)) && dataSearch?.data?.listSoon?.soons[0])
        break
      case 'listVenture':
        setItem((dataSearch?.data?.listVenture !== null && !_.isEmpty(dataSearch?.data?.listVenture?.ventures)) && dataSearch?.data?.listVenture?.ventures[0])
        break
      case 'listCrypto':
        setItem((dataSearch?.data?.listCrypto !== null && !_.isEmpty(dataSearch?.data?.listCrypto?.cryptos)) && dataSearch?.data?.listCrypto?.cryptos[0])
        break
      case 'listExchange':
        setItem((dataSearch?.data?.listExchange !== null && !_.isEmpty(dataSearch?.data?.listExchange?.exchanges)) && dataSearch?.data?.listExchange?.exchanges[0])
        break

      default:
        break
    }
  }

  const handleSubmit = () => {
    if (_.isEmpty(dataSearch?.data)) {
      navigate('/notfound')
    } else {
      subMitForm()
    }
  }

  const handleSubmitSearch = (e) => {
    if (e.key === 'Enter') {
      subMitForm()
    }
  }

  // Process to get the url for product detail after the report is done
  // Report scam will be redirected to detail product screen
  useEffect(() => {
    const id = item?.cryptoId ? item?.cryptoId
      : (item?.dappId ? item?.dappId
        : (item?.ventureId ? item?.ventureId
          : (item?.soonId ? item?.soonId
            : item?.exchangeId)))
    if (id?.split('_')[1] === 'token' || id?.split('_')[1] === 'coin') {
      const productId = `products/crypto/${id?.split('_')[1]}/${id?.split('_')[2]}/${id?.split('_')[1] === 'token' ? id?.split('_')[3] : ''}`
      setProductId(productId)
    } else {
      const productId = `products/${id?.split('_')[1]}/${(id?.split('_')[1] === 'soon') ? `${item?.soonId?.split('_')[2]}${item?.soonId?.split('_')[3] ? `/${item?.soonId?.split('_')[3]}` : ''}` : `${id?.split('_')[2]}/${id?.split('_')[3]}`}`
      setProductId(productId)
    }
  }, [item])

  // function handle more scam report
  // input: params: data to method , type: type of comment: auth or anonymous
  const submitComment = async(params, type) => {
    let dataAdd
    if (type === 'anonymous') {
      dataAdd = await post('reviews/review/anonymous', params)
    } else {
      dataAdd = await post('reviews/review', params)
    }
    if (dataAdd) {
      // reset the value of state data
      setData({
        isScam: false,
        content: '',
        sources: [],
        image: '',
        star: 5
      })
      // reset the value of state image
      setFileList([])
      // reset the value of state error textarea( input)
      setValidateTextArea(false)
      // close modal report scam
      //   setOpenModalReport(false)
      reportModal?.handleSetOpenModal(false)
      // reset the value of state type comment
      setTypeComment()
      setItem()
      // reset the value of recapcharRef
      recapcharRef.current.reset()
      // redirect to detail product
      navigate(`../../../${productId}`)
    }
  }

  // function process after click enter
  const handleComment = async(e) => {
    // check if press ctrl enter then textarea line, if enter add report scam
    if (e.ctrlKey && e.key === 'Enter') {
      setData({
        ...data,
        content: `${data?.content}\n`
      })
    } else {
      e.preventDefault()
      functionAddComment(data?.content)
    }
  }

  const functionAddComment = (content) => {
    const params = {
      ...data,
      productId: item?.cryptoId ? item?.cryptoId
        : (item?.dappId ? item?.dappId
          : (item?.ventureId ? item?.ventureId
            : (item?.soonId ? item?.soonId
              : item?.exchangeId)))
    }
    if (typeComment) {
      if (content !== '') {
        const recaptchaValue = recapcharRef.current.getValue()
        if (recaptchaValue) {
          if (data?.isScam) {
            if (!_.isEmpty(data?.sources)) {
              submitComment(params, 'anonymous')
            } else {
              setErrorLink('Link proof is required')
            }
          } else {
            submitComment(params, 'anonymous')
          }
        } else {
          setIsRecaptcha(true)
        }
      } else {
        setValidateTextArea(true)
      }
    } else {
      if (auth?.isAuthenticated) {
        if (content !== '') {
          const recaptchaValue = recapcharRef.current.getValue()
          if (recaptchaValue) {
            if (data?.isScam) {
              if (!_.isEmpty(data?.sources)) {
                submitComment(params, 'auth')
              } else {
                setErrorLink('Link proof is required')
              }
            } else {
              submitComment(params, 'auth')
            }
          } else {
            setIsRecaptcha(true)
          }
        } else {
          setValidateTextArea(true)
        }
      } else {
        signInContext?.handleSetOpenModal(true)
      }
    }
  }

  const handleSubmitComment = async() => {
    functionAddComment(data?.content)
  }

  useEffect(() => {
    const categories = [{
      name: 'All filter',
      key: 'all'
    }]

    for (const key in categoryContext) {
      let keySearch
      switch (categoryContext[key]?.category?.name) {
        case 'DApps':
          keySearch = LIST_DAPP
          break
        case 'Upcomings':
          keySearch = LIST_SOON
          break
        case 'Ventures':
          keySearch = LIST_VENTURE
          break
        case 'Crypto Projects':
          keySearch = LIST_CRYPTO
          break
        case 'Exchanges':
          keySearch = LIST_EXCHANGE
          break

        default:
          break
      }
      if (categoryContext[key]?.category?.name !== 'Scams') {
        categories.push({
          name: categoryContext[key]?.category?.name,
          key: keySearch
        })
      }
    }
    setDefaultValue([
      { name: 'category', value: LIST_CRYPTO },
      { name: 'keyword', value: '' }
    ])
    setCategories(categories)
  }, [categoryContext])

  useEffect(() => {
    if (isSubmit) {
      handleSubmit()
    }
  }, [isSubmit])

  return (
    <>
      <Form form={form} onFinish={handleSubmit} fields={defaultValue}>
        <Form.Item name='keyword'>
          <Input
            placeholder='Search by Token / Coin / Exchange / Dapp / Venture...'
            onChange={(e) => {
              setItem()
              handleSearch(e.target.value)
            }}
            onKeyPress={handleSubmitSearch}
            autoComplete='off'
            addonBefore={
              <Form.Item name='category'>
                <Select
                  style={{ minWidth: '15rem' }}
                  value={category}
                  onChange={(value) => setCategory(value)}
                  onBlur={() => handleSearch('')}
                >
                  {categories?.map((item) => (
                    <Option value={item?.key} key={item?.key}>{item?.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            }
            suffix={(<Form.Item>
              <SearchOutlined onClick={() => setIsSubmit(true)} style={{ color: '#fff', fontSize: '2rem' }}/>
            </Form.Item>
            )}
            onBlur={(e) => {
              handleSearch('')
            }}
          />
        </Form.Item>
      </Form>
      <div className={`report-data ${dataSearch?.isActive ? 'active' : ''}`}>
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
                    {dataSearch?.data?.listCrypto && dataSearch?.data?.listCrypto?.cryptos !== null && (
                      <div className='form-search-data-box'>
                        <div className='form-search-data-title'>Cryptos</div>
                        {dataSearch?.data?.listCrypto?.cryptos?.map((item, index) => (
                          <div
                            key={index}
                            className='form-search-data-item'
                            onClick={() => {
                              setDataSearch({ ...dataSearch, isActive: false })
                              setItem(item)
                            }}
                          >
                            <div className='form-search-data-item-data'>
                              {item?.image ? (
                                <Image src={item?.image} preview={false}/>
                              ) : (
                                <span className='table-icon-coin-logo'>
                                  {item?.name?.slice(0, 3)?.toUpperCase()}
                                </span>
                              )}
                              {item?.name}
                              <div className='form-search-data-item-data-symbol'>({item?.symbol})</div>
                            </div>
                            {item?.chainname && (
                              <div className='form-search-data-item-data-content-tag'>{item?.chainname}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {dataSearch?.data?.listDapp && dataSearch?.data?.listDapp?.dapps !== null && (
                      <div className='form-search-data-box'>
                        <div className='form-search-data-title'>Dapps</div>
                        {dataSearch?.data?.listDapp?.dapps?.map((item, index) => (
                          <div
                            key={index}
                            className='form-search-data-item'
                            onClick={() => {
                              setDataSearch({ ...dataSearch, isActive: false })
                              setItem(item)
                            }}
                          >
                            <div className='form-search-data-item-data'>
                              {item?.image ? (
                                <Image src={item?.image} preview={false}/>
                              ) : (
                                <span className='table-icon-coin-logo'>
                                  {item?.name?.slice(0, 3)?.toUpperCase()}
                                </span>
                              )}
                              {item?.name}
                            </div>
                            {item?.category && (
                              <div className='form-search-data-item-data-content-tag'>{item?.category}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {dataSearch?.data?.listExchange && dataSearch?.data?.listExchange?.exchanges !== null && (
                      <div className='form-search-data-box'>
                        <div className='form-search-data-title'>Exchanges</div>
                        {dataSearch?.data?.listExchange?.exchanges?.map((item, index) => (
                          <div
                            key={index}
                            className='form-search-data-item'
                            onClick={() => {
                              setDataSearch({ ...dataSearch, isActive: false })
                              setItem(item)
                            }}
                          >
                            <div className='form-search-data-item-data'>
                              {item?.image ? (
                                <Image src={item?.image} preview={false}/>
                              ) : (
                                <span className='table-icon-coin-logo'>
                                  {item?.name?.slice(0, 3)?.toUpperCase()}
                                </span>
                              )}
                              {item?.name}
                            </div>
                            {item?.category && (
                              <div className='form-search-data-item-data-content-tag'>{item?.category}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {dataSearch?.data?.listSoon && dataSearch?.data?.listSoon?.soons !== null && (
                      <div className='form-search-data-box'>
                        <div className='form-search-data-title'>Soons</div>
                        {dataSearch?.data?.listSoon?.soons?.map((item, index) => (
                          <div
                            key={index}
                            className='form-search-data-item'
                            onClick={() => {
                              setDataSearch({ ...dataSearch, isActive: false })
                              setItem(item)
                            }}
                          >
                            <div className='form-search-data-item-data'>
                              {item?.image ? (
                                <Image src={item?.image} preview={false}/>
                              ) : (
                                <span className='table-icon-coin-logo'>
                                  {item?.name?.slice(0, 3)?.toUpperCase()}
                                </span>
                              )}
                              {item?.name}
                            </div>
                            {item?.blockchain && (
                              <div className='form-search-data-item-data-content-tag'>{item?.blockchain}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {dataSearch?.data?.listVenture && dataSearch?.data?.listVenture?.ventures !== null && (
                      <div className='form-search-data-box'>
                        <div className='form-search-data-title'>Ventures</div>
                        {dataSearch?.data?.listVenture?.ventures?.map((item, index) => (
                          <div
                            key={index}
                            className='form-search-data-item'
                            onClick={() => {
                              setDataSearch({ ...dataSearch, isActive: false })
                              setItem(item)
                            }}
                          >
                            <div className='form-search-data-item-data'>
                              {item?.image ? (
                                <Image src={item?.image} preview={false}/>
                              ) : (
                                <span className='table-icon-coin-logo'>
                                  {item?.name?.slice(0, 3)?.toUpperCase()}
                                </span>
                              )}
                              {item?.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Empty
                    image={nodata}
                    description={
                      <span>
                        <span style={{ fontSize: '1.8em', color: 'red', fontWeight: 600 }}>SORRY </span>
                        <span style={{ fontSize: '1.6rem', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '600' }}>NO DATA FOUND</span>
                      </span>
                    }
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      {item ? (
        <>
          <div className='report-item'>
            <div className='dapp'>
              <div className='dapp-overview'>
                {item?.image ? (
                  <Image
                    src={item?.image}
                    preview={false}
                  />
                ) : (
                  <span
                    style={{
                      marginRight: '3rem',
                      width: '6rem',
                      background: '#2ECC71',
                      height: '6rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      fontWeight: '600',
                      color: '#F9CA24'
                    }}
                  >
                    {item?.name?.slice(0, 3)?.toUpperCase()}
                  </span>
                )}
                <div className='dapp-overview-parameter'>
                  <div className='dapp-overview-parameter-info'>
                    <div className='dapp-overview-name'>
                      {item?.name}
                    </div>
                  </div>
                  <div className='dapp-overview-list-tags'>
                    {item?.category ? (
                      <div className='dapp-tag'>{item?.category}</div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Description text={item?.description}/>
          </div>
          <FormReport
            isFormReport={false}
            rest={{
              setData: setData,
              handleComment: handleComment,
              setValidateTextArea: setValidateTextArea,
              setFileList: setFileList,
              handleSubmitComment: handleSubmitComment,
              setErrorLink: setErrorLink,
              setIsRecaptcha: setIsRecaptcha,
              setTypeComment: setTypeComment,
              setErrorType: setErrorType,
              showUser: false,
              data: data,
              validateTextArea: validateTextArea,
              fileList: fileList,
              recapcharRef: recapcharRef,
              isRecaptcha: isRecaptcha,
              errorLink: errorLink,
              typeComment: typeComment,
              errorType: errorType,
              id: item?.cryptoId ? item?.cryptoId
                : (item?.dappId ? item?.dappId
                  : (item?.ventureId ? item?.ventureId
                    : (item?.cryptoId ? item?.cryptoId
                      : item?.exchangeId)))
            }}
          />
        </>
      ) : (<>
        {!dataSearch?.isActive ? (
          <Empty
            style={{ marginTop: '2rem' }}
            image={nodata}
            description={
              <span>
                <span style={{ fontSize: '1.8em', color: 'red', fontWeight: 600 }}>SORRY </span>
                <span style={{ fontSize: '1.6rem', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '600' }}>NO DATA FOUND</span>
              </span>
            }
          />
        ) : ('')}
      </>)}
    </>
  )
}

export default ModalReport

