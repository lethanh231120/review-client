import { BtcIcon, EthIcon, XtzIcon, LtcIcon } from '../../Dashboard/SvgIcon'

const marketBlog = [
  { icon: BtcIcon, classBg: 'bg-success', Name: 'Bitcoin', symbol: 'BTC' },
  { icon: EthIcon, classBg: 'bg-warning', Name: 'Ethereum', symbol: 'ETH' },
  { icon: XtzIcon, classBg: 'bg-primary', Name: 'Binance', symbol: 'BNB' },
  { icon: LtcIcon, classBg: 'bg-pink', Name: 'LTCCoin', symbol: 'LTC' },
  { icon: XtzIcon, classBg: 'bg-primary', Name: 'XTZCoin', symbol: 'XTZ' }
]

export const TopCoins = () => {
  return <div className='row top-coin' >
    <div className='market-previews'>
      <div className='card'>
        <div className='card-header border-0 pb-0'>
          <div className='d-flex justify-content-between'>
            <h2 className='heading'>Top Coins</h2>
            <div className='btn-sm'>See all</div>
          </div>
        </div>
        <div className='card-body pt-0 px-0'>
          {marketBlog.map((data, ind) => (
            <div className='previews-info-list' key={ind}>
              <div className='pre-icon'>
                <span
                  className={`icon-box icon-box-sm ${data.classBg}`}
                >
                  {data.icon}
                </span>
                <div className='ms-3'>
                  <h6>{data.Name}</h6>
                  {data?.symbol}
                </div>
              </div>
              <div className='count'>
                <h6>120.45</h6>
                <span className={ind % 2 === 0 ? 'text-success' : ''}>
                1,24%
                </span>
              </div>
              <div className='chart-img' >
                <img src={ind % 2 === 0 ? 'https://www.coingecko.com/coins/1/sparkline' : 'https://www.coingecko.com/coins/13029/sparkline'} width={100} height={40} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
}
