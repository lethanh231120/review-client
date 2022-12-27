import React, { useEffect, useState } from 'react'
import { Card, Image } from "antd";
import '../../pages/styles/home.scss'
import newPost from '../../assets/images/newpost.jpg'
import new_cmt from '../../assets/images/new-cmt.png'
import heart from '../../assets/images/love.png'
import { get } from '../../api/products';
import bgimage from '../../assets/images/gear5.png'
import moment from 'moment';


const News = () => {
    const [articles, setArticles] = useState()
    useEffect(() => {
        const getArticle = async() => {
            const articles = await get('reviews/article?page=1')
            setArticles(articles?.data?.articles?.slice(0, 5))
        }
        getArticle()
    }, [])

    console.log(articles)
    return (
        <>
            <div className="home-new-title">News</div>
            <div style={{ marginBottom: '16px' }}>
                <Card bordered={false} className="criclebox h-full card-new">
                    {articles?.map((item, index) => (
                        <div className="home-new-card-news" key={index}>
                            <div className="home-new-card-news-header">
                            <div className="home-new-card-news-info">
                                <Image src={bgimage} preview={false}/>
                                <div className="home-new-card-news-user">
                                    <div className="home-new-card-news-name">Admin Gear5</div>
                                    <div className="home-new-card-news-identification">
                                        <div className="home-new-card-news-time">
                                            {moment(item?.updatedDate).startOf('YYYYMMDD').fromNow()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="home-new-card-news-content">
                                <div className="home-new-card-news-content-info">
                                    {item?.tagList?.length > 0 && (
                                        <div className='home-new-card-news-content-tag'>
                                            {item?.tagList?.map((item) => (
                                                <span style={{ color: 'blue', marginRight: '0.5rem' }}>#{item}</span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="home-new-card-news-title">
                                        {item?.title}
                                    </div>
                                    <div className="home-new-card-news-text">
                                        {item?.description}
                                    </div>
                                </div>
                                {item?.image && (
                                    <Image src={item?.image} preview={false}/>
                                )}
                            </div>
                            <div className="home-new-card-news-footer">
                            {/* <div className="home-new-card-news-reaction-item">
                                <Image src={new_cmt} preview={false}/>
                                10
                            </div>
                            <div className="home-new-card-news-reaction-item">
                                <Image src={heart} preview={false}/>
                                10
                            </div> */}
                            </div>
                        </div>
                    ))}
                {/* <div className="home-new-card-news">
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
                </div> */}
                </Card>
            </div>
        </>
    )
}

export default News
