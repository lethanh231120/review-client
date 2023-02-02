import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
//  import {NavLink} from 'react-router-dom';
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'

// Import Components
import { ThemeContext } from '../../../context/ThemeContext'
import BalanceCardSlider from './Dashboard/BalanceCardSlider'
//  import MorrisDonught from './Dashboard/MorrisDonught';
//  import OrderForm from './Dashboard/OrderForm'
//  import ServerStatusBar from './Dashboard/ServerStatusBar';

// images
import coin from './../../../images/coin.png'
import { TopCoins } from '../common-widgets/home/top-coin'
import { RecentlyScam } from '../common-widgets/home/recently-scam'
import { TopDiscussed } from '../common-widgets/home/top-discuss-project'

const DashboardComboChart = loadable(() =>
  pMinDelay(import('./Dashboard/DashboardComboChart'), 1000)
)
const AssetsChart = loadable(() =>
  pMinDelay(import('./Dashboard/AssetsChart'), 1000)
)

const pickerData = [
  { fillcolor: '#FF0000', datatitle: 'Scam or Dead Projects', amount: '1000000' },
  { fillcolor: '#32CD32', datatitle: 'Alive Projects', amount: '100000' }
  // { fillcolor: 'var(--primary)', datatitle: 'BNB(10%)', price: '69' },
  // { fillcolor: '#E085E4', datatitle: 'ETH(10%)', price: '154' }
]

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
                      <h2>Add your projects here</h2>
                      <p>
                        By adding your new founded project, this helps Gear5 grows stronger.
                      </p>
                      <Link to={'/exchange'} className='btn btn-primary'>
                        Add project
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
              <BalanceCardSlider />
            </div>

          </div>
        </div>
        <div className='col-4 '>
          <TopCoins/>
        </div>
      </div>
      <div className='row'>
        <div className='col-xl-4 assets-al col-lg-4 col-md-4 ' >
          <div className='card'>
            <div className='card-header border-0 pb-0'>
              <h2 className='heading'>Data Allocation</h2>
            </div>
            <div className='card-body text-center pt-0 pb-4'>
              <div id='morris_donught' className='custome-donut'>
                {/* <MorrisDonught /> */}
                <AssetsChart />
              </div>
              <div className='chart-items'>
                <div className='row'>
                  <div className=' col-xl-12 col-sm-12 '>
                    <div className='text-start '>

                      {pickerData.map((data, ind) => (
                        <div className='color-picker' key={ind}>
                          <span className='mb-0 col-6 fs-14'>
                            <svg
                              className='me-2'
                              width='16'
                              height='16'
                              viewBox='0 0 14 14'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <rect
                                width='14'
                                height='14'
                                rx='4'
                                fill={data.fillcolor}
                              />
                            </svg>
                            {data.datatitle}
                          </span>
                          <h5>{data.amount}</h5>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='col-xl-8 col-md-8 col-lg-8'>
          <div className='card'>
            <div className='card-header border-0 align-items-start flex-wrap pb-0'>
              <div>
                <h2 className='heading'>BTC Chart</h2>
                <div className='market-data'>

                </div>
              </div>

            </div>
            <div className='card-body'>
              {/* <div id="tradingview_e8053" className="tranding-chart"></div> */}
              <DashboardComboChart />
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {/* LIST SCAM  */}
        <div className='col-8'>
          <RecentlyScam/>
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
