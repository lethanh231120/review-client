import Avatar from 'antd/es/avatar/avatar'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import './reviews-item.scss'
import imgshit from './shit-icon.svg'

export const ReviewItem = ({ data }) => {
  const navigate = useNavigate()

  const onClicked = () => {
    const id = data?.productId
    console.log(id)
    const splitted = id && id?.split('_')
    const type = splitted && splitted[1]

    if (type === 'crypto') {
      navigate(`../../../../../products/crypto/${type}/${splitted[2]}`)
    } else if (type === 'token') {
      navigate(`../../../../../products/crypto/${type}/${splitted[2]}/${splitted[3]}`)
    } else if (type === 'dapp') {
      navigate(`../../../../../products/dapp/${splitted[2]}`)
    } else if (type === 'exchange') {
      navigate(`../../../../../products/exchange/${splitted[2]}`)
    } else if (type === 'venture') {
      navigate(`../../../../../products/venture/${splitted[2]}`)
    } else if (type === 'soon') {
      navigate(`../../../../../products/soon/${splitted[2]}`)
    }
  }

  return <div className='col-lg-6 col-xl-4'>
    <div className='card cus-review-card'>
      <div className='card-body cus-review-card-item'>
        <div className='new-arrival-content'>
          <div className='d-flex '>
            <Avatar className='mt-1' size={40} src={data?.avatar} />
            <div className=' ms-2 mt-1'>
              {reviewStarsRender(data?.star, data?.isScam)}
              {moment.utc(data?.updatedDate)?.fromNow()}
            </div>
          </div>
          <div className='username-text mt-2' >{data?.name}&nbsp;
            {data?.productName && <span><span className={data?.isScam ? 'text-danger' : ''}>{data?.isScam && data?.isScam ? 'reported' : 'reviewed'}&nbsp;</span>
              <span onClick={ onClicked} className='text-primary'style={{ cursor: 'pointer' }}>
                <span className='product-name-text'>{data?.productName}</span>
              </span>
            </span>}
          </div>
          {/* <h4>
            {title || 'No Title'}
          </h4> */}
          <p className='mt-1'>
            {shortenContent(data?.content) || 'No Content'}
          </p>
        </div>
      </div>
    </div>
  </div>
}

const shortenContent = (content) => {
  const WORDS_SHOW = 80
  if (content) {
    if (content?.length >= WORDS_SHOW) {
      return `${content?.slice(0, WORDS_SHOW)}...`
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
