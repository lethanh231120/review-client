import React, { useState } from 'react'
import './SoonInfo.scss'
import { Link } from 'react-router-dom'
import { DetailLayout } from '../detail-layout'

import { Badge, Button, Dropdown } from 'react-bootstrap'
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
import { Spin, Tooltip, Image, Table } from 'antd'
import { formatImgUrlFromProductId, isValidProductId, toCammelCase } from '../../../../utils/formatText'
import imgAbsentImageSoon from '../../../../images/absent_image_soon.png'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import LaunchpadDetail from './../../common-widgets/page-soon/LaunchpadDetail'
import { WARNING_ICON } from '../../common-widgets/logo/logo'
import { LinkOutlined } from '@ant-design/icons'
import { LaunchpadTableDetail } from '../../common-widgets/page-soon/LaunchpadTableDetail'

export const formatDateStyle = 'ddd, DD MMM YYYY' // Mon, 06 Feb 2023

export const txtTBA = 'TBA'

export const txtGoal = 'Goal'

export const txtAbsentTakeUpData = <>&nbsp;</>

// match with BE
const statusUpcoming = 'upcoming'
const statusOngoing = 'ongoing'
const statusPast = 'past'

// display in FE
const displayUpcoming = 'COMING IN'
const displayOngoing = 'ACTIVE IN'
const displayPast = 'ENDED'

const getDisplayFromSoonStatus = (status) => {
  switch (status) {
    case statusUpcoming:
      return displayUpcoming
    case statusOngoing:
      return displayOngoing
    case statusPast:
      return displayPast
    default:
      return txtAbsentTakeUpData
  }
}

const getRelativeTimeString = (startDate, endDate) =>{
  const myCurrentDateTimeUnix = getCurrentTimeUnix()

  // string "15-05-2018" to date unix time
  const startDateUnix = convertStringDDMMYYYYToUnix(startDate)

  const endDateUnix = convertStringDDMMYYYYToUnix(endDate, true)

  // Ongoing
  if (myCurrentDateTimeUnix >= startDateUnix && myCurrentDateTimeUnix <= endDateUnix) {
    return getRelativeHumanTime(endDateUnix - myCurrentDateTimeUnix)
  } else
  // Past
  if (myCurrentDateTimeUnix > endDateUnix) {
    return `${getRelativeHumanTime(myCurrentDateTimeUnix - endDateUnix)} ago`
  } else
  // Upcoming
  if (myCurrentDateTimeUnix < startDateUnix) {
    return getRelativeHumanTime(startDateUnix - myCurrentDateTimeUnix)
  }
  return ''
}

const classTxtUpcoming = 'text-warning'
const classTxtOngoing = 'text-primary'
const classTxtPast = 'text-danger'

const classBackgroundUpcoming = 'badge-warning'
const classBackgroundOngoing = 'badge-primary'
const classBackgroundPast = 'badge-danger'

export const getStatusBackgroundFromSoonStatus = (status) => {
  switch (status) {
    case statusUpcoming:
      return classBackgroundUpcoming
    case statusOngoing:
      return classBackgroundOngoing
    case statusPast:
      return classBackgroundPast
    default:
      return txtAbsentTakeUpData
  }
}

// getEndDate = true (plus one day to get next day)
export const convertStringDDMMYYYYToUnix = (ddmmyyyy, getEndDate = false) =>{
  let dateUnix = new Date(ddmmyyyy?.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'))
  dateUnix.setTime(dateUnix?.getTime()) // Local user to GMT + 0
  if (getEndDate) {
    const millSecInOneDay = 1000 * 60 * 60 * 24 // 86400000 milliseconds.
    // convert start day to end day --> (>=start && <end of endDate) still in status ongoing project IDO/ ICO/ IEO
    dateUnix.setTime(dateUnix?.getTime() + millSecInOneDay)
  }
  dateUnix = dateUnix?.getTime()
  return (dateUnix)
}

const getCurrentTimeUnix = () => {
  let myCurrentDateTimeUnix = (new Date())
  myCurrentDateTimeUnix = myCurrentDateTimeUnix?.getTime()
  return myCurrentDateTimeUnix
}

export const getStatusFromStartDateAndEndDate = (startDate, endDate) => {
  const myCurrentDateTimeUnix = getCurrentTimeUnix()

  // string "15-05-2018" to date unix time
  const startDateUnix = convertStringDDMMYYYYToUnix(startDate)

  const endDateUnix = convertStringDDMMYYYYToUnix(endDate, true)

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
  return txtAbsentTakeUpData
}

const getRelativeHumanTime = (timestamp) => {
  // Convert to a positive integer
  var time = Math.abs(timestamp)

  // Define humanTime and units
  var humanTime, units

  // If there are years
  if (time > (1000 * 60 * 60 * 24 * 365)) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10)
    units = 'year'
  } else// If there are months
  if (time > (1000 * 60 * 60 * 24 * 30)) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10)
    units = 'month'
  } else // If there are weeks
  if (time > (1000 * 60 * 60 * 24 * 7)) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10)
    units = 'week'
  } else // If there are days
  if (time > (1000 * 60 * 60 * 24)) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24), 10)
    units = 'day'
  } else// If there are hours
  if (time > (1000 * 60 * 60)) {
    humanTime = parseInt(time / (1000 * 60 * 60), 10)
    units = 'hour'
  } else // If there are minutes
  if (time > (1000 * 60)) {
    humanTime = parseInt(time / (1000 * 60), 10)
    units = 'minute'
  } else {
    // Otherwise, use seconds
    humanTime = parseInt(time / (1000), 10)
    units = 'second'
  }

  return humanTime + ' ' + units
}

