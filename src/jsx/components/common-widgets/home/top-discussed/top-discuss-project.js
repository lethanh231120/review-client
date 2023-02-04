import PerfectScrollbar from 'react-perfect-scrollbar'
import { TopDiscussedItem } from './top-disussed-item'
const mockData = [
  { logo: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png?1547792256', name: 'DogeCoin', symbol: 'DOGE', type: 'Token' },
  { logo: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png?1622619446', name: 'Shiba Inu', symbol: 'SHIB', type: 'Token' },
  { logo: 'https://assets.coingecko.com/coins/images/2538/small/theta-token-logo.png?1548387191', name: 'FTX', type: 'Exchange' },
  { logo: 'https://assets.coingecko.com/coins/images/25767/small/01_Luna_color.png?1653556122', name: 'Terra', symbol: 'LUNA', type: 'Token' },
  { logo: 'https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png?1606986688', name: 'Kyberswap', type: 'Exchange' },
  { logo: 'https://assets.coingecko.com/coins/images/1372/small/WAX_Coin_Tickers_P_512px.png?1602812260', name: 'WAX', symbol: 'WAXP', type: 'Token' }
]

export const TopDiscussed = () => {
  return <div className='card pb-0'>
    <div className='card-header border-0 pb-0'>
      <h4 className='card-title'>Top Discussed Projects</h4>
    </div>
    <div className='card-body'>
      <PerfectScrollbar
        style={{ height: '370px' }}
        id='DZ_W_Todo2'
        className='widget-media dz-scroll height370 ps ps--active-y'
      >
        <ul className='timeline'>
          {mockData.map(item => <TopDiscussedItem key={item?.name} item={item}/>
          )}
        </ul>
      </PerfectScrollbar>
    </div>
  </div>
}
