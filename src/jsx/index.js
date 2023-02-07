import React, { useContext, createContext, useState, useEffect } from 'react'

// / React router dom
import { Routes, Route, Outlet } from 'react-router-dom'
import { get } from '../api/BaseRequest'

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
import { ConfirmEmail } from './components/auth/confirm-email/index'
// import DashboardDark from './components/Dashboard/DashboardDark'
// import Dashboard2 from './components/Dashboard/Dashboard2'
// import Dashboard3 from './components/Dashboard/Dashboard3'
// import Dashboard4 from './components/Dashboard/Dashboard4'
// import Dashboard5 from './components/Dashboard/Dashboard5'

// Trading
// import Market from './components/Trading/Market'
// import IcoListing from './components/Trading/IcoListing'
// import P2P from './components/Trading/P2P'
// import Future from './components/Trading/Future'
// import IntradayTrading from './components/Trading/IntradayTrading'

// Crypto
// import MarketWatch from './components/Crypto/MarketWatch'
// import IcoListingFilter from './components/Crypto/IcoListingFilter'
// import Banking from './components/Crypto/Banking'
// import CoinDetails from './components/Crypto/CoinDetails'

// Report
// import History from './components/Report/History'
// import Order from './components/Report/Order'
// import Reports from './components/Report/Reports'
// import User from './components/Report/User'
// import Contact from './components/Report/Contact'
// import Activity from './components/Report/Activity'

// ///Demo
// import Theme1 from './components/Dashboard/Demo/Theme1'
// import Theme2 from './components/Dashboard/Demo/Theme2'
// import Theme3 from './components/Dashboard/Demo/Theme3'
// import Theme4 from './components/Dashboard/Demo/Theme4'
// import Theme5 from './components/Dashboard/Demo/Theme5'
// import Theme6 from './components/Dashboard/Demo/Theme6'
// import Theme7 from './components/Dashboard/Demo/Theme7'
// import Theme8 from './components/Dashboard/Demo/Theme8'

// / App
// import AppProfile from './components/AppsMenu/AppProfile/AppProfile'
// import EditProfile from './components/AppsMenu/AppProfile/EditProfile'
// import Compose from './components/AppsMenu/Email/Compose/Compose'
// import Inbox from './components/AppsMenu/Email/Inbox/Inbox'
// import Read from './components/AppsMenu/Email/Read/Read'
// import Calendar from './components/AppsMenu/Calendar/Calendar'
// import PostDetails from './components/AppsMenu/AppProfile/PostDetails'

// / Product List
// import ProductGrid from './components/AppsMenu/Shop/ProductGrid/ProductGrid'
// import ProductList from './components/AppsMenu/Shop/ProductList/ProductList'
// import ProductDetail from './components/AppsMenu/Shop/ProductGrid/ProductDetail'
// import Checkout from './components/AppsMenu/Shop/Checkout/Checkout'
// import Invoice from './components/AppsMenu/Shop/Invoice/Invoice'
// import ProductOrder from './components/AppsMenu/Shop/ProductOrder'
// import Customers from './components/AppsMenu/Shop/Customers/Customers'

// / Charts
// import SparklineChart from './components/charts/Sparkline'
// import ChartJs from './components/charts/Chartjs'
// // import Chartist from "./components/charts/chartist";
// import RechartJs from './components/charts/rechart'
// import ApexChart from './components/charts/apexcharts'

// / Bootstrap
// import UiAlert from './components/bootstrap/Alert'
// import UiAccordion from './components/bootstrap/Accordion'
// import UiBadge from './components/bootstrap/Badge'
// import UiButton from './components/bootstrap/Button'
// import UiModal from './components/bootstrap/Modal'
// import UiButtonGroup from './components/bootstrap/ButtonGroup'
// import UiListGroup from './components/bootstrap/ListGroup'
// import UiCards from './components/bootstrap/Cards'
// import UiCarousel from './components/bootstrap/Carousel'
// import UiDropDown from './components/bootstrap/DropDown'
// import UiPopOver from './components/bootstrap/PopOver'
// import UiProgressBar from './components/bootstrap/ProgressBar'
// import UiTab from './components/bootstrap/Tab'
// import UiPagination from './components/bootstrap/Pagination'
// import UiGrid from './components/bootstrap/Grid'
// import UiTypography from './components/bootstrap/Typography'

// / Plugins
// import Select2 from './components/PluginsMenu/Select2/Select2'
// import MainNouiSlider from './components/PluginsMenu/NouiSlider/MainNouiSlider'
// import MainSweetAlert from './components/PluginsMenu/SweetAlert/SweetAlert'
// import Toastr from './components/PluginsMenu/Toastr/Toastr'
// import JqvMap from './components/PluginsMenu/JqvMap/JqvMap'
// import Lightgallery from './components/PluginsMenu/Lightgallery/Lightgallery'

// Redux
// import Todo from "./pages/Todo";

// Widget
// import Widget from './pages/Widget'

// / Table
// import SortingTable from './components/table/SortingTable/SortingTable'
// import FilteringTable from './components/table/FilteringTable/FilteringTable'
// import BootstrapTable from './components/table/BootstrapTable'

// categoryItem
import CategoryItem from './components/CategoryPage/CategoryItem'

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
import { getCookie, STORAGEKEY } from '../utils/storage'

