import React from 'react'
import { Alert } from 'react-bootstrap'

export const ProofTypes = {
  Error: 'error',
  Warning: 'warning'
}

const emojis = {
  warning: (
    <svg
      viewBox='0 0 24 24'
      width='24'
      height='24'
      stroke='currentColor'
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='me-2'
    >
      <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'></path>
      <line x1='12' y1='9' x2='12' y2='13'></line>
      <line x1='12' y1='17' x2='12.01' y2='17'></line>
    </svg>
  ),

  error: (
    <svg
      viewBox='0 0 24 24'
      width='24'
      height='24'
      stroke='currentColor'
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='me-2'
    >
      <polygon points='7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2'></polygon>
      <line x1='15' y1='9' x2='9' y2='15'></line>
      <line x1='9' y1='9' x2='15' y2='15'></line>
    </svg>
  )
}

const ScamWarningDetail = ({ isShow, scamWarningReason, proofType }) => {
  return (
    <div
      hidden={!isShow}
    >
      {proofType === ProofTypes.Error ? (
        <Alert variant='danger' dismissible show={true}>
          {emojis.error}
          <strong>Scam! </strong> {scamWarningReason}
        </Alert>
      ) : proofType === ProofTypes.Warning ? (
        <Alert variant='warning' dismissible show={true}>
          {emojis.warning}
          <strong>Warning! </strong> {scamWarningReason}
        </Alert>
      ) : (
        ''
      )}
    </div>
  )
}

export default ScamWarningDetail
