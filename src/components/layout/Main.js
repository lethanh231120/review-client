import React, { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
// import Footer from "./Footer";

import { Routes, Route } from "react-router-dom";
import Home from "../../../src/pages/Home";
import NotFound from "./404";
import DetailProduct from "../../pages/detail-product/DetailProduct";
import CategoryItem from "../category-item/CategoryItem";

import { Row, Col } from "antd";
import '../../pages/styles/home.scss'
import SidebarRight from "./SidebarRight";
import { get } from "../../api/products";
import { getCookie, STORAGEKEY } from "../../utils/storage";
// import twitter from '../../assets/images/twitter.png'
// import binance from '../../assets/images/binance.jpg'
// import post from '../../assets/images/newpost.jpg'
// import new_cmt from '../../assets/images/new-cmt.png'
// import heart from '../../assets/images/love.png'
// import { get } from "../../api/products";

const { Header: AntHeader, Content, Sider } = Layout;

export const CategoryContext = createContext()
export const SignInContext = createContext()
export const Authenticated = createContext()
export const MarketContext = createContext()
const Main = () => {
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const [markets, setMarkets] = useState()
  const [openModalSignIn, setOpenModalSignIn] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [category, setCategory] = useState({
    categoryId: '',
    subCategoryId: ''
  })
  
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  const stateSignIn = {
    openModalSignIn: openModalSignIn,
    handleSetOpenModal: (isOpen) =>  setOpenModalSignIn(isOpen)
  }
  const stateAuthenticated = {
    isAuthenticated: isAuthenticated,
    handleSetAuthenticated: (isAuth) =>  setIsAuthenticated(isAuth)
  }

  const stateCategory = {
    category: category,
    handleSetCategory: (data) => {
      const { categoryId, subCategoryId } = data
      setCategory({
        categoryId: categoryId ? categoryId : '',
        subCategoryId: subCategoryId ? subCategoryId : ''
      })
    }
  }

  useEffect(() => {
    const getMarket = async() => {
      const markets = await get('reviews/market')
      setMarkets(markets?.data)
    }
    getMarket()
  }, [])

  useEffect(() => {
    setIsAuthenticated(!!(getCookie(STORAGEKEY.ACCESS_TOKEN)))
  }, [])

  return (
    <CategoryContext.Provider value={stateCategory}>
      <SignInContext.Provider value={stateSignIn}>
        <MarketContext.Provider value={markets}>
          <Authenticated.Provider value={stateAuthenticated}>
            <Layout
              className={`layout-dashboard ${
                pathname === "profile" ? "layout-profile" : ""
              } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
              style={{ margin: '0px auto' }}
            >
              <div
                style={{
                  margin: '0px auto',
                  width: '100%',
                  background: '#fff',
                  boxShadow: `rgba(0, 0, 0, 0.1) 0px 4px 12px`,
                  padding: '0 2rem',
                }}
              >
                {fixed ? (
                  <Affix>
                    <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                      <Header
                        subName={pathname}
                        handleSidenavColor={handleSidenavColor}
                        handleSidenavType={handleSidenavType}
                        handleFixedNavbar={handleFixedNavbar}
                        sidenavType={sidenavType}
                        sidenavColor={sidenavColor}
                      />
                    </AntHeader>
                  </Affix>
                ) : (
                  <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                    <Header
                      subName={pathname}
                      handleSidenavColor={handleSidenavColor}
                      handleSidenavType={handleSidenavType}
                      handleFixedNavbar={handleFixedNavbar}
                      sidenavType={sidenavType}
                      sidenavColor={sidenavColor}
                    />
                  </AntHeader>
                )}
              </div>
              <Layout
                style={{
                  overflowY: 'hidden',
                  margin: '0px auto',
                  display: 'flex',
                  maxWidth: '192rem',
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '0 2rem'
                }}>
                <div className="content-item">
                  <Sider
                    width='100%'
                    className={`sider-primary ant-layout-sider-primary content-item-sider-left${
                      sidenavType === "#fff" ? "active-route" : ""
                    }`}
                    style={{
                      background: sidenavType,
                      overflowY: 'auto',
                      margin: '0px auto'
                    }}
                  >
                    <Row>
                      <Col xxl={{ span: 8 } } sm={{ span: 0 }}></Col>
                      <Col xxl={{ span: 16 }} sm={{ span: 24 }}>
                        <Sidenav color={sidenavColor} />
                      </Col>
                    </Row>
                  </Sider>
                </div>
                <div className="content-item">
                  <Content
                    className="content-ant"
                    style={{
                      overflowY: 'auto',
                      overflowX: 'hidden',
                    }}>
                    <Routes>
                      <Route path='' element={<Home />} />
                      <Route path='filter'>
                        <Route path=''element={<CategoryItem />} />
                        <Route path=':keyword' element={<CategoryItem />} />
                      </Route>
                      <Route path='products'>
                        <Route path=':productId' element={<DetailProduct />} />
                      </Route>
                      <Route path='*' element={<NotFound />} />
                    </Routes>
                  </Content>
                </div>
                <div className="content-item market">
                  <Row>
                    <Col xxl={{span:16}} sm={{ span: 24 }}>
                      <Sider width= '100%' style={{ background: 'transparent' }}>
                        <SidebarRight markets={markets}/>
                      </Sider>
                    </Col>
                  </Row>
                </div>
              </Layout>
            </Layout>
          </Authenticated.Provider>
        </MarketContext.Provider>
      </SignInContext.Provider>
    </CategoryContext.Provider>
  );
}

export default Main;
