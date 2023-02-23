import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DetailLayout } from '../detail-layout'

import { Badge, Button, Dropdown } from 'react-bootstrap'
import LaunchpadIconList from '../../common-widgets/page-soon/LaunchpadIconList'
import {
  formatLargeNumberMoneyUSD,
  formatLargeNumber
} from '../../../../utils/formatNumber'
import moment from 'moment'
// import FormReport from '../../Forms/form-report/FormReport'
import Description from '../description/Description'
import { LoadingOutlined } from '@ant-design/icons'
import LightGallery from 'lightgallery/react'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
// / Image
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import { websiteIcon } from '../../common-widgets/icons'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { SOON } from '../../../constants/category'
import { encodeUrl } from '../../../../utils/formatUrl'
import { Spin, Tooltip, Image } from 'antd'
import { formatImgUrlFromProductId, isValidProductId } from '../../../../utils/formatText'
import imgAbsentImageSoon from '../../../../images/absent_image_soon.png'
import imgReportProject from '../../../../images/svg/report-project-white.svg'

import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
const txtTBA = 'TBA'

// match with BE
const statusUpcoming = 'upcoming'
const statusOngoing = 'ongoing'
const statusPast = 'past'

// display in FE
const displayUpcoming = 'COMING SOON'
const displayOngoing = 'IS ACTIVE'
const displayPast = 'IS ENDED'

const getDisplayFromSoonStatus = (status) => {
  switch (status) {
    case statusUpcoming:
      return displayUpcoming
    case statusOngoing:
      return displayOngoing
    case statusPast:
      return displayPast
    default:
      return ''
  }
}

const classBackgroundUpcoming = 'badge-info'
const classBackgroundOngoing = 'badge-success'
const classBackgroundPast = 'badge-default'

export const getStatusBackgroundFromSoonStatus = (status) => {
  switch (status) {
    case statusUpcoming:
      return classBackgroundUpcoming
    case statusOngoing:
      return classBackgroundOngoing
    case statusPast:
      return classBackgroundPast
    default:
      return ''
  }
}

