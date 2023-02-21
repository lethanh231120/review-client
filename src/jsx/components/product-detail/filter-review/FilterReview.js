import React, { useState, useEffect } from 'react'
import './filterReview.scss'
import { Dropdown } from 'react-bootstrap'

const FilterReview = (props) => {
  const { setDefaultFilter, defaultFilter, numberReviews } = props
  const ALL_REVIEW = 'All Review'
  const MOST_RELEVANT = 'Most Relevant'
  const REPORT_SCAM = 'Report Scam'
  const NOT_SCAM = 'Not Scam'
  const [defaultText, setDefaultText] = useState()

  useEffect(() => {
    if (defaultFilter?.orderBy === 'createdDate') {
      if (defaultFilter?.isScam !== undefined) {
        if (defaultFilter?.isScam === true) {
          setDefaultText(REPORT_SCAM)
        } else {
          setDefaultText(NOT_SCAM)
        }
      } else {
        setDefaultText(ALL_REVIEW)
      }
    }
    if (defaultFilter?.orderBy === 'totalReply') {
      setDefaultText(MOST_RELEVANT)
    }
  }, [defaultFilter])

  return (
    <div className='list-review'>
      <div className='list-review-header'>
        <div className='list-review-header-title'>Reviews ({numberReviews})</div>
        <div className='list-review-header-right'>
          <Dropdown>
            <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
              {defaultText}
            </Dropdown.Toggle>
            <Dropdown.Menu className='list-review-header-popover'>
              <Dropdown.Item
                className={`${defaultText === ALL_REVIEW ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => {
                  setDefaultFilter({
                    page: defaultFilter?.page,
                    productId: defaultFilter?.productId,
                    orderBy: 'createdDate'
                  })
                }}
              >
                <div className='list-review-header-popover-title'>All Review</div>
              </Dropdown.Item>
              <Dropdown.Item
                className={`${defaultText === MOST_RELEVANT ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => {
                  setDefaultFilter({
                    page: defaultFilter?.page,
                    productId: defaultFilter?.productId,
                    orderBy: 'totalReply'
                  })
                }}
              >
                <div className='list-review-header-popover-title'>Most Relevant</div>
              </Dropdown.Item>
              <Dropdown.Item
                className={`${defaultText === REPORT_SCAM ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => {
                  setDefaultFilter({
                    page: defaultFilter?.page,
                    productId: defaultFilter?.productId,
                    orderBy: 'createdDate',
                    isScam: true
                  })
                }}
                style={{ color: 'red' }}
              >
                <div className='list-review-header-popover-title'>Report Scam</div>
              </Dropdown.Item>
              <Dropdown.Item
                className={`${defaultText === NOT_SCAM ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => {
                  setDefaultFilter({
                    page: defaultFilter?.page,
                    productId: defaultFilter?.productId,
                    orderBy: 'createdDate',
                    isScam: false
                  })
                }}
              >
                <div className='list-review-header-popover-title'>Not Scam</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default FilterReview
