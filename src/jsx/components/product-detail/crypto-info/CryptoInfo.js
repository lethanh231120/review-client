import React, { useContext, useState, useEffect } from 'react'
import { Spin, Tooltip, Table } from 'antd'
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
import { ChainListContext, ExchangeContext } from '../../../../App'
import { Badge, Button, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import ScamWarningDetail from '../scam-warning/ScamWarningDetail'
import { LinkOutlined } from '@ant-design/icons'
import {
  isValidProductId,
  formatImgUrlFromProductId,
  toCammelCase
} from '../../../../utils/formatText'
import { DetailLayout } from '../detail-layout'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'
import MyScoreComponent from '../../score/scoreComponent'
import { copyContractAddress, openWebsite } from '../../../../utils/effect'
import { LoadingOutlined } from '@ant-design/icons'
import CoinChart from '../../charts/coinchart/CoinChart'
import { Link } from 'react-router-dom'
import {
  underlines,
  lineThrough,
  current,
  slash
} from '../../../constants/exchanges'
import { WARNING_ICON } from '../../common-widgets/logo/logo'
import { websiteIcon } from '../../common-widgets/icons'
import { ExchangeDetail } from '../../common-widgets/page-crypto/ExchangeDetail'

import {
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon
} from 'react-share'
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton
} from 'react-share'
import Similar from '../similar/Similar'
const CryptoInfo = ({ isShow, productInfo, ...rest }) => {
  const PAGE_SIZE = 10
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
  const exchanges = useContext(ExchangeContext)
  const [showInfo, setShowInfo] = useState()
  const [multichain, setMultichain] = useState()
  const [mainExplorer, setMainExplorer] = useState()
  const [loading, setLoading] = useState(false)
  const waitMillSecOpenWebsite = 3000
  const [dataExchange, setDataExchange] = useState([])
  const [top, setTop] = useState()

  useEffect(() => {
    setShowInfo(
      !isShow?.community &&
        _.isEmpty(productInfo?.details?.multichain) &&
        !isShow?.founders &&
        !isShow?.explorer &&
        !isShow?.sourceCode
    )
  }, [isShow, productInfo])

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

  useEffect(() => {
    const newListExchange = []
    productInfo?.mores?.trading?.forEach((itemExchange) => {
      if (itemExchange?.exchangeId) {
        const newItemExchange = exchanges?.find(
          (itemExchangeInList) =>
            itemExchangeInList?.exchangeId === itemExchange?.exchangeId
        )
        if (newItemExchange) {
          if (underlines?.includes(newItemExchange?.exchangeId)) {
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${
                newItemExchange?.website
              }${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`
            })
          }
          if (lineThrough?.includes(newItemExchange?.exchangeId)) {
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${
                newItemExchange?.website
              }${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `-${itemExchange?.currencycode}`
              )}`
            })
          }
          if (newItemExchange?.exchangeId === 'gear5_exchange_cex') {
            const url = itemExchange?.symbol
              ?.replace(
                `${itemExchange?.currencycode}`,
                `-${itemExchange?.currencycode}`
              )
              ?.toLowerCase()
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${newItemExchange?.website}${url}`
            })
          }
          if (slash?.includes(newItemExchange?.exchangeId)) {
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${
                newItemExchange?.website
              }${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `/${itemExchange?.currencycode}`
              )}`
            })
          }
          if (newItemExchange?.exchangeId === 'gear5_exchange_bitfinex') {
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${
                newItemExchange?.website
              }${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `:${itemExchange?.currencycode}`
              )}`
            })
          }
          if (newItemExchange?.exchangeId === 'gear5_exchange_bitkub') {
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${
                newItemExchange?.website
              }${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                ``
              )}`
            })
          }
          if (newItemExchange?.exchangeId === 'gear5_exchange_currency-com') {
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${
                newItemExchange?.website
              }${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `-to-${itemExchange?.currencycode}`
              )}`
            })
          }
          if (newItemExchange?.exchangeId === 'gear5_exchange_upbit') {
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${newItemExchange?.website}CRIX.UPBIT.${
                itemExchange?.currencycode
              }-${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                ''
              )}`
            })
          }
          if (newItemExchange?.exchangeId === 'gear5_exchange_coinex') {
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${newItemExchange?.website}currency=${
                itemExchange?.currencycode
              }&dest=${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                ''
              )}&tab=limit`
            })
          }
          if (current?.includes(newItemExchange?.exchangeId)) {
            newListExchange.push({
              ...itemExchange,
              ...newItemExchange,
              symbol: `${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `_${itemExchange?.currencycode}`
              )}`,
              website: `${
                newItemExchange?.website
              }${itemExchange?.symbol?.replace(
                `${itemExchange?.currencycode}`,
                `${itemExchange?.currencycode}`
              )}`
            })
          }
        }
      }
    })
    setDataExchange(newListExchange)
  }, [productInfo, exchanges])

  const handleReportScam = () => {
    rest?.setData({
      ...rest.data,
      isScam: true
    })
    rest?.form?.setFieldsValue({
      isScam: true,
      star: 1
    })
    window.scrollTo(0, top)
  }

  const columnExchanges = [
    {
      title: 'Exchange',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (_, record) => (
        <Link
          to={`../../../../../products/${record?.exchangeId?.split('_')[1]}/${
            record?.exchangeId?.split('_')[2]
          }`}
          className='exchange-source'
        >
          {record?.exchangeId && record?.smallLogo ? (
            <Image
              alt='Exchange Logo'
              src={
                isValidProductId(record?.exchangeId)
                  ? formatImgUrlFromProductId(record?.exchangeId)
                  : imgAbsentImageCrypto
              }
              // preview={false}
            />
          ) : (
            <span className='exchange-no-data'>
              {record?.name?.slice(0, 3)}
            </span>
          )}
          <span>
            <div className='exchange-name'>
              <div className='exchange-name-title'>{record?.name}</div>
            </div>
          </span>
        </Link>
      )
    },
    {
      title: 'Pair',
      dataIndex: 'symbol',
      key: 'symbol',
      render: (_, record) => (
        <Link to={`${record?.website}`} className='exchange-pair'>
          {record?.symbol}
        </Link>
      )
    }
  ]

  // console.log(window.location.href)
  // Header
  const header = (
    <div className='profile-info'>
      <div className='profile-details'>
        <div className='profile-photo'>
          {/* must have crypto id and its image */}
          {productInfo?.details?.cryptoId && productInfo?.details?.bigLogo ? (
            <Image
              alt='Cryptocurrency Logo'
              src={
                isValidProductId(productInfo?.details?.cryptoId)
                  ? formatImgUrlFromProductId(productInfo?.details?.cryptoId)
                  : imgAbsentImageCrypto
              }
              preview={false}
            />
          ) : (
            <h2 className='image-list-no-data-detail'>
              {productInfo?.details?.name?.slice(0, 3)}
            </h2>
          )}
        </div>
        <div className='profile-name cus-profile-name'>
          <h4 className='text-primary mb-2 cus-h4'>
            <span className='crypto-overview-name'>
              {productInfo?.details?.name}
            </span>
            <span className='crypto-overview-symbol'>
              {productInfo?.details?.symbol ? productInfo?.details?.symbol : ''}
            </span>
          </h4>
          <div className='d-flex align-items-center'>

            {productInfo?.details?.type === 'coin' && productInfo?.details?.explorer && (
              <p className='crypto-info-item-address'>
                <a
                  href={productInfo?.details?.explorer}
                  target='_blank'
                  rel='noreferrer'
                  className='product-name-text text-primary'
                  style={{ cursor: 'pointer' }}
                >
                  {productInfo?.details?.explorer?.split('/')[2]}
                </a>
                <LinkOutlined/>
              </p>
            )}
            {productInfo?.details?.address && (
              <p className='crypto-info-item-address'>
                <a
                  href={mainExplorer}
                  target='_blank'
                  rel='noreferrer'
                  className='product-name-text text-primary'
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    alt='Blockchain Logo'
                    src={chainList[`${productInfo?.details?.chainName}`]?.image}
                    preview={false}
                  />
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
                    copyContractAddress(e, productInfo?.details?.address)
                  }}
                />
              </p>
            )}
            {productInfo?.details?.type && (
              <Badge className='badge-sm' >{productInfo?.details?.type}</Badge>
            )}
          </div>
        </div>

        <div className='detail-button'>
          <Dropdown className='sidebar-dropdown me-2 cus-dropdown'>
            <Dropdown.Toggle
              variant=''
              as='a'
              className='ai-icon i-false c-pointer button-signup-home'
              role='button'
            >
              <Button className='btn btn-primary'>Share</Button>
            </Dropdown.Toggle>
            <Dropdown.Menu className='detail-list-social-share'>
              <Dropdown.Item >
                <FacebookShareButton url={window.location.href} quote={productInfo?.details?.name}>
                  <span className='share-icon'>
                    <FacebookIcon size={26} round />
                  </span>
                </FacebookShareButton>
              </Dropdown.Item>
              <Dropdown.Item >
                <TwitterShareButton url={window.location.href} quote={productInfo?.details?.name}>
                  <span className='share-icon'>
                    <TwitterIcon size={26} round={true}/>
                  </span>
                </TwitterShareButton>
              </Dropdown.Item>
              <Dropdown.Item >
                <TelegramShareButton url={window.location.href} quote={productInfo?.details?.name}>
                  <span className='share-icon'>
                    <TelegramIcon size={26} round={true}/>
                  </span>
                </TelegramShareButton>
              </Dropdown.Item>
              <Dropdown.Item >
                <LinkedinShareButton url={window.location.href} quote={productInfo?.details?.name}>
                  <span className='share-icon'>
                    <LinkedinIcon size={26} round={true}/>
                  </span>
                </LinkedinShareButton>
              </Dropdown.Item>
              <Dropdown.Item >
                <PinterestShareButton url={window.location.href} quote={productInfo?.details?.name}>
                  <span className='share-icon'>
                    <PinterestIcon size={26} round={true}/>
                  </span>
                </PinterestShareButton>
              </Dropdown.Item>
              <Dropdown.Item >
                <RedditShareButton url={window.location.href} quote={productInfo?.details?.name}>
                  <span className='share-icon'>
                    <RedditIcon size={26} round={true}/>
                  </span>
                </RedditShareButton>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {productInfo?.details?.website && (
            <Button
              className='btn btn-primary ms-auto'
              onClick={() =>
                openWebsite(
                  productInfo?.details?.website,
                  setLoading,
                  waitMillSecOpenWebsite
                )
              }
            >
              {loading ? (
                <Spin
                  indicator={<LoadingOutlined spin />}
                  style={{ color: 'white', marginRight: '0.3rem' }}
                />
              ) : (
                ''
              )}
              {websiteIcon}
            Website
            </Button>
          )}
        </div>
      </div>
    </div>
  )

  // summary
  const summary = (
    <div className='text-center'>
      <div className='row'>
        <div className='col'>
          <h3 className='m-b-0'>
            <Badge bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>
              {new Intl.NumberFormat().format(productInfo?.details?.totalReviews)}
            </Badge>
          </h3>
          <span>Reviews</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            <Badge bg='badge-l' className='badge-danger progress-bar-striped progress-bar-animated'>
              {new Intl.NumberFormat().format(productInfo?.details?.totalIsScam)}
            </Badge>
          </h3>
          <span>Reported Scam</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            <MyScoreComponent score={productInfo?.details?.score} />
          </h3>
          <span>Score</span>
        </div>
      </div>
      <div className='mt-4 '>
        <Button
          className='mb-1 me-1'
          variant='danger'
          onClick={handleReportScam}
        >
          <span className='d-flex'>
            {WARNING_ICON('#fff', '18px')}
            &nbsp; Report&nbsp;Scam
          </span>
        </Button>
        <Button
          className='btn btn-primary mb-1 ms-1'
          onClick={() => {
            rest?.setData({ ...rest.data, isScam: false })
            rest?.form.setFieldsValue({
              isScam: false,
              star: undefined,
              sources: []
            })
            window.scrollTo(0, top)
          }}
        >
          <svg
            width='18'
            height='18'
            viewBox='0 0 1024 1024'
            className='icon'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M687.542857 965.485714H182.857143c-87.771429 0-160.914286-73.142857-160.914286-160.914285V256c0-87.771429 73.142857-160.914286 160.914286-160.914286h336.457143V146.285714H182.857143C124.342857 146.285714 73.142857 197.485714 73.142857 256v541.257143c0 58.514286 51.2 109.714286 109.714286 109.714286h504.685714c58.514286 0 109.714286-51.2 109.714286-109.714286V533.942857h58.514286v263.314286c-7.314286 95.085714-80.457143 168.228571-168.228572 168.228571z'
              fill='#fff'
            />
            <path
              d='M877.714286 95.085714l109.714285 138.971429c7.314286 7.314286 0 14.628571-7.314285 21.942857L629.028571 526.628571c-7.314286 7.314286-160.914286-7.314286-160.914285-7.314285s29.257143-146.285714 36.571428-153.6l351.085715-270.628572c7.314286-7.314286 14.628571-7.314286 21.942857 0z'
              fill='#F4B1B2'
            />
            <path
              d='M607.085714 555.885714c-21.942857 0-65.828571 0-138.971428-7.314285H438.857143V512c29.257143-160.914286 36.571429-160.914286 43.885714-168.228571L833.828571 73.142857c21.942857-14.628571 43.885714-14.628571 58.514286 7.314286L1002.057143 219.428571c14.628571 14.628571 7.314286 43.885714-7.314286 58.514286L643.657143 548.571429c-7.314286 7.314286-7.314286 7.314286-36.571429 7.314285z m-109.714285-58.514285c51.2 0 95.085714 7.314286 117.028571 7.314285L950.857143 241.371429l-87.771429-117.028572-336.457143 263.314286c-7.314286 14.628571-14.628571 58.514286-29.257142 109.714286z'
              fill='#fff'
            />
          </svg>
          &nbsp; Add Review
        </Button>
      </div>
    </div>
  )

  // scam
  const scam = (
    <>
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
      ) : (
        ''
      )}
    </>
  )

  const more = (
    <>
      <div className='card-header pb-0 border-0 flex-wrap'>
        <div>
          <h2 className='heading text-primary mb-0'>More Info</h2>
        </div>
      </div>
      <div className='card-body'>
        <div className='basic-form'>
          {(productInfo?.details?.isProxy !== null ||
          productInfo?.details?.contractVerified !== null) ? (
              <>
                <div className='crypto-info-item-key'>Contract detail: </div>
                <div className='row mt-3'>
                  {
                    productInfo?.details?.contractVerified !== null ? <div className='col-xxl-12 col-12'>
                      <div
                        className='form-check custom-checkbox mb-3 checkbox-success'
                        style={{ padding: '0', display: 'flex' }}
                      >
                        { (productInfo?.details?.contractVerified ? (
                          <>
                            <CheckCircleOutlined
                              style={{
                                color: 'green',
                                display: 'flex',
                                alignItems: 'center',
                                paddingRight: '0.3rem'
                              }}
                            />
                            <span>
                              {productInfo?.details?.name} is a{' '}
                              <Badge>verified contract</Badge>
                            </span>
                          </>
                        ) : (
                          <>
                            <CloseCircleOutlined
                              style={{
                                color: 'red',
                                display: 'flex',
                                alignItems: 'center',
                                paddingRight: '0.3rem'
                              }}
                            />
                            <span>
                              {productInfo?.details?.name} is not a{' '}
                              <Badge bg='danger'>verified contract</Badge>
                            </span>
                          </>
                        ))}
                      </div>
                    </div> : ''
                  }

                  {productInfo?.details?.isProxy !== null ? <div className='col-xxl-12 col-12'>
                    <div
                      className='form-check custom-checkbox mb-3 checkbox-success'
                      style={{ padding: '0', display: 'flex' }}
                    >
                      { (productInfo?.details?.isProxy ? (
                        <>
                          <ApartmentOutlined
                            style={{
                              color: 'red',
                              display: 'flex',
                              alignItems: 'center',
                              paddingRight: '0.3rem'
                            }}
                          />
                          <span>
                            {productInfo?.details?.name} is a{' '}
                            <Badge bg='danger'>proxy contract</Badge>
                          </span>
                        </>
                      ) : (
                        <>
                          <ApartmentOutlined
                            style={{
                              color: 'green',
                              display: 'flex',
                              alignItems: 'center',
                              paddingRight: '0.3rem'
                            }}
                          />
                          <span>
                            {productInfo?.details?.name} is not a{' '}
                            <Badge>proxy contract</Badge>
                          </span>
                        </>
                      ))}
                    </div>
                  </div> : ''}
                </div>
              </>
            ) : (
              ''
            )}

          {productInfo?.details?.isCoinmarketcap !== null ||
          productInfo?.details?.isCoingecko !== null ? (
              <>
                <div className='crypto-info-item-key mt-3'>Available on: </div>
                <div className='row mt-3'>
                  { productInfo?.details?.isCoinmarketcap !== null ? <div className='col-xxl-12 col-12'>
                    <div
                      className='form-check custom-checkbox mb-3 checkbox-success'
                      style={{ padding: '0', display: 'flex' }}
                    >
                      { (productInfo?.details?.isCoinmarketcap ? (
                        <>
                          <CheckCircleOutlined
                            style={{
                              color: 'green',
                              display: 'flex',
                              alignItems: 'center',
                              paddingRight: '0.3rem'
                            }}
                          />
                          <span>
                            {productInfo?.details?.name} are existing on{' '}
                            <Badge>Coinmarketcap</Badge>
                          </span>
                        </>
                      ) : (
                        <>
                          <CloseCircleOutlined
                            style={{
                              color: 'red',
                              display: 'flex',
                              alignItems: 'center',
                              paddingRight: '0.3rem'
                            }}
                          />
                          <span>
                            {productInfo?.details?.name} are not existing on{' '}
                            <Badge bg='danger'>Coinmarketcap</Badge>
                          </span>
                        </>
                      ))}
                    </div>
                  </div> : ''
                  }

                  {productInfo?.details?.isCoingecko !== null ? <div className='col-xxl-12 col-12'>
                    <div
                      className='form-check custom-checkbox mb-3 checkbox-success'
                      style={{ padding: '0', display: 'flex' }}
                    >
                      { (productInfo?.details?.isCoingecko ? (
                        <>
                          <CheckCircleOutlined
                            style={{
                              color: 'green',
                              display: 'flex',
                              alignItems: 'center',
                              paddingRight: '0.3rem'
                            }}
                          />
                          <span>
                            {productInfo?.details?.name} are existing on{' '}
                            <Badge>Coingecko</Badge>
                          </span>
                        </>
                      ) : (
                        <>
                          <CloseCircleOutlined
                            style={{
                              color: 'red',
                              display: 'flex',
                              alignItems: 'center',
                              paddingRight: '0.3rem'
                            }}
                          />
                          <span>
                            {productInfo?.details?.name} are not existing on{' '}
                            <Badge bg='danger'>Coingecko</Badge>
                          </span>
                        </>
                      ))}
                    </div>
                  </div> : ''}
                </div>
              </>
            ) : (
              ''
            )}

          <ExchangeDetail coinName={productInfo?.details?.name} exchangeList={productInfo?.details?.exchanges} />

          {!showInfo && (
            <>
              <div className='crypto-info-item-key my-2'>Explorer: </div>
              <div
                className='d-flex align-items-center'
                style={{ flexWrap: 'wrap' }}
              >
                {isShow?.community && (
                  <div
                    className='basic-dropdown'
                    style={{ marginRight: '10px', marginBottom: '10px' }}
                  >
                    <Dropdown>
                      <Dropdown.Toggle
                        variant='primary'
                        className='cus-dropdown-select btn btn-primary light sharp'
                      >
                        Community
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {productInfo?.details &&
                          Object.keys(productInfo?.details?.community).map(
                            (key) => {
                              return (
                                <React.Fragment key={key}>
                                  {productInfo?.details?.community[key] !==
                                    '' && (
                                    <Dropdown.Item
                                      href={
                                        productInfo?.details?.community[key]
                                      }
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
                  <div
                    className='basic-dropdown'
                    style={{ marginRight: '10px', marginBottom: '10px' }}
                  >
                    <Dropdown>
                      <Dropdown.Toggle
                        variant='primary'
                        className='cus-dropdown-select btn btn-primary light sharp'
                      >
                        Source Code
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {productInfo?.details?.sourceCode &&
                          Object.keys(productInfo?.details?.sourceCode)?.map(
                            (key) => {
                              return (
                                <React.Fragment key={key}>
                                  {productInfo?.details?.sourceCode[key] !==
                                    '' && (
                                    <Dropdown.Item
                                      href={
                                        productInfo?.details?.sourceCode[key]
                                      }
                                      key={key}
                                      className='crypto-tag-item-list-children-contract cus-dropdown-item'
                                      target='_blank'
                                    >
                                      {productInfo?.details?.sourceCode[
                                        key
                                      ] && (
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
                  <div
                    className='basic-dropdown'
                    style={{ marginRight: '10px', marginBottom: '10px' }}
                  >
                    <Dropdown>
                      <Dropdown.Toggle
                        variant='primary'
                        className='cus-dropdown-select btn btn-primary light sharp'
                      >
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
                            <Image src={item?.image}
                            // preview={false}
                              alt='Website Logo'/>
                            <Tooltip title={toCammelCase(item?.chainName)}>
                              <span
                                className='crypto-tag-item-list-children-contract-address product-name-text text-primary'
                                style={{ cursor: 'pointer' }}
                              >
                                {item?.address}
                              </span>
                            </Tooltip>
                            <CopyOutlined
                              style={{ padding: '0, 1rem' }}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                copyContractAddress(e, item?.address)
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

          {productInfo?.mores?.tag && !_.isEmpty(productInfo?.mores?.tag) && (
            <div className='crypto-info'>
              <div className=''>
                <div className='crypto-info-item-key'>Tag: </div>
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
  )

  const about = (
    <>
      <div className='card-header border-0 pb-0 cus-card-header'>
        <h5 className='heading text-primary cus-heading'>About {productInfo?.details?.name}</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-interest '>
          <Description
            text={
              productInfo?.details?.description
                ? productInfo?.details?.description
                : ''
            }
          />
        </div>
      </div>
    </>
  )

  const exchange = (
    <>
      {!_.isEmpty(dataExchange) && (
        <>
          <div className='card-header border-0 pb-0'>
            <h5 className='heading text-primary'>Trading On</h5>
          </div>
          <div className='card-body pt-3 exchange'>
            <Table
              columns={columnExchanges}
              dataSource={dataExchange}
              pagination={
                dataExchange?.length > 10
                  ? {
                    pageSize: PAGE_SIZE,
                    defaultCurrent: 1,
                    showSizeChanger: false
                  }
                  : false
              }
            />
          </div>
        </>
      )}
    </>
  )

  const similar = <>
    {!_.isEmpty(productInfo?.similars) && (
      <>
        <div className='card-header border-0 pb-0 cus-card-header'>
          <h5 className='heading text-primary cus-heading'>Similar</h5>
        </div>
        <div className='card-body pt-3'>
          <div className='profile-interest '>
            <Similar type={CRYPTO} listProjectId={productInfo?.similars}/>
          </div>
        </div>
      </>
    )}
  </>

  const NO_CHART_LIST = ['DAI', 'USDT', 'USDC']
  let symbol = ''
  if (!NO_CHART_LIST.includes(productInfo?.details?.symbol)) {
    if (productInfo?.details?.isBinance) {
      symbol = `BINANCE:${productInfo?.details?.symbol}USDT`
    } else {
      if (productInfo?.details?.isCoinbase) {
        symbol = `COINBASE${productInfo?.details?.symbol}USDT`
      }
    }
  }

  const priceChart = (
    <CoinChart
      symbol={productInfo?.details?.symbol}
      price={productInfo?.details?.priceUSD}
      holders={productInfo?.details?.holders}
      marketCap={productInfo?.details?.marketcapUSD}
      totalSupply={productInfo?.details?.totalSupply}
      transfer={productInfo?.details?.transfers}
      symbolForChart={symbol}
    />
  )

  return (
    <>
      {/* <Helmet>
        <title>HELMET TEST</title>
        <meta name='description' content={productInfo?.detail?.description}></meta>
      </Helmet> */}
      <DetailLayout
        Header={header}
        type='crypto'
        summary={summary}
        scam={scam}
        more={more}
        about={about}
        exchange={exchange}
        topDiscus={<TopDiscussed />}
        portfolioOrChartOrDesc={priceChart}
        setTop={setTop}
        rest={rest}
        similar={similar}
        productInfo={productInfo}
      />
    </>
  )
}
export default CryptoInfo
