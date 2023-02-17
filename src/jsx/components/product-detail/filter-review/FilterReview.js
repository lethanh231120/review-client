import React from 'react'
import './filterReview.scss'
import { Dropdown } from 'react-bootstrap'

const FilterReview = (props) => {
  const { setDefaultFilter, defaultFilter, numberReviews } = props
  const DEFAULT_ALL = 'all'
  const DEFAULT_SCAM = 'scam'
  const DEFAULT_NOT_SCAM = 'notScam'

  return (
    <div className='list-review'>
      <div className='list-review-header'>
        <div className='list-review-header-title'>Reviews ({numberReviews})</div>
        <div className='list-review-header-right'>
          <Dropdown>
            <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
              {defaultFilter?.orderBy === 'createdDate' ? 'All Review'
                : defaultFilter?.orderBy === 'totalReply' ? 'Most Relevant'
                  : defaultFilter?.isScam ? 'Report Scam' : 'Not Scam'}
            </Dropdown.Toggle>
            <Dropdown.Menu className='list-review-header-popover'>
              <Dropdown.Item
                className={`${defaultFilter === DEFAULT_ALL ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
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
                className={`${defaultFilter === DEFAULT_NOT_SCAM ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
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
                className={`${defaultFilter === DEFAULT_SCAM ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
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
                className={`${defaultFilter === DEFAULT_SCAM ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
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
