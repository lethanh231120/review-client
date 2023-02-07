import React from 'react'
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import { formatMoney } from '../../../../utils/formatNumber'

const BitCoinChart = loadable(() => pMinDelay(import('../../Crypto/Coin/BitCoinChart'), 1000))

const CoinChart = ({ symbol, price, marketCap, totalSupply, holders, transfer, chartData }) => {
  return (
    <>
      <div className='card coin-content'>
        <div className='card-header border-0 flex-wrap'>
          <div className='mb-2'>
            <h4 className='heading m-0'>{symbol} Chart</h4>
            {/* <span className='fs-16'>
              Lorem ipsum dolor sit amet, consectetur
            </span> */}
          </div>
        </div>
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between flex-wrap'>
            <div className='d-flex align-items-center justify-content-between flex-wrap'>
              <div className='price-content'>
                <span className='fs-18 d-block mb-2'>Price</span>
                <h4 className='fs-20 font-w600'>${price}</h4>
              </div>
              {/* <div className='price-content'>
                <span className='fs-14 d-block mb-2'>24h% change</span>
                <h4 className='font-w600 text-success'>
                  1.64%
                  <i className='fa-solid fa-caret-up ms-1 text-success'></i>
                </h4>
              </div> */}
              <div className='price-content'>
                <span className='fs-14 d-block mb-2'>Market Cap</span>
                <h4 className='font-w600'>{formatMoney(marketCap)}</h4>
              </div>
              <div className='price-content'>
                <span className='fs-14 d-block mb-2'>Total Supply</span>
                <h4 className='font-w600'>{formatMoney(totalSupply)}</h4>
              </div>
              <div className='price-content'>
                <span className='fs-14 d-block mb-2'>Holders</span>
                <h4 className='font-w600'>{formatMoney(holders)}</h4>
              </div>
              <div className='price-content'>
                <span className='fs-14 d-block mb-2'>Trannsfer</span>
                <h4 className='font-w600'>{formatMoney(transfer)}</h4>
              </div>
            </div>
            {/* <div className='d-flex align-items-center'>
              <h4 className='me-5 font-w600 mb-0'>
                <span className='text-success me-2'>BUY</span> $5,673
              </h4>
              <h4 className='font-w600 mb-0'>
                <span className='text-danger me-2'>SELL</span> $5,982
              </h4>
            </div> */}
          </div>
          {/* <div id="bitcoinhChart"></div> */}
          <BitCoinChart chartData={chartData}/>
        </div>
      </div>
    </>
  )
}
export default CoinChart
