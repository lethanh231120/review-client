import React, { useContext, useEffect } from 'react'
// / React router dom
import { Link } from 'react-router-dom'

// images
import logo1 from './../../../images/logo/gear5_logo_notext1.webp'
import logotext1 from './../../../images/logo/logo-text.webp'
import logoColor from './../../../images/logo/gear5_logo_notext.png'
import { ShowFullSearchConext } from '../../../App'
import { ToggleContext } from '../../index'
import { PathNameContext } from '../../index'

export function NavMenuToggle() {
  setTimeout(() => {
    const mainwrapper = document.querySelector('#main-wrapper')
    if (mainwrapper.classList.contains('menu-toggle')) {
      mainwrapper.classList.remove('menu-toggle') // big menu
    } else {
      mainwrapper.classList.add('menu-toggle') // small menu
    }
  }, 100)
}

const NavHader = () => {
  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window
      const mainwrapper = document.querySelector('#main-wrapper')
      if (width < 767.98) {
        mainwrapper.classList.remove('menu-toggle')
        toggle?.handleChangeToggle(false)
      }
    }

    handleResize()
    window.addEventListener('load', handleResize)
    window.addEventListener('resize', handleResize)
  }, [])

  const toggle = useContext(ToggleContext)
  const pathname = useContext(PathNameContext)
  // const [toggle, setToggle] = useState(false)
  const showFullSearchConext = useContext(ShowFullSearchConext)

  const viewHtml = <div className='nav-header'>
    <Link aria-label='Gear5 Logo' to='/' className='brand-logo' onClick={() => {
      pathname?.handleChangePathName('')
      pathname?.setPathDetail(false)
    }}>
      {/* no meunu left: screen width <  767px */}
      <img src={logoColor} className='logo-color' alt='logo' />

      {/* small menu left (can't expand): screen width >= 767px && < 1024px */}
      {/* big menu left (when expand): screen >= 1024px */}
      <img src={logo1} className='logo-abbr' alt='logo' />

      {/* big menu left (when expand): screen >= 1024px */}
      <img src={logotext1} className='brand-title' alt='logo' />
    </Link>

    <div
      className='nav-control'
      onClick={() => {
        toggle?.handleChangeToggle(!toggle?.toggle)
        NavMenuToggle()
      }}
    >
      <div className={`hamburger ${toggle?.toggle ? 'is-active' : ''}`}>
        <span className='line'></span>
        <span className='line'></span>
        <span className='line'></span>
        <svg width='26' height='26' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' version='1.1' fill='none' stroke='#039F7F' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' style={{ marginTop: '0.12rem' }}>
          <path d='m2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5'/>
        </svg>
        {/* <svg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='#039F7F' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M4 12L20 12'/>
          <path d='M10 6L4.0625 11.9375V11.9375C4.02798 11.972 4.02798 12.028 4.0625 12.0625V12.0625L10 18'/>
        </svg> */}
      </div>
    </div>
  </div>

  return showFullSearchConext?.isShowFullSearchSmallMode ? '' : viewHtml
}

export default NavHader
