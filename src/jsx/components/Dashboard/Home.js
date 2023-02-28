import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'

import { TopCoins } from '../common-widgets/home/top-coin'
import { TopDiscussed } from '../common-widgets/home/top-discussed/top-discuss-project'
import { DataAllocationChart } from '../common-widgets/home/data-allocation-chart'
import { TopCoinChart } from '../common-widgets/home/home-chart/bitcoin-chart'
import { ScamEachChainsList } from '../common-widgets/home/blockchain-data-table/scam-each-chain-chart'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'
import _ from 'lodash'
import { renderRandomColor } from '../../../utils/formatNumber'
import { ReviewList } from '../common-widgets/home/reviews/review-list'
import SummaryRow from '../../components/common-widgets/home/summary/BalanceCardSlider'
import './home.scss'
import Banner from '../common-widgets/home/banner'
import { SummaryHomeContext } from '../../../App'

const fillColors = [
  '#18A594',
  '#58BAD7',
  '#F0A901',
  '#EB5757',
  '#362465'
]

const Home = () => {
  const { changeBackground } = useContext(ThemeContext)
  const summaryData = useContext(SummaryHomeContext)

  useEffect(() => {
    changeBackground({ value: 'light', label: 'Light' })
  }, [])

  // GET TOP COINS DATA

  const setTotalCrytosData = (data) => {
    const SHOW_DATA_NUMBER = 4
    const dataArr = []
    const dataList = data?.chainTokens
    // sort token data
    if (!_.isEmpty(dataList)) {
      const sorted = Object.keys(dataList).sort((a, b) => dataList[b]?.total - dataList[a]?.total).map(key =>({ [key]: dataList[key]?.total }))

      // get first 5 tokens
      for (var i = 0; i < SHOW_DATA_NUMBER; i++) {
        dataArr.push({ fillcolor: fillColors[i], datatitle: Object.keys(sorted[i])[0], amount: Object.values(sorted[i])[0] })
      }

      // calulate other
      let totalOther = 0
      for (var k = SHOW_DATA_NUMBER; k < sorted?.length; k++) {
        totalOther += Object.values(sorted[k])[0]
      }
      dataArr.push({ fillcolor: fillColors[fillColors.length - 1], datatitle: 'Others', amount: totalOther })
    }
    return dataArr
  }

  const setScamDataEachChains = (data) => {
    const SHOW_DATA_NUMBER = 4
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
