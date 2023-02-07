import { Avatar } from 'antd'

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
                <h6>${new Intl.NumberFormat().format(item?.priceUSD)}</h6>
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
