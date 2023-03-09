import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'

import { TopCoins } from '../common-widgets/home/top-coin'
import { TopDiscussed } from '../common-widgets/home/top-discussed/top-discuss-project'
import { DataAllocationChart } from '../common-widgets/home/data-allocation-chart'
import { TopCoinChart } from '../common-widgets/home/home-chart/bitcoin-chart'
import { ScamEachChainsList } from '../common-widgets/home/blockchain-data-table/scam-each-chain-chart'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'
import _ from 'lodash'
// import { renderRandomColor } from '../../../utils/formatNumber'
import { ReviewList } from '../common-widgets/home/reviews/review-list'
import SummaryRow from '../../components/common-widgets/home/summary/BalanceCardSlider'
import './home.scss'
import Banner from '../common-widgets/home/banner'
import { SummaryHomeContext } from '../../../App'

const fillColors = {
  'binance': '#EFB80B',
  'ethereum': '#58BAD7',
  'avalanche': '#DA4344',
  'polygon': '#8147E7',
  'others': '#18A594'
}

const Home = () => {
  const { changeBackground } = useContext(ThemeContext)
  const summaryData = useContext(SummaryHomeContext)
  useEffect(() => {
    changeBackground({ value: 'light', label: 'Light' })
  }, [])

  // GET TOP COINS DATA

  const setTotalCrytosData = (data) => {
    const dataArr = []
    let sorted = []
    const others = { fillcolor: fillColors['others'], datatitle: 'Others', amount: data?.chainTokens?.others?.total }
    const dataList = data?.chainTokens
    // sort token data
    if (!_.isEmpty(dataList)) {
      // get first 5 tokens
      Object.keys(dataList)?.map((key, index) => {
        if (key !== 'others') {
          dataArr.push({ fillcolor: fillColors[key], datatitle: key, amount: dataList[key]?.total })
        }
      })
      sorted = dataArr?.sort((a, b) => b?.amount - a?.amount)

      sorted.push(others)
      // calulate other
    }
    return sorted
  }

  const setScamDataEachChains = (data) => {
    const list = []
    const temp = data?.chainTokens
    const others = { scam: data?.chainTokens?.others?.scam, total: data?.chainTokens?.others?.total, datatitle: 'Others' }

    Object.keys(temp)?.map(key => {
      if (key !== 'others') {
        list.push({ scam: temp[key]?.scam, total: temp[key]?.total, datatitle: key })
      }
    })
    const sorted = list?.sort((a, b) => b?.total - a?.total)
    sorted.push(others)
    return sorted
  }

  return (
    <>
      {/* row 1 */}
      <div className='row' style={{ height: 'max-content' }}>
        {/* banner, summary */}
        <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mb-4'>
          <div className='row cus-banner'>
            <div className='col-xl-12 cus-height-banner' >
              <Banner />
            </div>
            {/* <div className='col-xl-12 col-lg-12' style={{ padding: '0', marginTop: 'auto', height: 'max-content' }}> */}
            <div className='col-xl-12 col-lg-12' style={{ display: 'flex', alignItems: 'end', justifyContent: 'center', padding: '0', marginTop: 'auto' }}>
              {summaryData ? <SummaryRow data={summaryData}/> : <MySkeletonLoadinng />}
            </div>
          </div>
        </div>
        {/* hot topic */}
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-4'>
          <TopDiscussed />
        </div>
      </div>

      {/* row 2 */}
      <div className='row'>
        {/* Recent Reviews */}
        <div className='col-12 ' >
          <ReviewList />
        </div>
      </div>

      {/* row 3 */}
      <div className='row'>
        {/* top coin chart  */}
        <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mb-4'>
          <TopCoinChart />
        </div>
        {/* top coin  */}
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-4'>
          <TopCoins />
        </div>
      </div>

      {/* row 4 */}
      <div className='row'>
        {/* Scam percentage each chains chart */}
        <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mb-4'>
          {summaryData ? <ScamEachChainsList data={setScamDataEachChains(summaryData)}/> : <MySkeletonLoadinng/>}
        </div>
        {/* blockchain data allocation */}
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-4' style={{ textTransform: 'none' }}>
          {summaryData ? <DataAllocationChart header={`Gear5's Blockchains Data Allocation`} data={setTotalCrytosData(summaryData)}/> : <MySkeletonLoadinng/>}
        </div>
      </div>
    </>
  )
}
export default Home
