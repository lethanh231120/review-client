import React from 'react'

const InformationHeader = ({ projectName }) => {
  return <div className='card-header border-0 pb-0'>
    <div className='heading text-primary d-flex align-items-center break-word'>
      <i className='material-icons fs-30 text-primary'>info</i>
    &nbsp;
      <h2 style={{ fontSize: '1.5rem' }} className='m-0'>
        {projectName} Information
      </h2>
    </div>
  </div>
}

export default InformationHeader
