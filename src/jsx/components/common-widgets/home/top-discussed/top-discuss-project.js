// import PerfectScrollbar from 'react-perfect-scrollbar'
import { TopDiscussedItem } from './top-disussed-item'
import { HotTopicsContext } from '../../../../../App'
import { useContext } from 'react'

export const TopDiscussed = () => {
  const hotList = useContext(HotTopicsContext)
  let list = []
  if (hotList?.length > 5) {
    list = hotList?.slice(0, 5)
  } else {
    list = hotList
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
        {list?.map((item, index) => <TopDiscussedItem key={index} item={item}/>
        )}
      </div>
    </div>
  </div>
}
