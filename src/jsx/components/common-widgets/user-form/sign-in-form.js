import { useContext, useState } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { post } from '../../../../api/BaseRequest'
import { setCookie, STORAGEKEY } from '../../../../utils/storage'
import { SignInContext, Authenticated, SignInFromAddProductContext, ShowFullSearchConext } from '../../../../App'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import { isValidEmail, isValidPassword } from '../../../../utils/regrex'
import { AddModalContext } from '../../../index'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import { parseJwt } from '../../../../utils/decode'

const loginTypeNormal = 'normal'
const loginTypeFacebook = 'facebook'
const loginTypeGoogle = 'google'

export const SignInComponent = () => {
  const authenticated = useContext(Authenticated)
  const signContext = useContext(SignInContext)
  const signInFromAddProductContext = useContext(SignInFromAddProductContext)
  const addModal = useContext(AddModalContext)
  const showFullSearchConext = useContext(ShowFullSearchConext)
  const [isShowPassword, setIsShowPassword] = useState(false)

  const responseFacebook = async(response) => {
    try {
      if (response?.accessToken) {
        const dataSignin = {
          email: response?.email,
          accountType: 'facebook',
          password: response?.accessToken,
          userId: response?.userID,
          userName: response?.name,
          image: response?.picture?.data?.url
        }
        const resp = await post('reviews/auth/signin/social', dataSignin)
        if (resp?.status) {
          setStateLoginSuccess(resp?.data?.jwt?.token, resp?.data?.profile)
        }
      }
    } catch (error) {
      openNotification(error, loginTypeFacebook)
    }
  }

  const handleFalure = (value) => {
    console.log(value)
  }

  const openNotification = (error, loginTypeFE) => {
    let msg = 'Login failed.'
    msg += `<br />`

    const errMsgBEResp = error?.response?.data?.error
    // normal, but not activated account
    if (errMsgBEResp === 'account is not activated') {
      msg += 'Your account is not activated. Please check your mail.'
    } else
    // normal, but not register before
    if (errMsgBEResp === 'this email is not registered, please signup') {
      msg += 'This email is not registered before. Please register first.'
    } else {
      let error = errMsgBEResp?.split(':wrong email or password')
      let loginTypeBEResponse = error[0]
      if (error?.length === 2) {
        // Login as activated normal, but still wrong email or password.
        if (loginTypeBEResponse === loginTypeNormal && loginTypeFE === loginTypeNormal) {
          msg = `Your email or passowrd is incorrect. Please try again.`
        } else
        // Login as socail, but login as normal
        if (loginTypeBEResponse !== loginTypeNormal && loginTypeFE === loginTypeNormal) {
          msg = `This email registered by ${loginTypeBEResponse}. Please login by ${loginTypeBEResponse}`
        }
      } else {
        error = errMsgBEResp?.split('User id is incorrect')
        loginTypeBEResponse = error[0]
        if (error?.length === 2) {
          // has account registered with gear 5, but still login this email through social.
          if (loginTypeBEResponse === loginTypeNormal && loginTypeFE !== loginTypeNormal) {
            msg = `This email registerd in Gear5. Please login by your email and password directly.`
          }
        }
      }

      // exist in another platform
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'warning',
      title: 'Warning',
      html: msg,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      backdrop: `rgba(4,148,114,0.4)`
    })
  }

  const [email, setEmail] = useState('')
  const errorsObj = { email: '', password: '' }
  const [errors, setErrors] = useState(errorsObj)
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onLoginNormal = async(e) => {
    e.preventDefault()
    let error = false
    const errorObj = { ...errorsObj }
    if (email === '') {
      errorObj.email = 'Email is Required'
      error = true
    }
    if (!isValidEmail(email)) {
      errorObj.email = 'Email is not valid format'
      error = true
    }
    if (password === '') {
      errorObj.password = 'Password is Required'
      error = true
    }
    if (!isValidPassword(password)) {
      errorObj.password = 'Password must has at least 8 characters, contains at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
      error = true
    }

    setErrors(errorObj)
    if (error) {
      return
    }
    try {
      const dataSignin = {
        email: email,
        password: password
      }
      setIsLoading(true)
      const resp = await post('reviews/auth/signin/normal', dataSignin)
      if (resp?.status) {
        setStateLoginSuccess(resp?.data?.jwt?.token, resp?.data?.profile)
      }
    } catch (error) {
      openNotification(error, loginTypeNormal)
    } finally {
      setIsLoading(false)
    }
  }

  const setStateLoginSuccess = (token, userInfo) => {
    setCookie(STORAGEKEY.ACCESS_TOKEN, token)
    setCookie(STORAGEKEY.USER_INFO, userInfo)
    signContext?.handleSetOpenModal(false)
    authenticated?.handleSetAuthenticated(true)
    showFullSearchConext?.setIsShowFullSearchSmallMode(false) // in small mode, small search when its state is full width
    // login from add product form
    if (signInFromAddProductContext?.isOpenModalAddProduct) {
      addModal?.handleSetOpenModal(true)
      // reset state not login from add product form, after login successful
      signInFromAddProductContext?.setIsOpenModalAddProduct(false)
    }
  }

  const responseGoogle = async(response) => {
    try {
      // decode here
      const decodedJwt = parseJwt(response?.credential)
      if (decodedJwt?.email_verified) {
        const dataSignin = {
          email: decodedJwt?.email,
          accountType: 'google',
          password: response?.credential, // jwt
          userId: decodedJwt?.sub,
          userName: decodedJwt?.name,
          image: decodedJwt?.picture
        }
        const resp = await post('reviews/auth/signin/social', dataSignin)
        if (resp?.status) {
          setStateLoginSuccess(resp?.data?.jwt?.token, resp?.data?.profile)
        }
      }
    } catch (error) {
      openNotification(error, loginTypeGoogle)
    }
  }

  const errorGoogle = (error) => {
    console.error(error)
    openNotification()
  }

  return <div className='login-form style-2'>
    <div className='card-body'>
      <div className='nav nav-tabs border-bottom-0'>
        <div className='tab-content w-100' id='nav-tabContent'>
          <div
            className='tab-pane fade active show'
            id='nav-personal'
          >
            <form className='dz-form pb-3' onSubmit={onLoginNormal}>
              <h3 className='form-title m-t0'>
                Sign In
              </h3>
              <div className='dz-separator-outer m-b5'>
                <div className='dz-separator bg-primary style-liner'></div>
              </div>
              <div className='form-group mb-3'>
                <i className='material-icons input-icon-sign-in-sign-up'>mail</i>
                <input
                  type='text'
                  className='form-control input-form-sign-in-sign-up-padding'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your e-mail address.'
                  readOnly={isLoading}
                />
                {errors.email && (
                  <div className='text-danger fs-12'>
                    {errors.email}
                  </div>
                )}
              </div>
              <div className='form-group mb-3'>
                <i className='material-icons input-icon-sign-in-sign-up' style={{ cursor: 'pointer' }} onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? 'visibility_off' : 'visibility' }</i>
                <input
                  type={isShowPassword ? 'text' : 'password' }
                  className='form-control input-form-sign-in-sign-up-padding'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password.'
                  readOnly={isLoading}
                />
                {errors.password && (
                  <div className='text-danger fs-12'>
                    {errors.password}
                  </div>
                )}
              </div>
              <div className='form-group text-left mb-5'>
                <button
                  type='submit'
                  className='btn btn-primary dz-xs-flex m-r5'
                  disabled={isLoading}
                >
                  Login
                </button>
                {isLoading ? <>&nbsp;&nbsp; <Spin indicator={<LoadingOutlined spin />} size='large' /> </> : ''}
                <span className='form-check d-inline-block ms-2' style={ { float: 'right' }}>
                  <label
                    className='form-check-label'
                    htmlFor='check1'
                  >
                    <a to={'#'} className={`nav-link m-auto btn tp-btn-light btn-primary${isLoading ? 'none-click' : ''}`}>
                      Forget Password ?
                    </a>
                  </label>
                </span>

              </div>
              <div className='dz-social'>
                <h5 className='form-title fs-20'>
                  Or Sign In With
                </h5>
                <ul className='dz-social-icon dz-border dz-social-icon-lg text-white'>
                  <li>
                    <FacebookLogin
                      icon='fa-facebook'
                      appId='6488605091156536'
                      autoLoad={false}
                      fields='name,email,picture'
                      callback={responseFacebook}
                      onFailure={handleFalure}
                      render={(renderProps) => (
                        <a
                          href='#'
                          className={`fab fa-facebook-square btn-facebook ${isLoading ? 'none-click' : ''}`}
                          rel='noreferrer'
                          onClick={renderProps.onClick}
                          style={{ width: '32px', height: '32px', marginRight: '1rem' }}
                        >
                        </a>
                      )}
                    />
                  </li>
                  <li>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}
                    >
                      {/* ref: https://livefiredev.com/in-depth-guide-sign-in-with-google-in-a-react-js-application/ */}
                      <GoogleLogin
                        type='icon'
                        size='medium'
                        theme='outlined'
                        onSuccess={responseGoogle}
                        onError={errorGoogle}
                      />
                    </GoogleOAuthProvider>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
}