export const getTimeRelativeQuantificationWithNowFromStartDateAndEndDate = (startDate, endDate) => {
  const myCurrentDateTimeUnix = getCurrentTimeUnix()

  // string "15-05-2018" to date unix time
  const startDateUnix = convertStringDDMMYYYYToUnix(startDate)

  const endDateUnix = convertStringDDMMYYYYToUnix(endDate, true)

  // Ongoing
  if (myCurrentDateTimeUnix >= startDateUnix && myCurrentDateTimeUnix <= endDateUnix) {
    return <>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtOngoing} material-icons fs-18`}>rocket_launch</i>
        Started in&nbsp;<b className={`${classTxtOngoing}`}>{getRelativeHumanTime(myCurrentDateTimeUnix - startDateUnix)}</b>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtPast} material-icons fs-18`}>flag</i>
        End in&nbsp;<b className={`${classTxtPast}`}>{getRelativeHumanTime(endDateUnix - myCurrentDateTimeUnix)}</b>
      </div>
    </>
  } else
  // Past
  if (myCurrentDateTimeUnix > endDateUnix) {
    return <>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtPast} material-icons fs-18`}>flag</i>
  Ended in
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <b className={`${classTxtPast}`}>{getRelativeHumanTime(myCurrentDateTimeUnix - endDateUnix)} ago</b>
      </div>
    </>
  } else
  // Upcoming
  if (myCurrentDateTimeUnix < startDateUnix) {
    return <>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtUpcoming} material-icons fs-18`}>rocket_launch</i>
        Start in&nbsp;<b className={`${classTxtUpcoming}`}>{getRelativeHumanTime(startDateUnix - myCurrentDateTimeUnix)}</b>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtPast} material-icons fs-18`}>flag</i>
        End in&nbsp;<b className={`${classTxtPast}`}>{getRelativeHumanTime(endDateUnix - myCurrentDateTimeUnix)}</b>
      </div>
    </>
  }

  return null
}

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
            <Image alt='IDO/ICO/IEO Logo' src={isValidProductId(itemDetail?.projectId) ? formatImgUrlFromProductId(itemDetail?.projectId) : imgAbsentImageSoon} preview={false}/>
          )
            : (<span className='image-list-no-data-detail'>
              {itemDetail?.projectName?.slice(0, 3)}
            </span>
            )}
        </div>
        <div className='profile-name px-2 pt-2'>
          <h4 className='text-primary mb-0'>{itemDetail?.projectName}</h4>
          <p style={{ paddingTop: '0.1rem' }} >
            {itemDetail?.projectSymbol}
          </p>
        </div>
        <div className='profile-email px-2 pt-2'>
          <p className='text-muted mb-0'>
            {
              itemDetail?.startDate && itemDetail?.endDate ? <span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(getStatusFromStartDateAndEndDate(itemDetail?.startDate, itemDetail?.endDate))}`}>
                {getStatusFromStartDateAndEndDate(itemDetail?.startDate, itemDetail?.endDate)?.toUpperCase()}
              </span> : txtAbsentTakeUpData
            }
          </p>
          {itemDetail?.countryOrigin &&
            <p style={{ display: 'flex' }}>
              <i className='material-icons' style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>location_on</i>
              {itemDetail?.countryOrigin}
            </p>
          }

        </div>
        {
          itemDetail?.website && <Button
          // as='a'
          // href='#'
            className='btn btn-primary mb-1 ms-auto'
            onClick={() => {
              setWebsiteLoading(true)
              setTimeout(() =>{
                itemDetail?.website && window.open(itemDetail?.website)
                setWebsiteLoading(false)
              }, 3000)
            }}
          >
            {websiteLoading ? <Spin indicator={<LoadingOutlined spin />} size='small' style={{ color: 'white', marginRight: '0.3rem' }} /> : ''}
            {websiteIcon}Website
          </Button>
        }
      </div>
    </div>
  ) : ''

  const columns = [
    {
      title: 'Round',
      dataIndex: 'type',
      key: 'type',
      render: (_, record) => (<>{record?.type}</>)
    },
    { title: 'Start',
      dataIndex: 'start',
      key: 'start',
      render: (_, record) => (<>{record?.start ? moment(record?.start).format(formatDateStyle) : txtTBA}</>)
    },
    { title: 'End',
      dataIndex: 'end',
      key: 'end',
      render: (_, record) => (<>{record?.end ? moment(record?.end).format(formatDateStyle) : txtTBA}</>)
    },
    { title: 'Launchpad',
      dataIndex: 'launchPadId',
      key: 'launchPadId',
      render: (_, record) => (<LaunchpadTableDetail launchpadId={record?.launchPadId} />)
    },
    { title: 'Raise',
      dataIndex: 'raise',
      key: 'raise',
      render: (_, record) => (<>{formatLargeNumberMoneyUSD(record?.raise)}</>)
    },
    { title: 'Total',
      dataIndex: 'tokenForSale',
      key: 'tokenForSale',
      render: (_, record) => (<>{formatLargeNumber(record?.tokenForSale)}</>)
    },
    { title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (<>{formatLargeNumberMoneyUSD(record?.price)}</>)
    },
    { title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => record?.start || record?.end ? (<span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(getStatusFromStartDateAndEndDate(record?.start, record?.end))}`}>
        {`${getDisplayFromSoonStatus(getStatusFromStartDateAndEndDate(record?.start, record?.end))} ${getRelativeTimeString(record?.start, record?.end)}`}
      </span>) : (txtAbsentTakeUpData)
    }
  ]
  const roundSale = (itemRoundSales && !_.isEmpty(itemRoundSales)) ? (
    <div>
      <div className='card-header'>
        <h4 className='card-title'>{itemDetail?.projectName} IDO</h4>
      </div>
      <div className='card-body' style={{ padding: '0' }}>
        <div className='table-responsive recentOrderTable'>
          <table className='table verticle-middle table-responsive-md'>
            <Table
              columns={columns}
              expandable={{
                expandedRowRender: (record) => <p className='text-primary' style={{ margin: '0 0 0 5rem' }}><b>{record.lockUpPeriod}</b></p>,
                rowExpandable: (record) => record.lockUpPeriod, // have data
                defaultExpandAllRows: true
              }}
              dataSource={itemRoundSales}
              className='soon-table-round-sale'
              pagination={false}
              rowKey={(record) => record?.id}
            />
          </table>
        </div>
      </div>
    </div>
  ) : null

  const countDownHtml = <div className='mt-2'>
    <h1 id='headline' className='countdown'>Countdown to </h1>
    <div id='countdown'>
      <ul>
        <li className='countdown'><span id='days'></span>days</li>
        <li className='countdown'><span id='hours'></span>Hours</li>
        <li className='countdown'><span id='minutes'></span>Minutes</li>
        <li className='countdown'><span id='seconds'></span>Seconds</li>
      </ul>
    </div>
    <div id='content' className='emoji'>
      <span>🥳</span>
      <span>🎉</span>
      <span>🎂</span>
    </div>
  </div>
  const timeAndPercentProcess = <div className='row mb-3 d-flex'>
    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-center'>
      <i className='material-icons fs-18'>hourglass_top</i>
        Start time:&nbsp;<b className='text-primary'>{itemDetail?.startDate ? moment(convertStringDDMMYYYYToUnix(itemDetail?.startDate)).format(formatDateStyle) : txtTBA}</b>
    </div>
    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-center'>
      <i className='material-icons fs-18'>hourglass_bottom</i>
        End time&nbsp;&nbsp;:&nbsp;<b className='text-primary'>{itemDetail?.endDate ? moment(convertStringDDMMYYYYToUnix(itemDetail?.endDate)).format(formatDateStyle) : txtTBA}</b>
    </div>
    <div className='col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5'>
    </div>
    <div className='col-xl-7 col-lg-7 col-md-7 col-sm-7 col-7'>
      <hr className='hr-custome'></hr>
      { (itemDetail?.startDate && itemDetail?.endDate) ? getTimeRelativeQuantificationWithNowFromStartDateAndEndDate(itemDetail?.startDate, itemDetail?.endDate) : txtAbsentTakeUpData}
    </div>
    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
      {countDownHtml}
    </div>
  </div>

  const summary = (
    <div className='text-center'>
      <div className='row'>
        <div className='col-4'>
          <h3 className='m-b-0'>
            <Badge bg='warning' text='white'>{formatLargeNumberMoneyUSD(itemDetail?.fundRaisingGoals)}</Badge>
          </h3>
          <span className='text-etc-overflow'>{txtGoal}</span>
        </div>
        <div className='col-4'>
          <h3 className='m-b-0'>
            <Badge bg='warning' text='white'>{formatLargeNumberMoneyUSD(itemDetail?.tokenPrice) }</Badge>
          </h3>{' '}
          <span className='text-etc-overflow'>Price</span>
        </div>
        <div className='col-4'>
          <h3 className='m-b-0'>
            <Badge bg='warning' text='white'>{formatLargeNumber(itemDetail?.totalSupply)}</Badge>
          </h3>{' '}
          <span className='text-etc-overflow'>Supply</span>
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
  )

  const more =
      <div>
        <div className='card-header border-0 pb-0'>
          <h5 className='heading text-primary'>{itemDetail?.projectName} Information</h5>
        </div>
        <div className='card-body pt-3'>
          {/* exist alest 1 to display this component */}
          {itemDetail?.projectName && (itemDetail?.roundType || !_.isEmpty(itemDetail?.blockchain || itemDetail?.acceptCurrency || itemDetail?.type || (itemDetail?.totalIsScam || itemDetail?.totalIsScam === 0) || (itemDetail?.totalReviews || itemDetail?.totalReviews === 0)))
            ? <div className='profile-blog mb-4'>
              <Link to={'#'} >
                <h4>Short:</h4>
              </Link>
              {
                itemDetail?.type && <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                    {`${itemDetail?.projectName}'s token type: `}<span className='text-primary fs-16 text-capitalize'><b>{itemDetail?.type}</b></span>
                  </div>
                </div>
              }
              {
                itemDetail?.roundType && <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                    {`${itemDetail?.projectName}'s current round: `}<span className='text-primary fs-16 text-uppercase'><b>{itemDetail?.roundType}</b></span>
                  </div>
                </div>
              }
              {
                itemDetail?.acceptCurrency &&
              <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                  {`${itemDetail?.projectName} is exchanged in currencies: `}
                  {itemDetail?.acceptCurrency?.split(',')?.map((keyName, index) => (
                    <span className='text-primary fs-16 text-uppercase' key={index}>
                      <b>{keyName}</b>
                      {/* last element in array */}
                      {index >= (itemDetail?.acceptCurrency?.split(',')?.length - 1) ? '' : ','}
                    </span>
                  ))}
                </div>
              </div>
              }

              {
                !_.isEmpty(itemDetail?.blockchain) && <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                    {`${itemDetail?.projectName} lives on blockchains: `}
                    {Object.keys(itemDetail?.blockchain)?.map((keyName, index) => (
                      <span className='text-primary fs-16 text-capitalize' key={index}>
                        <b>{keyName}</b>
                        {/* last element in array */}
                        {index >= (Object.keys(itemDetail?.blockchain)?.length - 1) ? '' : ','}
                      </span>
                    ))}
                  </div>
                </div>
              }

              {
                // check like this cus && don't pass zero
                (itemDetail?.totalIsScam || itemDetail?.totalIsScam === 0) ? <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                    {itemDetail?.projectName} has <span className='text-danger fs-20'><b>{itemDetail?.totalIsScam}</b></span> scam reports
                  </div>
                </div> : ''
              }

              {
                // check like this cus && don't pass zero
                (itemDetail?.totalReviews || itemDetail?.totalReviews === 0) ? <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                    {itemDetail?.projectName} has <span className='text-primary fs-20'><b>{itemDetail?.totalReviews}</b></span> reviews
                  </div>
                </div> : ''
              }

            </div> : ''}

          <LaunchpadDetail projectName={itemDetail?.projectName} launchpadList={itemDetail?.launchPads}/>

          <div className='crypto-info'>
            <div className=''>
              <Link to={'#'} >
                <h4>Website:</h4>
              </Link>
              <div className='row mt-3'>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  {
                    itemDetail?.whitepaperUrl ? <div className='mb-0 btn btn-primary light btn-xs mb-2 me-1' onClick={() => window.open(itemDetail?.whitepaperUrl)}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                      Whitepaper&nbsp;
                        <LinkOutlined />
                      </div>
                    </div> : ''
                  }

                  {
                    itemDetail?.linkDemo ? <div className='mb-0 btn btn-primary light btn-xs mb-2 me-1' onClick={() => window.open(itemDetail?.linkDemo)}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                      Link&nbsp;Demo&nbsp;
                        <LinkOutlined />
                      </div>
                    </div> : ''
                  }

                  {
                    itemDetail?.socials && !_.isEmpty(itemDetail?.socials)
                      ? <Dropdown style={{ display: 'inline-block' }}>
                        <Dropdown.Toggle variant='primary' className='mb-0 btn btn-primary light btn-xs mb-2 me-1'>
                            Socials
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='cus-dropdown-menu'>
                          {
                            Object.keys(itemDetail?.socials)?.map((keyName, index) => (
                              <Dropdown.Item onClick={() => window.open(itemDetail?.socials[keyName])} key={index}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  {toCammelCase(keyName)}
                                  &nbsp;
                                  <LinkOutlined />
                                </div>
                              </Dropdown.Item>
                            ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                      : ''
                  }
                  {
                    itemDetail?.additionalLinks && !_.isEmpty(itemDetail?.additionalLinks)
                      ? <Dropdown style={{ display: 'inline-block' }}>
                        <Dropdown.Toggle variant='primary' className='mb-0 btn btn-primary light btn-xs mb-2 me-1'>
                          Additional Links
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='cus-dropdown-menu'>
                          {
                            Object.keys(itemDetail?.additionalLinks)?.map((keyName, index) => (
                              <Dropdown.Item onClick={() => window.open(itemDetail?.additionalLinks[keyName])} key={index}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  {toCammelCase(keyName)}
                                  &nbsp;
                                  <LinkOutlined />
                                </div>
                              </Dropdown.Item>
                            ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                      : ''
                  }

                  {
                    itemDetail?.sourceCode && !_.isEmpty(itemDetail?.sourceCode)
                      ? <Dropdown style={{ display: 'inline-block' }}>
                        <Dropdown.Toggle variant='primary' className='mb-0 btn btn-primary light btn-xs mb-2 me-1'>
                        Source Code
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='cus-dropdown-menu'>
                          {
                            Object.keys(itemDetail?.sourceCode)?.map((keyName, index) => (
                              <Dropdown.Item onClick={() => window.open(itemDetail?.sourceCode[keyName])} key={index}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  {toCammelCase(keyName)}
                                  &nbsp;
                                  <LinkOutlined />
                                </div>
                              </Dropdown.Item>
                            ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                      : ''
                  }

                </div>
              </div>
            </div>
          </div>

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

        </div>
      </div>

  // wait load finish modal, avoid excpetion
  const description = itemDetail?.fullDesc || itemDetail?.shortDesc ? (
    <div>
      <div className='card-header border-0 pb-0'>
        <h5 className='heading text-primary'>About {itemDetail?.projectName}</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          <p className='mb-0'>
            <Description text={itemDetail?.fullDesc || itemDetail?.shortDesc} />
          </p>
        </div>
      </div>
    </div>
  ) : ''

  const about = itemDetail?.media && !_.isEmpty(itemDetail?.media)
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
      timeAndPercentProcess={timeAndPercentProcess}
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
