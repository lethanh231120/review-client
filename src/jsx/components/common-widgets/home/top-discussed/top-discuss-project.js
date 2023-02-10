// import PerfectScrollbar from 'react-perfect-scrollbar'
import { TopDiscussedItem } from './top-disussed-item'
import { useState, useEffect } from 'react'
import { get } from '../../../../../api/BaseRequest'
import _ from 'lodash'

export const TopDiscussed = () => {
  const [hotList, setHotList] = useState()

  useEffect(() => {
    const getHotList = async() => {
      const res = await get('reviews/hot')
      if (res?.code === '200') {
        if (res?.data?.products && !_.isEmpty(res?.data?.products)) {
          const list = res?.data?.products

          const sorted = list?.sort((a, b) => parseInt(a?.totalReviews) - parseInt(b?.totalReviews))
          if (sorted?.length > 5) {
            setHotList(sorted?.slice(0, 5))
          } else {
            setHotList(res?.data?.products)
          }
        }
      }
    }
    getHotList()
  }, [])

  return <div className='card pb-0'>
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
