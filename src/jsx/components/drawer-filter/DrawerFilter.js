import {
  Drawer,
  Button,
  Form,
  Select,
  Row,
  Col
} from 'antd'
import React, { useState, useEffect, useContext } from 'react'
import { FilterOutlined } from '@ant-design/icons'
import './drawer.scss'
import {
  getScoreMarks,
  CRYPTO_MARKETCAP_SELECTION,
  CRYPTO_PRICE_SELECTION,
  DAPP_USER24H_SELECTION,
  VENTURE_SERIES_SELECTION,
  VENTURE_STRATEGIC_SELECTION,
  VENTURE_TOTALFUNDS_SELECTION,
  EXCHANGE_PAIRCOUNT_SELECTION,
  EXCHANGE_VOLUME1M_SELECTION,
  EXCHANGE_VOLUME7D_SELECTION,
  EXCHANGE_VISIT7D_SELECTION,
  SOON_FDMC_SELECTION,
  SOON_GOAL_SELECTION,
  SOON_TOKENPRICE_SELECTION,
  LAUNCHPAD_YEAR_SELECTION,
  LAUNCHPAD_FUNDRAISED_SELECTION,
  LAUNCHPAD_ATHROI_SELECTION,
  LAUNCHPAD_ROICURRENT_SELECTION,
  LAUNCHPAD_MARKETCAP_SELECTION,
  LAUNCHPAD_VOLUME24H_SELECTION
} from './marks.js'
import { CryptoTagContext, DappTagContext, IdoRoundTypeContext, IdoTagContext, LaunchpadMapContext, VentureLocationContext } from '../../../App'
import _ from 'lodash'
import { formatData, fromObjectToArray } from './FilterHelperFunctions'
import { DrawerContext } from '../..'

const tradingOnList = [
  { label: 'Uniswap', value: 'isUniswap' },
  { label: 'Pancakeswap', value: 'isPancakeswap' },
  { label: 'Binance', value: 'isBinance' },
  { label: 'Coinbase', value: 'isCoinbase' }
]

