import { useEffect } from 'react'
import { getCookie, STORAGEKEY } from '../../../utils/storage/index'
import Swal from 'sweetalert2'

const ExpiredJWTChecker = ({ logout }) => {
  const millSecPerSec = 1000
  const secPerHour = 60 * 60 // 3600s
  const millSecPerHour = secPerHour * millSecPerSec // 60 secs * 60 mins * 1000 millSecss = 1 hour

  // run only once
  useEffect(() => {
    checkJwt(0, true) // run first time only access page
    checkJwt(millSecPerHour, false) // run when stay at page long, (1hour per times)
  }, [])

  const checkJwt = (duration, runOnce) => {
    const durationCheckMillSec = duration
    const jwtCheckThread = setInterval(async() => {
      const expiredJWT = await isJWTExpired()
      if (expiredJWT) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Please log in again',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
          backdrop: `rgba(4,148,114,0.4)`
        }).then((result) => {
          // click out modal notification, or click [OK] in modal
          if (result?.isDismissed || result?.isConfirmed) {
            logout()
          }
        })
      }
      if (runOnce) {
        clearInterval(jwtCheckThread)
      }
    }, durationCheckMillSec)
  }

  const parseJwt = (token) => {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  }

  const isJWTExpired = async() => {
    const token = await getCookie(STORAGEKEY.ACCESS_TOKEN)
    // already log in
    if (token) {
      const jwtExpiredTimeSec = parseJwt(token)?.exp
      const nowTimeMilSec = Date.now()
      const nowTimeSec = nowTimeMilSec / millSecPerSec

      console.log(nowTimeSec, jwtExpiredTimeSec, (jwtExpiredTimeSec - secPerHour))
      const durationCheckSec = secPerHour
      // valid jwt
      if (nowTimeSec < (jwtExpiredTimeSec - durationCheckSec)) {
        return false
      }
      return true
    }
  }

  return null
}

export default ExpiredJWTChecker
