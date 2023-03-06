import React from 'react'
import { Image } from 'antd'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'
import { CRYPTO, EXCHANGE, VENTURE, SOON, DAPP, LAUNCHPAD } from '../../../constants/category'
import { WARNING_ICON } from '../../common-widgets/logo/logo'

const ProjectHot = ({ data, setItemHot }) => {
  const shortenString = (text) => {
    return text?.length > 10 ? `${text?.substring(0, 10)}...` : text
  }

  const SCAM_REPORT_ICON = WARNING_ICON('#d85b53', '14px')

  const type = data?.productId?.split('_')[1]
  switch (type) {
    case 'token':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot'
          onClick={() => setItemHot({ type: CRYPTO, data: data })}
        >
          {data?.productId && data?.logo ? (
            <Image src={isValidProductId(data?.productId) ? formatImgUrlFromProductId(data?.productId) : imgAbsentImageCrypto} preview={false} alt='Project Logo'/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.name?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.name)}
              <div className='project-hot-content-symbol'>{data?.symbol ? data?.symbol : '' }</div>
            </div>
            <div className='d-flex '>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='d-flex align-items-center'>
                  <span className='me-1'>   {SCAM_REPORT_ICON}</span>
                  {new Intl.NumberFormat().format(data?.totalIsScam)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'coin':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot'
          onClick={() => setItemHot({ type: CRYPTO, data: data })}
        >
          {data?.productId && data?.logo ? (
            <Image src={isValidProductId(data?.productId) ? formatImgUrlFromProductId(data?.productId) : imgAbsentImageCrypto} preview={false} alt='Project Logo'/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.name?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.name)}
              <div className='project-hot-content-symbol'>{data?.symbol ? data?.symbol : '' }</div>
            </div>
            <div className='d-flex '>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='d-flex align-items-center'>
                  <span className='me-1'>   {SCAM_REPORT_ICON}</span>
                  {new Intl.NumberFormat().format(data?.totalIsScam)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'exchange':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: EXCHANGE, data: data })}>
          {data?.productId && data?.logo ? (
            <Image alt='Exchange Logo' src={isValidProductId(data?.productId) ? formatImgUrlFromProductId(data?.productId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.name?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.name)}
            </div>
            <div className='d-flex '>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='d-flex align-items-center'>
                  <span className='me-1'>   {SCAM_REPORT_ICON}</span>
                  {new Intl.NumberFormat().format(data?.totalIsScam)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'dapp':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: DAPP, data: data })}>
          {data?.productId && data?.logo ? (
            <Image alt='DApp Logo' src={isValidProductId(data?.productId) ? formatImgUrlFromProductId(data?.productId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.dAppName?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.dAppName)}
            </div>
            <div className='d-flex '>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='d-flex align-items-center'>
                  <span className='me-1'>   {SCAM_REPORT_ICON}</span>
                  {new Intl.NumberFormat().format(data?.totalIsScam)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'venture':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: VENTURE, data: data })}>
          {data?.productId && data?.logo ? (
            <Image alt='Venture Logo' src={isValidProductId(data?.productId) ? formatImgUrlFromProductId(data?.productId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.name?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.name)}
            </div>
            <div className='d-flex '>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='d-flex align-items-center'>
                  <span className='me-1'>   {SCAM_REPORT_ICON}</span>
                  {new Intl.NumberFormat().format(data?.totalIsScam)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'soon':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: SOON, data: data })}>
          {data?.productId && data?.logo ? (
            <Image alt='Crypto Logo' src={isValidProductId(data?.productId) ? formatImgUrlFromProductId(data?.productId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.name?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.name)}
              <div className='project-hot-content-symbol'>{data?.symbol ? data?.symbol : '' }</div>
            </div>
            <div className='d-flex '>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='d-flex align-items-center'>
                  <span className='me-1'>   {SCAM_REPORT_ICON}</span>
                  {new Intl.NumberFormat().format(data?.totalIsScam)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'launchpad':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: LAUNCHPAD, data: data })}>
          {data?.productId && data?.logo ? (
            <Image alt='Crypto Logo' src={isValidProductId(data?.productId) ? formatImgUrlFromProductId(data?.productId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.name?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.name)}
              <div className='project-hot-content-symbol'>{data?.symbol ? data?.symbol : '' }</div>
            </div>
            <div className='d-flex '>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='d-flex align-items-center'>
                  <span className='me-1'>   {SCAM_REPORT_ICON}</span>
                  {new Intl.NumberFormat().format(data?.totalIsScam)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    default:
      return <></>
  }
}

export default ProjectHot
