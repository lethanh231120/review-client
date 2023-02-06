import React, { Fragment, useState } from 'react'
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
import { Spin } from 'antd'
import NoImage from '../../common-widgets/no-image/NoImage'

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

const formatDateStyle = 'ddd, DD MMM YYYY' // Mon, 06 Feb 2023

const SoonInfo = ({ productInfo, ...rest }) => {
  const itemDetail = productInfo?.details
  const itemRoundSales = productInfo?.mores?.roundSale
  const [websiteLoading, setWebsiteLoading] = useState(false)

  const header = (
    <div className='profile-head'>
      <div className='profile-info'>
        <div className='profile-photo'>
          {itemDetail?.bigLogo ? (
            <img
              src={itemDetail?.bigLogo}
              height={64}
              width={64}
            />
          ) : (
            <NoImage
              alt={itemDetail?.projectName?.slice(0, 3)}
              height={64}
              width={64}
            />
          )}
        </div>
        <div className='profile-details'>
          <div className='profile-name px-3 pt-2'>
            <h4 className='text-primary mb-0'>{itemDetail?.projectName}</h4>
            <p>{itemDetail?.projectSymbol}</p>
          </div>
          <div className='profile-email px-2 pt-2'>
            <h4 className='text-muted mb-0'>
              <span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(itemDetail?.status)}`}>
                {itemDetail?.status?.toUpperCase()}
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
            Website
          </Button>
        </div>
      </div>
    </div>
  )

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
          as='a'
          href='#'
          className='btn btn-primary mb-1 ms-1'
        >
          Report Scam
        </Button>
      </div>
    </div>
  )

  const more = itemDetail
    ? (
      <div>
        <div className='card-header border-0 pb-0'>
          <h5 className='text-primary'>{itemDetail?.projectName} Information</h5>
        </div>
        <div className='card-body pt-3'>
          <div className='profile-blog mb-3'>
            <Link href='#'>
              <h4>Current Round:</h4>
            </Link>
            <p className='mb-0 highlight-tag'>
              {itemDetail?.roundType}
            </p>
          </div>
          <div className='profile-blog mb-3'>
            <Link href='#'>
              <h4>Tag(s):</h4>
            </Link>
            <p className='mb-0 highlight-tag'>
              {itemDetail?.subCategory}
            </p>
          </div>
          <div className='profile-blog mb-3'>
            <Link href='#'>
              <h4>Launchpad(s):</h4>
            </Link>
            <span className='mb-0'>
              <LaunchpadIconList listLaunchpad={itemDetail?.launchPads} />
            </span>
          </div>
          <div className='profile-blog mb-3'>
            <Link href='#'>
              <h4>Community:</h4>
            </Link>
            <p className='mb-0'>
              <div className='basic-dropdown'>
                <div className='basic-dropdown'>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                    Community
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='cus-dropdown-menu'>
                    {
                      Object.keys(itemDetail?.community)?.map((keyName, index) => (
                        <Dropdown.Item href={itemDetail?.community[keyName]} key={index}>{keyName}</Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </p>
          </div>

        </div>
      </div>
    ) : ''

  // wait load finish modal, avoid excpetion
  const description = itemDetail ? (
    <div>
      <div className='card-header border-0 pb-0'>
        <h5 className='text-primary'>About {itemDetail?.projectName}</h5>
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

  return (
    <DetailLayout
      header={header}
      roundSale={roundSale}
      summary={summary}
      more={more}
      portfolioOrChart={description}
      // report={<FormReport />}

      numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
      rest={rest}
    />
  )
}
export default SoonInfo
