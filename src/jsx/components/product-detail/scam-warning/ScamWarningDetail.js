import React from 'react'
import { Alert } from 'antd'

export const ProofTypes = {
  Error: 'error',
  Warning: 'warning'
}

const ScamWarningDetail = ({ isShow, scamWarningReason, proofType }) => {
  return (
    <div
      hidden={!isShow}
    >
      {proofType === ProofTypes.Error ? (
        <Alert
          message='Scam'
          description={scamWarningReason}
          type='error'
          showIcon
          className='detail-alert'
        />
      ) : proofType === ProofTypes.Warning ? (
        <Alert
          message='Warning'
          description={scamWarningReason}
          type='warning'
          showIcon
          className='detail-alert'
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default ScamWarningDetail
