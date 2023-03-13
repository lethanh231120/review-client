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

const tradingOnList = [
  { label: 'Uniswap', value: 'isUniswap' },
  { label: 'Pancakeswap', value: 'isPancakeswap' },
  { label: 'Binance', value: 'isBinance' },
  { label: 'Coinbase', value: 'isCoinbase' }
]

const DrawerFilter = ({ type, handleFilter }) => {
  const cryptoTag = useContext(CryptoTagContext)
  const dappTag = useContext(DappTagContext)
  const ventureLocation = useContext(VentureLocationContext)
  const idoTag = useContext(IdoTagContext)
  const idoRoundtype = useContext(IdoRoundTypeContext)

  const [showDrawer, setShowDrawer] = useState(false)
  const [form] = Form.useForm()
  const { Option } = Select
  const [initialValues, setInititalValues] = useState()
  const launchpadContext = useContext(LaunchpadMapContext)
  const [launchpadList, setLaunchpadList] = useState([])
  const [filterCount, setFilterCount] = useState(0)

  useEffect(() =>{
    const temp = Array.from(launchpadContext)?.map(item => ({ label: item[1]?.name, value: item[1]?.launchPadId }))
    temp && setLaunchpadList(launchpadList => [{ label: 'All', value: '' }, ...temp])
  }, [])
  const fromObjectToArray = (stringData) => {
    const arr = []
    const parsedData = JSON.parse(stringData)
    parsedData && Object.keys(parsedData)?.forEach(key => {
      if (!_.isEmpty(parsedData[key]) || key === 'isWarning' || key === 'isScam') {
        arr.push({ name: key, value: parsedData[key] })
      }
    })
    return arr
  }
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
    if (window.localStorage.getItem(type)) {
      const savedData = JSON.parse(window.localStorage.getItem(type))
      Object.keys(savedData).forEach(key => {
        if (!_.isEmpty(savedData[key]) || key === 'isWarning' || key === 'isScam') {
          count++
        }
      })
    }

    setFilterCount(count)
  }, [])

  useEffect(() => {
    setFormNewData()
  }, [showDrawer])

  const openDrawer = (type) => {
    setShowDrawer(true)
  }

  const closeDrawer = () => {
    setShowDrawer(false)
  }

  const onResetClicked = () => {
    window.localStorage.removeItem(type)
    form.resetFields()
  }

  const onFinish = (values) => {
    // SAVE STATE INTO LOCAL STORAGE
    window.localStorage.setItem(type, JSON.stringify(values))
    const filterParams = {}

    // ---------------------------CRYPTO
    if (type === 'crypto') {
      // PRICE
      if (values?.priceUSD?.from >= 0 && values?.priceUSD?.to >= 0) {
        filterParams['priceUSD'] = `${
          values?.priceUSD?.from
        }.${values?.priceUSD?.to}`
      }

      // --MARKET CAP
      if (values?.marketcapUSD?.from >= 0 && values?.marketcapUSD?.to >= 0) {
        filterParams['marketcapUSD'] = `${
          values?.marketcapUSD?.from
        }.${values?.marketcapUSD?.to}`
      }

      // TOTAL LP USD
      if (values?.totalLpUSD?.from >= 0 && values?.totalLpUSD?.from >= 0) {
        filterParams['totalLpUSD'] = `${
          values?.totalLpUSD?.from
        }.${values?.totalLpUSD?.to}`
      }

      // TRADING ON
      if (values?.tradingOn) {
        filterParams['tradingOn'] = values?.tradingOn?.join('.')
      }

      // --TYPE

      if (values?.type) {
        if (values?.type === 'All') {
          filterParams['type'] = ''
        } else {
          filterParams['type'] = values?.type
        }
      }

      if (values?.tag) {
        if (values?.tag === 'All') {
          filterParams['tag'] = ''
        } else {
          filterParams['tag'] = values?.tag
        }
      }

      if (values?.score?.from >= 0 && values?.score?.from >= 0) {
        filterParams['score'] = `${values?.score?.from}.${
          values?.score?.to
        }`
      }

      if (values?.status) {
        const status = values?.status
        if (status === 'isWarning') {
          filterParams['isWarning'] = true
          filterParams['isScam'] = ''
        }
        if (status === 'isScam') {
          filterParams['isScam'] = true
          filterParams['isWarning'] = ''
        }
        if (status === 'safe') {
          filterParams['isWarning'] = false
          filterParams['isScam'] = false
        }
        if (status === 'none') {
          filterParams['isWarning'] = ''
          filterParams['isScam'] = ''
        }
      }
    }
    // ---------------------------DAPP
    if (type === 'dapp') {
      // --VOLUME 24H
      if (values?.volume24h?.from >= 0 && values?.volume24h?.to >= 0) {
        filterParams['volume24h'] = `${
          values?.volume24h?.from
        }.${values?.volume24h?.to}`
      }

      // --USER 24H
      if (values?.user24h?.from >= 0 && values?.user24h?.to >= 0) {
        filterParams['user24h'] = `${values?.user24h?.from}.${
          values?.user24h?.to
        }`
      }

      // --TVL
      if (values?.balance?.from >= 0 && values?.balance?.to >= 0) {
        filterParams['balance'] = `${values?.balance?.from}.${
          values?.balance?.to
        }`
      }

      // ------=---------TAG
      if (values?.tag) {
        if (values?.tag === 'All') {
          filterParams['tag'] = ''
        } else {
          filterParams['tag'] = values?.tag
        }
      }

      if (values?.status) {
        const status = values?.status
        if (status === 'isWarning') {
          filterParams['isWarning'] = true
          filterParams['isScam'] = ''
        }
        if (status === 'isScam') {
          filterParams['isScam'] = true
          filterParams['isWarning'] = ''
        }
        if (status === 'safe') {
          filterParams['isWarning'] = false
          filterParams['isScam'] = false
        }
        if (status === 'none') {
          filterParams['isWarning'] = ''
          filterParams['isScam'] = ''
        }
      }
    }
    // ---------------------------VENTURE
    if (type === 'venture') {
      // --VOLUME TOTAL FUND
      if (values?.volumeTotalFunds?.from >= 0 && values?.volumeTotalFunds?.to >= 0) {
        filterParams['volumeTotalFunds'] = `${
          values?.volumeTotalFunds?.from
        }.${values?.volumeTotalFunds?.to}`
      }

      // Series A
      if (values?.seriesA?.from >= 0 && values?.seriesA?.to >= 0) {
        filterParams['seriesA'] = `${values?.seriesA?.from}.${
          values?.seriesA?.to
        }`
      }

      // Series B
      if (values?.seriesB?.from >= 0 && values?.seriesB?.to >= 0) {
        filterParams['seriesB'] = `${values?.seriesB?.from}.${
          values?.seriesB?.to
        }`
      }

      // Series C
      if (values?.seriesC?.from >= 0 && values?.seriesC?.to >= 0) {
        filterParams['seriesC'] = `${values?.seriesC?.from}.${
          values?.seriesC?.to
        }`
      }

      if (values?.location) {
        if (values?.location === 'All') {
          filterParams['location'] = ''
        } else {
          filterParams['location'] = values?.location
        }
      }

      // Ico
      if (values?.ico?.from >= 0 && values?.ico?.to >= 0) {
        filterParams['ico'] = `${values?.ico?.from}.${
          values?.ico?.to
        }`
      }

      if (values?.strategic?.from >= 0 && values?.strategic?.to >= 0) {
        filterParams['strategic'] = `${
          values?.strategic?.from
        }.${values?.strategic?.to}`
      }

      if (values?.totalFund?.from >= 0 && values?.totalFund?.to >= 0) {
        filterParams['totalFund'] = `${
          values?.totalFund?.from
        }.${values?.totalFund?.to}`
      }

      if (values?.status) {
        const status = values?.status
        if (status === 'isWarning') {
          filterParams['isWarning'] = true
          filterParams['isScam'] = ''
        }
        if (status === 'isScam') {
          filterParams['isScam'] = true
          filterParams['isWarning'] = ''
        }
        if (status === 'safe') {
          filterParams['isWarning'] = false
          filterParams['isScam'] = false
        }
        if (status === 'none') {
          filterParams['isWarning'] = ''
          filterParams['isScam'] = ''
        }
      }
    }
    // ---------------------------EXCHANGE
    if (type === 'exchange') {
      // --PAIR COUNT
      console.log(values?.pairCount)
      if (values?.pairCount?.from >= 0 && values?.pairCount?.to >= 0) {
        filterParams['pairCount'] = `${
          values?.pairCount?.from
        }.${values?.pairCount?.to}`
      }

      // --VISIT 7D
      if (values?.visit7d?.from >= 0 && values?.visit7d?.to >= 0) {
        filterParams['visit7d'] = `${values?.visit7d?.from}.${
          values?.visit7d?.to
        }`
      }

      // --VOLUME 24H
      if (values?.volume24h?.from >= 0 && values?.volume24h?.to >= 0) {
        filterParams['volume24h'] = `${
          values?.volume24h?.from
        }.${values?.volume24h?.to}`
      }

      // --VOLUME 7D
      if (values?.volume7d?.from >= 0 && values?.volume7d?.to >= 0) {
        filterParams['volume7d'] = `${
          values?.volume7d?.from
        }.${values?.volume7d?.to}`
      }

      // --VOLUME 1M
      if (values?.volume1m?.from >= 0 && values?.volume1m?.to >= 0) {
        filterParams['volume1m'] = `${
          values?.volume1m?.from
        }.${values?.volume1m?.to}`
      }

      if (values?.status) {
        const status = values?.status
        if (status === 'isWarning') {
          filterParams['isWarning'] = true
          filterParams['isScam'] = ''
        }
        if (status === 'isScam') {
          filterParams['isScam'] = true
          filterParams['isWarning'] = ''
        }
        if (status === 'safe') {
          filterParams['isWarning'] = false
          filterParams['isScam'] = false
        }
        if (status === 'none') {
          filterParams['isWarning'] = ''
          filterParams['isScam'] = ''
        }
      }
    }
    // -------------------SOON
    if (type === 'soon') {
      if (values?.roundType) {
        if (values?.roundType === 'All') {
          filterParams['roundType'] = ''
        } else {
          filterParams['roundType'] = values?.roundType
        }
      }

      if (values?.fullyDilutedMarketCap?.from >= 0 && values?.fullyDilutedMarketCap?.to >= 0) {
        filterParams['fullyDilutedMarketCap'] = `${
          values?.fullyDilutedMarketCap?.from
        }.${values?.fullyDilutedMarketCap?.to}`
      }

      if (values?.fundRaisingGoals?.from >= 0 && values?.fundRaisingGoals?.to >= 0) {
        filterParams['fundRaisingGoals'] = `${
          values?.fundRaisingGoals?.from
        }.${values?.fundRaisingGoals?.to}`
      }

      if (values?.tokenPrice?.from >= 0 && values?.tokenPrice?.to >= 0) {
        filterParams['tokenPrice'] = `${
          values?.tokenPrice?.from
        }.${values?.tokenPrice?.to}`
      }

      if (values?.launchpad) {
        filterParams['launchpad'] = values?.launchpad
      }

      if (values?.tag) {
        if (values?.tag === 'All') {
          filterParams['tag'] = ''
        } else {
          filterParams['tag'] = values?.tag
        }
      }
    }
    if (type === 'launchpad') {
      // Market cap
      if (values?.marketCap?.from >= 0 && values?.marketCap?.to >= 0) {
        filterParams['marketCap'] = `${
          values?.marketCap?.from
        }.${
          values?.marketCap?.to
        }`
      }

      // total fund raise
      if (values?.totalFundsRaised?.from >= 0 && values?.totalFundsRaised?.to >= 0) {
        filterParams['totalFundsRaised'] = `${
          values?.totalFundsRaised?.from
        }.${values?.totalFundsRaised?.to}`
      }

      // year founded
      if (values?.yearFounded?.from >= 0 && values?.yearFounded?.to >= 0) {
        filterParams['yearFounded'] = `${
          values?.yearFounded?.from
        }.${values?.yearFounded?.to}`
      }

      // avgRoiCurrent
      if (values?.avgRoiCurrent?.from >= 0 && values?.avgRoiCurrent?.to >= 0) {
        filterParams['avgRoiCurrent'] = `${
          values?.avgRoiCurrent?.from
        }.${values?.avgRoiCurrent?.to}`
      }

      // avgRoiATH
      if (values?.avgRoiATH?.from >= 0 && values?.avgRoiATH?.to >= 0) {
        filterParams['avgRoiATH'] = `${
          values?.avgRoiATH?.from
        }.${values?.avgRoiATH?.to}`
      }

      // colume 24h
      if (values?.volume24h?.from >= 0 && values?.volume24h?.to >= 0) {
        filterParams['volume24h'] = `${
          values?.volume24h?.from
        }.${values?.volume24h?.to}`
      }

      // Score
      if (values?.score?.from >= 0 && values?.score?.to >= 0) {
        filterParams['score'] = `${values?.score?.from}.${
          values?.score?.to
        }`
      }
    }
    handleFilter(filterParams)
    setShowDrawer(false)
  }

  const customDropDown = (options, attr, header) => {
    return <Row >
      <Col span={6}>{header}:</Col>
      <Col span={7}>
        <Form.Item name={[attr, 'from']}
          key={[attr, 'from']}
          validateTrigger='onBlur'
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
            }),
            ({ getFieldValue }) => ({
              validator(rule, value) {
                const max = getFieldValue(attr)?.to
                console.log(max)
                if (max === undefined && value) {
                  return Promise.reject(`Filter range is not valid`)
                }
                if (max && value === undefined) {
                  return Promise.reject(`Filter range is not valid`)
                }
                return Promise.resolve()
              }
            })
          ]}>
          <Select options={options} />
        </Form.Item>
      </Col>
      <Col span={4} className='d-flex justify-content-center mt-1'>To</Col>
      <Col span={7}>
        <Form.Item name={[attr, 'to']} key={[attr, 'to']} validateTrigger='onBlur'
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
            }), ({ getFieldValue }) => ({
              validator(rule, value) {
                const min = getFieldValue(attr)?.from
                if (min === undefined && value) {
                  return Promise.reject(`Filter range is not valid`)
                }
                if (min && value === undefined) {
                  return Promise.reject(`Filter range is not valid`)
                }
                return Promise.resolve()
              }
            })
          ]}>
          <Select options={options}/>
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
      <Button onClick={openDrawer} style={{ background: filterCount === 0 ? '#fff' : '#18A594', color: filterCount === 0 ? 'black' : '#fff' }}>
        <div className='d-flex align-items-center'>
          <FilterOutlined className='me-2'/>
        Filter{ filterCount === 0 ? '' : `(${(filterCount)})`}
        </div>
      </Button>

      <Drawer
        width='40%'
        title={`Filter ${
          type.toString()[0].toUpperCase() + type.toString().substring(1)
        }`}
        placement='right'
        style={{ borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}
        onClose={closeDrawer}
        open={showDrawer}
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
