import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import CryptoTable from './tabs/CryptoTable'
import SoonTable from './tabs/SoonTable'
import ExchangeTable from './tabs/ExchangeTable'
import VentureTable from './tabs/VentureTable'
import DappTable from './tabs/DappTable'
import { DAPP, VENTURE, EXCHANGE, SOON, CRYPTO } from '../../constants/category'
import { LIST_CRYPTO, LIST_DAPP, LIST_EXCHANGE, LIST_SOON, LIST_VENTURE } from '../../constants/category'
import { read } from '../../../api/BaseRequest'
import _ from 'lodash'

const { TabPane } = Tabs
const TabSearch = ({ listProduct }) => {
  const [tab, setTab] = useState(CRYPTO)
  const [listData, setListData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const getData = async() => {
      switch (tab) {
        case DAPP: {
          const listDappId = []
          listProduct[LIST_DAPP]?.dapps?.forEach((itemDapp) => {
            listDappId.push(itemDapp?.dappId)
          })
          if (!_.isEmpty(listDappId)) {
            const dataDapp = await read('reviews/dapp/list', { dAppIds: listDappId })
            setListData(dataDapp?.data?.dApps ? dataDapp?.data?.dApps : [])
          } else {
            setListData([])
          }
          return
        }
        case CRYPTO: {
          const listCryptoId = []
          listProduct[LIST_CRYPTO]?.cryptos?.forEach((itemCrypto) => {
            listCryptoId.push(itemCrypto?.cryptoId)
          })
          if (!_.isEmpty(listCryptoId)) {
            const dataCrypto = await read('reviews/crypto/list', { cryptoIds: listCryptoId })
            setListData(dataCrypto?.data?.cryptos ? dataCrypto?.data?.cryptos : [])
          } else {
            setListData([])
          }
          return
        }
        case EXCHANGE: {
          const listExchangeId = []
          listProduct[LIST_EXCHANGE]?.exchanges?.forEach((itemExchange) => {
            listExchangeId.push(itemExchange?.exchangeId)
          })
          if (!_.isEmpty(listExchangeId)) {
            const dataExchange = await read('reviews/exchange/list', { exchangeIds: listExchangeId })
            setListData(dataExchange?.data?.exchanges ? dataExchange?.data?.exchanges : [])
          } else {
            setListData([])
          }
          return
        }
        case VENTURE: {
          const listVentureId = []
          listProduct[LIST_VENTURE]?.ventures?.forEach((itemVenture) => {
            listVentureId.push(itemVenture?.ventureId)
          })
          if (!_.isEmpty(listVentureId)) {
            const dataVenture = await read('reviews/venture/list', { ventureIds: listVentureId })
            setListData(dataVenture?.data?.ventures ? dataVenture?.data?.ventures : [])
          } else {
            setListData([])
          }
          return
        }
        case SOON: {
          const listSoonId = []
          listProduct[LIST_SOON]?.soons?.forEach((itemSoon) => {
            listSoonId.push(itemSoon?.soonId)
          })
          if (!_.isEmpty(listSoonId)) {
            const dataSoon = await read('reviews/soon/list', { projectIds: listSoonId })
            setListData(dataSoon?.data?.soons)
          } else {
            setListData([])
          }
          return
        }
        default:
          break
      }
      setLoading(false)
    }
    getData()
  }, [tab, listProduct])

  return (
    <Tabs value={tab} onChange={(value) => setTab(value)}>
      <TabPane tab='Cryptos' key={CRYPTO}>
        <CryptoTable listData={listData} loading={loading}/>
      </TabPane>
      <TabPane tab='DApps' key={DAPP}>
        <DappTable listData={listData} loading={loading} />
      </TabPane>
      <TabPane tab='Exchanges' key={EXCHANGE}>
        <ExchangeTable listData={listData} loading={loading} />
      </TabPane>
      <TabPane tab='Venture' key={VENTURE}>
        <VentureTable listData={listData} loading={loading} />
      </TabPane>
      <TabPane tab='Soons' key={SOON}>
        <SoonTable listData={listData} loading={loading}/>
      </TabPane>
    </Tabs>
  )
}

export default TabSearch
