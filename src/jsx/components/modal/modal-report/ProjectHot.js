import React from 'react'
import { Image } from 'antd'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'
import { SWORD_ICON } from '../../../../images/svg/report-project-primary'
import { CRYPTO, EXCHANGE, VENTURE, SOON, DAPP } from '../../../constants/category'

const ProjectHot = ({ data, setItemHot }) => {
  const shortenString = (text) => {
    return text?.length > 10 ? `${text?.substring(0, 10)}...` : text
  }

  switch (data?.type) {
    case 'crypto':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot'
          onClick={() => setItemHot({ type: CRYPTO, data: data?.detail })}
        >
          {data?.detail?.cryptoId && data?.detail?.bigLogo ? (
            <Image src={isValidProductId(data?.detail?.cryptoId) ? formatImgUrlFromProductId(data?.detail?.cryptoId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.detail?.name?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.detail?.name)}
              <div className='project-hot-content-symbol'>{data?.detail?.symbol ? data?.detail?.symbol : '' }</div>
            </div>
            <div>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.detail?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='me-1'>   {SWORD_ICON('#EB5757', 14, 14)}</span>
                {new Intl.NumberFormat().format(data?.detail?.totalIsScam)}
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'exchange':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: EXCHANGE, data: data?.detail })}>
          {data?.detail?.exchangeId && data?.detail?.smallLogo ? (
            <Image src={isValidProductId(data?.detail?.exchangeId) ? formatImgUrlFromProductId(data?.detail?.exchangeId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.detail?.name?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.detail?.name)}
            </div>
            <div>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.detail?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='me-1'>   {SWORD_ICON('#EB5757', 14, 14)}</span>
                {new Intl.NumberFormat().format(data?.detail?.totalIsScam)}
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'dapp':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: DAPP, data: data?.detail })}>
          {data?.detail?.dAppId && data?.detail?.dAppLogo ? (
            <Image src={isValidProductId(data?.detail?.dAppId) ? formatImgUrlFromProductId(data?.detail?.dAppId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.detail?.dAppName?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.detail?.dAppName)}
            </div>
            <div>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.detail?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='me-1'>   {SWORD_ICON('#EB5757', 14, 14)}</span>
                {new Intl.NumberFormat().format(data?.detail?.totalIsScam)}
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'venture':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: VENTURE, data: data?.detail })}>
          {data?.detail?.ventureId && data?.detail?.ventureLogo ? (
            <Image src={isValidProductId(data?.detail?.ventureId) ? formatImgUrlFromProductId(data?.detail?.ventureId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.detail?.ventureName?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.detail?.ventureName)}
            </div>
            <div>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.detail?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='me-1'>   {SWORD_ICON('#EB5757', 14, 14)}</span>
                {new Intl.NumberFormat().format(data?.detail?.totalIsScam)}
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'soon':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: SOON, data: data?.detail })}>
          {data?.detail?.projectId && data?.detail?.bigLogo ? (
            <Image src={isValidProductId(data?.detail?.projectId) ? formatImgUrlFromProductId(data?.detail?.projectId) : imgAbsentImageCrypto} preview={false}/>
          ) : (
            <span className='project-hot-no-data'>
              {data?.detail?.projectName?.slice(0, 3)}
            </span>
          )}
          <div className='project-hot-content'>
            <div className='project-hot-content-name'>
              {shortenString(data?.detail?.projectName)}
              <div className='project-hot-content-symbol'>{data?.detail?.projectSymbol ? data?.detail?.projectSymbol : '' }</div>
            </div>
            <div>
              <span className='post-comment' style={{ color: '#18A594' }}>
                <i className='far fa-comment me-1' />
                {new Intl.NumberFormat().format(data?.detail?.totalReviews)}
              </span>
              <span style={{ padding: '0 0.5rem' }}>/</span>
              <span className='post-comment' style={{ color: 'red' }}>
                <span className='me-1'>   {SWORD_ICON('#EB5757', 14, 14)}</span>
                {new Intl.NumberFormat().format(data?.detail?.totalIsScam)}
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
