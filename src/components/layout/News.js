import React, { useEffect, useState } from 'react'
import { Card, Image } from "antd";
import '../../pages/styles/home.scss'
import { get } from '../../api/products';
import iconGear5 from '../../assets/images/icon-gear5.png'
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

    return (
        <>
            <div className="home-new-title">News</div>
            <div className='home-new-list-card'>
                <Card bordered={false} className="criclebox h-full card-new">
                    {articles?.map((item, index) => (
                        <div className="home-new-card-news" key={index}>
                            <div className="home-new-card-news-header">
                            <div className="home-new-card-news-info">
                                <Image src={iconGear5} preview={false}/>
                                <div className="home-new-card-news-user">
                                    <div className="home-new-card-news-name">Gear5.guru</div>
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
                            </div>
                        </div>
                    ))}
                </Card>
            </div>
        </>
    )
}

export default News
