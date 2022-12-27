import React  from 'react'
import { Card, Image } from "antd";
import '../../pages/styles/home.scss'
import twitter from '../../assets/images/twitter.png'
import binance from '../../assets/images/binance.jpg'
import post from '../../assets/images/newpost.jpg'
import new_cmt from '../../assets/images/new-cmt.png'
import heart from '../../assets/images/love.png'

const SidebarRight = ({ markets }) => {
    return (
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
    )
}

export default SidebarRight
