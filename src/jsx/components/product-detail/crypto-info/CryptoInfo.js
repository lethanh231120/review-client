import React, { useContext, useState, useEffect } from 'react'
import { Table } from 'antd'
import Description from '../description/Description'
import { CopyOutlined } from '@ant-design/icons'
import './crypto.scss'
import _ from 'lodash'
import { CRYPTO, CRYPTO_COIN } from '../../../constants/category'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import { ChainListContext, ExchangeContext } from '../../../../App'
import { Badge, Button } from 'react-bootstrap'
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
import MyScoreComponent, { getFinalScore } from '../../score/scoreComponent'
import { copyAddress } from '../../../../utils/effect'
import CoinChart from '../../charts/coinchart/CoinChart'
import { Link } from 'react-router-dom'
import {
  underlines,
  lineThrough,
  current,
  slash
} from '../../../constants/exchanges'
import { WARNING_ICON } from '../../common-widgets/logo/logo'
import { ExchangeDetail } from '../../common-widgets/page-crypto/ExchangeDetail'
import ShareButton from '../../common-widgets/page-detail/ShareButton'
import { WebsiteButton } from '../../common-widgets/page-detail/WebsiteButton'
import { ProductSimilar } from '../../common-widgets/page-detail/ProductSimilar'
import ProductImage, { altCrypto, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'
import { ProductNameSubName } from '../../common-widgets/page-detail/ProductNameSubName'
import { bgRed, SummaryDetail } from '../../common-widgets/page-detail/SummaryDetail'
import { bgGreen } from './../../common-widgets/page-detail/SummaryDetail'
import InformationHeader from '../../common-widgets/page-detail/InformationHeader'
import InfoContractDetail from '../../common-widgets/page-crypto/InfoContractDetail'
import InfoAvailableDetail from './../../common-widgets/page-crypto/InfoAvailableDetail'
import { InfoExplorerDetail } from '../../common-widgets/page-crypto/InfoExplorerDetail'
import { InfoTagDetail } from './../../common-widgets/page-crypto/InfoTagDetail'
import share from '../../../../images/svg/share.svg'
import hands from '../../../../images/svg/hands.svg'
import { Modal } from 'antd'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import ProductDetailHeader from '../../skeleton/product-detail-skeleton/ProductDetailHeader'
import ProductDetailSummary from '../../skeleton/product-detail-skeleton/ProductDetailSummary'
import ProductDetailInfo from '../../skeleton/product-detail-skeleton/ProductDetailInfo'
import ProductDetailChart from '../../skeleton/product-detail-skeleton/ProductDetailChart'
import { mapScamReason } from './scam-reason'

const CryptoInfo = ({ isShow, productInfo, ...rest }) => {
  const detail = productInfo?.details
  const topHolder = productInfo?.mores?.holder
  const PAGE_SIZE = 10
  const chainList = useContext(ChainListContext)
  const exchanges = useContext(ExchangeContext)
  const [showInfo, setShowInfo] = useState()
  const [multichain, setMultichain] = useState()
  const [mainExplorer, setMainExplorer] = useState()
  const [dataExchange, setDataExchange] = useState([])
  const [top, setTop] = useState()
  const [openModalShare, setOpenModalShare] = useState(false)

  useEffect(() => {
    setShowInfo(
      !isShow?.community &&
        _.isEmpty(detail?.multichain) &&
        !isShow?.founders &&
        !isShow?.explorer &&
        !isShow?.sourceCode
    )
  }, [isShow, productInfo])

  useEffect(() => {
    const getDataVenture = async() => {
      setMainExplorer()
      if (!_.isEmpty(detail?.multichain)) {
        const newMultiChain = []
        detail?.multichain?.forEach((itemMulti) => {
          const parts = itemMulti?.split('_')
          if (parts?.length === 4) {
            const chainName = parts[2]
            const itemChain = chainList[chainName]
            if (itemChain) {
              // add new address field to item chain
              itemChain['address'] = parts[3]
              newMultiChain.push({
                ...itemChain,
                ...itemMulti
              })
              // main address to display
              if (detail?.chainName === itemMulti?.split('_')[2]) {
                setMainExplorer(
                  `${itemChain?.exploreWebsite}${itemChain?.path}${detail?.address}`
                )
              }
            }
          }
        })
        if (!_.isEmpty(newMultiChain)) {
          setMultichain(newMultiChain)
        }
      } else {
        // don't have multiple chain
        const dataChain = chainList[detail?.chainName]
        // have data in chain list
        if (dataChain) {
          setMainExplorer(
            `${dataChain?.exploreWebsite}${dataChain?.path}${detail?.address}`
          )
        }
      }
    }
    getDataVenture()
  }, [detail, chainList])

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
          target={'_blank'}
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
              preview={false}
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
        <a href={`${record?.website}`} rel='noopener noreferrer' target='_blank' className='exchange-pair'>
          {record?.symbol}
        </a>
      )
    }
  ]

  const projectType = <>
    {detail?.type && (
      <Badge className='badge-sm ' >{toCammelCase(detail?.type) }</Badge>
    )}
  </>
  const nameSymbolType = <div className=''>
    <span>
      {detail?.name}
    </span>
    <span>
      {detail?.symbol ? ` - ${detail?.symbol}` : ''}
    </span>
    &nbsp;&nbsp;
    <span className='mb-1'>
      {projectType}
    </span>
  </div>

  const explorerCoin = <>
    {(detail?.type === CRYPTO_COIN && detail?.explorer) && (
      <p className='crypto-info-item-address text-break fs-6'>
        <a
          href={detail?.explorer}
          target='_blank'
          rel='noreferrer'
          className='product-name-text text-primary'
          style={{ cursor: 'pointer' }}
        >
          {detail?.explorer?.split('/')[2]}
        </a>
        <LinkOutlined style={{ fontSize: '0.8rem' }}/>
      </p>
    )}
  </>

  const explorerToken = <>
    {detail?.address && (<div className='d-flex align-items-center text-break'>
      <img
        alt={`${detail?.chainName} blockchain Logo`}
        src={chainList[`${detail?.chainName}`]?.image}
        height={14}
        width={14}
        style={{ borderRadius: '1rem' }}
        // className='d-flex align-items-center'
      />
              &nbsp;
      <h1 className='mb-0 fs-6 '>
        <a
          href={detail?.explorer || mainExplorer}
          target='_blank'
          rel='noreferrer'
          className='product-name-text text-primary txt-link'
        >
          {detail?.address}
        </a>
      </h1>
             &nbsp;
      <CopyOutlined
        style={{ padding: '0, 1rem', fontSize: '1rem' }}
        onClick={(e) => {
          copyAddress(e, detail?.address, 'Copy address successfully!')
        }}
      />
    </div>)}
  </>

  const projectNameSymbolTypeExplorer = <>
    {
      detail?.type === CRYPTO_COIN
        ? <>
          <h1 className='text-primary mb-1' style={{ fontSize: '1.125rem' }}>{nameSymbolType}</h1>
          {explorerCoin}
        </>
        : <>
          <h2 className='text-primary mb-1' style={{ fontSize: '1.125rem' }}>{nameSymbolType}</h2>
          {explorerToken}
        </>
    }
  </>

  const header = (
    <>
      {rest?.loadingDetail ? (
        <ProductDetailHeader/>
      ) : (
        <div className='profile-info row'>
          <div className='col-12'>
            <div className='profile-details'>
              <ProductImage
                imageUrl={detail?.bigLogo || detail?.smallLogo || detail?.thumbLogo}
                productName={detail?.symbol || detail?.name}
                altImageType={altCrypto}
                size={sizeImg48}
              />
              <ProductNameSubName
                projectName={projectNameSymbolTypeExplorer}
              />
              <div className='detail-button ms-auto'>
                <Button onClick={() => setOpenModalShare(true)}>
                  <img src={share} alt='share button'/>
              Share
                </Button>
                <WebsiteButton website={detail?.website} />
              </div>
            </div>
            <Modal
              open={openModalShare}
              show={openModalShare}
              onCancel={() => setOpenModalShare(false)}
              onOk={() => setOpenModalShare(false)}
              footer={false}
              destroyOnClose={true}
            >
              <ShareButton name={detail?.name} setOpenModalShare={setOpenModalShare}/>
            </Modal>
          </div>

        </div>
      )}
    </>
  )

  // summary
  const summary = (
    <>
      {rest?.loadingDetail ? (
        <ProductDetailSummary/>
      ) : (
        <div className='text-center'>
          <div className='row'>
            <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
              <SummaryDetail number={new Intl.NumberFormat().format(detail?.totalReviews)} text={'Reviews'} backgroundColor={bgGreen} />
            </div>
            <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
              <SummaryDetail number={new Intl.NumberFormat().format(detail?.totalIsScam)} text={'Reported Scam'} backgroundColor={bgRed} />
            </div>
            <div className='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
              <div className='mb-0 mt-3'>
                <MyScoreComponent score={detail?.score} type={CRYPTO} />
              </div>
              <div>Score</div>
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
      )}
    </>
  )
  // scam
  const scam = (
    <>
      {detail?.isScam ? (
        <ScamWarningDetail
          isShow={true}
          scamWarningReason={mapScamReason(detail?.proof?.isScam)}
          proofType='warning'
        />
      ) : detail?.isWarning ? (
        <ScamWarningDetail
          isShow={true}
          scamWarningReason={mapScamReason(detail?.proof?.isScam || detail?.proof?.isWarning)}
          proofType='warning'
        />
      ) : (
        ''
      )}
    </>
  )

  const more = <div>
    {rest?.loadingDetail ? (<ProductDetailInfo/>) : (
      <>
        <InformationHeader projectName={detail?.name}/>
        <div className='card-body pt-3'>
          <div className='basic-form'>
            {(detail?.isProxy !== null ||
          detail?.contractVerified !== null)
              ? <InfoContractDetail detail={detail} mainExplorer={mainExplorer} />
              : ''
            }

            {detail?.isCoinmarketcap !== null ||
          detail?.isCoingecko !== null
              ? <InfoAvailableDetail detail={detail} />
              : ''
            }

            <ExchangeDetail coinName={detail?.name} exchangeList={detail?.exchanges} />

            {!showInfo && <InfoExplorerDetail isShow={isShow} detail={detail} multichain={multichain}/>
            }

            <InfoTagDetail itemTags={productInfo?.mores?.tag} />
            <p>
          If you have any good or bad experience with
              <span className='text-primary'>
                {` ${detail?.name}`}
              </span>, please share with us in informing everyone
              <img src={hands} alt='icon-hand' style={{ marginLeft: '0.3rem', width: '1.1rem' }}/>
              <img src={hands} alt='icon-hand' style={{ width: '1.1rem' }}/>
              <img src={hands} alt='icon-hand' style={{ marginRight: '0.3rem', width: '1.1rem' }}/>
              <span
                onClick={() => {
                  rest?.setData({ ...rest.data, isScam: false })
                  rest?.form.setFieldsValue({
                    isScam: false,
                    star: undefined,
                    sources: []
                  })
                  window.scrollTo(0, top)
                }}
                className='text-primary txt-link'
                style={{ marginLeft: '0.5rem' }}

              >
            Review Now
              </span>
            </p>
          </div>
        </div>
      </>
    )}
  </div>

  const contractAddress = <>
    { !_.isEmpty(detail?.multichain)
      ? <>
        <div>
          {detail?.multichain?.map((chain) => (<>
            {
              chain?.split('_')?.length >= 4
                ? <div className='mb-3'>
                  <h3 style={{ fontSize: '1rem', color: '#A098AE', fontWeight: '400', display: 'inline' }}>
                    <span className='text-primary text-break'>{chain?.split('_')[3]}</span>&nbsp;
                            on chain {toCammelCase(chain?.split('_')[2])}
                  </h3>
                </div>
                : ''
            }
          </>
          ))}
        </div>
                  &nbsp;
      </>
      : ''}
  </>

  const about = <>
    {rest?.loadingDetail ? (
      <ProductDetailInfo/>
    ) : (
      <Description
        projectName={`What Is ${detail?.name}(${detail?.symbol}) ?`}
        text={ detail?.description }
      />
    )}
  </>

  const exchange = (
    <>
      {rest?.loadingDetail ? (
        <MySkeletonLoadinng count={5} height={50}/>
      ) : (
        <>
          {!_.isEmpty(dataExchange) && (
            <>
              <div className='card-header border-0 pb-0'>
                <h2 className='heading text-primary'>{detail?.name} Trading On</h2>
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
      )}
    </>
  )

  const NO_CHART_LIST = ['DAI', 'USDT', 'USDC', 'SNT']
  let symbol = ''
  if (!NO_CHART_LIST.includes(detail?.symbol)) {
    if (detail?.isBinance) {
      symbol = `BINANCE:${detail?.symbol}USDT`
    } else {
      if (detail?.isCoinbase) {
        symbol = `COINBASE${detail?.symbol}USDT`
      }
    }
  }

  const priceChart = <>
    {rest?.loadingDetail ? (<ProductDetailChart/>) : (
      <CoinChart
        name={detail?.name}
        symbol={detail?.symbol}
        price={detail?.priceUSD}
        holders={detail?.holders}
        marketCap={detail?.marketcapUSD}
        totalSupply={detail?.totalSupply}
        transfer={detail?.transfers}
        symbolForChart={symbol}
      />
    )}
  </>

  // { /* START DEMO: TEST NEW GUI FOR SEO */ }
  const blockHeader = (headerText) => <>
    <div className='card-header border-0 pb-0'>
      <div className='heading text-primary d-flex align-items-center break-word'>
        <i className='material-icons fs-30 text-primary'>subject</i>
        <h2 style={{ fontSize: '1.5rem' }} className='m-0 text-primary'>
          {headerText}
        </h2>
      </div>
    </div>
  </>

  const blockContent = (content) => <>
    <div className={ 'card-body pt-3' }>
      <div className={ 'profile-blog' }>
        <div className={ 'mb-0' }>
          <div className='description-list'>
            <div className='card-content' style={{ fontSize: '1rem', lineHeight: '2' }}>
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>

  const test1 = <>
    {rest?.loadingDetail ? (
      <ProductDetailInfo/>
    ) : <>
      <Description
        replaceIcon='price_check'
        projectName={`${detail?.symbol} Price Live Data`}
        text={`
          The live ${detail?.name} price today is <b style='color: #039F7F'>$${detail?.priceUSD} USD</b> with a 24-hour trading volume of <b style='color: #039F7F'>$${detail?.marketcapUSD} USD</b>. We update our ${detail?.symbol} to USD price in real-time. ${detail?.name} is down <b style='color: #039F7F'>5.45%</b> in the last 24 hours. It has a circulating supply of <b style='color: #039F7F'>435,555,547</b> ${detail?.symbol} coins and a max. supply of <b style='color: #039F7F'>${detail?.totalSupply || 0}</b> ${detail?.symbol} coins.
          <br />
          If you would like to know where to buy ${detail?.name} at the current rate, the top cryptocurrency exchanges for trading in Coin9 are currently Binance, Deepcoin, Bybit, Bitrue, and BingX. You can find others listed on our crypto exchanges page.
        ` }
      />
    </>
    }
  </>

  const test3 = <>
    {rest?.loadingDetail ? (
      <ProductDetailInfo/>
    ) : <>
      <Description
        projectName={`${detail?.name}'s Score`}
        text={`
        ${detail?.symbol} scored ${getFinalScore(detail?.score, CRYPTO)}/10 on the Gear5.io,  which we based on parameters such as liquidity on Dex exchanges, contract information such as whether there is a proxy or not, whether the contract is verified or not, which CEX and DEX exchanges it is traded on, trading volume, website information, number of holders, and transfers of COINS/TOKENS. If you have any questions about the score we provided, please contact zoro@nika.guru.
        <br />
        <br />
        In addition, we also provide user alerts for suspicious COINS/TOKENS based on simulated trading methods on DEX exchanges and checking their contract. The number of Spam reports also has a significant impact on our alert system.
        ` }
      />
    </>
    }
  </>

  const test4 = <>
    {rest?.loadingDetail ? (
      <ProductDetailInfo/>
    ) : <>
      <Description
        projectName={`What is ${detail?.name}(${detail?.symbol})'s community?`}
      />
      {blockContent(<>
        You can join the {detail?.name} communities at coin98.com and blog.coin98.com. The ${detail?.name} team has released the source code here.
        {!_.isEmpty(detail?.multichain) ? ` Additionally, ${detail?.name} has currently been launched on ${detail?.multichain?.length} chains with addresses` : ''}
        { contractAddress }
      </>)}
    </>
    }
  </>

  const test7 = <>
    {rest?.loadingDetail ? (
      <ProductDetailInfo/>
    ) : <>
      <Description
        skipMinimizeMode={true}
        projectName={`FAQs`}
        text={`
        <b style='color: #039F7F'>Coin98 (C98) price has declined today.</b>
        <br/>
        The price of Coin98 (C98) is $0.288471 today with a 24-hour trading volume of $67,783,183. This represents a -5.88% price decline in the last 24 hours and a 4.86% price increase in the past 7 days. With a circulating supply of 440 Million C98, Coin98 is valued at a market cap of $125,952,605.
        <br/>
        <br/>
        <b style='color: #039F7F'>Where can you buy Coin98?</b>
        <br/>
        C98 tokens can be traded on centralized crypto exchanges. The most popular exchange to buy and trade Coin98 is Binance, where the most active trading pair C98/USDT has a trading volume of $30,141,381 in the last 24 hours. Other popular options include  XYZ Exchange and XYZ Exchange.
        <br/>
        <br/>
        <b style='color: #039F7F'>What is the daily trading volume of Coin98 (C98)?</b>
        <br/>
        The trading volume of Coin98 (C98) is $67,973,704 in the last 24 hours, representing a -5.30% decrease from one day ago and signalling a recent fall in market activity.
        <br/>
        <br/>
        <b style='color: #039F7F'>What is the all-time high for Coin98 (C98)?</b>
        <br/>
        The highest price paid for Coin98 (C98) is $6.42, which was recorded on Aug 25, 2021 (over 1 year). Comparatively, the current price is -95.50% lower than the all-time high price.
        <br/>
        <br/>
        <b style='color: #039F7F'>What is the all-time low for Coin98 (C98)?</b>
        <br/>
        The lowest price paid for Coin98 (C98) is $0.153360, which was recorded on Dec 31, 2022 (3 months). Comparatively, the current price is 88.54% higher than the all-time low price.
        <br/>
        <br/>
        <b style='color: #039F7F'>What is the market cap of Coin98 (C98)?</b>
        <br/>
        Market capitalization of Coin98 (C98) is $125,952,605 and is ranked #251 on CoinGecko today. Market cap is measured by multiplying token price with the circulating supply of C98 tokens (440 Million tokens are tradable on the market today).
          ` }
      />
    </>
    }
  </>

  const addressColorArr = []
  addressColorArr?.push('#e60049')
  addressColorArr?.push('#0bb4ff')
  addressColorArr?.push('#50e991')
  addressColorArr?.push('#e6d800')
  addressColorArr?.push('#9b19f5')
  addressColorArr?.push('#ffa300')
  addressColorArr?.push('#dc0ab4')
  addressColorArr?.push('#b3d4ff')
  addressColorArr?.push('#00bfa0')
  addressColorArr?.push('#039F7F')
  const columns = [
    {
      title: '#',
      align: 'right',
      render: (text, record, index) => <span style={{ color: addressColorArr[index % 10] }}>{index + 1}</span>

    },
    {
      title: 'Holding',
      align: 'right',
      render: (_, record, index) => <span style={{ color: addressColorArr[index % 10] }}>{record?.share}&nbsp;%</span>
    },
    {
      title: 'Address',
      align: 'left',
      render: (_, record, index) => <>
        <div className='d-flex align-items-center'>
          <CopyOutlined
            onClick={(e) =>
              copyAddress(e, record?.address, 'Copy address successfully')
            }
          />
          &nbsp;
          <span style={{ color: addressColorArr[index % 10] }}>{record?.address}</span>
        </div>
      </>
    }
  ]

  const test8 = <>
    {
      rest?.loadingDetail
        ? <ProductDetailInfo/>
        : (topHolder && !_.isEmpty(topHolder)) && <>
          {detail?.name && blockHeader(`Top ${topHolder?.length} ${detail?.name}'s holder`) }
          {blockContent(<>
            <div style={{ height: '100%' }}>
              <Table
                style={{ overflow: 'scroll' }}
                pagination={false}
                className='custom-table'
                columns={columns}
                dataSource={topHolder}/>
            </div>
          </>)}
        </>
    }
  </>
  // { /* END DEMO: TEST NEW GUI FOR SEO */ }

  return <DetailLayout
    Header={header}
    type={CRYPTO}
    summary={summary}
    scam={scam}
    more={more}
    about={about}
    exchange={exchange}
    topDiscus={<TopDiscussed />}
    portfolioOrChartOrDesc={priceChart}
    setTop={setTop}
    rest={rest}
    similar={ <ProductSimilar productType={CRYPTO} similarList={productInfo?.similars} /> }
    productInfo={productInfo}
    // { /* START DEMO: TEST NEW GUI FOR SEO */ }

    test1={test1}
    test3={test3}
    test4={test4}

    test7={test7}
    test8={test8}
    // { /* END DEMO: TEST NEW GUI FOR SEO */ }
  />
}
export default CryptoInfo
