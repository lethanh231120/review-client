
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ScamItem } from './recently-scam-item'

const mockData = [
  { logo: 'https://images.cointelegraph.com/images/746_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS9zdG9yYWdlL3VwbG9hZHMvdmlldy9hNGFkNDk1ZmMwNGJkOTdmNzE2NDlhNDhkNjAwM2QwMC5wbmc=.png', name: 'Scam Bot', symbol: 'SCB', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', reason: 'Lock user transaction', type: 'Token', classBg: 'bg-success' },
  { logo: 'https://logos-world.net/wp-content/uploads/2020/11/Razer-Logo.png', name: 'Razer', symbol: 'RZR', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', reason: 'Rug pull', type: 'Token', classBg: 'bg-success' },
  { logo: 'https://c8.alamy.com/comp/DC19T1/singapore-1-coin-periwinkle-flower-lochnera-rosea-DC19T1.jpg', name: 'Flower', symbol: 'FLW', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', reason: 'Reported for blocking user after making transaction', type: 'Token', classBg: 'bg-success' },
  { logo: 'https://seeklogo.com/images/B/binance-coin-bnb-logo-CD94CC6D31-seeklogo.com.png', name: 'Binance Fake', website: 'www.binance-fake.com', reason: 'Web Phishing', type: 'Exchange', classBg: 'bg-success' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Uniswap_Logo.svg/1026px-Uniswap_Logo.svg.png', name: 'Uniswap Fake', website: 'www.uni-fake.com', reason: 'Web Phishing', type: 'Exchange', classBg: 'bg-success' }
]

export const RecentlyScam = () => {
  return <div className='card  pb-0'>
    <div className='card-header border-0 pb-0'>
      <h2 className='heading'>Recently Scam Projects</h2>
    </div>
    <div className='card-body'>
      <PerfectScrollbar
        style={{ height: '370px' }}
        id='DZ_W_Todo3'
        className='widget-media dz-scroll height370 ps ps--active-y'
      >
        <ul className='timeline'>
          {
            mockData.map(item => <ScamItem key={item?.address} item={item} />)
          }
        </ul>
      </PerfectScrollbar>
    </div>
  </div>
}

