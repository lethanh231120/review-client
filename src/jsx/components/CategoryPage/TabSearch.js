import React from 'react'
import CryptoTable from './tabs/CryptoTable'
import SoonTable from './tabs/SoonTable'
import LaunchPadTable from './tabs/LaunchPadTable'
import ExchangeTable from './tabs/ExchangeTable'
import VentureTable from './tabs/VentureTable'
import DappTable from './tabs/DappTable'
import { DAPP, VENTURE, EXCHANGE, SOON, CRYPTO, LAUNCHPAD, LIST_LAUNCHPAD } from '../../constants/category'
import { LIST_CRYPTO, LIST_DAPP, LIST_EXCHANGE, LIST_SOON, LIST_VENTURE } from '../../constants/category'
// import { read } from '../../../api/BaseRequest'
// import _ from 'lodash'
import { Tab, Nav } from 'react-bootstrap'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './categoryItem.scss'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'

const TabSearch = (props) => {
  const { listData, setKeyWordSearch, handleSubmitSearch, handleSubmitBtn, loading, tab, setTab, keywordSearch, listProduct, setListData, setStatus } = props

  // const [tab, setTab] = useState()
  // const [listData, setListData] = useState({
  //   dapp: [],
  //   venture: [],
  //   exchange: [],
  //   soon: [],
  //   launchpad: [],
  //   crypto: []
  // })

  // useEffect(() => {
  //   setTab(activeTab)
  // }, [activeTab])

  // useEffect(() => {
  //   const getData = async() => {
  //     if (tab) {
  //       setLoading(true)
  //       switch (tab) {
  //         case DAPP: {
  //           const listDappId = []
  //           listProduct[LIST_DAPP]?.dapps?.forEach((itemDapp) => {
  //             listDappId.push(itemDapp?.dappId)
  //           })
  //           if (!_.isEmpty(listDappId)) {
  //             const dataDapp = await read('reviews/dapp/list', { dAppIds: listDappId })
  //             setListData({
  //               dapp: dataDapp?.data?.dApps ? dataDapp?.data?.dApps : []
  //             })
  //             setLoading(false)
  //           } else {
  //             setListData({
  //               dapp: []
  //             })
  //           }
  //           break
  //         }
  //         case CRYPTO: {
  //           const listCryptoId = []
  //           listProduct[LIST_CRYPTO]?.cryptos?.forEach((itemCrypto) => {
  //             listCryptoId.push(itemCrypto?.cryptoId)
  //           })
  //           if (!_.isEmpty(listCryptoId)) {
  //             const dataCrypto = await read('reviews/crypto/list', { cryptoIds: listCryptoId })
  //             setListData({
  //               crypto: dataCrypto?.data?.cryptos ? dataCrypto?.data?.cryptos : []
  //             })
  //             setLoading(false)
  //           } else {
  //             setListData({
  //               crypto: []
  //             })
  //           }
  //           break
  //         }
  //         case EXCHANGE: {
  //           const listExchangeId = []
  //           listProduct[LIST_EXCHANGE]?.exchanges?.forEach((itemExchange) => {
  //             listExchangeId.push(itemExchange?.exchangeId)
  //           })
  //           if (!_.isEmpty(listExchangeId)) {
  //             const dataExchange = await read('reviews/exchange/list', { exchangeIds: listExchangeId })
  //             setListData({
  //               exchange: dataExchange?.data?.exchanges ? dataExchange?.data?.exchanges : []
  //             })
  //             setLoading(false)
  //           } else {
  //             setListData({
  //               exchange: []
  //             })
  //           }
  //           break
  //         }
  //         case VENTURE: {
  //           const listVentureId = []
  //           listProduct[LIST_VENTURE]?.ventures?.forEach((itemVenture) => {
  //             listVentureId.push(itemVenture?.ventureId)
  //           })
  //           if (!_.isEmpty(listVentureId)) {
  //             const dataVenture = await read('reviews/venture/list', { ventureIds: listVentureId })
  //             setListData({
  //               venture: dataVenture?.data?.ventures ? dataVenture?.data?.ventures : []
  //             })
  //             setLoading(false)
  //           } else {
  //             setListData({
  //               venture: []
  //             })
  //           }
  //           break
  //         }
  //         case LAUNCHPAD: {
  //           const listLaunchPadId = []
  //           listProduct[LIST_LAUNCHPAD]?.launchPads?.forEach((itemLaunchPad) => {
  //             listLaunchPadId.push(itemLaunchPad?.launchPadId)
  //           })
  //           if (!_.isEmpty(listLaunchPadId)) {
  //             const dataLaunchPad = await read('reviews/launchpad/list', { launchpadIds: listLaunchPadId })
  //             setListData({
  //               launchpad: dataLaunchPad?.data?.launchPads ? dataLaunchPad?.data?.launchPads : []
  //             })
  //             setLoading(false)
  //           } else {
  //             setListData({
  //               launchpad: []
  //             })
  //           }
  //           break
  //         }
  //         case SOON: {
  //           const listSoonId = []
  //           listProduct[LIST_SOON]?.soons?.forEach((itemSoon) => {
  //             listSoonId.push(itemSoon?.soonId)
  //           })
  //           if (!_.isEmpty(listSoonId)) {
  //             const dataSoon = await read('reviews/soon/list', { projectIds: listSoonId })
  //             setListData({
  //               soon: dataSoon?.data?.soons ? dataSoon?.data?.soons : []
  //             })
  //             setLoading(false)
  //           } else {
  //             setListData({
  //               soone: []
  //             })
  //           }
  //           break
  //         }
  //         default:
  //           break
  //       }
  //       setLoading(false)
  //     }
  //   }
  //   listProduct && getData()
  // }, [tab, listProduct])

  return (
    <>
      {listProduct ? (
        <div className='col-xl-12 font-family'>
          <Tab.Container activeKey={tab}>
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
                    <Nav.Link as='button' eventKey='crypto' type='button'>
                      Cryptos
                      ({listProduct[`${LIST_CRYPTO}`]?.cryptos?.length > 0 ? new Intl.NumberFormat().format(listProduct[`${LIST_CRYPTO}`]?.cryptos?.length) : 0})
                    </Nav.Link>
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
                    <Nav.Link as='button' eventKey='dapp' type='button'>
                      DApps
                      ({listProduct[`${LIST_DAPP}`]?.dapps?.length > 0 ? new Intl.NumberFormat().format(listProduct[`${LIST_DAPP}`]?.dapps?.length) : 0})
                    </Nav.Link>
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
                    <Nav.Link as='button' eventKey='exchange' type='button'>
                      Exchanges
                      ({listProduct[`${LIST_EXCHANGE}`]?.exchanges?.length > 0 ? new Intl.NumberFormat().format(listProduct[`${LIST_EXCHANGE}`]?.exchanges?.length) : 0})
                    </Nav.Link>
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
                    <Nav.Link as='button' className='me-0' eventKey='venture' type='button'>
                      Ventures
                      ({listProduct[`${LIST_VENTURE}`]?.ventures?.length > 0 ? new Intl.NumberFormat().format(listProduct[`${LIST_VENTURE}`]?.ventures?.length) : 0})
                    </Nav.Link>
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
                    <Nav.Link as='button' className='me-0' eventKey='soon' type='button'>
                      Soons
                      ({listProduct[`${LIST_SOON}`]?.soons?.length > 0 ? new Intl.NumberFormat().format(listProduct[`${LIST_SOON}`]?.soons?.length) : 0})
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    as='li'
                    className=' my-1'
                    role='presentation'
                    onClick={() => {
                      setListData([])
                      setTab(LAUNCHPAD)
                    }}
                  >
                    <Nav.Link as='button' className='me-0' eventKey='launchpad' type='button'>
                      LaunchPads
                      ({listProduct[`${LIST_LAUNCHPAD}`]?.launchPads?.length > 0 ? new Intl.NumberFormat().format(listProduct[`${LIST_LAUNCHPAD}`]?.launchPads?.length) : 0})
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className='col-xl-4 col-lg-3 col-md-4'>
                <Input
                  value={keywordSearch}
                  placeholder={keywordSearch}
                  onChange={(e) => {
                    setStatus()
                    setKeyWordSearch(e.target.value)
                  }}
                  onKeyPress={handleSubmitSearch}
                  suffix={<SearchOutlined onClick={handleSubmitBtn} className='icon-submit'/>}
                />
              </div>
            </div>
            <div className='mt-4'>
              <Tab.Content className='tab-content' >
                <Tab.Pane eventKey='crypto'>
                  <CryptoTable listData={listData?.crypto} loading={loading}/>
                </Tab.Pane>
                <Tab.Pane eventKey='dapp'>
                  <DappTable listData={listData?.dapp} loading={loading} />
                </Tab.Pane>
                <Tab.Pane eventKey='exchange'>
                  <ExchangeTable listData={listData?.exchange} loading={loading} />
                </Tab.Pane>
                <Tab.Pane eventKey='venture'>
                  <VentureTable listData={listData?.venture} loading={loading} />
                </Tab.Pane>
                <Tab.Pane eventKey='soon'>
                  <SoonTable listData={listData?.soon} loading={loading}/>
                </Tab.Pane>
                <Tab.Pane eventKey='launchpad'>
                  <LaunchPadTable listData={listData?.launchpad} loading={loading}/>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      ) : <MySkeletonLoadinng count={50} height={70} />}
    </>
  )
}

export default TabSearch
