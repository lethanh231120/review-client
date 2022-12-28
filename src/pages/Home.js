import React, { useEffect, useState, useContext } from "react";

import { Card, Col, Row } from "antd";
import './styles/home.scss'
import post from '../assets/images/newpost.jpg'
import mask from '../assets/images/mask.png'
import ethereum from '../assets/images/ethereum.png'
import checked from '../assets/images/checked.png'
import chat_icon from '../assets/images/chat-icon.png'
import love_icon from '../assets/images/love-icon.png'
import scam_icon from '../assets/images/scam-icon.png'
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation } from "swiper"
import { get } from "../api/products";
import { useNavigate } from "react-router-dom";
import { MarketContext } from "../components/layout/Main";
import ProjectScam from "../components/projects/project-scam/ProjectScam";
import ProjectICO from "../components/projects/project-ico/ProjectICO";
import Token from "../components/projects/token/Token";
import ProjectItem from "../components/projects/project-item/ProjectItem";
import ScamEmpty from "../components/projects/project-scam/ScamEmpty";
import ICOEmpty from "../components/projects/project-ico/ICOEmpty";
import TokenEmpty from "../components/projects/token/TokenEmpty";
import ProjectEmpty from "../components/projects/project-item/ProjectEmpty";
import News from "../components/layout/News";

