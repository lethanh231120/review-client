// / Menu
import React, { useContext, useEffect, useReducer, useState } from 'react'
// / Scroll
// import PerfectScrollbar from 'react-perfect-scrollbar'
import Collapse from 'react-bootstrap/Collapse'
import { Button } from 'react-bootstrap'

// / Link
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import { useScrollPosition } from '@n8tb1t/use-scroll-position'
// import { ThemeContext } from '../../../context/ThemeContext'
// import { CategoryContext } from '../../index'
import { CategoryContext } from '../../../App'
import _ from 'lodash'
import { pair1 } from '../../../utils/formatUrl'
import { ToggleContext } from '../../index'
import './custom-header.scss'
import { WARNING_ICON } from '../../components/common-widgets/logo/logo'
import './sidebar.scss'

import { PathNameContext } from '../../index'
import { CRYPTO, DAPP, EXCHANGE, INSIGHT, LAUNCHPAD, SOON, VENTURE } from '../../constants/category'

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState
})

const initialState = {
  active: '',
  activeSubmenu: '',
  openDropdown: false
}

const headerItem1 = `Crypto Projects`
const headerItem2 = `DApps`
const headerItem3 = `Ventures`
const headerItem4 = `Exchanges`
const headerItem5 = `ICO/IDO/IEO`
const headerItem6 = `Launchpads`

