import React, { useState } from 'react'
// / React router dom
import { Link } from 'react-router-dom'
// import { ThemeContext } from '../../../context/ThemeContext'

// images
// import gear5Logo from './../../../images/logo/gear5-logo.png'
import gear5LogoNotext from './../../../images/logo/gear5_logo_notext1.png'
import gear5LogoWhite from './../../../images/logo/logo-gear5-white.png'
// import logotext1 from './../../../images/logo/logo-text.png'
// import logoColor from './../../../images/logo/logo-color.png'
// import logoColorText from './../../../images/logo/logo-text-color.png'

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

const NavHader = () => {
  const [toggle, setToggle] = useState(false)
  // const { navigationHader, openMenuToggle, background } =
  //   useContext(ThemeContext)
  return (
    <div className='nav-header'>
      <Link to='/' className='brand-logo'>
        {toggle ? <img src={gear5LogoNotext} className='logo-abbr img-fluid' alt='' /> : <img src={gear5LogoWhite} className='brand-title img-fluid' alt='' />}
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
  )
}

export default NavHader
