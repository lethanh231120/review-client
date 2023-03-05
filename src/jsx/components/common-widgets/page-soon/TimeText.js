import React from 'react'
import moment from 'moment'
import { convertStringDDMMYYYYToUnix, formatDateStyle } from '../../../../utils/time/time'
import { txtTBA } from '../../../constants/page-soon'

export const typeStart = 'hourglass_top'
export const typeEnd = 'hourglass_bottom'

const TimeText = ({ icon, date }) => {
  return <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-center justify-content-center'>
    <i className='material-icons fs-18 text-primary'>{icon}</i>
    Start time:&nbsp;<b className='text-primary'>{date ? moment(convertStringDDMMYYYYToUnix(date)).format(formatDateStyle) : txtTBA}</b>
  </div>
}

export default TimeText
