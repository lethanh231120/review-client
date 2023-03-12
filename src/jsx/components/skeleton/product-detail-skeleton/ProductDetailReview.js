import React from 'react'
import { List, Skeleton } from 'antd'

const ProductDetailReview = () => {
  const listData = Array.from({
    length: 3
  }).map((_, i) => ({
    title: `ant design part ${i + 1}`
  }))
  return (
    <List
      itemLayout='vertical'
      size='large'
      dataSource={listData}
      renderItem={(item) => (
        <List.Item key={item.title}>
          <Skeleton loading={true} active avatar></Skeleton>
        </List.Item>
      )}
    />
  )
}

export default ProductDetailReview
