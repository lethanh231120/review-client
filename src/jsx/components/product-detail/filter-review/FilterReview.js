import React, { useState, useEffect } from 'react'
import './filterReview.scss'
import { Dropdown } from 'react-bootstrap'

const FilterReview = (props) => {
  const { setDefaultFilter, defaultFilter, numberReviews, setLoadingFilter, productInfo } = props
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

  const product = productInfo?.details
  return (
    <div className='list-review'>
      <div className='list-review-header'>
        <div className='text-primary list-review-header-title'>
          {defaultText === 'All Review' ? <h2 className='mb-0 text-primary fs-20' style={{ display: 'inline' }}>{product?.dAppName || product?.name} Reviews</h2> : <span style={{ color: defaultText === 'Report Scam' ? 'red' : '' }}>{defaultText}</span>}
          <span style={{ color: defaultText === 'Report Scam' ? 'red' : '' }}>({new Intl.NumberFormat().format(numberReviews || 0)})</span>
        </div>
        <div className='list-review-header-right'>
          <Dropdown>
            <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
              {defaultText}
            </Dropdown.Toggle>
            <Dropdown.Menu className='list-review-header-popover'>
              <Dropdown.Item
                className={`${defaultText === ALL_REVIEW ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => {
                  setLoadingFilter(true)
                  setDefaultFilter({
                    page: defaultFilter?.page,
                    productId: defaultFilter?.productId,
                    orderBy: 'createdDate'
                  })
                }}
              >
                <div className='list-review-header-popover-title'>All Review ({new Intl.NumberFormat().format(productInfo?.details?.totalReviews || 0)})</div>
              </Dropdown.Item>
              <Dropdown.Item
                className={`${defaultText === MOST_RELEVANT ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => {
                  setLoadingFilter(true)
                  setDefaultFilter({
                    page: defaultFilter?.page,
                    productId: defaultFilter?.productId,
                    orderBy: 'totalReply'
                  })
                }}
              >
                <div className='list-review-header-popover-title'>Most Relevant ({new Intl.NumberFormat().format(productInfo?.details?.totalReviews || 0)})</div>
              </Dropdown.Item>
              <Dropdown.Item
                className={`${defaultText === REPORT_SCAM ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => {
                  setLoadingFilter(true)
                  setDefaultFilter({
                    page: defaultFilter?.page,
                    productId: defaultFilter?.productId,
                    orderBy: 'createdDate',
                    isScam: true
                  })
                }}
                style={{ color: 'red' }}
              >
                <div className='list-review-header-popover-title'>Report Scam ({new Intl.NumberFormat().format(productInfo?.details?.totalIsScam || 0)})</div>
              </Dropdown.Item>
              <Dropdown.Item
                className={`${defaultText === NOT_SCAM ? 'active' : ''} list-review-header-popover-item cus-dropdown-item`}
                onClick={() => {
                  setLoadingFilter(true)
                  setDefaultFilter({
                    page: defaultFilter?.page,
                    productId: defaultFilter?.productId,
                    orderBy: 'createdDate',
                    isScam: false
                  })
                }}
              >
                <div className='list-review-header-popover-title'>
                  Not Scam
                  ({new Intl.NumberFormat().format(productInfo?.details?.totalReviews - productInfo?.details?.totalIsScam || 0)})
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default FilterReview
