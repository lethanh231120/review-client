import { Avatar } from 'antd'
import { Badge } from 'react-bootstrap'

export const TopDiscussedItem = ({ item }) => {
  const shortenString = (text) => {
    return text?.length > 15 ? `${text?.substring(0, 15)}...` : text
  }

  switch (item?.type) {
    case 'crypto':
      return <li>
        <div className='timeline-panel'>
          <div className='media me-2'>
            <Avatar width='50' src={item?.detail?.bigLogo}/>
          </div>
          <div className='media-body'>
            <h5 className='mb-1'>{shortenString(item?.detail?.name)}
             ({item?.detail?.symbol})
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
    case 'dapp':
      return <div></div>
    case 'venture':
      return <li>
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
