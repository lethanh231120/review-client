import { Avatar } from 'antd'
import { Badge } from 'react-bootstrap'
import { onItemClicked } from '../click-function'
import { useNavigate } from 'react-router-dom'
import NoImage from '../../no-image/NoImage'
import './top-discussed.scss'

const singleTopItem = (logo, name, symbol, type, reviews, reports, detail, navigate) => {
  return <>
    <div className='previews-info-list' onClick={() => onItemClicked(type, detail, navigate)} style={{ cursor: 'pointer', width: '100%', padding: '0.825rem 0' }}>
      <div className='pre-icon'>
        <span className={`icon-box icon-box-sm`}>
          {logo ? <Avatar size={35} src={logo}/> : <NoImage width={35} height={35} alt={name?.substring(0, 2)}/>}
        </span>
        <div className='ms-2 '>
          <h6 className='text-etc-overflow'>{name}{type === 'crypto' ? ` (${symbol})` : null}</h6>
          <span><Badge className='badge-sm'>{type}</Badge></span>
        </div>
      </div>
      <div className='me-4'>
        <div className='post-comment' style={{ color: 'red' }}>
          <i className='fa-regular fa-flag me-1'></i>
          {new Intl.NumberFormat().format(reports)}
        </div>
        <div className='post-comment' style={{ color: '#18A594' }}>
          <i className='far fa-comment me-1' />
          {new Intl.NumberFormat().format(reviews)}
        </div>
      </div>
    </div>
    <hr className='hr-custome'></hr>
  </>
}

export const TopDiscussedItem = ({ item }) => {
  const navigate = useNavigate()

  switch (item?.type) {
    case 'crypto':
      return singleTopItem(item?.detail?.bigLogo, item?.detail?.name, item?.detail?.symbol, item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    case 'exchange':
      return singleTopItem(item?.detail?.smallLogo, item?.detail?.name, '', item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    case 'dapp':
      return singleTopItem(item?.detail?.dAppLogo, item?.detail?.dAppName, '', item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    case 'venture':
      return singleTopItem(item?.detail?.ventureLogo, item?.detail?.ventureName, '', item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    case 'soon':
      return singleTopItem(item?.detail?.bigLogo, item?.detail?.projectName, '', item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    default:
      return <></>
  }
}
