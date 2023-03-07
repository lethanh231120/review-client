export const formatDateStyle = 'ddd, DD MMM YYYY' // Mon, 06 Feb 2023

export const getCurrentTimeUnix = () => {
  let myCurrentDateTimeUnix = (new Date())
  myCurrentDateTimeUnix = myCurrentDateTimeUnix?.getTime()
  return myCurrentDateTimeUnix
}

export const getRelativeHumanTime = (timestamp) => {
  // Convert to a positive integer
  var time = Math.abs(timestamp)

  // Define humanTime and units
  var humanTime, units

  // If there are years
  if (time > (1000 * 60 * 60 * 24 * 365)) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 365), 10)
    units = 'years'
  } else
  // If there are months
  if (time > (1000 * 60 * 60 * 24 * 30)) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 30), 10)
    units = 'months'
  } else
  // If there are weeks
  if (time > (1000 * 60 * 60 * 24 * 7)) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24 * 7), 10)
    units = 'weeks'
  } else
  // If there are days
  if (time > (1000 * 60 * 60 * 24)) {
    humanTime = parseInt(time / (1000 * 60 * 60 * 24), 10)
    units = 'days'
  } else
  // If there are hours
  if (time > (1000 * 60 * 60)) {
    humanTime = parseInt(time / (1000 * 60 * 60), 10)
    units = 'hours'
  } else
  // If there are minutes
  if (time > (1000 * 60)) {
    humanTime = parseInt(time / (1000 * 60), 10)
    units = 'minutes'
  } else {
    // Otherwise, use seconds
    humanTime = parseInt(time / (1000), 10)
    units = 'seconds'
  }

  return `${humanTime} ${units}`
}

// getEndDate = true (plus one day to get next day)
export const convertStringDDMMYYYYToUnix = (ddmmyyyy, getEndDate = false) =>{
  let dateUnix = new Date(ddmmyyyy?.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'))
  dateUnix.setTime(dateUnix?.getTime()) // Local user to GMT + 0
  if (getEndDate) {
    const millSecInOneDay = 1000 * 60 * 60 * 24 // 86400000 milliseconds.
    // convert start day to end day --> (>=start && <end of endDate) still in status ongoing project IDO/ ICO/ IEO
    dateUnix.setTime(dateUnix?.getTime() + millSecInOneDay)
  }
  dateUnix = dateUnix?.getTime()
  return (dateUnix)
}

export const getRelativeTimeString = (startDate, endDate) =>{
  const myCurrentDateTimeUnix = getCurrentTimeUnix()

  // string "15-05-2018" to date unix time
  const startDateUnix = convertStringDDMMYYYYToUnix(startDate)

  const endDateUnix = convertStringDDMMYYYYToUnix(endDate, true)

  // Ongoing
  if (myCurrentDateTimeUnix >= startDateUnix && myCurrentDateTimeUnix <= endDateUnix) {
    return getRelativeHumanTime(endDateUnix - myCurrentDateTimeUnix)
  } else
  // Past
  if (myCurrentDateTimeUnix > endDateUnix) {
    return `${getRelativeHumanTime(myCurrentDateTimeUnix - endDateUnix)} ago`
  } else
  // Upcoming
  if (myCurrentDateTimeUnix < startDateUnix) {
    return getRelativeHumanTime(startDateUnix - myCurrentDateTimeUnix)
  }
  return ''
}
