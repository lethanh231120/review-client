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
// import { Badge, Button, Card } from 'react-bootstrap'
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
import CoinChart, { formatPriceNumber } from '../../charts/coinchart/CoinChart'
import { Link } from 'react-router-dom'
import {
  underlines,
  lineThrough,
  current,
  slash
} from '../../../constants/exchanges'
// import { WARNING_ICON } from '../../common-widgets/logo/logo'
// import { ExchangeDetail } from '../../common-widgets/page-crypto/ExchangeDetail'
import ShareButton from '../../common-widgets/page-detail/ShareButton'
import { WebsiteButton } from '../../common-widgets/page-detail/WebsiteButton'
import { ProductSimilar } from '../../common-widgets/page-detail/ProductSimilar'
import ProductImage, { altCrypto, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'
import { ProductNameSubName } from '../../common-widgets/page-detail/ProductNameSubName'
import { bgRed, SummaryDetail, bgGreen } from '../../common-widgets/page-detail/SummaryDetail'
// import InformationHeader from '../../common-widgets/page-detail/InformationHeader'
import InfoContractDetail from '../../common-widgets/page-crypto/InfoContractDetail'
// import InfoAvailableDetail from './../../common-widgets/page-crypto/InfoAvailableDetail'
import { InfoExplorerDetail } from '../../common-widgets/page-crypto/InfoExplorerDetail'
// import { InfoTagDetail } from './../../common-widgets/page-crypto/InfoTagDetail'
import share from '../../../../images/svg/share.svg'
import hands from '../../../../images/svg/hands.svg'
import { Modal } from 'antd'
import { MySkeletonLoadinng } from '../../common-widgets/my-spinner'
import ProductDetailHeader from '../../skeleton/product-detail-skeleton/ProductDetailHeader'
import ProductDetailSummary from '../../skeleton/product-detail-skeleton/ProductDetailSummary'
import ProductDetailInfo from '../../skeleton/product-detail-skeleton/ProductDetailInfo'
import ProductDetailChart from '../../skeleton/product-detail-skeleton/ProductDetailChart'
import { mapScamReason } from './scam-reason'
import { domainGear5, emailContactText } from '../../referral-code/ReferralCodeNotification'
import { formatLargeNumber, formatMoney } from '../../../../utils/formatNumber'
import { formatChartDate } from '../../insight/charts/BarChart'
import { formatDateStyle } from '../../../../utils/time/time'
import { timeAgoConvert } from '../../common-widgets/home/click-function'
// import { Pie } from 'react-chartjs-2'
import { Collapse } from 'antd'
import { useNavigate } from 'react-router-dom'
const { Panel } = Collapse
import { getExchangeNameFromUrlImageExchage, formatUrlDetailFromUrlImageExchange } from '../../../../utils/formatText'
import { CheckCircleOutlined } from '@ant-design/icons'
import ShortItem from '../../common-widgets/page-detail/ShortItem'

const CryptoInfo = ({ isShow, productInfo, ...rest }) => {
  const navigate = useNavigate()

  const detail = productInfo?.details
  const topHolder = productInfo?.mores?.holder
  const tradingExchanges = productInfo?.mores?.trading
  // const PAGE_SIZE = 10
  const PAGE_SIZE = 5
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
    tradingExchanges?.forEach((itemExchange) => {
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

  // const handleReportScam = () => {
  //   rest?.setData({
  //     ...rest.data,
  //     isScam: true
  //   })
  //   rest?.form?.setFieldsValue({
  //     isScam: true,
  //     star: 1
  //   })
  //   window.scrollTo(0, top)
  // }

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
      <p className='crypto-info-item-address text-break fs-16'>
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
        height={18}
        width={18}
        style={{ borderRadius: '1rem' }}
        // className='d-flex align-items-center'
      />
              &nbsp;
      <h1 className='mb-0 fs-16 '>
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

  const scam = <>
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

  const more = <div className='basic-form'>
    {(detail?.isProxy !== null || detail?.contractVerified !== null)
      ? <InfoContractDetail detail={detail} mainExplorer={mainExplorer} />
      : ''
    }
    <ShortItem
      icon={
        <>
          <CheckCircleOutlined
            style={{
              color: 'green',
              display: 'flex',
              alignItems: 'center',
              marginTop: '0.3rem',
              paddingRight: '0.3rem',
              float: 'left',
              fontSize: '1.1rem'
            }}
          />
        </>
      }
      title={
        <>
          {(detail?.isCoinmarketcap !== null || detail?.isCoingecko)
            ? <div>
              <h3 className='fs-16 mb-0' style={{ display: 'inline', color: 'rgba(0, 0, 0, 0.6)' }}>
                {detail?.name} is listed on
                {detail?.isCoinmarketcap ? <span className='text-primary'> Coinmarketcap</span> : ''}
                {detail?.isCoingecko ? <span className='text-primary'>, Coingecko</span> : ''}
                {!_.isEmpty(detail?.exchanges) ? (
                  <>
                &nbsp; and trading on &nbsp;
                    {detail?.exchanges?.map((itemImageUrl, index) => (<>
                      <span>
                    &nbsp;
                        <img src={itemImageUrl} height={18} width={18} alt='Exchange Logo' style={{ borderRadius: '2rem' }}/>
                        &nbsp;
                        <span onClick={(e) => { handleClickExchange(e, itemImageUrl) } }
                          className='text-primary txt-link'
                        >
                          {getExchangeNameFromUrlImageExchage(itemImageUrl)}
                        </span>
                      &nbsp;
                      </span>
                    </>))}
                  </>
                ) : ''}
              </h3>
            </div> : (<>
              {!_.isEmpty(detail?.exchanges) ? (
                <>
                  {detail?.name} is traded on Binance &nbsp;
                  {detail?.exchanges?.map((itemImageUrl, index) => (<>
                    <span>
                    &nbsp;
                      <img src={itemImageUrl} height={18} width={18} alt='Exchange Logo' style={{ borderRadius: '2rem' }}/>
                        &nbsp;
                      <span onClick={(e) => { handleClickExchange(e, itemImageUrl) } }
                        className='text-primary txt-link'
                      >
                        {getExchangeNameFromUrlImageExchage(itemImageUrl)}
                      </span>
                      &nbsp;
                    </span>
                  </>))}
                </>
              ) : ''}
            </>)
          }
        </>
      }
    />

    {!showInfo && <InfoExplorerDetail isShow={isShow} detail={detail} multichain={multichain}/> }

    <div style={{ fontSize: '1rem' }}>
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
          console.log(top)
        }}
        className='text-primary txt-link'
        style={{ marginLeft: '0.5rem' }}

      >
        Review Now
      </span>
    </div>
  </div>

  // summary
  const summary = (
    <>
      {rest?.loadingDetail ? (
        <ProductDetailSummary/>
      ) : (
        <div style={{ padding: '1rem 0' }}>
          {/* summary */}
          <div >
            <div style={{ textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className='summary-item display-1200'>
                <SummaryDetail number={new Intl.NumberFormat().format(detail?.totalReviews)} text={'Reviews'} backgroundColor={bgGreen} />
              </div>
              <div className='summary-item'>
                <SummaryDetail number={new Intl.NumberFormat().format(detail?.totalIsScam)} text={'Reported Scam'} backgroundColor={bgRed} />
              </div>
              <div className='summary-item'>
                <div className='mb-0 mt-3'>
                  <MyScoreComponent score={detail?.score} type={CRYPTO} />
                </div>
                <div>Score</div>
              </div>
            </div>
            <div style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '500', padding: '1rem 0' }}>
              Click
              <a href='' target='_blank' className='summary-link'>Here</a> to view a list of projects based on your preferences
            </div>
          </div>

          {/* scam or warning */}
          {scam}

          {/* more */}
          {more}
        </div>
      )}
    </>
  )

  const handleClickExchange = (e, item) => {
    e.stopPropagation()
    e.preventDefault()
    const urlDetail = formatUrlDetailFromUrlImageExchange(item)
    navigate(`../../../../../${urlDetail}`)
  }

  // const contractAddress = <>
  //   { !_.isEmpty(detail?.multichain)
  //     ? <>
  //       <div>
  //         {detail?.multichain?.map((chain) => (<>
  //           {
  //             chain?.split('_')?.length >= 4
  //               ? <div className='mb-3'>
  //                 <h3 style={{ fontSize: '1.2rem', color: '#A098AE', fontWeight: '400', display: 'inline' }}>
  //                   <span className='text-primary text-break'>{chain?.split('_')[3]}</span>&nbsp;
  //                     on chain {toCammelCase(chain?.split('_')[2])}
  //                 </h3>
  //               </div>
  //               : ''
  //           }
  //         </>
  //         ))}
  //       </div>
  //                 &nbsp;
  //     </>
  //     : ''}
  // </>

  const about = <>
    {rest?.loadingDetail ? (
      <ProductDetailInfo/>
    ) : detail?.description && (
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
                    dataExchange?.length > PAGE_SIZE
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
        // name={detail?.name}
        name={''}
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

  const blockContent = (content) => <>
    <div className={ 'card-body pt-3' }>
      <div className={ 'profile-blog' }>
        <div className={ 'mb-0' }>
          <div className='description-list'>
            <div className='card-content' style={{ fontSize: '1.2rem', lineHeight: '2' }}>
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  const getTradingExchangeText = () =>{
    const existedTradingExchangeMap = new Map()
    let textOutput = ''
    tradingExchanges?.map((tradingExchange) => {
      const exchangeName = toCammelCase(tradingExchange?.exchangeId?.split('_')[2])
      const isExist = existedTradingExchangeMap?.get(exchangeName)
      if (!isExist) {
        existedTradingExchangeMap?.set(exchangeName, true)
        textOutput += exchangeName + ', '
      }
    })
    // remove last ',...'
    if (textOutput) {
      textOutput = textOutput?.substring(0, textOutput?.length - 2)
    }
    return textOutput
  }

  const conditionCryptoPriceLiveDataContent1 = detail?.priceUSD
  const conditionCryptoPriceLiveDataContent2 = detail?.totalVolume
  const conditionCryptoPriceLiveDataContent3 = detail?.priceChangePercentage24h
  const conditionCryptoPriceLiveDataContent4 = detail?.totalSupply
  const conditionCryptoPriceLiveDataContent5 = getTradingExchangeText()
  const cryptoPriceLiveDataContent = (conditionCryptoPriceLiveDataContent1 ||
    conditionCryptoPriceLiveDataContent2 ||
    conditionCryptoPriceLiveDataContent3 ||
    conditionCryptoPriceLiveDataContent4 ||
    conditionCryptoPriceLiveDataContent5
  ) && <>
    {conditionCryptoPriceLiveDataContent1 && <>
      The live {detail?.name} price today is <b className='text-primary'>{formatPriceNumber(detail?.priceUSD)} USD</b> with a 24-hour.
      <br />
    </>}

    { conditionCryptoPriceLiveDataContent2 && <>
       Trading volume of <b className='text-primary'>{formatMoney(detail?.totalVolume)} USD</b>.
      <br />
    </> }

    {conditionCryptoPriceLiveDataContent3 && <>
      We update our {detail?.symbol} to USD price in real-time. {detail?.name} is {detail?.priceChangePercentage24h < 0 ? 'down' : 'up'} <b className={`${detail?.priceChangePercentage24h < 0 ? 'text-danger' : 'text-primary'}`}>{Math.abs(detail?.priceChangePercentage24h)?.toFixed(3)}%</b> in the last 24 hours.
      <br />
    </>}

    {conditionCryptoPriceLiveDataContent4 && <>
      It has a total supply of <b className='text-primary'>{detail?.totalSupply ? formatLargeNumber(detail?.totalSupply) : 0}</b> {detail?.symbol} coins.
      <br />
    </> }

    {conditionCryptoPriceLiveDataContent5 && <>
      If you would like to know where to buy {detail?.name} at the current rate, the top cryptocurrency exchanges for trading in {detail?.name} are currently <span className='text-primary'>{getTradingExchangeText()}</span>. You can find others listed on our crypto exchanges page.
      <br />
    </> }

  </>

  const cryptoPriceLiveData = <>
    {rest?.loadingDetail ? (
      <ProductDetailInfo/>
    ) : <>
      <Description
        replaceIcon='price_check'
        projectName={`${detail?.symbol} Price Live Data`}
      />
      {blockContent(cryptoPriceLiveDataContent)}
    </>
    }
  </>

  const contentCryptoScoreDescription = <>
    {detail?.symbol} scored <b className='text-primary'>{getFinalScore(detail?.score, CRYPTO)}</b>/10 on the <b><a href={domainGear5} className='text-primary txt-link' target='_blank' rel='noreferrer'>Gear5.io</a></b>,  which we based on parameters such as liquidity on Dex exchanges, contract information such as whether there is a proxy or not, whether the contract is verified or not, which CEX and DEX exchanges it is traded on, trading volume, website information, number of holders, and transfers of COINS/TOKENS. If you have any questions about the score we provided, please contact {emailContactText}.
    <br />
    <br />
In addition, we also provide user alerts for suspicious COINS/TOKENS based on simulated trading methods on DEX exchanges and checking their contract. The number of Spam reports also has a significant impact on our alert system.
  </>

  const cryptoDefinitionContent = <>
  You can join the {detail?.name} communities at { Object.keys(detail?.community)?.map(
      (websiteName) => detail?.community[websiteName] && <>
        <a className='text-primary txt-link' target='_blank' href={detail?.community[websiteName]} rel='noreferrer'>{websiteName}</a>,&nbsp;
      </>) }
      ... The {detail?.name} team has released the source code here: { Object.keys(detail?.sourceCode)?.map(
      (websiteName) => <>
        <a className='text-primary txt-link' rel='noreferrer' target='_blank' href={detail?.sourceCode[websiteName]}>
          {websiteName}
        </a>,&nbsp;
      </>
    )}

  </>

  const collap1 = <>
    <div className='card-header border-0 pb-0'>
      <div className='heading text-primary d-flex align-items-center break-word'>
        <i className='material-icons fs-30 text-primary'>subject</i>
        <h2 style={{ fontSize: '1.5rem' }} className='m-0 text-primary'>
          {`About ${detail?.name}`}
        </h2>
      </div>
    </div>
    <Collapse bordered={false}>
      <Panel header={<h4>{`${detail?.name}'s Score`}</h4>} key='1' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          {(contentCryptoScoreDescription)}
        </span>
      </Panel>
      <Panel header={(<h4>{`What is ${detail?.name}(${detail?.symbol})'s community?`}</h4>)} key='2' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          {(cryptoDefinitionContent) }
        </span>
      </Panel>
    </Collapse>
  </>

  const FAQs = <>
    <div className='card-header border-0 pb-0'>
      <div className='heading text-primary d-flex align-items-center break-word'>
        <i className='material-icons fs-30 text-primary'>subject</i>
        <h2 style={{ fontSize: '1.5rem' }} className='m-0 text-primary'>
          FAQs
        </h2>
      </div>
    </div>
    <Collapse bordered={false}>
      <Panel header={(<h4>{detail?.name} ({detail?.symbol}) price has declined today.</h4>)} key='1' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          The price of {detail?.name} ({detail?.symbol}) is <b className='text-primary'>{formatPriceNumber(detail?.priceUSD)}</b> today with a 24-hour trading volume of <b className='text-primary'>{formatMoney(detail?.totalVolume)}</b>. This represents a <span className={`${detail?.priceChangePercentage24h < 0 ? 'text-danger' : 'text-primary'}`}><b>{Math.abs(detail?.priceChangePercentage24h)?.toFixed(3)}%</b></span> price {detail?.priceChangePercentage24h < 0 ? 'decline' : 'increase'} in the last 24 hours. With a total supply of <b className='text-primary'>{detail?.totalSupply ? formatLargeNumber(detail?.totalSupply) : 0}</b> {detail?.symbol}, {detail?.name} is valued at a market cap of <b className='text-primary'>{formatMoney(detail?.marketcapUSD)}</b>
        </span>
      </Panel>
      <Panel header={(<h4>Where can you buy {detail?.name}?</h4>)} key='2' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          {detail?.symbol} tokens can be traded on centralized crypto exchanges. The most popular exchange to buy and trade {detail?.name} is <span className='text-primary'>{getTradingExchangeText()}</span>.
        </span>
      </Panel>
      <Panel header={(<h4>What is the daily trading volume of {detail?.name} ({detail?.symbol})?</h4>)} key='3' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          The trading volume of {detail?.name} ({detail?.symbol}) is <b className='text-primary'>{formatLargeNumber(detail?.totalVolume) }</b> in the last 24 hours.
        </span>
      </Panel>
      <Panel header={(<h4>What is the all-time high for {detail?.name} ({detail?.symbol})?</h4>)} key='4' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          The highest price paid for {detail?.name} ({detail?.symbol}) is <b className='text-primary'>{formatPriceNumber(detail?.ath)}</b>, which was recorded on <span className='text-primary'>{formatChartDate(detail?.athDate, formatDateStyle)}</span> (<span className='text-primary'>{timeAgoConvert(detail?.athDate)}</span>). Comparatively, the current price is <b className='text-danger'>-{ (detail?.priceUSD / detail?.ath * 100)?.toFixed(2) }%</b> lower than the all-time high price.
        </span>
      </Panel>
      <Panel header={(<h4>What is the all-time low for {detail?.name} ({detail?.symbol})?</h4>)} key='5' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          The lowest price paid for {detail?.name} ({detail?.symbol}) is <b className='text-danger'>{formatPriceNumber(detail?.atl)}</b>, which was recorded on <span className='text-primary'>{formatChartDate(detail?.atlDate, formatDateStyle)}</span> (<span className='text-primary'>{timeAgoConvert(detail?.atlDate)}</span>). Comparatively, the current price is <b className='text-primary'>{ (detail?.priceUSD / detail?.atl * 100)?.toFixed(2) }%</b> higher than the all-time low price.
        </span>
      </Panel>
      <Panel header={(<h4>What is the market cap of {detail?.name} ({detail?.symbol})?</h4>)} key='6' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          Market capitalization of {detail?.name} ({detail?.symbol}) is <b className='text-primary'>{formatMoney(detail?.marketcapUSD) }</b>. Market cap is measured by multiplying token price with the circulating supply of {detail?.symbol} tokens.
        </span>
      </Panel>
    </Collapse>
  </>

  const columns = [
    {
      title: '#',
      align: 'right',
      render: (text, record, index) => <span>{index + 1}</span>
    },
    {
      title: 'Holding',
      align: 'right',
      render: (_, record, index) => <span>{record?.share}&nbsp;%</span>
    },
    {
      title: 'Address',
      align: 'right',
      render: (_, record) => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', width: '100%' }}>
        <CopyOutlined
          onClick={(e) =>
            copyAddress(e, record?.address, 'Copy address successfully')
          }
        />
          &nbsp;
        {`${record?.address?.slice(0, 4)}...${record?.address?.slice(record?.address?.length - 5, record?.address?.length - 1)}`}
      </div>
    }
  ]

  const holders = <>
    {
      rest?.loadingDetail
        ? <ProductDetailInfo/>
        : (topHolder !== null && !_.isEmpty(topHolder)) && <>
          <div className='card-header border-0 pb-0'>
            <h2 className='heading text-primary'>{`Top ${topHolder?.length} ${detail?.name}'s holder`}</h2>
          </div>
          <div className='card-body pt-3 exchange'>
            <Table
              pagination={
                topHolder?.length > 6
                  ? {
                    pageSize: 6,
                    defaultCurrent: 1,
                    showSizeChanger: false
                  }
                  : false
              }
              columns={columns}
              dataSource={topHolder}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </>
    }
  </>
  // { /* END DEMO: TEST NEW GUI FOR SEO */ }

  return <DetailLayout
    Header={header}
    type={CRYPTO}
    summary={summary}
    about={about}
    exchange={exchange}
    topDiscus={<TopDiscussed borderRadius={'0'} marginBottom={'1rem'}/>}
    portfolioOrChartOrDesc={priceChart}
    setTop={setTop}
    rest={rest}
    similar={ <ProductSimilar productType={CRYPTO} similarList={productInfo?.similars} /> }
    productInfo={productInfo}
    cryptoPriceLiveData={cryptoPriceLiveData}
    collap1={collap1}
    FAQs={FAQs}
    // { /* START DEMO: TEST NEW GUI FOR SEO */ }
    holders={(topHolder !== null && !_.isEmpty(topHolder)) ? holders : undefined}
    // { /* END DEMO: TEST NEW GUI FOR SEO */ }
  />
}
export default CryptoInfo
