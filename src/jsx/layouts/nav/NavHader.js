import React, { useContext } from 'react'
// / React router dom
import { Link } from 'react-router-dom'

// images
import logo1 from './../../../images/logo/gear5_logo_notext1.png'
import logotext1 from './../../../images/logo/logo-text.png'
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
  }, 0)
}

const NavHader = () => {
  const toggle = useContext(ToggleContext)
  const pathname = useContext(PathNameContext)
  // const [toggle, setToggle] = useState(false)
  const showFullSearchConext = useContext(ShowFullSearchConext)

  const viewHtml = <div className='nav-header'>
    <Link to='/' className='brand-logo' onClick={() => pathname?.handleChangePathName('')}>
      {/* no meunu left: screen width <  767px */}
      <img src={logoColor} className='logo-color' alt='' />

      {/* small menu left (can't expand): screen width >= 767px && < 1024px */}
      {/* big menu left (when expand): screen >= 1024px */}
      <img src={logo1} className='logo-abbr' alt='' />

      {/* big menu left (when expand): screen >= 1024px */}
      <img src={logotext1} className='brand-title' alt='' />
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
        <svg width='26' height='26' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' version='1.1' fill='none' stroke='#039F7F' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'>
          <path d='m2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5'/>
        </svg>
      </div>
    </div>
  </div>

  return showFullSearchConext?.isShowFullSearchSmallMode ? '' : viewHtml
}

export default NavHader
