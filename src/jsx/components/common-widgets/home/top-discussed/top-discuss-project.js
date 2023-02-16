// import PerfectScrollbar from 'react-perfect-scrollbar'
import { TopDiscussedItem } from './top-disussed-item'
import { HotTopicsContext } from '../../../../../App'
import { useContext } from 'react'

export const TopDiscussed = () => {
  const hotList = useContext(HotTopicsContext)

  return <div className='card pb-0' style={{ height: '100%' }}>
    <div className='card-header border-0 pb-0'>
      <h2 className='heading' style={{ marginBottom: '-10px' }}>Hot Topics</h2>
    </div>
    <div className='card-body'>
      <div
        style={{ height: '100%' }}
        id='DZ_W_Todo2'
        className='widget-media dz-scroll height370 ps ps--active-y'
      >
        <ul className='timeline'>
          {hotList?.map((item, index) => <TopDiscussedItem key={index} item={item}/>
          )}
        </ul>
      </div>
    </div>
  </div>
}
