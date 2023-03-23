import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatLargeNumberMoneyUSD } from '../../../../utils/formatNumber'
import { Link } from 'react-router-dom'
import { PREFIX_DETAIL, SOON } from '../../../constants/category'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import { Col, Row, Tooltip } from 'antd'
import LaunchpadIconList from '../../common-widgets/page-soon/LaunchpadIconList'
import moment from 'moment'
import CategorySearch from './../../input-search/CategorySearch'
import { Badge } from 'react-bootstrap'
import { txtGoal, txtTBA } from '../../../constants/page-soon'
import { txtAbsentTakeUpData } from '../../../constants/data'
import { convertStringDDMMYYYYToUnix, formatDateStyle } from '../../../../utils/time/time'
import { getStatusBackgroundFromSoonStatus, getStatusFromStartDateAndEndDate } from '../../../../utils/page-soon/status'
import { TimeRelativeQuantificationList } from '../../common-widgets/page-soon/TimeRelativeQuantificationList'
import { iconGoal } from './../../common-widgets/page-detail/SummaryDetail'
import ProductImage, { altSoon, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'

const absentData = '__'
const Soon = ({ listProduct, handleFilter, total }) => {
  return (
    <div className='font-family' style={{ width: '100%' }}>
      <div className='card Infra' style={{ height: 'auto', margin: '0 0.35rem 0 0.3rem' }}>
        <div className='card-header border-0' style={{ padding: '1.5rem 1.875rem 0 1.25rem' }}>
          <div style={{ fontSize: '1rem', padding: '0 0 1rem 0', color: 'black' }}>
            A total of&nbsp;<Badge bg='primary' className='progress-bar-striped progress-bar-animated'>{total}</Badge>&nbsp;ICOs/ IDOs/ IEOs found.
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

      <div className='row' style={{ marginTop: '1.2rem' }}>
        <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
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
                              <ProductImage
                                imageUrl={item?.smallLogo}
                                productName={item?.projectSymbol || item?.projectName}
                                altImageType={altSoon}
                                size={sizeImg48}
                              />
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
                                className='ms-2 text-etc-overflow'
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
                            <div className='mb-0 fs-14 text-black text-etc-overflow text-center'>
                              {item?.startDate && item?.endDate ? (
                                <>
                                  {<TimeRelativeQuantificationList startDate={item?.startDate} endDate={item?.endDate}/>}
                                </>
                              ) : (
                                // same height with ...ago/ left
                                <span>&nbsp;</span>
                              )}
                            </div>
                            <hr className='hr-custome'></hr>
                          </div>
                          <div className='row'>
                            {
                              item?.fundRaisingGoals
                                ? <p className='mb-0 fs-14 text-success text-center text-etc-overflow d-flex align-items-center justify-content-center'>
                                  <i className='material-icons fs-18'>{iconGoal}</i>
                                  &nbsp;
                                  {txtGoal}:&nbsp;{formatLargeNumberMoneyUSD(
                                    item?.fundRaisingGoals
                                  )}
                                </p>
                                : txtAbsentTakeUpData
                            }
                          </div>
                          <div className='d-flex align-items-center justify-content-between'>
                            <div>
                              <p className='mb-0 fs-14 text-black text-etc-overflow'>
                                {item?.roundType ? (
                                  <b>
                                    {item?.roundType}
                                  </b>
                                ) : (
                                  txtAbsentTakeUpData
                                )}
                              </p>
                              <span className='fs-12 d-flex align-items-center'>
                                {item?.launchPads ? <>on&nbsp;</> : ''}
                                <LaunchpadIconList
                                  listLaunchpad={item?.launchPads}
                                />
                              </span>
                            </div>
                            &nbsp;&nbsp;
                            <Tooltip
                              title={
                                <>
                                      Start time:{' '}
                                  {item?.startDate
                                    ? moment(
                                      convertStringDDMMYYYYToUnix(
                                        item?.startDate
                                      )
                                    ).format(formatDateStyle)
                                    : txtTBA}
                                  <br />
                                      End time&nbsp;&nbsp;:{' '}
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
                                <div className='mb-0 fs-12 d-flex align-items-center'>
                                  <i className='material-icons fs-18 text-primary'>hourglass_top</i>:
                                  <span className='text-etc-overflow'>
                                    &nbsp;
                                    {item?.startDate
                                      ? moment(
                                        convertStringDDMMYYYYToUnix(
                                          item?.startDate
                                        )
                                      ).format(formatDateStyle)
                                      : txtTBA}
                                  </span>
                                </div>
                                <span className='fs-12 text-etc-overflow d-flex align-items-center'>
                                  <i className='material-icons fs-18 text-primary'>hourglass_bottom</i>:
                                  <span className='text-etc-overflow'>
                                  &nbsp;
                                    {item?.startDate
                                      ? moment(
                                        convertStringDDMMYYYYToUnix(
                                          item?.endDate
                                        )
                                      ).format(formatDateStyle)
                                      : txtTBA}
                                  </span>
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
  )
}
export default Soon
