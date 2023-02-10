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
  tvlMarks,
  seriesMarks,
  marketCapMarks,
  priceUSDMarks,
  userMarks,
  strategicMarks,
  volume1mMarks,
  volume7dMarks,
  fundRaisingGoalsMarks,
  tokenPriceMarks,
  getScoreMarks
} from './marks.js'
import { cryptoFilterDefaultValue, dappFilterDefaultValue, exchangeFilterDefaultValue, fromObjectToArray, soonFilterDefaultValue, ventureFilterDefaultValue } from './defaultValues'
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
  const [filterCount, setFilterCount] = useState()
  const [defautlActiveKey, setDefaultActiveKey] = useState([])
  const scoreMarks = getScoreMarks(type)

  const mapDefaultOpenPanel = () => {
    const data = []
    const savedStates = JSON.parse(window.localStorage.getItem(type))
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
    console.log(window.localStorage.getItem(type))
    if (window.localStorage.getItem(type)) {
      console.log('remove')
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

    // ------=---------TAG
    if (values?.tag) {
      filterParams['tag'] = values?.tag
    }

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
      if (values?.tvl) {
        filterParams['tvl'] = `${tvlMarks[values?.tvl[0]]?.value}.${
          tvlMarks[values?.tvl[1]]?.value
        }`
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
    }

    // --SCORE
    if (values?.score) {
      filterParams['score'] = `${scoreMarks[values?.score[0]]?.value}.${
        scoreMarks[values?.score[1]]?.value
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

    handleFilter(filterParams)
    setShowDrawer(false)
  }

  return (
    <div className='drawer'>
      <Button onClick={openDrawer} icon={<FilterOutlined />} style={{ background: filterCount === 0 ? '#fff' : '#18A594', color: filterCount === 0 ? 'black' : '#fff' }}>
        Filter{filterCount === 0 ? null : `(${(filterCount)})`}
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
            )}

            {type === 'venture' && (
              <Panel header='SeriesA' className='filter-item' key='seriesA'>
                <Form.Item name='seriesA'>
                  <Slider
                    range
                    marks={seriesMarks}
                    defaultValue={[0, seriesMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='SeriesB' className='filter-item' key='seriesB'>
                <Form.Item name='seriesB'>
                  <Slider
                    range
                    marks={seriesMarks}
                    defaultValue={[0, seriesMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='SeriesC' className='filter-item' key='seriesC'>
                <Form.Item name='seriesC'>
                  <Slider
                    range
                    marks={seriesMarks}
                    defaultValue={[seriesMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='Ico' className='filter-item' key='ico'>
                <Form.Item name='ico'>
                  <Slider
                    range
                    marks={seriesMarks}
                    defaultValue={[0, seriesMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='Strategic' className='filter-item' key='strategic'>
                <Form.Item name='strategic'>
                  <Slider
                    range
                    marks={strategicMarks}
                    defaultValue={[0, strategicMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='Total Fund' className='filter-item' key='totalFund'>
                <Form.Item name='totalFund'>
                  <Slider
                    range
                    marks={totalFundsMarks}
                    defaultValue={[0, totalFundsMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'soon' && (
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
            )}

            {type === 'soon' && (
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
            )}

            {type === 'soon' && (
              <Panel header='Fully Diluted Market Cap' className='filter-item' key='fullyDilutedMarketCap'>
                <Form.Item name='fullyDilutedMarketCap'>
                  <Slider
                    range
                    marks={fullyDilutedMarketCapMarks}
                    defaultValue={fullyDilutedMarketCapMarks.length}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'soon' && (
              <Panel header='Fund Raising Goals' className='filter-item' key='fundRaisingGoals'>
                <Form.Item name='fundRaisingGoals'>
                  <Slider
                    range
                    marks={fundRaisingGoalsMarks}
                    defaultValue={[0, fundRaisingGoalsMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'soon' && (
              <Panel header='Token Price' className='filter-item' key='tokenPrice'>
                <Form.Item name='tokenPrice'>
                  <Slider
                    range
                    marks={tokenPriceMarks}
                    defaultValue={[0, tokenPriceMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}
            {type === 'soon' && (
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
            )}

            {type === 'crypto' && (
              <Panel header='Market Cap' className='filter-item' key='marketCap'>
                <Form.Item name='marketCap'>
                  <Slider
                    range
                    marks={marketCapMarks}
                    defaultValue={[0, marketCapMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'crypto' && (
              <Panel header='Price' className='filter-item' key='priceUSD'>
                <Form.Item name='priceUSD'>
                  <Slider
                    range
                    marks={priceUSDMarks}
                    defaultValue={[0, priceUSDMarks.length]}
                    min={0}
                    max={6}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'crypto' && (
              <Panel header='Total LP' className='filter-item' key='totalLpUSD'>
                <Form.Item name='totalLpUSD'>
                  <Slider
                    range
                    marks={marketCapMarks}
                    defaultValue={[0, marketCapMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'exchange' && (
              <Panel header='Pair Count' className='filter-item' key='pairCount'>
                <Form.Item name='pairCount'>
                  <Slider
                    range
                    defaultValue={[0, pairCountMarks.length]}
                    marks={pairCountMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {(type === 'dapp' || type === 'exchange') && (
              <Panel header='Volume24H' className='filter-item' key='volume24h'>
                <Form.Item name='volume24h'>
                  <Slider
                    range
                    defaultValue={[0, marketCapMarks.length]}
                    marks={marketCapMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'dapp' && (
              <Panel header='User24H' className='filter-item' key='user24h'>
                <Form.Item name='user24h'>
                  <Slider
                    range
                    defaultValue={[0, userMarks.length]}
                    marks={userMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'exchange' && (
              <Panel header='Volume7D' className='filter-item' key='volume7d'>
                <Form.Item name='volume7d'>
                  <Slider
                    range
                    defaultValue={[0, volume7dMarks.length]}
                    marks={volume7dMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'exchange' && (
              <Panel header='Volume1M' className='filter-item' key='volume1m'>
                <Form.Item name='volume1m'>
                  <Slider
                    range
                    defaultValue={[0, volume1mMarks.length]}
                    marks={volume1mMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'exchange' && (
              <Panel header='Visit7D' className='filter-item' key='visit7d'>
                <Form.Item name='visit7d'>
                  <Slider
                    range
                    defaultValue={[0, visit7dMarks.length]}
                    marks={visit7dMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='Volume Total Funds' className='filter-item' key='volumeTotalFunds'>
                <Form.Item name='volumeTotalFunds'>
                  <Slider
                    range
                    defaultValue={[0, marketCapMarks.length]}
                    marks={marketCapMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {(type === 'venture') && (
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
            )}
            {type === 'dapp' && (
              <Panel header='TVL' className='filter-item' key='tvl'>
                <Form.Item name='tvl'>
                  <Slider
                    range
                    defaultValue={[0, tvlMarks.length]}
                    marks={tvlMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}
            {type === 'crypto' && (
              <Panel header='Trading On' className='filter-item' key='tradingOn'>
                <Form.Item name='tradingOn'>
                  <Select
                    mode='multiple'
                    options={tradingOnList}
                    placeholder='Exchanges'
                  ></Select>
                </Form.Item>
              </Panel>
            )}
            {/* {(type === "crypto" || type === "dapp") && (
              <Panel header="Blockchain" className="filter-item">
                <Form.Item name="blockchain"></Form.Item>
              </Panel>
            )} */}
            {(type === 'crypto' || type === 'dapp') && (
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
            )}
            {(type === 'crypto' ||
              type === 'dapp' ||
              type === 'venture' ||
              type === 'exchange') && (
              <Panel header='Score' className='filter-item' key='score'>
                <Form.Item name='score'>
                  <Slider
                    range
                    marks={getScoreMarks(type)}
                    defaultValue={[0, scoreMarks.length]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}
            <Row style={{ width: '100%', display: 'flex' }}>
              <Col span={11}>
                {(type === 'crypto' ||
                  type === 'dapp' ||
                  type === 'venture' ||
                  type === 'exchange') && (
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
              <Col span={12}>
                {(type === 'crypto' ||
                  type === 'dapp' ||
                  type === 'venture' ||
                  type === 'exchange') && (
                  <Form.Item name='isScam' label='Scam' valuePropName='checked'>
                    <Checkbox />
                  </Form.Item>
                )}
              </Col>
            </Row>
            {/* {type === "crypto" && (
              <Panel

                header="Funds and Investor"
                className="filter-item"
              ></Panel>
            )} */}
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
