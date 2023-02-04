import React, { useContext, useEffect } from 'react'
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

const Home = () => {
  const { changeBackground } = useContext(ThemeContext)
  useEffect(() => {
    changeBackground({ value: 'light', label: 'Light' })
  }, [])

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
                      <Link to={'#'} className='btn btn-danger '>
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
              <SummaryRow />
            </div>
          </div>
        </div>
        <div className='col-4 '>
          <DataAllocationChart />
        </div>
      </div>
      <div className='row'>
        <div className='col-8 assets-al' >
          <BitcoinChartAndData />

        </div>
        <div className='col-4 col-xl-4'>
          <TopCoins />
        </div>
      </div>
      <div className='row'>
        {/* LIST SCAM  */}
        <div className='col-6'>
          <RecentlyScam/>
        </div>
        <div className='col-xl-2 col-sm-2'>
          <div className='card email-susb'>
            <div className='card-body text-center'>
              <div className=''>
                <img src={metaverse} alt='' />
              </div>
              <div className='toatal-email'>
                <h4>2.2M+ Products</h4>
                <h5>Contribute new project with us</h5>
              </div>
              <Link to={'#'} className='btn btn-primary email-btn'>
                   Add Projects
              </Link>
            </div>
          </div>
        </div>
        {/* LIST HOT DISCUSS  */}
        <div className='col-4'>
          <TopDiscussed />
        </div>
      </div>
    </>
  )
}
export default Home
