import _ from 'lodash'
import { useEffect, useState } from 'react'
import { ReviewItem } from './review-item'
import './reviews-item.scss'
import SekeletonReviewItem from '../../../skeleton/skeleton-review/SekeletonReviewItem'

// const REVIEW_WS_URL = 'wss://api-client.gear5.io/reviews/review/latest'
const REVIEW_WS_URL = 'wss://api-ver1.gear5.io/reviews/review/latest'
// const ANONYMOUS_ID = '00000000-0000-0000-0000-000000000000'
export const ReviewList = ({ isHome }) => {
  const [reviewList, setReviewList] = useState([])
  const [screenWidth, setScreenWidth] = useState()
  const [newListReview, setNewListReview] = useState([])
  const length = isHome ? 12 : 6
  useEffect(() => {
    const socket = new WebSocket(REVIEW_WS_URL)

    socket?.addEventListener('open', () => {
      // console.log('WS opened')
    })

    socket?.addEventListener('close', () => {
      // console.log('WS closed')
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
      // const copyArr = [...reviewList]
      // copyArr.pop()
      const copyArr = reviewList?.slice(0, length)
      setReviewList(copyArr)
    }
  }, [reviewList?.length])

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
    if (screenWidth > 1200) {
      setNewListReview(reviewList)
    }
    if (screenWidth < 1200) {
      setNewListReview(reviewList && reviewList?.slice(0, 8))
    }
    if (screenWidth < 767) {
      setNewListReview(reviewList && reviewList?.slice(0, 6))
    }
  }, [screenWidth, reviewList])

  return <div className='row'>
    <div className='col-12 mb-2'> <h3 className='heading' >Recent Reviews</h3></div>
    { !_.isEmpty(newListReview) ? newListReview?.map((item, index) =>
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
