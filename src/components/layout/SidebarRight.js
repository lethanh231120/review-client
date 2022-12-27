import React  from 'react'
import { Card } from "antd";
import '../../pages/styles/home.scss'
import News from './News';
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
                <News/>
            </div>
        </div>
    )
}

export default SidebarRight
