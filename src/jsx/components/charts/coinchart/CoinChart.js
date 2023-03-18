import React from 'react'
import { formatMoneyLessOneDollar, formatMoneyGreaterEqualOneDollar, formatLargeNumberMoneyUSD, formatLargeNumber } from '../../../../utils/formatNumber'
import TradingViewWidget from '../../common-widgets/home/home-chart/trading-view-chart'

const CoinChart = ({ name, symbol, price, marketCap, totalSupply, holders, transfer, symbolForChart }) => {
  const STABLE_COINS = ['USDT', 'USDC', 'DAI', 'BUSD']
  const STABLE_SYMBOlS = []
  STABLE_COINS.forEach(symbol => {
    STABLE_SYMBOlS.push(`BINANCE:${symbol}USDT`)
  })

  return (
    <>
      <div className='coin-content'>
        <div className='card-header border-0 flex-wrap cus-card-header'>
          <div className='mb-2'>
            <h2 className='heading text-primary m-0'>{name} Market Info</h2>
            {/* <span className='fs-16'>
              Lorem ipsum dolor sit amet, consectetur
            </span> */}
          </div>
        </div>
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between flex-wrap'>
            <div className='d-flex align-items-center justify-content-between flex-wrap'>
              {price > 0 && <div className='price-content'>
                <span className='fs-18 d-block mb-2'>Price</span>
                <h4 className='fs-20 font-w600'>{price < 1 ? formatMoneyLessOneDollar(price) : formatMoneyGreaterEqualOneDollar(price) }</h4>
              </div>}
              {marketCap > 0 && <div className='price-content'>
                <span className='fs-14 d-block mb-2'>Market Cap</span>
                <h4 className='font-w600'>{formatLargeNumberMoneyUSD(marketCap)}</h4>
              </div>}
              {totalSupply > 0 && <div className='price-content'>
                <span className='fs-14 d-block mb-2'>Total Supply</span>
                <h4 className='font-w600'>{formatLargeNumber(totalSupply)}</h4>
              </div>}
              {holders > 0 && <div className='price-content'>
                <span className='fs-14 d-block mb-2'>Holders</span>
                <h4 className='font-w600'>{formatLargeNumber(holders)}</h4>
              </div>}
              {transfer > 0 && <div className='price-content'>
                <span className='fs-14 d-block mb-2'>Transfer</span>
                <h4 className='font-w600'>{formatLargeNumber(transfer)}</h4>
              </div>}
            </div>
          </div>
          {/* <div id="bitcoinhChart"></div> */}
          <div className='mt-2'>
            {symbolForChart && !STABLE_SYMBOlS.includes(symbolForChart) && <TradingViewWidget symbol={symbolForChart}/> }
          </div>
        </div>
      </div>
    </>
  )
}
export default CoinChart
