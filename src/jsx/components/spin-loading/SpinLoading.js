import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const SpinLoading = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />
  return (
    <div className='not-found' style={{ width: '100%' }}>
      <Spin
        indicator={antIcon}
        style={{ width: '100%', height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center', color: 'green' }}
      />
    </div>
  )
}

export default SpinLoading
