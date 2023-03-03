import React, { createContext, useEffect, useReducer } from 'react'

export const ThemeContext = createContext()
const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState
})

const initialState = {
  sideBarStyle: { value: 'full', label: 'Full' },
  sidebarposition: { value: 'fixed', label: 'Fixed' },
  headerposition: { value: 'fixed', label: 'Fixed' },
  sidebarLayout: { value: 'vertical', label: 'Vertical' },
  // direction: { value: 'ltr', label: 'LTR' },
  primaryColor: 'color_1',
  secondaryColor: 'color_1',
  navigationHader: 'color_4',
  haderColor: 'color_1',
  sidebarColor: 'color_4',
  background: { value: 'light', label: 'Light' },
  // containerPositionSize: { value: 'wide-boxed', label: 'Wide Boxed' },
  iconHover: false,
  menuToggle: false,
  windowWidth: 0,
  windowHeight: 0
}

const body = document.querySelector('body')
// const body = document.querySelector('body')
// body.setAttribute('data-typography', 'poppins')
// body.setAttribute('data-theme-version', 'light')
// body.setAttribute('data-layout', 'vertical')
// body.setAttribute('data-primary', 'color_2') // body-background, button, border chart
// body.setAttribute('data-nav-headerbg', 'color_2') // sidebar left header
// body.setAttribute('data-headerbg', 'color_1') // header
// body.setAttribute('data-sidebar-style', 'overlay')
// body.setAttribute('data-sidebarbg', 'color_2') // sidebar left body
// body.setAttribute('data-secondary', 'color_1')
// body.setAttribute('data-sidebar-position', 'fixed')
// body.setAttribute('data-header-position', 'fixed')
// body.setAttribute('data-container', 'wide')

const ThemeContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    sideBarStyle,
    sidebarposition,
    headerposition,
    sidebarLayout,
    // direction,
    primaryColor,
    secondaryColor,
    navigationHader,
    haderColor,
    sidebarColor,
    background,
    // containerPositionSize,
    iconHover,
    menuToggle,
    windowWidth,
    windowHeight
  } = state

  // layout
  // const layoutOption = [
  //   { value: 'vertical', label: 'Vertical' },
  //   { value: 'horizontal', label: 'Horizontal' }
  // ]
  // const sideBarOption = [
  //   { value: 'compact', label: 'Compact' },
  //   { value: 'full', label: 'Full' },
  //   { value: 'mini', label: 'Mini' },
  //   { value: 'modern', label: 'Modern' },
  //   { value: 'overlay', label: 'Overlay' },
  //   { value: 'icon-hover', label: 'Icon-hover' }
  // ]
  // const backgroundOption = [
  //   { value: 'light', label: 'Light' },
  //   { value: 'dark', label: 'Dark' }
  // ]
  // const sidebarpositions = [
  //   { value: 'fixed', label: 'Fixed' },
  //   { value: 'static', label: 'Static' }
  // ]
  // const headerPositions = [
  //   { value: 'fixed', label: 'Fixed' },
  //   { value: 'static', label: 'Static' }
  // ]
  // const containerPosition = [
  //   { value: 'wide-boxed', label: 'Wide Boxed' },
  //   { value: 'boxed', label: 'Boxed' },
  //   { value: 'wide', label: 'Wide' }
  // ]
  const colors = [
    'color_1', // white
    'color_2' // green
  ]
  // const directionPosition = [
  //   { value: 'ltr', label: 'LTR' },
  //   { value: 'rtl', label: 'RTL' }
  // ]
  // const fontFamily = [
  //   { value: 'poppins', label: 'Poppins' }
  //   // { value: 'roboto', label: 'Roboto' },
  //   // { value: 'nunito', label: 'Nunito' },
  //   // { value: 'opensans', label: 'Open Sans' },
  //   // { value: 'HelveticaNeue', label: 'HelveticaNeue' }
  // ]
  // const changePrimaryColor = (name) => {
  //   // setPrimaryColor(name);
  //   dispatch({ primaryColor: name })
  //   body.setAttribute('data-primary', name)
  // }
  // const changeSecondaryColor = (name) => {
  //   // setSecondaryColor(name);
  //   dispatch({ secondaryColor: name })
  //   body.setAttribute('data-secondary', name)
  // }
  // const changeNavigationHader = (name) => {
  //   // setNavigationHader(name);
  //   dispatch({ navigationHader: name })
  //   body.setAttribute('data-nav-headerbg', name)
  // }
  // const chnageHaderColor = (name) => {
  //   // setHaderColor(name);
  //   dispatch({ haderColor: name })
  //   body.setAttribute('data-headerbg', name)
  // }
  // const chnageSidebarColor = (name) => {
  //   // setSidebarColor(name);
  //   dispatch({ sidebarColor: name })
  //   body.setAttribute('data-sidebarbg', name)
  // }
  // const changeSideBarPostion = (name) => {
  //   // setSidebarposition(name);
  //   dispatch({ sidebarposition: name })
  //   body.setAttribute('data-sidebar-position', name.value)
  // }
  // const changeDirectionLayout = (name) => {
  //   // setDirection(name);
  //   dispatch({ direction: name })
  //   body.setAttribute('direction', name.value)
  //   const html = document.querySelector('html')
  //   html.setAttribute('dir', name.value)
  //   html.className = name.value
  // }
  // const changeSideBarLayout = (name) => {
  //   if (name.value === 'horizontal') {
  //     if (sideBarStyle.value === 'overlay') {
  //       // setSidebarLayout(name);
  //       dispatch({ sidebarLayout: name })
  //       body.setAttribute('data-layout', name.value)
  //       // setSideBarStyle({ value: "full", label: "Full" });
  //       dispatch({ sideBarStyle: { value: 'full', label: 'Full' }})
  //       body.setAttribute('data-sidebar-style', 'full')
  //     } else {
  //       // setSidebarLayout(name);
  //       dispatch({ sidebarLayout: name })
  //       body.setAttribute('data-layout', name.value)
  //     }
  //   } else {
  //     // setSidebarLayout(name);
  //     dispatch({ sidebarLayout: name })
  //     body.setAttribute('data-layout', name.value)
  //   }
  // }
  // const changeSideBarStyle = (name) => {
  //   if (sidebarLayout.value === 'horizontal') {
  //     if (name.value === 'overlay') {
  //       alert('Sorry! Overlay is not possible in Horizontal layout.')
  //     } else {
  //       // setSideBarStyle(name);
  //       dispatch({ sideBarStyle: name })
  //       // setIconHover(name.value === "icon-hover" ? "_i-hover" : "");
  //       dispatch({ iconHover: name.value === 'icon-hover' ? '_i-hover' : '' })
  //       body.setAttribute('data-sidebar-style', name.value)
  //     }
  //   } else {
  //     // setSideBarStyle(name);
  //     dispatch({ sideBarStyle: name })
  //     // setIconHover(name.value === "icon-hover" ? "_i-hover" : "");
  //     dispatch({ iconHover: name.value === 'icon-hover' ? '_i-hover' : '' })
  //     body.setAttribute('data-sidebar-style', name.value)
  //   }
  // }

  // const changeHeaderPostion = (name) => {
  //   // setHeaderposition(name);
  //   dispatch({ headerposition: name })
  //   body.setAttribute('data-header-position', name.value)
  // }

  const openMenuToggle = () => {
    // console.log('sidebar',sideBarStyle)
    sideBarStyle.value === 'overly'
      ? dispatch({ menuToggle: true })
      : dispatch({ menuToggle: false })
  }

  const changeBackground = (name) => {
    body.setAttribute('data-theme-version', name.value)
    // setBackground(name);
    dispatch({ background: name })
  }

  // const changeContainerPosition = (name) => {
  //   // setcontainerPosition_(name);
  //   dispatch({ containerPositionSize: name })
  //   body.setAttribute('data-container', name.value)
  //   name.value === 'boxed' &&
  //     changeSideBarStyle({ value: 'overlay', label: 'Overlay' })
  // }

  const resizeWindow = () => {
    // setWindowWidth(window.innerWidth);
    dispatch({ windowWidth: window.innerWidth })
    // setWindowHeight(window.innerHeight);
    dispatch({ windowHeight: window.innerHeight })
    window.innerWidth >= 768 && window.innerWidth < 1024
      ? body.setAttribute('data-sidebar-style', 'mini')
      : window.innerWidth < 768
        ? body.setAttribute('data-sidebar-style', 'overlay')
        : body.setAttribute('data-sidebar-style', 'full') // style item in sidebar
  }

  useEffect(() => {
    body.setAttribute('data-typography', 'poppins')
    body.setAttribute('data-theme-version', 'light')
    body.setAttribute('data-layout', 'vertical')
    body.setAttribute('data-primary', 'color_2') // body-background, button, border chart
    body.setAttribute('data-nav-headerbg', 'color_2') // sidebar left header
    body.setAttribute('data-headerbg', 'color_1') // header
    body.setAttribute('data-sidebar-style', 'overlay')
    body.setAttribute('data-sidebarbg', 'color_2') // sidebar left body
    body.setAttribute('data-secondary', 'color_1')
    body.setAttribute('data-sidebar-position', 'fixed')
    body.setAttribute('data-header-position', 'fixed')
    body.setAttribute('data-container', 'wide')
    body.setAttribute('direction', 'ltr')
    resizeWindow()
    window.addEventListener('resize', resizeWindow)
    window.addEventListener('load', resizeWindow)
    return () => window.removeEventListener('resize', resizeWindow)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        body,
        // sideBarOption,
        // layoutOption,
        // backgroundOption,
        sidebarposition,
        // headerPositions,
        // containerPosition,
        // directionPosition,
        // fontFamily,
        primaryColor,
        secondaryColor,
        navigationHader,
        windowWidth,
        windowHeight,
        // changePrimaryColor,
        // changeSecondaryColor,
        // changeNavigationHader,
        // changeSideBarStyle,
        sideBarStyle,
        // changeSideBarPostion,
        // sidebarpositions,
        // changeHeaderPostion,
        headerposition,
        // changeSideBarLayout,
        sidebarLayout,
        // changeDirectionLayout,
        // changeContainerPosition,
        // direction,
        colors,
        haderColor,
        // chnageHaderColor,
        // chnageSidebarColor,
        sidebarColor,
        iconHover,
        menuToggle,
        openMenuToggle,
        changeBackground,
        background
        // containerPosition_,
        // containerPositionSize
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider
