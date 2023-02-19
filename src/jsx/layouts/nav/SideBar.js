// / Menu
import React, { useContext, useEffect, useReducer, useState } from 'react'
// / Scroll
import PerfectScrollbar from 'react-perfect-scrollbar'
import Collapse from 'react-bootstrap/Collapse'

// / Link
import { Link, NavLink } from 'react-router-dom'

import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { ThemeContext } from '../../../context/ThemeContext'
// import { CategoryContext } from '../../index'
import { CategoryContext } from '../../../App'
import _ from 'lodash'

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState
})

const initialState = {
  active: '',
  activeSubmenu: ''
}

const headerItem1 = `Crypto Projects`
const headerItem2 = `DApps`
const headerItem3 = `Ventures`
const headerItem4 = `Exchanges`
const headerItem5 = `Upcomings`
const headerItem6 = `Launchpads`

const SideBar = () => {
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

  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext)

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

  // / Path
  let path = window.location.pathname
  path = path.split('/')
  path = path[path.length - 1]

  useEffect(() => {
    const objCategories = [
      {
        title: 'Home',
        to: '',
        // classsChange: 'mm-collapse',
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
          to: `${item[1]?.category?.path}/${itemContent?.name?.replace(' ', '+')}`
        })
      })

      // check if the otherItem exists then push to newContent
      if (!_.isEmpty(otherItem)) {
        newContent.push({
          title: otherItem[0]?.name,
          to: `${item[1]?.category?.path}/${otherItem[0]?.name}`
        })
      }

      objCategories?.push({
        title: item[1]?.category?.name,
        classsChange: 'mm-collapse',
        iconStyle: <i className='material-icons'>{mapCategoriesMenuIcon?.get(item[1]?.category?.name)}</i>,
        content: newContent,
        to: item[1]?.category?.path
      })
    })
    setCategories(objCategories)
  }, [categoryContext])

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

  return (
    <div
      className={`deznav  border-right ${iconHover} ${
        sidebarposition.value === 'fixed' &&
        sidebarLayout.value === 'horizontal' &&
        headerposition.value === 'static'
          ? hideOnScroll > 120
            ? 'fixed'
            : ''
          : ''
      }`}
    >
      <PerfectScrollbar className='deznav-scroll'>
        <ul className='metismenu' id='menu'>
          {categories.length !== 0 ? categories.map((data, index) => {
            const menuClass = data.classsChange
            if (menuClass === 'menu-title') {
              return (
                <li className={menuClass} key={index}>
                  {data.title}
                </li>
              )
            } else {
              return (
                <li
                  className={` ${
                    state.active === data.title ? 'mm-active' : ''
                  }`}
                  key={index}
                >
                  {data.content && data.content.length > 0 ? (
                    <Link
                      to={data?.to}
                      className='has-arrow'
                      onClick={() => {
                        handleMenuActive(data?.title)
                      }}
                    >
                      {data.iconStyle}
                      <span className='nav-text'>{data.title}</span>
                    </Link>
                  ) : (
                    <NavLink to={data?.to}>
                      {data.iconStyle}
                      <span className='nav-text'>{data.title}</span>
                    </NavLink>
                  )}
                  <Collapse in={state.active === data.title}>
                    <ul
                      className={`${
                        menuClass === 'mm-collapse' ? 'mm-show' : ''
                      }`}
                    >
                      {data.content &&
                        data.content.map((data, index) => {
                          return (
                            <li
                              onClick={() => {
                                console.log(data)
                                saveFilterTag(data?.category, data?.title)
                              }}
                              key={index}
                              className={`${
                                state.activeSubmenu === data.title
                                  ? 'mm-active'
                                  : ''
                              }`}
                            >
                              {data.content && data.content.length > 0 ? (
                                <>
                                  <NavLink
                                    to={data?.to}
                                    className={data.hasMenu ? 'has-arrow' : ''}
                                    onClick={() => {
                                      handleSubmenuActive(data?.title)
                                    }}
                                  >
                                    {data.title}
                                  </NavLink>
                                  <Collapse
                                    in={
                                      state.activeSubmenu === data.title
                                    }
                                  >
                                    <ul
                                      className={`${
                                        menuClass === 'mm-collapse'
                                          ? 'mm-show'
                                          : ''
                                      }`}
                                    >
                                      {data.content &&
                                        data.content.map((data, index) => {
                                          return (
                                            <>
                                              <li key={index}>
                                                <Link

                                                  className={`${
                                                    path === data?.to
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
                                </>
                              ) : (
                                <Link to={data?.to}>{data.title}</Link>
                              )}
                            </li>
                          )
                        })}
                    </ul>
                  </Collapse>
                </li>
              )
            }
          }) : arrOrderedCategories.map((index) => (
            <span key={index}>
              <li className='menu-title' key={index}>
                {arrOrderedCategories[index]}
              </li>
            </span>))}
        </ul>
      </PerfectScrollbar>
    </div>
  )
}

export default SideBar
