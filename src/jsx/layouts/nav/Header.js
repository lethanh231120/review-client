import React, { useState, useEffect, useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
// import { Modal } from 'antd'
import { Modal, Button } from 'react-bootstrap'

// / Image
import imgMoon from '../../../images/moon.png'
import imgSun from '../../../images/sun.png'
import profile from '../../../images/product/user.png'
import { ThemeContext } from '../../../context/ThemeContext'
import AccountTab, { logInKey, signUpKey } from '../../components/common-widgets/user-form/account-tab'
import { SignInContext, Authenticated } from '../../../App'

import InputSearch from '../../components/input-search/GlobalSearch'
import { getCookie, removeCookie, STORAGEKEY } from '../../../utils/storage'
import ExpiredJWTChecker from '../../components/auth/ExpiredJWTChecker'
import Swal from 'sweetalert2'

const Header = () => {
  const [isLightTheme, setIsLightTheme] = useState(true)
  // For fix header
  const [headerFix, setheaderFix] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('')

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setheaderFix(window.scrollY > 50)
    })
  }, [])

  const { changeBackground, backgroundOption, colors, chnageHaderColor } =
    useContext(ThemeContext)
  const authenticated = useContext(Authenticated)
  const signContext = useContext(SignInContext)
  const onChangeTheme = () => {
    // only 2 state: light or dark in config
    if (backgroundOption.length === 2) {
      // Current: Light theme --> change to Dark theme
      if (isLightTheme) {
        changeBackground(backgroundOption[1]) // { value: 'dark', label: 'Dark' }
        // Dark purple at position 4 in array
        if (colors.length >= 4) {
          const colorDarkPurple = colors[3]
          chnageHaderColor(colorDarkPurple)
        }
      } else {
        // Current: Dark theme --> change to Light theme
        changeBackground(backgroundOption[0]) // { value: 'light', label: 'Light' }
        // White at position 4 in array
        if (colors.length >= 1) {
          const colorWhite = colors[0]
          chnageHaderColor(colorWhite)
        }
      }
      setIsLightTheme(!isLightTheme)
    }
  }

  const userInfo = getCookie(STORAGEKEY?.USER_INFO)

  const logout = () => {
    removeCookie(STORAGEKEY.ACCESS_TOKEN)
    removeCookie(STORAGEKEY.USER_INFO)
    authenticated.handleSetAuthenticated(false)
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 600,
      timerProgressBar: true
    })

    Toast.fire({
      icon: 'success',
      title: 'Log Out ...'
    })
  }

  return (
    <>
      {/* <Modal
        open={signContext?.openModalSignIn}
        onCancel={() => signContext?.handleSetOpenModal(false)}
        onOk={() => signContext?.handleSetOpenModal(false)}
        footer={false}
        destroyOnClose={true}
      >
        <AccountTab activeTabKey={activeTabKey} />
      </Modal> */}

      <Modal className='fade cus-modal' show={signContext?.openModalSignIn}>
        <Modal.Header className='cus-modal'>
          <Modal.Title>Modal title</Modal.Title>
          <Button
            variant=''
            className='btn-close'
            onClick={() => signContext?.handleSetOpenModal(false)}
          >

          </Button>
        </Modal.Header>
        <Modal.Body className='cus-modal'>
          <AccountTab activeTabKey={activeTabKey} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            onClick={() => setBasicModal(false)}
            variant='danger light'
          >
                      Close
          </Button>
          <Button variant='primary'>Save changes</Button>
        </Modal.Footer> */}
      </Modal>
      <div className={`header ${headerFix ? 'is-fixed' : ''}`}>
        <div className='header-content'>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              {/* header: text */}
              <div className='header-left'>
                <div
                  className='dashboard_bar'
                  style={{ textTransform: 'capitalize' }}
                >
                </div>
              </div>
              {/* header: search elk input */}
              <div className='navbar-nav header-right'>
                <div className='nav-item d-flex align-items-center'>
                  <InputSearch />
                </div>
                {/* side-bar right */}
                <div className='dz-side-menu'>
                  <div
                    className='search-coundry d-flex align-items-center'
                    onClick={() => onChangeTheme()}
                  >
                    <img
                      src={isLightTheme ? imgMoon : imgSun}
                      alt=''
                      className='mx-2'
                      height={24}
                      width={24}
                    />
                  </div>

                  {/* Settings */}
                  {/* <div className='sidebar-social-link '>
                    <ul className=''>
                      <Dropdown
                        as='li'
                        className='nav-item dropdown notification_dropdown '
                      >
                        <Dropdown.Toggle
                          variant=''
                          as='a'
                          className='nav-link  ai-icon i-false c-pointer'
                          role='button'
                        >
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              clipRule='evenodd'
                              d='M20.4023 13.4798C20.7599 13.6577 21.0359 13.9387 21.23 14.2197C21.6082 14.8003 21.5775 15.5121 21.2096 16.1395L20.4942 17.2634C20.1161 17.8627 19.411 18.2373 18.6854 18.2373C18.3277 18.2373 17.9291 18.1437 17.6021 17.9564C17.3364 17.7972 17.0298 17.741 16.7028 17.741C15.691 17.741 14.8428 18.5183 14.8121 19.4455C14.8121 20.5225 13.8719 21.3653 12.6967 21.3653H11.3068C10.1214 21.3653 9.18116 20.5225 9.18116 19.4455C9.16072 18.5183 8.3125 17.741 7.30076 17.741C6.96351 17.741 6.65693 17.7972 6.40144 17.9564C6.07441 18.1437 5.66563 18.2373 5.31816 18.2373C4.58235 18.2373 3.8772 17.8627 3.49908 17.2634L2.79393 16.1395C2.4158 15.5308 2.39536 14.8003 2.77349 14.2197C2.937 13.9387 3.24359 13.6577 3.59106 13.4798C3.8772 13.3487 4.06116 13.1333 4.23489 12.8804C4.74587 12.075 4.43928 11.0167 3.57062 10.5391C2.55888 10.0053 2.23185 8.81591 2.81437 7.88875L3.49908 6.78366C4.09181 5.8565 5.35904 5.52871 6.381 6.0719C7.2701 6.52143 8.42491 6.22174 8.94611 5.4257C9.10962 5.16347 9.2016 4.88251 9.18116 4.60156C9.16072 4.23631 9.27314 3.8898 9.46731 3.60884C9.84543 3.0282 10.5301 2.65359 11.2762 2.63486H12.7171C13.4734 2.63486 14.1581 3.0282 14.5362 3.60884C14.7202 3.8898 14.8428 4.23631 14.8121 4.60156C14.7917 4.88251 14.8837 5.16347 15.0472 5.4257C15.5684 6.22174 16.7232 6.52143 17.6225 6.0719C18.6343 5.52871 19.9117 5.8565 20.4942 6.78366L21.1789 7.88875C21.7717 8.81591 21.4447 10.0053 20.4227 10.5391C19.554 11.0167 19.2474 12.075 19.7686 12.8804C19.9322 13.1333 20.1161 13.3487 20.4023 13.4798ZM9.10962 12.0095C9.10962 13.4798 10.4075 14.6505 12.012 14.6505C13.6165 14.6505 14.8837 13.4798 14.8837 12.0095C14.8837 10.5391 13.6165 9.3591 12.012 9.3591C10.4075 9.3591 9.10962 10.5391 9.10962 12.0095Z'
                              fill='#130F26'
                            />
                          </svg>
                        </Dropdown.Toggle>
                      </Dropdown>
                    </ul>

                  </div> */}

                  {/* PROFILE */}
                  <ul>
                    {authenticated?.isAuthenticated ? (
                      <>
                        <ExpiredJWTChecker logout={logout}/>
                        <Dropdown
                          as='li'
                          className='nav-item dropdown header-profile'
                        >
                          <Dropdown.Toggle
                            variant=''
                            as='a'
                            className='nav-link i-false c-pointer'
                          >
                            <img
                              src={userInfo?.image ? userInfo?.image : profile}
                              width={20}
                              alt=''
                              style={{ backgroundColor: '#EFECE8' }} // same background of image
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            align='right'
                            className='dropdown-menu dropdown-menu-end'
                          >
                            {/* <LogoutPage /> */}
                            <>
                              <button className='dropdown-item ai-icon ms-1' onClick={logout}>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='text-primary'
                                  width='18'
                                  height='18'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                >
                                  <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                                  <polyline points='16 17 21 12 16 7'></polyline>
                                  <line x1='21' y1='12' x2='9' y2='12'></line>
                                </svg>
                                <span className='ms-2'>Logout</span>
                              </button>
                            </>
                          </Dropdown.Menu>
                        </Dropdown>
                        <div style={{ wordBreak: 'break-all' }}>{userInfo?.userName}</div>
                      </>
                    ) : (
                      <>
                        <ul className=''>
                          <Dropdown
                            as='li'
                            className='nav-item dropdown notification_dropdown'
                            onClick={() => {
                              setActiveTabKey(logInKey)
                              signContext?.handleSetOpenModal(true)
                            }}
                          >
                            <Dropdown.Toggle
                              variant=''
                              as='a'
                              className='nav-link  ai-icon i-false c-pointer'
                              role='button'
                            >
                              <svg width='24' height='24' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                                <path fill='#555' d='M9.76076555,0 C15.4157386,0 20,4.4771525 20,10 C20,15.5228475 15.4157386,20 9.76076555,20 C6.56885647,20 3.61836948,18.5634688 1.68988581,16.1544725 C1.46202241,15.8698333 1.51356853,15.4586837 1.80501731,15.2361442 C2.09646608,15.0136047 2.51745178,15.0639465 2.74531518,15.3485857 C4.4225344,17.443711 6.98554674,18.6915888 9.76076555,18.6915888 C14.6758356,18.6915888 18.6602871,14.8002319 18.6602871,10 C18.6602871,5.19976806 14.6758356,1.30841121 9.76076555,1.30841121 C7.02601512,1.30841121 4.49642844,2.51988396 2.81675903,4.5633425 C2.58516542,4.84509553 2.16355149,4.89014431 1.87505796,4.66396176 C1.58656443,4.43777922 1.54043793,4.02601608 1.77203154,3.74426305 C3.70333647,1.39466883 6.61544133,0 9.76076555,0 Z M10.3053281,6.86239745 L13.0119569,9.56902627 C13.2735521,9.83062149 13.2785069,10.2497964 13.0230237,10.5052795 L10.3796339,13.1486694 C10.1241507,13.4041526 9.70497582,13.3991978 9.4433806,13.1376026 C9.18178539,12.8760073 9.1768306,12.4568325 9.43231378,12.2013493 L10.98,10.6534046 L0.669856459,10.6542056 C0.299904952,10.6542056 7.72715225e-14,10.3613078 7.72715225e-14,10 C7.72715225e-14,9.63869222 0.299904952,9.34579439 0.669856459,9.34579439 L10.938,9.34540456 L9.38014161,7.78758389 C9.11854639,7.52598867 9.11359161,7.1068138 9.36907479,6.85133062 C9.62455797,6.59584744 10.0437328,6.60080223 10.3053281,6.86239745 Z'/>
                              </svg>
                            </Dropdown.Toggle>
                          </Dropdown>
                        </ul>
                        <ul className=''>
                          <Dropdown
                            as='li'
                            className='nav-item dropdown notification_dropdown'
                            onClick={() => {
                              signContext?.handleSetOpenModal(true)
                              setActiveTabKey(signUpKey)
                            }}
                          >
                            <Dropdown.Toggle
                              variant=''
                              as='a'
                              className='nav-link  ai-icon i-false c-pointer'
                              role='button'
                            >
                              <svg width='24' height='24' viewBox='0 0 512 512' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                                <title>log-in</title>
                                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                                  <g id='icon' fill='#000000' transform='translate(42.666667, 42.666667)'>
                                    <path d='M405.333333,3.55271368e-14 L405.333333,426.666667 L170.666667,426.666667 L170.666667,341.333333 L213.333333,341.333333 L213.333333,384 L362.666667,384 L362.666667,42.6666667 L213.333333,42.6666667 L213.333333,85.3333333 L170.666667,85.3333333 L170.666667,3.55271368e-14 L405.333333,3.55271368e-14 Z M74.6666667,138.666667 C108.491057,138.666667 137.06239,161.157677 146.241432,192.000465 L320,192 L320,234.666667 L298.666667,234.666667 L298.666667,277.333333 L234.666667,277.333333 L234.666667,234.666667 L146.241432,234.666202 C137.06239,265.508989 108.491057,288 74.6666667,288 C33.4294053,288 7.10542736e-15,254.570595 7.10542736e-15,213.333333 C7.10542736e-15,172.096072 33.4294053,138.666667 74.6666667,138.666667 Z M74.6666667,181.333333 C56.9935547,181.333333 42.6666667,195.660221 42.6666667,213.333333 C42.6666667,231.006445 56.9935547,245.333333 74.6666667,245.333333 C92.3397787,245.333333 106.666667,231.006445 106.666667,213.333333 C106.666667,195.660221 92.3397787,181.333333 74.6666667,181.333333 Z' id='Combined-Shape'>
                                    </path>
                                  </g>
                                </g>
                              </svg>
                            </Dropdown.Toggle>
                          </Dropdown>
                        </ul>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header
