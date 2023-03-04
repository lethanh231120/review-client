import React, { useEffect, useState, useRef, useContext } from 'react'
import { Form } from 'antd'
// import moment from 'moment'
import './productDetail.scss'
import { get, post } from '../../../api/BaseRequest'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { SignInContext, Authenticated } from '../../../App'
import CryptoInfo from './crypto-info/CryptoInfo'
import ExchangeInfo from './exchange-info/ExchangeInfo'
import DappInfo from './dapp-info/DappInfo'
import SoonInfo, { getStatusFromStartDateAndEndDate } from './soon-info/SoonInfo'
import VentureInfo, { calculateTotalFund } from './venture-info/VentureInfo'
import { exchanges } from '../../../utils/ExchangeImage'
import {
  DAPP,
  SOON,
  VENTURE,
  EXCHANGE,
  CRYPTO,
  LAUNCHPAD,
  CRYPTO_COIN,
  CRYPTO_TOKEN
} from '../../constants/category'
import { getCookie, STORAGEKEY } from '../../../utils/storage'
import user from '../../../images/product/user.png'
import Swal from 'sweetalert2'
import LaunchpadDetail from './launchpad-info/LaunchpadDetail'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'
import imgAbsentImageCrypto from '../../../images/absent_image_crypto.png'
import { Helmet } from 'react-helmet-async'
import { encodeSpecialCharacterUrl, formatImgUrlFromProductId, isValidProductId } from '../../../utils/formatText'
import { formatLargeNumber, formatLargeNumberMoneyUSD } from '../../../utils/formatNumber'
import { SEO } from './../SEO/SEO'
import { PathNameContext } from '../../index'
// import SEO from '../SEO/SEO'
// import { formatImgUrlFromProductId, isValidProductId } from '../../../utils/formatText'
// import imgAbsentImageCrypto from '../../../images/absent_image_crypto.png'
// import { formatLargeNumber, formatLargeNumberMoneyUSD } from '../../../utils/formatNumber'

