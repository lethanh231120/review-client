import {
  Drawer,
  Button,
  Collapse,
  Form,
  Slider,
  Select,
  Checkbox,
  Row,
  Col
} from 'antd'
import React, { useState, useEffect, useContext } from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import { FilterOutlined } from '@ant-design/icons'
import './drawer.scss'
import { get } from '../../../api/BaseRequest'
import {
  pairCountMarks,
  visit7dMarks,
  fullyDilutedMarketCapMarks,
  totalFundsMarks,
  // tvlMarks,
  seriesMarks,
  marketCapMarks,
  priceUSDMarks,
  userMarks,
  strategicMarks,
  volume1mMarks,
  volume7dMarks,
  fundRaisingGoalsMarks,
  tokenPriceMarks,
  getScoreMarks,
  launchpadFoundedYearMarks,
  launchpadFundRaisedMarks,
  launchpadAvgRoiCurrentMarks,
  launchpadAvgRoiATHMarks,
  launchpadMarketcapMarks,
  launchpadVolume24hMarks
} from './marks.js'
import { cryptoFilterDefaultValue, dappFilterDefaultValue, exchangeFilterDefaultValue, fromObjectToArray, launchpadFilterDefaultValue, soonFilterDefaultValue, ventureFilterDefaultValue } from './defaultValues'
import { LaunchpadMapContext } from '../../../App'

const tradingOnList = [
  { label: 'Uniswap', value: 'isUniswap' },
  { label: 'Pancakeswap', value: 'isPancakeswap' },
  { label: 'Binance', value: 'isBinance' },
  { label: 'Coinbase', value: 'isCoinbase' }
]

