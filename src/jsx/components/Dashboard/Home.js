import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'

import { TopCoins } from '../common-widgets/home/top-coin'
import { TopDiscussed } from '../common-widgets/home/top-discussed/top-discuss-project'
// import { DataAllocationChart } from '../common-widgets/home/data-allocation-chart'
import { TopCoinChart } from '../common-widgets/home/home-chart/bitcoin-chart'
import { ScamEachChainsList } from '../common-widgets/home/blockchain-data-table/scam-each-chain-chart'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'
// import _ from 'lodash'
// import { renderRandomColor } from '../../../utils/formatNumber'
import { ReviewList } from '../common-widgets/home/reviews/review-list'
import SummaryRow from '../../components/common-widgets/home/summary/BalanceCardSlider'
import './home.scss'
import Banner from '../common-widgets/home/banner'
import { SummaryHomeContext } from '../../../App'
import SEO from '../SEO/SEO'
import { getHeaderHome } from './../SEO/server/home'
import { LatestTokenTable } from '../common-widgets/home/latest-token/LatestTokenTable'
import { Ads } from '../ads/Ads'

const Home = () => {
  const { changeBackground } = useContext(ThemeContext)
  const summaryData = useContext(SummaryHomeContext)
  useEffect(() => {
    changeBackground({ value: 'light', label: 'Light' })
  }, [])

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
      <SEO props={{ title: getHeaderHome() }}/>
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
              {<SummaryRow data={summaryData}/>}
            </div>
          </div>
        </div>
        {/* hot topic */}
        <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-4'>
          <TopDiscussed borderRadius={'1.25rem'} marginBottom={'1.875rem'}/>
        </div>
      </div>

      {/* row 2 */}
      <div className='row'>
        {/* Recent Reviews */}
        <div className='col-12 ' >
          <ReviewList isHome={true}/>
        </div>
      </div>

      <Ads />

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
          <LatestTokenTable />
        </div>
      </div>
    </>
  )
}
export default Home
