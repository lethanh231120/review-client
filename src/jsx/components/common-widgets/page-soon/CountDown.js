import React, { useState, useEffect } from 'react'
import { convertStringDDMMYYYYToUnix, getCurrentTimeUnix } from '../../../../utils/time/time'
import { statusOngoing, statusPast, statusUpcoming } from '../../../constants/page-soon'
import { MySkeletonLoadinng } from '../my-spinner'

export const CountDown = ({ progressGoal, projectStatus, startDate, endDate }) => {
  const [timerHeadline, setTimerHeadline] = useState()
  const loadingTimer = <MySkeletonLoadinng count={1} height={10} />
  const [timerDay, setTimerDay] = useState(loadingTimer)
  const [timerHour, setTimerHour] = useState(loadingTimer)
  const [timerMinute, setTimerMinute] = useState(loadingTimer)
  const [timerSecond, setTimerSecond] = useState(loadingTimer)
  const [timerCountdownShow, setTimerCountdownShow] = useState(true)
  const [timerCountdownHideContent, setTimerCountdownHideContent] = useState(false)
  const [timer, setTimer] = useState()

  // milestone in the feture
  const countDown = (milestoneUnix) => {
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    setTimer(setInterval(() => {
      const now = getCurrentTimeUnix()
      let distance

      // in the feture
      if (milestoneUnix) {
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
        setTimerHeadline(`It's over in ${progressGoal === 100 ? 'success' : 'failed'}`)
        setTimerCountdownShow(false)
        setTimerCountdownHideContent(true)
        clearInterval(timer)
      }
      // seconds
    }, second)
    )
  }
  useEffect(() => {
    setTimerHeadline(projectStatus === statusOngoing
      ? 'Countdown to end time' : projectStatus === statusUpcoming ? 'Countdown to start time' : `It's over`)
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

  useEffect(() => {
    console.log(123214214214)
    clearInterval(timer)
  }, [progressGoal])

  return <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
    <div className='mt-4 text-center'>
      <h2 className='countdown'>{timerHeadline}</h2>
      {timerCountdownShow ? <div>
        <ul>
          <li className='countdown'><span>{timerDay}</span>days</li>
          <li className='countdown'><span>{timerHour}</span>Hours</li>
          <li className='countdown'><span>{timerMinute}</span>Minutes</li>
          <li className='countdown'><span>{timerSecond}</span>Seconds</li>
        </ul>
      </div> : ''}
      {
        timerCountdownHideContent ? <div className='emoji'>
          <span>{progressGoal === 100 ? '🥳' : '🙉'}</span>
          <span>{progressGoal === 100 ? '🎉' : '💔'}</span>
          <span>{progressGoal === 100 ? '🎂' : '🙈'}</span>
        </div> : ''
      }
    </div>
  </div>
}
