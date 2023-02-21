import React, { useRef, useState, useEffect } from 'react'
// import React, { useRef, useContext } from 'react'
import {
  Image,
  // Rate,
  Input,
  Select,
  Checkbox,
  Upload,
  Form,
  Button
} from 'antd'
import { StarFilled } from '@ant-design/icons'
import ReCAPTCHA from 'react-google-recaptcha'
// import EmojiPicker from 'emoji-picker-react'
import { getCookie, STORAGEKEY } from '../../../../utils/storage'
// import { SignInContext } from '../../layout/Main'
// import { explorers } from '../../../../utils/ExplorerScan'
import moment from 'moment'
import { post } from '../../../../api/BaseRequest'
// import smile from '../../../../images/product/smile.png'
import user from '../../../../images/product/user.png'
import FilterReview from '../../product-detail/filter-review/FilterReview'
import '../../../../scss/base/cus-form.scss'
import './formReport.scss'
import Swal from 'sweetalert2'
import _ from 'lodash'

const { Option } = Select
const defaultValue = [
  { name: 'scamAmountUSD', value: '' },
  { name: 'sources', value: [] },
  { name: 'isScam', value: false },
  { name: 'star', value: undefined }
]
const FormReport = ({ numberReviews, rest, isFormReport }) => {
  const {
    data,
    setData,
    // handleComment,
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
    form
  } = rest

  const ref = useRef(null)
  const userInfo = getCookie(STORAGEKEY.USER_INFO)
  const [images, setImages] = useState([])

  // submit form
  const onFinish = (values) => {
    handleSubmitComment(values)
  }

  // toast message
  const notifyTopRight = (content) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    })

    Toast.fire({
      icon: 'error',
      title: content
    })
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      notifyTopRight('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 10
    if (!isLt2M) {
      notifyTopRight('Image must smaller than 10MB!')
    }
    return isJpgOrPng && isLt2M
  }

  useEffect(() => {
    setData({
      ...data,
      images: images
    })
  }, [images])

  // chose file in select
  const handleChangeFile = (e) => {
    if (!e?.event && e.file?.status === 'uploading') {
      const newFileList = []
      e?.fileList?.forEach(async(itemFile) => {
        newFileList.push({
          ...itemFile,
          status: 'done'
        })
        if (itemFile?.uid === e.file.uid) {
          const formData = new FormData()
          formData.append('file', itemFile?.originFileObj)
          const time = moment().unix()
          const fileName = `${itemFile?.uid}_${time}`
          const dataImage = await post(`reviews/upload/image?storeEndpoint=test&fileName=${fileName}`, formData)
          setImages(_.isEmpty(images) ? [dataImage?.data] : [...images, dataImage?.data])
        }
      })
      setFileList(newFileList)
    }
    if (e.file?.status === 'removed') {
      const index = rest?.data?.images?.findIndex((item) => item?.includes(e?.file?.uid))
      const newListImage = [...rest.data.images]
      newListImage?.splice(index, 1)
      setData({
        ...data,
        images: newListImage
      })
      setFileList(e.fileList)
    }
  }

  // call when onChange proof link
  const handleChangeLink = (value) => {
    const newLink = []
    // const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    const reg = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'
    value?.forEach((itemLink) => {
      if (itemLink.match(reg)) {
        newLink.push(itemLink)
      }
    })
    console.log(newLink)
    form.setFieldsValue({
      'sources': newLink
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
      isScam: e?.target?.checked
    })

    form.setFieldsValue({
      'star': e?.target?.checked ? 1 : 5,
      'isScam': e.target.checked,
      'scamAmountUSD': ''
    })
    if (e?.target?.checked === false) {
      setErrorLink()
    }
  }

  const changeSelect = (value) => {
    // const reg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    const reg = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'
    if (value !== '') {
      if (value.match(reg)) {
        // setData({
        //   ...data,
        //   sources: [
        //     ...data.sources,
        //     value
        //   ]
        // })
        setErrorLink()
      } else {
        setErrorLink('Link explorer is not valid')
      }
    }
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

  const handleChangeRating = (value) => {
    form.setFieldsValue({
      'isScam': value === 1
    })
    setData({
      ...data,
      isScam: value === 1
    })
  }

  return (
    <>
      {(isFormReport === true) && (
        <FilterReview
          defaultFilter={rest?.defaultFilter}
          setDefaultFilter={rest?.setDefaultFilter}
          numberReviews={numberReviews}
        />
      )}
      <Form
        name='nest-messages'
        form={form}
        onFinish={onFinish}
        layout='vertical'
        fields={[
          ...defaultValue,
          { name: 'isScam', value: form.getFieldValue('isScam') || false },
          { name: 'star', value: form.getFieldValue('isScam') ? 1 : form.getFieldValue('star') }
        ]}
      >
        <div className='product-detail-form'>
          {showUser && (
            <div className='product-detail-form-avatar'>
              <Image
                src={userInfo?.image ? userInfo?.image : user}
                preview={false}
              />
            </div>
          )}
          <div className='product-detail-form-content cus-form form-report'>
            <div className='product-detail-form-content-text'>
              {/* <Form.Item
                name='title'
                label='Title'
                rules={[
                  {
                    min: 20,
                    message: 'Title must be minimum 20 characters.' },
                  {
                    max: 500,
                    message: 'You can enter 500 characters only.'
                  }
                ]}
              >
                <Input
                  // defaultValue={''}
                  autoComplete={false}
                  // placeholder={`${
                  //   validateText?.title?.isError ? validateText?.title?.message : 'Enter title...'
                  // }`}
                  // onChange={(e) => handleChangeTitle(e)}
                  className={`${
                    validateText?.title?.isError ? 'product-detail-form-content-textarea' : ''
                  }`}
                />
              </Form.Item> */}
              <Form.Item
                name='content'
                label='Content'
                rules={[
                  {
                    required: true,
                    message: 'Please enter content.'
                  },
                  {
                    min: 100,
                    message: 'Content must be minimum 100 characters.'
                  },
                  {
                    max: 5000,
                    message: 'You can enter 5000 characters only.'
                  }
                ]}
              >
                <Input.TextArea
                  // className={`form-text-area ${
                  //   validateText?.textArea?.isError ? 'product-detail-form-content-textarea' : ''
                  // }`}
                  ref={ref}
                  autoFocus
                  placeholder='Content must be greater than 100 characters and less than 500 characters'
                  autoSize={{ minRows: 5 }}
                  // onChange={handleChangeTextArea}
                  // onPressEnter={(e) => {
                  //   handleComment(e.target.value)
                  // }}
                />
              </Form.Item>

              <Form.Item
                name='star'
                label='Rating'
                className='cus-select'
                rules={[
                  {
                    required: true,
                    message: 'Rating'
                  }
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  onChange={(value) => handleChangeRating(value)}
                >
                  <Option value={1}>
                    <div className='d-flex align-items-center'>
                      <span className='star-icon'>
                        <StarFilled className='star'/>
                      </span>
                       Scam, Fucking Run Away
                    </div>
                  </Option>
                  <Option value={2}>
                    <div className='d-flex align-items-center'>
                      <span className='star-icon'>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                      </span>
                    Warning, Be Careful
                    </div>
                  </Option>
                  <Option value={3}>
                    <div className='d-flex align-items-center'>
                      <span className='star-icon'>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                      </span>
                    Okay, Not Bad
                    </div>
                  </Option>
                  <Option value={4}>
                    <div className='d-flex align-items-center'>
                      <span className='star-icon'>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                      </span>
                     Good, Should Try
                    </div>
                  </Option>
                  <Option value={5}>
                    <div className='d-flex align-items-center'>
                      <span className='star-icon'>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                        <StarFilled className='star'/>
                      </span>
                     Great, To The Moon
                    </div>
                  </Option>
                </Select>
              </Form.Item>

              <div className='d-flex align-items-center'>
                <div style={{ marginRight: '0.675rem', width: 'fit-content' }}>
                  <Form.Item
                    name='isScam'
                    className='no-margin-bottom'
                  >
                    <Checkbox onChange={handleChangeChecked} checked={form.getFieldValue('isScam')}>
                        Report scam
                    </Checkbox>
                  </Form.Item>
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
              </div>

              {form.getFieldValue('isScam') && (
                <Form.Item
                  name='scamAmountUSD'
                  label='How much money have you been scammed?'
                  className='cus-select'
                >
                  <Select
                    style={{ width: '100%' }}
                  >
                    <Option value=''></Option>
                    <Option value='-.1000'>Less than $1k</Option>
                    <Option value='1000.10000'>From $1K to $10K</Option>
                    <Option value='10000.100000'>From $10K to $100K</Option>
                    <Option value='100000.1000000'>From $100K to $1M</Option>
                    <Option value='1000000.+'>Greater than $1M</Option>
                  </Select>
                </Form.Item>
              )}

              {form.getFieldValue('isScam') && (
                <div style={{ marginBottom: '0.325rem' }}>
                  <Select
                    value={data?.sources}
                    placeholder={(<span className='cus-form-placeholder'>Please enter proof link …</span>)}
                    mode='tags'
                    dropdownStyle={{ background: 'red', display: 'none' }}
                    onChange={handleChangeLink}
                    onSelect={changeSelect}
                    className='cus-multiple-select'
                  />
                </div>
              )}
              {errorLink && <span style={{ color: 'red' }}>{errorLink}</span>}

              {form.getFieldValue('isScam') && (
                <Upload
                  listType='picture-card'
                  fileList={fileList}
                  multiple={true}
                  // customRequest={dummyRequest}
                  onChange={handleChangeFile}
                  beforeUpload={beforeUpload}
                  onPreview={onPreview}
                >
                  {/* {fileList.length < 1 && '+ Upload'} */}
                  {fileList.length > 2 ? null : '+ Upload'}
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
            <div className='product-detail-form-footer'>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='product-detail-form-footer-item'
                >
                  Report
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </>
  )
}

export default FormReport
