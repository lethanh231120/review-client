import React, { useState, useEffect, useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Modal } from 'antd'

// / Image
import imgMoon from '../../../images/moon.png'
import imgSun from '../../../images/sun.png'
import profile from '../../../images/product/user.png'
import { ThemeContext } from '../../../context/ThemeContext'
import AccountTab, {
  logInKey,
  signUpKey
} from '../../components/common-widgets/user-form/account-tab'
import { SignInContext, Authenticated, SignInFromAddProductContext } from '../../../App'

import InputSearch from '../../components/input-search/GlobalSearch'
import { getCookie, removeCookie, STORAGEKEY } from '../../../utils/storage'
import ExpiredJWTChecker from '../../components/auth/ExpiredJWTChecker'
import Swal from 'sweetalert2'
import { Tooltip } from 'antd'
import { ReportModalContext, AddModalContext } from '../../index'

const txtScamTooltip = 'Report scam token/ coin/ exchange/ dapp here.'
const txtAddProjectTooltip = 'Contribute us new project(token/ coin/ exchange/ dapp) here.'
const txtLoginTooltip = 'Log In'
const txtSignUpTooltip = 'Sign Up'

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
  const reportModal = useContext(ReportModalContext)
  const addModal = useContext(AddModalContext)
  const signInFromAddProductContext = useContext(SignInFromAddProductContext)

  const handleAddProject = () => {
    // already log in
    if (userInfo) {
      addModal?.handleSetOpenModal(true)
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Please log in first',
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
          // keep state in context, login form raise when click add project
          signInFromAddProductContext?.setIsOpenModalAddProduct(true)
          signContext?.handleSetOpenModal(true)
        }
      })
    }
  }

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
      timer: 800,
      timerProgressBar: true
    })

    Toast.fire({
      icon: 'success',
      title: 'Log Out ...'
    })
  }

  const onCloseLoginSignupForm = () => {
    signContext?.handleSetOpenModal(false)
    signInFromAddProductContext?.setIsOpenModalAddProduct(false) // reset state add product form when close login form
  }

  return (
    <>
      <Modal
        open={signContext?.openModalSignIn}
        onCancel={onCloseLoginSignupForm}
        onOk={onCloseLoginSignupForm}
        footer={false}
        destroyOnClose={true}
        show={signContext?.openModalSignIn}
      >
        <AccountTab activeTabKey={activeTabKey} />
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
                ></div>
              </div>
              {/* header: search elk input */}
              <div className='navbar-nav header-right'>
                <div className='nav-item d-flex align-items-center '>
                  <InputSearch />
                </div>
                {/* side-bar right */}
                <div className='dz-side-menu'>
                  <div
                    className='search-coundry d-flex align-items-center'
                    onClick={() => onChangeTheme()}
                  >
                    <img
                      hidden={true}
                      src={isLightTheme ? imgMoon : imgSun}
                      alt=''
                      className='mx-2'
                      height={24}
                      width={24}
                    />
                  </div>

                  {/* Scam report, add product */}
                  <div className='sidebar-social-link '>
                    {/* Scam report */}
                    <ul className=''>
                      <Dropdown
                        as='li'
                        className='nav-item dropdown notification_dropdown '
                        onClick={() => reportModal?.handleSetOpenModal(true)}
                      >
                        <Tooltip title={txtScamTooltip} placement='left'>
                          <Dropdown.Toggle
                            variant=''
                            as='a'
                            className='nav-link  ai-icon i-false c-pointer'
                            role='button'
                          >
                            <svg width='24' height='24' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>
                              <g id='Layer_2' data-name='Layer 2'>
                                <g id='invisible_box' data-name='invisible box'>
                                  <rect width='48' height='48' fill='none'/>
                                </g>
                                <g id='Q3_icons' data-name='Q3 icons'>
                                  <g>
                                    <path d='M39.2,16h0L37.3,6.2A4,4,0,0,0,33.4,3H29.1a3.9,3.9,0,0,0-3.4,1.9L24,7.8,22.3,4.9A3.9,3.9,0,0,0,18.9,3H14.6a4,4,0,0,0-3.9,3.2L8.7,16C4.6,17.2,2,19,2,21s1.9,3.2,5,4.4V40.2a1.9,1.9,0,0,0,1.5,1.9l12,2.9a2.4,2.4,0,0,0,2.1-.8L24,42.5l1.4,1.7A2.1,2.1,0,0,0,27,45h.5l12-2.9A1.9,1.9,0,0,0,41,40.2V25.4c3.1-1.2,5-2.7,5-4.4S43.4,17.2,39.2,16ZM37,38.6l-9.2,2.2L25.6,38a2.2,2.2,0,0,0-3.2,0l-2.2,2.8L11,38.6v-12A55,55,0,0,0,24,28a55,55,0,0,0,13-1.4ZM24,24c-8.8,0-14.8-1.7-17.1-3a16.5,16.5,0,0,1,3-1.2l2.3-.7.5-2.4L14.6,7h4.3l1.7,2.8a3.9,3.9,0,0,0,6.8,0L29.1,7h4.3l1.9,9.7.5,2.4,2.3.7a16.5,16.5,0,0,1,3,1.2C38.8,22.3,32.8,24,24,24Z'/>
                                    <path d='M17,32c-2,0-4-.1-4,1s2,3,4,3,4-.9,4-2S19,32,17,32Z'/>
                                    <path d='M31,36c2,0,4-1.9,4-3s-2-1-4-1-4,.9-4,2S29,36,31,36Z'/>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </Dropdown.Toggle>
                        </Tooltip>
                      </Dropdown>
                    </ul>
                    {/* Add product */}
                    <ul className=''>
                      <Dropdown
                        as='li'
                        className='nav-item dropdown notification_dropdown '
                        onClick={handleAddProject}
                      >
                        <Tooltip title={txtAddProjectTooltip} placement='left'>
                          <Dropdown.Toggle
                            variant=''
                            as='a'
                            className='nav-link  ai-icon i-false c-pointer'
                            role='button'
                          >
                            <svg fill='#000000' width='24' height='24' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                              <path d='M30.303 6.786c-5.167-1.39-9.694-3.383-13.826-5.952l0.217 0.125c-0.195-0.131-0.435-0.209-0.693-0.209s-0.498 0.078-0.698 0.212l0.005-0.003c-3.916 2.441-8.443 4.434-13.252 5.743l-0.358 0.083c-0.548 0.141-0.946 0.63-0.946 1.213 0 0.099 0.012 0.196 0.034 0.289l-0.002-0.008c0.541 2.352 5.571 22.971 15.218 22.971 9.648 0 14.676-20.619 15.219-22.971 0.020-0.084 0.032-0.181 0.032-0.28 0-0.583-0.399-1.073-0.939-1.211l-0.009-0.002zM16 28.75c-6.109 0-10.827-13.394-12.497-19.868 4.756-1.374 8.904-3.212 12.732-5.524l-0.235 0.132c3.593 2.18 7.74 4.018 12.125 5.3l0.371 0.093c-1.668 6.475-6.387 19.868-12.496 19.868zM14.75 10.831v3.919h-3.919c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h3.919v3.92c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-3.92h3.92c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0h-3.92v-3.919c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0z'></path>
                            </svg>
                          </Dropdown.Toggle>
                        </Tooltip>
                      </Dropdown>
                    </ul>
                  </div>

                  {/* PROFILE */}
                  <ul>
                    {authenticated?.isAuthenticated ? (
                      <>
                        <ExpiredJWTChecker logout={logout} />
                        <Dropdown
                          as='li'
                          className='nav-item dropdown header-profile'
                        >
                          <Dropdown.Toggle
                            variant=''
                            as='a'
                            className='nav-link i-false c-pointer'
                          >
                            <Tooltip
                              title={userInfo?.userName}
                              placement='left'
                            >
                              <img
                                src={
                                  userInfo?.image ? userInfo?.image : profile
                                }
                                width={20}
                                alt=''
                                style={{ backgroundColor: '#EFECE8' }} // same background of image
                              />
                            </Tooltip>
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            align='right'
                            className='dropdown-menu dropdown-menu-end'
                          >
                            {/* <LogoutPage /> */}
                            <>
                              <button
                                className='dropdown-item ai-icon ms-1'
                                onClick={logout}
                              >
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
                            <Tooltip title={txtLoginTooltip} placement='left'>
                              <Dropdown.Toggle
                                variant=''
                                as='a'
                                className='nav-link  ai-icon i-false c-pointer'
                                role='button'
                              >
                                <svg
                                  width='24'
                                  height='24'
                                  viewBox='0 0 20 20'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    fill='#555'
                                    d='M9.76076555,0 C15.4157386,0 20,4.4771525 20,10 C20,15.5228475 15.4157386,20 9.76076555,20 C6.56885647,20 3.61836948,18.5634688 1.68988581,16.1544725 C1.46202241,15.8698333 1.51356853,15.4586837 1.80501731,15.2361442 C2.09646608,15.0136047 2.51745178,15.0639465 2.74531518,15.3485857 C4.4225344,17.443711 6.98554674,18.6915888 9.76076555,18.6915888 C14.6758356,18.6915888 18.6602871,14.8002319 18.6602871,10 C18.6602871,5.19976806 14.6758356,1.30841121 9.76076555,1.30841121 C7.02601512,1.30841121 4.49642844,2.51988396 2.81675903,4.5633425 C2.58516542,4.84509553 2.16355149,4.89014431 1.87505796,4.66396176 C1.58656443,4.43777922 1.54043793,4.02601608 1.77203154,3.74426305 C3.70333647,1.39466883 6.61544133,0 9.76076555,0 Z M10.3053281,6.86239745 L13.0119569,9.56902627 C13.2735521,9.83062149 13.2785069,10.2497964 13.0230237,10.5052795 L10.3796339,13.1486694 C10.1241507,13.4041526 9.70497582,13.3991978 9.4433806,13.1376026 C9.18178539,12.8760073 9.1768306,12.4568325 9.43231378,12.2013493 L10.98,10.6534046 L0.669856459,10.6542056 C0.299904952,10.6542056 7.72715225e-14,10.3613078 7.72715225e-14,10 C7.72715225e-14,9.63869222 0.299904952,9.34579439 0.669856459,9.34579439 L10.938,9.34540456 L9.38014161,7.78758389 C9.11854639,7.52598867 9.11359161,7.1068138 9.36907479,6.85133062 C9.62455797,6.59584744 10.0437328,6.60080223 10.3053281,6.86239745 Z'
                                  />
                                </svg>
                              </Dropdown.Toggle>
                            </Tooltip>
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
                            <Tooltip title={txtSignUpTooltip} placement='left'>
                              <Dropdown.Toggle
                                variant=''
                                as='a'
                                className='nav-link  ai-icon i-false c-pointer'
                                role='button'
                              >
                                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                  <circle cx='10' cy='8' r='4' stroke='#222222' strokeLinecap='round'/>
                                  <path d='M15.7956 20.4471C15.4537 19.1713 14.7004 18.0439 13.6526 17.2399C12.6047 16.4358 11.3208 16 10 16C8.6792 16 7.3953 16.4358 6.34743 17.2399C5.29957 18.0439 4.5463 19.1713 4.20445 20.4471' stroke='#222222' strokeLinecap='round'/>
                                  <path d='M19 10L19 16' stroke='#222222' strokeLinecap='round'/>
                                  <path d='M22 13L16 13' stroke='#222222' strokeLinecap='round'/>
                                </svg>
                              </Dropdown.Toggle>
                            </Tooltip>
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
