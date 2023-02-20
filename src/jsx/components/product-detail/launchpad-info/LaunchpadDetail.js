import { Avatar, Spin, Table, Tooltip } from 'antd'
import React, { useContext, useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { DetailLayout } from '../detail-layout'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'
import imgReportProject from '../../../../images/svg/report-project-white.svg'
import Description from '../description/Description'
// import FormReport from '../../Forms/form-report/FormReport'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { websiteIcon } from '../../common-widgets/icons'
import MyScoreComponent from '../../score/scoreComponent'
import { myLogo } from '../../common-widgets/logo/logo'
import { formatLargeNumber, formatMoney } from '../../../../utils/formatNumber'
import { ChainListContext } from '../../../../App'
import _ from 'lodash'
import './LaunchpadInfo.scss'

const LaunchpadDetail = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const chainList = useContext(ChainListContext)

  const onOpenDapp = (link) => {
    setLoading(true)
    setTimeout(() => {
      link && window.open(link)
      setLoading(false)
    }, 3000)
  }

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
  }

  const onItemClicked = (url) =>{
    url && window.open(url)
  }

  // VENTURE HEADER
  const Header = () => {
    return <div className='profile-head'>

      <div className='profile-info mb-1'>
        <div className='profile-photo'>
          { myLogo('thumbLogo', detail?.launchPadId, 'launchpad', 60) ||
         myLogo('bigLogo', detail?.launchPadId, 'launchpad', 60) ||
         myLogo('nativeLogo', detail?.launchPadId, 'launchpad', 60) ||
         myLogo('smallLogo', detail?.launchPadId, 'launchpad', 60) ||
          <span>
            {detail?.name?.slice(0, 3)}
          </span>
          }
        </div>
        <div className='profile-details'>
          <div className='profile-name px-3 ms-2 '>
            <h4 className='text-primary mb-0'>{detail?.name} {detail?.symbol ? `(${detail?.symbol})` : null}
            </h4>
            <Badge className='badge-sm' >{detail?.type}</Badge>
          </div>
          {detail?.website && <Button className='ms-auto' onClick={() => onOpenDapp(detail?.website)}>
            {loading ? <Spin indicator={<LoadingOutlined spin />} style={{ color: 'white', marginRight: '10px' }} /> : <div></div>}
            {websiteIcon}
    Open Website
          </Button>}
        </div>
      </div>
    </div>
  }

  // VENTURE SUMMARY
  const summary =
  <div className='text-center'>
    <div className='row'>
      <div className='col'>
        <h3 className='m-b-0'>
          <Badge bg='badge-l' className='badge-success'>{productInfo?.details?.totalReviews}</Badge>
        </h3>
        <span>Reviews</span>
      </div>
      <div className='col'>
        <h3 className='m-b-0'>
          <Badge bg='badge-l' className='badge-warning'>{productInfo?.details?.totalIsScam}</Badge>
        </h3>
        <span>
        Reported Scam
        </span>
      </div>
      <div className='col'>
        <h3 className='m-b-0'>
          <MyScoreComponent score={productInfo?.details?.score} />
        </h3>
        <span>
        Score
        </span>
      </div>
    </div>
    <div className='mt-4'>
      <Button
        as='a'
        href='#comment'
        className='mb-1 me-1'
        variant='danger'
        onClick={handleReportScam}
      >
        <img src={imgReportProject} alt='err' />
        &nbsp;
      Report&nbsp;Scam
      </Button>
      <Button
        as='a'
        href='#comment'
        className='btn btn-primary mb-1 ms-1'
        onClick={() => {
          rest?.setData({ ...rest.data, isScam: false })
          rest?.form.setFieldsValue({
            isScam: false,
            star: undefined,
            sources: []
          })
        }}
      >
        <svg width='24' height='24' viewBox='0 0 1024 1024' className='icon' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M687.542857 965.485714H182.857143c-87.771429 0-160.914286-73.142857-160.914286-160.914285V256c0-87.771429 73.142857-160.914286 160.914286-160.914286h336.457143V146.285714H182.857143C124.342857 146.285714 73.142857 197.485714 73.142857 256v541.257143c0 58.514286 51.2 109.714286 109.714286 109.714286h504.685714c58.514286 0 109.714286-51.2 109.714286-109.714286V533.942857h58.514286v263.314286c-7.314286 95.085714-80.457143 168.228571-168.228572 168.228571z' fill='#fff' /><path d='M877.714286 95.085714l109.714285 138.971429c7.314286 7.314286 0 14.628571-7.314285 21.942857L629.028571 526.628571c-7.314286 7.314286-160.914286-7.314286-160.914285-7.314285s29.257143-146.285714 36.571428-153.6l351.085715-270.628572c7.314286-7.314286 14.628571-7.314286 21.942857 0z' fill='#F4B1B2' /><path d='M607.085714 555.885714c-21.942857 0-65.828571 0-138.971428-7.314285H438.857143V512c29.257143-160.914286 36.571429-160.914286 43.885714-168.228571L833.828571 73.142857c21.942857-14.628571 43.885714-14.628571 58.514286 7.314286L1002.057143 219.428571c14.628571 14.628571 7.314286 43.885714-7.314286 58.514286L643.657143 548.571429c-7.314286 7.314286-7.314286 7.314286-36.571429 7.314285z m-109.714285-58.514285c51.2 0 95.085714 7.314286 117.028571 7.314285L950.857143 241.371429l-87.771429-117.028572-336.457143 263.314286c-7.314286 14.628571-14.628571 58.514286-29.257142 109.714286z' fill='#fff' /></svg>
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
    return <div className='d-flex'>
      <p className='mt-2 me-2'>{title}:</p>
      {content && (
        // <Avatar.Group
        //   size={25}
        //   maxCount={2}
        //   maxStyle={{
        //     color: '#f56a00',
        //     backgroundColor: '#fde3cf',
        //     cursor: 'pointer'
        //   }}
        //   className='mt-1'
        //   style={{ marginLeft: '10px' }}>
        Object.keys(content).map(
          (socialName) => {
            return content[socialName] !== '' ? (
              <Tooltip
                className='me-1 mt-2'
                placementTooltip='topLeft'
                title={socialName}
                key={socialName}
              >
                <a
                  href={content[socialName]}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Avatar
                    size={25}
                    className=' img-fluid p-1 rounded-circle'
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
  }

  const More = () => {
    return <div>
      <div className='card-header border-0 pb-0'>
        <h5 className='text-primary'>{detail?.name} Information:</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog'>
          <div className='row'>
            <div className='col-6'>
              {detail?.minTokenToParticipate && dataItem('Entry Threshold', `${detail?.minTokenToParticipate} ${detail?.symbol}`)}
              {detail?.avgRoiCurrent > 0 && <div className='d-flex text-align-center mb-1'>
                <p className='mb-0 mt-1'>Current AVG ROI(USD):</p>
                <h5 className='ms-1 mt-1 d-flex align-items-center' >{detail?.avgRoiCurrent?.toFixed(2)}x
                  {detail?.avgRoiCurrentPercent && <span className={detail?.avgRoiCurrentPercent > 0 ? ' text-success' : ' text-danger'} style={{ fontSize: '14px', marginLeft: '5px' }}>{detail?.avgRoiCurrentPercent?.toFixed(2)}%</span>}
                </h5>
              </div>}
              {detail?.avgRoiATH > 0 && <div className='d-flex text-align-center mb-1'>
                <p className='mb-0 mt-1'>ATH AVG ROI(USD):</p>
                <h5 className='ms-1 mt-1 d-flex align-items-center' >{detail?.avgRoiATH?.toFixed(2)}x
                  {detail?.avgRoiATHPercent && <span className={detail?.avgRoiATHPercent > 0 ? ' text-success' : ' text-danger'} style={{ fontSize: '14px', marginLeft: '5px' }}>{detail?.avgRoiATHPercent?.toFixed(2)}%</span>}
                </h5>
              </div>}
            </div>
            <div className='col-6'>
              {detail?.yearFounded && dataItem('Year Of Foundation', detail?.yearFounded)}
              {detail?.marketCap && dataItem('Watchlist Marketcap', formatMoney(detail?.marketCap))}
              {detail?.volume24h && dataItem('Watchlist Volume 24h', formatMoney(detail?.volume24h))}
            </div>

            <div className='col-12'>
              {communityItem('Socials', detail?.socials)}
            </div>
            <div className='col-12'>
              {!_.isEmpty(detail?.chains) && (
                <div className='d-flex text-align-center mb-2'>
                  <p className='mb-0'> Chains:</p>
                  <Avatar.Group className='ms-1 '
                    maxCount={4}
                    size={25}
                    maxStyle={{
                      color: '#f56a00',
                      backgroundColor: '#fde3cf',
                      cursor: 'pointer'
                    }}
                  >
                    {detail?.chains && Object.keys(detail?.chains).map((key, index) => (
                      <>
                        {key && (
                          <Tooltip key={index} title={chainList[key]?.chainName}>
                            <Avatar
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
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  }

  const About = () => {
    return <div>
      <div className='card-header border-0 pb-0'>
        <h5 className='text-primary'>About {detail?.name}:</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          {detail?.description && <Description text={detail?.description}/>}
        </div>
      </div>
    </div>
  }

  const portfolioColumns = [
    {
      title: 'Name',
      render: (_, record) => (<span><Avatar src={record?.bigLogo}/> {record?.projectName}</span>)
    },
    {
      title: 'Blockchains',
      render: (_, record) =>
        <div className='d-flex text-align-center mb-2'>
          <Avatar.Group className='ms-1 '
            maxCount={4}
            size={25}
            maxStyle={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
              cursor: 'pointer'
            }}
          >
            {record?.blockchain && Object.keys(record?.blockchain)?.map((key, index) => (
              <>
                {key && (
                  <Tooltip key={index} title={chainList[key]?.chainName}>
                    <Avatar
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

    },
    {
      title: 'Status',
      render: (_, record) => (<Badge className='bg-success badge-l badge' style={{ textTransform: 'capitalize' }}>{record?.status}</Badge>)
    },
    {
      title: 'Total Supply',
      render: (_, record) => <span>{formatLargeNumber(record?.totalSupply)}</span>
    },
    {
      title: 'Marketcap',
      render: (_, record) => <span>{formatMoney(record?.fullyDilutedMarketcap)}</span>
    },
    {
      title: 'Raising Goal',
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
      <div className='card-header border-0 pb-0'>
        <h5 className='text-primary'>{detail?.name} Investment List</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog'>
          <Table
            className='invest-table'
            // loading={loading}
            rowClassName='portfolio-item'
            columns={portfolioColumns}
            dataSource={productInfo?.mores?.soon}
            // rowClassName=''
            // onChange={handleChangeTable}
            onRow={(record) => ({
              onClick: () => {
                handleInvestItemClicked(record?.projectId)
              }
            })}
            rowKey={(record, index) => index}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            // scroll={{ x: 'max-content' }}
          />
        </div>
      </div></>
  }

  return (
    <DetailLayout
      type={'venture'}
      Header={<Header />}
      summary={summary}
      more={<More />}
      about={<About />}
      portfolioOrChart={productInfo?.mores ? <IDOList /> : null}
      numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
      rest={rest}
    />
  )
}

export default LaunchpadDetail
