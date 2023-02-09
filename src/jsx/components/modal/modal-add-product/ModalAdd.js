import React, { useState, useRef, useContext, useEffect } from 'react'
import './add.scss'
import { Select, Form, Row, Col, Input, Checkbox, Upload } from 'antd'
import { Button } from 'react-bootstrap'
// import { DAPP, EXCHANGE, CRYPTO } from '../../../constants/category'
import { DAPP, EXCHANGE, CRYPTO } from '../../../constants/category'
import ReCAPTCHA from 'react-google-recaptcha'
import { getCookie, STORAGEKEY } from '../../../../utils/storage'
import { post } from '../../../../api/BaseRequest'
import moment from 'moment'
import { explorers } from '../../../../utils/ExplorerScan'
// import { CheckCircleOutlined } from '@ant-design/icons'
import { CategoryContext } from '../../../../App'

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
const ModalAdd = ({ openModalAdd, setOpenModalAdd, logout }) => {
  const TOKEN = 'token'
  // const ref = useRef()
  const categoryContext = useContext(CategoryContext)
  const [form] = Form.useForm()
  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  const categories = [
    {
      value: CRYPTO,
      label: 'Crypto Projects'
    },
    {
      value: EXCHANGE,
      label: 'Exchanges'
    },
    {
      value: DAPP,
      label: 'DApps'
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

  // const openNotification = (title, content) => {
  //   notification.open({
  //     message: title,
  //     description: content,
  //     duration: 2,
  //     icon: (
  //       <CheckCircleOutlined style={{ color: 'green' }}/>
  //     )
  //   })
  // }

  // const sendData = async(data) => {
  //   try {
  //     let res
  //     if (category === CRYPTO) {
  //       res = await post('reviews/crypto/upload', data)
  //     }
  //     if (category === EXCHANGE) {
  //       res = await post('reviews/exchange/upload', data)
  //     }
  //     if (category === DAPP) {
  //       res = await post('reviews/dapp/upload', data)
  //     }
  //     if (res?.status) {
  //       setOpenModalAdd(false)
  //       handleReset()
  //       openNotification(`Add ${category} successfully. Please wait for admin to confirm`)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     openNotification(`Unable to add products. Please check again`, error)
  //   }
  // }

  const onFinish = async(e) => {
    e.preventDefault()
    console.log(e.target.category.value)
    console.log(e.target.abc.value)
    console.log(e.target.desc.value)
    console.log(e.target.checked.checked)
    console.log(e.target.multiple.value)
    // const recaptchaValue = recapcharRef.current.getValue()
    // if (recaptchaValue) {
    //   let body = {}
    //   if (category === CRYPTO) {
    //     body = {
    //       name: values?.name,
    //       type: values?.type,
    //       symbol: values?.symbol,
    //       address: values?.address,
    //       chainName: values?.chainName,
    //       thumbLogo: data?.image,
    //       bigLogo: data?.image,
    //       smallLogo: data?.image,
    //       description: values?.description,
    //       website: values?.website,
    //       explorer: values?.explorer,
    //       socials: values?.socials,
    //       isScam: data?.isScam,
    //       isWarning: values?.isWarning,
    //       proof: (!data?.isScam && !data?.isWarning) ? null : {
    //         'isScam': (data?.isScam && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null,
    //         'isWarning': (data?.isWarning && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null
    //       },
    //       chainId: values?.chainId,
    //       decimal: null
    //     }
    //   }
    //   if (category === EXCHANGE) {
    //     console.log(values)
    //     body = {
    //       name: values?.name,
    //       subCategory: values?.subCategory,
    //       thumbLogo: data?.image,
    //       smallLogo: data?.image,
    //       bigLogo: data?.image,
    //       description: values?.description,
    //       website: values?.website,
    //       socials: values?.socials,
    //       isScam: values?.isScam,
    //       isWarning: values?.isWarning,
    //       proof: (!data?.isScam && !data?.isWarning) ? null : {
    //         'isScam': (data?.isScam && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null,
    //         'isWarning': (data?.isWarning && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null
    //       }
    //     }
    //   }
    //   if (category === DAPP) {
    //     // "chains":{
    //     //     "ethereum": "1"
    //     // }
    //     const chains = {}
    //     console.log(values)
    //     chains[values?.chainName] = values?.chainId
    //     body = {
    //       name: values?.name,
    //       logo: data?.image,
    //       description: values?.description,
    //       website: values?.website,
    //       subCategory: values?.subCategory,
    //       socials: values?.socials,
    //       isScam: values?.isScam,
    //       isWarning: values?.isWarning,
    //       chains: chains,
    //       proof: (!data?.isScam && !data?.isWarning) ? null : {
    //         'isScam': (data?.isScam && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null,
    //         'isWarning': (data?.isWarning && (!_.isEmpty(data?.sources))) ? data?.sources?.join(',') : null
    //       }
    //     }
    //   }
    //   if (data?.isScam) {
    //     if (!_.isEmpty(data?.sources)) {
    //       sendData(body)
    //     } else {
    //       setErrorLink('Link proof is required')
    //     }
    //   } else {
    //     sendData(body)
    //   }
    // } else {
    //   setIsRecaptcha(true)
    // }
  }

  // chose file in select
  const handleChangeFile = async(e) => {
    setFileList(e.fileList)
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

  const changeSelect = (value) => {
    const correct = []
    explorers?.forEach((item) => {
      const isCorrect = value?.includes(item)
      correct.push(isCorrect)
    })
    setErrorLink(correct?.some((item) => item === true) ? '' : 'Link explorer is not valid')
  }

  const handleChangeType = (value) => {
    setData({
      ...data,
      type: value
    })
  }

  // const handleResetForm = () => {
  //   ref.current.reset()
  // }

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        fields={defaultValue}
        layout='vertical'
        className='add'
      >
        <Row gutter={[12]}>
          <Col span={12}>
            <Form.Item
              label='Category'
              className='cus-select'
            >
              <Select
                defaultValue={category}
                // style={{ width: '100%' }}
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
              <Input autoComplete={false}/>
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
                <Input/>
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
                <Input/>
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
                <Input/>
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
                <Input/>
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
              <Input/>
            </Form.Item>
          </Col>
          {category === CRYPTO && (
            <Col span={12}>
              <Form.Item name='explorer' label='Explore Website'>
                <Input/>
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item name={['socials', 'twitter']} label='Twitter'>
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['socials', 'discord']} label='Discord'>
              <Input/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['socials', 'telegram']} label='Telegram'>
              <Input/>
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
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    listType='picture-card'
                    fileList={fileList}
                    onChange={handleChangeFile}
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
                placeholder='Please enter proof link …'
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
              <Input.TextArea rows={4}/>
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{
            background: isRecaptcha ? 'red' : '',
            border: `0.1px solid ${isRecaptcha ? 'red' : 'rgba(0, 0, 0, 0.01'}`,
            width: '305px',
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
            <Button className='me-2' variant='danger' onClick={handleReset}>
                Reset Data
            </Button>
          </Form.Item>
          <Form.Item>
            <Button variant='success' htmlType='submit' className='me-2'>
                Add Product
            </Button>
          </Form.Item>
        </div>
      </Form>
      {/* <form
        ref={ref}
        onSubmit={(e) => onFinish(e)}
        className='form-valide'
      >
        <div className='row'>
          <div className='form-group mb-3 col-md-6'>
            <label
              className='col-lg-4 col-form-label'
              htmlFor='category'
            >
              Category
            </label>
            <select
              defaultValue={category}
              id='category'
              className='form-control'
              onChange={handleChangeCategory}
            >
              <option value={CRYPTO}>Crypto Project</option>
              <option value={EXCHANGE}>Exchange</option>
              <option value={DAPP}>DApp</option>
            </select>
          </div>
          <div className='form-group mb-3 col-md-6'>
            <label
              className='col-lg-4 col-form-label'
              htmlFor='category'
            >
              Type
              <span className='text-danger'>*</span>
            </label>
            <select
              defaultValue={data?.type}
              id='category'
              className='form-control'
              onChange={handleChangeType}
            >
              <option value='token'>Token</option>
              <option value='coin'>Coin</option>
            </select>
          </div>
          <div className='form-group mb-3 col-md-6'>
            <label
              className='col-lg-4 col-form-label'
              htmlFor='category'
            >
              Category <span className='text-danger'>*</span>
            </label>
            <input
              type='text'
              className='form-control'
              id='category'
              name='category'
              placeholder='Your valid email..'
            />
          </div>
          <div className='form-group mb-3 col-md-6'>
            <label
              className='col-lg-4 col-form-label'
              htmlFor='abc'
            >
              abc <span className='text-danger'>*</span>
            </label>
            <select
              defaultValue={'option'}
              id='abc'
              name='abc'
              className='form-control'
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className='form-group mb-3 col-md-6'>
            <label
              className='col-lg-4 col-form-label'
              htmlFor='abc'
            >
              abc <span className='text-danger'>*</span>
            </label>
            <select
              defaultValue={'option'}
              id='multiple'
              name='multiple'
              className='form-control'
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className='form-group mb-3 col-md-6'>
            <div className='form-check custom-checkbox mb-3 checkbox-success'>
              <input
                type='checkbox'
                defaultChecked
                className='form-check-input'
                id='checked'
                name='checked'
              />
              <label
                className='form-check-label'
                htmlFor='checked'
              >
                      Checkbox 3
              </label>

            </div>
          </div>
          <div className='form-group mb-3 col-12'>
            <label
              className='form-check-label'
              htmlFor='desc'
            >
                      Description
            </label>
            <textarea
              className='form-txtarea form-control'
              rows='4'
              id='desc'
              name='desc'
            ></textarea>

          </div>
        </div>
        <button type='submit' className='btn btn-primary'>
                   submit
        </button>
        <button onClick={handleResetForm} className='btn btn-primary'>
                            Submit
        </button>
      </form> */}
    </>
  )
}

export default ModalAdd