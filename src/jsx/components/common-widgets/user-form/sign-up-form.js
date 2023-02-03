import { Link } from 'react-router-dom'

export const SignUpComponent = () => {
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
            //   onSubmit={onSignUp}
            >
              <h3 className='form-title'>Sign Up</h3>
              <div className='dz-separator-outer m-b5'>
                <div className='dz-separator bg-primary style-liner'></div>
              </div>
              <p>Enter your personal details below: </p>
              <div className='form-group mt-3'>
                <input
                  name='dzName'
                  required=''
                  className='form-control'
                  placeholder='Email'
                  type='text'
                />
              </div>
              <div className='form-group mt-3'>
                <input
                  name='dzName2'
                  required=''
                  className='form-control'
                  placeholder='Password'
                  type='text'
                />
              </div>
              <div className='form-group mt-3'>
                {/* <input name="dzName" required="" className="form-control" placeholder="Email Address" type="text" /> */}
                <input
                //   value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                  className='form-control'
                  placeholder='Re-enter Password'
                />
                {/* {errors.email && (
                          <div className='text-danger fs-12'>
                            {errors.email}
                          </div>
                        )} */}
              </div>

              {/* <div className="form-group mt-3 mb-3">
                                                          <input name="dzName" required="" className="form-control" placeholder="Re-type Your Password" type="password" />
                                                      </div> */}
              <div className='mb-3 mt-3'>
                <span className='form-check float-start me-2'>
                  <input
                    type='checkbox'
                    className='form-check-input mt-0'
                    id='check2'
                    name='example1'
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
              </div>
              <button
                type='submit'
                className='btn btn-primary '
              >
                          Submit
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>
}
