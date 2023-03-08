import React, { useState, useRef, useContext, useEffect } from 'react'
import './add.scss'
import { Select, Form, Row, Col, Input, Checkbox, Upload, Image } from 'antd'
import { DAPP, EXCHANGE, CRYPTO } from '../../../constants/category'
import ReCAPTCHA from 'react-google-recaptcha'
import { getCookie, STORAGEKEY } from '../../../../utils/storage'
import { post } from '../../../../api/BaseRequest'
import moment from 'moment'
import { CategoryContext, SignInContext } from '../../../../App'
import _ from 'lodash'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { AddModalContext } from '../../../index'
import { ChainListContext } from '../../../../App'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'

const { Option } = Select
const defaultValue = [
  { name: 'name', value: null },
  { name: 'symbol', value: null },
  { name: 'address', value: null },
  { name: 'chainName', value: null },
  // { name: 'chainId', value: null },
  { name: 'website', value: null },
  { name: 'explorer', value: null },
  { name: ['socials', 'twitter'], value: null },
  { name: ['socials', 'discord'], value: null },
  { name: ['socials', 'telegram'], value: null },
  { name: 'subCategory', value: null },
  { name: 'type', value: 'token' },
  { name: 'thumbLogo', value: null },
  { name: 'description', value: null },
  { name: 'sources', value: '' },
  { name: 'isScam', value: false },
  { name: 'isWarning', value: false }
]
const ModalAdd = ({ isModal }) => {
  const navigate = useNavigate()
  const TOKEN = 'token'
  const categoryContext = useContext(CategoryContext)
  const signContext = useContext(SignInContext)
  const chainList = useContext(ChainListContext)
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
  const [fileList, setFileList] = useState([])
  const [isRecaptcha, setIsRecaptcha] = useState(false)
  const [subCategories, setSubCategories] = useState()

  const [listChain, setListChain] = useState({
    data: undefined,
    loading: false
  })

  const [data, setData] = useState({
    isScam: false,
    content: '',
    sources: [],
    image: '',
    type: TOKEN
  })
  const recapcharRef = useRef(null)

  const handleChangeCategory = (value) => {
    setCategory(value)
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

  const sendData = async(data, recaptchaValue) => {
    try {
      let res
      if (category === CRYPTO) {
        res = await post('reviews/crypto/upload', data, { ReCaptchaResponse: recaptchaValue })
      }
      if (category === EXCHANGE) {
        res = await post('reviews/exchange/upload', data, { ReCaptchaResponse: recaptchaValue })
      }
      if (category === DAPP) {
        res = await post('reviews/dapp/upload', data, { ReCaptchaResponse: recaptchaValue })
      }
      if (res?.status) {
        Swal.fire({
          icon: 'success',
          title: 'Add project successfully!',
          text: 'Please wait for our admin to confirm',
          showDenyButton: true,
          confirmButtonText: 'Add New Project',
          denyButtonText: `Back to home`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            handleReset()
          } else if (result.isDenied) {
            handleReset()
            if (isModal) {
              addModal.handleSetOpenModal(false)
              navigate('../')
            } else {
              navigate('../')
            }
          }
        })
      }
    } catch (error) {
      toartError('Add project failed. Please try again')
    }
  }

  const onFinish = async(values) => {
    if (userInfo) {
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
            isWarning: data?.isWarning,
            proof: (!data?.isScam && !data?.isWarning) ? null : {
              'isScam': data?.isScam ? values?.sources : null,
              'isWarning': data?.isWarning ? values?.sources : null
            },
            chainId: values?.chainId,
            decimal: null
          }
        }
        if (category === EXCHANGE) {
          body = {
            name: values?.name,
            subCategory: values?.subCategory,
            thumbLogo: data?.image,
            smallLogo: data?.image,
            bigLogo: data?.image,
            description: values?.description,
            website: values?.website,
            socials: values?.socials,
            isScam: data?.isScam,
            isWarning: data?.isWarning,
            proof: (!data?.isScam && !data?.isWarning) ? null : {
              'isScam': data?.isScam ? values?.sources : null,
              'isWarning': data?.isWarning ? values?.sources : null
            }
          }
        }
        if (category === DAPP) {
          const chains = {}
          chains[values?.chainName] = values?.chainId
          body = {
            name: values?.name,
            logo: data?.image,
            description: values?.description,
            website: values?.website,
            subCategory: values?.subCategory,
            socials: values?.socials,
            isScam: data?.isScam,
            isWarning: data?.isWarning,
            chains: chains,
            proof: (!data?.isScam && !data?.isWarning) ? null : {
              'isScam': data?.isScam ? values?.sources : null,
              'isWarning': data?.isWarning ? values?.sources : null
            }
          }
        }
        sendData(body, recaptchaValue)
      } else {
        setIsRecaptcha(true)
      }
    } else {
      signContext?.handleSetOpenModal(true)
    }
  }

  // chose file in select
  const handleChangeFile = async(e) => {
    if (!e?.event && e.file?.status === 'uploading') {
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
    // reset the value of recapcharRef
    recapcharRef.current.reset()
    setFileList([])
  }

  // click scam
  const handleChangeScam = (e) => {
    setData({
      ...data,
      isWarning: false,
      isScam: e?.target?.checked
    })
  }

  // click checked
  const handleChangeWarning = (e) => {
    setData({
      ...data,
      isScam: false,
      isWarning: e?.target?.checked
    })
  }

  const handleChangeType = (value) => {
    setData({
      ...data,
      type: value
    })
  }

  const listKey = Object.keys(chainList).map((key) => key)

  const handleChangeChainName = _.debounce(async(value) => {
    setListChain({
      data: undefined,
      loading: false
    })
    if (value !== '') {
      const newListKey = listKey?.filter((item) => item?.toLowerCase()?.includes(value?.toLowerCase()))
      if (!_.isEmpty(newListKey)) {
        const newData = []
        newListKey?.forEach((itemKeyChain) => {
          newData?.push(chainList[`${itemKeyChain}`])
        })
        setListChain({
          data: newData,
          loading: false
        })
      } else {
        form.setFieldsValue({ chainId: null })
      }
    } else {
      setListChain({
        data: undefined,
        loading: false
      })
    }
  }, 400)

  const handleClickItemChain = (item) => {
    form.setFieldsValue({ 'chainName': item?.chainName })
    form.setFieldsValue({ 'chainId': item?.chainId })
  }

  return (
    <>
      <p>We are very glad that you are contributing information about the projects that we are missing. Together we will bring lots of useful information to the crypto community.</p>
      <Form
        form={form}
        onFinish={onFinish}
        fields={defaultValue}
        layout='vertical'
        className='cus-form modal-add'
      >
        <Row gutter={[12]}>
          <Col sm={{ span: 12 }} xs={{ span: 24 }}>
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
            <Col sm={{ span: 12 }} xs={{ span: 24 }}>
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
          <Col sm={{ span: 12 }} xs={{ span: 24 }} className='form-group'>
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
            <Col sm={{ span: 12 }} xs={{ span: 24 }}>
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
            <Col sm={{ span: 12 }} xs={{ span: 24 }}>
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
            <Col sm={{ span: 12 }} xs={{ span: 24 }}>
              <Form.Item
                name='chainName'
                label='Blockchain name'
                className='chain-name'
                rules={[
                  {
                    required: true,
                    message: 'Please input chain name!'
                  }
                ]}
              >
                <Input
                  placeholder='Chain Name'
                  onChange={(e) => {
                    setListChain({
                      ...listChain,
                      loading: true
                    })
                    handleChangeChainName(e?.target?.value)
                  }}
                  onBlur={() => handleChangeChainName('')}
                />
              </Form.Item>
              <div className={`list-chain-name ${(!listChain?.loading && listChain?.data) ? 'active' : ''}`}>
                <div className='list-chain-name-content'>
                  {listChain?.loading ? (
                    <MySkeletonLoadinng count={2} height={30}/>
                  ) : (
                    <>
                      {listChain?.data && listChain?.data?.map((itemChain, index) => (
                        <div
                          className='list-chain-name-content-item'
                          key={index}
                          onClick={(e) => {
                            e.preventDefault()
                            handleClickItemChain(itemChain)
                          }}
                        >
                          <Image src={itemChain?.image} alt='Chain Logo'/>
                          <span style={{ textTransform: 'capitalize' }}>{itemChain?.chainName}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </Col>
          )}
          {category !== EXCHANGE && (
            <Col sm={{ span: 12 }} xs={{ span: 24 }}>
              <Form.Item
                name='chainId'
                label='Blockchain ID'
                value={form.getFieldsValue('chainId')}
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
          <Col sm={{ span: 12 }} xs={{ span: 24 }}>
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
            <Col sm={{ span: 12 }} xs={{ span: 24 }}>
              <Form.Item name='explorer' label='Explore Website'>
                <Input placeholder='Link explorer'/>
              </Form.Item>
            </Col>
          )}
          <Col sm={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item name={['socials', 'twitter']} label='Twitter'>
              <Input placeholder='Twitter'/>
            </Form.Item>
          </Col>
          <Col sm={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item name={['socials', 'discord']} label='Discord'>
              <Input placeholder='Discord'/>
            </Form.Item>
          </Col>
          <Col sm={{ span: 12 }} xs={{ span: 24 }}>
            <Form.Item name={['socials', 'telegram']} label='Telegram'>
              <Input placeholder='Telegram'/>
            </Form.Item>
          </Col>
          {category !== CRYPTO && (
            <Col sm={{ span: 12 }} xs={{ span: 24 }}>
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
              <Col sm={{ span: 12 }} xs={{ span: 24 }}>
                <Form.Item name='thumbLogo' label='Project avatar'>
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
              <Form.Item
                name='sources'
                label='Proof scam'
              >
                <Input.TextArea rows={3} placeholder='Enter proof scam'/>
              </Form.Item>
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
            <button className='me-2 btn btn-success'>Submit</button>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}

export default ModalAdd
