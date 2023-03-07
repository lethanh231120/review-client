import React from 'react'
import { convertStringDDMMYYYYToUnix, getCurrentTimeUnix, getRelativeHumanTime } from '../../../../utils/time/time'
import { classTxtOngoing, classTxtPast, classTxtUpcoming } from '../../../constants/page-soon'

export const TimeRelativeQuantificationList = ({ startDate, endDate }) => {
  const myCurrentDateTimeUnix = getCurrentTimeUnix()

  // string "15-05-2018" to date unix time
  const startDateUnix = convertStringDDMMYYYYToUnix(startDate)

  const endDateUnix = convertStringDDMMYYYYToUnix(endDate, true)
  // Ongoing
  if (myCurrentDateTimeUnix >= startDateUnix && myCurrentDateTimeUnix <= endDateUnix) {
    return <>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtOngoing} material-icons fs-18`}>rocket_launch</i>
        &nbsp;
      Started in&nbsp;<b className={`${classTxtOngoing}`}>{getRelativeHumanTime(myCurrentDateTimeUnix - startDateUnix)}</b>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtPast} material-icons fs-18`}>flag</i>
        &nbsp;
      End in&nbsp;<b className={`${classTxtPast}`}>{getRelativeHumanTime(endDateUnix - myCurrentDateTimeUnix)}</b>
      </div>
    </>
  } else
  // Past
  if (myCurrentDateTimeUnix > endDateUnix) {
    return <>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtPast} material-icons fs-18`}>flag</i>
        &nbsp;
        Ended in
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <b className={`${classTxtPast}`}>{getRelativeHumanTime(myCurrentDateTimeUnix - endDateUnix)} ago</b>
      </div>
    </>
  } else
  // Upcoming
  if (myCurrentDateTimeUnix < startDateUnix) {
    return <>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtUpcoming} material-icons fs-18`}>rocket_launch</i>
        &nbsp;
        Start in&nbsp;<b className={`${classTxtUpcoming}`}>{getRelativeHumanTime(startDateUnix - myCurrentDateTimeUnix)}</b>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <i className={`${classTxtPast} material-icons fs-18`}>flag</i>
        &nbsp;
        End in&nbsp;<b className={`${classTxtPast}`}>{getRelativeHumanTime(endDateUnix - myCurrentDateTimeUnix)}</b>
      </div>
    </>
  }

  return null
}
