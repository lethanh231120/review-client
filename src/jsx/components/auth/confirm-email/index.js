import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import Home from './../../Dashboard/Home'
import Swal from 'sweetalert2'
import { SignInContext } from '../../../../App'

export const ConfirmEmail = () => {
  const signContext = useContext(SignInContext)

  const onConfirmEmailSuccess = () =>{
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      title: 'Success',
      html: 'You confirmed email successfully',
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
        signContext?.handleSetOpenModal(true)
      }
    })
  }

  const onConfirmEmailFailed = () =>{
    Swal.fire({
      allowOutsideClick: false,
      icon: 'warning',
      title: 'Warning',
      html: 'Active email failed',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      backdrop: `rgba(4,148,114,0.4)`
    })
  }

  const onAuthorization = async(uuid, token) => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_API_WRITE
    })
    if (token) {
      instance.defaults.headers.common['Authorization'] = token
    }
    try {
      const res = await instance.post(`reviews/auth/confirm/normal?uuid=${uuid}`)
      if (res.status) {
        onConfirmEmailSuccess()
      }
    } catch (e) {
      onConfirmEmailFailed()
    }
  }

  // get param from url
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    // get uuid by url
    const uuid = queryParams.get('uuid')
    // get token by url
    const token = queryParams.get('token')

    // display url
    history.pushState({}, null, '/') // home

    onAuthorization(uuid, token)
  }, [])

  return (
    <Home />
  )
}
