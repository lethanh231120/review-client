
import { ScamItem } from './recently-scam-item'

export const RecentlyScam = ({ scamList }) => {
  let list = []
  if (scamList?.length > 5) {
    list = scamList?.slice(0, 5)
  } else {
    list = scamList
  }

  return <div className='card  pb-0'>
    <div className='card-header border-0 pb-0'>
      <h2 className='heading'>Recently Scam Projects</h2>
    </div>
    <div className='card-body'>
      <div
        style={{ height: '100%' }}
        id='DZ_W_Todo3'
        className='widget-media dz-scroll height370 ps ps--active-y'
      >
        <ul className='timeline'>
          {
            list?.map((item, index) => <ScamItem key={index} item={item} />)
          }
        </ul>
      </div>
    </div>
  </div>
}

