import { Suspense, createContext, useEffect, useState } from 'react'
import Index from './jsx'
// import './vendor/bootstrap-select/dist/css/bootstrap-select.min.css'
import './css/style.css'
import { get } from './api/BaseRequest'
import { getCookie, STORAGEKEY } from './utils/storage'
import _ from 'lodash'

export const ChainListContext = createContext()
export const CategoryContext = createContext()
export const Authenticated = createContext()
export const SignInContext = createContext()
export const LaunchpadMapContext = createContext()
export const SignInFromAddProductContext = createContext()
export const HotTopicsContext = createContext()
export const SummaryHomeContext = createContext()
export const ShowFullSearchConext = createContext()
export const FormLoginSignupKeyContext = createContext()
export const ExchangeContext = createContext()

const App = () => {
  const [openModalSignIn, setOpenModalSignIn] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [categories, setCategories] = useState([])
  const [chainList, setChainList] = useState([])
  const [launchpadMap, setLaunchpadMap] = useState([])
  const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false)
  const [hotTopics, setHotTopics] = useState([])
  const [summaryHome, setSummaryHome] = useState()
  const [isShowFullSearchSmallMode, setIsShowFullSearchSmallMode] = useState(false)
  const [loginSignupFormactiveTabKey, setLoginSignupFormactiveTabKey] = useState('')
  const [exchanges, setExchanges] = useState()

  const stateOpenAddProduct = {
    isOpenModalAddProduct: isOpenModalAddProduct,
    setIsOpenModalAddProduct: (isOpen) => setIsOpenModalAddProduct(isOpen)
  }

  const stateSignIn = {
    openModalSignIn: openModalSignIn,
    handleSetOpenModal: (isOpen) => setOpenModalSignIn(isOpen)
  }

  const stateAuthenticated = {
    isAuthenticated: isAuthenticated,
    handleSetAuthenticated: (isAuth) => setIsAuthenticated(isAuth)
  }

  const stateShowFullSearch = {
    isShowFullSearchSmallMode: isShowFullSearchSmallMode,
    setIsShowFullSearchSmallMode: (isShow) => setIsShowFullSearchSmallMode(isShow)
  }

  const stateLoginSignupFormactiveTabKey = {
    loginSignupFormactiveTabKey: loginSignupFormactiveTabKey,
    setLoginSignupFormactiveTabKey: (key) => setLoginSignupFormactiveTabKey(key)
  }

  useEffect(() => {
    setIsAuthenticated(!!getCookie(STORAGEKEY.ACCESS_TOKEN))
  }, [])

  const getCategoryAndSubcategories = async() => {
    try {
      const resp = await get(`reviews/category/all`)
      setCategories(resp?.data?.categoriesDetail)
    } catch (e) {
      console.error(e)
    }
  }

  const getChainList = async() => {
    try {
      const chainList = await get(`reviews/chain/all`)
      setChainList(chainList?.data?.chains)
    } catch (e) {
      console.error(e)
    }
  }

  const getHotList = async() => {
    const res = await get('reviews/hot')
    if (res?.status) {
      if (res?.data?.products && !_.isEmpty(res?.data?.products)) {
        const list = res?.data?.products
        const sorted = list?.sort((a, b) => parseInt(a?.totalReviews) - parseInt(b?.totalReviews))
        setHotTopics(sorted)
      }
    }
  }

  const getExchanges = async() => {
    const dataExchange = await get('reviews/exchange/all')
    setExchanges(dataExchange?.data?.exchanges)
  }

  useEffect(() => {
    getCategoryAndSubcategories()
    getChainList()
    getHotList()
    getExchanges()
  }, [])

  const getLaunchpad = async() => {
    try {
      const resp = await get(`reviews/launchpad/all`)
      const launchpadList = resp?.data?.launchPads
      const launchpadMapLocal = new Map()
      // convert list to map
      launchpadList?.forEach((launchpad) => {
        launchpadMapLocal?.set(launchpad?.launchPadId, launchpad)
      })
      setLaunchpadMap(launchpadMapLocal)
    } catch (e) {
      console.error(e)
    }
  }

  // GET SUMMARY DATA
  const getSummaryDataHome = async() => {
    const response = await get('reviews/summary')
    if (response?.status) {
      setSummaryHome(response?.data)
    }
  }

  useEffect(() => {
    getLaunchpad()
    getSummaryDataHome()
  }, [])

  return (
    <ChainListContext.Provider value={chainList}>
      <SignInContext.Provider value={stateSignIn}>
        <LaunchpadMapContext.Provider value={launchpadMap}>
          <Authenticated.Provider value={stateAuthenticated}>
            <CategoryContext.Provider value={categories}>
              <SignInFromAddProductContext.Provider value={stateOpenAddProduct}>
                <ExchangeContext.Provider value={exchanges}>
                  <HotTopicsContext.Provider value={hotTopics}>
                    <SummaryHomeContext.Provider value={summaryHome}>
                      <ShowFullSearchConext.Provider value={stateShowFullSearch}>
                        <FormLoginSignupKeyContext.Provider value={stateLoginSignupFormactiveTabKey}>
                          <Suspense fallback={
                            <div id='preloader'>
                              <div className='sk-three-bounce'>
                                <div className='sk-child sk-bounce1'></div>
                                <div className='sk-child sk-bounce2'></div>
                                <div className='sk-child sk-bounce3'></div>
                              </div>
                            </div>
                          }
                          >
                            <Index />
                          </Suspense>
                        </FormLoginSignupKeyContext.Provider>
                      </ShowFullSearchConext.Provider>
                    </SummaryHomeContext.Provider>
                  </HotTopicsContext.Provider>
                </ExchangeContext.Provider>
              </SignInFromAddProductContext.Provider>
            </CategoryContext.Provider>
          </Authenticated.Provider>
        </LaunchpadMapContext.Provider>
      </SignInContext.Provider>
    </ChainListContext.Provider>
  )
}
export default App
