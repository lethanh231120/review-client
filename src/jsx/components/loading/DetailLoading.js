import React from 'react'
import './detailLoading.scss'
import { Skeleton, Space } from 'antd'

const DetailLoading = () => {
  return (
    <div className='not-found detail-loading-container'>
      <Space>
        <Skeleton.Image active={true} />
        <Skeleton.Button
          active={true}
          size={'large'}
          shape={'round'}
          block={true}
        />
        <Skeleton.Button
          active={true}
          size={'large'}
          shape={'round'}
          block={true}
        />
        <Skeleton.Button
          active={true}
          size={'large'}
          shape={'round'}
          block={true}
        />
        <Skeleton.Button
          active={true}
          size={'large'}
          shape={'round'}
          block={true}
        />
        <Skeleton.Button
          active={true}
          size={'large'}
          shape={'round'}
          block={true}
        />
      </Space>
      <br />
      <br />
      <Skeleton active title={true} round paragraph={{ rows: 30 }} />
    </div>
  )
}

export default DetailLoading
