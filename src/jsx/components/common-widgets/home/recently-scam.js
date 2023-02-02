import { Badge } from 'react-bootstrap'
import { BtcIcon, EthIcon, LtcIcon, XtzIcon } from '../../Dashboard/SvgIcon'

const mockData = [
  { logo: BtcIcon, name: 'Scam Bot', symbol: 'SCB', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', reason: 'Lock user transaction', classBg: 'bg-success' },
  { logo: EthIcon, name: 'Razer', symbol: 'RZR', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', reason: 'Rug pull', classBg: 'bg-success' },
  { logo: XtzIcon, name: 'Flower', symbol: 'FLW', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', reason: 'Reported for blocking user after making transaction', classBg: 'bg-success' },
  { logo: LtcIcon, name: 'Zesus', symbol: 'ZUS', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', reason: 'Rug pull', classBg: 'bg-success' }
]

export const RecentlyScam = () => {
  return <div className='row top-coin' >
    <div className='market-previews'>
      <div className='card'>
        <div className='card-header border-0 pb-0'>
          <div>
            <h2 className='heading'>Recently Scam Projects</h2>
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
                  <h6>{data.name}({data?.symbol})</h6>
                  {data.address.substring(0, 20)}...
                </div>
              </div>
              <div className='reason'>
                <h6>{data.reason}</h6>

              </div>
              <div className='warning' >
                <Badge bg=' badge-l ' className='badge-danger light'>
                  Scam
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
}
