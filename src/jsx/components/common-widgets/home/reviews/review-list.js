import _ from 'lodash'
import { useEffect, useState } from 'react'
import { ReviewItem } from './review-item'
import './reviews-item.scss'

const REVIEW_WS_URL = 'wss://dev-be.client.gear5.guru/reviews/review/latest'
// const ANONYMOUS_ID = '00000000-0000-0000-0000-000000000000'
export const ReviewList = () => {
  const [reviewList, setReviewList] = useState([])
  const [screenWidth, setScreenWidth] = useState()
  const [newListReview, setNewListReview] = useState([])

  useEffect(() => {
    const socket = new WebSocket(REVIEW_WS_URL)

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
      if (temp !== 'ping') {
        setReviewList(reviewList => [temp, ...reviewList])
      } else {
        socket?.send('pong')
      }
    })
  }, [])

  useEffect(() => {
    if (reviewList?.length > 12) {
      const copyArr = [...reviewList]
      copyArr.pop()
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
    <div className='col-12 mb-2'> <h2 className='heading' >Recent Reviews</h2></div>
    { !_.isEmpty(newListReview) ? newListReview?.map((item, index) =>
      <ReviewItem
        key={index}
        data={item && item}
      />
    ) : <div>There are currently no reviews</div> }
  </div>
}
