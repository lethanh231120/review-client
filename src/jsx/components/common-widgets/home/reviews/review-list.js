import _ from 'lodash'
import { useEffect, useState } from 'react'
import { ReviewItem } from './review-item'
import './reviews-item.scss'
import SekeletonReviewItem from '../../../skeleton/skeleton-review/SekeletonReviewItem'
import { WS_URL } from '../../../../../api/BaseRequest'
// const REVIEW_WS_URL = 'wss://api-ver1.gear5.io/reviews/review/latest'
export const ReviewList = ({ isHome }) => {
  const [reviewList, setReviewList] = useState([])

  const length = isHome ? 12 : 6
  useEffect(() => {
    const socket = new WebSocket(`${WS_URL}/reviews/review/latest`)

    socket?.addEventListener('open', () => {
      console.log('WS opened')
    })

    socket?.addEventListener('close', () => {
      console.log('WS closed')
    })

    socket?.addEventListener('error', (error) => {
      console.log('WS error' + error)
    })

    socket?.addEventListener('message', (data) => {
      const temp = JSON.parse(data?.data)

      if (temp?.type === 'add') {
        const data = temp?.data
        setReviewList(reviewList => [data, ...reviewList])
      } else if (temp?.type === 'ping') {
        socket?.send('pong')
      } else if (temp?.type === 'remove') {
        const reviewId = temp?.data
        setReviewList(reviewList => reviewList?.filter(item => item?.id !== reviewId))
      }
    })
  }, [])

  useEffect(() => {
    if (reviewList?.length > length) {
      const copyArr = reviewList?.slice(0, length)
      setReviewList(copyArr)
    }
  }, [reviewList?.length])

  return <div className='row'>
    <div className='col-12 mb-2'> <h3 className='heading' >Recent Reviews</h3></div>
    { !_.isEmpty(reviewList) ? reviewList?.map((item, index) =>
      <ReviewItem
        key={index}
        data={item && item}
      />
    ) : <>
      <SekeletonReviewItem/>
      <SekeletonReviewItem/>
      <SekeletonReviewItem/>
      <SekeletonReviewItem/>
      <SekeletonReviewItem/>
      <SekeletonReviewItem/>
      <SekeletonReviewItem/>
      <SekeletonReviewItem/>
    </> }
  </div>
}
