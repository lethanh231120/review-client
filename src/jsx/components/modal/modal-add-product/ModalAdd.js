import React, { useState, useRef, useContext, useEffect } from 'react'
import './add.scss'
import { Select, Form, Row, Col, Input, Checkbox, Upload } from 'antd'
// import { Button } from 'react-bootstrap'
// import { DAPP, EXCHANGE, CRYPTO } from '../../../constants/category'
import { DAPP, EXCHANGE, CRYPTO } from '../../../constants/category'
import ReCAPTCHA from 'react-google-recaptcha'
import { getCookie, STORAGEKEY } from '../../../../utils/storage'
import { post } from '../../../../api/BaseRequest'
import moment from 'moment'
// import { explorers } from '../../../../utils/ExplorerScan'
// import { CheckCircleOutlined } from '@ant-design/icons'
import { CategoryContext } from '../../../../App'
import _ from 'lodash'
import Swal from 'sweetalert2'
import { AddModalContext } from '../../../index'

const { Option } = Select
const defaultValue = [
  { name: 'name', value: null },
  { name: 'symbol', value: null },
  { name: 'address', value: null },
  { name: 'chainName', value: null },
  { name: 'chainId', value: null },
  { name: 'website', value: null },
  { name: 'explorer', value: null },
  { name: ['socials', 'twitter'], value: null },
  { name: ['socials', 'discord'], value: null },
  { name: ['socials', 'telegram'], value: null },
  { name: 'subCategory', value: null },
  { name: 'type', value: 'token' },
  { name: 'thumbLogo', value: null },
  { name: 'description', value: null },
  { name: 'sources', value: [] },
  { name: 'isScam', value: false },
  { name: 'isWarning', value: false }
]
const ModalAdd = ({ isModal }) => {
  const TOKEN = 'token'
  // const ref = useRef()
  const categoryContext = useContext(CategoryContext)
  const addModal = useContext(AddModalContext)
  const [form] = Form.useForm()
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  const categories = [
    {
      value: CRYPTO,
      label: <span className='cus-form-placeholder'>Crypto Projects</span>
    },
    {
      value: EXCHANGE,
      label: <span className='cus-form-placeholder'>Exchanges</span>
    },
    {
      value: DAPP,
      label: <span className='cus-form-placeholder'>DApps</span>
    }
  ]
  const [category, setCategory] = useState(CRYPTO)
  // const [type, setType] = useState(TOKEN)
  const [fileList, setFileList] = useState([])
  const [isRecaptcha, setIsRecaptcha] = useState(false)
  // const [listCategory, setListCategory] = useState()
  const [subCategories, setSubCategories] = useState()
  const [data, setData] = useState({
    isScam: false,
    content: '',
    sources: [],
    image: '',
    type: TOKEN
  })
  const [errorLink, setErrorLink] = useState()

  const recapcharRef = useRef(null)

  const handleChangeCategory = (value) => {
    setCategory(value)
  }

  // noti report success
  const notifyTopRight = (content) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    })

    Toast.fire({
      icon: 'success',
      title: content
    })
  }

  // toast error
  const toartError = (content) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    })

    Toast.fire({
      icon: 'error',
      title: content
    })
  }

  const sendData = async(data) => {
    try {
      let res
      if (category === CRYPTO) {
        res = await post('reviews/crypto/upload', data)
      }
      if (category === EXCHANGE) {
        res = await post('reviews/exchange/upload', data)
      }
      if (category === DAPP) {
        res = await post('reviews/dapp/upload', data)
      }
      if (res?.status) {
        if (isModal) {
          addModal.handleSetOpenModal(false)
        }
        handleReset()
        notifyTopRight(`Add project successfully. Please wait for our admin to confirm`)
      }
    } catch (error) {
      toartError('Add project failed. Please try again.')
    }
  }

  const onFinish = async(values) => {
    const recaptchaValue = recapcharRef.current.getValue()
    if (recaptchaValue) {
      let body = {}
      if (category === CRYPTO) {
        body = {
          name: values?.name,
          type: values?.type,
          symbol: values?.symbol,
          address: values?.address,
          chainName: values?.chainName,
          thumbLogo: data?.image,
          bigLogo: data?.image,
          smallLogo: data?.image,
          description: values?.description,
          website: values?.website,
          explorer: values?.explorer,
          socials: values?.socials,
          isScam: data?.isScam,
          isWarning: values?.isWarning,
          proof: (!data?.isScam && !data?.isWarning) ? null : {
            'isScam': (data?.isScam && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null,
            'isWarning': (data?.isWarning && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null
          },
          chainId: values?.chainId,
          decimal: null
        }
      }
      if (category === EXCHANGE) {
        console.log(values)
        body = {
          name: values?.name,
          subCategory: values?.subCategory,
          thumbLogo: data?.image,
          smallLogo: data?.image,
          bigLogo: data?.image,
          description: values?.description,
          website: values?.website,
          socials: values?.socials,
          isScam: values?.isScam,
          isWarning: values?.isWarning,
          proof: (!data?.isScam && !data?.isWarning) ? null : {
            'isScam': (data?.isScam && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null,
            'isWarning': (data?.isWarning && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null
          }
        }
      }
      if (category === DAPP) {
        // "chains":{
        //     "ethereum": "1"
        // }
        const chains = {}
        console.log(values)
        chains[values?.chainName] = values?.chainId
        body = {
          name: values?.name,
          logo: data?.image,
          description: values?.description,
          website: values?.website,
          subCategory: values?.subCategory,
          socials: values?.socials,
          isScam: values?.isScam,
          isWarning: values?.isWarning,
          chains: chains,
          proof: (!data?.isScam && !data?.isWarning) ? null : {
            'isScam': (data?.isScam && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null,
            'isWarning': (data?.isWarning && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null
          }
        }
      }
      sendData(body)
    } else {
      setIsRecaptcha(true)
    }
  }

  // chose file in select
  const handleChangeFile = async(e) => {
    if (e.file?.status === 'uploading') {
      setFileList([
        {
          ...e.fileList[0],
          status: 'done'
        }
      ])
      const formData = new FormData()
      formData.append('file', e?.fileList[0]?.originFileObj)
      const time = moment().unix()
      const fileName = `${userInfo.id}_${time}`
      const dataImage = await post(`reviews/upload/image?storeEndpoint=test&fileName=${fileName}`, formData)
      setData({
        ...data,
        image: dataImage?.data
      })
    }
    if (e.file?.status === 'removed') {
      setFileList([])
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      toartError('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 10
    if (!isLt2M) {
      toartError('Image must smaller than 10MB!')
    }
    return isJpgOrPng && isLt2M
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

  useEffect(() => {
    const list = {}
    for (const key in categoryContext) {
      let categoryName
      switch (categoryContext[key]?.category?.name) {
        case 'DApps':
          categoryName = DAPP
          break
        case 'Crypto Projects':
          categoryName = CRYPTO
          break
        case 'Exchanges':
          categoryName = EXCHANGE
          break

        default:
          break
      }
      list[categoryName] = categoryContext[key]?.subCategories
      if (categoryName === category) {
        setSubCategories(categoryContext[key]?.subCategories)
      }
    }
  }, [categoryContext, category])

  const handleReset = () => {
    form.resetFields()
    setData({
      isScam: false,
      content: '',
      sources: [],
      image: '',
      type: TOKEN
    })
    setFileList([])
  }

  // click scam
  const handleChangeScam = (e) => {
    setData({
      ...data,
      isScam: e?.target?.checked
      // star: e?.target?.checked ? 1 : 5
    })
    if (e?.target?.checked === false) {
      setErrorLink()
    }
  }

  // click checked
  const handleChangeWarning = (e) => {
    setData({
      ...data,
      isWarning: e?.target?.checked
      // star: e?.target?.checked ? 1 : 5
    })
    if (e?.target?.checked === false) {
      setErrorLink()
    }
  }

  const handleChangeLink = (value) => {
    // const newLink = []
    // explorers?.forEach((item) => {
    //   value?.forEach((itemLink) => {
    //     const isCorrect = itemLink?.includes(item)
    //     if (isCorrect) {
    //       newLink.push(itemLink)
    //     }
    //   })
    // })
    // setData({
    //   ...data,
    //   sources: newLink
    // })
    const newLink = []
    const reg = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'
    value?.forEach((itemLink) => {
      if (itemLink.match(reg)) {
        newLink.push(itemLink)
      }
    })
    // form.setFieldsValue({
    //   'sources': newLink
    // })
    setData({
      ...data,
      sources: newLink
    })
  }

  const changeSelect = (value) => {
    // const correct = []
    // explorers?.forEach((item) => {
    //   const isCorrect = value?.includes(item)
    //   correct.push(isCorrect)
    // })
    // setErrorLink(correct?.some((item) => item === true) ? '' : 'Link explorer is not valid')

    const reg = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'
    if (value !== '') {
      if (value.match(reg)) {
        setErrorLink()
      } else {
        setErrorLink('Link explorer is not valid')
      }
    }
  }

  const handleChangeType = (value) => {
    setData({
      ...data,
      type: value
    })
  }

  return (
    <>
      <p>We are very glad that you are contributing information about the projects that we are missing. Together we will bring lots of useful information to the crypto community.</p>
      <Form
        form={form}
        onFinish={onFinish}
        fields={defaultValue}
        layout='vertical'
        className='cus-form'
      >
        <Row gutter={[12]}>
          <Col span={12}>
            <Form.Item
              label='Category'
              className='cus-select'
            >
              <Select
                defaultValue={category}
                onChange={handleChangeCategory}
                options={categories}
              />
            </Form.Item>
          </Col>
          {category === CRYPTO && (
            <Col span={12}>
              <Form.Item
                name='type'
                label='Type'
                rules={[
                  {
                    required: true,
                    message: 'Please select type!'
                  }
                ]}
                className='cus-select'
              >
                <Select
                  defaultValue={category}
                  style={{ width: '100%' }}
                  onChange={handleChangeType}
                >
                  <Option value='token'>Token</Option>
                  <Option value='coin'>Coin</Option>
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>
        <Row gutter={[12]}>
          <Col span={12} className='form-group'>
            <Form.Item
              name='name'
              label='Name'
              rules={[
                {
                  required: true,
                  message: 'Please input name!'
                }
              ]}
            >
              <Input autoComplete={false} placeholder='Project name'/>
            </Form.Item>
          </Col>
          {category === CRYPTO && (
            <Col span={12}>
              <Form.Item
                name='symbol'
                label='Symbol'
                rules={[
                  {
                    required: true,
                    message: 'Please input symbol!'
                  }
                ]}
              >
                <Input placeholder='Project symbol'/>
              </Form.Item>
            </Col>
          )}
          {category === CRYPTO && data?.type === TOKEN && (
            <Col span={12}>
              <Form.Item
                name='address'
                label='Address'
                rules={[
                  {
                    required: true,
                    message: 'Please input address!'
                  }
                ]}
              >
                <Input placeholder='Token Address'/>
              </Form.Item>
            </Col>
          )}
          {category !== EXCHANGE && (
            <Col span={12}>
              <Form.Item
                name='chainName'
                label='Chain Name'
                rules={[
                  {
                    required: true,
                    message: 'Please input chain name!'
                  }
                ]}
              >
                <Input placeholder='Chain name'/>
              </Form.Item>
            </Col>
          )}
          {category !== EXCHANGE && (
            <Col span={12}>
              <Form.Item
                name='chainId'
                label='Chain ID'
                rules={[
                  {
                    required: category === DAPP,
                    message: 'Please input chain name!'
                  }
                ]}
              >
                <Input placeholder='Chain ID'/>
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item
              name='website'
              label='Website'
              rules={[
                {
                  required: category === EXCHANGE,
                  message: 'Please input website!'
                }
              ]}
            >
              <Input placeholder='Link website'/>
            </Form.Item>
          </Col>
          {category === CRYPTO && (
            <Col span={12}>
              <Form.Item name='explorer' label='Explore Website'>
                <Input placeholder='Link explorer'/>
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item name={['socials', 'twitter']} label='Twitter'>
              <Input placeholder='Twitter'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['socials', 'discord']} label='Discord'>
              <Input placeholder='Discord'/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['socials', 'telegram']} label='Telegram'>
              <Input placeholder='Telegram'/>
            </Form.Item>
          </Col>
          {category !== CRYPTO && (
            <Col span={12}>
              <Form.Item
                name='subCategory'
                label='Sub Category'
                rules={[
                  {
                    required: category === EXCHANGE,
                    message: 'Please select sub category!'
                  }
                ]}
              >
                <Select
                  placeholder='Sub Category'
                  showSearch
                  className='cus-multiple-select select-search'
                >
                  {subCategories && subCategories?.map((item, index) => (
                    <Option value={item?.name} key={index}>{item?.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name='thumbLogo'>
                  <Upload
                    listType='picture-card'
                    fileList={fileList}
                    onChange={handleChangeFile}
                    beforeUpload={beforeUpload}
                    onPreview={onPreview}
                  >
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={(category === EXCHANGE) ? 24 : 12}>
                <Row>
                  <Col span={(category === EXCHANGE) ? 12 : 24}>
                    <Form.Item name='isScam'>
                      <Checkbox
                        onChange={handleChangeScam}
                        checked={data?.isScam}
                      >
                                                Scam
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={(category === EXCHANGE) ? 12 : 24}>
                    <Form.Item name='isWarning'>
                      <Checkbox
                        checked={data?.isWarning}
                        onChange={handleChangeWarning}
                      >
                                                Warning
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          {(data?.isScam || data?.isWarning) && (
            <Col span={24}>
              <Select
                value={data?.sources}
                placeholder={(<span className='cus-form-placeholder'>Please enter proof link …</span>)}
                mode='tags'
                dropdownStyle={{ background: 'red', display: 'none' }}
                onChange={handleChangeLink}
                onSelect={changeSelect}
                className='cus-multiple-select'
              />
              {errorLink && (<span style={{ color: 'red' }}>
                {errorLink}
              </span>)}
            </Col>
          )}
          <Col span={24}>
            <Form.Item
              name='description'
              label='Description'
              rules={[
                {
                  required: category !== CRYPTO,
                  message: 'Please input description!'
                }
              ]}
            >
              <Input.TextArea rows={4} placeholder='Enter description'/>
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{
            background: isRecaptcha ? 'red' : '',
            border: `0.1px solid ${isRecaptcha ? 'red' : 'rgba(0, 0, 0, 0.01'}`,
            width: '303px',
            marginTop: '1.6rem'
          }}
        >
          <ReCAPTCHA
            ref={recapcharRef}
            onChange={handleChangeRecapchar}
            sitekey='6Lcab8wjAAAAAEeXUCE7iFIga2fynoCIZn4W8Q-l'
          />
        </div>
        <div className='d-flex'>
          <Form.Item>
            <button type='submit' className='me-2 btn btn-danger' onClick={handleReset}>Reset</button>
          </Form.Item>
          <Form.Item>
            <button className='me-2 btn btn-success'>Add Product</button>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}

export default ModalAdd
