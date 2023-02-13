import React, { useContext, useState, useEffect } from 'react'
import { Avatar, Tooltip } from 'antd'
import CoinChart from '../../charts/coinchart/CoinChart'
import Description from '../description/Description'
import {
  CopyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ApartmentOutlined
} from '@ant-design/icons'
import './crypto.scss'
import _ from 'lodash'
import { CRYPTO } from '../../../constants/category'
import { encodeUrl } from '../../../../utils/formatUrl'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import { ChainListContext } from '../../../../App'
import { Button, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import ScamWarningDetail from '../scam-warning/ScamWarningDetail'
import { LinkOutlined } from '@ant-design/icons'
import { isValidProductId, formatImgUrlFromProductId, formatUrlDetailFromUrlImageExchange, getExchangeNameFromUrlImageExchage } from '../../../../utils/formatText'
import { DetailLayout } from '../detail-layout'
import getCryptoDetailChartData from './HandleChartData.js'
import { MySpinner } from '../../common-widgets/my-spinner'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'
import { formatLargeNumber } from '../../../../utils/formatNumber'

const CryptoInfo = ({ copyAddress, isShow, productInfo, ...rest }) => {
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
  const [chartData, setChartData] = useState([])
  const [showInfo, setShowInfo] = useState()
  const [multichain, setMultichain] = useState()
  const [mainExplorer, setMainExplorer] = useState()

  useEffect(() => {
    setShowInfo(
      !isShow?.community &&
        _.isEmpty(productInfo?.details?.multichain) &&
        !isShow?.founders &&
        !isShow?.explorer &&
        !isShow?.sourceCode
    )
  }, [isShow, productInfo])

  useEffect(() => {
    const getChartData = async(wrappedTokenId) => {
      const network = wrappedTokenId?.split('_')[2]
      const baseCurrency = wrappedTokenId?.split('_')[3]
      const data = await getCryptoDetailChartData(network, baseCurrency)
      setChartData(data)
    }

    !_.isEmpty(productInfo) && getChartData(productInfo?.details?.wrapTokenId)
  }, [productInfo])

  const handleClickExchange = (e, item) => {
    e.stopPropagation()
    e.preventDefault()
    const urlDetail = formatUrlDetailFromUrlImageExchange(item)
    navigate(`../../../../../${urlDetail}`)
  }

  const handleClickTag = (value) => {
    navigate(`../../../../../${CRYPTO}/${encodeUrl(value)}`)
  }

  useEffect(() => {
    const getDataVenture = async() => {
      if (!_.isEmpty(productInfo?.details?.multichain)) {
        const newMultiChain = []
        productInfo?.details?.multichain?.forEach((itemMulti) => {
          const itemChain = chainList[itemMulti?.chainName]
          if (itemChain) {
            newMultiChain.push({
              ...itemChain,
              ...itemMulti
            })
            // main address to display
            if (productInfo?.details?.chainName === itemMulti?.chainName) {
              setMainExplorer(
                `${itemChain?.exploreWebsite}${itemChain?.path}${productInfo?.details?.address}`
              )
            }
          }
        })
        if (!_.isEmpty(newMultiChain)) {
          setMultichain(newMultiChain)
        }
      } else {
        // don't have multiple chain
        const dataChain = chainList[productInfo?.details?.chainName]
        // have data in chain list
        if (dataChain) {
          setMainExplorer(
            `${dataChain?.exploreWebsite}${dataChain?.path}${productInfo?.details?.address}`
          )
        }
      }
    }
    getDataVenture()
  }, [productInfo, chainList])

  const handleReportScam = () => {
    rest?.setData({
      ...rest.data,
      isScam: true,
      star: 1
    })
  }

  // Header
  const header = <div className='row'>
    <div className='profile-head'>
      <div className='profile-info'>
        <div className='profile-details'>
          <div className='profile-photo'>
            {/* must have crypto id and its image */}
            {productInfo?.details?.cryptoId && productInfo?.details?.bigLogo ? (
              <Image src={isValidProductId(productInfo?.details?.cryptoId) ? formatImgUrlFromProductId(productInfo?.details?.cryptoId) : imgAbsentImageCrypto} preview={false} height={64} width={64}/>
            ) : (
              <span className='image-list-no-data-detail'>
                {productInfo?.details?.name?.slice(0, 3)}
              </span>
            )}
          </div>
          <div className='profile-name px-3 pt-2'>
            <h4 className='text-primary mb-2 cus-h4'>
              <span className='crypto-overview-name'>
                {productInfo?.details?.name}
              </span>
              <span className='crypto-overview-symbol'>
                {productInfo?.details?.symbol
                  ? productInfo?.details?.symbol
                  : (
                    ''
                  )}
              </span>
            </h4>
            {productInfo?.details?.address && (
              <p className='crypto-info-item-address'>
                <a href={mainExplorer} target='_blank' rel='noreferrer' style={{ color: 'blue' }}>
                  {`${productInfo?.details?.address?.slice(
                    0,
                    5
                  )}...${productInfo?.details?.address?.slice(
                    productInfo?.details?.address?.length - 5,
                    productInfo?.details?.address?.length
                  )}`}
                </a>
                <CopyOutlined
                  style={{ padding: '0, 1rem' }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    copyAddress(e, productInfo?.details?.address)
                  }}
                />
              </p>
            )}
          </div>
          {productInfo?.details?.website && (
            <Button
              as='a'
              target='_blank'
              href={`${productInfo?.details?.website}`}
              className='btn btn-primary mb-1 ms-auto'
            >
              <svg width='24' height='24' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg' strokeWidth='3' stroke='#fff' fill='none'><path d='M39.93,55.72A24.86,24.86,0,1,1,56.86,32.15a37.24,37.24,0,0,1-.73,6'/><path d='M37.86,51.1A47,47,0,0,1,32,56.7'/><path d='M32,7A34.14,34.14,0,0,1,43.57,30a34.07,34.07,0,0,1,.09,4.85'/><path d='M32,7A34.09,34.09,0,0,0,20.31,32.46c0,16.2,7.28,21,11.66,24.24'/><line x1='10.37' y1='19.9' x2='53.75' y2='19.9'/><line x1='32' y1='6.99' x2='32' y2='56.7'/><line x1='11.05' y1='45.48' x2='37.04' y2='45.48'/><line x1='7.14' y1='32.46' x2='56.86' y2='31.85'/><path d='M53.57,57,58,52.56l-8-8,4.55-2.91a.38.38,0,0,0-.12-.7L39.14,37.37a.39.39,0,0,0-.46.46L42,53.41a.39.39,0,0,0,.71.13L45.57,49Z'/></svg>
                Website
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>

  // summary
  const summary =
    <div className='text-center'>
      <div className='row'>
        <div className='col'>
          <h3 className='m-b-0'>
            {formatLargeNumber(productInfo?.details?.totalReviews)}
          </h3>
          <span>Reviews</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            {formatLargeNumber(productInfo?.details?.totalIsScam)}
          </h3>
          <span>
          Reported Scam
          </span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            {formatLargeNumber(productInfo?.details?.score / 10)}
          </h3>
          <span>
          Score
          </span>
        </div>
      </div>
      <div className='mt-4'>
        <Button
          as='a'
          href='#comment'
          className='mb-1 me-1'
          variant='danger'
          onClick={handleReportScam}
        >
          <svg width='24' height='24' viewBox='0 0 1024 1024' className='icon' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M687.542857 965.485714H182.857143c-87.771429 0-160.914286-73.142857-160.914286-160.914285V256c0-87.771429 73.142857-160.914286 160.914286-160.914286h336.457143V146.285714H182.857143C124.342857 146.285714 73.142857 197.485714 73.142857 256v541.257143c0 58.514286 51.2 109.714286 109.714286 109.714286h504.685714c58.514286 0 109.714286-51.2 109.714286-109.714286V533.942857h58.514286v263.314286c-7.314286 95.085714-80.457143 168.228571-168.228572 168.228571z' fill='#fff' /><path d='M877.714286 95.085714l109.714285 138.971429c7.314286 7.314286 0 14.628571-7.314285 21.942857L629.028571 526.628571c-7.314286 7.314286-160.914286-7.314286-160.914285-7.314285s29.257143-146.285714 36.571428-153.6l351.085715-270.628572c7.314286-7.314286 14.628571-7.314286 21.942857 0z' fill='#F4B1B2' /><path d='M607.085714 555.885714c-21.942857 0-65.828571 0-138.971428-7.314285H438.857143V512c29.257143-160.914286 36.571429-160.914286 43.885714-168.228571L833.828571 73.142857c21.942857-14.628571 43.885714-14.628571 58.514286 7.314286L1002.057143 219.428571c14.628571 14.628571 7.314286 43.885714-7.314286 58.514286L643.657143 548.571429c-7.314286 7.314286-7.314286 7.314286-36.571429 7.314285z m-109.714285-58.514285c51.2 0 95.085714 7.314286 117.028571 7.314285L950.857143 241.371429l-87.771429-117.028572-336.457143 263.314286c-7.314286 14.628571-14.628571 58.514286-29.257142 109.714286z' fill='#fff' /></svg>
        Report Scam
        </Button>
        <Button
          as='a'
          href='#comment'
          className='btn btn-primary mb-1 ms-1'
          variant='danger'
          onClick={() => rest?.setData({ ...rest.data, isScam: false, star: 5 })}
        >
          <svg fill='#fff' width='24' height='24' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'>

            <g data-name='37 rating' id='_37_rating'>

              <path d='M42.83,3.5H21.17a6,6,0,0,0-6,6V28.66a6,6,0,0,0,6,6H23.4l7.84,9.23a1,1,0,0,0,1.1.29.992.992,0,0,0,.66-.94V34.66h9.83a6,6,0,0,0,6-6V9.5A6,6,0,0,0,42.83,3.5Zm4,25.16a4,4,0,0,1-4,4H32a1,1,0,0,0-1,1v6.86l-6.38-7.51a1.011,1.011,0,0,0-.76-.35H21.17a4,4,0,0,1-4-4V9.5a4,4,0,0,1,4-4H42.83a4,4,0,0,1,4,4Z'/>

              <path d='M44.66,10.75a1,1,0,0,1-1,1H20.34a1,1,0,0,1,0-2H43.66A1,1,0,0,1,44.66,10.75Z'/>

              <path d='M44.66,14.92a1,1,0,0,1-1,1H20.34a1,1,0,0,1,0-2H43.66A.99.99,0,0,1,44.66,14.92Z'/>

              <path d='M44.66,19.08a1,1,0,0,1-1,1H20.34a1,1,0,0,1,0-2H43.66A1,1,0,0,1,44.66,19.08Z'/>

              <path d='M44.66,23.25a1,1,0,0,1-1,1H28.67a1,1,0,0,1,0-2H43.66A.99.99,0,0,1,44.66,23.25Z'/>

              <path d='M44.66,27.41a1,1,0,0,1-1,1H28.67a1,1,0,0,1,0-2H43.66A1,1,0,0,1,44.66,27.41Z'/>

              <path d='M18.65,46.55a1.009,1.009,0,0,0-.95-.69H13.57l-1.28-3.93a1,1,0,0,0-1.9,0L9.11,45.86H4.98a1,1,0,0,0-.59,1.81L7.73,50.1,6.46,54.02a1,1,0,0,0,.95,1.31A1.01,1.01,0,0,0,8,55.14l3.34-2.43,3.34,2.43a1,1,0,0,0,1.54-1.11L14.94,50.1l3.35-2.43A1.012,1.012,0,0,0,18.65,46.55Zm-5.83,3.47.55,1.7-1.44-1.05a.99.99,0,0,0-1.18,0L9.31,51.72l.55-1.7a.992.992,0,0,0-.36-1.11L8.06,47.86H9.84a1.009,1.009,0,0,0,.95-.69l.55-1.7.55,1.7a1,1,0,0,0,.95.69h1.78l-1.44,1.05A.977.977,0,0,0,12.82,50.02Z'/>

              <path d='M39.31,51.71a1,1,0,0,0-.95-.69H34.23l-1.28-3.93a1,1,0,0,0-1.9,0l-1.28,3.93H25.64a1,1,0,0,0-.59,1.81l3.35,2.43-1.28,3.93a1.012,1.012,0,0,0,.36,1.12,1.022,1.022,0,0,0,1.18,0L32,57.88l3.34,2.43a1.011,1.011,0,0,0,1.18,0,1.012,1.012,0,0,0,.36-1.12L35.6,55.26l3.35-2.43A1,1,0,0,0,39.31,51.71Zm-5.83,3.48.55,1.69-1.44-1.05a1.011,1.011,0,0,0-1.18,0l-1.44,1.05.55-1.69a.992.992,0,0,0-.36-1.12l-1.44-1.05H30.5a1,1,0,0,0,.95-.69L32,50.64l.55,1.69a1,1,0,0,0,.95.69h1.78l-1.44,1.05A.992.992,0,0,0,33.48,55.19Z'/>

              <path d='M59.97,46.55a.991.991,0,0,0-.95-.69H54.89l-1.28-3.93a1,1,0,0,0-1.9,0l-1.28,3.93H46.3a1,1,0,0,0-.59,1.81l3.35,2.43-1.28,3.93a1,1,0,0,0,1.54,1.11l3.34-2.43L56,55.14a1.01,1.01,0,0,0,.59.19.967.967,0,0,0,.59-.19.987.987,0,0,0,.36-1.12L56.27,50.1l3.34-2.43A1,1,0,0,0,59.97,46.55Zm-5.83,3.47.55,1.7-1.44-1.05a.988.988,0,0,0-.59-.19,1.01,1.01,0,0,0-.59.19l-1.44,1.05.55-1.7a.977.977,0,0,0-.36-1.11l-1.44-1.05h1.78a1,1,0,0,0,.95-.69l.55-1.7.55,1.7a1.009,1.009,0,0,0,.95.69h1.78L54.5,48.91A.992.992,0,0,0,54.14,50.02Z'/>

            </g>

          </svg>
        Add Review
        </Button>
      </div>
    </div>

  // scam
  const scam = <>
    {productInfo?.details?.isScam ? (
      <ScamWarningDetail
        isShow={true}
        scamWarningReason={productInfo?.details?.proof?.isScam}
        proofType='error'
      />
    ) : productInfo?.details?.isWarning ? (
      <ScamWarningDetail
        isShow={true}
        scamWarningReason={productInfo?.details?.proof?.isWarning}
        proofType='warning'
      />
    ) : ''}
  </>

  const more = <>
    <div className='card-header pb-0 border-0 flex-wrap'>
      <div>
        <h4 className='heading mb-0'>More</h4>
      </div>
    </div>
    <div className='card-body'>
      <div className='basic-form'>
        {!_.isEmpty(productInfo?.details?.exchanges) && (
          <div className='crypto-info'>
            <div>
              <div className='crypto-info-item-key'>Exchange(s): </div>
              <div className='row mt-3'>
                <div className='col-xxl-12 col-12'>
                  <Avatar.Group
                    maxCount={4}
                    size={25}
                    maxStyle={{
                      color: '#f56a00',
                      backgroundColor: '#fde3cf',
                      cursor: 'pointer'
                    }}
                  >
                    {productInfo?.details?.exchanges?.map((item, index) => (
                      <React.Fragment key={index}>
                        {item && (
                          <Tooltip title={getExchangeNameFromUrlImageExchage(item)} >
                            <Avatar
                              size={25}
                              src={item}
                              key={index}
                              className='crypto-table-exchange'
                              onClick={(e) => handleClickExchange(e, item)}
                            />
                          </Tooltip>

                        )}
                      </React.Fragment>
                    ))}
                  </Avatar.Group>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showInfo && (
          <>
            <div className='crypto-info-item-key my-2'>Website(s): </div>
            <div className='d-flex align-items-center'>
              {isShow?.community && (
                <div className='basic-dropdown' style={{ marginRight: '10px' }}>
                  <Dropdown>
                    <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                    Community
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {productInfo?.details &&
                      Object.keys(productInfo?.details?.community).map(
                        (key) => {
                          return (<React.Fragment key={key}>
                            {productInfo?.details?.community[key] !== '' && (
                              <Dropdown.Item
                                href={productInfo?.details?.community[key]}
                                key={key}
                                className='crypto-tag-item-list-children-contract cus-dropdown-item'
                                target='_blank'
                              >
                                {productInfo?.details?.community[key] && (
                                  <>
                                    <span>
                                      {
                                        productInfo?.details?.community[
                                          key
                                        ]?.split('/')[2]
                                      }
                                    </span>
                                    <LinkOutlined />
                                  </>
                                )}
                              </Dropdown.Item>
                            )}
                          </React.Fragment>
                          )
                        }
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
              {isShow?.sourceCode && (
                <div className='basic-dropdown' style={{ marginRight: '10px' }}>
                  <Dropdown>
                    <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                    Source Code
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {productInfo?.details?.sourceCode &&
                      Object.keys(productInfo?.details?.sourceCode)?.map(
                        (key) => {
                          return (
                            <React.Fragment key={key}>
                              {productInfo?.details?.sourceCode[key] !== '' && (
                                <Dropdown.Item
                                  href={productInfo?.details?.sourceCode[key]}
                                  key={key}
                                  className='crypto-tag-item-list-children-contract cus-dropdown-item'
                                  target='_blank'
                                >
                                  {productInfo?.details?.sourceCode[key] && (
                                    <>
                                      {key}
                                      <LinkOutlined />
                                    </>
                                  )}
                                </Dropdown.Item>
                              )}
                            </React.Fragment>
                          )
                        }
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
              {multichain && (
                <div className='basic-dropdown'>
                  <Dropdown>
                    <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                    Contract
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='cus-dropdown-menu'>
                      {multichain?.map((item, index) => (
                        <Dropdown.Item
                          href={`${item?.exploreWebsite}${item?.path}${item?.address}`}
                          target='_blank'
                          key={index}
                          className='crypto-tag-item-list-children-contract'
                        >
                          <Image src={item?.image} preview={false} />
                          <span className='crypto-tag-item-list-children-contract-address' style={{ color: 'blue' }}>
                            {item?.address}
                          </span>
                          <CopyOutlined
                            style={{ padding: '0, 1rem' }}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              copyAddress(e, item?.address)
                            }}
                          />
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </div>
          </>

        )}

        {
          productInfo?.details?.isProxy !== null && productInfo?.details?.contractVerified
            ? <>
              <div className='crypto-info-item-key mt-3'>Contract detail: </div>
              <div className='row mt-3'>
                <div className='col-xxl-12 col-12'>
                  <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                    {
                      productInfo?.details?.contractVerifie !== null &&
            (
              productInfo?.details?.contractVerified ? (
                <>
                  <CheckCircleOutlined
                    style={{ color: 'green', padding: '0 5px' }}
                  />
                  {productInfo?.details?.name} contract has been verified
                </>
              ) : (
                <>
                  <CloseCircleOutlined
                    style={{ color: 'red', padding: '0 5px' }}
                  />
                  {productInfo?.details?.name} contract has not been verified
                </>

              )
            )
                    }
                  </div>
                </div>
                <div className='col-xxl-12 col-12'>
                  <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                    {
                      productInfo?.details?.isProxy !== null &&
            (
              productInfo?.details?.isProxy ? (
                <>
                  <ApartmentOutlined
                    style={{ color: 'red', padding: '0 5px' }}
                  />
                  {productInfo?.details?.name} contract is a proxy contract
                </>
              ) : (
                <>
                  <ApartmentOutlined
                    style={{ color: 'green', padding: '0 5px' }}
                  />
                  {productInfo?.details?.name} contract is not a proxy contract
                </>

              )
            )
                    }
                  </div>
                </div>

              </div>
            </>
            : ''
        }

        {
          productInfo?.details?.isCoinmarketcap !== null && productInfo?.details?.isCoingecko
            ? <>
              <div className='crypto-info-item-key mt-3'>Available on: </div>
              <div className='row mt-3'>
                <div className='col-xxl-12 col-12'>
                  <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                    {
                      productInfo?.details?.isCoinmarketcap !== null &&
            (
              productInfo?.details?.isCoinmarketcap ? (
                <>
                  <CheckCircleOutlined
                    style={{ color: 'green', padding: '0 5px' }}
                  />
                  {productInfo?.details?.name} are existing on Coinmarketcap
                </>
              ) : (
                <>
                  <CloseCircleOutlined
                    style={{ color: 'red', padding: '0 5px' }}
                  />
                  {productInfo?.details?.name} are not existing on Coinmarketcap
                </>

              )
            )
                    }
                  </div>
                </div>
                <div className='col-xxl-12 col-12'>
                  <div className='form-check custom-checkbox mb-3 checkbox-success' style={{ padding: '0' }}>
                    {
                      productInfo?.details?.isCoingecko !== null &&
            (
              productInfo?.details?.isCoingecko ? (
                <>
                  <CheckCircleOutlined
                    style={{ color: 'green', padding: '0 5px' }}
                  />
                  {productInfo?.details?.name} are existing on Coingecko
                </>
              ) : (
                <>
                  <CloseCircleOutlined
                    style={{ color: 'red', padding: '0 5px' }}
                  />
                  {productInfo?.details?.name} are not existing on Coingecko
                </>

              )
            )
                    }
                  </div>
                </div>
              </div>
            </>
            : ''
        }

        {productInfo?.mores?.tag && (
          <div className='crypto-info'>
            <div className='crypto-overview-list-tags'>
              <div className='crypto-info-item-key'>Tag(s): </div>
              <div className='row mt-3'>
                <div className='col-xxl-12 col-12'>
                  {productInfo?.mores?.tag?.map((item, index) => (
                    <div
                      className='mb-0 btn btn-primary light btn-xs mb-2 me-1'
                      onClick={() => handleClickTag(item?.name)}
                      key={index}
                    >
                      {item?.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>

  </>

  const about = <>
    <div className='card-header border-0 pb-0'>
      <h5 className='text-primary'>About {productInfo?.details?.name}</h5>
    </div>
    <div className='card-body pt-3'>
      <div className='profile-interest '>
        <Description
          text={productInfo?.details?.description
            ? productInfo?.details?.description
            : ''}
        />
      </div>
    </div>
  </>

  const coinChart = <div className=''>
    {chartData ? <CoinChart symbol={productInfo?.details?.symbol}
      price={productInfo?.details?.priceUSD}
      marketCap={productInfo?.details?.marketcapUSD}
      totalSupply={productInfo?.details?.totalSupply}
      holders={productInfo?.details?.holders}
      transfer={productInfo?.details?.transfers}
      chartData={chartData}/> : <MySpinner />}
  </div>

  return (
    <>
      <DetailLayout
        Header={header}
        type='crypto'
        summary={summary}
        scam={scam}
        more={more}
        about={about}
        topDiscus={(<TopDiscussed/>)}
        coinChart={coinChart}
        // report={report}
        numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
        rest={rest}
      />
    </>
  )
}
export default CryptoInfo
