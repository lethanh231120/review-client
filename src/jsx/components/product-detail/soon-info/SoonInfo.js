import React from 'react'
import { Tab } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import CoinChart from '../../Crypto/Coin/CoinChart'
import QuickTrade from '../../Crypto/Coin/QuickTrade'
import CoinBuyTable from '../../Crypto/Coin/CoinBuyTable'
import CoinSellTable from '../../Crypto/Coin/CoinSellTable'
import { formatLargeNumber } from '../../../../utils/formatNumber'

const SoonInfo = ({ productInfo }) => {
  return (
    <>
      <div className='row'>
        <Tab.Container defaultActiveKey='bitcoin'>
          <div className='col-xl-12'>
            <Tab.Content>
              <Tab.Pane eventKey='bitcoin'>
                <div className='row'>
                  <div className='col-xl-3 col-xxl-3 col-sm-6'>
                    <div className='card  digital-cash'>
                      <div className='card-header border-0'>
                        <h4 className='mb-0 heading'>About</h4>
                      </div>
                      <div className='card-body py-0'>
                        <div className='text-center'>
                          <div className='media d-block'>
                            <img src={productInfo?.details?.bigLogo} width={126} height={126} />
                            <div className='media-content'>
                              <h4 className='mt-0 mt-md-4 fs-20 font-w700 text-black mb-0'>
                                {productInfo?.details?.projectName}
                              </h4>
                              <span className='font-w600 text-black'>
                                {productInfo?.details?.projectSymbol}
                              </span>
                              <span className='my-4 fs-16 font-w600 d-block'>
                                {productInfo?.details?.totalSupply ? `${formatLargeNumber(productInfo?.details?.totalSupply)} ${productInfo?.details?.type} supply` : '' }
                              </span>
                              <p className='text-start'>
                                Dash is an open source cryptocurrency. It is an
                                altcoin that was forked from the Bitcoin
                                protocol. It is also a decentralized autonomous
                                organization (DAO)...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='card-footer p-2 border-0'>
                        <Link to={'#'} className='btn btn-link text-primary'>
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-9 col-xxl-9'>
                    <CoinChart />
                  </div>
                  <div className='col-xl-6 col-sm-6'>
                    <QuickTrade />
                  </div>
                  <div className='col-xl-3 col-sm-6'>
                    <CoinBuyTable bgChange='warning' />
                  </div>
                  <div className='col-xl-3 col-sm-6'>
                    <CoinSellTable bgChangeSell='warning' />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey='ethereum'>
                <div className='row'>
                  <div className='col-xl-9 col-xxl-9'>
                    <CoinChart />
                  </div>
                  <div className='col-xl-3 col-xxl-3 col-sm-6 '>
                    <div className='card  digital-cash'>
                      <div className='card-header border-0'>
                        <h4 className='mb-0 heading'>About</h4>
                      </div>
                      <div className='card-body py-0'>
                        <div className='text-center'>
                          <div className='media d-block'>
                            <svg
                              width='126'
                              height='126'
                              viewBox='0 0 126 126'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M64.9961 72.8351C63.7146 73.2618 62.2869 73.2618 61.0053 72.8351L47.2507 68.25L63.0007 94.5L78.7507 68.25L64.9961 72.8351Z'
                                fill='#00ADA3'
                              />
                              <path
                                d='M63.0007 63L78.7507 56.7003L63.0007 31.5L47.2507 56.7003L63.0007 63Z'
                                fill='#00ADA3'
                              />
                              <path
                                d='M63.0004 0C28.2065 0 0.000366211 28.2061 0.000366211 63C0.000366211 97.7938 28.2065 126 63.0004 126C97.7942 126 126 97.7938 126 63C125.962 28.2226 97.7777 0.0384523 63.0004 0V0ZM89.5256 60.513L67.0255 105.513C65.9145 107.737 63.2105 108.637 60.9885 107.526C60.1164 107.091 59.4106 106.385 58.9752 105.513L36.4751 60.513C35.7761 59.1094 35.8558 57.4436 36.6852 56.1129L59.1853 20.1133C60.6809 18.0067 63.5991 17.5095 65.7058 19.0051C66.1356 19.3099 66.5105 19.6835 66.8154 20.1133L89.3141 56.1129C90.145 57.4436 90.2246 59.1094 89.5256 60.513V60.513Z'
                                fill='#00ADA3'
                              />
                            </svg>
                            <div className='media-content'>
                              <h4 className='mt-4 fs-20 font-w700 text-black mb-0'>
                                Digital Cash
                              </h4>
                              <span className='font-w600 text-black'>
                                Ethereum
                              </span>
                              <span className='my-4 fs-16 font-w600 d-block'>
                                1 ETHEREUM = 3,219.89 USD
                              </span>
                              <p className='text-start'>
                                Ethereum is an open source cryptocurrency. It is
                                an altcoin that was forked from the Bitcoin
                                protocol. It is also a decentralized autonomous
                                organization (DAO)...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='card-footer p-2 border-0'>
                        <Link to={'#'} className='btn btn-link text-primary'>
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-sm-6'>
                    <QuickTrade />
                  </div>
                  <div className='col-xl-3 col-sm-6 '>
                    <CoinBuyTable bgChange='info' />
                  </div>
                  <div className='col-xl-3 col-sm-6'>
                    <CoinSellTable bgChangeSell='info' />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey='dash'>
                <div className='row'>
                  <div className='col-xl-9 col-xxl-9 '>
                    <CoinChart />
                  </div>
                  <div className='col-xl-3 col-xxl-3 col-sm-6'>
                    <div className='card  digital-cash'>
                      <div className='card-header border-0'>
                        <h4 className='mb-0 heading'>About</h4>
                      </div>
                      <div className='card-body py-0'>
                        <div className='text-center'>
                          <div className='media d-block'>
                            <svg
                              width='126'
                              height='126'
                              viewBox='0 0 126 126'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M63 0C28.2061 0 0 28.2061 0 63C0 97.7938 28.2061 126 63 126C97.7938 126 126 97.7938 126 63C125.962 28.2226 97.7774 0.0384523 63 0ZM36.9843 58.4997H54.9841C57.4697 58.4997 59.4844 60.5143 59.4844 63C59.4844 65.4857 57.4697 67.5003 54.9841 67.5003H36.9843C34.4986 67.5003 32.484 65.4857 32.484 63C32.484 60.5143 34.5 58.4997 36.9843 58.4997ZM93.2524 52.0974L87.8402 79.1761C86.5658 85.4616 81.0465 89.9853 74.6332 90.0004H36.9843C34.4986 90.0004 32.484 87.9858 32.484 85.5001C32.484 83.0144 34.5 80.9998 36.9843 80.9998H74.6332C76.7604 80.9943 78.591 79.4947 79.014 77.41L84.4276 50.3313C84.9082 47.9143 83.3399 45.566 80.9243 45.0853C80.6373 45.029 80.3461 45.0002 80.055 45.0002H45.9848C43.4992 45.0002 41.4846 42.9856 41.4846 40.4999C41.4846 38.0142 43.4992 35.9996 45.9848 35.9996H80.055C87.49 36.0024 93.5147 42.0298 93.5133 49.4648C93.5133 50.3478 93.4254 51.2295 93.2524 52.0974Z'
                                fill='#3693FF'
                              />
                            </svg>
                            <div className='media-content'>
                              <h4 className='mt-0 mt-md-4 fs-20 font-w700 text-black mb-0'>
                                Digital Cash
                              </h4>
                              <span className='font-w600 text-black'>DASH</span>
                              <span className='my-4 fs-16 font-w600 d-block'>
                                1 DASH = 68.48 USD
                              </span>
                              <p className='text-start'>
                                Dash is an open source cryptocurrency. It is an
                                altcoin that was forked from the Bitcoin
                                protocol. It is also a decentralized autonomous
                                organization (DAO)...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='card-footer p-2 border-0'>
                        <Link to={'#'} className='btn btn-link text-primary'>
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-sm-6'>
                    <QuickTrade />
                  </div>
                  <div className='col-xl-3 col-sm-6'>
                    <CoinBuyTable bgChange='secondary' />
                  </div>
                  <div className='col-xl-3 col-sm-6'>
                    <CoinSellTable bgChangeSell='secondary' />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey='litecoin'>
                <div className='row'>
                  <div
                    className='col-xl-9 col-xxl-9 wow fadeInLeft'
                    data-wow-delay='0.2s'
                  >
                    <CoinChart />
                  </div>
                  <div
                    className='col-xl-3 col-xxl-3 col-sm-6 wow fadeInRight'
                    data-wow-delay='0.3s'
                  >
                    <div className='card  digital-cash'>
                      <div className='card-header border-0'>
                        <h4 className='mb-0 heading'>About</h4>
                      </div>
                      <div className='card-body py-0'>
                        <div className='text-center'>
                          <div className='media d-block'>
                            <svg
                              width='126'
                              height='126'
                              viewBox='0 0 126 126'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M63 0C28.2061 0 0 28.2061 0 63C0 97.7938 28.2061 126 63 126C97.7938 126 126 97.7938 126 63C125.96 28.2226 97.7774 0.0398255 63 0V0ZM85.5001 94.5007H49.5005C47.0148 94.5007 45.0002 92.4861 45.0002 90.0004C45.0002 89.7875 45.0153 89.5747 45.0455 89.3632L48.4321 65.6532L41.5917 67.3643C41.2346 67.455 40.8679 67.5003 40.4999 67.5003C38.0142 67.4975 36.0024 65.4815 36.0037 62.9959C36.0065 60.9332 37.41 59.1369 39.4109 58.6343L49.8054 56.036L54.0447 26.3618C54.3963 23.9009 56.676 22.1925 59.1369 22.544C61.5979 22.8956 63.3062 25.1753 62.9547 27.6362L59.233 53.6794L75.4091 49.6351C77.8165 49.0212 80.2651 50.4755 80.8776 52.8829C81.4914 55.2903 80.0371 57.7389 77.6297 58.3528C77.616 58.3555 77.6023 58.3596 77.5885 58.3624L57.857 63.2953L54.6861 85.5001H85.5001C87.9858 85.5001 90.0004 87.5147 90.0004 90.0004C90.0004 92.4847 87.9858 94.5007 85.5001 94.5007Z'
                                fill='#374C98'
                              />
                            </svg>
                            <div className='media-content'>
                              <h4 className='mt-0 mt-md-4 fs-20 font-w700 text-black mb-0'>
                                Digital Cash
                              </h4>
                              <span className='font-w600 text-black'>
                                LITCOIN
                              </span>
                              <span className='my-4 fs-16 font-w600 d-block'>
                                1 LITCOIN = 68.48 USD
                              </span>
                              <p className='text-start'>
                                Litecoin is an open source cryptocurrency. It is
                                an altcoin that was forked from the Bitcoin
                                protocol. It is also a decentralized autonomous
                                organization (DAO)...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='card-footer p-2 border-0'>
                        <Link to={'#'} className='btn btn-link text-primary'>
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className='col-xl-6 col-sm-6 wow fadeInUp'
                    data-wow-delay='0.4s'
                  >
                    <QuickTrade />
                  </div>
                  <div
                    className='col-xl-3 col-sm-6 wow fadeInUp'
                    data-wow-delay='0.5s'
                  >
                    <CoinBuyTable bgChange='primary' />
                  </div>
                  <div
                    className='col-xl-3 col-sm-6 wow fadeInUp'
                    data-wow-delay='0.6s'
                  >
                    <CoinSellTable bgChangeSell='primary' />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey='ripple'>
                <div className='row'>
                  <div className='col-xl-9 col-xxl-9 wow fadeInLeft'>
                    <CoinChart />
                  </div>
                  <div className='col-xl-3 col-xxl-3 col-sm-6'>
                    <div className='card  digital-cash'>
                      <div className='card-header border-0'>
                        <h4 className='mb-0 heading'>About</h4>
                      </div>
                      <div className='card-body py-0'>
                        <div className='text-center'>
                          <div className='media d-block'>
                            <svg
                              width='126'
                              height='126'
                              viewBox='0 0 126 126'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M62.9999 126C75.4601 126 87.6405 122.305 98.0007 115.382C108.361 108.46 116.436 98.6206 121.204 87.109C125.973 75.5972 127.22 62.93 124.789 50.7092C122.358 38.4885 116.359 27.263 107.548 18.4522C98.7368 9.64157 87.5114 3.64141 75.2906 1.21055C63.0698 -1.22031 50.4026 0.0272952 38.8908 4.79561C27.3792 9.56392 17.54 17.6388 10.6174 27.9991C3.69488 38.3593 0 50.5397 0 62.9999C0 79.7085 6.63747 95.7327 18.4522 107.548C30.2671 119.362 46.2913 126 62.9999 126Z'
                                fill='#23292F'
                              />
                              <path
                                d='M86.0515 36.1686H95.524L75.8253 55.8223C72.4017 59.2421 67.7606 61.163 62.9216 61.163C58.0825 61.163 53.4414 59.2421 50.0178 55.8223L30.3754 36.1686H39.8366L54.7991 51.0973C56.9675 53.2634 59.9072 54.4801 62.9722 54.4801C66.0371 54.4801 68.9769 53.2634 71.1453 51.0973L86.0515 36.1686Z'
                                fill='white'
                              />
                              <path
                                d='M39.7916 90.8322H30.3754L50.1416 71.0548C53.5652 67.635 58.2062 65.7141 63.0453 65.7141C67.8844 65.7141 72.5254 67.635 75.949 71.0548L95.7602 90.8322H86.299L71.224 75.7798C69.0556 73.6137 66.1159 72.397 63.0509 72.397C59.986 72.397 57.0463 73.6137 54.8778 75.7798L39.7916 90.8322Z'
                                fill='white'
                              />
                            </svg>
                            <div className='media-content'>
                              <h4 className='mt-0 mt-md-4  fs-20 font-w700 text-black mb-0'>
                                Digital Cash
                              </h4>
                              <span className='font-w600 text-black'>
                                RIPPLE
                              </span>
                              <span className='my-4 fs-16 font-w600 d-block'>
                                1 RIPPLE = 68.48 USD
                              </span>
                              <p className='text-start'>
                                Ripple is an open source cryptocurrency. It is
                                an altcoin that was forked from the Bitcoin
                                protocol. It is also a decentralized autonomous
                                organization (DAO)...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='card-footer p-2 border-0'>
                        <Link to={'#'} className='btn btn-link text-primary'>
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-sm-6 '>
                    <QuickTrade />
                  </div>
                  <div className='col-xl-3 col-sm-6'>
                    <CoinBuyTable bgChange='black' />
                  </div>
                  <div className='col-xl-3 col-sm-6 '>
                    <CoinSellTable bgChangeSell='black' />
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </>
  )
}
export default SoonInfo
