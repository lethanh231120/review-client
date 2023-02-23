import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatLargeNumberMoneyUSD } from '../../../../utils/formatNumber'
import { Link } from 'react-router-dom'
import { PREFIX_DETAIL, SOON } from '../../../constants/category'
import NoImage from '../../common-widgets/no-image/NoImage'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import { Avatar, Col } from 'antd'
import LaunchpadIconList from '../../common-widgets/page-soon/LaunchpadIconList'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageSoon from '../../../../images/absent_image_soon.png'
import { getStatusBackgroundFromSoonStatus, getStatusFromStartDateAndEndDate } from '../../product-detail/soon-info/SoonInfo'

const absentData = '__'
const Soon = ({ listProduct, handleFilter, total }) => {
  return (
    <>
      <div className='row' style={{ width: '100%' }}>
        <div className='col-xl-12'>
          <div className='card Infra' style={{ height: '5rem' }}>
            <div className='card-header border-0' style={{ display: 'flex', alignItems: 'start' }}
            >
              <Col md={{ span: 16 }} sm={{ span: 16 }} xs={{ span: 18 }}>
                <div
                  style={{ fontSize: '1rem', padding: '0 0 1rem 0' }}
                  // className='site-filters clearfix center m-b40 text-total-soon-project'
                >
                  A total of&nbsp;<b>{total}</b>&nbsp;Upcoming Projects found.
                </div>
              </Col>
              <Col md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 6 }}>
                <DrawerFilter type={SOON} handleFilter={handleFilter}/>
              </Col>
            </div>
          </div>
        </div>
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
                                    <Avatar src={isValidProductId(item?.projectId) ? formatImgUrlFromProductId(item?.projectId) : imgAbsentImageSoon} preview={false} size={40}/>
                                  )
                                    : (
                                      <NoImage
                                        alt={item?.projectName?.slice(0, 3)}
                                        height={36}
                                        width={36}
                                      />
                                    )}
                                </div>
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
                              </div>
                              <div className='row'>
                                <p className='mb-0 fs-14 text-black text-center text-etc-overflow'>
                                  {item?.startDate && item?.endDate
                                    ? <span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(getStatusFromStartDateAndEndDate(item?.startDate, item?.endDate))}`}>
                                      {getStatusFromStartDateAndEndDate(item?.startDate, item?.endDate)?.toUpperCase()}
                                    </span>
                                    : <span className={`badge badge-rounded badge-light`}>UNKNOWN</span>
                                  }

                                </p>
                              </div>
                              <div className='row'>
                                <p className='mb-0 fs-14 text-black text-center text-etc-overflow'>
                                  {item?.subCategory
                                    ? item?.subCategory
                                    : absentData}
                                </p>
                              </div>
                              <div className='d-flex align-items-center justify-content-between'>
                                <div>
                                  <p className='mb-0 fs-14 text-black text-etc-overflow'>
                                    {item?.roundType}
                                  </p>
                                  <span className='fs-12'>
                                    <LaunchpadIconList
                                      listLaunchpad={item?.launchPads}
                                    />
                                  </span>
                                </div>
                                <div>
                                  <p className='mb-0 fs-14 text-success text-etc-overflow'>
                                    {formatLargeNumberMoneyUSD(
                                      item?.fundRaisingGoals
                                    )}{' '}
                                    raised
                                  </p>
                                  <span className='fs-12 text-etc-overflow'>
                                    Start date:{' '}
                                    {item?.startDate ? item?.startDate : 'TBA'}
                                  </span>
                                </div>
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
