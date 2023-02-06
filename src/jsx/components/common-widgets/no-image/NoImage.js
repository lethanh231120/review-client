import React from 'react'

const NoImage = ({ alt, height, width }) => {
  return (
    <span className='image-list-no-data' style={{ height: `${height}px`, width: `${width}px` }}>
      {alt}
    </span>
  )
}

export default NoImage
