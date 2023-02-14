import _ from 'lodash'
import { ReviewItem } from './review-item'

export const ReviewList = ({ data }) => {
  let list = []

  if (data?.length > 6) {
    list = data?.slice(0, 6)
  } else {
    list = data
  }

  return <div className='row ' >
    <div className='col-12 mb-2'> <h2 className='heading' >Recent Reviews</h2></div>
    {!_.isEmpty(list) && list?.map((item, index) => <ReviewItem
      key={index}
      productId={item?.productId}
      title={item?.title}
      star={item?.star}
      content={item?.content}
      username={item?.name}
      avatar={item?.image}
      isScam={item?.isScam}
      productName={item?.productName}
    />)}
  </div>
}
