import React, { useContext } from 'react'

// / React router dom
import { Routes, Route, Outlet } from 'react-router-dom'
// import { get } from '../api/BaseRequest'

// / Css
import './index.css'
import './chart.css'
import './step.css'

// / Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'
// import Main from './layouts/Main';
import ScrollToTop from './layouts/ScrollToTop'
// / Dashboard
import Home from './components/Dashboard/Home'
// categoryItem
import CategoryItem from './components/CategoryPage/CategoryItem'
// import { ConfirmEmail } from './components/auth/confirm-email/index'
import { ConfirmEmail } from './components/auth/confirm-email'
// product detail
import ProductDetail1 from './components/product-detail/ProductDetail'
// / Form
// import Element from './components/Forms/Element/Element'
// import Wizard from './components/Forms/Wizard/Wizard'
// import CkEditor from './components/Forms/CkEditor/CkEditor'
// import Pickers from './components/Forms/Pickers/Pickers'
// import FormValidation from './components/Forms/FormValidation/FormValidation'

// / Pages
// import Registration from "./pages/Registration";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from './pages/LockScreen'
import Error400 from './pages/Error400'
import Error403 from './pages/Error403'
import Error404 from './pages/Error404'
import Error500 from './pages/Error500'
import Error503 from './pages/Error503'
import { ThemeContext } from '../context/ThemeContext'
// import { getCookie, STORAGEKEY } from '../utils/storage'

// export const ChainListContext = createContext()
// export const CategoryContext = createContext()
// export const Authenticated = createContext()
// export const SignInContext = createContext()
// export const LaunchpadMapContext = createContext()
const Markup = () => {
  const allroutes = [
    // / Dashboard
    { url: '', component: <Home /> },
    { url: 'dashboard', component: <Home /> }

    // /// pages
    // { url: "page-register", component: Registration },
    // { url: "page-lock-screen", component: <LockScreen /> },
    // //{ url: "page-login", component: Login },
    // { url: "page-forgot-password", component: <ForgotPassword /> },
    // { url: "page-error-400", component: <Error400 /> },
    // { url: "page-error-403", component: <Error403 /> },
    // { url: "page-error-404", component: <Error404 /> },
    // { url: "page-error-500", component: <Error500 /> },
    // { url: "page-error-503", component: <Error503 /> },
  ]
  // let path = window.location.pathname;
  // path = path.split("/");
  // path = path[path.length - 1];

  // let pagePath = path.split("-").includes("page");
  // const { menuToggle } = useContext(ThemeContext);

  // const getChainList = async() => {
  //   try {
  //     const chainList = await get(`reviews/chain/all`)
  //     setChainList(chainList?.data?.chains)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  // const getCategoryAndSubcategories = async() => {
  //   try {
  //     const resp = await get(`reviews/category/all`)
  //     setCategories(resp?.data?.categoriesDetail)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  // const getLaunchpad = async() => {
  //   try {
  //     const resp = await get(`reviews/launchpad`)
  //     const launchpadList = resp?.data?.launchPads
  //     const launchpadMapLocal = new Map()
  //     // convert list to map
  //     launchpadList.forEach((launchpad) => {
  //       launchpadMapLocal.set(launchpad?.launchPadId, launchpad)
  //     })
  //     setLaunchpadMap(launchpadMapLocal)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  // useEffect(() => {
  //   const getData = async() => {
  //     console.log(4444)
  //     try {
  //       // call data chain list
  //       const chainList = await get(`reviews/chain/all`)
  //       // call data category
  //       const respCategory = await get(`reviews/category/all`)
  //       // call data launchpad
  //       const resp = await get(`reviews/launchpad`)
  //       const launchpadList = resp?.data?.launchPads
  //       const launchpadMapLocal = new Map()
  //       // convert list to map
  //       launchpadList.forEach((launchpad) => {
  //         launchpadMapLocal.set(launchpad?.launchPadId, launchpad)
  //       })
  //       setData({
  //         ...data,
  //         categories: respCategory?.data?.categoriesDetail,
  //         chainList: chainList?.data?.chains,
  //         launchpadMap: launchpadMapLocal,
  //         isAuthenticated: !!getCookie(STORAGEKEY.ACCESS_TOKEN)
  //       })
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }
  //   // getCategoryAndSubcategories()
  //   // getChainList()
  //   // getLaunchpad()
  //   getData()
  // }, [])

  return (
    <>
      {/* // <ChainListContext.Provider value={chainList}>
    //   <SignInContext.Provider value={stateSignIn}>
    //     <LaunchpadMapContext.Provider value={launchpadMap}>
    //       <Authenticated.Provider value={stateAuthenticated}>
    //         <CategoryContext.Provider value={categories}> */}
      <Routes>
        <Route path='page-lock-screen' element={<LockScreen />} />
        <Route path='page-error-400' element={<Error400 />} />
        <Route path='page-error-403' element={<Error403 />} />
        <Route path='page-error-404' element={<Error404 />} />
        <Route path='page-error-500' element={<Error500 />} />
        <Route path='page-error-503' element={<Error503 />} />
        <Route element={<MainLayout />}>
          {allroutes.map((data, i) => (
            <Route
              key={i}
              path={`${data.url}`}
              element={data.component}
            />
          ))}
          <Route path='confirm-email' element={<ConfirmEmail />}/>
          <Route path='/' element={<Home />}></Route>
          <Route
            path='search/:keyword'
            element={<CategoryItem />}
          />
          <Route path=''>
            <Route path=':category'>
              <Route path='' element={<CategoryItem />} />
              <Route
                path=':subCategory'
                element={<CategoryItem />}
              />
            </Route>
          </Route>
          <Route path='products'>
            <Route path='crypto'>
              <Route path=':type'>
                <Route path=':productName'>
                  <Route path='' element={<ProductDetail1 />} />
                  <Route path=':path' element={<ProductDetail1 />} />
                </Route>
              </Route>
            </Route>
            <Route path=':categoryName'>
              <Route path=':productName'>
                <Route path='' element={<ProductDetail1 />} />
                <Route path=':path' element={<ProductDetail1 />} />
              </Route>
              <Route
                path=':productId'
                element={<ProductDetail1 />}
              />
            </Route>
            <Route
              path=':productId'
              element={<ProductDetail1 />}
            />
          </Route>
        </Route>
      </Routes>
      <ScrollToTop />
      {/* //        </CategoryContext.Provider>
    //       </Authenticated.Provider>
    //     </LaunchpadMapContext.Provider>
    //   </SignInContext.Provider>
    // </ChainListContext.Provider> */}
    </>
  )
}

function MainLayout(detail) {
  const { menuToggle } = useContext(ThemeContext)
  return (
    <div
      id='main-wrapper'
      className={`show ${menuToggle ? 'menu-toggle' : ''}`}
    >
      <Nav />
      <div
        className='content-body'
        style={{ minHeight: window.screen.height - 45 }}
      >
        <div className='container-fluid'>
          <Outlet />
          {/* {detail} */}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Markup
