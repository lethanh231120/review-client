import { Avatar, Table, Tooltip, Image, Modal } from 'antd'
import React, { useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { DetailLayout } from '../detail-layout'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'
import { renderNumber } from '../../../../utils/formatNumber'
import _ from 'lodash'
import Description from '../description/Description'
import moment from 'moment'
// import FormReport from '../../Forms/form-report/FormReport'
import { useNavigate } from 'react-router-dom'
import { isValidProductId, formatImgUrlFromProductId, toCammelCase } from '../../../../utils/formatText'
import imgAbsentImageVenture from '../../../../images/absent_image_venture.png'
import MyScoreComponent from '../../score/scoreComponent'
import './ventureInfo.scss'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import { WARNING_ICON } from '../../common-widgets/logo/logo'
import ScamWarningDetail from '../scam-warning/ScamWarningDetail'
import { VENTURE } from '../../../constants/category'
import ShareButton from '../../common-widgets/page-detail/ShareButton'
import { WebsiteButton } from '../../common-widgets/page-detail/WebsiteButton'
import { ProductSimilar } from '../../common-widgets/page-detail/ProductSimilar'
import InformationHeader from '../../common-widgets/page-detail/InformationHeader'
import share from '../../../../images/svg/share.svg'
import hands from '../../../../images/svg/hands.svg'

export const calculateTotalFund = (fund) =>{
  let total = 0
  fund && fund?.forEach(item => {
    total += item?.fundAmount
  })

  return total
}

const VentureInfo = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const navigate = useNavigate()
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

  // VENTURE HEADER
  const Header = () => {
    return <div className='profile-info'>
      <div className='profile-details'>
        <div className='profile-photo'>
          {detail?.ventureId && detail?.ventureLogo ? (
            <Image alt='Venture Logo' src={isValidProductId(detail?.ventureId) ? formatImgUrlFromProductId(detail?.ventureId) : imgAbsentImageVenture} preview={false}/>
          )
            : (<span className='image-list-no-data-detail'>
              {detail?.ventureName?.slice(0, 3)}
            </span>)
          }
        </div>
        <div className='profile-name cus-profile-name'>
          <h4 className='text-primary mb-2 cus-h4'>{detail?.ventureName}
          </h4>
          <Badge className='badge-sm' >{detail?.subCategory}</Badge>
        </div>
        {/* <div className='detail-button'>
          <ShareButton name={detail?.name} />
          <WebsiteButton website={detail?.website} />
        </div> */}
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
        onCancel={() => setOpenModalShare(false)}
        onOk={() => setOpenModalShare(false)}
        footer={null}
      >
        <ShareButton name={detail?.name} setOpenModalShare={setOpenModalShare}/>
      </Modal>
    </div>
  }

  // VENTURE SUMMARY
  const summary =
  <div className='text-center'>
    <div className='row'>
      <div className='col'>
        <h3 className='m-b-0'>
          <Badge bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{productInfo?.details?.totalReviews}</Badge>
        </h3>
        <span>Reviews</span>
      </div>
      <div className='col'>
        <h3 className='m-b-0'>
          <Badge bg='badge-l' className='badge-warning progress-bar-striped progress-bar-animated'>{productInfo?.details?.totalIsScam}</Badge>
        </h3>
        <span>
        Reported Scam
        </span>
      </div>
      <div className='col'>
        <h3 className='m-b-0'>
          <MyScoreComponent score={productInfo?.details?.score} type={VENTURE} />
        </h3>
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

  // VENTURE MORE
  const dataItem = (title, content) =>{
    return <div className='d-flex text-align-center mb-1'>
      <p className='mb-0 mt-1'>{title}:</p>
      <h5 className='ms-1 mt-1' >{content} </h5>
    </div>
  }

  const communityItem = (title, content) => {
    return <div className='d-flex align-items-start'>
      <p className='mt-2 me-2'>{title}:</p>
      <div className='cus-d-flex'>
        {content && (
          Object.keys(content).map(
            (socialName) => {
              return content[socialName] !== '' ? (
                <Tooltip
                  className='me-1 mt-2'
                  placementTooltip='topLeft'
                  title={toCammelCase(socialName)}
                  key={socialName}
                >
                  <a
                    href={content[socialName]}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Avatar
                      alt='Social Logo'
                      className='img-fluid p-1 rounded-circle cus-avatar'
                      style={{ backgroundColor: '#F0F2F5' }}
                      preview={false}
                      src={
                        socials?.find(
                          (social) =>
                            social?.key?.toLowerCase() ===
                          socialName?.toLowerCase()
                        )?.icon
                          ? socials?.find(
                            (social) =>
                              social?.key?.toLowerCase() ===
                              socialName?.toLowerCase()
                          ).icon
                          : defaultSocial
                      }
                    />
                  </a>
                </Tooltip>
              ) : null
            }
          )
        )}
      </div>
    </div>
  }

  const More = () => {
    return <div>
      <InformationHeader projectName={detail?.ventureName}/>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          <div className='community-list'>
            {detail?.location && (
              <div className='community-list-item'>
                {detail?.location && dataItem('Location', detail?.location)}
              </div>
            )}
            {!_.isEmpty(productInfo?.mores?.fund) && (
              <div className='community-list-item'>
                {dataItem('Total funds', renderNumber(calculateTotalFund(productInfo?.mores?.fund)))}
              </div>
            )}
            {detail?.yearFounded && (
              <div className='community-list-item'>
                {dataItem('Year Founded', detail?.yearFounded)}
              </div>
            )}

            {detail?.socials && (
              <div className='community-list-item'>
                {communityItem('Social', detail?.socials)}
              </div>
            )}

            <p>
          If you have any good or bad experience with
              <span className='text-primary'>
                {` ${detail?.ventureName}`}
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
    </div>
  }

  const about = <Description
    projectName={detail?.ventureName}
    text={detail?.description}
  />

  const portfolioColumns = [
    {
      title: 'Name',
      render: (_, record) => (<span><Avatar src={record?.projectLogo}/> {record?.projectName}</span>)
    },
    {
      title: 'Funding Round',
      render: (_, record) => (<span>{record?.fundStageName}</span>)
    }, {
      title: 'Fund Amount',
      render: (_, record) => <span>{renderNumber(record?.fundAmount)}</span>
    }, {
      title: 'Fund Date',
      render: (_, record) => <span>{moment(record?.fundDate)?.format('DD-MM-YYYY')}</span>
    },
    {
      title: 'Announcement',
      render: (_, record) => <a className='announcement-link' onClick={(e) =>{
        e.stopPropagation()
        window.open(record?.announcementUrl)
      }}><i className='fas fa-link me-1'></i>Link</a>
    }
  ]

  const handleonRowClicked = (projectId) => {
    if (projectId) {
      const type = projectId.split('_')[1]
      const name = projectId.split('_')[2]

      if (type === 'coin') {
        navigate(`../../../products/crypto/${type}/${name}`)
      } else if (type === 'token') {
        const address = projectId.split('_')[3]
        navigate(`../../../products/crypto/${type}/${name}/${address}`)
      }
    }
  }

  const PortfolioTable = () => {
    return <>
      <div className='card-header border-0 pb-0'>
        <h5 className='heading text-primary'>{detail?.ventureName} Portfolio</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog portfolio-table table-responsive'>
          <Table
            rowClassName='portfolio-item portfolio-table'
            columns={portfolioColumns}
            dataSource={productInfo?.mores?.fund}
            onRow={(record) => ({
              onClick: () => {
                handleonRowClicked(record?.projectId)
              }
            })}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true, style: { display: 'flex', justifyContent: 'center' }}}
          />
        </div>
      </div></>
  }

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
      type={'venture'}
      Header={<Header />}
      summary={summary}
      more={<More />}
      about={about}
      portfolioOrChartOrDesc={<PortfolioTable />}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
      scam={scam}
      similar={<ProductSimilar productType={VENTURE} similarList={productInfo?.similars} />}
      productInfo={productInfo}
    />
  )
}

export default VentureInfo