const ProductDetail = () => {
  const TYPE_REVIEW = 0
  const TYPE_REPLY = 1
  const { pathname } = useLocation()
  const [form] = Form.useForm()
  const { type, productName, path, categoryName } = useParams()
  // type coin thi khong co product Id, token thi co productId
  const navigate = useNavigate()

  const ref = useRef(null)
  const recapcharRef = useRef(null)
  const signInContext = useContext(SignInContext)
  const pathNameHeader = useContext(PathNameContext)
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
    images: [],
    star: 5,
    scamAmountUSD: null
  })
  const [fileList, setFileList] = useState([])
  const [isShow, setIsShow] = useState()
  const [errorLink, setErrorLink] = useState()
  const [isRecaptcha, setIsRecaptcha] = useState(false)
  const [typeComment, setTypeComment] = useState(false)
  const [errorType, setErrorType] = useState()
  const [dataReview, setDataReview] = useState([])
  const [listReview, setListReview] = useState()
  const [curentReview, setCurrentReview] = useState({ isCollapse: true })
  const [reviews, setReviews] = useState()
  const [listReply, setListReply] = useState()
  const [dataReaction, setDataReaction] = useState({})
  const userInfo = getCookie(STORAGEKEY.USER_INFO)
  const [offsetTopByListComment, setOffsetTopByListComment] = useState()
  const [loadingFilter, setLoadingFilter] = useState(false)
  const [totalSortBy, setTotalSortBy] = useState()

  console.log('totalSortBy', totalSortBy)
  // set productId
  useEffect(() => {
    setReviews()
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

  useEffect(() => {
    if (defaultFilter?.orderBy === 'createdDate') {
      if (defaultFilter?.isScam !== undefined) {
        if (defaultFilter?.isScam === true) {
          setTotalSortBy(productInfo?.details?.totalIsScam)
        } else {
          setTotalSortBy(productInfo?.details?.totalNotScam)
        }
      } else {
        console.log(productInfo?.details?.totalReviews)
        setTotalSortBy(productInfo?.details?.totalReviews)
      }
    }
    if (defaultFilter?.orderBy === 'totalReply') {
      setTotalSortBy(productInfo?.details?.totalReviews)
    }
  }, [defaultFilter])

  // get data review by params filter
  useEffect(() => {
    if (defaultFilter?.productId) {
      const getReview = async() => {
        const listReviews = await get(`reviews/review`, defaultFilter)
        setDataReview(listReviews?.data !== null ? listReviews?.data : [])
        if (loadingFilter === true) {
          setLoadingFilter(false)
          window.scrollTo(0, offsetTopByListComment)
        }
      }
      getReview()
    }
  }, [defaultFilter])

  // get data detail products
  useEffect(() => {
    const getData = () => {
      get(`reviews/product/detail?productId=${encodeSpecialCharacterUrl(productId)}`).then(res => {
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
            // check null community, sourceCode
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
          // check null multichain
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
        setTotalSortBy(res?.data?.details?.totalReviews)
      }).catch((error) => {
        if (error?.response?.data?.error === 'product not exist') {
          navigate('/not-found-product')
        } else if (error?.response?.data?.error === 'Something went wrong with server') {
          navigate('/server-error')
        }
      })
    }
    productId && getData()
  }, [productId, categoryName])

  useEffect(() => {
    // get data reply, reaction
    const getDataReply = async() => {
      const dataReply = await get(`reviews/reply?productId=${productId}`)
      const dataReactions = await get(`reviews/reaction?productId=${productId}`)
      let groupByType
      if (dataReactions) {
        // group data Reaction by type: 0: review, 1: reply
        groupByType = _.groupBy(dataReactions?.data, (item) => {
          return item?.type
        })
      }

      setDataReaction(groupByType)
      const replies = []
      if (dataReply) {
        // format reply
        // get list reaction by replyId
        dataReply?.data?.forEach((itemReply) => {
          const reactions = groupByType[`${TYPE_REPLY}`]?.filter((itemReaction) => itemReaction?.commentId === itemReply?.id)
          replies.push({
            reply: itemReply,
            reactions: reactions || []
          })
        })
      }
      setListReply(replies)
    }
    productId && getDataReply()
  }, [productId])

  useEffect(() => {
    const reviews = []
    if (listReply) {
      // format data reviews
      dataReview?.forEach((itemReview) => {
        // get list reply by reviewId
        const listReplyByReview = listReply?.filter((itemReply) => itemReply?.reply?.reviewId === itemReview?.id)
        // get list reaction by reviewId
        const listReactionByReview = dataReaction[`${TYPE_REVIEW}`]?.filter((itemReaction) => itemReaction?.commentId === itemReview?.id)
        reviews.push({
          review: itemReview,
          replies: listReplyByReview,
          reactions: listReactionByReview || []
        })
      })
      setListReview(reviews)
    }
  }, [listReply, dataReview])

  useEffect(() => {
    const getDataReview = async() => {
      if (!_.isEmpty(listReview)) {
        const accountId = []
        // get list accountId of reply, review, reaction
        listReview?.forEach((itemReview) => {
          if (itemReview?.review?.accountId && itemReview?.review?.accountId !== '00000000-0000-0000-0000-000000000000') {
            accountId.push(itemReview?.review?.accountId)
          }
          itemReview?.reactions?.forEach((itemReaction) => {
            if (itemReaction?.accountId && itemReaction?.accountId !== '00000000-0000-0000-0000-000000000000') {
              accountId.push(itemReaction?.accountId)
            }
          })
          itemReview?.replies?.forEach((itemReplies) => {
            if (itemReplies?.reply?.accountId && itemReplies?.reply?.accountId !== '00000000-0000-0000-0000-000000000000') {
              accountId.push(itemReplies?.reply?.accountId)
            }
            itemReplies?.reactions?.forEach((itemReactionInReplies) => {
              if (itemReactionInReplies?.accountId && itemReactionInReplies?.accountId !== '00000000-0000-0000-0000-000000000000') {
                accountId.push(itemReactionInReplies?.accountId)
              }
            })
          })
        })
        // if review has anonymous and auth
        if (!_.isEmpty(accountId)) {
          let newReviews = []
          // format unique list accountId
          const onlyUnique = (value, index, self) => {
            if (value) { return (self.indexOf(value) === index && value !== '00000000-0000-0000-0000-000000000000' && value !== null) }
          }
          const unique = accountId?.filter(onlyUnique)
          // get list account
          const listUser = await post('reviews/auth/profiles', { 'accountIds': unique })
          if (!_.isEmpty(listUser?.data?.accounts)) {
            listReview?.forEach((itemReview) => {
              const account = listUser?.data?.accounts?.find(item => item?.id === itemReview?.review?.accountId)
              // reviews
              const newReview = {
                ...itemReview?.review,
                accountType: account?.ccountType,
                email: account?.email,
                acountImage: account?.image,
                role: account?.role,
                userName: account?.userName
              }
              // reactions of review
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
                // reaction of reply
                const newListReactionInReplies = []
                itemReplies?.reaction?.forEach((itemReactionInReplies) => {
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
            newReviews = [...listReview]
          }
          !_.isEmpty(newReviews) && setReviews(newReviews)
        } else {
          // if review has anonymous
          setReviews(listReview)
        }
      } else {
        setReviews([])
      }
    }
    getDataReview()
  }, [listReview])

  useEffect(() => {
    if (typeComment === 'login') {
      if (!auth?.isAuthenticated) {
        signInContext?.handleSetOpenModal(true)
      }
    }
  }, [typeComment, signInContext, auth])

  useEffect(() => {
    if (productInfo?.details) {
      pathNameHeader?.handleChangePathName(`${productInfo?.details?.name || productInfo?.details?.dAppName || productInfo?.details?.ventureName || productInfo?.details?.projectName || ''}`)
    }
  }, [productInfo])

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
      title: 'Send Review successfully!'
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
      if (dataAdd?.code === 'B.REVIEW.0') {
        const newReview = {
          ...dataAdd?.data,
          accountType: type === 'auth' ? userInfo?.accountType : '',
          email: type === 'auth' ? userInfo?.email : '',
          acountImage: type === 'auth' ? userInfo?.image : user,
          role: type === 'auth' ? userInfo?.role : -1,
          userName: type === 'auth' ? userInfo?.userName : 'Anonymous'
        }
        // check if reviews === []
        if (_.isEmpty(reviews)) {
          setReviews([
            {
              review: newReview,
              reactions: [],
              replies: []
            }
          ])
        } else {
          setReviews([
            {
              review: newReview,
              reactions: [],
              replies: []
            },
            ...reviews
          ])
        }
        notifyTopRight()
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'We will hide reviews with Shill, Ads, Porn.... content !',
          text: `With your review, we will review it directly by the admin team. Enjoy Gear5.io, Thank You !`
        })
      }
      // set data for form report
      setData({
        isScam: false,
        content: '',
        sources: [],
        images: [],
        star: 5
      })
      // set list file image
      setFileList([])
      // set type comment (anonymous or auth)
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

    totalReviews={totalSortBy || 0}
    setCurrentReview={setCurrentReview}
    curentReview={curentReview}
    reviews={reviews}
    setReviews={setReviews}
    productId={productId}
    setOffsetTopByListComment={setOffsetTopByListComment}
    setLoadingFilter={setLoadingFilter}
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

    totalReviews={productInfo?.details?.totalReviews || 0}
    setCurrentReview={setCurrentReview}
    curentReview={curentReview}
    reviews={reviews}
    setReviews={setReviews}

    // use in list review
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

    totalReviews={productInfo?.details?.totalReviews || 0}
    setCurrentReview={setCurrentReview}
    curentReview={curentReview}
    reviews={reviews}
    setReviews={setReviews}

    // use in list review
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

    totalReviews={productInfo?.details?.totalReviews || 0}
    setCurrentReview={setCurrentReview}
    curentReview={curentReview}
    reviews={reviews}
    setReviews={setReviews}
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

    totalReviews={productInfo?.details?.totalReviews || 0}
    setCurrentReview={setCurrentReview}
    curentReview={curentReview}
    reviews={reviews}
    setReviews={setReviews}

    // use in list review
    productId={productId}
  />

  const launchpad = <LaunchpadDetail
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

    totalReviews={productInfo?.details?.totalReviews || 0}
    setCurrentReview={setCurrentReview}
    curentReview={curentReview}
    reviews={reviews}
    setReviews={setReviews}

    // use in list review
    productId={productId}
  />

  const getMetaProductDetail = (categoryName, type, detail) => {
    let meta = {}

    if (type === CRYPTO_COIN || type === CRYPTO_TOKEN) {
      meta = detail?.cryptoId && getMetaTagCrypto(detail)
    } else {
      switch (categoryName) {
        case CRYPTO:{
          meta = detail?.cryptoId && getMetaTagCrypto(detail)
          break
        }
        case DAPP:{
          meta = detail?.dAppId && getMetaTagDApp(detail)
          break
        }
        case EXCHANGE:{
          meta = detail?.exchangeId && getMetaTagExchange(detail)
          break
        }
        case SOON:{
          meta = detail?.projectId && getMetaTagSoon(detail)
          break
        }
        case VENTURE:{
          meta = detail?.ventureId && getMetaTagVenture(detail)
          break
        }
        case LAUNCHPAD:{
          meta = detail?.launchPadId && getMetaTagLaunchpad(detail)
          break
        }
      }
    }

    return meta
  }

  const getTxtTotalReviewScam = (totalScam, totalReview) =>{
    let output = ''
    output += totalScam ? `${totalScam} scam reports` : ''
    if (output !== '') {
      output += ', '
    }
    output += totalReview ? `${totalReview} reviews` : ''
    if (output !== '') {
      output += ', '
    }
    return output
  }

  const getMetaTagCrypto = (detail) =>{
    const meta = {}
    meta.title = `${detail?.name} (${detail?.symbol}) ${getTxtTotalReviewScam(detail?.totalIsScam, detail?.totalReviews)}Price Chart, Market Cap, Info | Gear5`
    meta.description = detail?.description
    meta.image = isValidProductId(detail?.cryptoId) ? formatImgUrlFromProductId(detail?.cryptoId) : imgAbsentImageCrypto
    return meta
  }

  const getMetaTagDApp = (detail) =>{
    const meta = {}
    meta.title = `${detail?.dAppName} ${getTxtTotalReviewScam(detail?.totalIsScam, detail?.totalReviews)} ${getTxtTotalReviewScam(detail?.totalIsScam, detail?.totalReviews)} Price Chart, Market Cap today and Info | Gear5`
    meta.description = detail?.description
    meta.image = isValidProductId(detail?.cryptoId) ? formatImgUrlFromProductId(detail?.cryptoId) : imgAbsentImageCrypto
    return meta
  }

  const getMetaTagExchange = (detail) =>{
    const meta = {}
    meta.title = `${detail?.name} ${getTxtTotalReviewScam(detail?.totalIsScam, detail?.totalReviews)}, ${detail?.volume24h ? formatLargeNumber(detail?.visit7d) + ' visit in last 7 days' : ''}, Volumne today and Info | Gear5`
    meta.description = detail?.fullDescription
    meta.image = isValidProductId(detail?.exchangeId) ? formatImgUrlFromProductId(detail?.exchangeId) : imgAbsentImageCrypto
    return meta
  }

  const getMetaTagSoon = (detail) =>{
    const meta = {}
    meta.title = `${detail?.projectName} (${detail?.projectSymbol}) ${getTxtTotalReviewScam(detail?.totalIsScam, detail?.totalReviews)} ${getStatusFromStartDateAndEndDate(detail?.startDate, detail?.endDate)?.toUpperCase()}, Market Cap today and Info | Gear5`
    meta.description = detail?.fullDesc || detail?.shortDesc
    meta.image = isValidProductId(detail?.projectId) ? formatImgUrlFromProductId(detail?.projectId) : imgAbsentImageCrypto
    return meta
  }

  const getMetaTagVenture = (detail) =>{
    const meta = {}
    meta.title = `${detail?.ventureName} ${getTxtTotalReviewScam(detail?.totalIsScam, detail?.totalReviews)}, ${`invested ` + formatLargeNumberMoneyUSD(calculateTotalFund(productInfo?.mores?.fund))}, ${detail?.location ? 'location ' + detail?.location : ''}, ${detail?.yearFounded ? 'founded ' + detail?.yearFounded : ''}, and Info | Gear5`
    meta.description = detail?.description
    meta.image = isValidProductId(detail?.cryptoId) ? formatImgUrlFromProductId(detail?.cryptoId) : imgAbsentImageCrypto
    return meta
  }

  const getMetaTagLaunchpad = (detail) =>{
    const meta = {}
    meta.title = `${detail?.name} (${detail?.symbol}) ${getTxtTotalReviewScam(detail?.totalIsScam, detail?.totalReviews)}, Market Cap, Info | Gear5`
    meta.description = detail?.description
    meta.image = isValidProductId(detail?.launchPadId) ? formatImgUrlFromProductId(detail?.launchPadId) : imgAbsentImageCrypto
    return meta
  }

  return (
    <>
      <SEO props={getMetaProductDetail(categoryName, type, productInfo?.details)} />
      <Helmet>
        <meta name='title' content='BITCOIN NE' data-react-helmet='true' />
        <meta name='description' content={productInfo?.details?.description} data-react-helmet='true' />
        {/* <meta name='image' content={`https://gear5.s3.ap-northeast-1.amazonaws.com/image/crypto/bigLogo/gear5_coin_bitcoin.png`}></meta> */}
      </Helmet>
      <div className='section'>
        {!productInfo ? <MySkeletonLoadinng count={6} height={200}/> : ''}
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
          ) : type === CRYPTO_COIN || type === CRYPTO_TOKEN ? (
            <>{crypto}</>
          ) : categoryName === LAUNCHPAD ? (
            <>{launchpad}</>
          )
            : ''}

        </div>
      </div>
    </>

  )
}

export default ProductDetail
