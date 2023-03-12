import React from 'react'
import { Skeleton } from 'antd'

const SekeletonSummaryItem = () => {
  return (
    <div className='col-xl-3 col-sm-6'>
      <div className='widget-stat card cus-summary-card' style={{ marginBottom: '0', marginTop: '1.5rem' }}>
        <div className='card-body p-3'>
          <div className='media'>
            <span className={`summary-icon`}>
              <Skeleton.Avatar active={true} size={50} shape='circle' />
            </span>
            <div className='media-body' >
              <div className='mb-0'>
                <Skeleton.Input
                  active={true}
                  style={{
                    height: '15px',
                    lineHeight: '15px',
                    minWidth: '75px',
                    width: '75px',
                    borderRadius: '2rem'
                  }}
                />
              </div>
              <div className='mb-0'>
                <Skeleton.Input
                  active={true}
                  style={{
                    height: '15px',
                    lineHeight: '15px',
                    minWidth: '55px',
                    width: '55px',
                    borderRadius: '2rem'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SekeletonSummaryItem
