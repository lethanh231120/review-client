import React from 'react'
import { getStatusBackgroundFromSoonStatus } from '../../../../utils/page-soon/status'
import { txtAbsentTakeUpData } from '../../../constants/data'

export const SoonStatusLocation = ({ status, detail }) => {
  return <div className='profile-email px-2'>
    <p className='text-muted mb-0'>
      {
        detail?.startDate && detail?.endDate ? <span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(status)}`}>
          {status?.toUpperCase()}
        </span> : txtAbsentTakeUpData
      }
    </p>
    {detail?.countryOrigin &&
    <p style={{ display: 'flex' }}>
      <i className='material-icons text-primary' style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', marginRight: '0.1rem' }}>location_on</i>
      {detail?.countryOrigin}
    </p>
    }

  </div>
}
