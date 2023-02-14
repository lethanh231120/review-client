import React, { useEffect, useState } from 'react'
// import { Tabs } from 'antd'
import CryptoTable from './tabs/CryptoTable'
import SoonTable from './tabs/SoonTable'
import ExchangeTable from './tabs/ExchangeTable'
import VentureTable from './tabs/VentureTable'
import DappTable from './tabs/DappTable'
import { DAPP, VENTURE, EXCHANGE, SOON, CRYPTO } from '../../constants/category'
import { LIST_CRYPTO, LIST_DAPP, LIST_EXCHANGE, LIST_SOON, LIST_VENTURE } from '../../constants/category'
import { read } from '../../../api/BaseRequest'
import _ from 'lodash'
import { Tab, Nav } from 'react-bootstrap'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './categoryItem.scss'

// const { TabPane } = Tabs
const TabSearch = (props) => {
  const { listProduct, keyword, handleChangeInput, handleSubmitSearch, handleSubmitBtn, setLoading, loading } = props
  const [tab, setTab] = useState(CRYPTO)
  const [listData, setListData] = useState([])

  useEffect(() => {
    const getData = async() => {
      setLoading(true)
      switch (tab) {
        case DAPP: {
          const listDappId = []
          listProduct[LIST_DAPP]?.dapps?.forEach((itemDapp) => {
            listDappId.push(itemDapp?.dappId)
          })
          if (!_.isEmpty(listDappId)) {
            const dataDapp = await read('reviews/dapp/list', { dAppIds: listDappId })
            setListData(dataDapp?.data?.dApps ? dataDapp?.data?.dApps : [])
            setLoading(false)
          } else {
            setListData([])
          }
          break
        }
        case CRYPTO: {
          const listCryptoId = []
          listProduct[LIST_CRYPTO]?.cryptos?.forEach((itemCrypto) => {
            listCryptoId.push(itemCrypto?.cryptoId)
          })
          if (!_.isEmpty(listCryptoId)) {
            const dataCrypto = await read('reviews/crypto/list', { cryptoIds: listCryptoId })
            setListData(dataCrypto?.data?.cryptos ? dataCrypto?.data?.cryptos : [])
            setLoading(false)
          } else {
            setListData([])
          }
          break
        }
        case EXCHANGE: {
          const listExchangeId = []
          listProduct[LIST_EXCHANGE]?.exchanges?.forEach((itemExchange) => {
            listExchangeId.push(itemExchange?.exchangeId)
          })
          if (!_.isEmpty(listExchangeId)) {
            const dataExchange = await read('reviews/exchange/list', { exchangeIds: listExchangeId })
            setListData(dataExchange?.data?.exchanges ? dataExchange?.data?.exchanges : [])
            setLoading(false)
          } else {
            setListData([])
          }
          break
        }
        case VENTURE: {
          const listVentureId = []
          listProduct[LIST_VENTURE]?.ventures?.forEach((itemVenture) => {
            listVentureId.push(itemVenture?.ventureId)
          })
          if (!_.isEmpty(listVentureId)) {
            const dataVenture = await read('reviews/venture/list', { ventureIds: listVentureId })
            setListData(dataVenture?.data?.ventures ? dataVenture?.data?.ventures : [])
            setLoading(false)
          } else {
            setListData([])
          }
          break
        }
        case SOON: {
          const listSoonId = []
          listProduct[LIST_SOON]?.soons?.forEach((itemSoon) => {
            listSoonId.push(itemSoon?.soonId)
          })
          if (!_.isEmpty(listSoonId)) {
            const dataSoon = await read('reviews/soon/list', { projectIds: listSoonId })
            setListData(dataSoon?.data?.soons)
            setLoading(false)
          } else {
            setListData([])
          }
          break
        }
        default:
          break
      }
      setLoading(false)
    }
    getData()
  }, [tab, listProduct])

  return (
    <>
      <div className='col-xl-12'>
        <div>
          <Tab.Container defaultActiveKey='crypto'>
            <div className='row'>
              <div className='col-xl-8 col-lg-9 col-md-8'>
                <Nav as='ul' className='order nav-tabs' id='pills-tab' role='tablist'>
                  <Nav.Item
                    as='li'
                    className=' my-1'
                    role='presentation'
                    onClick={() => {
                      setListData([])
                      setTab(CRYPTO)
                    }}
                  >
                    <Nav.Link as='button' eventKey='crypto' type='button' >Cryptos</Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    as='li'
                    className=' my-1'
                    role='presentation'
                    onClick={() => {
                      setListData([])
                      setTab(DAPP)
                    }}
                  >
                    <Nav.Link as='button' eventKey='dapp' type='button'>DApps</Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    as='li'
                    className=' my-1'
                    role='presentation'
                    onClick={() => {
                      setListData([])
                      setTab(EXCHANGE)
                    }}
                  >
                    <Nav.Link as='button' eventKey='exchange' type='button'>Exchanges</Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    as='li'
                    className=' my-1'
                    role='presentation'
                    onClick={() => {
                      setListData([])
                      setTab(VENTURE)
                    }}
                  >
                    <Nav.Link as='button' className='me-0' eventKey='venture' type='button'>Ventures</Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    as='li'
                    className=' my-1'
                    role='presentation'
                    onClick={() => {
                      setListData([])
                      setTab(SOON)
                    }}
                  >
                    <Nav.Link as='button' className='me-0' eventKey='soon' type='button'>Soons</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className='col-xl-4 col-lg-3 col-md-4'>
                <Input
                  // value={keywordSearch}
                  defaultValue={keyword}
                  placeholder={keyword}
                  onChange={handleChangeInput}
                  onKeyPress={handleSubmitSearch}
                  suffix={<SearchOutlined onClick={handleSubmitBtn} className='icon-submit'/>}
                />
              </div>
            </div>
            <div className='mt-4'>
              <Tab.Content className='tab-content' >
                <Tab.Pane eventKey='crypto'>
                  <div className='table-responsive dataTablemarket'>
                    <div id='market_wrapper' className='dataTables_wrapper no-footer'>
                      <CryptoTable listData={listData} loading={loading}/>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='dapp'>
                  <DappTable listData={listData} loading={loading} />
                </Tab.Pane>
                <Tab.Pane eventKey='exchange'>
                  <ExchangeTable listData={listData} loading={loading} />
                </Tab.Pane>
                <Tab.Pane eventKey='venture'>
                  <VentureTable listData={listData} loading={loading} />
                </Tab.Pane>
                <Tab.Pane eventKey='soon'>
                  <SoonTable listData={listData} loading={loading}/>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div>
    </>
  )
}

export default TabSearch