const Home = () => {
  const marketContext = useContext(MarketContext)
  const navigate = useNavigate()

  const [summary, setSummary] = useState()
  const [scams, setScams] = useState({
    loading: true,
    data: null
  })
  const [tokens, setTokens] = useState({
    loading: true,
    data: null
  })
  const [icos, setIcos] = useState({
    loading: true,
    data: null
  })
  const [projects, setProjects] = useState({
    loading: true,
    data: null
  })

  useEffect(() => {
    const getSummary = async() => {
      const summary = await get('reviews/summary')
      setSummary(summary?.data)
    }
    getSummary()
  }, [])

  useEffect(() => {
    get('reviews/product/filters', { page: 1, isscam: true }).then(res => setScams({loading: false, data: res?.data?.products})).catch(err => console.log(err))
    get('reviews/product/filters', { page: 1, type: 'ico' }).then(res => setIcos({loading: false, data: res?.data?.products})).catch(err => console.log(err))
    get('reviews/product/filters', { page: 1, type: 'token' }).then(res => setTokens({loading: false, data: res?.data?.products})).catch(err => console.log(err))
    get('reviews/product/filters', { page: 1, type: 'project' }).then(res => setProjects({loading: false, data: res?.data?.products})).catch(err => console.log(err))
  }, [])

  const handleSeeAll = (value) => {
    navigate('filter', { state: { params: { ...value, page: 2 } }})
  }

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[40, 40]}>
          <Col span={24}>
            <div className="home-main">
              <div className="home-main-summary">
                <Row gutter={[16, 16]}>
                  <Col xl={{ span: 8 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    <Card bordered={false} className="criclebox h-full card-center">
                      <div onClick={() => handleSeeAll({ type: 'ico' })} >
                        <div className="home-card-content-title">
                          {new Intl.NumberFormat().format(summary?.totalProductICO ? summary?.totalProductICO : 0)}
                          {/* {summary?.totalProductICO ? summary?.totalProductICO?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0} */}
                        </div>
                        <div className="home-card-content-text">Upcoming projects</div>
                      </div>
                    </Card>
                  </Col>
                  <Col xl={{ span: 8 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    <Card bordered={false} className="criclebox h-full card-center">
                      <div className="home-card-content-title">
                        {new Intl.NumberFormat().format(summary?.totalProduct ? summary?.totalProduct : 0)}
                        {/* {summary?.totalProduct ? summary?.totalProduct?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0} */}
                      </div>
                      <div className="home-card-content-text">Total products</div>
                    </Card>
                  </Col>
                  <Col xl={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Row gutter={[16, 16]}>
                      <Col xl={{ span: 24 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Card bordered={false} className="criclebox h-full card-border">
                          <div className="home-card-content-text">
                            Total investors
                          </div>
                          <div className="home-card-content-title">
                            {new Intl.NumberFormat().format(summary?.investor ? summary?.investor : 0)}
                            {/* {summary?.investor ? summary?.investor?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0} */}
                          </div>
                        </Card>
                      </Col>
                      <Col xl={{ span: 24 }} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <Card bordered={false} className="criclebox h-full card-border">
                          <div className="home-card-content-text">Vendors</div>
                          <div className="home-card-content-title">
                            {new Intl.NumberFormat().format(summary?.venderCapital ? summary?.venderCapital : 0)}
                            {/* {summary?.venderCapital ? summary?.venderCapital?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0} */}
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              <div className="home-market">
                <div className="home-new-title">Markets</div>
                  <div style={{ marginBottom: '16px' }}>
                    <Card bordered={false} className="criclebox h-full">
                      <div className="home-new-markets">
                        <div className="home-new-card">
                          <div className="home-new-card-title">MarketCap</div>
                          <div className="home-new-card-amount">
                            ${marketContext?.marketCap ? (marketContext?.marketCap / 1000000000)?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}B
                          </div>
                        </div>
                        <div className="home-new-card">
                          <div className="home-new-card-title">Volume</div>
                          <div className="home-new-card-amount">
                            ${marketContext?.volume ? (marketContext?.volume / 1000000000)?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}B
                          </div>
                        </div>
                        <div className="home-new-card">
                          <div className="home-new-card-title">Dominance</div>
                          <div className="home-new-card-amount">
                            BTC: {marketContext?.btcDominance ? marketContext?.btcDominance : 0} %
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
              </div>

              <div className="home-content">
                <div className="home-content-title">
                  Crypto Scams
                  <div className="home-content-title-seeall" onClick={() => handleSeeAll({ isscam: true })}>See All</div>
                </div>
                <Swiper
                  loop={true}
                  freeMode={true}
                  navigation={true}
                  modules={[FreeMode, Navigation]}
                  breakpoints={{
                    250: {
                      slidesPerView: 1,
                    },
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 15
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20
                    },
                    1244: {
                      slidesPerView: 3,
                      spaceBetween: 15
                    }
                  }}
                >
                  {!scams?.loading ? (
                    <>
                      {scams?.data?.map((item, index) => (
                        <SwiperSlide onClick={() => navigate(`products/${item?.id}`)}>
                          <ProjectScam
                            key={index}
                            bgurl={mask}
                            image={post}
                            chain={ethereum}
                            data={item}
                          />
                        </SwiperSlide>
                      ))}
                    </>
                  ) : (
                    <>
                      <SwiperSlide>
                        <ScamEmpty/>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ScamEmpty/>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ScamEmpty/>
                      </SwiperSlide>
                    </>
                  )}
                </Swiper>
              </div>

              <div className="home-content">
                <div className="home-content-title">
                  ICO/Airdrops
                  <div className="home-content-title-seeall" onClick={() => handleSeeAll({ type: 'ico' })}>See All</div>
                </div>
                <Swiper
                  loop={true}
                  freeMode={true}
                  navigation={true}
                  modules={[FreeMode, Navigation]}
                  breakpoints={{
                    250: {
                      slidesPerView: 1,
                    },
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 15
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20
                    },
                    1244: {
                      slidesPerView: 3,
                      spaceBetween: 15
                    }
                  }}
                >
                  {!icos?.loading ? (
                    <>
                        {icos?.data?.map((item, index) => (
                        <SwiperSlide key={index} onClick={() => navigate(`products/${item?.id}`)}>
                          <ProjectICO
                            data={item}
                            bgurl={mask}
                          />
                        </SwiperSlide>
                      ))}
                    </>
                  ) : (
                    <>
                      <SwiperSlide>
                        <ICOEmpty bgurl={mask}/>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ICOEmpty bgurl={mask}/>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ICOEmpty bgurl={mask}/>
                      </SwiperSlide>
                    </>
                  )}
                </Swiper>
              </div>
              
              <div className="home-content">
                <div className="home-content-title">
                  Tokens
                  <div className="home-content-title-seeall" onClick={() => handleSeeAll({ type: 'token' })}>See All</div>
                </div>
                <Swiper
                  loop={true}
                  freeMode={true}
                  navigation={true}
                  modules={[FreeMode, Navigation]}
                  breakpoints={{
                    250: {
                      slidesPerView: 1,
                    },
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 15
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20
                    },
                    1244: {
                      slidesPerView: 3,
                      spaceBetween: 15
                    }
                  }}
                >
                  {!tokens?.loading ? (
                    <>
                        {tokens?.data?.map((item, index) => (
                          <SwiperSlide key={index} onClick={() => navigate(`products/${item?.id}`)}>
                            <Token data={item}/>
                          </SwiperSlide>
                        ))}
                    </>
                  ) : (
                    <>
                      <SwiperSlide>
                        <TokenEmpty/>
                      </SwiperSlide>
                      <SwiperSlide>
                        <TokenEmpty/>
                      </SwiperSlide>
                      <SwiperSlide>
                        <TokenEmpty/>
                      </SwiperSlide>
                    </>
                  )}
                </Swiper>
              </div>

              <div className="home-content">
                <div className="home-content-title">
                  Top Project
                  <div className="home-content-title-seeall" onClick={() => handleSeeAll({ type : 'project' })}>See All</div>
                </div>
                <Swiper
                  loop={true}
                  freeMode={true}
                  navigation={true}
                  modules={[FreeMode, Navigation]}
                  breakpoints={{
                    250: {
                      slidesPerView: 1,
                    },
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 15
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20
                    },
                    1244: {
                      slidesPerView: 3,
                      spaceBetween: 15
                    }
                  }}
                >
                  {!projects?.loading ? (
                    <>
                      {projects?.data?.map((item, index) => (
                        <SwiperSlide key={index} onClick={() => navigate(`products/${item?.id}`)}>
                          <ProjectItem
                            data={item}
                            checked={checked}
                            chat_icon={chat_icon}
                            love_icon={love_icon}
                            scam_icon={scam_icon}
                          />
                        </SwiperSlide>
                      ))}
                    </>
                  ) : (
                    <>
                      <SwiperSlide>
                        <ProjectEmpty/>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ProjectEmpty/>
                      </SwiperSlide>
                      <SwiperSlide>
                        <ProjectEmpty/>
                      </SwiperSlide>
                    </>
                  )}
                </Swiper>
              </div>

              {/* <div className="home-left"> */}
                <div className="home-new article">
                  <News/>
                  {/* <div className="home-new-title">News</div>
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
                  </div> */}
                </div>
              {/* </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
