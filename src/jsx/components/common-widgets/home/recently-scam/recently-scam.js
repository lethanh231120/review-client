
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ScamItem } from './recently-scam-item'

export const RecentlyScam = ({ scamList }) => {
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
            scamList?.map((item, index) => <ScamItem key={index} item={item} />)
          }
        </ul>
      </PerfectScrollbar>
    </div>
  </div>
}

