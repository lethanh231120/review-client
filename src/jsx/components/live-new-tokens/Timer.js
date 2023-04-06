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

    let output = ''
    const days = duration.days()
    if (days !== 0) {
      output += (days + 'd ')
    }
    const hours = duration.hours()
    if (hours !== 0) {
      output += (hours + 'h ')
    }
    const minutes = duration.minutes()
    output += (minutes + 'm ')
    const seconds = duration.seconds()
    output += (seconds + 's ')

    return output
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
