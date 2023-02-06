import { useContext, useState } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { post } from '../../../../api/BaseRequest'
import { notification } from 'antd'
import { setCookie, STORAGEKEY } from '../../../../utils/storage'
import { SignInContext, Authenticated } from '../../../index'
import { CloseCircleOutlined } from '@ant-design/icons'

export const SignInComponent = () => {
  const authenticated = useContext(Authenticated)
  const signContext = useContext(SignInContext)

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
          setStateLoginSuccess(resp?.data.jwt.token, resp?.data.profile)
        }
      }
    } catch (error) {
      openNotification()
    }
  }

  const openNotification = (messageRes) => {
    notification.open({
      message: `Login failed. Please try again`,
      description: messageRes,
      duration: 2,
      icon: <CloseCircleOutlined style={{ color: 'red' }} />
    })
  }

  const [email, setEmail] = useState('')
  const errorsObj = { email: '', password: '' }
  const [errors, setErrors] = useState(errorsObj)
  const [password, setPassword] = useState('')

  const onLoginNormal = async(e) => {
    e.preventDefault()
    let error = false
    const errorObj = { ...errorsObj }
    if (email === '') {
      errorObj.email = 'Email is Required'
      error = true
    }
    if (password === '') {
      errorObj.password = 'Password is Required'
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
      const resp = await post('reviews/auth/signin/normal', dataSignin)
      if (resp?.status) {
        setStateLoginSuccess(resp?.data.jwt.token, resp?.data.profile)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const setStateLoginSuccess = (token, userInfo) => {
    setCookie(STORAGEKEY.ACCESS_TOKEN, token)
    setCookie(STORAGEKEY.USER_INFO, userInfo)
    signContext?.handleSetOpenModal(false)
    authenticated.handleSetAuthenticated(true)
  }

  return <div className='login-form style-2'>
    <div className='card-body'>
      <div className='nav nav-tabs border-bottom-0'>
        <div className='tab-content w-100' id='nav-tabContent'>
          <div
            className='tab-pane fade active show'
            id='nav-personal'
          >
            <form className=' dz-form pb-3' onSubmit={onLoginNormal}>
              <h3 className='form-title m-t0'>
                Sign in
              </h3>
              <div className='dz-separator-outer m-b5'>
                <div className='dz-separator bg-primary style-liner'></div>
              </div>
              <div className='form-group mb-3'>
                {/* <input name="dzName" required="" className="form-control" placeholder="User Name" type="text" /> */}
                <input
                  type='email'
                  className='form-control'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your e-mail address.'
                />
                {errors.email && (
                  <div className='text-danger fs-12'>
                    {errors.email}
                  </div>
                )}
              </div>
              <div className='form-group mb-3'>
                {/* <input name="dzName" required="" className="form-control " placeholder="Type Password" type="password" /> */}
                <input
                  type='password'
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password.'
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
                >
                  Login
                </button>
                <span className='form-check d-inline-block ms-2'>
                  <label
                    className='form-check-label'
                    htmlFor='check1'
                  >
                    <a to={'#'} className='nav-link m-auto btn tp-btn-light btn-primary'>
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
                      // appId='1270002070516522'
                      autoLoad={false}
                      fields='name,email,picture'
                      callback={responseFacebook}
                      render={(renderProps) => (
                        <a
                          href='#'
                          className='fab fa-facebook-f btn-facebook' rel='noreferrer'
                          onClick={renderProps.onClick}
                        >
                        </a>
                      )}
                    />

                  </li>
                  <li>
                    <a
                      target='_blank'
                      href='https://www.google.com/'
                      className='fab fa-google-plus-g btn-google-plus' rel='noreferrer'
                    ></a>
                  </li>
                  <li>
                    <a
                      target='_blank'
                      href='https://www.linkedin.com/'
                      className='fab fa-linkedin-in btn-linkedin' rel='noreferrer'
                    ></a>
                  </li>
                  <li>
                    <a
                      target='_blank'
                      href='https://twitter.com/'
                      className='fab fa-twitter btn-twitter' rel='noreferrer'
                    ></a>
                  </li>
                </ul>
              </div>
            </form>
            {/* <div className='text-center bottom'>
              <NavLink
                to='/page-register'
                className='btn btn-primary button-md btn-block'
              >
                Create an account
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
    </div>

  </div>
}
