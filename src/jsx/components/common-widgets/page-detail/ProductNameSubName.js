import React from 'react'

export const ProductNameSubName = ({ projectName, projectSubName }) => {
  return <div className='profile-name cus-soon-name'>
    <h4 className='text-primary mb-0'>{projectName}</h4>
    <div style={{ paddingTop: '0.1rem' }} >
      {projectSubName}
    </div>
  </div>
}
