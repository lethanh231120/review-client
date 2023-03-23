import React from 'react'
import { CRYPTO, EXCHANGE, VENTURE, SOON, DAPP, LAUNCHPAD, CRYPTO_COIN } from '../../../constants/category'
import { WARNING_ICON } from '../../common-widgets/logo/logo'
import ProductImage, { sizeImg35 } from '../../common-widgets/page-detail/ProductImage'
import { CRYPTO_TOKEN } from './../../../constants/category'

const ProjectHot = ({ data, setItemHot }) => {
  const shortenString = (text) => {
    return text?.length > 20 ? `${text?.substring(0, 20)}...` : text
  }

  const SCAM_REPORT_ICON = WARNING_ICON('#d85b53', '14px')

  const type = data?.productId?.split('_')[1]
  switch (type) {
    case CRYPTO_TOKEN:
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot'
          onClick={() => setItemHot({ type: CRYPTO, data: data })}
        >
          <ProductImage
            imageUrl={data?.logo}
            productName={data?.symbol || data?.name}
            altImageType={'Project Logo'}
            size={sizeImg35}
          />
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
    case CRYPTO_COIN:
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot'
          onClick={() => setItemHot({ type: CRYPTO, data: data })}
        >
          <ProductImage
            imageUrl={data?.logo}
            productName={data?.symbol || data?.name}
            altImageType={'Project Logo'}
            size={sizeImg35}
          />
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
    case EXCHANGE:
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: EXCHANGE, data: data })}>
          <ProductImage
            imageUrl={data?.logo}
            productName={data?.symbol || data?.name}
            altImageType={'Project Logo'}
            size={sizeImg35}
          />
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
    case DAPP:
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: DAPP, data: data })}>
          <ProductImage
            imageUrl={data?.logo}
            productName={data?.symbol || data?.name}
            altImageType={'Project Logo'}
            size={sizeImg35}
            noMarginRight={true}
          />
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
    case 'venture':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: VENTURE, data: data })}>
          <ProductImage
            imageUrl={data?.logo}
            productName={data?.symbol || data?.name}
            altImageType={'Project Logo'}
            size={sizeImg35}
          />
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
          <ProductImage
            imageUrl={data?.logo}
            productName={data?.symbol || data?.name}
            altImageType={'Project Logo'}
            size={sizeImg35}
          />
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
    case 'launchpad':
      return <div className='col-xl-3 col-lg-4 col-md-6 cus-col'>
        <div className='project-hot' onClick={() => setItemHot({ type: LAUNCHPAD, data: data })}>
          <ProductImage
            imageUrl={data?.logo}
            productName={data?.symbol || data?.name}
            altImageType={'Project Logo'}
            size={sizeImg35}
          />
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
    default:
      return <></>
  }
}

export default ProjectHot