const SideBar = () => {
  const path = useLocation()
  const toggle = useContext(ToggleContext)
  const pathName = useContext(PathNameContext)
  const [sizeScreen, setSizeScreen] = useState()
  const navigate = useNavigate()
  // set defaul category when no data
  const arrOrderedCategories = [
    headerItem1,
    headerItem2,
    headerItem3,
    headerItem4,
    headerItem5,
    headerItem6
  ]
  const [categories, setCategories] = useState([])
  const mapOrderedCategories = new Map() // match with data from BE
  mapOrderedCategories.set(headerItem1, false)
  mapOrderedCategories.set(headerItem2, false)
  mapOrderedCategories.set(headerItem3, false)
  mapOrderedCategories.set(headerItem4, false)
  mapOrderedCategories.set(headerItem5, false)
  mapOrderedCategories.set(headerItem6, false)
  // get category context
  const categoryContext = useContext(CategoryContext)

  const mapCategoriesMenuIcon = new Map() // match with data from BE
  mapCategoriesMenuIcon.set(headerItem1, 'paid')
  mapCategoriesMenuIcon.set(headerItem2, 'apps')
  mapCategoriesMenuIcon.set(headerItem3, 'volunteer_activism')
  mapCategoriesMenuIcon.set(headerItem4, 'currency_exchange')
  mapCategoriesMenuIcon.set(headerItem5, 'auto_graph')
  mapCategoriesMenuIcon.set(headerItem6, 'rocket_launch')

  // const { iconHover, sidebarposition, headerposition, sidebarLayout } = useContext(ThemeContext)

  const [state, setState] = useReducer(reducer, initialState)

  // For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )

  const handleMenuActive = (status) => {
    setState({ active: status })

    if (state.active === status) {
      setState({ active: '' })
    }
  }

  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status })
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: '' })
    }
  }
  // Menu dropdown list End

  useEffect(() => {
    const objCategories = [
      {
        title: 'Home',
        to: '',
        iconStyle: <i className='material-icons'>home</i>
      }

    ]
    const sortCategory = []
    for (const objCategory of mapOrderedCategories) {
      for (const key in categoryContext) {
        if (categoryContext[key]?.category?.name !== 'Scams') {
          if (
            objCategory[0] === categoryContext[key]?.category?.name &&
            !objCategory[1]
          ) {
            sortCategory.push([key, categoryContext[key]])
            objCategory[1] = !objCategory[1]
          }
        }
      }
    }

    sortCategory?.forEach((item) => {
      // filter data name !== other

      const sortSubCategory = item[1]?.subCategories
        ?.filter(
          (itemSub) => itemSub?.name !== 'Others' && itemSub?.name !== 'Other'
        )
        ?.sort((a, b) => a?.name?.localeCompare(b?.name))

      // get item have name === other
      const otherItem = item[1].subCategories.filter(
        (itemSub) => itemSub?.name === 'Others' || itemSub?.name === 'Other')

      const newContent = []
      // format data item subcategory

      sortSubCategory?.forEach((itemContent) => {
        newContent.push({
          category: item[1]?.category?.name,
          title: itemContent?.name,
          to: `${item[1]?.category?.path}/${itemContent?.name?.replace(pair1[0], pair1[1])}`
        })
      })

      // check if the otherItem exists then push to newContent
      if (!_.isEmpty(otherItem)) {
        newContent.push({
          title: otherItem[0]?.name,
          to: `${item[1]?.category?.path}/${otherItem[0]?.name}`
        })
      }

      objCategories?.push(
        newContent?.length > 0 ? {
          title: item[1]?.category?.name,
          classsChange: newContent.length > 0 ? 'mm-collapse' : '',
          iconStyle: <i className='material-icons'>{mapCategoriesMenuIcon?.get(item[1]?.category?.name)}</i>,
          content: newContent,
          to: item[1]?.category?.path
        } : {
          title: item[1]?.category?.name,
          iconStyle: <i className='material-icons'>{mapCategoriesMenuIcon?.get(item[1]?.category?.name)}</i>,
          to: item[1]?.category?.path
        })
    })

    // call api fail --> only one element home before
    if (objCategories?.length === 1) {
      arrOrderedCategories.forEach((category) => {
        objCategories.push({
          title: category,
          classsChange: '',
          iconStyle: <i className='material-icons'>{mapCategoriesMenuIcon?.get(category)}</i>,
          to: '' // home
        })
      })
    }

    objCategories?.push({
      title: 'Insights',
      classsChange: '',
      iconStyle: <i className='material-icons'>insert_chart</i>,
      to: 'insight'
    })
    setCategories(objCategories)
  }, [categoryContext])

  useEffect(() => {
    if (path?.pathname?.split('/')[1] === '') {
      setState({ active: 'Home' })
    } else if (path?.pathname?.split('/')[1] === DAPP) {
      setState({ active: 'DApps' })
    } else if (path?.pathname?.split('/')[1] === CRYPTO) {
      setState({ active: 'Crypto Projects' })
    } else if (path?.pathname?.split('/')[1] === VENTURE) {
      setState({ active: 'Ventures' })
    } else if (path?.pathname?.split('/')[1] === EXCHANGE) {
      setState({ active: 'Exchanges' })
    } else if (path?.pathname?.split('/')[1] === SOON) {
      setState({ active: 'ICO/IDO/IEO' })
    } else if (path?.pathname?.split('/')[1] === LAUNCHPAD) {
      setState({ active: 'Launchpads' })
    } else if (path?.pathname?.split('/')[1] === INSIGHT) {
      setState({ active: 'Insights' })
    } else {
      setState({ active: '' })
    }
  }, [path])

  const saveFilterTag = (type, tag) => {
    let tempType = ''
    switch (type) {
      case 'Crypto Projects':
        tempType = 'crypto'
        break
      case 'DApps':
        tempType = 'dapp'
        break
      case 'Exchanges':
        tempType = 'exchange'
        break
      case 'Upcomings':
        tempType = 'soon'
        break
    }

    if (tempType === 'soon') {
      if (window.localStorage.getItem(tempType) !== '') {
        window.localStorage.removeItem(tempType)
        window.localStorage.setItem(tempType, JSON.stringify({ launchpad: tag }))
      } else {
        window.localStorage.setItem(tempType, JSON.stringify({ launchpad: tag }))
      }
    } else {
      if (window.localStorage.getItem(tempType) !== '') {
        window.localStorage.removeItem(tempType)
        window.localStorage.setItem(tempType, JSON.stringify({ tag: tag }))
      } else {
        window.localStorage.setItem(tempType, JSON.stringify({ tag: tag }))
      }
    }
  }
  const removeFilterTag = (type, tag) => {
    let tempType = ''
    switch (type) {
      case 'Crypto Projects':
        tempType = 'crypto'
        break
      case 'DApps':
        tempType = 'dapp'
        break
      case 'Exchanges':
        tempType = 'exchange'
        break
      case 'Upcomings':
        tempType = 'soon'
        break
    }

    if (tempType === 'soon') {
      if (window.localStorage.getItem(tempType) !== '') {
        window.localStorage.removeItem(tempType)
      }
    } else {
      if (window.localStorage.getItem(tempType) !== '') {
        window.localStorage.removeItem(tempType)
      }
    }
  }
  const mainwrapper = document.querySelector('#main-wrapper')

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window
      setSizeScreen(width)
      // if (width < 767.98) {
      //   mainwrapper.classList.remove('menu-toggle')
      //   toggle?.handleChangeToggle(false)
      // }
    }

    handleResize()
    window.addEventListener('load', handleResize)
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={`deznav border-right`}
    >
      <div className='deznav-scroll'>
        {/* <PerfectScrollbar className='deznav-scroll'> */}
        <ul className='metismenu' id='menu'>
          {categories.map((data, index) => {
            const menuClass = data.classsChange
            if (menuClass === 'menu-title') {
              return (
                <li
                  className={menuClass}
                  key={index}
                >
                  {data.title}
                </li>
              )
            } else {
              return (
                <li
                  className={`${state.active === data.title ? 'mm-active' : ''}${data?.content?.length > 0 ? ' sub-menu' : ''}${state.openDropdown ? ' opendropdown' : ''}`}
                  key={index}
                >
                  {data?.content && data?.content?.length > 0 ? (
                    // category has content vd: crypto projects, dapps
                    <Link
                      to={data?.to}
                      className='has-arrow'
                    >
                      {data.iconStyle}
                      <div
                        className='nav-text'
                        style={{ width: '12rem' }}
                        onClick={() => {
                          handleMenuActive(data?.title)
                          pathName?.handleChangePathName(data?.title)
                          pathName?.setPathDetail(false)
                          if (sizeScreen < 767.98) {
                            mainwrapper.classList.remove('menu-toggle')
                            toggle?.handleChangeToggle(false)
                          }
                        }}
                      >{data.title}</div>
                      <span
                        className='has-arrow-after'
                        onClick={() => {
                          setState({
                            ...state,
                            openDropdown: !state?.openDropdown,
                            active: state.active === data?.title ? '' : data?.title
                          })
                          removeFilterTag(data?.title, '')
                          pathName?.handleChangePathName(data?.title)
                          pathName?.setPathDetail(false)
                        }}
                      ></span>
                    </Link>
                  ) : (
                    // category not has content vd: home, venture, insight, launchpad
                    <NavLink
                      to={data?.to}
                      onClick={() => {
                        handleMenuActive(data?.title)
                        pathName?.handleChangePathName(data?.title)
                        pathName?.setPathDetail(false)
                        if (sizeScreen < 767.98) {
                          mainwrapper.classList.remove('menu-toggle')
                          toggle?.handleChangeToggle(false)
                        }
                      }}
                    >
                      {data.iconStyle}
                      <div style={{ width: '12rem' }} className='nav-text'>{data.title}</div>
                    </NavLink>
                  )}
                  <Collapse in={state.active === data.title && state?.openDropdown === true}>
                    <ul
                      className={`${!data?.content ? 'display-none' : ''} 
                      ${menuClass === 'mm-collapse' ? 'mm-show' : ''}
                      `}
                    >
                      {data.content &&
                        data.content.map((data, index) => {
                          return (
                            <li
                              onClick={() => {
                                saveFilterTag(data?.category, data?.title)
                                pathName?.handleChangePathName(data?.title)
                                pathName?.setPathDetail(false)
                                handleSubmenuActive(data?.title)
                                if (sizeScreen < 767.98) {
                                  mainwrapper.classList.remove('menu-toggle')
                                  toggle?.handleChangeToggle(false)
                                }
                              }}
                              key={index}

                              className={`${
                                state.activeSubmenu === data.title
                                  ? 'mm-active'
                                  : ''
                              } sub-title`}
                            >
                              <NavLink
                                to={data?.to}
                                className={data.hasMenu ? 'has-arrow' : ''}
                              >
                                {data.title}
                              </NavLink>
                            </li>
                          )
                        })}
                    </ul>
                  </Collapse>
                </li>
              )
            }
          }) }
        </ul>
      </div>
      <div
        className={`${toggle?.toggle ? 'display-none-btn' : 'display-block-btn'} list-btn `}
      >
        <Button
          className='btn-danger '
          onClick={() => {
            navigate('report-scam')
            pathName?.handleChangePathName('Report Scam')
            pathName?.setPathDetail(false)
          }}
          style={{
            backgroundColor: '#EB5757',
            borderColor: '#EB5757',
            padding: '0.4rem',
            width: 'calc(100% / 2 - 0.3rem)'
          }}
        >
          <span className='d-flex align-items-center'>
            {WARNING_ICON('#fff', '17px')}
                &nbsp;
                Report&nbsp;now
          </span>
        </Button>
        <Button
          className='btn ms-1 btn-light'
          style={{
            backgroundColor: '#fff',
            borderColor: '#fff',
            color: 'rgba(0, 0, 0, 0.6)',
            padding: '0.4rem',
            width: 'calc(100% / 2 - 0.3rem)'
          }}
          onClick={() => {
            navigate('add-project')
            pathName?.handleChangePathName('Add Project')
            pathName?.setPathDetail(false)
          }}
        >
          <svg fill='rgba(0, 0, 0, 0.6)' width='17' height='17' viewBox='-1 0 19 19' xmlns='http://www.w3.org/2000/svg' className='cf-icon-svg'><path d='M16.417 9.579A7.917 7.917 0 1 1 8.5 1.662a7.917 7.917 0 0 1 7.917 7.917zm-4.233-1.805H9.259a.318.318 0 0 1-.317-.317v-2.9H5.16a.317.317 0 0 0-.317.317v9.368a.317.317 0 0 0 .317.316h6.707a.317.317 0 0 0 .317-.316zM10.48 10.88a.396.396 0 0 1-.396.396H8.877v1.208a.396.396 0 1 1-.791 0v-1.208H6.878a.396.396 0 1 1 0-.792h1.208V9.277a.396.396 0 1 1 .791 0v1.207h1.208a.396.396 0 0 1 .396.396zm-.744-3.9h2.43l-2.43-2.417z'/></svg>
            &nbsp;
          Add Project
        </Button>
      </div>
    </div>
  )
}

export default SideBar
