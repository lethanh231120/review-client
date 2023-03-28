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
import MyScoreComponent from '../../score/scoreComponent'
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
        className=''
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

  const about = <>
    {rest?.loadingDetail ? (
      <ProductDetailInfo/>
    ) : (
      <Description
        projectName={detail?.name}
        text={ detail?.description }
        descriptionTokenMultichain = { detail?.multichain}
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
  />
}
export default CryptoInfo
