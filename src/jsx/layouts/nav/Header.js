import React, { useState, useEffect, useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Modal } from 'antd'

// / Image
import profile from '../../../images/product/user.png'
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
import imgAddProject from '../../../images/svg/add-project.svg'
import imgReportProject from '../../../images/svg/report-project-primary.svg'
import imgLogIn from '../../../images/svg/log-in-primary.svg'
import imgSignUp from '../../../images/svg/sign-up-primary.svg'

const txtScamTooltip = 'Report Scam'
const txtAddProjectTooltip = 'Add New Project'
const txtLoginTooltip = 'Log In'
const txtSignUpTooltip = 'Sign Up'

const Header = () => {
  // For fix header
  const [headerFix, setheaderFix] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('')

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setheaderFix(window.scrollY > 50)
    })
  }, [])

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
        title: 'Please log-in first',
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
                  className='dashboard_bar text-etc-overflow'
                  style={{ textTransform: 'capitalize', padding: '0 2rem', fontSize: '1.5rem' }}
                >
                  {`Don't trust verify`}
                </div>
              </div>
              {/* header: search elk input */}
              <div className='navbar-nav header-right'>
                <div className='nav-item d-flex align-items-center '>
                  <InputSearch />
                </div>
                {/* side-bar right */}
                <div className='dz-side-menu'>

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
                            <img src={imgReportProject} alt='err' />
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
                            <img src={imgAddProject} alt='err' />
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
                                <img src={imgLogIn} alt='err' />
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
                                <img src={imgSignUp} alt='err' />
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
