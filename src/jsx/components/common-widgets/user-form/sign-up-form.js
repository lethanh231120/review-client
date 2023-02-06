import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { post } from '../../../../api/BaseRequest'
import { SignInContext } from '../../../index'

export const SignUpComponent = () => {
  const [email, setEmail] = useState('')
  const errorsObj = { email: '', password: '', rePassword: '', isConfirm: '' }
  const [errors, setErrors] = useState(errorsObj)
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [isConfirm, setIsConfirm] = useState(false)
  const signContext = useContext(SignInContext)

  const onSignUp = async(e) => {
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
      const resp = await post('reviews/auth/signup/normal', dataSignin)
      if (resp?.status) {
        signContext?.handleSetOpenModal(false)
      }
    } catch (e) {
      console.error(e)
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
              <p>Enter your personal details below: </p>
              <div className='form-group mt-3'>
                <input
                  className='form-control'
                  placeholder='Enter your e-mail address.'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className='text-danger fs-12'>
                    {errors.email}
                  </div>
                )}
              </div>
              <div className='form-group mt-3'>
                <input
                  className='form-control'
                  placeholder='Enter your password.'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className='text-danger fs-12'>
                    {errors.password}
                  </div>
                )}
              </div>
              <div className='form-group mt-3'>
                <input
                  className='form-control'
                  placeholder='Re-enter your password'
                  type='password'
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
                {errors.rePassword && (
                  <div className='text-danger fs-12'>
                    {errors.rePassword}
                  </div>
                )}
              </div>
              <div className='mb-3 mt-3'>
                <span className='form-check float-start me-2'>
                  <input
                    type='checkbox'
                    className='form-check-input mt-0'
                    id='check2'
                    checked={isConfirm}
                    onChange={() => {
                      setIsConfirm(!isConfirm)
                    }}
                  />

                  <label
                    className='form-check-label d-unset'
                    htmlFor='check2'
                  >
                            I agree to the
                  </label>
                </span>
                <label>
                  <Link to={'#'}>Terms of Service </Link>&amp;{' '}
                  <Link to={'#'}>Privacy Policy</Link>
                </label>
                {errors.isConfirm && (
                  <div className='text-danger fs-12'>
                    {errors.isConfirm}
                  </div>
                )}
              </div>
              <button
                type='submit'
                className='btn btn-primary '
              >
                          Sign&nbsp;Up
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>
}
