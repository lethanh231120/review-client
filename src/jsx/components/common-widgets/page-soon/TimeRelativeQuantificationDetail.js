import React from 'react'
import { convertStringDDMMYYYYToUnix, getCurrentTimeUnix, getRelativeHumanTime } from '../../../../utils/time/time'
import { classTxtOngoing, classTxtPast, classTxtUpcoming } from '../../../constants/page-soon'

const TimeRelativeQuantificationDetail = ({ startDate, endDate }) => {
  const myCurrentDateTimeUnix = getCurrentTimeUnix()

  // string "15-05-2018" to date unix time
  const startDateUnix = convertStringDDMMYYYYToUnix(startDate)

  const endDateUnix = convertStringDDMMYYYYToUnix(endDate, true)

  // Ongoing
  if (myCurrentDateTimeUnix >= startDateUnix && myCurrentDateTimeUnix <= endDateUnix) {
    return <div className='row mt-2'>
      <div className='col-6'>
        <div className='d-flex align-items-center justify-content-center'>
          <i className={`${classTxtOngoing} material-icons fs-18`}>rocket_launch</i>
        Started for&nbsp;<b className={`${classTxtOngoing}`}>{getRelativeHumanTime(myCurrentDateTimeUnix - startDateUnix)}</b>
        </div>
      </div>
      <div className='col-6'>
        <div className='d-flex align-items-center justify-content-center'>
          <i className={`${classTxtPast} material-icons fs-18`}>flag</i>
        End in&nbsp;<b className={`${classTxtPast}`}>{getRelativeHumanTime(endDateUnix - myCurrentDateTimeUnix)}</b>
        </div>
      </div>
    </div>
  } else
  // Past
  if (myCurrentDateTimeUnix > endDateUnix) {
    return <div className='row mt-2'>
      <div className='col-12'>
        <div className='d-flex align-items-center justify-content-center'>
          <i className={`${classTxtPast} material-icons fs-18`}>rocket_launch</i>
        Ended for&nbsp;<b className={`${classTxtPast}`}>{getRelativeHumanTime(myCurrentDateTimeUnix - endDateUnix)} ago</b>
        </div>
      </div>
    </div>
  } else
  // Upcoming
  if (myCurrentDateTimeUnix < startDateUnix) {
    return <div className='row mt-2'>
      <div className='col-6'>
        <div className='d-flex align-items-center justify-content-center'>
          <i className={`${classTxtUpcoming} material-icons fs-18`}>rocket_launch</i>
        Start in&nbsp;<b className={`${classTxtUpcoming}`}>{getRelativeHumanTime(startDateUnix - myCurrentDateTimeUnix)}</b>
        </div>
      </div>
      <div className='col-6'>
        <div className='d-flex align-items-center justify-content-center'>
          <i className={`${classTxtPast} material-icons fs-18`}>flag</i>
      End in&nbsp;<b className={`${classTxtPast}`}>{getRelativeHumanTime(endDateUnix - myCurrentDateTimeUnix)}</b>
        </div>
      </div>
    </div>
  }

  return null
}
export default TimeRelativeQuantificationDetail
