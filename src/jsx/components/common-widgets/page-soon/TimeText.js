import React from 'react'
import moment from 'moment'
import { convertStringDDMMYYYYToUnix, formatDateStyle } from '../../../../utils/time/time'
import { txtTBA } from '../../../constants/page-soon'

export const typeStart = 'hourglass_top'
export const typeEnd = 'hourglass_bottom'

const txtStart = 'Start time'
const textEnd = 'End time'

const TimeText = ({ icon, date }) => {
  let txtDisplay
  switch (icon) {
    case typeStart: {
      txtDisplay = txtStart
      break
    }
    case typeEnd: {
      txtDisplay = textEnd
      break
    }
  }
  return <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex align-items-center justify-content-center'>
    <i className='material-icons fs-18 text-primary'>{icon}</i>
    {txtDisplay}:&nbsp;<b className='text-primary'>{date ? moment(convertStringDDMMYYYYToUnix(date)).format(formatDateStyle) : txtTBA}</b>
  </div>
}

export default TimeText
