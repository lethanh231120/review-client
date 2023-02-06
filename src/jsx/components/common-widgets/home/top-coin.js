import { Avatar } from 'antd'

// const marketBlog = [
//   { icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579', classBg: 'bg-success', Name: 'Bitcoin', symbol: 'BTC', price: '23,343.86', change: '1.1', chart: 'https://www.coingecko.com/coins/1/sparkline' },
//   { icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880', classBg: 'bg-warning', Name: 'Ethereum', symbol: 'ETH', price: '1,654.02', change: '3.5', chart: 'https://www.coingecko.com/coins/279/sparkline' },
//   { icon: 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1668148663', classBg: 'bg-primary', Name: 'Tether', symbol: 'USDT', price: '1.00', change: '-0.1', chart: 'https://www.coingecko.com/coins/325/sparkline' },
//   { icon: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850', classBg: 'bg-pink', Name: 'BNB', symbol: 'BNB', price: '329.41', change: '6.8', chart: 'https://www.coingecko.com/coins/825/sparkline' },
//   { icon: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389', classBg: 'bg-primary', Name: 'USD Coin', symbol: 'USDC', price: '1.00', change: '-0.1', chart: 'https://www.coingecko.com/coins/825/sparkline' },
//   { icon: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png?1605778731', classBg: 'bg-primary', Name: 'XRP', symbol: 'XRP', price: '0.409264', change: '-1.1', chart: 'https://www.coingecko.com/coins/44/sparkline' }
// ]

export const TopCoins = ({ data }) => {
  const top6 = data?.slice(0, 5)

  return <div className='row top-coin ' >
    <div className='market-previews'>
      <div className='card'>
        <div className='card-header border-0 pb-0'>
          <div >
            <h2 className='heading'>Top Coins</h2>
          </div>
        </div>
        <div className='card-body pt-0 px-0'>
          {top6?.map((item, index) => (
            <div className='previews-info-list' key={index}>
              <div className='pre-icon' style={{ width: '200px' }}>
                <span
                  className='top-coin-icon'
                >
                  <Avatar src={ item?.bigLogo}></Avatar>
                </span>
                <div className='ms-3'>
                  <h6>{item?.name}</h6>
                  {item?.symbol}
                </div>
              </div>
              <div className='count' style={{ width: '100px' }}>
                <h6>${item?.priceUSD}</h6>
                {/* <span className={parseInt(data.change) > 0 ? 'text-success' : 'text-danger'}>
                  { data.change}%
                </span> */}
              </div>
              <div className='chart-img' >
                <img className='img-fluid' alt='' src={`https://www.coingecko.com/coins/${index + 1}/sparkline`} width={100} height={40} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
}
