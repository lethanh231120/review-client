
import React, { useContext, useEffect, useState } from 'react'
// / Scroll
import PerfectScrollbar from 'react-perfect-scrollbar'
import Collapse from 'react-bootstrap/Collapse'
// / Link
import { Link } from 'react-router-dom'

import { MenuList } from './Menu'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { ThemeContext } from '../../../context/ThemeContext'

// import medal from "../../../images/medal.png";

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext)
  useEffect(() => {
    var btn = document.querySelector('.nav-control')
    var aaa = document.querySelector('#main-wrapper')
    function toggleFunc() {
      return aaa.classList.toggle('menu-toggle')
    }
    btn.addEventListener('click', toggleFunc)

    // sidebar icon Heart blast
    var handleheartBlast = document.querySelector('.heart')
    function heartBlast() {
      return handleheartBlast.classList.toggle('heart-blast')
    }
    handleheartBlast.addEventListener('click', heartBlast)
  }, [])
  // For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )

  // Menu dropdown list
  const [active, setActive] = useState('dashboard')
  const [activeSubmenu, setActiveSubmenu] = useState('')
  const handleMenuActive = (status) => {
    // alert(1);
    setActive(status)
    if (active === status) {
      setActive('')
    }
  }
  const handleSubmenuActive = (status) => {
    // alert(1);
    setActiveSubmenu(status)
    if (activeSubmenu === status) {
      setActiveSubmenu('')
    }
  }
  // Menu dropdown list End

  // / Path
  let path = window.location.pathname
  path = path.split('/')
  path = path[path.length - 1]
  // / Active menu
  return (
    <div
      className={`dlabnav  border-right ${iconHover} ${
        sidebarposition.value === 'fixed' &&
        sidebarLayout.value === 'horizontal' &&
        headerposition.value === 'static'
          ? hideOnScroll > 120
            ? 'fixed'
            : ''
          : ''
      }`}
    >
      <PerfectScrollbar className='dlabnav-scroll'>
        <p className='menu-title style-1'> Main Menu</p>
        <ul className='metismenu' id='menu'>
          {MenuList.map((data, index) => {
            const menuClass = data.classsChange
            return (
              <li
                className={` ${active === data.title ? 'mm-active' : ''}`}
                key={index}
              >
                <Link
                  className='has-arrow'
                  to='#'
                  onClick={() => handleMenuActive(data.title)}
                >
                  <i className={data.iconStyle}></i>
                  <span className='nav-text'>{data.title}</span>
                </Link>
                <Collapse in={active === data.title}>
                  <ul
                    className={`${
                      menuClass === 'mm-collapse' ? 'mm-show' : ''
                    }`}
                  >
                    {data.content &&
                      data.content.map((data, index) => {
                        return (
                          <>
                            <li
                              key={index}
                              className={`${
                                activeSubmenu === data.title ? 'mm-active' : ''
                              }`}
                            >
                              {data.content && data.content.length > 0 ? (
                                <Link
                                  to={data.to}
                                  className={data.hasMenu ? 'has-arrow' : ''}
                                  onClick={() => {
                                    handleSubmenuActive(data.title)
                                  }}
                                >
                                  {data.title}
                                </Link>
                              ) : (
                                <Link to={data.to}>{data.title}</Link>
                              )}
                              <Collapse
                                in={activeSubmenu === data.title}
                              >
                                <ul
                                  className={`${
                                    menuClass === 'mm-collapse' ? 'mm-show' : ''
                                  }`}
                                >
                                  {data.content &&
                                    data.content.map((data, index) => {
                                      return (
                                        <>
                                          <li key={index}>
                                            <Link
                                              className={`${
                                                path === data.to
                                                  ? 'mm-active'
                                                  : ''
                                              }`}
                                              to={data.to}
                                            >
                                              {data.title}
                                            </Link>
                                          </li>
                                        </>
                                      )
                                    })}
                                </ul>
                              </Collapse>
                            </li>
                          </>
                        )
                      })}
                  </ul>
                </Collapse>
              </li>
            )
          })}
        </ul>
        <div className='plus-box'>
          <div className='d-flex align-items-center'>
            <h5>Upgrade your Account to Get Free Voucher</h5>
          </div>
          <Link to={'#'} className='btn bg-white btn-sm'>
            Upgrade
          </Link>
        </div>
        <div className='copyright mt-0'>
          <p>
            <strong>Food Desk - Online Food Delivery Admin Dashboard</strong> ©
            2022 All Rights Reserved
          </p>
          <p className='fs-12'>
            Made with <span className='heart'></span> by DexignLab
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  )
}

export default SideBar
