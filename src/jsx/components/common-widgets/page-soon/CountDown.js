import React, { useState, useEffect } from 'react'
import { convertStringDDMMYYYYToUnix, getCurrentTimeUnix } from '../../../../utils/time/time'
import { statusOngoing, statusPast, statusUpcoming } from '../../../constants/page-soon'

export const CountDown = ({ soonId, progressGoal, projectStatus, startDate, endDate }) => {
  const [timerHeadline, setTimerHeadline] = useState()
  const [timerDay, setTimerDay] = useState()
  const [timerHour, setTimerHour] = useState()
  const [timerMinute, setTimerMinute] = useState()
  const [timerSecond, setTimerSecond] = useState()
  const [timerCountdownShow, setTimerCountdownShow] = useState(false)
  const [timerCountDownThread, setTimerCountDownThread] = useState()

  // clear timer when click similar soon in detail soon
  useEffect(() => {
    clearInterval(timerCountDownThread)
  }, [soonId])

  // milestone in the feture
  const countDown = (milestoneUnix) => {
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    setTimerCountDownThread(setInterval(() => {
      const now = getCurrentTimeUnix()
      let distance

      // in the feture
      if (milestoneUnix) {
        setTimerCountdownShow(true)
        distance = milestoneUnix - now

        setTimerDay(String(Math.floor(distance / (day))).padStart(2, '0'))
        setTimerHour(String(Math.floor((distance % (day)) / (hour))).padStart(2, '0'))
        setTimerMinute(String(Math.floor((distance % (hour)) / (minute))).padStart(2, '0'))
        setTimerSecond(String(Math.floor((distance % (minute)) / second)).padStart(2, '0'))
      } else {
        // in the past
        distance = -1
      }

      // do something later when date is reached
      if (distance < 0) {
        let msg = ``
        if (progressGoal) {
          msg += `It's over `
          if (progressGoal === 100) {
            msg += 'success'
          } else {
            msg += 'failed'
          }
        }
        setTimerHeadline(msg)
        setTimerCountdownShow(false)
        clearInterval(timerCountDownThread)
      }
      // seconds
    }, second)
    )
  }
  useEffect(() => {
    setTimerHeadline(projectStatus === statusOngoing
      ? 'Countdown to end time' : projectStatus === statusUpcoming ? 'Countdown to start time' : ``)
    if (startDate && endDate) {
      const soonProjectStatus = projectStatus
      let milestoneUnix = null
      switch (soonProjectStatus) {
        case statusOngoing:{
          milestoneUnix = convertStringDDMMYYYYToUnix(endDate)
          break
        }
        case statusUpcoming:{
          milestoneUnix = convertStringDDMMYYYYToUnix(startDate)
          break
        }
        case statusPast:{
          break
        }
      }
      countDown(milestoneUnix)
    }
  }, [startDate, endDate])

  return timerCountdownShow
    ? <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
      <div className='mt-4 text-center'>
        <h2 className='countdown'>{timerHeadline}</h2>
        <div>
          <ul>
            <li className='countdown'><span>{timerDay}</span>days</li>
            <li className='countdown'><span>{timerHour}</span>Hours</li>
            <li className='countdown'><span>{timerMinute}</span>Minutes</li>
            <li className='countdown'><span>{timerSecond}</span>Seconds</li>
          </ul>
        </div>
      </div>
    </div>
    : ''
}
