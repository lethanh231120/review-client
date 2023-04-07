import { Modal } from 'antd'
import React, { useState } from 'react'
import { Badge, Button, Dropdown } from 'react-bootstrap'
import { DetailLayout } from '../detail-layout'
import { formatLargeNumber, renderNumber } from '../../../../utils/formatNumber'
import _ from 'lodash'
import moment from 'moment'
import Description from '../description/Description'
import MyScoreComponent from '../../score/scoreComponent'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import { WARNING_ICON } from '../../common-widgets/logo/logo'
import ScamWarningDetail from '../scam-warning/ScamWarningDetail'
import { EXCHANGE } from '../../../constants/category'
import ShareButton from '../../common-widgets/page-detail/ShareButton'
import { WebsiteButton } from '../../common-widgets/page-detail/WebsiteButton'
import { ProductSimilar } from '../../common-widgets/page-detail/ProductSimilar'
import InformationHeader from '../../common-widgets/page-detail/InformationHeader'
import share from '../../../../images/svg/share.svg'
import hands from '../../../../images/svg/hands.svg'
import ProductDetailHeader from '../../skeleton/product-detail-skeleton/ProductDetailHeader'
import ProductDetailInfo from '../../skeleton/product-detail-skeleton/ProductDetailInfo'
import ProductDetailSummary from '../../skeleton/product-detail-skeleton/ProductDetailSummary'
import InformationSubTitle, { typeExplorer, typeShort } from '../../common-widgets/page-detail/InformationSubTitle'
import ShortItem from '../../common-widgets/page-detail/ShortItem'
import ProductImage, { altExchange, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'
import SocialList from '../../common-widgets/page-detail/SocialList'

const ExchangeInfo = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const [top, setTop] = useState()
  const [openModalShare, setOpenModalShare] = useState(false)

  const handleReportScam = () => {
    rest?.setData({
      ...rest.data,
      isScam: true
      // star: 1
    })
    rest?.form?.setFieldsValue({
      'isScam': true,
      'star': 1
    })
    window.scrollTo(0, top)
  }

  // exchange header
  const header = (
    <>
      {rest?.loadingDetail ? (
        <ProductDetailHeader/>
      ) : (
        <div className='profile-info'>
          <div className='profile-details'>
            <div className='profile-photo'>
              <ProductImage
                imageUrl={detail?.bigLogo || detail?.smallLogo || detail?.thumbLogo}
                productName={detail?.name}
                altImageType={altExchange}
                size={sizeImg48}
              />
            </div>
            <div className='profile-name cus-profile-name'>
              <h1 className='text-primary mb-2 cus-h4 fs-22'>{detail?.name}</h1>
              <h2 className='mb-0' style={{ lineHeight: '0' }}>
                <Badge className='badge-sm' >{detail?.subCategory}</Badge>
              </h2>
            </div>
            <div className='detail-button ms-auto'>
              <Button onClick={() => setOpenModalShare(true)}>
                <img src={share} alt='share button'/>
              Share
              </Button>
              <WebsiteButton website={detail?.website} />
            </div>
          </div>
          <Modal
            open={openModalShare}
            show={openModalShare}
            onCancel={() => setOpenModalShare(false)}
            onOk={() => setOpenModalShare(false)}
            footer={false}
            destroyOnClose={true}
          >
            <ShareButton name={detail?.name} setOpenModalShare={setOpenModalShare}/>
          </Modal>
        </div>
      )}
    </>
  )

  // exchange summary
  const summary = <>
    {rest?.loadingDetail ? (<ProductDetailSummary/>) : (
      <div className='text-center'>
        <div className='row'>
          <div className='col'>
            <div className='mb-0 mt-3'>
              <Badge bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{productInfo?.details?.totalReviews}</Badge>
            </div>
            <span>Reviews</span>
          </div>
          <div className='col'>
            <div className='mb-0 mt-3'>
              <Badge bg='badge-l' className='badge-warning progress-bar-striped progress-bar-animated'>{productInfo?.details?.totalIsScam}</Badge>
            </div>
            <span>
            Reported Scam
            </span>
          </div>
          <div className='col'>
            <div className='mb-0 mt-3'>
              <MyScoreComponent score={productInfo?.details?.score} type={EXCHANGE} />
            </div>
            <span>
            Score
            </span>
          </div>
        </div>
        <div className='mt-4 '>
          <Button
            className='mb-1 me-1'
            variant='danger'
            onClick={handleReportScam}
          >
            <span className='d-flex'>
              {WARNING_ICON('#fff', '18px')}
              &nbsp;
            Report&nbsp;Scam
            </span>
          </Button>
          <Button
            className='btn btn-primary mb-1 ms-1'
            onClick={() => {
              rest?.setData({ ...rest.data, isScam: false })
              rest?.form.setFieldsValue({
                isScam: false,
                star: undefined,
                sources: []
              })
              window.scrollTo(0, top)
            }}
          >
            <svg width='18' height='18' viewBox='0 0 1024 1024' className='icon' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M687.542857 965.485714H182.857143c-87.771429 0-160.914286-73.142857-160.914286-160.914285V256c0-87.771429 73.142857-160.914286 160.914286-160.914286h336.457143V146.285714H182.857143C124.342857 146.285714 73.142857 197.485714 73.142857 256v541.257143c0 58.514286 51.2 109.714286 109.714286 109.714286h504.685714c58.514286 0 109.714286-51.2 109.714286-109.714286V533.942857h58.514286v263.314286c-7.314286 95.085714-80.457143 168.228571-168.228572 168.228571z' fill='#fff' /><path d='M877.714286 95.085714l109.714285 138.971429c7.314286 7.314286 0 14.628571-7.314285 21.942857L629.028571 526.628571c-7.314286 7.314286-160.914286-7.314286-160.914285-7.314285s29.257143-146.285714 36.571428-153.6l351.085715-270.628572c7.314286-7.314286 14.628571-7.314286 21.942857 0z' fill='#F4B1B2' /><path d='M607.085714 555.885714c-21.942857 0-65.828571 0-138.971428-7.314285H438.857143V512c29.257143-160.914286 36.571429-160.914286 43.885714-168.228571L833.828571 73.142857c21.942857-14.628571 43.885714-14.628571 58.514286 7.314286L1002.057143 219.428571c14.628571 14.628571 7.314286 43.885714-7.314286 58.514286L643.657143 548.571429c-7.314286 7.314286-7.314286 7.314286-36.571429 7.314285z m-109.714285-58.514285c51.2 0 95.085714 7.314286 117.028571 7.314285L950.857143 241.371429l-87.771429-117.028572-336.457143 263.314286c-7.314286 14.628571-14.628571 58.514286-29.257142 109.714286z' fill='#fff' /></svg>
              &nbsp;
            Add Review
          </Button>
        </div>
      </div>
    )}
  </>

  const More = () => {
    return <div>
      {rest?.loadingDetail ? (<ProductDetailInfo/>) : (
        <>
          <InformationHeader projectName={detail?.name}/>
          <div className='card-body'>
            <div className='profile-blog '>
              <div className='community-list'>
                { (detail?.detail && detail?.detail['Country']) || (detail?.pairCount) || (detail?.volume24h) || (detail?.volume1m) || (detail?.feeTxs) || (detail?.visit7d) || (detail?.volume7d) || (detail?.volume1y) || detail?.founderYear
                  ? <InformationSubTitle type={typeShort}/>
                  : ''}

                { (detail?.detail && detail?.detail['Country'])
                  ? <div className='mb-3 col-12' >
                    <ShortItem
                      title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s country</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{shortenString(detail?.detail['Country'])}</b>
                      </span>
                      </>}
                    />
                  </div>
                  : ''
                }

                { (detail?.founderYear)
                  ? <div className='mb-3 col-12' >
                    <ShortItem
                      title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s year founded</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{ moment(detail?.founderYear)?.year()}</b>
                      </span>
                      </>}
                    />
                  </div>
                  : ''
                }

                { (detail?.pairCount)
                  ? <div className='mb-3 col-12' >
                    <ShortItem
                      title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s pairs count</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{detail?.pairCount}</b>
                      </span>
                      </>}
                    />
                  </div>
                  : ''
                }

                { (detail?.feeTxs)
                  ? <div className='mb-3 col-12' >
                    <ShortItem
                      title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s transaction fee</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{detail?.feeTxs} %</b>
                      </span>
                      </>}
                    />
                  </div>
                  : ''
                }

                { (detail?.feeTxs)
                  ? <div className='mb-3 col-12' >
                    <ShortItem
                      title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s vist in 7 days</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{formatLargeNumber(detail?.visit7d)}</b>
                      </span>
                      </>}
                    />
                  </div>
                  : ''
                }

                { (detail?.volume24h)
                  ? <div className='mb-3 col-12' >
                    <ShortItem
                      title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s volume in 24 hours</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{renderNumber(detail?.volume24h)}</b>
                      </span>
                      </>}
                    />
                  </div>
                  : ''
                }

                { (detail?.volume7d)
                  ? <div className='mb-3 col-12' >
                    <ShortItem
                      title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s volume in 7 days</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{renderNumber(detail?.volume7d)}</b>
                      </span>
                      </>}
                    />
                  </div>
                  : ''
                }

                { (detail?.volume1m)
                  ? <div className='mb-3 col-12' >
                    <ShortItem
                      title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s volume in 1 month</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{renderNumber(detail?.volume1m)}</b>
                      </span>
                      </>}
                    />
                  </div>
                  : ''
                }

                { (detail?.volume1y)
                  ? <div className='mb-3 col-12' >
                    <ShortItem
                      title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s volume in 1 year</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{renderNumber(detail?.volume1y)}</b>
                      </span>
                      </>}
                    />
                  </div>
                  : ''
                }

                {
                  detail?.socials
                    ? <>
                      <InformationSubTitle type={typeExplorer}/>
                      <SocialList detailSocials={detail?.socials} />
                    </>
                    : ''
                }

                {!_.isEmpty(detail?.sourceCode) && <div className='col-12'>
                  <Dropdown className='mt-1'>
                    <Dropdown.Toggle variant='primary' className=' btn btn-success light sharp'>
                                Source Code
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {Object.keys(detail?.sourceCode)?.map((key, index) => key && <Dropdown.Item key={index} >{detail?.sourceCode[key]}</Dropdown.Item>)}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>}

                <p>
              If you have any good or bad experience with
                  <span className='text-primary'>
                    {` ${detail?.name}`}
                  </span>, please share with us in informing everyone
                  <img src={hands} alt='icon-hand' style={{ marginLeft: '0.3rem', width: '1.1rem' }}/>
                  <img src={hands} alt='icon-hand' style={{ width: '1.1rem' }}/>
                  <img src={hands} alt='icon-hand' style={{ marginRight: '0.3rem', width: '1.1rem' }}/>
                  <span
                    onClick={() => {
                      rest?.setData({ ...rest.data, isScam: false })
                      rest?.form.setFieldsValue({
                        isScam: false,
                        star: undefined,
                        sources: []
                      })
                      window.scrollTo(0, top)
                    }}
                    className='text-primary txt-link'
                    style={{ marginLeft: '0.5rem' }}

                  >
                Review Now
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  }

  const about = <>
    {rest?.loadingDetail
      ? (<ProductDetailInfo/>)
      : (<Description
        projectName={`About ${detail?.name}`}
        text={detail?.fullDescription}
      />)}
  </>

  // scam
  const scam = (
    <>
      {detail?.isScam ? (
        <ScamWarningDetail
          isShow={true}
          scamWarningReason={detail?.proof?.isScam}
          proofType='error'
        />
      ) : detail?.isWarning ? (
        <ScamWarningDetail
          isShow={true}
          scamWarningReason={detail?.proof?.isWarning}
          proofType='warning'
        />
      ) : (
        ''
      )}
    </>
  )

  return (
    <DetailLayout
      Header={header}
      summary={summary}
      more={<More />}
      about={about}
      isScam={detail?.isScam}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
      scam={scam}
      similar={<ProductSimilar productType={EXCHANGE} similarList={productInfo?.similars} />}
      productInfo={productInfo}
    />
  )
}

const shortenString = (text) => {
  if (text.length > 10) {
    return text.substring(0, 10)
  } else {
    return text
  }
}

export default ExchangeInfo
