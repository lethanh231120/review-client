import React, { useEffect, useState, useRef, useContext } from 'react'
// import React, { useEffect, useState, useRef, useContext } from 'react'
import { message } from 'antd'
// import { DownOutlined, CodeOutlined, CaretUpOutlined, SendOutlined, CopyOutlined, LinkOutlined } from '@ant-design/icons'
// import moment from 'moment'
import './productDetail.scss'
import { get, post } from '../../../api/BaseRequest'
// import ReviewItem from './review/review-item/ReviewItem'
import { useLocation, useParams } from 'react-router-dom'
import _ from 'lodash'
// import { getCookie, STORAGEKEY } from '../../../utils/storage'
// import FilterReview from './filter-review/FilterReview'
// import ListReview from '../../components/detail-product/list-review/ListReview'
// import { SignInContext } from '../../components/layout/Main'
// import { SignInContext, Authenticated } from '../../index'
import { SignInContext, Authenticated } from '../../../App'
import CryptoInfo from './crypto-info/CryptoInfo'
import ExchangeInfo from './exchange-info/ExchangeInfo'
import DappInfo from './dapp-info/DappInfo'
import SoonInfo from './soon-info/SoonInfo'
import VentureInfo from './venture-info/VentureInfo'
// import Scam from '../../components/detail-product/scam/Scam'
import { exchanges } from '../../../utils/ExchangeImage'
import {
  DAPP,
  SOON,
  VENTURE,
  EXCHANGE,
  CRYPTO
} from '../../constants/category'
// import FormReport from '../Forms/form-report/FormReport'
// import FormReport from '../../components/detail-product/form-report/FormReport'
// import user from '../../../images/product/user.png'
// import { Authenticated } from '../../components/layout/Main'
import DetailLoading from '../loading/DetailLoading'
import { getCookie, STORAGEKEY } from '../../../utils/storage'
// import DetailLoading from '../../components/layout/detail-loading/DetailLoading'
import user from '../../../images/product/user.png'

