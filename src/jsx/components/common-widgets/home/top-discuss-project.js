import { BtcIcon, EthIcon, LtcIcon, XtzIcon } from '../../Dashboard/SvgIcon'

const mockData = [
  { logo: BtcIcon, name: 'Bitcoin', symbol: 'BTC', classBg: 'bg-success', price: '22000' },
  { logo: EthIcon, name: 'Dogecoin', symbol: 'DGC', classBg: 'bg-success', price: '0.05' },
  { logo: XtzIcon, name: 'Long Coin', symbol: 'LONG', classBg: 'bg-success', price: '1000' },
  { logo: LtcIcon, name: 'NIKA COIN', symbol: 'NIKA', classBg: 'bg-success', price: '5000' }
]

export const TopDiscussed = () => {
  return <div className='row top-coin' >
    <div className='market-previews'>
      <div className='card'>
        <div className='card-header border-0 pb-0'>
          <div>
            <h2 className='heading'>Hot Discussed Projects </h2>
          </div>
        </div>
        <div className='card-body pt-0 px-0'>
          {mockData.map((data, ind) => (
            <div className='previews-info-list' key={ind}>
              <div className='pre-icon'>
                <span
                  className={`icon-box icon-box-sm ${data.classBg}`}
                >
                  {data?.logo}
                </span>
                <div className='ms-3'>
                  <h6>{data.name}</h6>
                  {data?.symbol}
                </div>
              </div>
              <div className='reason'>
                <h6>${data.price}</h6>

              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
}
