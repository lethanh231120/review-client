import React, { useState, useEffect, useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
// / Scroll
// import PerfectScrollbar from "react-perfect-scrollbar";
import LogoutPage from './Logout'

// / Image
import imgMoon from '../../../images/moon.png'
import imgSun from '../../../images/sun.png'
import profile from '../../../images/profile/pic1.jpg'
import { ThemeContext } from '../../../context/ThemeContext'
import AccountTab, {
  logInKey,
  signUpKey
} from '../../components/common-widgets/user-form/account-tab'
// import { SignInComponent } from '../../components/common-widgets/user-form/sign-in-form'
import { SignInContext } from '../../../context/SignInContext'

const Header = ({ onNote }) => {
  const [isLightTheme, setIsLightTheme] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  // For fix header
  const [headerFix, setheaderFix] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('')

  const showModal = (activeTabKey) => {
    setIsModalOpen(true)
    setActiveTabKey(activeTabKey)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setheaderFix(window.scrollY > 50)
    })
  }, [])

  const { changeBackground, backgroundOption, colors, chnageHaderColor } =
    useContext(ThemeContext)
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

  const onOpenModalLogInSignUp = () => {
    signContext?.handleSetOpenModal(true)
    setIsLogin(true)
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={hideModal}
        footer={false}
        destroyOnClose={true}
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
                >
                  Gear 5
                </div>
              </div>
              {/* header: search elk input */}
              <div className='navbar-nav header-right'>
                <div className='nav-item d-flex align-items-center'>
                  <div className='input-group search-area'>
                    <span className='input-group-text'>
                      <Link to={'#'}>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 32 32'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M27.414 24.586L22.337 19.509C23.386 17.928 24 16.035 24 14C24 8.486 19.514 4 14 4C8.486 4 4 8.486 4 14C4 19.514 8.486 24 14 24C16.035 24 17.928 23.386 19.509 22.337L24.586 27.414C25.366 28.195 26.634 28.195 27.414 27.414C28.195 26.633 28.195 25.367 27.414 24.586ZM7 14C7 10.14 10.14 7 14 7C17.86 7 21 10.14 21 14C21 17.86 17.86 21 14 21C10.14 21 7 17.86 7 14Z'
                            fill='var(--secondary)'
                          />
                        </svg>
                      </Link>
                    </span>
                    <input
                      type='text'
                      className='form-control '
                      placeholder='Search here...'
                    />
                  </div>
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

                  {/*  */}
                  <div className='sidebar-social-link '>
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
                  </div>

                  {/* PROFILE */}
                  <ul>
                    {isLogin ? (
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
                            src={profile}
                            width={20}
                            alt=''
                            onClick={() => onOpenModalLogInSignUp()}
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu
                          align='right'
                          className='dropdown-menu dropdown-menu-end'
                        >
                          <LogoutPage />
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <>
                        <Dropdown
                          as='li'
                          className='nav-item dropdown header-profile'
                          onClick={() => showModal(logInKey)}
                        >
                          <span className='btn-header btn-header-sign-in'>
                            Log&nbsp;In
                          </span>
                        </Dropdown>
                        <Dropdown
                          as='li'
                          className='nav-item dropdown header-profile'
                          onClick={() => showModal(signUpKey)}
                        >
                          <span className='btn-header btn-header-sign-up'>
                            Sign&nbsp;Up
                          </span>
                        </Dropdown>
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
