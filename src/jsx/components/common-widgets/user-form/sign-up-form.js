import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { post } from '../../../../api/BaseRequest'
import Swal from 'sweetalert2'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { isValidEmail, isValidPassword } from '../../../../utils/regrex'
import { SignInContext } from '../../../../App'

export const txtEnterEmail = 'Enter your e-mail address'
export const txtEnterPassword = 'Enter your password'
export const txtEnterRePassword = 'Re-enter your password'

export const SignUpComponent = () => {
  const [email, setEmail] = useState('')
  const errorsObj = { email: '', password: '', rePassword: '', isConfirm: '' }
  const [errors, setErrors] = useState(errorsObj)
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isConfirm, setIsConfirm] = useState(false)
  const signContext = useContext(SignInContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowRePassword, setIsReShowPassword] = useState(false)

  const onSignUp = async(e) => {
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
    if (password !== rePassword) {
      errorObj.rePassword = 'Re-password is Not Matching with Password'
      error = true
    }
    if (!isConfirm) {
      errorObj.isConfirm = 'Must Be Confirm'
      error = true
    }

    setErrors(errorObj)
    if (error) return

    try {
      const dataSignin = {
        email: email,
        password: password
      }
      setIsLoading(true)
      const resp = await post('reviews/auth/signup/normal', dataSignin)
      if (resp?.status) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          title: 'Resgister successfully. ',
          html: 'Please check email to activate your account',
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
            signContext?.handleSetOpenModal(false)
          }
        })
      }
    } catch (e) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Resgister failed.',
        html: e?.response?.data?.error || 'Sorry for this inconvenience. Our server got problem, try again later.',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        backdrop: `rgba(4,148,114,0.4)`
      })
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return <div className='login-form style-2'>
    <div className='card-body'>
      <nav className='nav nav-tabs border-bottom-0'>
        <div
          className='tab-content w-100'
          id='nav-tabContent'
        >
          <div className='tab-pane active show fade'>
            {/* {props.errorMessage && (
                      <div className=''>{props.errorMessage}</div>
                    )}
                    {props.successMessage && (
                      <div className=''>{props.successMessage}</div>
                    )} */}
            <form
              className='dz-form pb-3'
              onSubmit={onSignUp}
            >
              <h3 className='form-title'>Sign Up</h3>
              <div className='dz-separator-outer m-b5'>
                <div className='dz-separator bg-primary style-liner'></div>
              </div>
              <div className='form-group mt-3'>
                <i className='material-icons input-icon-sign-in-sign-up'>mail</i>
                <input
                  className='form-control input-form-sign-in-sign-up-padding'
                  placeholder={txtEnterEmail}
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={isLoading}
                />
                {errors.email && (
                  <div className='text-danger fs-12'>
                    {errors.email}
                  </div>
                )}
              </div>
              <div className='form-group mt-3'>
                <i className='material-icons input-icon-sign-in-sign-up' style={{ cursor: 'pointer' }} onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? 'visibility_off' : 'visibility' }</i>
                <input
                  className='form-control input-form-sign-in-sign-up-padding'
                  placeholder={txtEnterPassword}
                  type={isShowPassword ? 'text' : 'password' }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  readOnly={isLoading}
                />
                {errors.password && (
                  <div className='text-danger fs-12'>
                    {errors.password}
                  </div>
                )}
              </div>
              <div className='form-group mt-3'>
                <i className='material-icons input-icon-sign-in-sign-up' style={{ cursor: 'pointer' }} onClick={() => setIsReShowPassword(!isShowRePassword)}>{isShowRePassword ? 'visibility_off' : 'visibility' }</i>
                <input
                  className='form-control input-form-sign-in-sign-up-padding'
                  placeholder={txtEnterRePassword}
                  type={isShowRePassword ? 'text' : 'password' }
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  readOnly={isLoading}
                />
                {errors.rePassword && (
                  <div className='text-danger fs-12'>
                    {errors.rePassword}
                  </div>
                )}
              </div>
              <div className='mb-3 mt-3'>
                <span className='form-check float-start me-2' style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type='checkbox'
                    className='form-check-input mt-0'
                    id='check2'
                    checked={isConfirm}
                    onChange={() => {
                      setIsConfirm(!isConfirm)
                    }}
                    disabled={isLoading}
                  />

                  <label
                    className='form-check-label d-unset'
                    htmlFor='check2'
                  >
                            I agree to the
                  </label>
                </span>
                <label>
                  <Link to={'/terms-of-service'} onClick={() => {
                    signContext?.handleSetOpenModal(false) // close form sign-in, sign-up
                  }}>Terms of Service </Link>&amp;{' '}
                  <Link to={'/privacy-policy'} onClick={() => {
                    signContext?.handleSetOpenModal(false) // close form sign-in, sign-up
                  }}>Privacy Policy</Link>
                </label>
                {errors.isConfirm && (
                  <div className='text-danger fs-12'>
                    {errors.isConfirm}
                  </div>
                )}
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={isLoading}
              >
                          Sign&nbsp;Up
              </button>
              {isLoading ? <>&nbsp;&nbsp; <Spin indicator={<LoadingOutlined spin />} size='large' /> </> : ''}
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>
}
