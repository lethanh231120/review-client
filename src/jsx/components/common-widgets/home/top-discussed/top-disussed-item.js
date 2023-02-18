import { Avatar } from 'antd'
import { Badge } from 'react-bootstrap'
import { onItemClicked } from '../click-function'
import { useNavigate } from 'react-router-dom'
import NoImage from '../../no-image/NoImage'
import './top-discussed.scss'

export const TopDiscussedItem = ({ item }) => {
  const navigate = useNavigate()

  const shortenString = (text) => {
    return text?.length > 15 ? `${text?.substring(0, 15)}...` : text
  }

  switch (item?.type) {
    case 'crypto':
      return <>
        <div className='previews-info-list' onClick={() => onItemClicked(item?.type, item?.detail, navigate)} style={{ cursor: 'pointer', width: '100%', padding: '0.825rem 0' }}>
          <div className='pre-icon'>
            <span className={`icon-box icon-box-sm`}>
              {item?.detail?.bigLogo ? <Avatar size={35} src={item?.detail?.bigLogo}/> : <NoImage width={35} height={35} alt={item?.detail?.symbol?.substring(0, 2)}/>}
            </span>
            <div className='ms-2 '>
              <h6 className='text-etc-overflow'>{shortenString(item?.detail?.name)}/{item?.detail?.symbol}</h6>
              <span><Badge className='badge-sm'>{item?.type}</Badge></span>
            </div>
          </div>
          <div className='count'>
            <span className='text-primary'>{item?.detail?.totalIsScam}&nbsp;Reviews</span>
            <h6 className='text-danger'>{item?.detail?.totalReviews}&nbsp;Reports</h6>
          </div>
        </div>
      </>

    case 'exchange':
      return <>
        <div className='previews-info-list' onClick={() => onItemClicked(item?.type, item?.detail, navigate)} style={{ cursor: 'pointer', width: '100%', padding: '0.825rem 0' }}>
          <div className='pre-icon'>
            <span className={`icon-box icon-box-sm`}>
              { <Avatar size={35} src={item?.detail?.smallLogo}/>}
            </span>
            <div className='ms-2'>
              <h6 className='text-etc-overflow'>{shortenString(item?.detail?.name)}</h6>
              <span><Badge className='badge-sm'>{item?.type}</Badge></span>
            </div>
          </div>
          <div className='count'>
            <span className='text-primary'>{item?.detail?.totalIsScam}&nbsp;Reviews</span>
            <h6 className='text-danger'>{item?.detail?.totalReviews}&nbsp;Reports</h6>
          </div>
        </div>
      </>
    case 'dapp':
      return <li onClick={() => onItemClicked(item?.type, item?.detail, navigate)} style={{ cursor: 'pointer' }}>
        <div className='timeline-panel'>
          <div className='media me-2'>
            <Avatar width='50' src={item?.detail?.dAppLogo}/>
          </div>
          <div className='media-body'>
            <h5 className='mb-1'>{shortenString(item?.detail?.dAppName)}
              <Badge className='badge-sm ms-2'>{item?.type}</Badge></h5>
          </div>
          <div>
            {item?.detail?.totalReviews} Reviews
          </div>
        </div>
      </li>
    case 'venture':
      return <li onClick={() => onItemClicked(item?.type, item?.detail, navigate)} style={{ cursor: 'pointer' }}>
        <div className='timeline-panel'>
          <div className='media me-2'>
            <Avatar width='50' src={item?.detail?.ventureLogo}/>
          </div>
          <div className='media-body'>
            <h5 className='mb-1'>{shortenString(item?.detail?.ventureName)}
              <Badge className='badge-sm ms-2'>{item?.type}</Badge></h5>
          </div>
          <div>
            {item?.detail?.totalReviews} Reviews
          </div>
        </div>
      </li>
    case 'soon':
      return <li onClick={() => onItemClicked(item?.type, item?.detail, navigate)} style={{ cursor: 'pointer' }}>
        <div className='timeline-panel'>
          <div className='media me-2'>
            <Avatar width='50' src={item?.detail?.bigLogo}/>
          </div>
          <div className='media-body'>
            <h5 className='mb-1'>{shortenString(item?.detail?.projectName)}
              <Badge className='badge-sm ms-2'>{item?.type}</Badge></h5>
          </div>
          <div>
            {item?.detail?.totalReviews} Reviews
          </div>
        </div>
      </li>
    default:
      return <></>
  }
}