const DrawerFilter = ({ type, handleFilter }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const { Panel } = Collapse
  const [form] = Form.useForm()
  const [tagList, setTagList] = useState([])
  const { Option } = Select
  const [cryptoType, setCryptoType] = useState('')
  const [location, setLocation] = useState([])
  const [roundType, setRoundType] = useState([])
  const [initialValues, setInititalValues] = useState()
  const launchpadContext = useContext(LaunchpadMapContext)
  const [filterCount, setFilterCount] = useState(0)
  const [defautlActiveKey, setDefaultActiveKey] = useState([])

  const mapDefaultOpenPanel = () => {
    const data = []
    const savedStates = window.localStorage.getItem(type) && JSON.parse(window.localStorage.getItem(type))
    savedStates && Object.keys(savedStates)?.forEach(key => {
      data.push(key)
    })

    setDefaultActiveKey(data)
  }

  const getNewFormData = (key, defaultValue) => {
    if (!window.localStorage.getItem(key)) {
      setInititalValues(defaultValue)
    } else {
      setInititalValues(fromObjectToArray(window.localStorage.getItem(key)))
    }
  }

  const setFormNewData = () => {
    if (type) {
      switch (type) {
        case 'dapp':
          getNewFormData('dapp', dappFilterDefaultValue)
          break
        case 'crypto':
          getNewFormData('crypto', cryptoFilterDefaultValue)
          break
        case 'exchange':
          getNewFormData('exchange', exchangeFilterDefaultValue)
          break
        case 'soon':
          getNewFormData('soon', soonFilterDefaultValue)
          break
        case 'venture':
          getNewFormData('venture', ventureFilterDefaultValue)
          break
        case 'launchpad':
          getNewFormData('launchpad', launchpadFilterDefaultValue)
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    let count = 0
    if (window.localStorage.getItem(type)) {
      count = Object.keys(JSON.parse(window.localStorage.getItem(type))).length
    }
    setFilterCount(count)
  }, [])

  useEffect(() => {
    setFormNewData()
    mapDefaultOpenPanel()
  }, [])

  const openDrawer = (type) => {
    setShowDrawer(true)
  }

  const closeDrawer = () => {
    setShowDrawer(false)
  }

  const onResetClicked = () => {
    if (window.localStorage.getItem(type)) {
      window.localStorage.removeItem(type)
    }
    form.resetFields()
  }

  const getCryptoTag = async() => {
    if (type === 'crypto') {
      const res = await get(`reviews/tag?type=${cryptoType}`)
      setTagList(res?.data)
    }
  }

  const getOtherTag = async() => {
    if (showDrawer) {
      if (type === 'dapp') {
        const res = await get('reviews/tag?type=dapp')
        setTagList(res?.data)
      } else if (type === 'exchange') {
        const res = await get('reviews/tag?type=exchange')
        setTagList(res?.data)
      } else if (type === 'soon') {
        const res = await get('reviews/tag?type=soon')
        setTagList(res?.data)
      }
    }
  }

  const getLocation = async() => {
    if (showDrawer) {
      const res = await get('reviews/location')
      setLocation(res?.data)
    }
  }

  const getRoundType = async() => {
    if (showDrawer) {
      const res = await get('reviews/roundtype')
      setRoundType(res?.data)
    }
  }

  useEffect(() => {
    cryptoType && getCryptoTag()
  }, [cryptoType])

  useEffect(() => {
    if (type === 'venture') {
      getLocation()
    }
    if (type === 'soon') {
      getRoundType()
      getOtherTag()
    } else {
      getOtherTag()
    }
  }, [showDrawer])

  const onFinish = (values) => {
    // SAVE STATE INTO LOCAL STORAGE
    window.localStorage.setItem(type, JSON.stringify(values))
    const filterParams = {}

    // ---------------------------CRYPTO
    if (type === 'crypto') {
      // PRICE
      if (values?.priceUSD) {
        filterParams['priceUSD'] = `${
          priceUSDMarks[values?.priceUSD[0]]?.value
        }.${priceUSDMarks[values?.priceUSD[1]]?.value}`
      }

      // --MARKET CAP
      if (values?.marketCap) {
        filterParams['marketcapUSD'] = `${
          marketCapMarks[values?.marketCap[0]]?.value
        }.${marketCapMarks[values?.marketCap[1]]?.value}`
      }

      // TOTAL LP USD
      if (values?.totalLpUSD) {
        filterParams['totalLpUSD'] = `${
          marketCapMarks[values?.totalLpUSD[0]]?.value
        }.${marketCapMarks[values?.totalLpUSD[1]]?.value}`
      }

      // TRADING ON
      if (values?.tradingOn) {
        filterParams['tradingOn'] = values?.tradingOn?.join('.')
      }

      // --TYPE
      if (values?.type) {
        filterParams['type'] = values?.type
      }

      if (values?.tag) {
        filterParams['tag'] = values?.tag
      }

      if (values?.score) {
        filterParams['score'] = `${getScoreMarks('crypto')[values?.score[0]]?.value}.${
          getScoreMarks('crypto')[values?.score[1]]?.value
        }`
      }
      // --IS SCAM
      if (values?.isScam) {
        filterParams['isScam'] = values?.isScam
      }
      // --IS WARNING
      if (values?.isWarning) {
        filterParams['isWarning'] = values?.isWarning
      }
    }
    // ---------------------------DAPP
    if (type === 'dapp') {
      // --VOLUME 24H
      if (values?.volume24h) {
        filterParams['volume24h'] = `${
          marketCapMarks[values?.volume24h[0]]?.value
        }.${marketCapMarks[values?.volume24h[1]]?.value}`
      }

      // --USER 24H
      if (values?.user24h) {
        filterParams['user24h'] = `${userMarks[values?.user24h[0]]?.value}.${
          userMarks[values?.user24h[1]]?.value
        }`
      }

      // --TVL
      if (values?.balance) {
        filterParams['balance'] = `${marketCapMarks[values?.balance[0]]?.value}.${
          marketCapMarks[values?.balance[1]]?.value
        }`
      }

      // ------=---------TAG
      if (values?.tag) {
        filterParams['tag'] = values?.tag
      }

      if (values?.isScam) {
        filterParams['isScam'] = values?.isScam
      }
      // --IS WARNING
      if (values?.isWarning) {
        filterParams['isWarning'] = values?.isWarning
      }
    }
    // ---------------------------VENTURE
    if (type === 'venture') {
      // --VOLUME TOTAL FUND
      if (values?.volumeTotalFunds) {
        filterParams['volumeTotalFunds'] = `${
          marketCapMarks[values?.volumeTotalFunds[0]]?.value
        }.${marketCapMarks[values?.volumeTotalFunds[1]]?.value}`
      }

      // Series A
      if (values?.seriesA) {
        filterParams['seriesA'] = `${seriesMarks[values?.seriesA[0]]?.value}.${
          seriesMarks[values?.seriesA[1]]?.value
        }`
      }

      // Series B
      if (values?.seriesB) {
        filterParams['seriesB'] = `${seriesMarks[values?.seriesB[0]]?.value}.${
          seriesMarks[values?.seriesB[1]]?.value
        }`
      }

      // Series C
      if (values?.seriesC) {
        filterParams['seriesC'] = `${seriesMarks[values?.seriesC[0]]?.value}.${
          seriesMarks[values?.seriesC[1]]?.value
        }`
      }

      if (values?.location) {
        filterParams['location'] = values?.location
      }

      // Ico
      if (values?.ico) {
        filterParams['ico'] = `${seriesMarks[values?.ico[0]]?.value}.${
          seriesMarks[values?.ico[1]]?.value
        }`
      }

      if (values?.strategic) {
        filterParams['strategic'] = `${
          strategicMarks[values?.strategic[0]]?.value
        }.${strategicMarks[values?.strategic[1]]?.value}`
      }

      if (values?.totalFund) {
        filterParams['totalFund'] = `${
          totalFundsMarks[values?.totalFund[0]]?.value
        }.${totalFundsMarks[values?.totalFund[1]]?.value}`
      }

      if (values?.isScam) {
        filterParams['isScam'] = values?.isScam
      }
      // --IS WARNING
      if (values?.isWarning) {
        filterParams['isWarning'] = values?.isWarning
      }
    }
    // ---------------------------EXCHANGE
    if (type === 'exchange') {
      // --PAIR COUNT
      if (values?.pairCount) {
        filterParams['pairCount'] = `${
          pairCountMarks[values?.pairCount[0]]?.value
        }.${pairCountMarks[values?.pairCount[1]]?.value}`
      }

      // --VISIT 7D
      if (values?.visit7d) {
        filterParams['visit7d'] = `${visit7dMarks[values?.visit7d[0]]?.value}.${
          visit7dMarks[values?.visit7d[1]]?.value
        }`
      }

      // --VOLUME 24H
      if (values?.volume24h) {
        filterParams['volume24h'] = `${
          marketCapMarks[values?.volume24h[0]]?.value
        }.${marketCapMarks[values?.volume24h[1]]?.value}`
      }

      // --VOLUME 7D
      if (values?.volume7d) {
        filterParams['volume7d'] = `${
          volume7dMarks[values?.volume7d[0]]?.value
        }.${volume7dMarks[values?.volume7d[1]]?.value}`
      }

      // --VOLUME 1M
      if (values?.volume1m) {
        filterParams['volume1m'] = `${
          volume1mMarks[values?.volume1m[0]]?.value
        }.${volume1mMarks[values?.volume1m[1]]?.value}`
      }

      if (values?.isScam) {
        filterParams['isScam'] = values?.isScam
      }
      // --IS WARNING
      if (values?.isWarning) {
        filterParams['isWarning'] = values?.isWarning
      }
    }
    // -------------------SOON
    if (type === 'soon') {
      if (values?.roundType) {
        filterParams['roundType'] = values?.roundType
      }

      if (values?.fullyDilutedMarketCap) {
        filterParams['fullyDilutedMarketCap'] = `${
          fullyDilutedMarketCapMarks[values?.fullyDilutedMarketCap[0]]?.value
        }.${
          fullyDilutedMarketCapMarks[values?.fullyDilutedMarketCap[1]]?.value
        }`
      }

      if (values?.fundRaisingGoals) {
        filterParams['fundRaisingGoals'] = `${
          fundRaisingGoalsMarks[values?.fundRaisingGoals[0]]?.value
        }.${fundRaisingGoalsMarks[values?.fundRaisingGoals[1]]?.value}`
      }

      if (values?.tokenPrice) {
        filterParams['tokenPrice'] = `${
          tokenPriceMarks[values?.tokenPrice[0]]?.value
        }.${tokenPriceMarks[values?.tokenPrice[1]]?.value}`
      }

      if (values?.launchpad) {
        filterParams['launchpad'] = values?.launchpad
      }

      if (values?.tag) {
        filterParams['tag'] = values?.tag
      }
    }
    if (type === 'launchpad') {
      // Market cap
      if (values?.marketCap) {
        filterParams['marketCap'] = `${
          launchpadMarketcapMarks[values?.marketCap[0]]?.value
        }.${
          launchpadMarketcapMarks[values?.marketCap[1]]?.value
        }`
      }

      // total fund raise
      if (values?.totalFundsRaised) {
        filterParams['totalFundsRaised'] = `${
          launchpadFundRaisedMarks[values?.totalFundsRaised[0]]?.value
        }.${launchpadFundRaisedMarks[values?.totalFundsRaised[1]]?.value}`
      }

      // year founded
      if (values?.yearFounded) {
        filterParams['yearFounded'] = `${
          launchpadFoundedYearMarks[values?.yearFounded[0]]?.value
        }.${launchpadFoundedYearMarks[values?.yearFounded[1]]?.value}`
      }

      // avgRoiCurrent
      if (values?.avgRoiCurrent) {
        filterParams['avgRoiCurrent'] = `${
          launchpadAvgRoiCurrentMarks[values?.avgRoiCurrent[0]]?.value
        }.${launchpadAvgRoiCurrentMarks[values?.avgRoiCurrent[1]]?.value}`
      }

      // avgRoiATH
      if (values?.avgRoiATH) {
        filterParams['avgRoiATH'] = `${
          launchpadAvgRoiATHMarks[values?.avgRoiATH[0]]?.value
        }.${launchpadAvgRoiATHMarks[values?.avgRoiATH[1]]?.value}`
      }

      // colume 24h
      if (values?.volume24h) {
        filterParams['volume24h'] = `${
          launchpadVolume24hMarks[values?.volume24h[0]]?.value
        }.${launchpadVolume24hMarks[values?.volume24h[1]]?.value}`
      }

      // Score
      if (values?.score) {
        filterParams['score'] = `${getScoreMarks('launchpad')[values?.score[0]]?.value}.${
          getScoreMarks('launchpad')[values?.score[1]]?.value
        }`
      }
    }

    handleFilter(filterParams)
    setShowDrawer(false)
  }

  const CustomSlider = (header, key, marks) =>{
    return <Panel header={header} className='filter-item' key={key}>
      <Form.Item name={key}>
        <Slider
          range
          defaultValue={[0, Object.keys(marks)?.length - 1]}
          marks={marks}
          min={0}
          max={Object.keys(marks)?.length - 1 }
        />
      </Form.Item>
    </Panel>
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
        width='50%'
        title={`Filter ${
          type.toString()[0].toUpperCase() + type.toString().substring(1)
        }`}
        placement='right'
        onClose={closeDrawer}
        open={showDrawer}
        destroyOnClose={true}
        className='filter'
      >
        <Form form={form} onFinish={onFinish} fields={initialValues} >
          <Collapse
            defaultActiveKey={defautlActiveKey}
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{ display: 'block' }}
          >
            {type === 'crypto' && (
              <>
                <Panel header='Type' className='filter-item' key='type'>
                  <Form.Item name='type'>
                    <Select
                      placeholder='Crypto Type'
                      onChange={(e) => setCryptoType(e)}
                      width='100%'
                    >
                      <Option value='coin'>Coin</Option>
                      <Option value='token'>Token</Option>
                    </Select>
                  </Form.Item>
                </Panel>

                {CustomSlider('Market Cap', 'marketCap', marketCapMarks)}
                {CustomSlider('Price', 'priceUSD', priceUSDMarks)}
                {CustomSlider('Total LP', 'totalLpUSD', marketCapMarks)}

                <Panel header='Trading On' className='filter-item' key='tradingOn'>
                  <Form.Item name='tradingOn'>
                    <Select
                      mode='multiple'
                      options={tradingOnList}
                      placeholder='Exchanges'
                    ></Select>
                  </Form.Item>
                </Panel>

                <Panel header='Tag' className='filter-item' key='tag'>
                  <Form.Item name='tag'>
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      options={
                        tagList &&
                      tagList?.map((item) => ({ label: item, value: item }))
                      }
                    />
                  </Form.Item>
                </Panel>

                { CustomSlider('Score', 'score', getScoreMarks('crypto'))}

                <Row style={{ width: '100%', display: 'flex' }}>
                  <Col span={11}>
                    { (
                      // -------------------- <div>
                      <Form.Item
                        name='isWarning'
                        label='Warning:'
                        valuePropName='checked'
                      >
                        <Checkbox />
                      </Form.Item>
                    )}
                  </Col>

                  { (
                    <Form.Item name='isScam' label='Scam' valuePropName='checked'>
                      <Checkbox />
                    </Form.Item>
                  )}
                </Row>

              </>

            )}

            {
              type === 'dapp' &&
               (<>
                 {CustomSlider('Volume 24h', 'volume24h', marketCapMarks)}
                 {CustomSlider('User 24h', 'user24h', userMarks)}
                 {CustomSlider('Balance', 'balance', marketCapMarks)}

                 <Panel header='Tag' className='filter-item' key='tag'>
                   <Form.Item name='tag'>
                     <Select
                       showSearch
                       style={{ width: '100%' }}
                       options={
                         tagList &&
                    tagList?.map((item) => ({ label: item, value: item }))
                       }
                     />
                   </Form.Item>
                 </Panel>

                 {/* { CustomSlider('Score', 'score', getScoreMarks('dapp'))} */}

                 <Row style={{ width: '100%', display: 'flex' }}>
                   <Col span={11}>
                     { (
                       // -------------------- <div>
                       <Form.Item
                         name='isWarning'
                         label='Warning:'
                         valuePropName='checked'
                       >
                         <Checkbox />
                       </Form.Item>
                     )}
                   </Col>

                   { (
                     <Form.Item name='isScam' label='Scam' valuePropName='checked'>
                       <Checkbox />
                     </Form.Item>
                   )}
                 </Row>
               </>)
            }

            {type === 'venture' && (
              <>
                {CustomSlider('SeriesA', 'seriesA', seriesMarks)}
                {CustomSlider('SeriesB', 'seriesB', seriesMarks)}
                {CustomSlider('SeriesC', 'seriesC', seriesMarks)}
                {CustomSlider('Ico', 'ico', seriesMarks)}
                {CustomSlider('Strategic', 'strategic', strategicMarks)}
                {CustomSlider('Total Fund', 'totalFund', totalFundsMarks)}
                {CustomSlider('Volume Total Funds', 'volumeTotalFunds', marketCapMarks)}

                <Panel header='Location' className='filter-item' key='location'>
                  <Form.Item name='location'>
                    <Select
                      placeholder='Location'
                      showSearch
                      options={location?.map((item) => ({
                        label: item,
                        value: item
                      }))}
                    />
                  </Form.Item>
                </Panel>

                <Row style={{ width: '100%', display: 'flex' }}>
                  <Col span={11}>
                    { (
                      // -------------------- <div>
                      <Form.Item
                        name='isWarning'
                        label='Warning:'
                        valuePropName='checked'
                      >
                        <Checkbox />
                      </Form.Item>
                    )}
                  </Col>

                  { (
                    <Form.Item name='isScam' label='Scam' valuePropName='checked'>
                      <Checkbox />
                    </Form.Item>
                  )}
                </Row>
              </>
            )}

            {type === 'exchange' && (
              <>
                {CustomSlider('Pair Count', 'pairCount', pairCountMarks)}
                {CustomSlider('Volume 24H', 'volume24h', marketCapMarks)}
                {CustomSlider('Volume 7D', 'volume7d', volume7dMarks)}
                {CustomSlider('Volume 1M', 'volume1m', volume1mMarks)}
                {CustomSlider('Visit 7D', 'visit7d', visit7dMarks)}

                <Row style={{ width: '100%', display: 'flex' }}>
                  <Col span={11}>
                    { (
                      // -------------------- <div>
                      <Form.Item
                        name='isWarning'
                        label='Warning:'
                        valuePropName='checked'
                      >
                        <Checkbox />
                      </Form.Item>
                    )}
                  </Col>

                  { (
                    <Form.Item name='isScam' label='Scam' valuePropName='checked'>
                      <Checkbox />
                    </Form.Item>
                  )}
                </Row>
              </>
            )}

            {type === 'soon' && (
              <>
                <Panel header='Round Type' className='filter-item' key='roundType'>
                  <Form.Item name='roundType'>
                    <Select
                      showSearch
                      placeholder='Round Type'
                      width='100%'
                      options={roundType?.map((item) => ({
                        label: item,
                        value: item
                      }))}
                    ></Select>
                  </Form.Item>
                </Panel>

                <Panel header='Tag' className='filter-item' key='tag'>
                  <Form.Item name='tag'>
                    <Select
                      showSearch
                      placeholder='Tag'
                      width='100%'
                      options={tagList?.map((item) => ({
                        label: item,
                        value: item
                      }))}
                    ></Select>
                  </Form.Item>
                </Panel>

                {CustomSlider('Fully Diluted Market Cap', 'fullyDilutedMarketCap', fullyDilutedMarketCapMarks)}
                {CustomSlider('Fund Raising Goals', 'fundRaisingGoals', fundRaisingGoalsMarks)}
                {CustomSlider('Token Price', 'tokenPrice', tokenPriceMarks)}

                <Panel header='Launchpad' className='filter-item' key='launchpad'>
                  <Form.Item name='launchpad'>
                    <Select
                      showSearch
                      placeholder='Launchpad'
                      width='100%'
                      options={Array.from(launchpadContext)?.map(item => ({ label: item[1]?.name, value: item[1]?.launchPadId }))}
                    ></Select>
                  </Form.Item>
                </Panel>
              </>
            )}

            {
              type === 'launchpad' &&
              <>
                { CustomSlider('Year Founded', 'yearFounded', launchpadFoundedYearMarks)}
                { CustomSlider('Total Fund Raised', 'totalFundsRaised', launchpadFundRaisedMarks)}
                { CustomSlider('Average ROI Current', 'avgRoiCurrent', launchpadAvgRoiCurrentMarks)}
                { CustomSlider('Average ROI ATH', 'avgRoiATH', launchpadAvgRoiATHMarks)}
                { CustomSlider('Marketcap', 'marketCap', launchpadMarketcapMarks)}
                { CustomSlider('Volume24h', 'volume24h', launchpadVolume24hMarks)}
                { CustomSlider('Score', 'score', getScoreMarks('launchpad'))}
              </>
            }

          </Collapse>
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
