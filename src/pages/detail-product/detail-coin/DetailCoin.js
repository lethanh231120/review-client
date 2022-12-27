import React, { useEffect, useState } from 'react'
import { Image, Rate, Tooltip } from 'antd'
import { DownOutlined, WechatOutlined, CodeOutlined, CaretUpOutlined } from '@ant-design/icons'
import './detailCoin.scss'
import binance from '../../../assets/images/binance.jpg'
import checked from '../../../assets/images/checked.png'
import Review from '../../../components/list-review/Review'
import chat_icon from '../../../assets/images/chat-icon.png'
import liked from '../../../assets/images/liked.png'
import mask_scam from '../../../assets/images/mask-scam.png'
import { get } from '../../../api/products'
import { useParams } from 'react-router-dom'

const DetailCoin = () => {
    return (
        <>
            <div className='tokens-overview'>
                <Image src={binance} preview={false}/>
                <div className='tokens-overview-parameter'>
                    <div className='tokens-overview-parameter-info'>
                        <div className='tokens-overview-name'>Binance</div>
                        <div className='tokens-overview-symbol'>BNB</div>
                        <div className='tokens-overview-evaluate'>
                            <Tooltip placement="topLeft" title='reason scam'>
                                <Image src={checked} preview={false}/>
                            </Tooltip>
                        </div>
                    </div>
                    <div className='tokens-overview-parameter-reviews'>
                        <Rate allowHalf defaultValue={2.5} /> 4.9
                        {/* <div className='tokens-overview-parameter-reviews-amount'>Reviews 2.387</div> */}
                    </div>
                    <div className='tokens-overview-list-tags'>
                        <div className='tokens-tag'>Token</div>
                        <div className='tokens-tag'>300 Holders</div>
                        <div className='tokens-tag'>Ethereum</div>
                    </div>
                </div>
            </div>
            <div className='tokens-market'>
                <div className='tokens-market-symbol'>BNB Price (BNB)</div>
                <div className='tokens-market-price'>
                    $234.76
                    <div
                    className='tokens-market-profit'
                    style={{
                        background: 'rgb(0 128 0 / 52%)',
                        color: 'green'
                    }}
                    >
                        <CaretUpOutlined />
                        0.2%
                    </div>
                </div>
                <div className='tokens-market-list'>
                    <div className='tokens-market-list-item'>
                        <div className='tokens-market-list-item-title'>Market Cap</div>
                        <div className='tokens-market-list-item-amount'>$1.000.234</div>
                    </div>
                    <div className='tokens-market-list-item'>
                        <div className='tokens-market-list-item-title'>Total Supply</div>
                        <div className='tokens-market-list-item-amount'>$1.000.234</div>
                    </div>
                    <div className='tokens-market-list-item'>
                        <div className='tokens-market-list-item-title'>Max Supply</div>
                        <div className='tokens-market-list-item-amount'>$1.000.234</div>
                    </div>
                    <div className='tokens-market-list-item'>
                        <div className='tokens-market-list-item-title'>Volumn Trading</div>
                        <div className='tokens-market-list-item-amount'>$1.000.234</div>
                    </div>
                </div>
            </div>
            <div className='tokens-info'>
                <div className='tokens-info-item'>
                    <div className='tokens-info-item-key'>Category: </div>
                    <div className='tokens-overview-list-tags'>
                        <div className='tokens-tag'>Crypto Project</div>
                        <div className='tokens-tag'>Crypto Project</div>
                        <div className='tokens-tag'>Dex</div>
                    </div>
                </div>
            </div>

            <div className='tokens-info'>
                <div className='tokens-info-item'>
                    <div className='tokens-info-item-key'>Sub Category: </div>
                    <div className='tokens-overview-list-tags'>
                        <div className='tokens-tag'>Crypto Project</div>
                        <div className='tokens-tag'>Crypto Project</div>
                        <div className='tokens-tag'>Dex</div>
                    </div>
                </div>
            </div>

            <div className='tokens-info-item-key'>Product Info: </div>
            <div className='tokens-info'>
                <div className='tokens-info-item'>
                    <div className='tokens-tag-item'>
                        Source:
                        <CodeOutlined />
                        <div className='tokens-tag-item-list'>
                            <div className='tokens-tag-item-list-children'>source 1</div>
                            <div className='tokens-tag-item-list-children'>source 2</div>
                            <div className='tokens-tag-item-list-children'>source 3</div>
                            <div className='tokens-tag-item-list-children'>source 4</div>
                            <div className='tokens-tag-item-list-children'>source 5</div>
                        </div>
                    </div>
                </div>
                <div className='tokens-info-item'>
                    <div className='tokens-tag-item'>
                        Community
                        <DownOutlined />
                        <div className='tokens-tag-item-list'>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tokens-info-item'>
                    <div className='tokens-tag-item'>
                        Contract
                        <DownOutlined />
                        <div className='tokens-tag-item-list'>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tokens-info-item'>
                    <div className='tokens-tag-item'>
                        Founders
                        <DownOutlined />
                        <div className='tokens-tag-item-list'>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tokens-info-item'>
                    <div className='tokens-tag-item'>
                        Funds
                        <DownOutlined />
                        <div className='tokens-tag-item-list'>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tokens-info-item'>
                    <div className='tokens-tag-item'>
                        More
                        <DownOutlined />
                        <div className='tokens-tag-item-list'>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tokens-info-item'>
                    <div className='tokens-tag-item'>
                        Decimals
                        <DownOutlined />
                        <div className='tokens-tag-item-list'>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='tokens-info-item'>
                    <div className='tokens-tag-item'>
                        Websites
                        <DownOutlined />
                        <div className='tokens-tag-item-list'>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                            <div className='tokens-tag-item-list-children'>
                                <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='tokens-info-item-key'>Description: </div>
            <div className='tokens-info-item-desc'>
                bb-a-USD is a basket of stablecoins (DAI, USDC and USDT) and their yield bearing counterparts (aDAI, aUSDC and aUSDT) built on Balancer.
            </div>
        </>
    )
}

export default DetailCoin
