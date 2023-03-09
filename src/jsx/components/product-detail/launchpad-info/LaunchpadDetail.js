import { Avatar, Table, Tooltip, Modal } from 'antd'
import React, { useContext, useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { DetailLayout } from '../detail-layout'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'
import Description from '../description/Description'
// import FormReport from '../../Forms/form-report/FormReport'
import { useNavigate } from 'react-router-dom'
import MyScoreComponent from '../../score/scoreComponent'
import { myLogo, WARNING_ICON } from '../../common-widgets/logo/logo'
import { formatLargeNumber, formatMoney } from '../../../../utils/formatNumber'
import { ChainListContext } from '../../../../App'
import _ from 'lodash'
import './LaunchpadInfo.scss'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import { formatImgUrlFromProductId, toCammelCase } from '../../../../utils/formatText'
import { LAUNCHPAD } from '../../../constants/category'
import ShareButton from '../../common-widgets/page-detail/ShareButton'
import { WebsiteButton } from '../../common-widgets/page-detail/WebsiteButton'
import { ProductSimilar } from '../../common-widgets/page-detail/ProductSimilar'
import InformationHeader from '../../common-widgets/page-detail/InformationHeader'
import share from '../../../../images/svg/share.svg'
import hands from '../../../../images/svg/hands.svg'

const LaunchpadDetail = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
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

  const onItemClicked = (url) =>{
    url && window.open(url)
  }

  // VENTURE HEADER
  const Header = () => {
    return <div className='profile-info mb-1'>
      <div className='profile-details'>
        <div className='profile-photo'>
          { myLogo('thumbLogo', detail?.launchPadId, 'launchpad', 60) ||
          myLogo('bigLogo', detail?.launchPadId, 'launchpad', 60) ||
          myLogo('nativeLogo', detail?.launchPadId, 'launchpad', 60) ||
          myLogo('smallLogo', detail?.launchPadId, 'launchpad', 60) ||
            <span className='image-list-no-data-detail'>
              {detail?.name?.slice(0, 3)}
            </span>
          }
        </div>
        <div className='profile-name cus-profile-name'>
          <h4 className='text-primary mb-2 cus-h4'>{detail?.name} {detail?.symbol ? `(${detail?.symbol})` : null}</h4>
          <Badge className='badge-sm' >{detail?.type}</Badge>
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
        onCancel={() => setOpenModalShare(false)}
        onOk={() => setOpenModalShare(false)}
        footer={null}
      >
        <ShareButton name={detail?.name} setOpenModalShare={setOpenModalShare}/>
      </Modal>
    </div>
  }

  // LAUNCHPAD SUMMARY
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
          <MyScoreComponent score={productInfo?.details?.score} type={LAUNCHPAD} />
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
      <p className='me-2'>{title}:</p>
      <div className='cus-d-flex'>
        {content && (
          Object.keys(content).map(
            (socialName) => {
              return content[socialName] !== '' ? (
                <Tooltip

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
      <InformationHeader projectName={detail?.name}/>
      <div className='card-body pt-3'>
        <div className='profile-blog'>
          <div className='community-list'>
            {detail?.minTokenToParticipate > 0 && (
              <div className='community-list-item'>
                {dataItem('Entry Threshold', `${detail?.minTokenToParticipate} ${detail?.symbol}`)}
              </div>
            )}

            {detail?.yearFounded && (
              <div className='community-list-item'>
                {dataItem('Year Founded', detail?.yearFounded)}
              </div>
            )}

            {!_.isEmpty(detail?.chains) && (
              <div className='community-list-item'>
                {
                  <div className='d-flex text-align-center mb-2'>
                    <p className='mb-0'> Chains:</p>
                    <Avatar.Group className='ms-1'
                      alt='Blockchains Logos'
                      maxCount={4}
                      size={20}
                      maxStyle={{
                        color: '#fff',
                        backgroundColor: '#039F7F',
                        cursor: 'pointer'
                      }}
                    >
                      {detail?.chains && Object.keys(detail?.chains).map((key, index) => (
                        <>
                          {key && (
                            <Tooltip key={index} title={chainList[key]?.chainName}>
                              <Avatar
                                alt='Blockchain Logo'
                                onClick={() => onItemClicked(chainList[key]?.exploreWebsite)}
                                size={20}
                                src={chainList[key]?.image}
                                key={index}
                                className='crypto-info-exchange'
                              />

                            </Tooltip>

                          )}
                        </>
                      ))}
                    </Avatar.Group>
                  </div>
                }
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
    </div>
  }

  const about = <Description
    projectName={detail?.name}
    text={detail?.description}
  />

  const portfolioColumns = [
    {
      title: 'Name',
      render: (_, record) => (<span><Avatar src={formatImgUrlFromProductId(record?.projectId)}/> {record?.projectName}</span>)
    },
    {
      title: 'Blockchains',
      render: (_, record) =>
        <div className='d-flex text-align-center mb-2'>
          <Avatar.Group className='ms-1 '
            alt='Blockchains Logos'
            maxCount={4}
            size={25}
            maxStyle={{
              color: '#fff',
              backgroundColor: '#039F7F',
              cursor: 'pointer'
            }}
          >
            {record?.blockchain && Object.keys(record?.blockchain)?.map((key, index) => (
              <>
                {key && (
                  <Tooltip key={index} title={chainList[key]?.chainName}>
                    <Avatar
                      alt='Blockchain Logo'
                      onClick={() => onItemClicked(chainList[key]?.exploreWebsite)}
                      size={25}
                      src={chainList[key]?.image}
                      key={index}
                      className='crypto-info-exchange'
                    />
                  </Tooltip>
                )}
              </>
            ))}
          </Avatar.Group>
        </div>
      // responsive: ['xxl']
    },
    {
      title: 'Status',
      render: (_, record) => (<Badge className='bg-success badge-sm badge' style={{ textTransform: 'uppercase' }}>{record?.status}</Badge>)
    },
    {
      title: 'Supply',
      render: (_, record) => <span>{formatLargeNumber(record?.totalSupply)}</span>
    },
    {
      title: 'Market Cap',
      render: (_, record) => <span>{formatMoney(record?.fullyDilutedMarketcap)}</span>,
      responsive: ['sm', 'lg']
    },
    {
      title: 'Goal',
      render: (_, record) => <span>{formatMoney(record?.fundRaisingGoals)}</span>
    }

  ]

  const handleInvestItemClicked = (projectId) => {
    const splitted = projectId?.split('_')
    const type = splitted[1]

    if (type === 'soon') {
      navigate(`../../../products/${type}/${splitted[2]}`)
    }
  }

  const IDOList = () => {
    return <>
      <div className=' coin-content '>
        <div className='card-header border-0 flex-wrap cus-card-header'>
          <div className='mb-2'>
            <h5 className='heading text-primary'>{detail?.name} Invest Data</h5>
          </div>
        </div>
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between flex-wrap'>
            <div className='d-flex align-items-center justify-content-between flex-wrap'>
              {detail?.avgRoiCurrent && <div className='price-content'>
                <span className='fs-18 d-block mb-2'>Current AVG ROI
                </span>
                <h4 className='fs-20 font-w600'>
                  {detail?.avgRoiCurrent?.toFixed(2)}x
                  {detail?.avgRoiCurrentPercent !== 0 && <span className={detail?.avgRoiCurrentPercent > 0 ? ' text-success' : ' text-danger'} style={{ fontSize: '14px', marginLeft: '5px' }}>{detail?.avgRoiCurrentPercent?.toFixed(2)}%</span>}
                </h4>
              </div>}
              {detail?.avgRoiATH && <div className='price-content'>
                <span className='fs-18 d-block mb-2'>ATH AVG ROI
                </span>
                <h4 className='fs-20 font-w600'>
                  {detail?.avgRoiATH?.toFixed(2)}x
                  {detail?.avgRoiATHPercent !== 0 && <span className={detail?.avgRoiATHPercent > 0 ? ' text-success' : ' text-danger'} style={{ fontSize: '14px', marginLeft: '5px' }}>{detail?.avgRoiATHPercent?.toFixed(2)}%</span>}
                </h4>
              </div>}
              {detail?.marketCap && <div className='price-content'>
                <span className='fs-18 d-block mb-2'>Market Cap
                </span>
                <h4 className='fs-20 font-w600'>
                  {formatMoney(detail?.marketCap)}
                </h4>
              </div>}
              {detail?.volume24h && <div className='price-content'>
                <span className='fs-18 d-block mb-2'>Volume 24H
                </span>
                <h4 className='fs-20 font-w600'>
                  {formatMoney(detail?.volume24h)}
                </h4>
              </div>}
            </div>
          </div>
          <div className='mt-5 table-responsive'>
            <Table
              className='invest-table'
              columns={portfolioColumns}
              dataSource={productInfo?.mores?.soon}
              onRow={(record) => ({
                onClick: () => {
                  handleInvestItemClicked(record?.projectId)
                }
              })}
              rowKey={(record) => record?.projectId}
              pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
            />
          </div>
        </div>
      </div>
    </>
  }

  return (
    <DetailLayout
      type='launchpad'
      Header={<Header />}
      summary={summary}
      more={<More />}
      about={about}
      portfolioOrChartOrDesc={productInfo?.mores?.soon ? <IDOList /> : null}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
      similar={<ProductSimilar productType={LAUNCHPAD} similarList={productInfo?.similars} />}
      productInfo={productInfo}
    />
  )
}

export default LaunchpadDetail
