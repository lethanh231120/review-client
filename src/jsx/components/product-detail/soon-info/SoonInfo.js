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
import { InfoTagDetail } from '../../common-widgets/page-soon/InfoTagDetail'
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
import ProductImage, { altSoon } from '../../common-widgets/page-detail/ProductImage'
import { ProductNameSubName } from '../../common-widgets/page-detail/ProductNameSubName'
import { SoonStatusLocation } from './../../common-widgets/page-soon/SoonStatusLocation'
import { ProductSimilar } from '../../common-widgets/page-detail/ProductSimilar'
import share from '../../../../images/svg/share.svg'
import { Modal } from 'antd'
import { Button } from 'react-bootstrap'
import hands from '../../../../images/svg/hands.svg'
import ProductDetailHeader from '../../skeleton/product-detail-skeleton/ProductDetailHeader'
import ProductDetailInfo from '../../skeleton/product-detail-skeleton/ProductDetailInfo'
import ProductDetailSummary from '../../skeleton/product-detail-skeleton/ProductDetailSummary'

const SoonInfo = ({ productInfo, ...rest }) => {
  const itemDetail = productInfo?.details
  const itemTags = productInfo?.mores?.tag
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
            <ProductImage productId={itemDetail?.projectId} productName={itemDetail?.projectName} altImageType={altSoon} />
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
            onCancel={() => setOpenModalShare(false)}
            onOk={() => setOpenModalShare(false)}
            footer={null}
          >
            <ShareButton name={itemDetail?.name} setOpenModalShare={setOpenModalShare}/>
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
          <InfoTagDetail itemTags={itemTags} />
          <p>
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
          </p>
        </div>
      </>
    )}
  </div>

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
        projectName={itemDetail?.projectName}
        text={itemDetail?.fullDesc || itemDetail?.shortDesc}
      />}
      about={<ScreenShot screenshots={itemDetail?.media} />}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
      similar={<ProductSimilar productType={SOON} similarList={productInfo?.similars} />}
      productInfo={productInfo}
    />
  )
}
export default SoonInfo
