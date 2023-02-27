import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatLargeNumberMoneyUSD } from '../../../../utils/formatNumber'
import { Link } from 'react-router-dom'
import { PREFIX_DETAIL, SOON } from '../../../constants/category'
import NoImage from '../../common-widgets/no-image/NoImage'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import { Avatar, Col, Row, Tooltip } from 'antd'
import LaunchpadIconList from '../../common-widgets/page-soon/LaunchpadIconList'
import {
  isValidProductId,
  formatImgUrlFromProductId
} from '../../../../utils/formatText'
import imgAbsentImageSoon from '../../../../images/absent_image_soon.png'
import {
  convertStringDDMMYYYYToUnix,
  formatDateStyle,
  getStatusBackgroundFromSoonStatus,
  getStatusFromStartDateAndEndDate,
  getTimeRelativeQuantificationWithNowFromStartDateAndEndDate,
  txtTBA
} from '../../product-detail/soon-info/SoonInfo'
import moment from 'moment'
import CategorySearch from './../../input-search/CategorySearch'

const absentData = '__'
const Soon = ({ listProduct, handleFilter, total }) => {
  return (
    <>
      <div className='card Infra' style={{ height: 'auto', width: '100%', margin: '0 1.7rem 0 0.3rem' }}>
        <div className='card-header border-0' style={{ padding: '1.5rem 1.875rem 0 1.25rem' }}>
          <div style={{ fontSize: '1rem', padding: '0 0 1rem 0' }}>
            A total of&nbsp;<b>{total}</b>&nbsp;Upcoming Projects found.
          </div>
        </div>
        <div className='card-body' style={{ padding: '0 1rem' }}>
          <Row>
            <Col md={{ span: 18 }} sm={{ span: 17 }} xs={{ span: 17 }}>
              <CategorySearch type={SOON} />
            </Col>
            <Col md={{ span: 6 }} sm={{ span: 7 }} xs={{ span: 7 }}>
              <DrawerFilter type={SOON} handleFilter={handleFilter} />
            </Col>
          </Row>
        </div>
      </div>

      <div className='row' style={{ width: '100%' }}>
        <div className='col-xl-12'>
          <div className='row'>
            <div className='col-xl-12'>
              <ul
                // layout
                id='masonry'
                className='row'
                // transition={{ duration: 0.3 }}
              >
                <AnimatePresence>
                  {listProduct?.map((item, index) => {
                    return (
                      <motion.li
                        layout
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className='col-xl-3 col-md-6 infra rated px-3'
                        key={index}
                        // transition={{ duration: 0.5 }}
                      >
                        <Link
                          to={`../../../${PREFIX_DETAIL}/${SOON}/${
                            item?.projectId?.split('_')[2]
                          }`}
                        >
                          <div className='card pull-up'>
                            <div className='card-body align-items-center flex-wrap'>
                              <div className='d-flex align-items-center mb-4'>
                                <div>
                                  {item?.projectId ? (
                                    <Avatar
                                      src={
                                        isValidProductId(item?.projectId)
                                          ? formatImgUrlFromProductId(
                                            item?.projectId
                                          )
                                          : imgAbsentImageSoon
                                      }
                                      preview={false}
                                      size={40}
                                    />
                                  ) : (
                                    <NoImage
                                      alt={item?.projectName?.slice(0, 3)}
                                      height={36}
                                      width={36}
                                    />
                                  )}
                                </div>
                                <Tooltip
                                  title={
                                    <p>{`${item?.projectName} - ${
                                      item?.projectSymbol
                                        ? item?.projectSymbol
                                        : absentData
                                    }`}</p>
                                  }
                                  placement='top'
                                >
                                  <div
                                    className='ms-4 text-etc-overflow'
                                    style={{ width: '100%' }}
                                  >
                                    <h4 className='heading mb-0 text-etc-overflow'>
                                      {item?.projectName}
                                    </h4>
                                    <span className='text-etc-overflow'>
                                      {item?.projectSymbol
                                        ? item?.projectSymbol
                                        : absentData}
                                    </span>
                                  </div>
                                </Tooltip>
                              </div>
                              <div className='row'>
                                <p className='mb-0 fs-14 text-black text-center text-etc-overflow'>
                                  {item?.startDate && item?.endDate ? (
                                    <span
                                      className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(
                                        getStatusFromStartDateAndEndDate(
                                          item?.startDate,
                                          item?.endDate
                                        )
                                      )}`}
                                    >
                                      {getStatusFromStartDateAndEndDate(
                                        item?.startDate,
                                        item?.endDate
                                      )?.toUpperCase()}
                                    </span>
                                  ) : (
                                    <span
                                      className={`badge badge-rounded badge-light`}
                                    >
                                      UNKNOWN
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className='row'>
                                <p className='mb-0 fs-14 text-black text-center text-etc-overflow'>
                                  {item?.startDate && item?.endDate ? (
                                    getTimeRelativeQuantificationWithNowFromStartDateAndEndDate(
                                      item?.startDate,
                                      item?.endDate
                                    )
                                  ) : (
                                    // same height with ...ago/ left
                                    <span className='fs-20'>&nbsp;</span>
                                  )}
                                </p>
                              </div>
                              <div className='row'>
                                <p className='mb-0 fs-14 text-success text-center text-etc-overflow'>
                                  {formatLargeNumberMoneyUSD(
                                    item?.fundRaisingGoals
                                  )}{' '}
                                  raised
                                </p>
                              </div>
                              <div className='d-flex align-items-center justify-content-between'>
                                <div>
                                  <p className='mb-0 fs-14 text-black text-etc-overflow'>
                                    {item?.roundType ? (
                                      item?.roundType
                                    ) : (
                                      <>&nbsp;</>
                                    )}{' '}
                                    {item?.launchPads ? 'on' : ''}
                                  </p>
                                  <span className='fs-12'>
                                    <LaunchpadIconList
                                      listLaunchpad={item?.launchPads}
                                    />
                                  </span>
                                </div>
                                <Tooltip
                                  title={
                                    <>
                                      Start:{' '}
                                      {item?.startDate
                                        ? moment(
                                          convertStringDDMMYYYYToUnix(
                                            item?.startDate
                                          )
                                        ).format(formatDateStyle)
                                        : txtTBA}
                                      <br />
                                      End&nbsp;&nbsp;:{' '}
                                      {item?.startDate
                                        ? moment(
                                          convertStringDDMMYYYYToUnix(
                                            item?.endDate
                                          )
                                        ).format(formatDateStyle)
                                        : txtTBA}
                                    </>
                                  }
                                  placement='bottom'
                                >
                                  <div className='text-etc-overflow'>
                                    <p className='mb-0 fs-12 text-etc-overflow'>
                                      Start:{' '}
                                      {item?.startDate
                                        ? moment(
                                          convertStringDDMMYYYYToUnix(
                                            item?.startDate
                                          )
                                        ).format(formatDateStyle)
                                        : txtTBA}
                                    </p>
                                    <span className='fs-12 text-etc-overflow'>
                                      End&nbsp;&nbsp;:{' '}
                                      {item?.startDate
                                        ? moment(
                                          convertStringDDMMYYYYToUnix(
                                            item?.endDate
                                          )
                                        ).format(formatDateStyle)
                                        : txtTBA}
                                    </span>
                                  </div>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.li>
                    )
                  })}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Soon
