import React from 'react'
import { Image } from 'antd'
import { Badge } from 'react-bootstrap'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'

const ProjectHot = ({ data, setItem }) => {
  const shortenString = (text) => {
    return text?.length > 10 ? `${text?.substring(0, 10)}...` : text
  }

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
            <Badge bg='' className='badge-success light'>{data?.type}</Badge>
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
            <Badge bg='' className='badge-success light'>{data?.type}</Badge>
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
            <Badge bg='' className='badge-success light'>{data?.type}</Badge>
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
            <Badge bg='' className='badge-success light'>{data?.type}</Badge>
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
            <Badge bg='' className='badge-success light'>{data?.detail?.type}</Badge>
          </div>
        </div>
      </div>
    default:
      return <></>
  }
}

export default ProjectHot
