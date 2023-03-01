import React, { useContext, createContext, useState } from 'react'
// / React router dom
import { Routes, Route, Outlet } from 'react-router-dom'

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

export const ReportModalContext = createContext()
export const AddModalContext = createContext()
export const ToggleContext = createContext()
export const PathNameContext = createContext()
const Markup = () => {
  const [openModalReport, setOpenModalReport] = useState(false)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [pathName, setPathName] = useState()

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
    handleChangePathName: (path) => setPathName(path)
  }

  const stateAdd = {
    openModalAdd: openModalAdd,
    handleSetOpenModal: (isOpen) => setOpenModalAdd(isOpen)
  }

  return (
    <>
      <ReportModalContext.Provider value={stateReport}>
        <AddModalContext.Provider value={stateAdd}>
          <ToggleContext.Provider value={stateToggle}>
            <PathNameContext.Provider value={statePathName}>
              <Routes>
                <Route element={<MainLayout />}>
                  {allroutes.map((data, i) => (
                    <Route key={i} path={`${data.url}`} element={data.component}/>
                  ))}
                  <Route path='confirm-email' element={<ConfirmEmail />}/>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='search/:keyword' element={<CategoryItem />}/>
                  <Route path=''>
                    <Route path=':category'>
                      <Route path='' element={<CategoryItem />} />
                      <Route
                        path=':subCategory'
                        element={<CategoryItem />}
                      />
                    </Route>
                  </Route>
                  <Route path='insight' element={<InsightMain />}>
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
                  <Route path='terms-of-service' element={<TermOfService />}/>
                  <Route path='privacy-policy' element={<TermOfService />}/>
                  <Route path='not-found-product' element={<NotFoundProduct />} />
                  <Route path='server-error' element={<ServerError />} />
                  <Route path='not-found' element={<NotFound />} />
                  <Route path='*' element={<NotFound />} />
                </Route>
              </Routes>
              <ScrollToTop />
              <Modal className='fade cus-modal' show={openModalReport} size='lg'>
                <Modal.Header className='cus-modal'>
                  <Modal.Title>Report scam projects to us</Modal.Title>
                  <Button
                    variant=''
                    className='btn-close'
                    onClick={() => setOpenModalReport(false)}
                  >

                  </Button>
                </Modal.Header>
                <Modal.Body className='cus-modal'>
                  <ModalReport isModal={true}/>
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