const DrawerFilter = ({ type, handleFilter }) => {
  const cryptoTag = useContext(CryptoTagContext)
  const drawer = useContext(DrawerContext)
  const dappTag = useContext(DappTagContext)
  const ventureLocation = useContext(VentureLocationContext)
  const idoTag = useContext(IdoTagContext)
  const idoRoundtype = useContext(IdoRoundTypeContext)
  const launchpadContext = useContext(LaunchpadMapContext)

  // const [showDrawer, setShowDrawer] = useState(false)
  const [form] = Form.useForm()
  const { Option } = Select
  const [initialValues, setInititalValues] = useState()
  const [launchpadList, setLaunchpadList] = useState([])
  const [filterCount, setFilterCount] = useState(0)

  useEffect(() =>{
    const temp = Array.from(launchpadContext)?.map(item => ({ label: item[1]?.name, value: item[1]?.launchPadId }))
    temp && setLaunchpadList(launchpadList => [{ label: 'All', value: '' }, ...temp])
  }, [])

  const getNewFormData = (key) => {
    if (window.localStorage.getItem(key)) {
      setInititalValues(fromObjectToArray(window.localStorage.getItem(key)))
    }
  }

  const setFormNewData = () => {
    if (type) {
      switch (type) {
        case 'dapp':
          getNewFormData('dapp')
          break
        case 'crypto':
          getNewFormData('crypto')
          break
        case 'exchange':
          getNewFormData('exchange')
          break
        case 'soon':
          getNewFormData('soon')
          break
        case 'venture':
          getNewFormData('venture')
          break
        case 'launchpad':
          getNewFormData('launchpad')
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    let count = 0
    const temp = window.localStorage.getItem(type)
    if (temp) {
      const savedData = JSON.parse(temp)
      savedData && Object.keys(savedData)?.forEach(key => {
        if (!_.isEmpty(savedData[key]) || key === 'isWarning' || key === 'isScam') {
          count++
        }
      })
    }

    setFilterCount(count)
  }, [])

  useEffect(() => {
    setFormNewData()
  }, [drawer?.showDrawer])

  // const openDrawer = (type) => {
  //   setShowDrawer(true)
  // }

  // const closeDrawer = () => {
  //   setShowDrawer(false)
  // }

  const onResetClicked = () => {
    window.localStorage.removeItem(type)
    setReset(!reset)
    form.resetFields()
  }

  // const checkingValues = (from, to, param, name, options) => {
  //   if (from >= 0 && to >= 0) {
  //     param[name] = `${from}.${to}`
  //   }
  //   if (!from && to >= 0) {
  //     param[name] = `0.${to}`
  //   }
  //   if (!to && from >= 0) {
  //     param[name] = `${from}.${options[options?.length - 1]?.value}`
  //   }
  // }

  // const checkingStatus = (status, filterParams) => {
  //   if (status) {
  //     if (status === 'isWarning') {
  //       filterParams['isWarning'] = true
  //       filterParams['isScam'] = ''
  //     }
  //     if (status === 'isScam') {
  //       filterParams['isScam'] = true
  //       filterParams['isWarning'] = ''
  //     }
  //     if (status === 'safe') {
  //       filterParams['isWarning'] = false
  //       filterParams['isScam'] = false
  //     }
  //     if (status === 'none') {
  //       filterParams['isWarning'] = ''
  //       filterParams['isScam'] = ''
  //     }
  //   }
  // }

  const onFinish = (values) => {
    // SAVE STATE INTO LOCAL STORAGE
    window.localStorage.setItem(type, JSON.stringify(values))
    let filterParams = {}

    filterParams = formatData(type)
    handleFilter(filterParams)
    drawer?.handleToggleDrawer(false)
  }

  const [reset, setReset] = useState(false)
  const customDropDown = (options, attr, header) => {
    const [fromList, setFromList] = useState(options)
    const [toList, setToList] = useState(options)

    useEffect(() => {
      setFromList(options)
      setToList(options)
    }, [reset])

    return <Row >
      <Col span={6}>{header}:</Col>
      <Col span={7}>
        <Form.Item name={[attr, 'from']}
          key={[attr, 'from']}
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                const max = getFieldValue(attr)?.to
                if (max) {
                  if (value > max) {
                    return Promise.reject(`Filter range is not valid`)
                  }
                }
                return Promise.resolve()
              }
            })
          ]}
        >
          <Select showAction={['focus', 'click']} options={fromList} onChange={e => {
            setToList(options)
            setToList(toList => toList?.filter(item => item?.value >= e))
          }}/>
        </Form.Item>
      </Col>
      <Col span={4} className='d-flex justify-content-center mt-1'>To</Col>
      <Col span={7}>
        <Form.Item name={[attr, 'to']} key={[attr, 'to']}
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                const min = getFieldValue(attr)?.from
                if (min) {
                  if (value < min) {
                    return Promise.reject(`Filter range is not valid`)
                  }
                }
                return Promise.resolve()
              }
            })
          ]}
        >
          <Select showAction={['focus', 'click']} options={toList} onChange={e => {
            setFromList(options)
            setFromList(fromList => fromList?.filter(item => item?.value <= e))
          }}/>
        </Form.Item></Col>
    </Row>
  }

  const projectStatusDropdown = () => {
    return <Form.Item name='status' label='Project Status'>
      <Select>
        <Option value='isWarning' style={{ color: '#FF8C00' }}>Warning</Option>
        <Option value='isScam' style={{ color: '#FF0000' }}>Scam</Option>
        <Option value='safe'>Safe</Option>
        <Option value='none'>All</Option>
      </Select>
    </Form.Item>
  }

  return (
    <div className='drawer'>
      <Button onClick={() => drawer?.handleToggleDrawer(true)} style={{ background: filterCount === 0 ? '#fff' : '#18A594', color: filterCount === 0 ? 'black' : '#fff' }}>
        <div className='d-flex align-items-center'>
          <FilterOutlined className='me-2'/>
        Filter{ filterCount === 0 ? '' : `(${(filterCount)})`}
        </div>
      </Button>

      <Drawer
        title={`Filter ${
          type.toString()[0].toUpperCase() + type.toString().substring(1)
        }`}
        width={window.innerWidth > 900 ? '50%' : '90%'}
        placement='right'
        style={{ borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}
        onClose={() => drawer?.handleToggleDrawer(false)}
        open={drawer?.showDrawer}
        destroyOnClose={true}
        className='filter'
      >
        <Form form={form} onFinish={onFinish} fields={initialValues}>
          {type === 'crypto' && (
            <>
              <Form.Item name='type' label='Crypto Type'>
                <Select
                  placeholder='Crypto Type'
                  width='100%'
                >
                  <Option value=''>All</Option>
                  <Option value='coin'>Coin</Option>
                  <Option value='token'>Token</Option>
                </Select>
              </Form.Item>
              <Form.Item name='tag' label='Tag'>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  options={
                    cryptoTag &&
                    cryptoTag?.map((item) => ({ label: item, value: item }))
                  }
                />
              </Form.Item>
              {customDropDown(CRYPTO_PRICE_SELECTION, 'priceUSD', 'Price USD')}
              {customDropDown(CRYPTO_MARKETCAP_SELECTION, 'marketcapUSD', 'Market Cap USD')}
              {customDropDown(CRYPTO_MARKETCAP_SELECTION, 'totalLpUSD', 'Total LP USD')}

              <Form.Item name='tradingOn' label='Trading On'>
                <Select
                  mode='multiple'
                  options={tradingOnList}
                  placeholder='Exchanges'
                ></Select>
              </Form.Item>

              {customDropDown(getScoreMarks('crypto'), 'score', 'Score')}
              {projectStatusDropdown()}
            </>

          )}

          {
            type === 'dapp' &&
               (<>
                 {customDropDown(CRYPTO_MARKETCAP_SELECTION, 'volume24h', 'Volume 24H')}
                 {customDropDown(DAPP_USER24H_SELECTION, 'user24h', 'User 24H')}
                 {customDropDown(CRYPTO_MARKETCAP_SELECTION, 'balance', 'Balance')}

                 <Form.Item name='tag' label='Tag'>
                   <Select
                     placeholder='Tag'
                     showSearch
                     style={{ width: '100%' }}
                     options={
                       dappTag &&
                       dappTag?.map((item) => ({ label: item, value: item }))
                     }
                   />
                 </Form.Item>

                 {projectStatusDropdown()}
               </>)
          }

          {type === 'venture' && (
            <>
              {customDropDown(VENTURE_SERIES_SELECTION, 'seriesA', 'Series A')}
              {customDropDown(VENTURE_SERIES_SELECTION, 'seriesB', 'Series B')}
              {customDropDown(VENTURE_SERIES_SELECTION, 'seriesC', 'Series C')}
              {customDropDown(VENTURE_SERIES_SELECTION, 'ico', 'ICO')}
              {customDropDown(VENTURE_STRATEGIC_SELECTION, 'strategic', 'Strategic')}
              {customDropDown(VENTURE_TOTALFUNDS_SELECTION, 'totalFund', 'Total Fund')}
              {customDropDown(CRYPTO_MARKETCAP_SELECTION, 'volumeTotalFunds', 'Volume Total Fund')}

              <Form.Item name='location' label='Location'>
                <Select
                  placeholder='Location'
                  showSearch
                  options={ventureLocation && ventureLocation?.map((item) => ({
                    label: item,
                    value: item
                  }))}
                />
              </Form.Item>

              {projectStatusDropdown()}
            </>
          )}

          {type === 'exchange' && (
            <>
              {customDropDown(EXCHANGE_PAIRCOUNT_SELECTION, 'pairCount', 'Pair Count')}
              {customDropDown(CRYPTO_MARKETCAP_SELECTION, 'volume24h', 'Volume 24H')}
              {customDropDown(EXCHANGE_VOLUME7D_SELECTION, 'volume7d', 'Volume 7D')}
              {customDropDown(EXCHANGE_VOLUME1M_SELECTION, 'volume1m', 'Volume 1M')}
              {customDropDown(EXCHANGE_VISIT7D_SELECTION, 'visit7d', 'Visit 7D')}

              {projectStatusDropdown()}
            </>
          )}

          {type === 'soon' && (
            <>
              <Form.Item name='roundType' label='Round Type'>
                <Select
                  showSearch
                  placeholder='Round Type'
                  width='100%'
                  options={idoRoundtype && idoRoundtype?.map((item) => ({
                    label: item,
                    value: item
                  }))}
                ></Select>
              </Form.Item>

              <Form.Item name='tag' label='Tag'>
                <Select
                  showSearch
                  placeholder='Tag'
                  width='100%'
                  options={idoTag && idoTag?.map((item) => ({
                    label: item,
                    value: item
                  }))}
                ></Select>
              </Form.Item>
              {customDropDown(SOON_FDMC_SELECTION, 'fullyDilutedMarketCap', 'Market Cap')}
              {customDropDown(SOON_GOAL_SELECTION, 'fundRaisingGoals', 'Goal')}
              {customDropDown(SOON_TOKENPRICE_SELECTION, 'tokenPrice', 'Token Price')}

              <Form.Item name='launchpad' label='Launchpad'>
                <Select
                  showSearch
                  placeholder='Launchpad'
                  width='100%'
                  options={launchpadList}
                ></Select>
              </Form.Item>
            </>
          )}

          {
            type === 'launchpad' &&
              <>
                {customDropDown(LAUNCHPAD_YEAR_SELECTION, 'yearFounded', 'Founded Year')}
                {customDropDown(LAUNCHPAD_FUNDRAISED_SELECTION, 'totalFundsRaised', 'Raised')}
                {customDropDown(LAUNCHPAD_ROICURRENT_SELECTION, 'avgRoiCurrent', 'AVG ROI Current')}
                {customDropDown(LAUNCHPAD_ATHROI_SELECTION, 'avgRoiATH', 'AVG ATH ROI')}
                {customDropDown(LAUNCHPAD_MARKETCAP_SELECTION, 'marketCap', 'Market Cap')}
                {customDropDown(LAUNCHPAD_VOLUME24H_SELECTION, 'volume24h', 'Volume 24H')}
                {customDropDown(getScoreMarks('launchpad'), 'score', 'Score')}
              </>
          }

          <div>
            <Button htmlType='text' style={{ backgroundColor: '#18A594', color: '#fff', borderColor: '#18A594', minWidth: '6.875rem' }} >
              Filter
            </Button>{' '}
            <Button onClick={onResetClicked} type='dashed' style={{ minWidth: '6.875rem' }}>
              Reset
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  )
}

export default DrawerFilter
