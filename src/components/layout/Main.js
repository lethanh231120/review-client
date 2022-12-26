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

import { Card, Image, Row, Col } from "antd";
import '../../pages/styles/home.scss'
import twitter from '../../assets/images/twitter.png'
import binance from '../../assets/images/binance.jpg'
import post from '../../assets/images/newpost.jpg'
import new_cmt from '../../assets/images/new-cmt.png'
import heart from '../../assets/images/love.png'
import { get } from "../../api/products";

const { Header: AntHeader, Content, Sider } = Layout;
export const CategoryContext = createContext()
export const SignInContext = createContext()

const Main = () => {
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const [markets, setMarkets] = useState()
  const [openModalSignIn, setOpenModalSignIn] = useState(false)
  

  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  const stateSignIn = {
    openModalSignIn: openModalSignIn,
    handleSetOpenModal: (isOpen) =>  setOpenModalSignIn(isOpen)
  }
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  const [category, setCategory] = useState({
    categoryId: '',
    subCategoryId: ''
  })

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

  return (
    <CategoryContext.Provider value={stateCategory}>
      <SignInContext.Provider value={stateSignIn}>
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
              padding: '0 2rem'
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
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                  console.log(collapsed, type);
                }}
                trigger={null}
                width='100%'
                theme="light"
                className={`sider-primary ant-layout-sider-primary ${
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
                  {/* <Route path='profile' element={<Profile />} /> */}
                  <Route path='filter'>
                    <Route path=''element={<CategoryItem />} />
                    <Route path=':keyword' element={<CategoryItem />} />
                    {/* <Route path='sub-category'>
                    </Route> */}
                  </Route>
                  <Route path='products'>
                    <Route path=':productId' element={<DetailProduct />} />
                  </Route>
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Content>
            </div>
            <div className="content-item">
              <Row>
                <Col xxl={{span:16}} sm={{ span: 24 }}>
                  <Sider width= '100%' style={{ background: 'transparent' }}>
                    <div className="home-left">
                      <div className="home-new">
                        <div className="home-new-title">Markets</div>
                        <div style={{ marginBottom: '16px' }}>
                          <Card bordered={false} className="criclebox h-full">
                            <div className="home-new-markets">
                              <div className="home-new-card">
                                <div className="home-new-card-title">MarketCap</div>
                                <div className="home-new-card-amount">
                                  ${markets?.marketCap ? (markets?.marketCap / 1000000000)?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}B
                                </div>
                              </div>
                              <div className="home-new-card">
                                <div className="home-new-card-title">Volume</div>
                                <div className="home-new-card-amount">
                                  ${markets?.volume ? (markets?.volume / 1000000000)?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}B
                                </div>
                              </div>
                              <div className="home-new-card">
                                <div className="home-new-card-title">Dominance</div>
                                <div className="home-new-card-amount">
                                  BTC: {markets?.btcDominance ? markets?.btcDominance : 0} %
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                        <div className="home-new-title">News</div>
                        <div style={{ marginBottom: '16px' }}>
                          <Card bordered={false} className="criclebox h-full card-new">
                            <div className="home-new-card-news">
                              <div className="home-new-card-news-header">
                                <div className="home-new-card-news-info">
                                  <Image src={binance} preview={false}/>
                                  <div className="home-new-card-news-user">
                                    <div className="home-new-card-news-name">Solscan</div>
                                    <div className="home-new-card-news-identification">
                                      @solscanofficial
                                      <div className="home-new-card-news-time">28m</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="home-new-card-news-network">
                                  <Image src={twitter} preview={false}/>
                                </div>
                              </div>
                              <div className="home-new-card-news-content">
                                <div className="home-new-card-news-content-info">
                                  <div className="home-new-card-news-title">
                                    <a href='https://twitter.com/hashtag/Solscan?src=hashtag_click&ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Elist-id%3A1402560189463601152%7Ctwcon%5Es1_c14' target='blank'>#Solscan </a>
                                    Features Update🔼 - TRUE TPS
                                  </div>
                                  <div className="home-new-card-news-text">
                                    In addition to Vote TPS data, users can now directly track True TPS indicators on our TPS dashboard. This is one of Solscan's efforts to reflect the Solana ecosystem status more transparently than ever.
                                  </div>
                                </div>
                                <Image src={post} preview={false}/>
                              </div>
                              <div className="home-new-card-news-footer">
                                <div className="home-new-card-news-reaction-item">
                                  <Image src={new_cmt} preview={false}/>
                                  10
                                </div>
                                <div className="home-new-card-news-reaction-item">
                                  <Image src={heart} preview={false}/>
                                  10
                                </div>
                              </div>
                            </div>
                            <div className="home-new-card-news">
                              <div className="home-new-card-news-header">
                                <div className="home-new-card-news-info">
                                  <Image src={binance} preview={false}/>
                                  <div className="home-new-card-news-user">
                                    <div className="home-new-card-news-name">Solscan</div>
                                    <div className="home-new-card-news-identification">
                                      @solscanofficial
                                      <div className="home-new-card-news-time">28m</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="home-new-card-news-network">
                                  <Image src={twitter} preview={false}/>
                                </div>
                              </div>
                              <div className="home-new-card-news-content">
                                <div className="home-new-card-news-content-info">
                                  <div className="home-new-card-news-title">
                                    <a href='https://twitter.com/hashtag/Solscan?src=hashtag_click&ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Elist-id%3A1402560189463601152%7Ctwcon%5Es1_c14' target='blank'>#Solscan </a>
                                    Features Update🔼 - TRUE TPS
                                  </div>
                                  <div className="home-new-card-news-text">
                                    In addition to Vote TPS data, users can now directly track True TPS indicators on our TPS dashboard. This is one of Solscan's efforts to reflect the Solana ecosystem status more transparently than ever.
                                  </div>
                                </div>
                                <Image src={post} preview={false}/>
                              </div>
                              <div className="home-new-card-news-footer">
                                <div className="home-new-card-news-reaction-item">
                                  <Image src={new_cmt} preview={false}/>
                                  10
                                </div>
                                <div className="home-new-card-news-reaction-item">
                                  <Image src={heart} preview={false}/>
                                  10
                                </div>
                              </div>
                            </div>
                            <div className="home-new-card-news">
                              <div className="home-new-card-news-header">
                                <div className="home-new-card-news-info">
                                  <Image src={binance} preview={false}/>
                                  <div className="home-new-card-news-user">
                                    <div className="home-new-card-news-name">Solscan</div>
                                    <div className="home-new-card-news-identification">
                                      @solscanofficial
                                      <div className="home-new-card-news-time">28m</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="home-new-card-news-network">
                                  <Image src={twitter} preview={false}/>
                                </div>
                              </div>
                              <div className="home-new-card-news-content">
                                <div className="home-new-card-news-content-info">
                                  <div className="home-new-card-news-title">
                                    <a href='https://twitter.com/hashtag/Solscan?src=hashtag_click&ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Elist-id%3A1402560189463601152%7Ctwcon%5Es1_c14' target='blank'>#Solscan </a>
                                    Features Update🔼 - TRUE TPS
                                  </div>
                                  <div className="home-new-card-news-text">
                                    In addition to Vote TPS data, users can now directly track True TPS indicators on our TPS dashboard. This is one of Solscan's efforts to reflect the Solana ecosystem status more transparently than ever.
                                  </div>
                                </div>
                                <Image src={post} preview={false}/>
                              </div>
                              <div className="home-new-card-news-footer">
                                <div className="home-new-card-news-reaction-item">
                                  <Image src={new_cmt} preview={false}/>
                                  10
                                </div>
                                <div className="home-new-card-news-reaction-item">
                                  <Image src={heart} preview={false}/>
                                  10
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </Sider>
                </Col>
              </Row>
            </div>
          </Layout>
        </Layout>
      </SignInContext.Provider>
    </CategoryContext.Provider>
  );
}

export default Main;
