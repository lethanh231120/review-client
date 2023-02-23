import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DetailLayout } from '../detail-layout'

import { Button, Dropdown } from 'react-bootstrap'
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
import { Spin, Tooltip, Avatar } from 'antd'
import { formatImgUrlFromProductId, isValidProductId } from '../../../../utils/formatText'
import imgAbsentImageSoon from '../../../../images/absent_image_soon.png'

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

const getStatusBackgroundFromSoonStatus = (status) => {
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

const getStatusFromStartDateAndEndDate = (startDate, endDate) => {
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
            <Avatar src={isValidProductId(itemDetail?.projectId) ? formatImgUrlFromProductId(itemDetail?.projectId) : imgAbsentImageSoon} preview={false} size={60}/>
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
            {formatLargeNumberMoneyUSD(itemDetail?.fundRaisingGoals)}
          </h3>
          <span>Raised</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            {formatLargeNumberMoneyUSD(itemDetail?.fullyDilutedMarketcap)}
          </h3>{' '}
          <span>Marketcap</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            {formatLargeNumber(itemDetail?.totalSupply)}
          </h3>{' '}
          <span>Supply</span>
        </div>
      </div>
      <div className='mt-4'>
        <Button
          className='btn btn-primary mb-1 me-1'
          onClick={handleReportScam}
        >
                    Report Scam
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
      portfolioOrChart={description}
      about={about}
      numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
    />
  )
}
export default SoonInfo
