// import PerfectScrollbar from 'react-perfect-scrollbar'
import { TopDiscussedItem } from './top-disussed-item'
import { HotTopicsContext } from '../../../../../App'
import { useContext } from 'react'
import _ from 'lodash'

export const TopDiscussed = () => {
  const hotList = useContext(HotTopicsContext)
  let list = []
  if (hotList?.length > 5) {
    list = hotList?.sort((a, b) => parseInt(b?.detail?.totalReviews) - parseInt(a?.detail?.totalReviews))?.slice(0, 5)
  } else {
    list = hotList?.sort((a, b) => parseInt(b?.detail?.totalReviews) - parseInt(a?.detail?.totalReviews))
  }

  return <div className='card pb-0' style={{ height: '100%' }}>
    <div className='card-header border-0 pb-0'>
      <h2 className='heading' style={{ marginBottom: '1rem' }}>Hot Topics</h2>
    </div>
    <div className='card-body' style={{ padding: '0 0.7rem' }}>
      <div
        style={{ height: '100%' }}
        id='DZ_W_Todo2'
        className='widget-media dz-scroll height370 ps ps--active-y'
      >
        <ul className='timeline'>
          {!_.isEmpty(list) ? list?.map((item, index) => <TopDiscussedItem key={index} item={item}/>
          ) : <div>No hot topics available</div>}
        </ul>
      </div>
    </div>
  </div>
}
