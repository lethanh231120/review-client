import React, { useContext, createContext, useState } from 'react'
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
import ScrollToTop from './layouts/ScrollToTop'
// / Dashboard
import Home from './components/Dashboard/Home'
// categoryItem
import CategoryItem from './components/CategoryPage/CategoryItem'
import { ConfirmEmail } from './components/auth/confirm-email'
// product detail
import ProductDetail1 from './components/product-detail/ProductDetail'
import LockScreen from './pages/LockScreen'
import Error400 from './pages/Error400'
import Error403 from './pages/Error403'
import Error404 from './pages/Error404'
import Error500 from './pages/Error500'
import Error503 from './pages/Error503'
import { ThemeContext } from '../context/ThemeContext'
// import { getCookie, STORAGEKEY } from '../utils/storage'
import ModalReport from './components/modal/modal-report/ModalReport'
import ModalAdd from './components/modal/modal-add-product/ModalAdd'

import { Button, Modal } from 'react-bootstrap'

export const ReportModalContext = createContext()
export const AddModalContext = createContext()
// export const CategoryContext = createContext()
// export const Authenticated = createContext()
// export const SignInContext = createContext()
// export const LaunchpadMapContext = createContext()
const Markup = () => {
  const [openModalReport, setOpenModalReport] = useState(false)
  const [openModalAdd, setOpenModalAdd] = useState(false)

  const allroutes = [
    // / Dashboard
    { url: '', component: <Home /> },
    { url: 'dashboard', component: <Home /> }
  ]

  const stateReport = {
    openModalReport: openModalReport,
    handleSetOpenModal: (isOpen) => setOpenModalReport(isOpen)
  }
  const stateAdd = {
    openModalAdd: openModalAdd,
    handleSetOpenModal: (isOpen) => setOpenModalAdd(isOpen)
  }

  return (
    <ReportModalContext.Provider value={stateReport}>
      <AddModalContext.Provider value={stateAdd}>
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
            <ModalReport/>
          </Modal.Body>
        </Modal>
        <Modal className='fade' show={openModalAdd} size='lg'>
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
            <Button
              variant=''
              className='btn-close'
              onClick={() => setOpenModalAdd(false)}
            >
            </Button>
          </Modal.Header>
          <Modal.Body>
            <ModalAdd/>
          </Modal.Body>
        </Modal>
      </AddModalContext.Provider>
    </ReportModalContext.Provider>
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
