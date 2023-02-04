import React, { useContext, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatLargeNumberMoneyUSD } from '../../../../utils/formatNumber'
import { Link } from 'react-router-dom'
import { PREFIX_DETAIL, SOON } from '../../../constants/category'
import NoImage from '../../common-widgets/no-image/NoImage'
import { LaunchpadContext } from '../../../index'
import DrawerFilter from '../../drawer-filter/DrawerFilter'
import { Col, Avatar, Tooltip } from 'antd'

const absentData = '__'
const Soon = ({ listProduct, handleFilter, total }) => {
  const launchpadContext = useContext(LaunchpadContext)
  const [launchpadMap, setLaunchpadMap] = useState()

  useEffect(() => {
    const launchpadMapLocal = new Map()
    launchpadContext.forEach((launchpad) => {
      console.log(launchpad, launchpadMapLocal)
      launchpadMapLocal.set(launchpad?.launchPadId, launchpad)
    })
    setLaunchpadMap(launchpadMapLocal)
  }, [])

  console.log(launchpadMap)

  return (
    <>
      <div className='row'>
        <div className='col-xl-12'>
          <div className='card Infra' style={{ height: '5rem' }} >
            <div className='card-header border-0'>
              <Col md={{ span: 12 }} sm={{ span: 14 }} xs={{ span: 24 }}>
                <div
                  className='site-filters clearfix center m-b40'
                  style={{ fontSize: '1rem', padding: '0 0 1rem 0' }}
                >
                  A total of {total} Upcoming Projects found.
                </div>
              </Col>
              <Col md={{ span: 12 }} sm={{ span: 10 }} xs={{ span: 24 }}>
                <DrawerFilter type={SOON} handleFilter={handleFilter} />
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
                  {listProduct.map((item, index) => {
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
                          <div
                            className='card pull-up'
                          >
                            <div className='card-body align-items-center flex-wrap' >
                              <div className='d-flex align-items-center mb-4'>
                                <div>
                                  {item?.bigLogo ? (
                                    <img
                                      src={item?.bigLogo}
                                      height={32}
                                      width={32}
                                    />
                                  ) : (
                                    <NoImage
                                      alt={item?.projectName?.slice(0, 3)}
                                    />
                                  )}
                                </div>
                                <div className='ms-4 soon-item-text-block' style={{ width: '100%' }}>
                                  <h4 className='heading mb-0 soon-item-text-block'>
                                    {item?.projectName}
                                  </h4>
                                  <span className='soon-item-text-block'>{item?.projectSymbol}</span>
                                </div>
                              </div>
                              <div className='row'>
                                <p className='mb-0 fs-14 text-black text-center soon-item-text-block'>
                                  {item?.subCategory ? item?.subCategory : absentData}
                                </p>
                              </div>
                              <div className='d-flex align-items-center justify-content-between'>
                                <div>
                                  <p className='mb-0 fs-14 text-black soon-item-text-block'>
                                    {item?.roundType}
                                  </p>
                                  <span className='fs-12'>
                                    <Avatar.Group
                                      maxCount={2}
                                      size={20}
                                      maxStyle={{
                                        color: '#fff',
                                        backgroundColor: '#039F7F',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      {item?.launchPads
                                        ? item?.launchPads?.map(
                                          (key, index) => (
                                            <>
                                              <Tooltip
                                                title={launchpadMap?.get(key)?.name}
                                              >
                                                <Avatar
                                                  size={20}
                                                  src={launchpadMap?.get(key)?.thumbLogo}
                                                  key={index}
                                                  className='soon-table-blockchain'
                                                  onClick={(e) => {
                                                    // e.stopPropagation();
                                                  }}
                                                />
                                              </Tooltip>
                                            </>
                                          )
                                        )
                                        : absentData}
                                    </Avatar.Group>
                                  </span>
                                </div>
                                <div>
                                  <p className='mb-0 fs-14 text-success soon-item-text-block'>
                                    {formatLargeNumberMoneyUSD(
                                      item?.fundRaisingGoals
                                    )}{' '}
                                    raised
                                  </p>
                                  <span className='fs-12 soon-item-text-block'>
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
