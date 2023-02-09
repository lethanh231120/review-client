import { ReviewItem } from './review-item'

const mockData = [
  { title: 'This exchange is trash', star: 1, reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },

  { title: 'This exchange is good', star: 3, reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },

  { title: 'This exchange is fantastic', star: 5, reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
  { title: 'This exchange is fantastic', star: 5, reason: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' }
]

export const ReviewList = () => {
  return <div className='row'>
    {mockData.map((item, index) => <div className='col-6' key={index}><ReviewItem title={item.title} star={item.star} reason={item.reason} /></div>)}
  </div>
}
