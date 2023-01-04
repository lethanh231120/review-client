import React, { useContext } from 'react'
import { Modal } from 'antd'
import FacebookLogin from 'react-facebook-login'
import { setCookie, STORAGEKEY } from '../../utils/storage'
import { post } from '../../api/products'
import { SignInContext, Authenticated } from '../layout/Main'
import './signin.scss'

const Signin = ({ openModalSignin }) => {
  const signinContext = useContext(SignInContext)
  const authenticated = useContext(Authenticated)
  
  const responseFacebook = async(response) => {
    if (response?.accessToken) {
      const dataSignin = {
        'email': response?.email,
        'accountType': 'facebook',
        'password': response?.accessToken,
        'userId': response?.userID,
        'userName': response?.name,
        'image': response?.picture?.data?.url
      }
      
      try {
        const signin = await post('reviews/auth/signin', dataSignin)
        if (signin) {
          const token = signin?.data.jwt.token
          const userInfo = signin?.data.profile
          setCookie(STORAGEKEY.ACCESS_TOKEN, token)
          setCookie(STORAGEKEY.USER_INFO, userInfo)
          signinContext?.handleSetOpenModal(false)
          authenticated.handleSetAuthenticated(true)
        }
      } catch (error) {
        console.log('lỗi')
      }
    }
  }

  return (
      <Modal
          title="Sign In"
          visible={openModalSignin}
          onOk={() => signinContext?.handleSetOpenModal(false)}
          onCancel={() => signinContext?.handleSetOpenModal(false)}
          footer={false}
      >
          <FacebookLogin
              icon='fa-facebook'
              appId='6488605091156536'
              // appId='1270002070516522'
              autoLoad={false}
              fields='name,email,picture'
              callback={responseFacebook}
              render={renderProps => (
                  <button onClick={renderProps.onClick}>This is my custom FB button</button>
              )}
          />
      </Modal>
  )
}

export default Signin
