import React from 'react'

export const typeReview = 'reviews'
export const typeScamReport = 'scam reports'

const ShortItemScamWarning = ({ type, projectName, total }) => {
  return <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' style={{ marginLeft: '1.5rem' }}>
    <div className='form-check custom-checkbox mb-3 checkbox-success d-flex align-items-center' style={{ padding: '0' }}>
      <i className='material-icons fs-18 text-primary'>keyboard_arrow_right</i>
      {projectName} has&nbsp;<span className={`text-${type === typeScamReport ? 'danger' : type === typeReview ? 'primary' : ''} fs-20`}><b>
        {total}
        {/* {itemDetail?.totalIsScam} */}
      </b></span>&nbsp;{type}
    </div>
  </div>
}
export default ShortItemScamWarning
