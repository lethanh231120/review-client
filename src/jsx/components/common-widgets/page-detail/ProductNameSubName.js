import React from 'react'

export const ProductNameSubName = ({ projectName, projectSubName, isSoonProject = false }) => {
  if (isSoonProject) {
    return <div className='profile-name cus-soon-name mb-0' style={{ minWidth: '45%' }}>
      <h1 className='text-primary mb-0 fs-20'>{projectName}
        <p style={{ color: '#A098AE', fontWeight: '400' }} className='fs-16' >
          {projectSubName}
        </p>
      </h1>
    </div>
  }
  return <div className='profile-name cus-soon-name mb-0' style={{ minWidth: '45%' }}>
    <div className='text-primary mb-0 fs-20'>{projectName}</div>
    <div style={{ color: '#A098AE', fontWeight: '400' }} className='fs-16' >
      {projectSubName}
    </div>
  </div>
}
