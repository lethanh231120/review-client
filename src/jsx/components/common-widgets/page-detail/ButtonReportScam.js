import React from 'react'
import { Button } from 'react-bootstrap'
import { WARNING_ICON } from '../logo/logo'

export const ButtonReportScam = ({ handleReportScam }) => {
  return <Button
    className='mb-1 me-1'
    variant='danger'
    onClick={handleReportScam}
  >
    <span className='d-flex'>
      {WARNING_ICON('#fff', '18px')}
    &nbsp;
    Report&nbsp;Scam
    </span>
  </Button>
}
