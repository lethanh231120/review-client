import React, { useContext, createContext, useState, useEffect } from 'react'
// / React router dom
import { Routes, Route, Outlet, useLocation } from 'react-router-dom'

// / Css
import './index.css'
import './chart.css'
import './step.css'

// / Layout
import Nav from './layouts/nav'
import Footer from './layouts/Footer'
import ScrollToTop from './layouts/ScrollToTop'
// / Dashboard
import Home from './components/Dashboard/Home'
// categoryItem
import CategoryItem from './components/CategoryPage/CategoryItem'
import { ConfirmEmail } from './components/auth/confirm-email'
// product detail
import ProductDetail from './components/product-detail/ProductDetail'
import { ThemeContext } from '../context/ThemeContext'
import ModalReport from './components/modal/modal-report/ModalReport'
import ModalAdd from './components/modal/modal-add-product/ModalAdd'
import AddProject from './components/add-project/AddProject'
import ReportScam from './components/report-scam/ReportScam'

import { Button, Modal } from 'react-bootstrap'
import { NotFound } from './components/not-found/NotFound'
import { NotFoundProduct } from './components/not-found-product/NotFoundProduct'
import { ServerError } from './components/server-error/ServerError'
import InsightMain from './components/insight/InsightMain'
import { TermOfService } from './components/term-of-service/TermOfService'
import { CRYPTO, DAPP, EXCHANGE, VENTURE, SOON, LAUNCHPAD, INSIGHT, NEW_TOKENS, CATEGORY_NEW_TOKENS, REFERRAL, CATEGORY_REFERRAL } from './constants/category'
import { CATEGORY_CRYPTO, CATEGORY_DAPP, CATEGORY_EXCHANGE, CATEGORY_INSIGHT, CATEGORY_LAUNCHPAD, CATEGORY_SOON, CATEGORY_VENTURE } from './constants/category'
import ChartDetail from './components/insight/chartDetail/ChartDetail'
import { PrivacyPolicy } from './components/privacy-policy/PrivacyPolicy'
import LiveNewTokensList from './components/live-new-tokens/LiveNewTokensList'
import { ALGORITHM_KECCAK256, API_CONFIRM, get } from '../api/BaseRequest'
import { STORAGEKEY } from '../utils/storage'
import { ReferralCode } from './components/referral-code/referralCode'
import { getBrowserUserAgent } from '../utils/browserExtract'
import { getReferralCodeHeader } from './components/common-widgets/user-form/sign-in-form'
import { getCookie } from './../utils/storage/index'

