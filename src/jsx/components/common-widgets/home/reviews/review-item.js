import Avatar from 'antd/es/avatar/avatar'
import { useNavigate } from 'react-router-dom'
import './reviews-item.scss'
import imgshit from './shit-icon.svg'
import profile from '../../../../../images/product/user.webp'
import { Image } from 'antd'
import moment from 'moment-timezone'
import _ from 'lodash'
import { capitalizeFirstLetter } from './../../../../../utils/formatText'

export const ReviewItem = ({ data }) => {
  const navigate = useNavigate()

  const actionTime = moment(data?.createdDate, 'YYYY-MM-DD HH:mm:ss')
  const timeAgo = capitalizeFirstLetter(actionTime.fromNow())

  const onClicked = () => {
    const id = data?.productId
    const splitted = id && id?.split('_')
    const type = splitted && splitted[1]

    if (type === 'coin') {
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

  return <div className='col-lg-6 col-xl-4 col-md-6'>
    <div className='card cus-review-card'>
      <div className='card-body cus-review-card-item'>
        <div className='new-arrival-content'>
          <div className='row'>
            <div className='col-10 d-flex '>
              <Avatar className='mt-1' size={40} src={data?.userImage ? data?.userImage : profile } alt='User Avatar'/>
              <div className=' ms-2 mt-1'>
                {reviewStarsRender(data?.star, data?.isScam)}
                {timeAgo}
              </div>
            </div>
            <div className='col-2 review-img'>
              {data?.images && !_.isEmpty(data?.images) &&
                <Image className='img-fluid ' src={data?.images[0]} preview={true} alt='Review Image'/>
              }
            </div>
          </div>
          <div className='username-text mt-2' >{data?.userName || 'Anonymous'}&nbsp;
            {data?.productName && <span><span className={data?.isScam ? 'text-danger' : ''}>
              {data?.isScam && data?.isScam ? 'reported' : 'reviewed'}&nbsp;
            </span>
            <span onClick={ onClicked} className='text-primary'style={{ cursor: 'pointer' }}>
              <span className='product-name-text'>{data?.productName}</span>
            </span>
            <span>&nbsp;{data?.isScam ? 'as a scam' : ''}</span>
            </span>}
          </div>
          {/* <h4>
            {title || 'No Title'}
          </h4> */}
          <p className='mt-1 text-etc-overflow'>
            {data?.content || 'No Content'}
          </p>
        </div>
      </div>
    </div>
  </div>
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
            return <img key={index} src={imgshit} alt='Scam'/>
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
