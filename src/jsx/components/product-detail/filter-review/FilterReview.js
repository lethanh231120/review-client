import React from 'react'
import './filterReview.scss'
// import { Popover } from 'antd'
// import { CaretDownOutlined } from '@ant-design/icons'
import { Dropdown } from 'react-bootstrap'

const FilterReview = (props) => {
  const { setDefaultFilter, defaultFilter, numberReviews } = props
  const DEFAULT_ALL = 'all'
  const DEFAULT_SCAM = 'scam'
  const DEFAULT_NOT_SCAM = 'notScam'

  const handleFilter = (type) => {
    setDefaultFilter(type)
  }

  return (
    <div className='list-review'>
      <div className='list-review-header'>
        <div className='list-review-header-title'>Reviews ({numberReviews})</div>
        <div className='list-review-header-right'>
          <Dropdown>
            <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
              {defaultFilter === DEFAULT_ALL ? 'All Review' : defaultFilter === DEFAULT_SCAM ? 'Report Scam' : 'Not Scam'}
            </Dropdown.Toggle>
            <Dropdown.Menu className='list-review-header-popover'>
              <Dropdown.Item
                className={`${defaultFilter === DEFAULT_ALL ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => handleFilter(DEFAULT_ALL)}
              >
                <div className='list-review-header-popover-title'>All Review</div>
                {/* <div className='list-review-header-popover-content'>
                  Show all reviews including possible spam. The latest reviews will show up first
                </div> */}
              </Dropdown.Item>
              <Dropdown.Item
                className={`${defaultFilter === DEFAULT_SCAM ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => handleFilter(DEFAULT_SCAM)}
                style={{ color: 'red' }}
              >
                <div className='list-review-header-popover-title'>Report Scam</div>
                {/* <div className='list-review-header-popover-content'>
                  Show all reviews reporting scam, The latest reviews will show up first
                </div> */}
              </Dropdown.Item>
              <Dropdown.Item
                className={`${defaultFilter === DEFAULT_NOT_SCAM ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => handleFilter(DEFAULT_NOT_SCAM)}
              >
                <div className='list-review-header-popover-title'>Not Scam</div>
                {/* <div className='list-review-header-popover-content'>
                  Show all non-scam project review. The latest reviews will show up first
                </div> */}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default FilterReview
