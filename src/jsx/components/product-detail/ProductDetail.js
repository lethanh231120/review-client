import React, { useEffect, useState, useRef, useContext } from 'react'
import { Form } from 'antd'
// import moment from 'moment'
import './productDetail.scss'
import { get, post } from '../../../api/BaseRequest'
import { useLocation, useParams } from 'react-router-dom'
import _ from 'lodash'
import { SignInContext, Authenticated } from '../../../App'
import CryptoInfo from './crypto-info/CryptoInfo'
import ExchangeInfo from './exchange-info/ExchangeInfo'
import DappInfo from './dapp-info/DappInfo'
import SoonInfo from './soon-info/SoonInfo'
import VentureInfo from './venture-info/VentureInfo'
import { exchanges } from '../../../utils/ExchangeImage'
import {
  DAPP,
  SOON,
  VENTURE,
  EXCHANGE,
  CRYPTO
} from '../../constants/category'
import DetailLoading from '../loading/DetailLoading'
import { getCookie, STORAGEKEY } from '../../../utils/storage'
import user from '../../../images/product/user.png'
import Swal from 'sweetalert2'

const ProductDetail = () => {
  const { pathname } = useLocation()
  const [form] = Form.useForm()
  const { type, productName, path, categoryName } = useParams()
  // type coin thi khong co product Id, token thi co productId

  const ref = useRef(null)
  const recapcharRef = useRef(null)
  const signInContext = useContext(SignInContext)
  const auth = useContext(Authenticated)

  const [productId, setProductId] = useState()
  const [productInfo, setProductInfo] = useState()
  const [defaultFilter, setDefaultFilter] = useState({
    productId: undefined,
    page: 1,
    orderBy: 'createdDate'
  })
  const [data, setData] = useState({
    isScam: false,
    content: '',
    sources: [],
    image: null,
    star: 5,
    // title: '',
    scamAmountUSD: null
  })
  const [validateText, setValidateText] = useState({
    title: {
      isError: false,
      message: ''
    },
    textArear: {
      isError: false,
      message: ''
    }
  })
  const [fileList, setFileList] = useState([])
  const [isShow, setIsShow] = useState()
  const [errorLink, setErrorLink] = useState()
  const [isRecaptcha, setIsRecaptcha] = useState(false)
  const [typeComment, setTypeComment] = useState(false)
  const [errorType, setErrorType] = useState()
  const [dataReview, setDataReview] = useState({
    data: [],
    accountId: []
  })
  const [dataReply, setDataReply] = useState({
    data: [],
    accountId: []
  })
  const [dataReaction, setDataReaction] = useState({
    data: [],
    accountId: []
  })
  const [listAccount, setListAccount] = useState()
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  useEffect(() => {
    let id
    if (type && productName) {
      if (type === 'coin') {
        id = `gear5_coin_${productName}`
      } else {
        id = `gear5_token_${productName}_${path}`
      }
    } else {
      if (path) {
        id = `gear5_${categoryName}_${productName}_${path}`
      } else {
        id = `gear5_${categoryName}_${productName}`
      }
    }
    setProductId(id)
    setDefaultFilter({
      ...defaultFilter,
      productId: id
    })
  }, [type, productName, path, categoryName])

  // get data detail products
  useEffect(() => {
    const getData = () => {
      get(`reviews/product/detail?productId=${productId}`).then(res => {
        // check show data
        const shows = {
          sourceCode: false,
          community: false,
          founders: false,
          explorer: false
        }
        const sourceCode = {}
        const community = {}
        if (res?.data?.details) {
          if (res?.data?.details?.socials) {
            const isSourceCode = []
            const isCommunity = []
            Object.keys(res?.data?.details?.socials).forEach((key) => {
              // source code
              if (key === 'github' || key === 'bitbucket') {
                sourceCode[key] = res?.data?.details?.socials[key]
                if (res?.data?.details?.socials[key]) {
                  isSourceCode.push(true)
                } else {
                  isSourceCode.push(false)
                }
              } else {
                // community
                community[key] = res?.data?.details?.socials[key]
                if (res?.data?.details?.socials[key]) {
                  isCommunity.push(true)
                } else {
                  isCommunity.push(false)
                }
              }
            })
            shows['sourceCode'] = !_.isEmpty(isSourceCode) && isSourceCode?.some((item) => item === true)
            shows['community'] = !_.isEmpty(isCommunity) && isCommunity?.some((item) => item === true)
          }
          if (res?.data?.details?.founders) {
            const isFounder = []
            Object.keys(res?.data?.details?.founders).forEach((key) => {
              if (res?.data?.details?.founders[key].length === 0) {
                isFounder.push(false)
              } else {
                isFounder.push(true)
              }
            })
            shows['founders'] = !_.isEmpty(isFounder) && isFounder?.some((item) => item === true)
          }
          if (res?.data?.details?.multichain) {
            const isExplorer = []
            res?.data?.details?.multichain?.forEach((item) => {
              if (_.isEmpty(item)) {
                isExplorer.push(false)
              } else {
                isExplorer.push(true)
              }
            })
            shows['explorer'] = !_.isEmpty(isExplorer) && isExplorer?.some((item) => item === true)
          }
        }
        setIsShow(shows)
        setProductInfo({
          ...res?.data,
          details: {
            ...res?.data?.details,
            sourceCode: sourceCode,
            community: community,
            // priceUSD: price?.data?.isCoingecko ? (price?.data?.price) : smallNumber(price?.data?.price / (Math.pow(10, res?.data?.details?.decimal))),
            exchanges: [
              (res?.data?.details?.isBinance !== null && res?.data?.details?.isBinance)
                ? [exchanges?.binance] : [],
              (res?.data?.details?.isCoinbase && res?.data?.details?.isCoinbase !== null)
                ? [exchanges?.coinbase] : [],
              (res?.data?.details?.isPancakeSwap && res?.data?.details?.isPancakeSwap !== null)
                ? [exchanges?.pancakeswap] : [],
              (res?.data?.details?.isUniSwap && res?.data?.details?.isUniSwap !== null)
                ? [exchanges?.uniswap] : []
            ]?.flat(1)
          }
        })
      })
    }
    productId && getData()
  }, [productId, categoryName])

  useEffect(() => {
    if (productId) {
      get(`reviews/reply?productId=${productId}`)
        .then(res => {
          const listAccount = [userInfo?.id]
          res?.data?.forEach((itemReply) => {
            listAccount.push(itemReply?.accountId)
          })
          const groupByCoinId = _.groupBy(res?.data, (item) => {
            if (item?.reviewId) {
              return item?.reviewId
            }
          })
          setDataReply({
            data: groupByCoinId,
            accountId: listAccount
          })
        })
      get(`reviews/reaction?productId=${productId}`)
        .then(res => {
          const listAccount = []
          res?.data?.forEach((itemReply) => {
            listAccount.push(itemReply?.accountId)
          })
          const groupByType = _.groupBy(res?.data, (item) => {
            return item?.type
          })
          setDataReaction({
            data: groupByType,
            accountId: listAccount
          })
        })
    }
  }, [productId])

  // get data review
  useEffect(() => {
    if (defaultFilter?.productId) {
      get(`reviews/review`, defaultFilter)
        .then(res => {
          const listAccount = []
          res?.data?.forEach((itemReview) => {
            listAccount.push(itemReview?.accountId)
          })
          setDataReview({
            data: res?.data !== null ? res?.data : [],
            accountId: listAccount
          })
        })
    }
  }, [defaultFilter])

  useEffect(() => {
    const listAccount = [
      dataReaction?.accountId,
      dataReply?.accountId,
      dataReview?.accountId
    ]
    const onlyUnique = (value, index, self) => {
      return (self.indexOf(value) === index && value !== '00000000-0000-0000-0000-000000000000' && value !== null)
    }
    const unique = listAccount?.flat(1)?.filter(onlyUnique)
    // get list account
    !_.isEmpty(unique) && post('reviews/auth/profiles', { 'accountIds': unique }).then(res => setListAccount(res?.data?.accounts))
  }, [dataReaction, dataReply, dataReview])

  useEffect(() => {
    if (typeComment === 'login') {
      if (!auth?.isAuthenticated) {
        signInContext?.handleSetOpenModal(true)
      }
    }
  }, [typeComment, signInContext, auth])

  // noti report success
  const notifyTopRight = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    })

    Toast.fire({
      icon: 'success',
      title: 'Post comemnt successfully!'
    })
  }

  const handleAddComment = async(params, type) => {
    let dataAdd
    if (type === 'anonymous') {
      dataAdd = await post('reviews/review/anonymous', params)
    } else {
      dataAdd = await post('reviews/review', params)
    }
    if (dataAdd) {
      notifyTopRight()
      const newReview = {
        ...dataAdd?.data,
        accountType: type === 'auth' ? userInfo?.accountType : '',
        email: type === 'auth' ? userInfo?.email : '',
        acountImage: type === 'auth' ? userInfo?.image : user,
        role: type === 'auth' ? userInfo?.role : -1,
        userName: type === 'auth' ? userInfo?.userName : 'anonymous'
      }
      if (productInfo?.reviews === null) {
        setDataReview({
          ...dataReview,
          data: [newReview]
        })
      } else {
        const newDataReview = [newReview, ...dataReview.data]
        setDataReview({
          ...dataReview,
          data: newDataReview
        })
      }
      setData({
        isScam: false,
        content: '',
        sources: [],
        image: '',
        star: 5
      })
      setFileList([])
      setValidateText(false)
      setTypeComment()
      recapcharRef.current.reset()
      form.resetFields()
      form.setFieldsValue({ 'isScam': false })
    }
  }

  // submit btn
  const handleSubmitComment = async(values) => {
    const params = {
      ...data,
      productId: productId,
      ...values
    }
    if (typeComment) {
      const recaptchaValue = recapcharRef.current.getValue()
      if (recaptchaValue) {
        handleAddComment(params, 'anonymous')
      } else {
        setIsRecaptcha(true)
      }
    } else {
      if (auth?.isAuthenticated) {
        const recaptchaValue = recapcharRef.current.getValue()
        if (recaptchaValue) {
          handleAddComment(params, 'auth')
        } else {
          setIsRecaptcha(true)
        }
      } else {
        signInContext?.handleSetOpenModal(true)
      }
    }
  }

  // enter
  const handleComment = async(e) => {
    // if (e.ctrlKey && e.key === 'Enter') {
    //   setData({
    //     ...data,
    //     content: `${data?.content}\n`
    //   })
    // } else {
    //   e.preventDefault()
    //   const params = {
    //     ...data,
    //     productId: productId
    //   }
    //   if (data?.content !== '') {
    //     const recaptchaValue = recapcharRef.current.getValue()
    //     if (recaptchaValue) {
    //       if (data?.isScam) {
    //         if (!_.isEmpty(data?.sources)) {
    //           if (typeComment) {
    //             handleAddComment(params, 'anonymous')
    //           } else {
    //             if (auth?.isAuthenticated) {
    //               handleAddComment(params, 'auth')
    //             } else {
    //               signInContext?.handleSetOpenModal(true)
    //             }
    //           }
    //         } else {
    //           setErrorLink('Link proof is required')
    //         }
    //       } else {
    //         if (typeComment) {
    //           handleAddComment(params, 'anonymous')
    //         } else {
    //           if (auth?.isAuthenticated) {
    //             handleAddComment(params, 'auth')
    //           } else {
    //             signInContext?.handleSetOpenModal(true)
    //           }
    //         }
    //       }
    //     } else {
    //       setIsRecaptcha(true)
    //     }
    //   } else {
    //     setValidateText(true)
    //   }
    //   // if (typeComment) {
    //   //   if (data?.content !== '') {
    //   //     const recaptchaValue = recapcharRef.current.getValue()
    //   //     if (recaptchaValue) {
    //   //       if (data?.isScam) {
    //   //         if (!_.isEmpty(data?.sources)) {
    //   //           handleAddComment(params, 'anonymous')
    //   //         } else {
    //   //           setErrorLink('Link proof is required')
    //   //         }
    //   //       } else {
    //   //         handleAddComment(params, 'anonymous')
    //   //       }
    //   //     } else {
    //   //       setIsRecaptcha(true)
    //   //     }
    //   //   } else {
    //   //     setValidateText(true)
    //   //   }
    //   // } else {
    //   //   if (auth?.isAuthenticated) {
    //   //     console.log(222222)
    //   //     if (data?.content !== '') {
    //   //       const recaptchaValue = recapcharRef.current.getValue()
    //   //       if (recaptchaValue) {
    //   //         if (data?.isScam) {
    //   //           if (!_.isEmpty(data?.sources)) {
    //   //             handleAddComment(params, 'auth')
    //   //           } else {
    //   //             setErrorLink('Link proof is required')
    //   //           }
    //   //         } else {
    //   //           handleAddComment(params, 'auth')
    //   //         }
    //   //       } else {
    //   //         setIsRecaptcha(true)
    //   //       }
    //   //     } else {
    //   //       setValidateText(true)
    //   //     }
    //   //   } else {
    //   //     signInContext?.handleSetOpenModal(true)
    //   //   }
    //   // }
    // }
  }

  useEffect(() => {
    ref.current.scrollTo(0, 0)
  }, [pathname])

  const crypto = <CryptoInfo
    // use in crypto info
    isShow={isShow}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateText={setValidateText}
    validateText={validateText}
    handleComment={handleComment}
    recapcharRef={recapcharRef}
    setFileList={setFileList}
    fileList={fileList}
    showUser={true}
    isRecaptcha={isRecaptcha}
    setIsRecaptcha={setIsRecaptcha}
    setErrorLink={setErrorLink}
    errorLink={errorLink}
    setTypeComment={setTypeComment}
    typeComment={typeComment}
    setErrorType={setErrorType}
    errorType={errorType}
    id={productInfo?.details?.id}
    form={form}

    totalReview={productInfo?.details?.totalReviews}
    dataReview={dataReview}
    dataReply={dataReply?.data}
    dataReaction={dataReaction?.data}
    listAccount={listAccount}

    // use in list review
    // dataFilter={dataFilter}
    productId={productId}
  />

  const soon = <SoonInfo
  // use in crypto info
    isShow={isShow}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateText={setValidateText}
    validateText={validateText}
    handleComment={handleComment}
    recapcharRef={recapcharRef}
    setFileList={setFileList}
    fileList={fileList}
    showUser={true}
    isRecaptcha={isRecaptcha}
    setIsRecaptcha={setIsRecaptcha}
    setErrorLink={setErrorLink}
    errorLink={errorLink}
    setTypeComment={setTypeComment}
    typeComment={typeComment}
    setErrorType={setErrorType}
    errorType={errorType}
    id={productInfo?.details?.id}
    form={form}

    totalReview={productInfo?.details?.totalReviews}
    dataReview={dataReview}
    dataReply={dataReply?.data}
    dataReaction={dataReaction?.data}
    listAccount={listAccount}

    // use in list review
    // dataFilter={dataFilter}
    productId={productId}
  />

  const dapp = <DappInfo
  // use in crypto info
    isShow={isShow}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateText={setValidateText}
    validateText={validateText}
    handleComment={handleComment}
    recapcharRef={recapcharRef}
    setFileList={setFileList}
    fileList={fileList}
    showUser={true}
    isRecaptcha={isRecaptcha}
    setIsRecaptcha={setIsRecaptcha}
    setErrorLink={setErrorLink}
    errorLink={errorLink}
    setTypeComment={setTypeComment}
    typeComment={typeComment}
    setErrorType={setErrorType}
    errorType={errorType}
    id={productInfo?.details?.id}
    form={form}

    totalReview={productInfo?.details?.totalReviews}
    dataReview={dataReview}
    dataReply={dataReply?.data}
    dataReaction={dataReaction?.data}
    listAccount={listAccount}

    // use in list review
    // dataFilter={dataFilter}
    productId={productId}
  />

  const exchange = <ExchangeInfo
  // use in crypto info
    isShow={isShow}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateText={setValidateText}
    validateText={validateText}
    handleComment={handleComment}
    recapcharRef={recapcharRef}
    setFileList={setFileList}
    fileList={fileList}
    showUser={true}
    isRecaptcha={isRecaptcha}
    setIsRecaptcha={setIsRecaptcha}
    setErrorLink={setErrorLink}
    errorLink={errorLink}
    setTypeComment={setTypeComment}
    typeComment={typeComment}
    setErrorType={setErrorType}
    errorType={errorType}
    id={productInfo?.details?.id}
    form={form}

    totalReview={productInfo?.details?.totalReviews}
    dataReview={dataReview}
    dataReply={dataReply?.data}
    dataReaction={dataReaction?.data}
    listAccount={listAccount}

    // use in list review
    // dataFilter={dataFilter}
    productId={productId}
  />

  const venture = <VentureInfo
  // use in crypto info
    isShow={isShow}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateText={setValidateText}
    validateText={validateText}
    handleComment={handleComment}
    recapcharRef={recapcharRef}
    setFileList={setFileList}
    fileList={fileList}
    showUser={true}
    isRecaptcha={isRecaptcha}
    setIsRecaptcha={setIsRecaptcha}
    setErrorLink={setErrorLink}
    errorLink={errorLink}
    setTypeComment={setTypeComment}
    typeComment={typeComment}
    setErrorType={setErrorType}
    errorType={errorType}
    id={productInfo?.details?.id}
    form={form}

    totalReview={productInfo?.details?.totalReviews}
    dataReview={dataReview}
    dataReply={dataReply?.data}
    dataReaction={dataReaction?.data}
    listAccount={listAccount}

    // use in list review
    // dataFilter={dataFilter}
    productId={productId}
  />

  return (
    <div className='section'>
      {!productInfo ? <DetailLoading /> : ''}
      <div className='product' ref={ref} hidden={!productInfo}>
        {categoryName === DAPP ? (
          <>{dapp}</>
        ) : categoryName === CRYPTO ? (
          <>{crypto}</>
        ) : categoryName === EXCHANGE ? (
          <>{exchange}</>
        ) : categoryName === SOON ? (
          <>{soon}</>
        ) : categoryName === VENTURE ? (
          <>{venture}</>
        ) : type === 'coin' || type === 'token' ? (
          <>{crypto}</>
        ) : ''}

      </div>
    </div>
  )
}

export default ProductDetail
