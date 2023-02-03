// import logo from '../../images/logo/logo-full.png'

export const SignInComponent = () => {
  return <div className='login-form style-2'>
    <div className='card-body'>
      <div className='nav nav-tabs border-bottom-0'>
        <div className='tab-content w-100' id='nav-tabContent'>
          <div
            className='tab-pane fade active show'
            id='nav-personal'
          >
            <form className=' dz-form pb-3'>
              <h3 className='form-title m-t0'>
                Sign in
              </h3>
              <div className='dz-separator-outer m-b5'>
                <div className='dz-separator bg-primary style-liner'></div>
              </div>
              <p>
                Enter your e-mail address and your password.{' '}
              </p>
              <div className='form-group mb-3'>
                {/* <input name="dzName" required="" className="form-control" placeholder="User Name" type="text" /> */}
                <input
                  type='email'
                  className='form-control'
                //   value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                />
                {/* {errors.email && (
                  <div className='text-danger fs-12'>
                    {errors.email}
                  </div>
                )} */}
              </div>
              <div className='form-group mb-3'>
                {/* <input name="dzName" required="" className="form-control " placeholder="Type Password" type="password" /> */}
                <input
                  type='password'
                  className='form-control'
                //   value={password}
                //   onChange={(e) => setPassword(e.target.value)}
                />
                {/* {errors.password && (
                  <div className='text-danger fs-12'>
                    {errors.password}
                  </div>
                )} */}
              </div>
              <div className='form-group text-left mb-5'>
                <button
                  type='submit'
                  className='btn btn-primary dz-xs-flex m-r5'
                >
                  Login
                </button>
                <span className='form-check d-inline-block ms-2'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='check1'
                    name='example1'
                  />
                  <label
                    className='form-check-label'
                    htmlFor='check1'
                  >
                    Remember me
                  </label>
                </span>
                {/* <Link to={"#"}  className="nav-link m-auto btn tp-btn-light btn-primary">
                                                    Forget Password ?
                                                </Link> 	 */}
              </div>
              <div className='dz-social'>
                <h5 className='form-title fs-20'>
                  Or Sign In With
                </h5>
                <ul className='dz-social-icon dz-border dz-social-icon-lg text-white'>
                  <li>
                    <a
                      target='_blank'
                      href='https://www.facebook.com/'
                      className='fab fa-facebook-f btn-facebook' rel='noreferrer'
                    ></a>
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
