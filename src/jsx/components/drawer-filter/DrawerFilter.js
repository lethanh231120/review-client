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
import React, { useState, useEffect } from 'react'
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
  scoreMarks,
  volume1mMarks,
  volume7dMarks,
  fundRaisingGoalsMarks,
  tokenPriceMarks
} from './marks.js'

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

  const openDrawer = (type) => {
    setShowDrawer(true)
  }

  const closeDrawer = () => {
    setShowDrawer(false)
  }

  const onResetClicked = () => {
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
      console.log(values?.seriesA)

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

    console.log(filterParams)
    handleFilter(filterParams)
    setShowDrawer(false)
  }

  return (
    <div className='drawer'>
      <Button onClick={openDrawer} icon={<FilterOutlined />}>
        Filter
      </Button>

      <Drawer
        width='35%'
        title={`Filter ${
          type.toString()[0].toUpperCase() + type.toString().substring(1)
        }`}
        placement='right'
        onClose={closeDrawer}
        open={showDrawer}
        className='filter'
      >
        <Form form={form} onFinish={onFinish}>
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            style={{ display: 'block' }}
          >
            {type === 'crypto' && (
              <Panel header='Type' className='filter-item'>
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
              <Panel header='SeriesA' className='filter-item'>
                <Form.Item name='seriesA'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={seriesMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='SeriesB' className='filter-item'>
                <Form.Item name='seriesB'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={seriesMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='SeriesC' className='filter-item'>
                <Form.Item name='seriesC'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={seriesMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='Ico' className='filter-item'>
                <Form.Item name='ico'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={seriesMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='Strategic' className='filter-item'>
                <Form.Item name='strategic'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={strategicMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='Total Fund' className='filter-item'>
                <Form.Item name='totalFund'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={totalFundsMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'soon' && (
              <Panel header='Round Type' className='filter-item'>
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
              <Panel header='Tag' className='filter-item'>
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
              <Panel header='Fully Diluted Market Cap' className='filter-item'>
                <Form.Item name='fullyDilutedMarketCap'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={fullyDilutedMarketCapMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'soon' && (
              <Panel header='Fund Raising Goals' className='filter-item'>
                <Form.Item name='fundRaisingGoals'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={fundRaisingGoalsMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'soon' && (
              <Panel header='Token Price' className='filter-item'>
                <Form.Item name='tokenPrice'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={tokenPriceMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}
            {type === 'crypto' && (
              <Panel header='Market Cap' className='filter-item'>
                <Form.Item name='marketCap'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={marketCapMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'crypto' && (
              <Panel header='Price' className='filter-item'>
                <Form.Item name='priceUSD'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={priceUSDMarks}
                    defaultValue={[0, 6]}
                    min={0}
                    max={6}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'crypto' && (
              <Panel header='Total LP' className='filter-item'>
                <Form.Item name='totalLpUSD'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={marketCapMarks}
                    defaultValue={[0, 5]}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'exchange' && (
              <Panel header='Pair Count' className='filter-item'>
                <Form.Item name='pairCount'>
                  <Slider
                    tooltipVisible={false}
                    range
                    defaultValue={[0, 5]}
                    marks={pairCountMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {(type === 'dapp' || type === 'exchange') && (
              <Panel header='Volume24H' className='filter-item'>
                <Form.Item name='volume24h'>
                  <Slider
                    tooltipVisible={false}
                    range
                    defaultValue={[0, 5]}
                    marks={marketCapMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'dapp' && (
              <Panel header='User24H' className='filter-item'>
                <Form.Item name='user24h'>
                  <Slider
                    tooltipVisible={false}
                    range
                    defaultValue={[0, 5]}
                    marks={userMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'exchange' && (
              <Panel header='Volume7D' className='filter-item'>
                <Form.Item name='volume7d'>
                  <Slider
                    tooltipVisible={false}
                    range
                    defaultValue={[0, 5]}
                    marks={volume7dMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'exchange' && (
              <Panel header='Volume1M' className='filter-item'>
                <Form.Item name='volume1m'>
                  <Slider
                    tooltipVisible={false}
                    range
                    defaultValue={[0, 5]}
                    marks={volume1mMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'exchange' && (
              <Panel header='Visit7D' className='filter-item'>
                <Form.Item name='visit7d'>
                  <Slider
                    tooltipVisible={false}
                    range
                    defaultValue={[0, 5]}
                    marks={visit7dMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {type === 'venture' && (
              <Panel header='Volume Total Funds' className='filter-item'>
                <Form.Item name='volumeTotalFunds'>
                  <Slider
                    tooltipVisible={false}
                    range
                    defaultValue={[0, 5]}
                    marks={marketCapMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}

            {(type === 'venture' || type === 'exchange') && (
              <Panel header='Location' className='filter-item'>
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
              <Panel header='TVL' className='filter-item'>
                <Form.Item name='tvl'>
                  <Slider
                    tooltipVisible={false}
                    range
                    defaultValue={[0, 5]}
                    marks={tvlMarks}
                    min={0}
                    max={5}
                  />
                </Form.Item>
              </Panel>
            )}
            {type === 'crypto' && (
              <Panel header='Trading On' className='filter-item'>
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
              <Panel header='Tag' className='filter-item'>
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
              <Panel header='Score' className='filter-item'>
                <Form.Item name='score'>
                  <Slider
                    tooltipVisible={false}
                    range
                    marks={scoreMarks}
                    defaultValue={[0, 5]}
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
