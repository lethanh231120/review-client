import { Avatar } from 'antd'
import { Badge } from 'react-bootstrap'
import { onItemClicked } from '../click-function'
import { useNavigate } from 'react-router-dom'

export const TopDiscussedItem = ({ item }) => {
  const navigate = useNavigate()

  const shortenString = (text) => {
    return text?.length > 15 ? `${text?.substring(0, 15)}...` : text
  }

  switch (item?.type) {
    case 'crypto':
      return <li onClick={() => onItemClicked(item?.type, item?.detail, navigate)} style={{ cursor: 'pointer' }}>
        <div className='timeline-panel'>
          <div className='media me-2'>
            <Avatar width='50' src={item?.detail?.bigLogo}/>
          </div>
          <div className='media-body'>
            <h5 className='mb-1'>{shortenString(item?.detail?.name)}
             ({item?.detail?.symbol})
              <Badge className='badge-sm ms-2'>{item?.type}</Badge></h5>
            <small className='d-block'>
             23-12-2021 13.00
            </small>
          </div>
          <div>
            {item?.detail?.totalReviews} Reviews
          </div>
        </div>
      </li>
    case 'exchange':
      return <div></div>
    case 'venture':
      return <li onClick={() => onItemClicked(item?.type, item?.detail, navigate)} style={{ cursor: 'pointer' }}>
        <div className='timeline-panel'>
          <div className='media me-2'>
            <Avatar width='50' src={item?.detail?.ventureLogo}/>
          </div>
          <div className='media-body'>
            <h5 className='mb-1'>{shortenString(item?.detail?.ventureName)}
              <Badge className='badge-sm ms-2'>{item?.type}</Badge></h5>
            <small className='d-block'>
          29 July 2022 - 02:26 PM
            </small>
          </div>
          <div>
            {item?.detail?.totalReviews} Reviews
          </div>
        </div>
      </li>
    case 'soon':
      return <div></div>
    default:
      return <></>
  }
}
