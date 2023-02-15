import { Suspense, createContext, useEffect, useState } from 'react'
import Index from './jsx'
import './vendor/bootstrap-select/dist/css/bootstrap-select.min.css'
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

const App = () => {
  const [openModalSignIn, setOpenModalSignIn] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [categories, setCategories] = useState([])
  const [chainList, setChainList] = useState([])
  const [launchpadMap, setLaunchpadMap] = useState([])
  const [isOpenModalAddProduct, setIsOpenModalAddProduct] = useState(false)
  const [hotTopics, setHotTopics] = useState([])

  // const [data, setData] = useState({
  //   chainList: [],
  //   launchpadMap: [],
  //   categories: [],
  //   isAuthenticated: false,
  //   openModalSignIn: false
  // })
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
    if (res?.code === '200') {
      if (res?.data?.products && !_.isEmpty(res?.data?.products)) {
        const list = res?.data?.products

        const sorted = list?.sort((a, b) => parseInt(a?.totalReviews) - parseInt(b?.totalReviews))
        if (sorted?.length > 5) {
          setHotTopics(sorted?.slice(0, 5))
        } else {
          setHotTopics(res?.data?.products)
        }
      }
    }
  }

  useEffect(() => {
    getCategoryAndSubcategories()
    getChainList()
    getHotList()
  }, [])

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
    getLaunchpad()
  }, [])

  return (
    <ChainListContext.Provider value={chainList}>
      <SignInContext.Provider value={stateSignIn}>
        <LaunchpadMapContext.Provider value={launchpadMap}>
          <Authenticated.Provider value={stateAuthenticated}>
            <CategoryContext.Provider value={categories}>
              <SignInFromAddProductContext.Provider value={stateOpenAddProduct}>
                <HotTopicsContext.Provider value={hotTopics}>
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
                </HotTopicsContext.Provider>
              </SignInFromAddProductContext.Provider>
            </CategoryContext.Provider>
          </Authenticated.Provider>
        </LaunchpadMapContext.Provider>
      </SignInContext.Provider>
    </ChainListContext.Provider>
  )
}
export default App
