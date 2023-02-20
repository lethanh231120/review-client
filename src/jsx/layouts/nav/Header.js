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
  SignInFromAddProductContext
} from '../../../App'

import InputSearch from '../../components/input-search/GlobalSearch'
import { getCookie, removeCookie, STORAGEKEY } from '../../../utils/storage'
import ExpiredJWTChecker from '../../components/auth/ExpiredJWTChecker'
import Swal from 'sweetalert2'
// import { Tooltip } from 'antd'
import { ReportModalContext, AddModalContext } from '../../index'
import imgAddProject from '../../../images/svg/add-project.svg'
import imgLogIn from '../../../images/svg/log-in-primary.svg'
import imgSignUp from '../../../images/svg/sign-up-primary.svg'
import imgMiniSearch from '../../../images/svg/mini-search.svg'
import imgCancelMiniSearch from '../../../images/svg/cancel-mini-search.svg'
import { Link } from 'react-router-dom'
import { SWORD_ICON } from '../../../images/svg/report-project-primary'

const txtScamTooltip = 'Report Scam'
const txtAddProjectTooltip = 'Add New Project'
const txtLoginTooltip = 'Log In'
const txtSignUpTooltip = 'Sign Up'
const minimumWidthBigScreenMode = 767

const Header = ({ isShowFullSearchSmallMode, setIsShowFullSearchSmallMode }) => {
  // For fix header
  const [headerFix, setheaderFix] = useState(false)
  const [isSmallMode, setIsSmallMode] = useState(window.innerWidth < minimumWidthBigScreenMode)
  const [activeTabKey, setActiveTabKey] = useState('')

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setheaderFix(window.scrollY > 50)
      setIsShowFullSearchSmallMode(false)
    })
    window.addEventListener('resize', () => {
      setIsSmallMode(window.innerWidth < minimumWidthBigScreenMode)
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

  const logedInHtml = <Dropdown
    as='li'
    className='nav-item dropdown header-profile'
  >
    <Dropdown.Toggle
      variant=''
      as='a'
      className='nav-link i-false c-pointer'
    >
      <Tooltip title={userInfo?.userName} placement='left'>
        <img
          src={userInfo?.image ? userInfo?.image : profile}
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
      <Link
        to='#'
        className='dropdown-item ai-icon'
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
            setActiveTabKey(logInKey)
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
            signContext?.handleSetOpenModal(true)
            setActiveTabKey(signUpKey)
          }}
        >
          <img src={imgSignUp} alt='err' />
        </Dropdown.Toggle>
      </Tooltip>
    </Dropdown>
  </ul>

  const reportScamHtml = <ul className='report-scam'>
    <Dropdown
      as='li'
      className='nav-item dropdown notification_dropdown'
    >
      <Tooltip title={txtScamTooltip} placement='left'>
        <Dropdown.Toggle
          variant=''
          as='a'
          className='nav-link  ai-icon i-false c-pointer button-report-scam-home'
          role='button'
          onClick={() => reportModal?.handleSetOpenModal(true)}
        >
          {SWORD_ICON('#18A493', 17.5, 17.5)}
        </Dropdown.Toggle>
      </Tooltip>
    </Dropdown>
  </ul>

  const addProjectHtml = <ul className='add-project'>
    <Dropdown
      as='li'
      className='nav-item dropdown notification_dropdown '
    >
      <Tooltip title={txtAddProjectTooltip} placement='left'>
        <Dropdown.Toggle
          variant=''
          as='a'
          className='nav-link  ai-icon i-false c-pointer button-add-project-home'
          role='button'
          onClick={handleAddProject}
        >
          <img src={imgAddProject} alt='err' />
        </Dropdown.Toggle>
      </Tooltip>
    </Dropdown>
  </ul>

  const miniSearchHtml = <Dropdown className='sidebar-dropdown me-2 mt-2' id='mini-search' onClick={() => setIsShowFullSearchSmallMode(!isShowFullSearchSmallMode)} style={{ display: 'flex', alignItems: 'center' }}>
    <Dropdown.Toggle as='div' className='i-false'>
      {/* image search */}
      { isShowFullSearchSmallMode ? '' : <img src={imgMiniSearch} alt='err' /> }
      <i className={`fa-solid fa-angle-${isShowFullSearchSmallMode ? 'left' : 'right'} mx-1`} />
      {/* image search */}
      { isShowFullSearchSmallMode ? <img src={imgCancelMiniSearch} alt='err' /> : '' }
    </Dropdown.Toggle>

  </Dropdown>

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
      <div className={`header ${headerFix ? 'is-fixed' : ''} ${isShowFullSearchSmallMode ? 'p-0' : ''}`}>
        <div className={`header-content ${isShowFullSearchSmallMode ? 'p-0 margin-left-0-3rem' : ''}`}>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              {/* header: text */}
              <div className='header-left'>
                <div
                  className='dashboard_bar text-etc-overflow'
                  style={{
                    textTransform: 'capitalize',
                    padding: '0 2rem',
                    fontSize: '1.5rem'
                  }}
                >
                  {`Don't trust verify`}
                </div>
              </div>
              {/* header: search elk input */}
              <div
                className='navbar-nav header-right'
                // style={{ width: '100%' }}
                style={{ width: isSmallMode ? '100%' : '60%' }}
              >
                <div
                  className='nav-item d-flex align-items-center'
                  style={{ width: '100%' }}
                >
                  {isSmallMode ? (isShowFullSearchSmallMode ? <InputSearch /> : '') : <InputSearch /> }
                </div>
                {/* side-bar right */}
                <div className='dz-side-menu'>
                  { isSmallMode ? miniSearchHtml : '' }
                  <div className='search-coundry d-flex align-items-center'>
                  </div>
                  <div className='sidebar-social-link '>
                    <ul className=''>
                      {reportScamHtml}
                      {addProjectHtml}
                      {isSmallMode ? (isShowFullSearchSmallMode || authenticated?.isAuthenticated ? '' : signupHtml) : '' }
                    </ul>
                  </div>
                  <ul>
                    {authenticated?.isAuthenticated ? (
                      <>
                        <ExpiredJWTChecker logout={logout} />
                        {isShowFullSearchSmallMode ? '' : logedInHtml}
                      </>
                    )
                      : <>
                        {isShowFullSearchSmallMode ? '' : loginHtml}
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

