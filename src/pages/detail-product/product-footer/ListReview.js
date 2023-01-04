import React from 'react'
import './listReview.scss'
import { Popover } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'

const ListReview = ({ handleAddComment, setDefaultFilter, defaultFilter, productInfo }) => {
    const DEFAULT_ALL = 'all'
    const DEFAULT_SCAM = 'scam'
    const DEFAULT_NOT_SCAM = 'notScam'

    const handleFilter = (type) => {
        setDefaultFilter(type)
    }

    return (
        <div className='list-review'>
        <div className='list-review-header'>
            <div className='list-review-header-title'>Reviews ({productInfo?.reviews?.length ? productInfo?.reviews?.length : 0})</div>
            <div className='list-review-header-right'>
                <div
                    className='list-review-header-right-add'
                    onClick={() => handleAddComment(true)}
                >
                    Add Review
                </div>
                <Popover
                    placement="bottomRight"
                    overlayClassName='list-review-header-pop'
                    content={(<div className='list-review-header-popover'>
                        <div
                            className={`list-review-header-popover-item`}
                            onClick={() => handleFilter(DEFAULT_ALL)}
                        >
                            <div className='list-review-header-popover-title'>All Review</div>
                            <div className='list-review-header-popover-content'>
                                Show all reviews including possible spam. The latest reviews will show up first
                            </div>
                        </div>
                        <div
                            className={`${defaultFilter === DEFAULT_SCAM ? 'active' : ''} list-review-header-popover-item`}
                            onClick={() => handleFilter(DEFAULT_SCAM)}
                        >
                            <div className='list-review-header-popover-title'>Report Scam</div>
                            <div className='list-review-header-popover-content'>
                                Show all reviews reporting scam, The latest reviews will show up first
                            </div>
                        </div>
                        <div
                            className={`${defaultFilter === DEFAULT_NOT_SCAM ? 'active' : ''} list-review-header-popover-item`}
                            onClick={() => handleFilter(DEFAULT_NOT_SCAM)}
                        >
                            <div className='list-review-header-popover-title'>Not Scam</div>
                            <div className='list-review-header-popover-content'>
                                Show all non-scam project review. The latest reviews will show up first
                            </div>
                        </div>
                    </div>)}
                >
                    <div className='list-review-header-right-filter'>
                        {defaultFilter === DEFAULT_ALL ? 'All Review' : defaultFilter === DEFAULT_SCAM ? 'Report Scam' : 'Not Scam'}
                        <CaretDownOutlined />
                    </div>
                </Popover>
            </div>
        </div>
        </div>
    )
}

export default ListReview
