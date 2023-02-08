import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Typography, Button, Result } from 'antd'
import { accountConfirmEmailStatus } from '../../../constants/statusCode'
import RecendEmail from './RecendEmail'
import { useNavigate } from 'react-router-dom'
const { Text } = Typography
export const ConfirmEmail = () => {
  const [message, setMessage] = useState()
  const [openModalRecen, setOpenModalRecend] = useState(false)
  const [openModalNoti, setOpanModalNoti] = useState(false)
  const navigate = useNavigate()
  const handleRecendEmail = () => {
    setOpenModalRecend(true)
  }
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    // get uuid by url
    const uuid = queryParams.get('uuid')
    // get token by url
    const token = queryParams.get('token')

    const authorization = async() => {
      const instance = axios.create({
        baseURL: process.env.REACT_APP_API_WRITE
      })
      if (token) {
        instance.defaults.headers.common['Authorization'] = token
      }
      try {
        const res = await instance.get(`/accounts/confirm-email/uuid=${uuid}`)
        res && accountConfirmEmailStatus.map((item) => {
          if (item.code === res?.data?.code) {
            setMessage({
              success: item.message
            })
            setOpanModalNoti(true)
          }
        })
        setOpanModalNoti(true)
      } catch (error) {
        console.log(error)
        error?.response?.data && accountConfirmEmailStatus.map((item) => {
          if (error?.response?.data?.code === item.code) {
            setMessage({
              error: item.message,
              errorToken: error?.response?.data?.code === 500
            })
          }
        })
      }
    }
    const timer = setTimeout(() => {
      authorization()
    }, 2000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div style={{ padding: '50px 0' }}>
      {message?.error ? (
        <>
          <Text type='danger'>{message?.error && message?.error}</Text>
          <Button onClick={handleRecendEmail}>{message?.errorToken && ' Recend email confirm'}</Button>
        </>
      )
        : (
          <Text>{message?.success && message?.success}</Text>
        )}
      <Modal
        className='forgot-password-modal'
        open={openModalRecen}
        onOk={() => setOpenModalRecend(false)}
        onCancel={() => setOpenModalRecend(false)}
        footer={null}
      >
        <RecendEmail setOpenModalRecend={setOpenModalRecend}/>
      </Modal>
      <Modal
        className='reset-password-modal'
        open={openModalNoti}
        onOk={() => navigate('../')}
        onCancel={() => navigate('../')}
      >
        <Result
          status='success'
          title={message?.success}
        />
      </Modal>
    </div>
  )
}
