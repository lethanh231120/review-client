import React from 'react'
import { Badge } from 'react-bootstrap'

export const iconSold = 'shopping_cart'
export const iconPayments = 'payments'
export const iconSupply = 'forklift'

export const SummaryDetail = ({ number, icon, text }) => {
  return <>
    <h3 className='m-b-0'>
      <Badge bg='warning' text='white' className='progress-bar-striped progress-bar-animated'>{number}</Badge>
    </h3>
    <span className='text-etc-overflow d-flex align-items-center justify-content-center'>
      <i className='material-icons fs-18 text-primary'>{icon}</i>
      {text}
    </span>
  </>
}
