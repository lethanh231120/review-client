import { Avatar } from 'antd'
import { Badge } from 'react-bootstrap'
import { onItemClicked } from '../click-function'
import { useNavigate } from 'react-router-dom'
import NoImage from '../../no-image/NoImage'

import './top-discussed.scss'
import { WARNING_ICON } from '../../logo/logo'

const singleTopItem = (name, symbol, type, reviews, reports, detail, navigate) => {
  let imageUrl = ''
  switch (type) {
    case 'crypto':
      imageUrl = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${type}/bigLogo/${detail?.cryptoId}.png`
      break
    case 'exchange':
      imageUrl = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${type}/bigLogo/${detail?.exchangeId}.png`
      break
    case 'soon':
      imageUrl = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${type}/bigLogo/${detail?.projectId}.png`
      break
    case 'dapp':
      imageUrl = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${type}/bigLogo/${detail?.dappId}.png`
      break
    case 'launchpad':
      imageUrl = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${type}/bigLogo/${detail?.launchpadId}.png`
      break
    case 'venture':
      imageUrl = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${type}/bigLogo/${detail?.ventureId}.png`
      break
    default:
      break
  }

  return <>
    <div className='previews-info-list' onClick={() => onItemClicked(type, detail, navigate)} style={{ cursor: 'pointer', width: '100%', padding: '0.825rem 0' }}>
      <div className='pre-icon'>
        <span className={`icon-box icon-box-sm`}>
          {imageUrl !== '' ? <Avatar size={35} src={imageUrl}/> : <NoImage width={35} height={35} alt={name?.substring(0, 2)}/>}
        </span>
        <div className='ms-2'>
          <h6 className='text-etc-overflow'>{name}{type === 'crypto' ? ` (${symbol})` : null}</h6>
          <span><Badge className='badge-sm'>{type}</Badge></span>
        </div>
      </div>
      <div className='me-4 '>
        <div className='post-comment' style={{ color: 'red' }}>
          <span className='d-flex align-items-center'>
            <span className='me-1'> {WARNING_ICON('#d85b53', '14px')}</span>
            {new Intl.NumberFormat().format(reports)}</span>
        </div>
        <div className='post-comment' style={{ color: '#18A594' }}>
          <span className='d-flex align-items-center'>
            <i className='far fa-comment me-1' />
            {new Intl.NumberFormat().format(reviews)}
          </span>
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
      return singleTopItem(item?.detail?.name, item?.detail?.symbol, item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    case 'exchange':
      return singleTopItem(item?.detail?.name, '', item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    case 'dapp':
      return singleTopItem(item?.detail?.dAppName, '', item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    case 'venture':
      return singleTopItem(item?.detail?.ventureName, '', item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    case 'soon':
      return singleTopItem(item?.detail?.projectName, '', item?.type, item?.detail?.totalReviews, item?.detail?.totalIsScam, item?.detail, navigate)
    default:
      return <></>
  }
}
