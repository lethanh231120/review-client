import React, { useRef } from 'react'
// import React, { useRef, useContext } from 'react'
import {
  Image,
  Rate,
  Input,
  Select,
  Checkbox,
  Upload,
  Popover
} from 'antd'
// import { SendOutlined } from '@ant-design/icons'
import ReCAPTCHA from 'react-google-recaptcha'
// import EmojiPicker from 'emoji-picker-react'
import { getCookie, STORAGEKEY } from '../../../../utils/storage'
// import { SignInContext } from '../../layout/Main'
import { explorers } from '../../../../utils/ExplorerScan'
import moment from 'moment'
import { post } from '../../../../api/BaseRequest'
import smile from '../../../../images/product/smile.png'
import user from '../../../../images/product/user.png'
import FilterReview from '../../product-detail/filter-review/FilterReview'
import '../../../../scss/base/cus-form.scss'

const FormReport = ({ numberReviews, rest, isFormReport }) => {
  const {
    data,
    setData,
    handleComment,
    validateTextArea,
    setValidateTextArea,
    fileList,
    recapcharRef,
    isRecaptcha,
    handleSubmitComment,
    setFileList,
    showUser,
    setErrorLink,
    errorLink,
    setIsRecaptcha,
    setTypeComment,
    typeComment,
    setErrorType,
    errorType,
    id
  } = rest
  const ref = useRef(null)
  // const token = Boolean(getCookie(STORAGEKEY.ACCESS_TOKEN))
  const userInfo = getCookie(STORAGEKEY.USER_INFO)
  // const signInContext = useContext(SignInContext)

  // const handleClickEmoji = (value) => {
  //   const cursor = ref.current.selectionStart
  //   const text = data?.content.slice(0, cursor) + value.emoji
  //   setData({
  //     ...data,
  //     content: text
  //   })
  // }

  // change comment in textarea
  const handleChangeTextArea = (e) => {
    // if (!token) {
    //     signInContext?.handleSetOpenModal(true)
    // } else {
    if (e.target.value !== '') {
      setValidateTextArea(false)
      setData({
        ...data,
        content: e.target.value
      })
    } else {
      setData({
        ...data,
        content: ''
      })
      setValidateTextArea(true)
    }
    // setOpenEmoji(false)
    // }
  }

  // chose file in select
  const handleChangeFile = async(e) => {
    // if (userInfo) {
    setFileList(e.fileList)
    const formData = new FormData()
    formData.append('file', e?.fileList[0]?.originFileObj)

    const time = moment().unix()
    const fileName = `${
      userInfo?.id ? userInfo?.id : id || 'anonymous'
    }_${time}`
    const dataImage = await post(
      `reviews/upload/image?storeEndpoint=test&fileName=${fileName}`,
      formData
    )
    setData({
      ...data,
      image: dataImage?.data
    })
    // } else {
    //     signInContext?.handleSetOpenModal(true)
    // }
  }

  const handleChangeLink = (value) => {
    const newLink = []
    explorers?.forEach((item) => {
      value?.forEach((itemLink) => {
        const isCorrect = itemLink?.includes(item)
        if (isCorrect) {
          newLink.push(itemLink)
        }
      })
    })
    setData({
      ...data,
      sources: newLink
    })
  }

  // click checked
  const handleChangeChecked = (e) => {
    setData({
      ...data,
      isScam: e?.target?.checked,
      star: e?.target?.checked ? 1 : 5
    })
    if (e?.target?.checked === false) {
      setErrorLink()
    }
  }

  const changeSelect = (value) => {
    const correct = []
    explorers?.forEach((item) => {
      const isCorrect = value?.includes(item)
      correct.push(isCorrect)
    })
    setErrorLink(
      correct?.some((item) => item === true) ? '' : 'Link explorer is not valid'
    )
  }

  const onPreview = async(file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }

  const handleChangeRecapchar = (value) => {
    if (value) {
      setIsRecaptcha(false)
    }
  }

  console.log(isFormReport)
  return (
    <>
      {(isFormReport === true) && (
        <FilterReview
          defaultFilter={rest?.defaultFilter}
          setDefaultFilter={rest?.setDefaultFilter}
          numberReviews={numberReviews}
        />
      )}
      <div className='product-detail-form'>
        {showUser && (
          <div className='product-detail-form-avatar'>
            <Image
              src={userInfo?.image ? userInfo?.image : user}
              preview={false}
            />
          </div>
        )}
        <div className='product-detail-form-content cus-form'>
          <div className='product-detail-form-content-text'>
            <div className='product-detail-form-content-rate'>
              <Rate
                value={data?.star}
                disabled={data?.isScam}
                onChange={(value) => setData({ ...data, star: value })}
              />
            </div>
            <Input.TextArea
              className={`form-text-area${
                validateTextArea ? 'product-detail-form-content-textarea' : ''
              }`}
              ref={ref}
              value={data?.content}
              minLength={0}
              autoFocus
              placeholder={`${
                validateTextArea ? 'Please enter comment' : 'Enter comment...'
              }`}
              autoSize={{ minRows: 1 }}
              onChange={handleChangeTextArea}
              onPressEnter={handleComment}
            />

            <Popover
              content='Click to report scam project'
              overlayClassName='product-detail-form-content-popover'
            >
              <div style={{ marginBottom: '1rem', width: 'fit-content' }}>
                <Checkbox onChange={handleChangeChecked} checked={data?.isScam}>
                  Is Scam
                </Checkbox>
              </div>
            </Popover>
            {data?.isScam && (
              <div style={{ marginBottom: '0.325rem' }}>
                <Select
                  value={data?.sources}
                  placeholder='Please enter proof link …'
                  mode='tags'
                  dropdownStyle={{ background: 'red', display: 'none' }}
                  onChange={handleChangeLink}
                  onSelect={changeSelect}
                  className='cus-multiple-select'
                />
              </div>
            )}
            {errorLink && <span style={{ color: 'red' }}>{errorLink}</span>}
            {data?.isScam && (
              <Upload
                // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                listType='picture-card'
                fileList={fileList}
                onChange={handleChangeFile}
                onPreview={onPreview}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            )}
            <div
              style={{
                background: isRecaptcha ? 'red' : '',
                border: `0.1px solid ${
                  isRecaptcha ? 'red' : 'rgba(0, 0, 0, 0.01'
                }`,
                width: '305px'
              }}
            >
              <ReCAPTCHA
                ref={recapcharRef}
                onChange={handleChangeRecapchar}
                sitekey='6Lcab8wjAAAAAEeXUCE7iFIga2fynoCIZn4W8Q-l'
              />
            </div>
          </div>
          <div className='product-detail-type'>
            <Checkbox
              onChange={(e) => {
                setTypeComment(e.target.checked)
                setErrorType()
              }}
              checked={typeComment}
            >
              Anonymous
            </Checkbox>
            {errorType && <div style={{ color: 'red' }}>{errorType}</div>}
          </div>
          <div className='product-detail-form-footer'>
            <div className='product-detail-form-footer-item'>
              <Image src={smile} preview={false} />
              {/* <div className='product-detail-form-icon-emoji'>
                              <EmojiPicker
                                  emojiStyle='facebook'
                                  height={270}
                                  width={250}
                                  lazyLoadEmojis={true}
                                  onEmojiClick={handleClickEmoji}
                              />
                          </div> */}
            </div>
            <div
              className='product-detail-form-footer-item'
              onClick={handleSubmitComment}
            >
              {/* <SendOutlined
                              style={{ cursor: 'pointer' }}
                              onClick={handleSubmitComment}
                          /> */}
              Send
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormReport
