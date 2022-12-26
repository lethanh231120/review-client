import React, { useState } from 'react'
import './listReview.scss'
import { Popover } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'

const ListReview = ({ setOpenComment, setDefaultFilter, defaultFilter }) => {
    const DEFAULT_ALL = 'all'
    const DEFAULT_SCAM = 'scam'
    const DEFAULT_NOT_SCAM = 'notScam'

    const handleFilter = (type) => {
        setDefaultFilter(type)
    }

    return (
        <div className='list-review'>
        <div className='list-review-header'>
            <div className='list-review-header-title'>Reviews (100)</div>
            <div className='list-review-header-right'>
                <div
                    className='list-review-header-right-add'
                    onClick={() => setOpenComment(true)}
                >
                    Add Comment
                </div>
                <Popover
                    placement="bottomRight"
                    overlayClassName='list-review-header-pop'
                    content={(<div className='list-review-header-popover'>
                        <div
                            className={`list-review-header-popover-item`}
                            onClick={() => handleFilter(DEFAULT_ALL)}
                        >
                            <div className='list-review-header-popover-title'>All Comment</div>
                            <div className='list-review-header-popover-content'>
                                Show all comments including possible spam. The latest comments will show up first
                            </div>
                        </div>
                        <div
                            className={`${defaultFilter === DEFAULT_SCAM ? 'active' : ''} list-review-header-popover-item`}
                            onClick={() => handleFilter(DEFAULT_SCAM)}
                        >
                            <div className='list-review-header-popover-title'>Report Scam</div>
                            <div className='list-review-header-popover-content'>
                                Show all comments reporting scam, newest comments will show first
                            </div>
                        </div>
                        <div
                            className={`${defaultFilter === DEFAULT_NOT_SCAM ? 'active' : ''} list-review-header-popover-item`}
                            onClick={() => handleFilter(DEFAULT_NOT_SCAM)}
                        >
                            <div className='list-review-header-popover-title'>Not Scam</div>
                            <div className='list-review-header-popover-content'>
                                Show all non-scam project review comments. Latest comment will be displayed first
                            </div>
                        </div>
                    </div>)}
                    // trigger="click"
                >
                    <div className='list-review-header-right-filter'>
                        {defaultFilter === DEFAULT_ALL ? 'All Comment' : defaultFilter === DEFAULT_SCAM ? 'Report Scam' : 'Not Scam'}
                        <CaretDownOutlined />
                    </div>
                </Popover>
            </div>
        </div>
        </div>
    )
}

export default ListReview
