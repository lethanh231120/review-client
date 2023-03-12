import React from 'react'
import { DotChartOutlined } from '@ant-design/icons'
import { Skeleton } from 'antd'

const ProductDetailChart = () => {
  return (
    <div className='empty-skeleton'>
      <Skeleton.Node active={true} style={{ width: '100% !important' }}>
        <DotChartOutlined style={{ fontSize: 260, color: '#bfbfbf' }} />
      </Skeleton.Node>
    </div>
  )
}

export default ProductDetailChart