const convertStringDDMMYYYYToUnix = (ddmmyyyy) =>{
  const minusOffset = new Date().getTimezoneOffset()
  const miliSecOffset = minusOffset * 60 * 1000
  let dateUnix = new Date(ddmmyyyy?.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'))
  dateUnix.setTime(dateUnix?.getTime() - miliSecOffset) // Local user to GMT + 0
  dateUnix = dateUnix?.getTime()
  return (dateUnix)
}

export const getStatusFromStartDateAndEndDate = (startDate, endDate) => {
  const minusOffset = new Date().getTimezoneOffset()
  const miliSecOffset = minusOffset * 60 * 1000
  let myCurrentDateTimeUnix = (new Date())
  myCurrentDateTimeUnix.setTime(myCurrentDateTimeUnix?.getTime() - miliSecOffset) // Local user to GMT + 0
  myCurrentDateTimeUnix = myCurrentDateTimeUnix?.getTime()

  // string "15-05-2018" to date unix time
  const startDateUnix = convertStringDDMMYYYYToUnix(startDate)

  const endDateUnix = convertStringDDMMYYYYToUnix(endDate)

  // Ongoing
  if (myCurrentDateTimeUnix >= startDateUnix && myCurrentDateTimeUnix <= endDateUnix) {
    return statusOngoing
  } else
  // Past
  if (myCurrentDateTimeUnix > endDateUnix) {
    return statusPast
  } else
  // Upcoming
  if (myCurrentDateTimeUnix < startDateUnix) {
    return statusUpcoming
  }
  return ''
}

const formatDateStyle = 'ddd, DD MMM YYYY' // Mon, 06 Feb 2023

const SoonInfo = ({ productInfo, ...rest }) => {
  const navigate = useNavigate()
  const itemDetail = productInfo?.details
  const itemTags = productInfo?.mores?.tag
  const itemRoundSales = productInfo?.mores?.roundSale
  const [websiteLoading, setWebsiteLoading] = useState(false)
  const [top, setTop] = useState()

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

  const handleClickTag = (value) => {
    navigate(`../../../../../${SOON}/${encodeUrl(value)}`)
  }

  const header = itemDetail ? (
    <div className='profile-info'>
      <div className='profile-details'>
        <div className='profile-photo'>
          {itemDetail?.projectId ? (
            <Image src={isValidProductId(itemDetail?.projectId) ? formatImgUrlFromProductId(itemDetail?.projectId) : imgAbsentImageSoon} preview={false}/>
          )
            : (<span className='image-list-no-data-detail'>
              {itemDetail?.projectName?.slice(0, 3)}
            </span>
            )}
        </div>
        <div className='profile-name px-3 pt-2'>
          <h4 className='text-primary mb-0'>{itemDetail?.projectName}</h4>
          <p>{itemDetail?.projectSymbol}</p>
        </div>
        <div className='profile-email px-2 pt-2'>
          <h4 className='text-muted mb-0'>
            <span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(getStatusFromStartDateAndEndDate(itemDetail?.startDate, itemDetail?.endDate))}`}>
              {getStatusFromStartDateAndEndDate(itemDetail?.startDate, itemDetail?.endDate)?.toUpperCase()}
            </span>
          </h4>
          <p >
            {itemDetail?.type}
          </p>
        </div>
        <Button
          as='a'
          href='#'
          className='btn btn-primary mb-1 ms-auto'
          onClick={() => {
            setWebsiteLoading(true)
            setTimeout(() =>{
              itemDetail?.website && window.open(itemDetail?.website)
              setWebsiteLoading(false)
            }, 3000)
          }}
        >
          {websiteLoading ? <Spin indicator={<LoadingOutlined spin />} size='small' style={{ color: 'white', marginRight: '1rem', verticalAlign: 'center' }} /> : ''}
          {websiteIcon}
            Website
        </Button>
      </div>
    </div>
  ) : ''

  const roundSale = itemRoundSales ? (
    <div>
      <div className='card-header'>
        <h4 className='card-title'>{itemDetail?.projectName} IDO</h4>
      </div>
      <div className='card-body'>
        <div className='table-responsive recentOrderTable'>
          <table className='table verticle-middle table-responsive-md'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Round</th>
                <th scope='col'>Start</th>
                <th scope='col'>End</th>
                <th scope='col'>Raise</th>
                <th scope='col'>Total</th>
                <th scope='col'>Price</th>
                <th scope='col'>Status</th>
                <th scope='col'>More</th>
              </tr>
            </thead>
            <tbody>
              { itemRoundSales?.map((itemRoundSale, arrIndex) => (
                <>
                  <tr>
                    <td>{arrIndex + 1}</td>
                    <td>{itemRoundSale?.type} {getDisplayFromSoonStatus(itemRoundSale?.status)}</td>
                    <td>{itemRoundSale?.start ? moment(itemRoundSale?.start).format(formatDateStyle) : txtTBA}</td>
                    <td>{itemRoundSale?.end ? moment(itemRoundSale?.end).format(formatDateStyle) : txtTBA}</td>
                    <td>{formatLargeNumberMoneyUSD(itemRoundSale?.raise)}</td>
                    <td>{formatLargeNumber(itemRoundSale?.tokenForSale)}</td>
                    <td>{formatLargeNumberMoneyUSD(itemRoundSale?.price)}</td>
                    <td>
                      <span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(itemRoundSale?.status)}`}>
                        {itemRoundSale?.status?.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <Dropdown className='dropdown custom-dropdown mb-0'>
                        <Dropdown.Toggle
                          className='btn sharp btn-primary tp-btn i-false'
                          data-toggle='dropdown'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            width='18px'
                            height='18px'
                            viewBox='0 0 24 24'
                            version='1.1'
                          >
                            <g
                              stroke='none'
                              strokeWidth='1'
                              fill='none'
                              fillRule='evenodd'
                            >
                              <rect x='0' y='0' width='24' height='24' />
                              <circle fill='#000000' cx='12' cy='5' r='2' />
                              <circle fill='#000000' cx='12' cy='12' r='2' />
                              <circle fill='#000000' cx='12' cy='19' r='2' />
                            </g>
                          </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='dropdown-menu dropdown-menu-end'>
                          <Dropdown.Item className='dropdown-item'>
                            {itemRoundSale?.lockUpPeriod}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : null

  const summary = (
    <div className='text-center'>
      <div className='row'>
        <div className='col'>
          <h3 className='m-b-0'>
            <Badge bg='light' text='dark'>{formatLargeNumberMoneyUSD(itemDetail?.fundRaisingGoals)}</Badge>
          </h3>
          <span>Raised</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            <Badge bg='light' text='dark'>{formatLargeNumberMoneyUSD(itemDetail?.fullyDilutedMarketcap)}</Badge>
          </h3>{' '}
          <span>Marketcap</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            <Badge bg='light' text='dark'>{formatLargeNumber(itemDetail?.totalSupply)}</Badge>
          </h3>{' '}
          <span>Supply</span>
        </div>
      </div>
      <div className='mt-4'>

        <Button
          className='mb-1 me-1'
          variant='danger'
          onClick={handleReportScam}
        >
          <img src={imgReportProject} alt='err' className='img-fluid noti ms-2' style={{ height: '24px' }}/>
        &nbsp;
      Report&nbsp;Scam
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
          <svg width='24' height='24' viewBox='0 0 1024 1024' className='icon' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M687.542857 965.485714H182.857143c-87.771429 0-160.914286-73.142857-160.914286-160.914285V256c0-87.771429 73.142857-160.914286 160.914286-160.914286h336.457143V146.285714H182.857143C124.342857 146.285714 73.142857 197.485714 73.142857 256v541.257143c0 58.514286 51.2 109.714286 109.714286 109.714286h504.685714c58.514286 0 109.714286-51.2 109.714286-109.714286V533.942857h58.514286v263.314286c-7.314286 95.085714-80.457143 168.228571-168.228572 168.228571z' fill='#fff' /><path d='M877.714286 95.085714l109.714285 138.971429c7.314286 7.314286 0 14.628571-7.314285 21.942857L629.028571 526.628571c-7.314286 7.314286-160.914286-7.314286-160.914285-7.314285s29.257143-146.285714 36.571428-153.6l351.085715-270.628572c7.314286-7.314286 14.628571-7.314286 21.942857 0z' fill='#F4B1B2' /><path d='M607.085714 555.885714c-21.942857 0-65.828571 0-138.971428-7.314285H438.857143V512c29.257143-160.914286 36.571429-160.914286 43.885714-168.228571L833.828571 73.142857c21.942857-14.628571 43.885714-14.628571 58.514286 7.314286L1002.057143 219.428571c14.628571 14.628571 7.314286 43.885714-7.314286 58.514286L643.657143 548.571429c-7.314286 7.314286-7.314286 7.314286-36.571429 7.314285z m-109.714285-58.514285c51.2 0 95.085714 7.314286 117.028571 7.314285L950.857143 241.371429l-87.771429-117.028572-336.457143 263.314286c-7.314286 14.628571-14.628571 58.514286-29.257142 109.714286z' fill='#fff' /></svg>
        &nbsp;
      Add Review
        </Button>
      </div>
    </div>
  )

  const more =
      <div>
        <div className='card-header border-0 pb-0'>
          <h5 className='heading text-primary'>{itemDetail?.projectName} Information</h5>
        </div>
        <div className='card-body pt-3'>
          {itemDetail?.startDate
            ? <div className='profile-blog mb-3'>
              <Link to={'#'} >
                <h4>Start date:</h4>
              </Link>
              <p className='mb-0 btn btn-primary light btn-xs mb-1 me-1'>
                {moment(convertStringDDMMYYYYToUnix(itemDetail?.startDate)).format(formatDateStyle)}
              </p>
            </div> : ''}

          {itemDetail?.endDate
            ? <div className='profile-blog mb-3'>
              <Link to={'#'} >
                <h4>End date:</h4>
              </Link>
              <p className='mb-0 btn btn-primary light btn-xs mb-1 me-1'>
                {moment(convertStringDDMMYYYYToUnix(itemDetail?.endDate)).format(formatDateStyle)}
              </p>
            </div> : ''}

          {itemDetail?.roundType
            ? <div className='profile-blog mb-3'>
              <Link to={'#'} >
                <h4>Current Round:</h4>
              </Link>
              <p className='mb-0 btn btn-primary light btn-xs mb-1 me-1'>
                {itemDetail?.roundType}
              </p>
            </div> : ''}

          { !_.isEmpty(itemTags)
            ? <div className='profile-blog mb-3'>
              <Link to={'#'} >
                <h4>Tag(s):</h4>
              </Link>
              { Object.keys(itemTags)?.map((index) => (
                <div
                  className='mb-0 btn btn-primary light btn-xs mb-2 me-1'
                  onClick={() => handleClickTag(itemTags[index]?.name)}
                  key={index}
                >
                  {itemTags[index]?.name}
                </div>
              )) }
            </div> : ''}

          { !_.isEmpty(itemDetail?.launchPads)
            ? <div className='profile-blog mb-3'>
              <Link to={'#'} >
                <h4>Launchpad(s):</h4>
              </Link>
              <span className='mb-0'>
                <LaunchpadIconList listLaunchpad={itemDetail?.launchPads} />
              </span>
            </div> : ''
          }

          <div className='profile-blog'>
            <Link to={'#'} >
              <h4>Website(s):</h4>
            </Link>
            <p className='mb-0 d-flex website-soon'>
              {
                itemDetail?.whitepaperUrl ? <div className='basic-dropdown mx-2 mb-2'>
                  <Dropdown variant='primary' className='cus-dropdown-select btn btn-primary light sharp' onClick={() => window.open(itemDetail?.website)}>
                  Homepage
                  </Dropdown>
                </div> : ''
              }

              {
                itemDetail?.whitepaperUrl ? <div className='basic-dropdown mx-2 mb-2'>
                  <Dropdown variant='primary' className='cus-dropdown-select btn btn-primary light sharp' onClick={() => window.open(itemDetail?.whitepaperUrl)}>
                  Whitepaper
                  </Dropdown>
                </div> : ''
              }

              {
                itemDetail?.community
                  ? <div className='basic-dropdown'>
                    <Dropdown>
                      <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                        Community
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='cus-dropdown-menu'>
                        {
                          Object.keys(itemDetail?.community)?.map((keyName, index) => (
                            <Dropdown.Item onClick={() => window.open(itemDetail?.community[keyName])} key={index}>{keyName}</Dropdown.Item>
                          ))
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  : ''
              }

              {
                itemDetail?.additionalLinks
                  ? <div className='basic-dropdown mx-2 mb-2'>
                    <Dropdown>
                      <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                    Additional Links
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='cus-dropdown-menu'>
                        {
                          Object.keys(itemDetail?.additionalLinks)?.map((keyName, index) => (
                            <Dropdown.Item onClick={() => window.open(itemDetail?.additionalLinks[keyName])} key={index}>{keyName}</Dropdown.Item>
                          ))
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  : ''
              }

              {
                itemDetail?.sourceCode
                  ? <div className='basic-dropdown mx-2 mb-2'>
                    <Dropdown>
                      <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                        Source Code
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='cus-dropdown-menu'>
                        {
                          Object.keys(itemDetail?.sourceCode)?.map((keyName, index) => (
                            <Dropdown.Item onClick={() => window.open(itemDetail?.sourceCode[keyName])} key={index}>{keyName}</Dropdown.Item>
                          ))
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  : ''
              }

              {
                itemDetail?.blockchain
                  ? <div className='basic-dropdown mx-2 mb-2'>
                    <Dropdown>
                      <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                        Blockchain
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='cus-dropdown-menu'>
                        {
                          Object.keys(itemDetail?.blockchain)?.map((keyName, index) => (
                            <Dropdown.Item key={index}>{keyName}</Dropdown.Item>
                          ))
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  : ''
              }

            </p>
          </div>

        </div>
      </div>

  // wait load finish modal, avoid excpetion
  const description = itemDetail?.fullDesc ? (
    <div>
      <div className='card-header border-0 pb-0'>
        <h5 className='heading text-primary'>About {itemDetail?.projectName}</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          <p className='mb-0'>
            <Description text={itemDetail?.fullDesc} />
          </p>
        </div>
      </div>
    </div>
  ) : ''

  const about = itemDetail?.media
    ? (
      <div className='card'>
        <div className='card-header border-0 pb-0'>
          <h5 className='heading text-primary'>Screenshots</h5>
        </div>
        <div className='card-body pt-3'>
          <div className='profile-interest'>
            <LightGallery
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
              elementClassNames='row sp4'
            >
              { Object.keys(itemDetail?.media)?.map((keyScreenshotName, index) => (
                <>
                  <div
                    data-src={itemDetail?.media[keyScreenshotName]}
                    className='col-lg-4 col-xl-4 col-sm-4 col-6 int-col mb-1 cursor-pointer'
                    key={index}
                  >
                    <Tooltip
                      title={keyScreenshotName}
                    >
                      <img
                        src={itemDetail?.media[keyScreenshotName]}
                        style={{ width: '100%', height: '5rem' }}
                        alt={keyScreenshotName}
                      />
                    </Tooltip>

                  </div>
                </>
              ))}
            </LightGallery>
          </div>
        </div>
      </div>) : null

  return (
    <DetailLayout
      Header={header}
      roundSale={roundSale}
      summary={summary}
      more={more}
      type='soon'
      portfolioOrChartOrDesc={description}
      about={about}
      numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
    />
  )
}
export default SoonInfo
