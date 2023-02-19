import React, { useState } from 'react'
// / React router dom
import { Link } from 'react-router-dom'

// images
import logo1 from './../../../images/logo/gear5_logo_notext1.png'
import logotext1 from './../../../images/logo/logo-text.png'
import logoColor from './../../../images/logo/gear5_logo_notext.png'

export function NavMenuToggle() {
  setTimeout(() => {
    const mainwrapper = document.querySelector('#main-wrapper')
    if (mainwrapper.classList.contains('menu-toggle')) {
      mainwrapper.classList.remove('menu-toggle') // big menu
    } else {
      mainwrapper.classList.add('menu-toggle') // small menu
    }
  }, 200)
}

const NavHader = ({ isShowFullSearchSmallMode }) => {
  const [toggle, setToggle] = useState(false)

  const viewHtml = <div className='nav-header'>
    <Link to='/' className='brand-logo'>
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
        setToggle(!toggle)
        // openMenuToggle();
        NavMenuToggle()
      }}
    >
      <div className={`hamburger ${toggle ? 'is-active' : ''}`}>
        <span className='line'></span>
        <span className='line'></span>
        <span className='line'></span>
        <svg
          width='26'
          height='26'
          viewBox='0 0 26 26'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect x='22' y='11' width='4' height='4' rx='2' fill='#2A353A' />
          <rect x='11' width='4' height='4' rx='2' fill='#2A353A' />
          <rect x='22' width='4' height='4' rx='2' fill='#2A353A' />
          <rect x='11' y='11' width='4' height='4' rx='2' fill='#2A353A' />
          <rect x='11' y='22' width='4' height='4' rx='2' fill='#2A353A' />
          <rect width='4' height='4' rx='2' fill='#2A353A' />
          <rect y='11' width='4' height='4' rx='2' fill='#2A353A' />
          <rect x='22' y='22' width='4' height='4' rx='2' fill='#2A353A' />
          <rect y='22' width='4' height='4' rx='2' fill='#2A353A' />
        </svg>
      </div>
    </div>
  </div>

  return isShowFullSearchSmallMode ? '' : viewHtml
}

export default NavHader
