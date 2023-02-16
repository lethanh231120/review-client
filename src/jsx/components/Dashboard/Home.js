import React, { useContext, useEffect, useState } from 'react'
//  import {NavLink} from 'react-router-dom';
// Import Components
import { Button } from 'react-bootstrap'
import { ThemeContext } from '../../../context/ThemeContext'
// import metaverse from './../../../images/metaverse.png'
import imgReportProject from '../../../images/svg/report-project-white.svg'
// images
// import hacker from './../../../images/crack.png'
import steal from './../../../images/crack44.png'
// import lite from './../../../images/lite.png'
import eth from './../../../images/ethereum.png'
import btc from './../../../images/bitcoin.png'
import { TopCoins } from '../common-widgets/home/top-coin'
// import { RecentlyScam } from '../common-widgets/home/recently-scam/recently-scam'
import { TopDiscussed } from '../common-widgets/home/top-discussed/top-discuss-project'
import { DataAllocationChart } from '../common-widgets/home/data-allocation-chart'
import { TopCoinChart } from '../common-widgets/home/home-chart/bitcoin-chart'
import { ScamEachChainsList } from '../common-widgets/home/scam-each-chain-chart'
import { get, getPrice } from '../../../api/BaseRequest'
import { MySpinner } from '../common-widgets/my-spinner'
import _ from 'lodash'
import { renderRandomColor } from '../../../utils/formatNumber'
// import { API_KEY, bitqueryEndpoint, BITQUERY_QUERY } from './Dashboard/bitquery-query/query'
// import { DonutChartSkeleton } from '../common-widgets/loading-skeleton/donutchart-loading'
import { ReportModalContext
  //  AddModalContext
} from '../../index'
// import { SignInContext } from '../../../App'
// import { getCookie, STORAGEKEY } from '../../../utils/storage'
import { ReviewList } from '../common-widgets/home/reviews/review-list'
import SummaryRow from '../../components/common-widgets/home/summary/BalanceCardSlider'
import './home.scss'

const fillColors = [
  '#18A594',
  '#58BAD7',
  '#F0A901',
  '#EB5757',
  '#362465'
]

const Home = () => {
  const { changeBackground } = useContext(ThemeContext)
  const [summaryData, setSummaryData] = useState()
  // const [scamProjects, setScamProjects] = useState()
  const [topCoins, setTopCoins] = useState()
  // const userInfo = getCookie(STORAGEKEY.USER_INFO)
  const reportModal = useContext(ReportModalContext)
  // const addModal = useContext(AddModalContext)
  // const signInContext = useContext(SignInContext)

  useEffect(() => {
    changeBackground({ value: 'light', label: 'Light' })
  }, [])

  // GET SUMMARY DATA
  useEffect(() => {
    const getSummaryData = async() => {
      const response = await get('reviews/summary')
      if (response?.code === '200') {
        setSummaryData(response?.data)
      }
    }

    getSummaryData()
  }, [])

  // GET TOP COINS DATA
  useEffect(() => {
    const getTopCoinData = async() => {
      const res = await getPrice('prices/crypto/top')
      if (res?.code === 'B.200') {
        setTopCoins(res?.data)
      }
    }

    getTopCoinData()
  }, [])

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

  // REVIEWS

  return (
    <>
      <div className='row'>
        <div className='col-8 col-xl-8'>
          <div className='row gy-5'>
            <div className='col-xl-12'>
              <div className='card bubles banner-body'>
                <div className='card-body '>
                  <div className='buy-coin '>
                    <div>
                      <h2 className='report-title' style={{ width: '100%' }}>You got scammed <br></br>lost money</h2>
                      <p className='join-us-text' style={{ width: '100%' }}>
                      Please join us to warn everyone in the community
                      </p>
                      <Button className='btn-danger' onClick={() => reportModal?.handleSetOpenModal(true)} style={{ backgroundColor: '#EB5757', borderColor: '#EB5757' }}>
                        <img src={imgReportProject} alt='err' />
                        &nbsp;
                        Report&nbsp;now
                      </Button>
                    </div>
                    {/* <img src={lite} className='decoration lite'/> */}
                    <img src={eth} className='decoration eth'/>
                    <img src={btc} className='decoration btc-1'/>
                    {/* <img src={btc} className='decoration btc-2'/> */}
                    {/* <div className='coin-img'>
                      <img src={hacker} className='img-fluid' alt='' />
                    </div> */}
                    <div className='coin-img'>
                      <img src={steal} className='img-fluid' alt='' style={{ width: '200px' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-12'>
              {summaryData ? <SummaryRow data={summaryData}/> : <MySpinner />}
            </div>
          </div>
        </div>
        <div className='col-4'>
          <TopDiscussed />
        </div>
        <div className='col-12 ' >
          <ReviewList />
        </div>
        {/* {summaryData ? <div className='col-4 '>
          <DataAllocationChart header={'Projects Allocation'} data={setScamAliveProjectsData(summaryData)}/> </div> : <DonutChartSkeleton />} */}
      </div>

      <div className='row'>
        {/* LIST SCAM  */}
        <div className='col-8 col-lg-8'>
          {topCoins ? <TopCoinChart topCoinList = {topCoins}/> : <MySpinner />}
        </div>
        {/* <div className='col-2 ' >
          <div className='card email-susb' >
            <div className='card-body text-center' >
              <div className='pt-2'>
                <img src={metaverse} alt='' />
              </div>
              <div className='toatal-email' >
                <h3 className='heading'>2.2M+ Projects</h3>
                <h5>Contribute new project with us</h5>
              </div>
              <Button onClick={handleAddProject} className='btn btn-primary email-btn'>
                   Add Projects
              </Button>
            </div>
          </div>
        </div> */}
        {/* LIST HOT DISCUSS  */}
        <div className=' col-4 col-lg-4'>
          <TopCoins />
        </div>
      </div>

      <div className='row'>
        {/* Scam percentage each chains chart */}
        <div className='col-8'>
          {summaryData ? <ScamEachChainsList data={setScamDataEachChains(summaryData)}/> : <MySpinner/>}
        </div>
        <div className='col-4 col-xl-4'>
          {summaryData ? <DataAllocationChart header={'Blockchains Data Allocation In Gear5'} data={setTotalCrytosData(summaryData)}/> : <MySpinner/>}
        </div>
      </div>
    </>
  )
}
export default Home
