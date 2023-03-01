import React, { useState, useEffect, useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Modal, Tooltip } from 'antd'

// / Image
import profile from '../../../images/product/user.png'
import AccountTab, {
  logInKey,
  signUpKey
} from '../../components/common-widgets/user-form/account-tab'
import {
  SignInContext,
  Authenticated,
  SignInFromAddProductContext,
  ShowFullSearchConext,
  FormLoginSignupKeyContext,
  SummaryHomeContext
} from '../../../App'

import InputSearch from '../../components/input-search/GlobalSearch'
import { getCookie, removeCookie, STORAGEKEY } from '../../../utils/storage'
import ExpiredJWTChecker from '../../components/auth/ExpiredJWTChecker'
import Swal from 'sweetalert2'
import { ReportModalContext, AddModalContext } from '../../index'
import imgLogIn from '../../../images/svg/log-in-primary.svg'
import imgSignUp from '../../../images/svg/sign-up-primary.svg'
import { Link } from 'react-router-dom'
import { SEARCH_ICON } from '../../../images/svg/search'
import { CANCEL_ICON } from '../../../images/svg/cancel'
import { ToggleContext } from '../../index'
import './custom-header.scss'
import { PathNameContext } from '../../index'

const txtScamTooltip = 'Report Scam'
const txtAddProjectTooltip = 'Add New Project'
const txtLoginTooltip = 'Sign In'
const txtSignUpTooltip = 'Sign Up'
const minimumWidthBigScreenMode = 767

