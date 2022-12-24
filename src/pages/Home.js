import React, { useEffect, useState } from "react";

import { Card, Col, Row, Image } from "antd";
import './styles/home.scss'
import chat from '../assets/images/chat.png'
import project from '../assets/images/project.png'
import scam from '../assets/images/scam.png'
import coming from '../assets/images/coming-soon.png'
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
import _ from "lodash";

import ProjectScam from "../components/projects/project-scam/ProjectScam";
import ProjectICO from "../components/projects/project-ico/ProjectICO";
import Token from "../components/projects/token/Token";
import ProjectItem from "../components/projects/project-item/ProjectItem";

const Home = () => {
  const navigate = useNavigate()
  const [summary, setSummary] = useState()
  const [dataProject, setDataProject] = useState()

  useEffect(() => {
    const getSummary = async() => {
      const summary = await get('reviews/summary')
      setSummary(summary?.data)
    }
    getSummary()
  }, [])

  useEffect(() => {
    const getDataProject = async() => {
      const [scams, icos, tokens, projects] = await Promise.all([
        get('reviews/product/filters', { page: 1, isscam: true } ).then(res => res?.data).catch(error => console.log(error)),
        get('reviews/product/filters', { page: 1, type: 'ico' } ).then(res => res?.data).catch(error => console.log(error)),
        get('reviews/product/filters', { page: 1, type: 'token' } ).then(res => res?.data).catch(error => console.log(error)),
        get('reviews/product/filters', { page: 1, type: 'project' } ).then(res => res?.data).catch(error => console.log(error)),
      ])
      setDataProject({
        scams: scams?.products !== null ? scams?.products : [],
        icos: icos?.products !== null ? icos?.products : [],
        tokens: tokens?.products !== null ? tokens?.products : [],
        projects: projects?.products !== null ? projects?.products : []
      })
    }
    getDataProject()
  }, [])

  const handleSeeAll = (value) => {
    console.log(value)
    navigate('filter', { state: { params: { ...value, page: 2 } }})
  }

  console.log(dataProject)
  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[40, 40]}>
          <Col span={24}>
            <div className="home-main">
              {/* <div style={{ marginBottom: '16px', marginTop: '30px' }}>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                      <Card bordered={false} className="criclebox no-padding h-full">
                        <div className="home-banner">
                          <div className="home-banner-content">
                            <div className="home-banner-text">
                              Don't Trust Verify
                            </div>
                          </div>
                          <div className="home-banner-image">
                            <Image src={banner} preview={false}/>
                          </div>
                        </div>
                      </Card>
                    </Col>
                </Row>
              </div> */}

              <div style={{ marginBottom: '16px', marginTop: '30px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Card bordered={false} className="criclebox h-full color-pink">
                      <div className="home-icon">
                        <Image src={chat} preview={false}/>
                      </div>
                      <div className="home-card-content-title">
                        {summary?.review24h ? summary?.review24h?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}
                      </div>
                      <div className="home-card-content-text">Number of comments</div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false} className="criclebox h-full color-blue">
                      <div className="home-icon">
                          <Image src={project} preview={false}/>
                        </div>
                        <div className="home-card-content-title">
                          {summary?.totalProduct ? summary?.totalProduct?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}
                        </div>
                      <div className="home-card-content-text">Number of products</div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Card bordered={false} className="criclebox h-full card-border">
                          <div className="home-card-content-text">
                            Scam projects in 24 hours
                          </div>
                          <div className="home-card-content-title">
                            {summary?.scamProduct24h ? summary?.scamProduct24h?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}
                          </div>
                        </Card>
                      </Col>
                      <Col span={24}>
                        <Card bordered={false} className="criclebox h-full card-border">
                          <div className="home-card-content-text">Number of chains</div>
                          <div className="home-card-content-title">
                            {summary?.totalChain ? summary?.totalChain?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <div>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Card bordered={false} className="criclebox h-full color-red">
                      <div className="home-card">
                        <div className="home-icon">
                          <Image src={scam} preview={false}/>
                        </div>
                        <div className="home-card-content">
                          <div className="home-card-content-title">
                            {summary?.totalscamProduct ? summary?.totalscamProduct?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}
                          </div>
                          <div className="home-card-content-text">Scam projects</div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card bordered={false} className="criclebox h-full color-red">
                      <div className="home-card">
                        <div className="home-icon">
                          <Image src={coming} preview={false}/>
                        </div>
                        <div className="home-card-content">
                          <div className="home-card-content-title">
                            {summary?.totalProductICO ? summary?.totalProductICO?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}
                          </div>
                          <div className="home-card-content-text">Upcoming project</div>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>

              {/* project scam */}
              {/* {!_.isEmpty(dataProject?.scams) && ( */}
                <div className="home-content">
                  <div className="home-content-title">
                    Project Scam
                    <div className="home-content-title-seeall" onClick={() => handleSeeAll({ isscam: true })}>See All</div>
                  </div>
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={15}
                    loop={true}
                    freeMode={true}
                    navigation={true}
                    modules={[FreeMode, Navigation]}
                  >
                    {dataProject?.scams?.map((item, index) => (
                      <SwiperSlide>
                        <ProjectScam
                          key={index}
                          bgurl={mask}
                          image={post}
                          chain={ethereum}
                          data={item}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              {/* )} */}

              {/* project ico */}
              {/* {!_.isEmpty(dataProject?.icos) && ( */}
                <div className="home-content">
                  <div className="home-content-title">
                    ICO/Airdrop
                    <div className="home-content-title-seeall" onClick={() => handleSeeAll({ type: 'ico' })}>See All</div>
                  </div>
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={15}
                    loop={true}
                    freeMode={true}
                    navigation={true}
                    modules={[FreeMode, Navigation]}
                  >
                    {dataProject?.icos?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProjectICO
                          data={item}
                          bgurl={mask}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              {/* )} */}
              
              {/* tokens */}
              {/* {!_.isEmpty(dataProject?.tokens) && ( */}
                <div className="home-content">
                  <div className="home-content-title">
                    Tokens
                    <div className="home-content-title-seeall" onClick={() => handleSeeAll({ type: 'token' })}>See All</div>
                  </div>
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={15}
                    loop={true}
                    freeMode={true}
                    navigation={true}
                    modules={[FreeMode, Navigation]}
                  >
                    {dataProject?.tokens?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Token data={item}/>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              {/* )} */}

              {/* list projects */}
              {/* {!_.isEmpty(dataProject?.projects) && ( */}
                <div className="home-content">
                  <div className="home-content-title">
                    List Project
                    <div className="home-content-title-seeall" onClick={() => handleSeeAll({ type : 'project' })}>See All</div>
                  </div>
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={15}
                    loop={true}
                    freeMode={true}
                    navigation={true}
                    modules={[FreeMode, Navigation]}
                  >
                    {dataProject?.projects?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <ProjectItem
                          data={item}
                          checked={checked}
                          chat_icon={chat_icon}
                          love_icon={love_icon}
                          scam_icon={scam_icon}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              {/* )} */}

              {/* <div className="home-content" style={{ marginBottom: '3rem' }}>
                <div className="home-content-post">
                    <Image src={binance} preview={false}/>
                    <div className="home-content-post-content">
                      <div className="home-content-post-content-info">
                        <div className="home-content-post-content-name">
                          Binance Announcement
                        </div>
                        <div className="home-content-post-time">40 minutes ago</div>
                      </div>
                      <div className="home-content-post-description">
                        <div className="home-content-post-description-title">
                          Celebrating 10 Million Followers on Twitter: Collect #Binance10M Badges to Share 10 Million Satoshis!
                        </div>
                        <div className="home-content-post-description-content">
                          During the activity period, all verified users who complete the following three tasks  and collect all three #Binance10M badges at the #Binance10M Activity Page, will qualify for this activity. 
                        </div>
                        <div className="home-content-post-description-image">
                          <Image src={newpost} preview={false}/>
                        </div>
                      </div>
                      <div className="home-content-post-reaction">
                        <div className="home-content-post-reaction-item">
                          <Image src={like_icon} preview={false}/>
                          10
                        </div>
                        <div className="home-content-post-reaction-item">
                          <Image src={dislike} preview={false}/>
                          10
                        </div>
                        <div className="home-content-post-reaction-item">
                          <Image src={comment} preview={false}/>
                          10
                        </div>
                      </div>
                    </div>
                </div>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
