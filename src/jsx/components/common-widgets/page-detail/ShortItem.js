import React from 'react'

const defaultIcon = <i className='material-icons fs-18 text-primary'>keyboard_arrow_right</i>

const ShortItem = ({ title, content, icon = defaultIcon }) => {
  return <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
    {/* return <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' style={{ marginLeft: '1.5rem', width: '96%' }}> */}
    <div className='form-check custom-checkbox checkbox-succes' style={{ padding: '0', display: 'flex', alignItems: 'center' }}>
      {icon}
      {title}
    </div>
    {/* <div style={{ marginLeft: '1.5rem' }}>
      <span className='text-primary fs-16 text-capitalize'>
        <b>
          {content}
        </b>
      </span>
    </div> */}
  </div>
}

export default ShortItem
