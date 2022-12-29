import React, { useContext, useEffect } from 'react'
import { Modal } from 'antd'
import FacebookLogin from 'react-facebook-login'
import { setCookie, STORAGEKEY } from '../../utils/storage'
import { post } from '../../api/products'
import { SignInContext } from '../layout/Main'
import './signin.scss'

const Signin = ({ openModalSignin }) => {
  const signinContext = useContext(SignInContext)
  
  const responseFacebook = async(response) => {
      // const dataSignup = {
      //   'userId': response?.userID,
      //   'userName': response?.name,
      //   'email': response?.email,
      //   'password': 'facebook',
      //   'accountType': 'facebook',
      //   'image': response?.picture?.data?.url
      // }
      const dataSignin = {
        'userId': response?.userID,
        'email': response?.email,
        'password': 'facebook',
        'accountType': 'facebook'
      }
  
      console.log(response)
      try {
        // const signup = await post('reviews/auth/signup', dataSignup)
        // if (signup?.status) {
          const signin = await post('reviews/auth/signin', dataSignin)
          console.log(signin)
          const token = signin?.data.jwt.token
          const userInfo = signin?.data.profile
          // const accountId = signin?.data[1]?.id
          // if (token) {
            await setCookie(STORAGEKEY.ACCESS_TOKEN, token)
            // const userInfo = await get(`reviews/profile/accountId=${accountId}`)
            // if (userInfo) {
              // await setCookie(STORAGEKEY.USER_INFO, userInfo?.data)
              await setCookie(STORAGEKEY.USER_INFO, userInfo)
            // }
            signinContext?.handleSetOpenModal(false)
          // }
        // }
      } catch (error) {
        console.log('lỗi')
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
