import { txtAbsentTakeUpData } from '../../jsx/constants/data'
import { classBackgroundOngoing, classBackgroundPast, classBackgroundUpcoming, statusOngoing, statusPast, statusUpcoming } from '../../jsx/constants/page-soon'
import { convertStringDDMMYYYYToUnix, getCurrentTimeUnix } from '../time/time'

export const getStatusFromStartDateAndEndDate = (startDate, endDate) => {
  const myCurrentDateTimeUnix = getCurrentTimeUnix()

  // string "15-05-2018" to date unix time
  const startDateUnix = convertStringDDMMYYYYToUnix(startDate)

  const endDateUnix = convertStringDDMMYYYYToUnix(endDate, true)

  // Ongoing
  if (myCurrentDateTimeUnix >= startDateUnix && myCurrentDateTimeUnix <= endDateUnix) {
    return statusOngoing
  } else
  // Past
  if (myCurrentDateTimeUnix > endDateUnix) {
    return statusPast
  } else
  // Upcoming
  if (myCurrentDateTimeUnix < startDateUnix) {
    return statusUpcoming
  }
  return txtAbsentTakeUpData
}

export const getStatusBackgroundFromSoonStatus = (status) => {
  switch (status) {
    case statusUpcoming:
      return classBackgroundUpcoming
    case statusOngoing:
      return classBackgroundOngoing
    case statusPast:
      return classBackgroundPast
    default:
      return txtAbsentTakeUpData
  }
}

