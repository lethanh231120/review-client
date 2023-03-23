import { Avatar } from 'antd'
import { Badge } from 'react-bootstrap'
import { onItemClicked } from '../click-function'
import { useNavigate } from 'react-router-dom'

import './top-discussed.scss'
import { WARNING_ICON } from '../../logo/logo'
import _ from 'lodash'

const singleTopItem = (name, symbol, type, reviews, reports, detail, navigate) => {
  // const imageUrl = `https://gear5.s3.ap-northeast-1.amazonaws.com/image/${type}/bigLogo/${detail?.productId}.png`

  return <>
    <div className='previews-info-list hot-coin-item' onClick={() => onItemClicked(type, detail, navigate)}>
      <div className='pre-icon'>
        <span className={`icon-box icon-box-sm`}>
          {detail?.logo ? <Avatar alt='Project Logo' size={35} src={detail?.logo}/> : ''}
        </span>
        <div className='ms-2'>
          <div className='text-etc-overflow cus-hot-coin-name fs-16' style={{ color: 'black', fontWeight: '500' }}>
            {name}
            {type === 'crypto' ? ` (${symbol && symbol})` : null}
          </div>
          <span><Badge className='badge-sm'>{_.capitalize(type && type)}</Badge></span>
        </div>
      </div>
      <div>
        <div className='post-comment' style={{ color: 'red' }}>
          <span className='d-flex align-items-center'>
            <span className='me-1'> {WARNING_ICON('#d85b53', '14px')}</span>
            {reports && new Intl.NumberFormat().format(reports)}</span>
        </div>
        <div className='post-comment' style={{ color: '#18A594' }}>
          <span className='d-flex align-items-center'>
            <i className='far fa-comment me-1' />
            {reviews && new Intl.NumberFormat().format(reviews)}
          </span>
        </div>
      </div>
    </div>
  </>
}

export const TopDiscussedItem = ({ item }) => {
  const navigate = useNavigate()
  const type = item?.productId?.split('_')[1]
  switch (type) {
    case 'token':
      return singleTopItem(item?.name, item?.symbol, 'crypto', item?.totalReviews, item?.totalIsScam, item, navigate)
    case 'coin':
      return singleTopItem(item?.name, item?.symbol, 'crypto', item?.totalReviews, item?.totalIsScam, item, navigate)
    case 'exchange':
      return singleTopItem(item?.name, '', type, item?.totalReviews, item?.totalIsScam, item, navigate)
    case 'dapp':
      return singleTopItem(item?.name, '', type, item?.totalReviews, item?.totalIsScam, item, navigate)
    case 'venture':
      return singleTopItem(item?.name, '', type, item?.totalReviews, item?.totalIsScam, item, navigate)
    case 'soon':
      return singleTopItem(item?.name, '', type, item?.totalReviews, item?.totalIsScam, item, navigate)
    case 'launchpad':
      return singleTopItem(item?.name, '', type, item?.totalReviews, item?.totalIsScam, item, navigate)
    default:
      return <></>
  }
}
