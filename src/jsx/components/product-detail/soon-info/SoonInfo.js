import React, { useState } from 'react'
import './SoonInfo.scss'
import { DetailLayout } from '../detail-layout'
import { formatLargeNumberMoneyUSD, formatLargeNumber } from '../../../../utils/formatNumber'
import Description from '../description/Description'
import _ from 'lodash'
import { SOON } from '../../../constants/category'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import InformationHeader from '../../common-widgets/page-detail/InformationHeader'
import { txtGoal } from '../../../constants/page-soon'
import { getStatusFromStartDateAndEndDate } from '../../../../utils/page-soon/status'
import TimeRelativeQuantificationDetail from '../../common-widgets/page-soon/TimeRelativeQuantificationDetail'
import TableRoundSale from '../../common-widgets/page-soon/TableRoundSale'
// import { InfoTagDetail } from '../../common-widgets/page-soon/InfoTagDetail'
import { InfoWebsiteDetail } from '../../common-widgets/page-soon/InfoWebsiteDetail'
import { InfoLaunchpadDetail } from '../../common-widgets/page-soon/InfoLaunchpadDetail'
import { InfoShortDetail } from './../../common-widgets/page-soon/InfoShortDetail'
import { bgYellow, iconGoal, iconPayments, iconSold, iconSupply, SummaryDetail } from '../../common-widgets/page-detail/SummaryDetail'
import { ButtonReportScam } from '../../common-widgets/page-detail/ButtonReportScam'
import ButtonAddReview from '../../common-widgets/page-detail/ButtonAddReview'
import { ProgressBarGoal } from '../../common-widgets/page-soon/ProgressBarGoal'
import { CountDown } from '../../common-widgets/page-soon/CountDown'
import TimeText, { typeEnd, typeStart } from './../../common-widgets/page-soon/TimeText'
import { ScreenShot } from './../../common-widgets/page-soon/ScreenShot'
import ShareButton from '../../common-widgets/page-detail/ShareButton'
import { WebsiteButton } from '../../common-widgets/page-detail/WebsiteButton'
import ProductImage, { altSoon, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'
import { ProductNameSubName } from '../../common-widgets/page-detail/ProductNameSubName'
import { SoonStatusLocation } from './../../common-widgets/page-soon/SoonStatusLocation'
// import { ProductSimilar } from '../../common-widgets/page-detail/ProductSimilar'
import share from '../../../../images/svg/share.svg'
import { Modal, Collapse } from 'antd'
import { Button } from 'react-bootstrap'
import hands from '../../../../images/svg/hands.svg'
import ProductDetailHeader from '../../skeleton/product-detail-skeleton/ProductDetailHeader'
import ProductDetailInfo from '../../skeleton/product-detail-skeleton/ProductDetailInfo'
import ProductDetailSummary from '../../skeleton/product-detail-skeleton/ProductDetailSummary'
import { formatPriceNumber } from '../../charts/coinchart/CoinChart'
import { formatMoney } from '../../../../utils/formatNumber'
import { formatChartDate } from '../../insight/charts/BarChart'
import { formatDateStyle } from '../../../../utils/time/time'
import { timeAgoConvert } from '../../common-widgets/home/click-function'
import { getFinalScore } from '../../score/scoreComponent'
import { domainGear5, emailContactText } from '../../referral-code/ReferralCodeNotification'

const { Panel } = Collapse

const SoonInfo = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const itemDetail = productInfo?.details
  // const itemTags = productInfo?.mores?.tag
  const itemRoundSales = productInfo?.mores?.roundSale
  const itemProgressGoal = (
    (itemDetail?.rasiedmoney || itemDetail?.rasiedmoney === 0) &&
    (itemDetail?.fundRaisingGoals || itemDetail?.fundRaisingGoals === 0))
    ? (itemDetail?.rasiedmoney >= itemDetail?.fundRaisingGoals)
      ? 100
      : (itemDetail?.rasiedmoney / itemDetail?.fundRaisingGoals * 100)
    : null
  const [top, setTop] = useState()
  const itemStatus = getStatusFromStartDateAndEndDate(itemDetail?.startDate, itemDetail?.endDate)
  const [openModalShare, setOpenModalShare] = useState(false)
  let countSummaryDataExist = 0
  if (itemDetail?.rasiedmoney || itemDetail?.rasiedmoney === 0) {
    countSummaryDataExist += 1
  }
  if (itemDetail?.tokenPrice || itemDetail?.tokenPrice === 0) {
    countSummaryDataExist += 1
  }
  if (itemDetail?.totalSupply || itemDetail?.totalSupply === 0) {
    countSummaryDataExist += 1
  }
  if (itemDetail?.fundRaisingGoals || itemDetail?.fundRaisingGoals === 0) {
    countSummaryDataExist += 1
  }
  // estimate display data in 12 col of bostrap
  countSummaryDataExist = (countSummaryDataExist === 0) ? 12 : (12 / countSummaryDataExist)

  // Click button report scam
  const handleReportScam = () => {
    rest?.setData({
      ...rest.data,
      isScam: true
    // star: 1
    })
    rest?.form?.setFieldsValue({
      'isScam': true,
      'star': 1
    })
    window.scrollTo(0, top)
  }

  // Click button add review
  const handleAddReview = () =>{
    rest?.setData({ ...rest.data, isScam: false })
    rest?.form.setFieldsValue({
      isScam: false,
      star: undefined,
      sources: []
    })
    window.scrollTo(0, top)
  }

  const header = <>
    {rest?.loadingDetail ? (<ProductDetailHeader/>) : (<>
      {itemDetail ? (
        <div className='profile-info'>
          <div className='profile-details'>
            <ProductImage
              imageUrl={itemDetail?.bigLogo || itemDetail?.nativeLogo || itemDetail?.smallLogo || itemDetail?.thumbLogo }
              productName={itemDetail?.projectSymbol || itemDetail?.projectName}
              altImageType={altSoon}
              size={sizeImg48}
            />
            <ProductNameSubName projectName={itemDetail?.projectName} projectSubName={itemDetail?.projectSymbol} isSoonProject={true}/>
            <SoonStatusLocation status={itemStatus} detail={itemDetail}/>

            <div className='detail-button ms-auto'>
              <Button onClick={() => setOpenModalShare(true)}>
                <img src={share} alt='share button'/>
                Share
              </Button>
              <WebsiteButton website={itemDetail?.website} />
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
            <ShareButton name={itemDetail?.projectName} setOpenModalShare={setOpenModalShare}/>
          </Modal>
        </div>
      ) : ''}
    </>)}
  </>

  const timeAndPercentProcess = (itemDetail?.startDate && itemDetail?.endDate)
    ? <div className='row mb-3 d-flex'>
      <TimeText icon={typeStart} date={itemDetail?.startDate}/>
      <TimeText icon={typeEnd} date={itemDetail?.endDate}/>
      <CountDown
        soonId={itemDetail?.projectId}
        progressGoal={itemProgressGoal}
        projectStatus={itemStatus}
        startDate={itemDetail?.startDate}
        endDate={itemDetail?.endDate}
      />
    </div>
    : ''

  const onBuyClicked = (website) => {
    website && window.open(website, '_blank')
  }

  const summary = (
    <>
      {rest?.loadingDetail ? (<ProductDetailSummary/>) : (
        <div className='text-center'>
          <div className='row mb-3 mx-1'>
            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
              {itemDetail?.linkDetail
                ? <div className='fs-18 mb-2'>Buy&nbsp;<span onClick={() => onBuyClicked(itemDetail?.linkDetail)} className='text-primary txt-link'><b>here</b></span>&nbsp;now</div>
                : ''
              }
            </div>

            {itemProgressGoal
              ? <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
                <ProgressBarGoal progressGoal={itemProgressGoal}/>
                <hr className='hr-custome'></hr>
              </div>
              : ''
            }

            { (itemDetail?.startDate && itemDetail?.endDate)
              ? <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                <TimeRelativeQuantificationDetail startDate={itemDetail?.startDate} endDate={itemDetail?.endDate}/>
              </div>
              : ''
            }

          </div>
          <div className='row'>
            {
              itemDetail?.rasiedmoney || itemDetail?.rasiedmoney === 0
                ? <div className={`col-${countSummaryDataExist} col-sm-${countSummaryDataExist} col-md-${countSummaryDataExist} col-lg-${countSummaryDataExist} col-xl-${countSummaryDataExist}`}>
                  <SummaryDetail number={formatLargeNumberMoneyUSD(itemDetail?.rasiedmoney)} icon={iconSold} text={'Sold'} backgroundColor={bgYellow} />
                </div>
                : ''
            }

            {
              itemDetail?.tokenPrice || itemDetail?.tokenPrice === 0
                ? <div className={`col-${countSummaryDataExist} col-sm-${countSummaryDataExist} col-md-${countSummaryDataExist} col-lg-${countSummaryDataExist} col-xl-${countSummaryDataExist}`}>
                  <SummaryDetail number={formatLargeNumberMoneyUSD(itemDetail?.tokenPrice)} icon={iconPayments} text={'Price'} backgroundColor={bgYellow}/>
                </div>
                : ''
            }

            {
              itemDetail?.totalSupply || itemDetail?.totalSupply === 0
                ? <div className={`col-${countSummaryDataExist} col-sm-${countSummaryDataExist} col-md-${countSummaryDataExist} col-lg-${countSummaryDataExist} col-xl-${countSummaryDataExist}`}>
                  <SummaryDetail number={formatLargeNumber(itemDetail?.totalSupply)} icon={iconSupply} text={'Supply'} backgroundColor={bgYellow}/>
                </div>
                : ''
            }

            {
              itemDetail?.fundRaisingGoals || itemDetail?.fundRaisingGoals === 0
                ? <div className={`col-${countSummaryDataExist} col-sm-${countSummaryDataExist} col-md-${countSummaryDataExist} col-lg-${countSummaryDataExist} col-xl-${countSummaryDataExist}`}>
                  <SummaryDetail number={formatLargeNumberMoneyUSD(itemDetail?.fundRaisingGoals)} icon={iconGoal} text={txtGoal} backgroundColor={bgYellow}/>
                </div>
                : ''
            }

          </div>
          <div className='mt-4'>
            <ButtonReportScam handleReportScam={handleReportScam} />
            <ButtonAddReview handleAddReview={handleAddReview}/>
          </div>
        </div>
      )}
    </>
  )

  const more = <div>
    {rest?.loadingDetail ? (<ProductDetailInfo/>) : (
      <>
        <InformationHeader projectName={itemDetail?.projectName}/>
        <div className='card-body pt-3'>
          <InfoShortDetail itemDetail={itemDetail} />
          <InfoLaunchpadDetail projectName={itemDetail?.projectName} launchpads={itemDetail?.launchPads}/>
          <InfoWebsiteDetail itemDetail={itemDetail} />
          {/* <InfoTagDetail itemTags={itemTags} /> */}
          <div style={{ fontSize: '1rem' }}>
              If you have any good or bad experience with
            <span className='text-primary'>
              {` ${itemDetail?.projectName}`}
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
          </div>
        </div>
      </>
    )}
  </div>

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
      <Panel header={(<h4>{detail?.projectName} ({detail?.projectSymbol}) price has declined today.</h4>)} key='1' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
      The price of {detail?.projectName} ({detail?.projectSymbol}) is <b className='text-primary'>{formatPriceNumber(detail?.priceUSD)}</b> today with a 24-hour trading volume of <b className='text-primary'>{formatMoney(detail?.totalVolume)}</b>. This represents a <span className={`${detail?.priceChangePercentage24h < 0 ? 'text-danger' : 'text-primary'}`}><b>{Math.abs(detail?.priceChangePercentage24h)?.toFixed(3)}%</b></span> price {detail?.priceChangePercentage24h < 0 ? 'decline' : 'increase'} in the last 24 hours. With a total supply of <b className='text-primary'>{detail?.totalSupply ? formatLargeNumber(detail?.totalSupply) : 0}</b> {detail?.projectSymbol}, {detail?.projectName} is valued at a market cap of <b className='text-primary'>{formatMoney(detail?.marketcapUSD)}</b>
        </span>
      </Panel>
      <Panel header={(<h4>What is the daily trading volume of {detail?.projectName} ({detail?.projectSymbol})?</h4>)} key='3' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
      The trading volume of {detail?.projectName} ({detail?.projectSymbol}) is <b className='text-primary'>{formatLargeNumber(detail?.totalVolume) }</b> in the last 24 hours.
        </span>
      </Panel>
      <Panel header={(<h4>What is the all-time high for {detail?.projectName} ({detail?.projectSymbol})?</h4>)} key='4' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
      The highest price paid for {detail?.projectName} ({detail?.projectSymbol}) is <b className='text-primary'>{formatPriceNumber(detail?.ath)}</b>, which was recorded on <span className='text-primary'>{formatChartDate(detail?.athDate, formatDateStyle)}</span> (<span className='text-primary'>{timeAgoConvert(detail?.athDate)}</span>). Comparatively, the current price is <b className='text-danger'>-{ (detail?.priceUSD / detail?.ath * 100)?.toFixed(2) }%</b> lower than the all-time high price.
        </span>
      </Panel>
      <Panel header={(<h4>What is the all-time low for {detail?.projectName} ({detail?.projectSymbol})?</h4>)} key='5' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
      The lowest price paid for {detail?.projectName} ({detail?.projectSymbol}) is <b className='text-danger'>{formatPriceNumber(detail?.atl)}</b>, which was recorded on <span className='text-primary'>{formatChartDate(detail?.atlDate, formatDateStyle)}</span> (<span className='text-primary'>{timeAgoConvert(detail?.atlDate)}</span>). Comparatively, the current price is <b className='text-primary'>{ (detail?.priceUSD / detail?.atl * 100)?.toFixed(2) }%</b> higher than the all-time low price.
        </span>
      </Panel>
      <Panel header={(<h4>What is the market cap of {detail?.projectName} ({detail?.projectSymbol})?</h4>)} key='6' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
      Market capitalization of {detail?.projectName} ({detail?.projectSymbol}) is <b className='text-primary'>{formatMoney(detail?.marketcapUSD) }</b>. Market cap is measured by multiplying token price with the circulating supply of {detail?.projectSymbol} tokens.
        </span>
      </Panel>
    </Collapse>
  </>

  const contentCryptoScoreDescription = <>
    {detail?.projectSymbol} scored <b className='text-primary'>{getFinalScore(detail?.score, SOON)}</b>/10 on the <b><a href={domainGear5} className='text-primary txt-link' target='_blank' rel='noreferrer'>Gear5.io</a></b>,  which we based on parameters such as liquidity on Dex exchanges, contract information such as whether there is a proxy or not, whether the contract is verified or not, which CEX and DEX exchanges it is traded on, trading volume, website information, number of holders, and transfers of COINS/TOKENS. If you have any questions about the score we provided, please contact {emailContactText}.
    <br />
    <br />
In addition, we also provide user alerts for suspicious COINS/TOKENS based on simulated trading methods on DEX exchanges and checking their contract. The number of Spam reports also has a significant impact on our alert system.
  </>

  const cryptoDefinitionContent = <>
You can join the {detail?.projectName} communities at { Object.keys(detail?.community)?.map(
      (websiteName) => detail?.community[websiteName] && <>
        <a className='text-primary txt-link' target='_blank' href={detail?.community[websiteName]} rel='noreferrer'>{websiteName}</a>,&nbsp;
      </>) }
    ... The {detail?.projectName} team has released the source code here: { Object.keys(detail?.sourceCode)?.map(
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
          About Bitcoin
        </h2>
      </div>
    </div>
    <Collapse bordered={false}>
      <Panel header={<h4>{`${detail?.projectName}'s Score`}</h4>} key='1' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          {(contentCryptoScoreDescription)}
        </span>
      </Panel>
      <Panel header={(<h4>{`What is ${detail?.projectName}(${detail?.projectSymbol})'s community?`}</h4>)} key='2' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          {(cryptoDefinitionContent) }
        </span>
      </Panel>
    </Collapse>
  </>
  return (
    <DetailLayout
      Header={header}
      roundSale={(itemRoundSales && !_.isEmpty(itemRoundSales))
        ? <TableRoundSale projectName={itemDetail?.projectName} roundSales={itemRoundSales} />
        : ''
      }
      timeAndPercentProcess={timeAndPercentProcess}
      summary={summary}
      more={more}
      type={SOON}
      portfolioOrChartOrDesc={<Description
        projectName={`What Is ${detail?.projectName}(${detail?.projectSymbol}) ?`}
        text={itemDetail?.fullDesc || itemDetail?.shortDesc}
      />}
      about={<ScreenShot screenshots={itemDetail?.media} />}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
      // similar={<ProductSimilar productType={SOON} similarList={productInfo?.similars} />}
      productInfo={productInfo}
      collap1={collap1}
      FAQs={FAQs}
    />
  )
}
export default SoonInfo
