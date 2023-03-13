// import PerfectScrollbar from 'react-perfect-scrollbar'
import { useEffect, useState } from 'react'
import { TopDiscussedItem } from './top-disussed-item'
import { HotTopicsContext } from '../../../../../App'
import { useContext } from 'react'
import _ from 'lodash'
import { MySkeletonLoadinng } from '../../my-spinner'

export const TopDiscussed = () => {
  const hotList = useContext(HotTopicsContext)
  const [screenWidth, setScreenWidth] = useState()
  const [list, setList] = useState()
  const [topCoin, setTopCoin] = useState()
  useEffect(() => {
    setList(hotList?.sort((a, b) => parseInt(b?.totalReviews) - parseInt(a?.totalReviews)))
  }, [hotList])

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window
      setScreenWidth(width)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenWidth > 3000) {
      setTopCoin(list && list?.slice(0, 9))
    }
    if (screenWidth < 3000) {
      setTopCoin(list && list?.slice(0, 8))
    }
    if (screenWidth < 2700) {
      setTopCoin(list && list?.slice(0, 7))
    }
    if (screenWidth < 2400) {
      setTopCoin(list && list?.slice(0, 6))
    }
    if (screenWidth < 1600) {
      setTopCoin(list && list?.slice(0, 5))
    }
    if (screenWidth < 1200) {
      setTopCoin(list && list?.slice(0, 6))
    }
    if (screenWidth < 992) {
      setTopCoin(list && list?.slice(0, 5))
    }
  }, [screenWidth, list])

  return <div className='card pb-0' style={{ height: '100%' }}>
    <div className='card-header border-0 pb-0'>
      <h5 className='heading text-primary' style={{ marginBottom: '1rem' }}>Hot Topics</h5>
    </div>
    <div className='card-body' style={{ padding: '0 0.7rem' }}>
      <div
        style={{ height: '100%' }}
        id='DZ_W_Todo2'
        className='widget-media height370 ps ps--active-y'
      >
        <ul className='timeline'>
          {!_.isEmpty(topCoin) ? topCoin?.map((item, index) => <TopDiscussedItem key={index} item={item}/>
          ) : <MySkeletonLoadinng count={6} height={60}/>}
        </ul>
      </div>
    </div>
  </div>
}
