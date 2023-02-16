import React from 'react'
import { Image } from 'antd'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'

const ProjectHot = ({ data, setItem }) => {
  const shortenString = (text) => {
    return text?.length > 10 ? `${text?.substring(0, 10)}...` : text
  }

  console.log(data)
  switch (data?.type) {
    case 'crypto':
      return <div className='col-lg-3 cus-col'>
        <div className='project-hot' onClick={() => setItem(data?.detail)}>
          {data?.detail?.cryptoId && data?.detail?.bigLogo ? (
            <Image src={isValidProductId(data?.detail?.cryptoId) ? formatImgUrlFromProductId(data?.detail?.cryptoId) : imgAbsentImageCrypto} preview={false} height={56} width={56}/>
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
                <i className='fa-regular fa-flag me-1'></i>
                {new Intl.NumberFormat().format(data?.detail?.totalIsScam)}
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'exchange':
      return <div className='col-lg-3 cus-col'>
        <div className='project-hot' onClick={() => setItem(data?.detail)}>
          {data?.detail?.exchangeId && data?.detail?.smallLogo ? (
            <Image src={isValidProductId(data?.detail?.exchangeId) ? formatImgUrlFromProductId(data?.detail?.exchangeId) : imgAbsentImageCrypto} preview={false} height={56} width={56}/>
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
                <i className='fa-regular fa-flag me-1'></i>
                {new Intl.NumberFormat().format(data?.detail?.totalIsScam)}
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'dapp':
      return <div className='col-lg-3 cus-col'>
        <div className='project-hot' onClick={() => setItem(data?.detail)}>
          {data?.detail?.dAppId && data?.detail?.dAppLogo ? (
            <Image src={isValidProductId(data?.detail?.dAppId) ? formatImgUrlFromProductId(data?.detail?.dAppId) : imgAbsentImageCrypto} preview={false} height={56} width={56}/>
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
                <i className='fa-regular fa-flag me-1'></i>
                {new Intl.NumberFormat().format(data?.detail?.totalIsScam)}
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'venture':
      return <div className='col-lg-3 cus-col'>
        <div className='project-hot' onClick={() => setItem(data?.detail)}>
          {data?.detail?.ventureId && data?.detail?.ventureLogo ? (
            <Image src={isValidProductId(data?.detail?.ventureId) ? formatImgUrlFromProductId(data?.detail?.ventureId) : imgAbsentImageCrypto} preview={false} height={56} width={56}/>
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
                <i className='fa-regular fa-flag me-1'></i>
                {new Intl.NumberFormat().format(data?.detail?.totalIsScam)}
              </span>
            </div>
          </div>
        </div>
      </div>
    case 'soon':
      return <div className='col-lg-3 cus-col'>
        <div className='project-hot' onClick={() => setItem(data?.detail)}>
          {data?.detail?.projectId && data?.detail?.bigLogo ? (
            <Image src={isValidProductId(data?.detail?.projectId) ? formatImgUrlFromProductId(data?.detail?.projectId) : imgAbsentImageCrypto} preview={false} height={56} width={56}/>
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
                <i className='fa-regular fa-flag me-1'></i>
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
