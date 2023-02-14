import Avatar from 'antd/es/avatar/avatar'
import './reviews-item.scss'
import imgshit from './shit-icon.svg'

export const ReviewItem = ({ username, avatar, title, star, content, productId, productName, isScam }) => {
  return <div className='col-lg-6 col-xl-4'>
    <div className='card cus-review-card'>
      <div className='card-body cus-review-card-item'>
        <div className='new-arrival-content'>
          <div className='d-flex '>
            <Avatar className='mt-1' size={40} src={avatar} />
            <div className=' ms-2 mt-1'>
              {reviewStarsRender(star, isScam)}
              5 mins ago
            </div>
          </div>
          <div className='username-text mt-2' >{username}&nbsp;
            {productName && <span><span className={isScam ? 'text-danger' : ''}>{isScam && isScam ? 'reported' : 'reviewed'}&nbsp;</span><a className='text-primary'style={{ cursor: 'pointer' }}><span className='product-name-text'>{productName}</span></a></span>}
          </div>
          {/* <h4>
            {title || 'No Title'}
          </h4> */}
          <p className='mt-1'>
            {shortenContent(content) || 'No Content'}
          </p>
        </div>
      </div>
    </div>
  </div>
}

const shortenContent = (content) => {
  const WORDS_AMOUNT = 100
  if (content) {
    if (content?.length >= WORDS_AMOUNT) {
      return `${content?.slice(0, WORDS_AMOUNT)}...`
    } else {
      return content
    }
  } else {
    return ''
  }
}

const reviewStarsRender = (star, isScam) => {
  let starCount = 0
  starCount = star && parseInt(star)

  return <div className='comment-review star-rating'>
    {isScam
      ? <ul>
        {' '}
        {
          [... new Array(3)].map((item, index) => {
            return <img key={index} src={imgshit}/>
          })
        }
      </ul>
      : <ul>
        {' '}
        {
          [... new Array(starCount)].map((item, index) => {
            return <li key={index}>
              <i className='fa fa-star' />
            </li>
          })
        }

      </ul>}
  </div>
}