export const ReportModalContext = createContext()
export const AddModalContext = createContext()
export const ToggleContext = createContext()
export const PathNameContext = createContext()
export const NormalUserProfileContext = createContext()
export const getQueryParam = (name) =>{
  // get query params
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  })
  return params[name]
}
export const keccak256 = async(message) =>{
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest(ALGORITHM_KECCAK256, msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export const getUserInfo = async() =>{
  const rightNow = Date.now() // timestamp UNIX as milliseconds
  const userInfo = `${API_CONFIRM}_${getBrowserUserAgent()}_${rightNow}`
  const userInfoHash = await keccak256(userInfo)
  return `${rightNow}@${userInfoHash}`
}

export const removeStorageRefCode = () =>{
  sessionStorage.removeItem(STORAGEKEY.COUNTER_HUMAN_CHECK) // remove reduant data
  sessionStorage.removeItem(STORAGEKEY.REFERRAL_CODE) // remove here (don't evoke this timer again later)
  sessionStorage.removeItem(STORAGEKEY.CAMPAIGN_CODE) // remove here (don't evoke this timer again later)
}

const Markup = () => {
  const [openModalReport, setOpenModalReport] = useState(false)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [openModalUserProfile, setOpenModalUserProfile] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [pathName, setPathName] = useState('')
  const [pathDetail, setPathDetail] = useState(false)

  const allroutes = [
    { url: '', pathName: 'Home', component: <Home /> },
    { url: 'dashboard', pathName: 'Dashboard', component: <Home /> },
    { url: 'add-project', pathName: 'Add Project', component: <AddProject isModal={false} /> },
    { url: 'report-scam', pathName: 'Report Scam', component: <ReportScam isModal={false} /> }
  ]

  const stateReport = {
    openModalReport: openModalReport,
    handleSetOpenModal: (isOpen) => setOpenModalReport(isOpen)
  }

  const stateToggle = {
    toggle: toggle,
    handleChangeToggle: (toggle) => setToggle(toggle)
  }

  const statePathName = {
    pathName: pathName,
    handleChangePathName: (path) => {
      if (path === 'Home') {
        setPathName('')
      } else {
        setPathName(path)
      }
    },
    pathDetail: pathDetail,
    setPathDetail: (isDetailPath) => {
      setPathDetail(isDetailPath)
    }
  }

  const stateAdd = {
    openModalAdd: openModalAdd,
    handleSetOpenModal: (isOpen) => setOpenModalAdd(isOpen)
  }

  const stateUserProfile = {
    openModalUserProfile: openModalUserProfile,
    setOpenModalUserProfile: (isOpen) => setOpenModalUserProfile(isOpen)
  }

  const location = useLocation()
  useEffect(() => {
    const path = location.pathname.split('/')
    if (path) {
      switch (path[1]) {
        case '':
          setPathName('')
          break
        case 'dashboard':
          setPathName('')
          break
        case CRYPTO:
          if (path[2]) {
            setPathName(path[2]?.split('-')?.join(' '))
          } else {
            setPathName(CATEGORY_CRYPTO)
          }
          break
        case DAPP:
          if (path[2]) {
            setPathName(path[2]?.split('-')?.join(' '))
          } else {
            setPathName(CATEGORY_DAPP)
          }
          break
        case EXCHANGE:
          if (path[2]) {
            setPathName(path[2]?.split('-')?.join(' '))
          } else {
            setPathName(CATEGORY_EXCHANGE)
          }
          break
        case VENTURE:
          if (path[2]) {
            setPathName(path[2]?.split('-')?.join(' '))
          } else {
            setPathName(CATEGORY_VENTURE)
          }
          break
        case SOON:
          if (path[2]) {
            setPathName(path[2]?.split('-')?.join(' '))
          } else {
            setPathName(CATEGORY_SOON)
          }
          break
        case LAUNCHPAD:
          setPathName(CATEGORY_LAUNCHPAD)
          break
        case INSIGHT:
          if (path[2]) {
            setPathName(path[2]?.split('_')?.join(' '))
          } else {
            setPathName(CATEGORY_INSIGHT)
          }
          break
        case NEW_TOKENS:
          if (path[2]) {
            setPathName(path[2]?.split('_')?.join(' '))
          } else {
            setPathName(CATEGORY_NEW_TOKENS)
          }
          break
        case REFERRAL:
          setPathName(CATEGORY_REFERRAL)
          break
        case 'report-scam':
          setPathName('Report Scam')
          break
        case 'search':
          setPathName('Search results')
          break
        case 'add-project':
          setPathName('Add Project')
          break
        case 'terms-of-service':
          setPathName('Terms Of Service')
          break
        case 'privacy-policy':
          setPathName('Privacy Policy')
          break
        default:
          break
      }
    }
  }, [location])

  // This will run one time after the component mounts
  useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = async() => {
      // *** scroll to the top page
      const [xCoord, yCoord] = [0, 0]
      window.scrollTo(xCoord, yCoord)

      // *** clear url, save param referral code
      const refParam = getQueryParam('ref')
      sessionStorage.removeItem(STORAGEKEY.REFERRAL_CODE)
      sessionStorage.setItem(STORAGEKEY.REFERRAL_CODE, refParam)
      const campainParam = getQueryParam('cam')
      sessionStorage.removeItem(STORAGEKEY.CAMPAIGN_CODE)
      sessionStorage.setItem(STORAGEKEY.CAMPAIGN_CODE, campainParam)
      // remove referral in URL
      history.pushState({}, null, window.location.href.split('?')[0])

      // *** Set event avtive tab
      let timerCheckHuman
      sessionStorage.removeItem(STORAGEKEY.COUNTER_MOVE)
      sessionStorage.setItem(STORAGEKEY.COUNTER_MOVE, 0)

      sessionStorage.removeItem(STORAGEKEY.COUNTER_HUMAN_CHECK)
      sessionStorage.setItem(STORAGEKEY.COUNTER_HUMAN_CHECK, 0)
      const RunTimerCheckHuman = async() =>{
        const header = await getReferralCodeHeader()

        const refCode = header?.Referral
        // has parameter must couter (prequiosute param to call this API)
        if (refCode) {
        // clear before run again
          clearInterval(timerCheckHuman)
          timerCheckHuman = setInterval(async() => {
            const counter = parseInt(sessionStorage.getItem(STORAGEKEY.COUNTER_HUMAN_CHECK))
            // count 30 times(1 second * 30)
            const limitSecond = 30
            if (counter >= limitSecond) {
              try {
                // already interact with website
                if (parseInt(sessionStorage.getItem(STORAGEKEY.COUNTER_MOVE)) >= 2) {
                  const userAccessToken = getCookie(STORAGEKEY.ACCESS_TOKEN)
                  // already login
                  if (userAccessToken) {
                    clearInterval(timerCheckHuman) // last time run
                    removeStorageRefCode()
                    await get(`reviews/referral/confirm`, {}, header)
                  }
                }
              } catch (e) {
                console.error(e)
              }
            } else {
              // counter < limit
              sessionStorage.removeItem(STORAGEKEY.COUNTER_HUMAN_CHECK)
              sessionStorage.setItem(STORAGEKEY.COUNTER_HUMAN_CHECK, counter + 1)
            }
          }, 1000)
        }
      }
      // **first time
      RunTimerCheckHuman()
      // **Click website after focus
      window.addEventListener('focus', () => {
        // tab is focus
        if (document.hasFocus()) {
          RunTimerCheckHuman()
        }
      })
      // **Focus website
      window.addEventListener('blur', ()=>{
        clearInterval(timerCheckHuman)
      })
      // Event evoke one times
      window.addEventListener('click', ()=>{
        moveUp()
      }, { once: 'true' })
      // Event evoke one times
      window.addEventListener('scroll', ()=>{
        moveUp()
      }, { once: 'true' })
    }

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad()
    } else {
      window.addEventListener('load', onPageLoad, false)
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad)
    }
  }, [])

  const moveUp = () => {
    const counter = parseInt(sessionStorage.getItem(STORAGEKEY.COUNTER_MOVE))
    sessionStorage.removeItem(STORAGEKEY.COUNTER_MOVE)
    sessionStorage.setItem(STORAGEKEY.COUNTER_MOVE, counter + 1)
  }

  return (
    <>
      <ReportModalContext.Provider value={stateReport}>
        <AddModalContext.Provider value={stateAdd}>
          <ToggleContext.Provider value={stateToggle}>
            <PathNameContext.Provider value={statePathName}>
              <NormalUserProfileContext.Provider value={stateUserProfile}>
                <Routes>
                  <Route element={<MainLayout />}>
                    {allroutes.map((data, i) => (
                      <Route key={i} path={`${data.url}`} element={data.component}/>
                    ))}
                    <Route path='confirm-email' element={<ConfirmEmail />}/>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='search/:categorySearch/:keyword' element={<CategoryItem />}/>
                    <Route path=''>
                      <Route path=':category'>
                        <Route path='' element={<CategoryItem />} />
                        <Route
                          path=':subCategory'
                          element={<CategoryItem />}
                        />
                      </Route>
                    </Route>
                    <Route path={INSIGHT} >
                      <Route path='' element={<InsightMain />}/>
                      <Route path=':id' element={<ChartDetail />}/>
                    </Route>
                    <Route path={NEW_TOKENS} >
                      <Route path='' element={<LiveNewTokensList />}/>
                    </Route>
                    <Route path='products'>
                      <Route path='crypto'>
                        <Route path=':type'>
                          <Route path=':productName'>
                            <Route path='' element={<ProductDetail />} />
                            {/* token only */}
                            <Route path=':path' element={<ProductDetail />} />
                          </Route>
                        </Route>
                      </Route>
                      <Route path=':categoryName'>
                        <Route path=':productName'>
                          <Route path='' element={<ProductDetail />} />
                          <Route path=':path' element={<ProductDetail />} />
                        </Route>
                        <Route
                          path=':productId'
                          element={<ProductDetail />}
                        />
                      </Route>
                      <Route
                        path=':productId'
                        element={<ProductDetail />}
                      />
                    </Route>
                    <Route path={REFERRAL} element={<ReferralCode />}/>
                    <Route path='terms-of-service' element={<TermOfService />}/>
                    <Route path='privacy-policy' element={<PrivacyPolicy />}/>
                    <Route path='not-found-product' element={<NotFoundProduct />} />
                    <Route path='server-error' element={<ServerError />} />
                    <Route path='not-found' element={<NotFound />} />
                    <Route path='*' element={<NotFound />} />
                  </Route>
                </Routes>
                <ScrollToTop />
                <Modal className='fade cus-modal' show={openModalReport} size='lg'>
                  <Modal.Header className='cus-modal'>
                    <Modal.Title>Report scam projects with us</Modal.Title>
                    <Button
                      variant=''
                      className='btn-close'
                      onClick={() => setOpenModalReport(false)}
                    >

                    </Button>
                  </Modal.Header>
                  <Modal.Body className='cus-modal'>
                    <ModalReport isModal={true} setOpenModalReport={setOpenModalReport}/>
                  </Modal.Body>
                </Modal>
                <Modal className='fade' show={openModalAdd} size='lg'>
                  <Modal.Header>
                    <Modal.Title>Add New Project</Modal.Title>
                    <Button
                      variant=''
                      className='btn-close'
                      onClick={() => setOpenModalAdd(false)}
                    >
                    </Button>
                  </Modal.Header>
                  <Modal.Body>
                    <ModalAdd isModal={true}/>
                  </Modal.Body>
                </Modal>
              </NormalUserProfileContext.Provider>
            </PathNameContext.Provider>
          </ToggleContext.Provider>
        </AddModalContext.Provider>
      </ReportModalContext.Provider>
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