const ProductDetail = () => {
  const { pathname } = useLocation()
  const DEFAULT_ALL = 'all'
  const DEFAULT_SCAM = 'scam'
  const DEFAULT_NOT_SCAM = 'notScam'
  const [productId, setProductId] = useState()

  const { type, productName, path, categoryName } = useParams()
  // type coin thi khong co product Id, token thi co productId

  const ref = useRef(null)
  const recapcharRef = useRef(null)
  const signInContext = useContext(SignInContext)
  const auth = useContext(Authenticated)

  const [productInfo, setProductInfo] = useState()
  const [defaultFilter, setDefaultFilter] = useState(DEFAULT_ALL)
  const [data, setData] = useState({
    isScam: false,
    content: '',
    sources: [],
    image: '',
    star: 5
  })
  const [validateTextArea, setValidateTextArea] = useState(false)
  const [fileList, setFileList] = useState([])
  const [dataFilter, setDataFilter] = useState()
  const [isShow, setIsShow] = useState()
  const [errorLink, setErrorLink] = useState()
  const [isRecaptcha, setIsRecaptcha] = useState(false)
  const [typeComment, setTypeComment] = useState(false)
  const [errorType, setErrorType] = useState()

  const userInfo = getCookie(STORAGEKEY.USER_INFO)
  // const token = Boolean(getCookie(STORAGEKEY.ACCESS_TOKEN))

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
  }, [type, productName, path, categoryName])

  useEffect(() => {
    const getData = async() => {
      const product = await get(`reviews/product/detail?productId=${productId}`)
      // check show data
      const shows = {
        sourceCode: false,
        community: false,
        founders: false,
        explorer: false
      }
      const sourceCode = {}
      const community = {}
      if (product?.data?.details) {
        if (product?.data?.details?.socials) {
          const isSourceCode = []
          const isCommunity = []
          Object.keys(product?.data?.details?.socials).forEach((key) => {
            // source code
            if (key === 'github' || key === 'bitbucket') {
              sourceCode[key] = product?.data?.details?.socials[key]
              if (product?.data?.details?.socials[key]) {
                isSourceCode.push(true)
              } else {
                isSourceCode.push(false)
              }
            } else {
              // community
              community[key] = product?.data?.details?.socials[key]
              if (product?.data?.details?.socials[key]) {
                isCommunity.push(true)
              } else {
                isCommunity.push(false)
              }
            }
          })
          shows['sourceCode'] = !_.isEmpty(isSourceCode) && isSourceCode?.some((item) => item === true)
          shows['community'] = !_.isEmpty(isCommunity) && isCommunity?.some((item) => item === true)
        }
        if (product?.data?.details?.founders) {
          const isFounder = []
          Object.keys(product?.data?.details?.founders).forEach((key) => {
            if (product?.data?.details?.founders[key].length === 0) {
              isFounder.push(false)
            } else {
              isFounder.push(true)
            }
          })
          shows['founders'] = !_.isEmpty(isFounder) && isFounder?.some((item) => item === true)
        }
        if (product?.data?.details?.multichain) {
          const isExplorer = []
          product?.data?.details?.multichain?.forEach((item) => {
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
      const accountId = []
      if (product?.data?.reviews !== null) {
        let newReviews = []
        product?.data?.reviews?.forEach((itemReview) => {
          accountId.push(itemReview?.review?.accountId)
          itemReview?.reactions?.forEach((itemReaction) => {
            accountId.push(itemReaction?.accountId)
          })
          itemReview?.replies?.forEach((itemReplies) => {
            accountId.push(itemReplies?.reply?.accountId)
            itemReplies?.reactions?.forEach((itemReactionInReplies) => {
              accountId.push(itemReactionInReplies?.accountId)
            })
          })
        })
        if (!_.isEmpty(accountId)) {
          const onlyUnique = (value, index, self) => {
            return (self.indexOf(value) === index && value !== '')
          }
          const unique = accountId?.filter(onlyUnique)
          // get list account
          const listUser = await post('reviews/auth/profiles', { 'accountIds': unique })
          if (!_.isEmpty(listUser?.data?.accounts)) {
            product?.data?.reviews?.forEach((itemReview) => {
              const account = listUser?.data?.accounts?.find(item => item?.id === itemReview?.review?.accountId)
              const newReview = {
                ...itemReview?.review,
                accountType: account?.ccountType,
                email: account?.email,
                acountImage: account?.image,
                role: account?.role,
                userName: account?.userName
              }
              // reactions
              const newReactions = []
              itemReview?.reactions?.forEach((itemReaction) => {
                const accountReaction = listUser?.data?.accounts?.find(item => item?.id === itemReaction?.accountId)
                newReactions.push({
                  ...itemReaction,
                  accountType: accountReaction?.accountType,
                  email: accountReaction?.email,
                  acountImage: accountReaction?.image,
                  userName: accountReaction?.userName,
                  role: accountReaction?.role
                })
              })
              // replies
              const replies = []
              itemReview?.replies?.forEach((itemReplies) => {
                const accountReply = listUser?.data?.accounts?.find(item => item?.id === itemReplies?.reply?.accountId)
                const newReply = {
                  ...itemReplies.reply,
                  accountType: accountReply?.accountType,
                  email: accountReply?.email,
                  acountImage: accountReply?.image,
                  userName: accountReply?.userName,
                  role: accountReply?.role
                }
                const newListReactionInReplies = []
                itemReplies?.reactions?.forEach((itemReactionInReplies) => {
                  const newReactionInReplies = listUser?.data?.accounts?.find(item => item?.id === itemReactionInReplies?.accountId)
                  newListReactionInReplies.push({
                    ...itemReactionInReplies,
                    accountType: newReactionInReplies?.accountType,
                    email: newReactionInReplies?.email,
                    acountImage: newReactionInReplies?.image,
                    userName: newReactionInReplies?.userName,
                    role: newReactionInReplies?.role
                  })
                })
                replies.push({
                  reply: newReply,
                  reactions: newListReactionInReplies
                })
              })
              newReviews.push({
                reactions: newReactions,
                review: newReview,
                replies: replies
              })
            })
          } else {
            const data = product?.data?.reviews
            newReviews = [...data]
          }
        }
        setProductInfo({
          ...product?.data,
          details: {
            ...product?.data?.details,
            sourceCode: sourceCode,
            community: community,
            // priceUSD: price?.data?.isCoingecko ? (price?.data?.price) : smallNumber(price?.data?.price / (Math.pow(10, product?.data?.details?.decimal))),
            exchanges: [
              (product?.data?.details?.isBinance !== null && product?.data?.details?.isBinance)
                ? [exchanges?.binance] : [],
              (product?.data?.details?.isCoinbase && product?.data?.details?.isCoinbase !== null)
                ? [exchanges?.coinbase] : [],
              (product?.data?.details?.isPancakeSwap && product?.data?.details?.isPancakeSwap !== null)
                ? [exchanges?.pancakeswap] : [],
              (product?.data?.details?.isUniSwap && product?.data?.details?.isUniSwap !== null)
                ? [exchanges?.uniswap] : []
            ]?.flat(1)
          },
          reviews: newReviews
        })
      } else {
        setProductInfo({
          ...product?.data,
          details: {
            ...product?.data?.details,
            sourceCode: sourceCode,
            community: community,
            // priceUSD: price?.data?.isCoingecko ? (price?.data?.price) : smallNumber(price?.data?.price / (Math.pow(10, product?.data?.details?.decimal))),
            exchanges: [
              (product?.data?.details?.isBinance !== null && product?.data?.details?.isBinance)
                ? [exchanges?.binance] : [],
              (product?.data?.details?.isCoinbase && product?.data?.details?.isCoinbase !== null)
                ? [exchanges?.coinbase] : [],
              (product?.data?.details?.isPancakeSwap && product?.data?.details?.isPancakeSwap !== null)
                ? [exchanges?.pancakeswap] : [],
              (product?.data?.details?.isUniSwap && product?.data?.details?.isUniSwap !== null)
                ? [exchanges?.uniswap] : []
            ]?.flat(1)
          }
        })
      }
    }
    productId && getData()
  }, [productId, categoryName])

  const copyAddress = (e, address) => {
    e.stopPropagation()
    navigator.clipboard.writeText(address)
    message.success({
      content: 'Copy address successfully',
      duration: 3
    })
  }

  useEffect(() => {
    if (defaultFilter === DEFAULT_ALL) {
      setDataFilter(productInfo)
    }
    if (defaultFilter === DEFAULT_NOT_SCAM) {
      const listReview = productInfo?.reviews?.filter((item) => item?.review?.isScam === false)
      setDataFilter({
        ...productInfo,
        reviews: listReview
      })
    }
    if (defaultFilter === DEFAULT_SCAM) {
      const listReview = productInfo?.reviews?.filter((item) => item?.review?.isScam === true)
      setDataFilter({
        ...productInfo,
        reviews: listReview
      })
    }
  }, [defaultFilter, productInfo])

  useEffect(() => {
    if (typeComment === 'login') {
      if (!auth?.isAuthenticated) {
        console.log('log in')
        signInContext?.handleSetOpenModal(true)
      }
    }
  }, [typeComment, signInContext, auth])

  const handleAddComment = async(params, type) => {
    let dataAdd
    if (type === 'anonymous') {
      dataAdd = await post('reviews/review/anonymous', params)
    } else {
      dataAdd = await post('reviews/review', params)
    }
    if (dataAdd) {
      const newReview = {
        reactions: [],
        replies: [],
        review: {
          ...dataAdd?.data,
          accountType: type === 'auth' ? userInfo?.accountType : '',
          email: type === 'auth' ? userInfo?.email : '',
          acountImage: type === 'auth' ? userInfo?.image : user,
          role: type === 'auth' ? userInfo?.role : -1,
          userName: type === 'auth' ? userInfo?.userName : 'anonymous'
        }
      }
      if (productInfo?.reviews === null) {
        setProductInfo({
          ...productInfo,
          reviews: [newReview]
        })
      } else {
        const data = productInfo?.reviews
        setProductInfo({
          ...productInfo,
          reviews: [
            newReview,
            ...data
          ]
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
      setValidateTextArea(false)
      setTypeComment()
      recapcharRef.current.reset()
    }
  }

  // submit btn
  const handleSubmitComment = async() => {
    const params = {
      ...data,
      productId: productId
    }
    if (typeComment) {
      if (data?.content !== '') {
        const recaptchaValue = recapcharRef.current.getValue()
        if (recaptchaValue) {
          if (data?.isScam) {
            if (!_.isEmpty(data?.sources)) {
              handleAddComment(params, 'anonymous')
            } else {
              setErrorLink('Link proof is required')
            }
          } else {
            handleAddComment(params, 'anonymous')
          }
        } else {
          setIsRecaptcha(true)
        }
      } else {
        setValidateTextArea(true)
      }
    } else {
      if (auth?.isAuthenticated) {
        if (data?.content !== '') {
          const recaptchaValue = recapcharRef.current.getValue()
          if (recaptchaValue) {
            if (data?.isScam) {
              if (!_.isEmpty(data?.sources)) {
                handleAddComment(params, 'auth')
              } else {
                setErrorLink('Link proof is required')
              }
            } else {
              handleAddComment(params, 'auth')
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

  // enter
  const handleComment = async(e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      setData({
        ...data,
        content: `${data?.content}\n`
      })
    } else {
      e.preventDefault()
      const params = {
        ...data,
        productId: productId
      }
      if (data?.content !== '') {
        const recaptchaValue = recapcharRef.current.getValue()
        if (recaptchaValue) {
          if (data?.isScam) {
            if (!_.isEmpty(data?.sources)) {
              if (typeComment) {
                handleAddComment(params, 'anonymous')
              } else {
                if (auth?.isAuthenticated) {
                  handleAddComment(params, 'auth')
                } else {
                  signInContext?.handleSetOpenModal(true)
                }
              }
            } else {
              setErrorLink('Link proof is required')
            }
          } else {
            if (typeComment) {
              handleAddComment(params, 'anonymous')
            } else {
              if (auth?.isAuthenticated) {
                handleAddComment(params, 'auth')
              } else {
                signInContext?.handleSetOpenModal(true)
              }
            }
          }
        } else {
          setIsRecaptcha(true)
        }
      } else {
        setValidateTextArea(true)
      }
      // if (typeComment) {
      //   if (data?.content !== '') {
      //     const recaptchaValue = recapcharRef.current.getValue()
      //     if (recaptchaValue) {
      //       if (data?.isScam) {
      //         if (!_.isEmpty(data?.sources)) {
      //           handleAddComment(params, 'anonymous')
      //         } else {
      //           setErrorLink('Link proof is required')
      //         }
      //       } else {
      //         handleAddComment(params, 'anonymous')
      //       }
      //     } else {
      //       setIsRecaptcha(true)
      //     }
      //   } else {
      //     setValidateTextArea(true)
      //   }
      // } else {
      //   if (auth?.isAuthenticated) {
      //     console.log(222222)
      //     if (data?.content !== '') {
      //       const recaptchaValue = recapcharRef.current.getValue()
      //       if (recaptchaValue) {
      //         if (data?.isScam) {
      //           if (!_.isEmpty(data?.sources)) {
      //             handleAddComment(params, 'auth')
      //           } else {
      //             setErrorLink('Link proof is required')
      //           }
      //         } else {
      //           handleAddComment(params, 'auth')
      //         }
      //       } else {
      //         setIsRecaptcha(true)
      //       }
      //     } else {
      //       setValidateTextArea(true)
      //     }
      //   } else {
      //     signInContext?.handleSetOpenModal(true)
      //   }
      // }
    }
  }

  useEffect(() => {
    ref.current.scrollTo(0, 0)
  }, [pathname])

  const crypto = <CryptoInfo
    // use in crypto info
    isShow={isShow}
    copyAddress={copyAddress}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateTextArea={setValidateTextArea}
    validateTextArea={validateTextArea}
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

    // use in list review
    dataFilter={dataFilter}
    productId={productId}
  />

  const soon = <SoonInfo
  // use in crypto info
    isShow={isShow}
    copyAddress={copyAddress}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateTextArea={setValidateTextArea}
    validateTextArea={validateTextArea}
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

    // use in list review
    dataFilter={dataFilter}
    productId={productId}
  />

  const dapp = <DappInfo
  // use in crypto info
    isShow={isShow}
    copyAddress={copyAddress}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateTextArea={setValidateTextArea}
    validateTextArea={validateTextArea}
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

    // use in list review
    dataFilter={dataFilter}
    productId={productId}
  />

  const exchange = <ExchangeInfo
  // use in crypto info
    isShow={isShow}
    copyAddress={copyAddress}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateTextArea={setValidateTextArea}
    validateTextArea={validateTextArea}
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

    // use in list review
    dataFilter={dataFilter}
    productId={productId}
  />

  const venture = <VentureInfo
  // use in crypto info
    isShow={isShow}
    copyAddress={copyAddress}

    // use in filter review component
    productInfo={productInfo}
    defaultFilter={defaultFilter}
    setDefaultFilter={setDefaultFilter}

    // use in form report component
    data={data}
    setData={setData}
    handleSubmitComment={handleSubmitComment}
    setValidateTextArea={setValidateTextArea}
    validateTextArea={validateTextArea}
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

    // use in list review
    dataFilter={dataFilter}
    productId={productId}
  />

  return (
    <div className='section'>
      {!productInfo ? <DetailLoading /> : ''}
      <div className='product' ref={ref} hidden={!productInfo}>
        {/* <div className='product detail' ref={ref} hidden={!productInfo}> */}
        {categoryName === DAPP ? (
          <React.Fragment>{dapp}</React.Fragment>
        ) : categoryName === CRYPTO ? (
          <React.Fragment>{crypto}</React.Fragment>
        ) : categoryName === EXCHANGE ? (
          <React.Fragment>{exchange}</React.Fragment>
        ) : categoryName === SOON ? (
          <React.Fragment>{soon}</React.Fragment>
        ) : categoryName === VENTURE ? (
          <React.Fragment>{venture}</React.Fragment>
        ) : type === 'coin' || type === 'token' ? (
          <React.Fragment>{crypto}</React.Fragment>
        ) : ''}

      </div>
    </div>
  )
}

export default ProductDetail
