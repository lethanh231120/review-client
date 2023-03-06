import { useEffect, useContext } from 'react'
import { getCookie, STORAGEKEY } from '../../../utils/storage/index'
import Swal from 'sweetalert2'
import { ShowFullSearchConext } from '../../../App'
import { convertType, parseJwt } from '../../../utils/decode'

const ExpiredJWTChecker = ({ logout }) => {
  const millSecPerSec = 1000
  const secPerHour = 60 * 60 // 3600s
  const millSecPerHour = secPerHour * millSecPerSec // 60 secs * 60 mins * 1000 millSecss = 1 hour
  const showFullSearchConext = useContext(ShowFullSearchConext)

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
          title: 'Please login again',
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
            showFullSearchConext?.setIsShowFullSearchSmallMode(false) // in small mode, small search when its state is full width --> to see button login
            logout()
          }
        })
      }
      if (runOnce) {
        clearInterval(jwtCheckThread)
      }
    }, durationCheckMillSec)
  }

  const isJWTExpired = async() => {
    let token = await getCookie(STORAGEKEY.ACCESS_TOKEN)
    token = convertType(token) // 'undefined' to undefined
    // already log in
    if (token) {
      const jwtExpiredTimeSec = parseJwt(token)?.exp
      const nowTimeMilSec = Date.now()
      const nowTimeSec = nowTimeMilSec / millSecPerSec

      const durationCheckSec = secPerHour
      // valid jwt
      if (nowTimeSec < (jwtExpiredTimeSec - durationCheckSec)) {
        return false
      }
    }
    return true
  }
}

export default ExpiredJWTChecker