const Header = () => {
  const toggle = useContext(ToggleContext)
  const pathname = useContext(PathNameContext)
  // For fix header
  const [headerFix, setheaderFix] = useState(false)
  const [isSmallMode, setIsSmallMode] = useState(window.innerWidth <= minimumWidthBigScreenMode)
  const showFullSearchConext = useContext(ShowFullSearchConext)
  const formLoginSignupKeyContext = useContext(FormLoginSignupKeyContext)
  const summaryData = useContext(SummaryHomeContext)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setheaderFix(window.scrollY > 50)
    })
    window.addEventListener('resize', () => {
      setIsSmallMode(window.innerWidth <= minimumWidthBigScreenMode)
    })
  }, [])

  const authenticated = useContext(Authenticated)
  const signContext = useContext(SignInContext)
  const reportModal = useContext(ReportModalContext)
  const addModal = useContext(AddModalContext)
  const signInFromAddProductContext = useContext(SignInFromAddProductContext)
  // const [pathName, setPathName] = useState()

  const handleAddProject = () => {
    // already log in
    if (userInfo) {
      addModal?.handleSetOpenModal(true)
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Please login first',
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
          formLoginSignupKeyContext?.setLoginSignupFormactiveTabKey(logInKey)
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

  const logedInHtml = <Dropdown
    as='li'
    className='nav-item dropdown header-profile'

  >
    <Dropdown.Toggle
      variant=''
      className='nav-link i-false c-pointer'
    >
      <Tooltip title={userInfo?.userName} placement='left'>
        <img
          src={userInfo?.image ? userInfo?.image : profile}
          width={20}
          alt='User Avatar'
          style={{ backgroundColor: '#EFECE8' }} // same background of image
        />
      </Tooltip>
    </Dropdown.Toggle>
    <Dropdown.Menu
      align='right'
      className='dropdown-menu dropdown-menu-end'
    >
      <Link
        to='#'
        className='dropdown-item ai-icon'
        onClick={() => {
          const isShowLogout = document.getElementsByClassName('dropdown-menu dropdown-menu-end dropdown-menu show').length > 0
          if (isShowLogout) {
            logout()
          }
        }}
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
      </Link>
    </Dropdown.Menu>

  </Dropdown>

  const loginHtml = <ul className=''>
    <Dropdown
      as='li'
      className='nav-item dropdown notification_dropdown'
    >
      <Tooltip title={txtLoginTooltip} placement='left'>
        <Dropdown.Toggle
          variant=''
          as='a'
          className='nav-link  ai-icon i-false c-pointer button-login-home'
          role='button'
          onClick={() => {
            formLoginSignupKeyContext?.setLoginSignupFormactiveTabKey(logInKey)
            signContext?.handleSetOpenModal(true)
          }}
        >
          <img src={imgLogIn} alt='err' />
        </Dropdown.Toggle>
      </Tooltip>
    </Dropdown>
  </ul>

  const signupHtml = <ul className=''>
    <Dropdown
      as='li'
      className='nav-item dropdown notification_dropdown'
    >
      <Tooltip title={txtSignUpTooltip} placement='left'>
        <Dropdown.Toggle
          variant=''
          as='a'
          className='nav-link  ai-icon i-false c-pointer button-signup-home'
          role='button'
          onClick={() => {
            formLoginSignupKeyContext?.setLoginSignupFormactiveTabKey(signUpKey)
            signContext?.handleSetOpenModal(true)
          }}
        >
          <img src={imgSignUp} alt='err' />
        </Dropdown.Toggle>
      </Tooltip>
    </Dropdown>
  </ul>

  const reportScamHtml = <div className='report-scam'>
    <div className='coccoc-alo-phone report-scam-image-position'>
      {/* <div className='coccoc-alo-ph-circle' style={{ backgroundColor: 'red' }}></div> */}
      <div className='coccoc-alo-ph-circle-fill' style={{ backgroundColor: 'red' }}></div>
      <Tooltip title={txtScamTooltip} placement='left'>
        <div className='coccoc-alo-ph-img-circle report-scam-image'
          onClick={() => reportModal?.handleSetOpenModal(true)}
        ></div>
      </Tooltip>
    </div>
  </div>

  const addProjectHtml = <div className='add-project'>
    <div className='coccoc-alo-phone add-project-image-position'>
      {/* <div className='coccoc-alo-ph-circle' style={{ backgroundColor: 'green' }}></div> */}
      <div className='coccoc-alo-ph-circle-fill' style={{ backgroundColor: '#039f7f' }}></div>
      <Tooltip title={txtAddProjectTooltip} placement='left'>
        <div className='coccoc-alo-ph-img-circle add-project-image' onClick={handleAddProject} ></div>
      </Tooltip>
    </div>
  </div>

  const miniSearchHtml = <ul className=''>
    <Dropdown
      as='li'
      className='nav-item dropdown notification_dropdown '
    >
      <Dropdown.Toggle
        variant=''
        as='a'
        className='nav-link  ai-icon i-false c-pointer button-add-project-home'
        role='button'
        onClick={() => showFullSearchConext?.setIsShowFullSearchSmallMode(!showFullSearchConext?.isShowFullSearchSmallMode)}
      >
        { showFullSearchConext?.isShowFullSearchSmallMode ? CANCEL_ICON('#18A493', 17.5, 17.5) : SEARCH_ICON('', 17.5, 17.5) }
      </Dropdown.Toggle>
    </Dropdown>
  </ul>

  return (
    <>
      <Modal
        open={signContext?.openModalSignIn}
        onCancel={onCloseLoginSignupForm}
        onOk={onCloseLoginSignupForm}
        footer={false}
        destroyOnClose={true}
        show={signContext?.openModalSignIn}
        style={{ zIndex: '9999' }}
      >
        <AccountTab activeTabKey={formLoginSignupKeyContext?.loginSignupFormactiveTabKey} />
      </Modal>
      <div className={`header ${headerFix ? 'is-fixed' : ''} ${showFullSearchConext?.isShowFullSearchSmallMode ? 'p-0' : ''}`}>
        <div className={`header-content ${showFullSearchConext?.isShowFullSearchSmallMode ? 'p-0 margin-left-0-3rem' : ''}`}>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              <div className='header-left'>
                <h1
                  className='dashboard_bar text-etc-overflow'
                  style={{
                    textTransform: 'capitalize',
                    fontSize: '1.5rem'
                  }}
                >
                  {pathname?.pathName !== '' ? pathname?.pathName : `Don't trust, verify`}
                </h1>
              </div>
              {/* header: search elk input */}
              <div
                className='navbar-nav header-right'
                style={{ width: isSmallMode ? '100%' : '60%' }}
              >
                <div
                  className='nav-item d-flex align-items-center'
                  style={{ width: '100%' }}
                >
                  {isSmallMode ? (showFullSearchConext?.isShowFullSearchSmallMode ? <InputSearch /> : '') : (summaryData && <InputSearch />) }
                </div>
                {/* side-bar right */}
                <div className='dz-side-menu'>
                  { isSmallMode ? miniSearchHtml : '' }
                  <div className='search-coundry d-flex align-items-center'>
                  </div>
                  <div className='sidebar-social-link '>
                    <div className={toggle?.toggle ? 'display-block-btn' : 'display-none-btn'}>
                      {reportScamHtml}
                      {addProjectHtml}
                    </div>
                    {isSmallMode ? (showFullSearchConext?.isShowFullSearchSmallMode || authenticated?.isAuthenticated ? '' : signupHtml) : '' }
                  </div>
                  <ul>
                    {authenticated?.isAuthenticated ? (
                      <>
                        <ExpiredJWTChecker logout={logout} />
                        {showFullSearchConext?.isShowFullSearchSmallMode ? '' : logedInHtml}
                      </>
                    )
                      : <>
                        {showFullSearchConext?.isShowFullSearchSmallMode ? '' : loginHtml}
                        {isSmallMode ? '' : signupHtml}
                      </>
                    }
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

