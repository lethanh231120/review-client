import React from 'react'

const InformationHeader = ({ projectName }) => {
  return <div className='card-header border-0 pb-0'>
    <h5 className='heading text-primary d-flex align-items-start'>
      <i className='material-icons fs-30 text-primary'>info</i>
    &nbsp;
      {projectName} Information
    </h5>
  </div>
}

export default InformationHeader
