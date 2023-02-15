import _ from 'lodash'
import { ReviewItem } from './review-item'

export const ReviewList = ({ data }) => {
  let list = []
  const NO_OF_REVIEWS_SHOW = 9
  if (data?.length > NO_OF_REVIEWS_SHOW) {
    list = data?.slice(0, NO_OF_REVIEWS_SHOW)
  } else {
    list = data
  }
  return <div className='row ' >
    <div className='col-12 mb-2'> <h2 className='heading' >Recent Reviews</h2></div>
    {!_.isEmpty(list) && list?.map((item, index) => <ReviewItem
      key={index}
      data={item && item}
    />)}
  </div>
}
