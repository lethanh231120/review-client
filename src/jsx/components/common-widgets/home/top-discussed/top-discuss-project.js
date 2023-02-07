import PerfectScrollbar from 'react-perfect-scrollbar'
import { TopDiscussedItem } from './top-disussed-item'
import { useState, useEffect } from 'react'
import { get } from '../../../../../api/BaseRequest'

export const TopDiscussed = () => {
  const [hotList, setHotList] = useState()

  useEffect(() => {
    const getHotList = async() => {
      const res = await get('reviews/hot')
      if (res?.code === '200') {
        setHotList(res?.data?.products)
      }
    }
    getHotList()
  }, [])

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
          {hotList?.map((item, index) => <TopDiscussedItem key={index} item={item}/>
          )}
        </ul>
      </PerfectScrollbar>
    </div>
  </div>
}
