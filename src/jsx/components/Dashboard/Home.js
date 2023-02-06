import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//  import {NavLink} from 'react-router-dom';
// Import Components
import { ThemeContext } from '../../../context/ThemeContext'
import metaverse from './../../../images/metaverse.png'
// images
import coin from './../../../images/coin.png'
import { TopCoins } from '../common-widgets/home/top-coin'
import { RecentlyScam } from '../common-widgets/home/recently-scam/recently-scam'
import { TopDiscussed } from '../common-widgets/home/top-discussed/top-discuss-project'
import SummaryRow from './Dashboard/BalanceCardSlider'
import { DataAllocationChart } from '../common-widgets/home/data-allocation-chart'
import { BitcoinChartAndData } from '../common-widgets/home/bitcoin-chart'
import { ScamEachChainChart } from '../common-widgets/home/scam-each-chain-chart'
import { get } from '../../../api/BaseRequest'
import { MySpinner } from '../common-widgets/my-spinner'
import _ from 'lodash'
import { renderRandomColor } from '../../../utils/formatNumber'
import { API_KEY, bitqueryEndpoint, BITQUERY_QUERY } from './Dashboard/bitquery-query/query'

const Home = () => {
  const { changeBackground } = useContext(ThemeContext)
  const [summaryData, setSummaryData] = useState()
  const [btcChartData, setBtcChartData] = useState()
  // const [hotList, setHotList] = useState()
  const [topCoins, setTopCoins] = useState()

  useEffect(() => {
    changeBackground({ value: 'light', label: 'Light' })
  }, [])

  // GET HOT LIST
  // useEffect(() => {
  //   const getHotList = async() => {
  //     const res = await get('reviews/hot')
  //     if (res?.code === '200') {
  //       setHotList(res?.data?.products)
  //     }
  //   }

  //   getHotList()
  // }, [])

  // GET TOP COIN

  useEffect(() => {
    const getTopCoinData = async() => {
      const res = await get('reviews/crypto/filter?orderBy=marketcapUSD&sort=desc&page=1')
      if (res?.code === '200') {
        setTopCoins(res?.data?.cryptos)
      }
    }
    getTopCoinData()
  }, [])

  // GET DATA FOR BTC CHART
  useEffect(() => {
    const queryData = async() => {
      const ressp = await fetch(bitqueryEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          query: BITQUERY_QUERY(
            'ethereum',
            'Uniswap',
            '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
            '0xdAC17F958D2ee523a2206206994597C13D831ec7'

          )
        }),
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY
        }
      })
      const rawData = await ressp.json()
      setBtcChartData(rawData?.data?.ethereum?.dexTrades)
    }
    queryData()
  }, [])

  useEffect(() => {
    const getSummaryData = async() => {
      const response = await get('reviews/summary')
      if (response?.code === 'B.A.200') {
        setSummaryData(response?.data)
      }
    }
    getSummaryData()
  }, [])

  const setScamAliveProjectsData = (data) => {
    return [
      { fillcolor: '#18A594', datatitle: 'Alive Projects', amount: data?.coins + data?.exchanges + data?.tokens + data?.ventures - data?.cryptoScams + data?.dAppScams + data?.exchangeScams + data?.ventureScams },
      { fillcolor: '#15073A', datatitle: 'Scam or Dead Projects', amount: data?.cryptoScams + data?.dAppScams + data?.exchangeScams + data?.ventureScams }
    ]
  }

  const setTotalCrytosData = (data) => {
    const SHOW_DATA_NUMBER = 4
    const dataArr = []
    const dataList = data?.chainTokens
    // sort token data
    if (!_.isEmpty(dataList)) {
      const sorted = Object.keys(dataList).sort((a, b) => dataList[b]?.total - dataList[a]?.total).map(key =>({ [key]: dataList[key]?.total }))

      // get first 5 tokens
      for (var i = 0; i < SHOW_DATA_NUMBER; i++) {
        dataArr.push({ fillcolor: renderRandomColor(), datatitle: Object.keys(sorted[i])[0], amount: Object.values(sorted[i])[0] })
      }

      // calulate other
      let totalOther = 0
      for (var k = SHOW_DATA_NUMBER; k < sorted?.length; k++) {
        totalOther += Object.values(sorted[k])[0]
      }
      dataArr.push({ fillcolor: renderRandomColor(), datatitle: 'Others', amount: totalOther })
    }
    return dataArr
  }

  const setScamDataEachChains = (data) => {
    const SHOW_DATA_NUMBER = 12
    const dataArr = []
    const dataList = data?.chainTokens

    if (!_.isEmpty(dataList)) {
      const sorted = Object.keys(dataList).sort((a, b) => dataList[b]?.total - dataList[a]?.total).map(key =>({ [key]: dataList[key] }))
      // get first 5 tokens
      for (var i = 0; i < SHOW_DATA_NUMBER; i++) {
        dataArr.push({ fillcolor: renderRandomColor(), datatitle: Object.keys(sorted[i])[0], total: Object.values(sorted[i])[0]?.total, scam: Object.values(sorted[i])[0]?.scam })
      }

      // calulate other
      let totalAllOther = 0
      let totalScamOther = 0
      for (var k = SHOW_DATA_NUMBER; k < sorted?.length; k++) {
        totalAllOther += Object.values(sorted[k])[0]?.total
        totalScamOther += Object.values(sorted[k])[0]?.scam
      }
      dataArr.push({ fillcolor: renderRandomColor(), datatitle: 'Others', total: totalAllOther, scam: totalScamOther })
    }
    return dataArr
  }
  // useEffect(() => {
  //   summaryData && setTotalCrytosData(summaryData)
  // }, [summaryData])

  return (
    <>
      <div className='row'>
        <div className='col-8 col-xl-8'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='card bubles'>
                <div className='card-body'>
                  <div className='buy-coin bubles-down'>
                    <div>
                      <h2 className='report-title' style={{ width: '100%' }}>You got scammed <br></br>lost money</h2>
                      <p className='join-us-text' style={{ width: '100%' }}>
                      Please join us to warn everyone in the community
                      </p>
                      <Link to='#' className='btn btn-danger '>
                        Report&nbsp;now
                      </Link>
                    </div>
                    <div className='coin-img'>
                      <img src={coin} className='img-fluid' alt='' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-12'>
              <SummaryRow data={summaryData}/>
            </div>
          </div>
        </div>
        <div className='col-4 '>
          {summaryData ? <DataAllocationChart header={'Scam/Alive Projects Allocation'} data={setScamAliveProjectsData(summaryData)}/> : <MySpinner fontSize={30}/>}
        </div>
      </div>
      <div className='row'>
        <div className='col-8 assets-al' >
          {(btcChartData && topCoins) ? <BitcoinChartAndData chartData={btcChartData} headerData={topCoins[0]}/> : <MySpinner fontSize={30}/>}
        </div>
        <div className='col-4 col-xl-4'>
          {topCoins ? <TopCoins data={topCoins}/> : <MySpinner fontSize={30}/>}
        </div>
      </div>
      <div className='row'>
        {/* LIST SCAM  */}
        <div className='col-6'>
          <RecentlyScam/>
        </div>
        <div className='col-xl-2 col-sm-2' >
          <div className='card email-susb' >
            <div className='card-body text-center' >
              <div className='pt-2'>
                <img src={metaverse} alt='' />
              </div>
              <div className='toatal-email' >
                <h3 className='heading'>2.2M+ Projects</h3>
                <h5>Contribute new project with us</h5>
              </div>
              <Link to='#' className='btn btn-primary email-btn'>
                   Add Projects
              </Link>
            </div>
          </div>
        </div>
        {/* LIST HOT DISCUSS  */}
        <div className='col-4'>
          {/* {hotList ? <TopDiscussed hotList={hotList}/> : <MySpinner fontSize={30} />} */}
          <TopDiscussed />
        </div>
      </div>

      <div className='row'>
        {/* Scam percentage each chains chart */}
        <div className='col-8'>
          {summaryData ? <ScamEachChainChart data={setScamDataEachChains(summaryData)}/> : <MySpinner fontSize={30}/>}
        </div>
        <div className='col-4 col-xl-4'>
          {summaryData ? <DataAllocationChart header={'Cryptos Data Allocation'} data={setTotalCrytosData(summaryData)}/> : <MySpinner fontSize={30}/>}
        </div>
      </div>
    </>
  )
}
export default Home