export const ChainListContext = createContext()
export const CategoryContext = createContext()
export const Authenticated = createContext()
export const SignInContext = createContext()
export const LaunchpadMapContext = createContext()
const Markup = () => {
  const [chainList, setChainList] = useState([])
  const [launchpadMap, setLaunchpadMap] = useState([])
  const [categories, setCategories] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [openModalSignIn, setOpenModalSignIn] = useState(false)

  const stateSignIn = {
    openModalSignIn: openModalSignIn,
    handleSetOpenModal: (isOpen) => setOpenModalSignIn(isOpen)
  }

  const stateAuthenticated = {
    isAuthenticated: isAuthenticated,
    handleSetAuthenticated: (isAuth) => setIsAuthenticated(isAuth)
  }
  const allroutes = [
    // / Dashboard
    { url: '', component: <Home /> },
    { url: 'dashboard', component: <Home /> }

    // // crypto projects
    // { url: ':category', component: <CategoryItem /> },
    // { url: ':category:subCategory', component: <CategoryItem /> },
    // { url: 'crypto/Binance+Ecosystem', component: <CategoryItem /> },
    // { url: 'crypto/Centralized+Exchange', component: <CategoryItem /> },
    // { url: 'crypto/Cronos+Ecosystem', component: <CategoryItem /> },
    // { url: 'crypto/Cryptocurrency', component: <CategoryItem /> },
    // { url: 'crypto/Decentralized+Exchange', component: <CategoryItem /> },
    // { url: 'crypto/Decentralized+Finance', component: <CategoryItem /> },
    // { url: 'crypto/Ethereum+Ecosystem', component: <CategoryItem /> },
    // { url: 'crypto/Gambling', component: <CategoryItem /> },
    // { url: 'crypto/Games', component: <CategoryItem /> },
    // { url: 'crypto/Meme', component: <CategoryItem /> },
    // { url: 'crypto/NFT', component: <CategoryItem /> },
    // { url: 'crypto/Polygon+Ecosystem', component: <CategoryItem /> },
    // { url: 'crypto/Solana+Ecosystem', component: <CategoryItem /> },

    // // dapp
    // { url: 'dapp', component: <CategoryItem /> },
    // { url: 'dapp/Collectibles', component: <CategoryItem /> },
    // { url: 'dapp/Defi', component: <CategoryItem /> },
    // { url: 'dapp/Exchange', component: <CategoryItem /> },
    // { url: 'dapp/Gambling', component: <CategoryItem /> },
    // { url: 'dapp/Games', component: <CategoryItem /> },
    // { url: 'dapp/High+Risk', component: <CategoryItem /> },
    // { url: 'dapp/Marketplaces', component: <CategoryItem /> },
    // { url: 'dapp/Social', component: <CategoryItem /> },
    // { url: 'dapp/Other', component: <CategoryItem /> },

    // // venture
    // { url: 'venture', component: <CategoryItem /> },

    // // Exchanges
    // { url: 'exchanges', component: <CategoryItem /> },
    // { url: 'exchanges/CEX', component: <CategoryItem /> },
    // { url: 'exchanges/DEX', component: <CategoryItem /> },

    // // SOON
    // { url: 'soon', component: <CategoryItem /> },
    // { url: 'soon/Blockchain', component: <CategoryItem /> },
    // { url: 'soon/Crypto', component: <CategoryItem /> },
    // { url: 'soon/Defi', component: <CategoryItem /> },
    // { url: 'soon/Exchange', component: <CategoryItem /> },
    // { url: 'soon/Finance', component: <CategoryItem /> },
    // { url: 'soon/Gamefi', component: <CategoryItem /> },
    // { url: 'soon/Marketplaces', component: <CategoryItem /> },
    // { url: 'soon/NFT', component: <CategoryItem /> },
    // { url: 'soon/Social+Network', component: <CategoryItem /> },
    // { url: 'soon/Wallet', component: <CategoryItem /> }
    //
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

  const getChainList = async() => {
    try {
      const chainList = await get(`reviews/chain/all`)
      setChainList(chainList?.data?.chains)
    } catch (e) {
      console.error(e)
    }
  }

  const getCategoryAndSubcategories = async() => {
    try {
      const resp = await get(`reviews/category/all`)
      setCategories(resp?.data?.categoriesDetail)
    } catch (e) {
      console.error(e)
    }
  }

  const getLaunchpad = async() => {
    try {
      const resp = await get(`reviews/launchpad`)
      const launchpadList = resp?.data?.launchPads
      const launchpadMapLocal = new Map()
      // convert list to map
      launchpadList.forEach((launchpad) => {
        launchpadMapLocal.set(launchpad?.launchPadId, launchpad)
      })
      setLaunchpadMap(launchpadMapLocal)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getCategoryAndSubcategories()
    getChainList()
    getLaunchpad()
  }, [])

  useEffect(() => {
    setIsAuthenticated(!!getCookie(STORAGEKEY.ACCESS_TOKEN))
  }, [])

  return (
    <ChainListContext.Provider value={chainList}>
      <SignInContext.Provider value={stateSignIn}>
        <LaunchpadMapContext.Provider value={launchpadMap}>
          <Authenticated.Provider value={stateAuthenticated}>
            <CategoryContext.Provider value={categories}>
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
            </CategoryContext.Provider>
          </Authenticated.Provider>
        </LaunchpadMapContext.Provider>
      </SignInContext.Provider>
    </ChainListContext.Provider>
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
