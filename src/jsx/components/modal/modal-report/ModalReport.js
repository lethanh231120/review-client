import React, { useState, useContext, useEffect, useRef } from 'react'
import { Image, Form } from 'antd'
import { post } from '../../../../api/BaseRequest'
import { useNavigate } from 'react-router-dom'
import { SignInContext, Authenticated, HotTopicsContext } from '../../../../App'
import './report.scss'
import Description from '../../product-detail/description/Description'
import FormReport from '../../Forms/form-report/FormReport'
import { ReportModalContext, AddModalContext } from '../../../index'
import InputSearch from '../../input-search/GlobalSearch'
import { getCookie, STORAGEKEY } from '../../../../utils/storage'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImage from '../../../../images/absent_image.png'
import NoImage from '../../common-widgets/no-image/NoImage'
import Swal from 'sweetalert2'
// import image from '../../../../images/product/gear5_coin_bitcoin.png'
import { Button } from 'react-bootstrap'
import hot from '../../../../images/product/hot.png'
import ProjectHot from './ProjectHot'
import { CRYPTO, EXCHANGE, SOON, VENTURE, DAPP } from '../../../constants/category'

const ModalReport = ({ isModal }) => {
  const signInContext = useContext(SignInContext)
  const reportModal = useContext(ReportModalContext)
  const addModal = useContext(AddModalContext)
  const hotList = useContext(HotTopicsContext)
  const auth = useContext(Authenticated)
  const [form] = Form.useForm()

  const recapcharRef = useRef(null)
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  const navigate = useNavigate()

  const [item, setItem] = useState()
  const [itemHot, setItemHot] = useState()
  const [validateTextArea, setValidateTextArea] = useState(false)
  const [fileList, setFileList] = useState([])
  const [isRecaptcha, setIsRecaptcha] = useState(false)
  const [typeComment, setTypeComment] = useState(false)
  const [errorLink, setErrorLink] = useState()
  const [errorType, setErrorType] = useState()
  const [productId, setProductId] = useState()
  const [data, setData] = useState({
    isScam: false,
    content: '',
    sources: [],
    images: [],
    star: 5,
    scamAmountUSD: null
  })

  const [screenWidth, setScreenWidth] = useState()
  const [listHot, setListHot] = useState()

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window
      setScreenWidth(width)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenWidth > 1200) {
      setListHot(hotList && hotList?.slice(0, 8))
    }
    if (screenWidth < 1200) {
      setListHot(hotList && hotList?.slice(0, 6))
    }
  }, [screenWidth, hotList])

  useEffect(() => {
    form.setFieldsValue({ isScam: true })
  }, [reportModal])

  useEffect(() => {
    let newDataItem
    switch (itemHot?.type) {
      case CRYPTO:
        newDataItem = {
          image: itemHot?.data?.thumbLogo ? itemHot?.data?.thumbLogo : (itemHot?.data?.bigLogo ? itemHot?.data?.bigLogo : itemHot?.data?.smallLogo),
          description: itemHot?.data?.description,
          name: itemHot?.data?.name,
          symbol: itemHot?.data?.symbol,
          holders: itemHot?.data?.holders,
          isScam: itemHot?.data?.holders,
          isWarning: itemHot?.data?.isWarning,
          score: itemHot?.data?.score,
          cryptoId: itemHot?.data?.cryptoId
        }
        break
      case EXCHANGE:
        newDataItem = {
          image: itemHot?.data?.smallLogo,
          description: itemHot?.data?.fullDescription,
          name: itemHot?.data?.name,
          isScam: itemHot?.data?.isScam,
          isWarning: itemHot?.data?.isWarning,
          score: itemHot?.data?.score,
          exchangeId: itemHot?.data?.exchangeId
        }
        break
      case DAPP:
        newDataItem = {
          image: itemHot?.data?.dAppLogo,
          description: itemHot?.data?.description,
          name: itemHot?.data?.dAppName,
          isScam: itemHot?.data?.isScam,
          isWarning: itemHot?.data?.isWarning,
          score: itemHot?.data?.score,
          dappId: itemHot?.data?.dAppId
        }
        break
      case VENTURE:
        newDataItem = {
          image: itemHot?.data?.ventureLogo,
          description: itemHot?.data?.description,
          name: itemHot?.data?.ventureName,
          isScam: itemHot?.data?.isScam,
          isWarning: itemHot?.data?.isWarning,
          score: itemHot?.data?.score,
          yearFounded: itemHot?.data?.yearFounded,
          location: itemHot?.data?.location,
          ventureId: itemHot?.data?.ventureId
        }
        break
      case SOON:
        newDataItem = {
          image: itemHot?.data?.ventureLogo,
          description: itemHot?.data?.description,
          name: itemHot?.data?.ventureName,
          isScam: itemHot?.data?.isScam,
          isWarning: itemHot?.data?.isWarning,
          score: itemHot?.data?.score,
          yearFounded: itemHot?.data?.yearFounded,
          location: itemHot?.data?.location,
          soonId: itemHot?.data?.soonId
        }
        break
      default:
        break
    }
    setItem(newDataItem)
  }, [itemHot])

  useEffect(() => {
    if (typeComment === 'login') {
      if (!auth?.isAuthenticated) {
        signInContext?.handleSetOpenModal(true)
      }
    }
  }, [typeComment, signInContext, auth])

  // Process to get the url for product detail after the report is done
  // Report scam will be redirected to detail product screen
  useEffect(() => {
    // refModal.current.scrollTo(0, 0)
    const id = item?.cryptoId ? item?.cryptoId
      : (item?.dappId ? item?.dappId
        : (item?.ventureId ? item?.ventureId
          : (item?.soonId ? item?.soonId
            : item?.exchangeId)))
    if (id?.split('_')[1] === 'token' || id?.split('_')[1] === 'coin') {
      const productId = `products/crypto/${id?.split('_')[1]}/${id?.split('_')[2]}${id?.split('_')[1] === 'token' ? `/${id?.split('_')[3]}` : ''}`
      setProductId(productId)
    } else {
      const productId = `products/${id?.split('_')[1]}/${(id?.split('_')[1] === 'soon') ? `${item?.soonId?.split('_')[2]}${item?.soonId?.split('_')[3] ? `/${item?.soonId?.split('_')[3]}` : ''}` : `${id?.split('_')[2]}`}`
      setProductId(productId)
    }
  }, [item])

  // noti report success
  // const notifyTopRight = () => {
  //   const Toast = Swal.mixin({
  //     toast: true,
  //     position: 'top-end',
  //     showConfirmButton: false,
  //     timer: 2000,
  //     timerProgressBar: true
  //   })

  //   Toast.fire({
  //     icon: 'success',
  //     title: 'Post comemnt successfully!'
  //   })
  // }

  const handleReset = () => {
    // reset the value of state data
    setData({
      isScam: false,
      content: '',
      sources: [],
      images: [],
      star: 5
    })
    // reset the value of state image
    setFileList([])
    // reset the value of state error textarea( input)
    setValidateTextArea(false)
    // reset the value of state type comment
    setTypeComment()
    setItem()
    // reset the value of recapcharRef
    recapcharRef.current.reset()
    form.resetFields()
    form.setFieldsValue({ 'isScam': false })
  }
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
      Swal.fire({
        icon: dataAdd?.code === 'B.REVIEW.0' ? 'success' : 'warning',
        title: 'Add new report successfully!',
        text: dataAdd?.code === 'B.REVIEW.1' ? `We will hide reviews with Shill, Ads, Porn.... content !
        With your review, we will review it directly by the admin team. Enjoy Gear5.io, Thank You !` : '',
        showDenyButton: true,
        confirmButtonText: 'Add New Report',
        denyButtonText: `View Detail`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          handleReset()
        } else if (result.isDenied) {
          handleReset()
          if (isModal) {
            reportModal?.handleSetOpenModal(false)
            navigate(`../../../${productId}`)
          } else {
            navigate(`../../../${productId}`)
          }
        }
      })
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

  const functionAddComment = (values, content) => {
    const params = {
      ...data,
      productId: item?.cryptoId ? item?.cryptoId
        : (item?.dappId ? item?.dappId
          : (item?.ventureId ? item?.ventureId
            : (item?.soonId ? item?.soonId
              : item?.exchangeId))),
      ...values
    }
    if (typeComment) {
      const recaptchaValue = recapcharRef.current.getValue()
      if (recaptchaValue) {
        submitComment(params, 'anonymous')
      } else {
        setIsRecaptcha(true)
      }
    } else {
      if (auth?.isAuthenticated) {
        const recaptchaValue = recapcharRef.current.getValue()
        if (recaptchaValue) {
          submitComment(params, 'auth')
        } else {
          setIsRecaptcha(true)
        }
      } else {
        signInContext?.handleSetOpenModal(true)
      }
    }
  }

  const handleSubmitComment = async(values) => {
    functionAddComment(values, data?.content)
  }

  const handleAddProject = () => {
    if (userInfo) {
      addModal?.handleSetOpenModal(true)
    } else {
      signInContext?.handleSetOpenModal(true)
    }
    reportModal?.handleSetOpenModal(false)
  }

  return (
    <>
      <InputSearch
        isFormReport={true}
        setItem={setItem}
      />
      {item && (
        <>
          <div className='row report-item-overview'>
            <div className='col-lg-12'>
              <div className='profile card card-body px-3 pt-3 pb-3 mt-3 cus-card'>
                <div className='profile-head mb-3'>
                  <div className='profile-info cus-profile-info'>
                    <div className='profile-details'>
                      <div className='profile-photo'>
                        {item?.image && (item?.cryptoId || item?.dappId || item?.ventureId || item?.exchangeId || item?.soonId) ? (
                          <Image src={isValidProductId(item?.cryptoId || item?.dappId || item?.ventureId || item?.exchangeId || item?.soonId) ? formatImgUrlFromProductId(item?.cryptoId || item?.dappId || item?.ventureId || item?.exchangeId || item?.soonId) : imgAbsentImage} preview={false} className='image-list' height={64} width={64} alt='Project Logo'/>
                        ) : (
                          <NoImage
                            alt={item?.name?.slice(0, 3)}
                            height={64}
                            width={64}
                          />
                        )}
                      </div>
                      <div className='profile-name px-3 pt-2'>
                        <h4 className='text-primary mb-2 cus-h4'>
                          <span className='crypto-overview-name'>
                            {item?.name}
                          </span>
                          {item?.symbol ? (
                            <span className='crypto-overview-symbol'>
                              {item?.symbol}
                            </span>
                          ) : (
                            ''
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <Description text={item?.description}/>
              </div>
            </div>
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
              form: form,
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
      )}

      <h4 className='project-hot-title'>Project Hot <Image src={hot} preview={false} alt='Hot Project'/></h4>
      <div className='mt-3 row'>
        {listHot && listHot?.slice(0, 8)?.map((item, index) => (
          <ProjectHot
            key={index}
            data={item}
            setItemHot={setItemHot}
          />
        ))}
      </div>

      <div className='text-center mt-3 '>
        If you can’t find it, please add a new project here.
        <Button
          className='me-2 ml-2'
          variant='success'
          style={{ marginLeft: '0.3rem', padding: '0.5rem' }}
          onClick={handleAddProject}
        >
          Add Project
        </Button>
      </div>

    </>
  )
}

export default ModalReport

