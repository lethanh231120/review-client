import React, { useState, useEffect, useMemo } from 'react'
//  import {Tab, Nav} from 'react-bootstrap';
import { AnimatePresence, motion } from 'framer-motion'
import MOCK_DATA from './MOCK_DATA_3.json'
import { formatLargeNumberMoneyUSD } from '../../../../utils/formatNumber'
import { Link } from 'react-router-dom'
import { PREFIX_DETAIL, SOON } from '../../../constants/category'

const Soon = () => {
  const data = useMemo(() => MOCK_DATA, [])

  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    fetchPopular()
  }, [])
  function fetchPopular() {
    setFiltered(data)
  }

  return (
    <>
      <div className='row'>
        {/* <div className='col-xl-12'>
          <div className='row text-total-soon-project justify-content-center'> A total of {filtered.length} Upcoming Projects found.</div>
        </div> */}
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
                  {filtered.map((item, index) => {
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
                        <Link to={`../../../${PREFIX_DETAIL}/${SOON}/${item?.projectId?.split('_')[2]}`}>
                          <div className='card pull-up' onClick={(item) => console.log(item) }>
                            <div className='card-body align-items-center flex-wrap'>
                              <div className='d-flex align-items-center mb-4'>
                                <div>
                                  <img src={item?.bigLogo} height={32} width={32}/>
                                </div>
                                <div className='ms-4'>
                                  <h4 className='heading mb-0'>{item?.projectName}</h4>
                                  <span>{item?.projectSymbol}</span>
                                </div>
                              </div>
                              <div className='d-flex align-items-center justify-content-between'>
                                <div>
                                  <p className='mb-0 fs-14 text-black'>
                                    {formatLargeNumberMoneyUSD(item?.fundRaisingGoals)} raising
                                  </p>
                                  <span className='fs-12'>{item?.type}</span>
                                </div>
                                <div>
                                  <p className='mb-0 fs-14 text-success'>
                                    {item?.status}
                                  </p>
                                  <span className='fs-12'>Start date: {item?.startDate ? item?.startDate : 'TBA'}</span>
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

