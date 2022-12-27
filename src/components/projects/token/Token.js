import React from 'react'
import { Image } from 'antd'
import './token.scss'

const Token = ({ image, data }) => {
    const BILLION = 1000000000
    return (
        <div className="token">
            <div className="token-header">
                <div className="token-header-item">
                    <div className="token-header-item-title">Market</div>
                    <div className="token-header-item-amount">
                        ${data?.detail?.marketcap?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}B
                    </div>
                </div>
                <div className="token-header-item">
                    <div className="token-header-item-title">Volume</div>
                    <div className="token-header-item-amount">
                        ${data?.detail?.volumeTrading?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}B
                    </div>
                </div>
                <div className="token-header-item">
                    <div className="token-header-item-title">Price</div>
                    <div className="token-header-item-amount">
                        ${data?.detail?.price ? data?.detail?.price?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}
                    </div>
                </div>
            </div>
            <div className="token-image">
                <div className="token-name">{data?.name}</div>
                <Image src={data?.image} preview={false}/>
                <div className="token-symbol">Symbol: {data?.symbol}</div>
            </div>
            <div className='token-parameter'>
                <div className="token-parameter-item">
                    <div className="token-parameter-item-title">Max Supply</div>
                    <div className="token-parameter-item-amount">
                        {data?.detail?.maxSupply !== null ?
                            data?.detail?.maxSupply > BILLION ? `$ ${(Math.floor(data?.detail?.maxSupply / BILLION)?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'))} B`
                            : 0 : 0}
                    </div>
                </div>
                <div className="token-parameter-item">
                    <div className="token-parameter-item-title">Circulating</div>
                    <div className="token-parameter-item-amount">
                        1.000.000
                        {/* {data?.detail?.maxSupply !== null ?
                            data?.detail?.maxSupply > BILLION ? `$ ${(Math.floor(data?.detail?.maxSupply / BILLION)?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'))} B`
                            : 0 : 0} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Token
