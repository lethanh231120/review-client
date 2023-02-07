import PerfectScrollbar from 'react-perfect-scrollbar'
import { TopDiscussedItem } from './top-disussed-item'

export const TopDiscussed = ({ topList }) => {
  console.log(topList)
  return <div className='card pb-0'>
    <div className='card-header border-0 pb-0'>
      <h2 className='heading'>Top Discussed Projects</h2>
    </div>
    <div className='card-body'>
      <PerfectScrollbar
        style={{ height: '370px' }}
        id='DZ_W_Todo2'
        className='widget-media dz-scroll height370 ps ps--active-y'
      >
        <ul className='timeline'>
          {topList?.map((item, index) => <TopDiscussedItem key={index} item={item}/>
          )}
        </ul>
      </PerfectScrollbar>
    </div>
  </div>
}
