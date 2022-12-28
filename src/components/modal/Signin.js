import React, { useContext, useEffect } from 'react'
import { Modal } from 'antd'
import FacebookLogin from 'react-facebook-login'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { setCookie, STORAGEKEY } from '../../utils/storage'
import { post } from '../../api/products'
import { SignInContext } from '../layout/Main'
import './signin.scss'
import { gapi } from 'gapi-script'

const Signin = ({ openModalSignin }) => {
  const signinContext = useContext(SignInContext)
  const refreshTokenSetup = (res) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000

    const refreshToken = async() => {
      const newAuthRes = await res.reloadAuthResponse()
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000
      console.log('newAuthRes:', newAuthRes)
      // saveUserToken(newAuthRes.access_token);  <-- save new token
      localStorage.setItem('authToken', newAuthRes.id_token)

      // Setup the other timer after the first one
      setTimeout(refreshToken, refreshTiming)
    }

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming)
  }
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
  
      try {
        // const signup = await post('reviews/auth/signup', dataSignup)
        // if (signup?.status) {
          const signin = await post('reviews/auth/signin', dataSignin)
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

  const onSuccess = (res) => {
    console.log(res)
    console.log('Login Success: currentUser:', res.profileObj)
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // )
    refreshTokenSetup(res)
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res)
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    )
  }

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: '1059982952171-sgovl851oomltgq97obi14sdekckkc81.apps.googleusercontent.com',
        scope: ''
      })
    }
    gapi.load('client:auth2', start)
  })

  const onLogout = (res) => {
    console.log(res)
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
              appId='1270002070516522'
              autoLoad={false}
              fields='name,email,picture'
              callback={responseFacebook}
              render={renderProps => (
                  <button onClick={renderProps.onClick}>This is my custom FB button</button>
              )}
          />
          <GoogleLogin
            clientId='78523510071-fdbfdv6ekf2n3q8ql3i4ut7irh2g22de.apps.googleusercontent.com'
            buttonText='LOGIN WITH GOOGLE'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            className='GOOGLE'
            // isSignedIn={true}
          />
          <GoogleLogout
            clientId='78523510071-fdbfdv6ekf2n3q8ql3i4ut7irh2g22de.apps.googleusercontent.com'
            buttonText='LOGOUT WITH GOOGLE'
            onLogoutSuccess={onLogout}
          />
      </Modal>
  )
}

export default Signin
