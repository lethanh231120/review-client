import React from 'react'

export const ProductNameSubName = ({ projectName, projectSubName }) => {
  return <h1 className='profile-name cus-soon-name mb-0'>
    <div className='text-primary mb-0 fs-20'>{projectName}</div>
    <div style={{ color: '#A098AE', fontWeight: '400' }} className='fs-16' >
      {projectSubName}
    </div>
  </h1>
}
