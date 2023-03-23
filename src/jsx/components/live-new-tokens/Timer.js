import moment from 'moment/moment'
import { useEffect, useState } from 'react'

const Timer = ({ inputDate }) => {
  const [timeCount, setTimeCount] = useState()
  const calculateTimeCount = () => {
    const currentTime = moment().valueOf() / 1000
    const inputTime = moment(inputDate, 'YYYY-MM-DD HH:mm:ss').valueOf() / 1000

    const timeDiff = currentTime - inputTime
    let duration = moment.duration(timeDiff, 'seconds')

    duration = moment.duration(duration.asSeconds() + 1, 'seconds')

    return (
      // duration.days() + 'd ' + duration.hours() + ' h ' +
      duration.minutes() + ' m ' + duration.seconds() + ' s')
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeCount(calculateTimeCount())
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  })

  return <div>{timeCount}</div>
}

export default Timer
