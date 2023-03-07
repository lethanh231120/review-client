import React from 'react'
import { Badge } from 'react-bootstrap'

export const iconSold = 'shopping_cart'
export const iconPayments = 'payments'
export const iconSupply = 'forklift'
export const iconReview = 'rate_review'
export const iconGoal = 'ads_click'
export const iconReportScam = 'warning'
export const iconScore = 'warning'

export const bgYellow = 'warning'
export const bgGreen = 'primary'
export const bgRed = 'danger'

export const SummaryDetail = ({ number, icon, text, backgroundColor }) => {
  return <>
    <h3 className='m-b-0'>
      <Badge bg={backgroundColor} text='white' className='progress-bar-striped progress-bar-animated'>{number}</Badge>
    </h3>
    <span className='text-etc-overflow d-flex align-items-center justify-content-center'>
      <i className='material-icons fs-18 text-primary'>{icon}</i>
      &nbsp;
      {text}
    </span>
  </>
}
