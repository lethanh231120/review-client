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
import { txtAbsentTakeUpData } from '../../../constants/data'
import { getStatusFromStartDateAndEndDate } from '../../../../utils/page-soon/status'
import TimeRelativeQuantificationDetail from '../../common-widgets/page-soon/TimeRelativeQuantificationDetail'
import TableRoundSale from '../../common-widgets/page-soon/TableRoundSale'
import { InfoTagDetail } from '../../common-widgets/page-soon/InfoTagDetail'
import { InfoWebsiteDetail } from '../../common-widgets/page-soon/InfoWebsiteDetail'
import { InfoLaunchpadDetail } from '../../common-widgets/page-soon/InfoLaunchpadDetail'
import { InfoShortDetail } from './../../common-widgets/page-soon/InfoShortDetail'
import { bgYellow, iconPayments, iconSold, iconSupply, SummaryDetail } from '../../common-widgets/page-detail/SummaryDetail'
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

const SoonInfo = ({ productInfo, ...rest }) => {
  const itemDetail = productInfo?.details
  const itemTags = productInfo?.mores?.tag
  const itemRoundSales = productInfo?.mores?.roundSale
  const itemProgressGoal = 20 // sold / goal * 100
  const [top, setTop] = useState()
  const itemStatus = getStatusFromStartDateAndEndDate(itemDetail?.startDate, itemDetail?.endDate)

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

  const header = itemDetail ? (
    <div className='profile-info'>
      <div className='profile-details'>
        <ProductImage productId={itemDetail?.projectId} productName={itemDetail?.projectName} altImageType={altSoon} />
        <ProductNameSubName projectName={itemDetail?.projectName} projectSubName={itemDetail?.projectSymbol}/>
        <SoonStatusLocation status={itemStatus} detail={itemDetail}/>
        <div className='detail-button ms-auto'>
          <ShareButton name={itemDetail?.name} />
          <WebsiteButton website={itemDetail?.website} />
        </div>
      </div>
    </div>
  ) : ''

  const timeAndPercentProcess = <div className='row mb-3 d-flex'>
    <TimeText icon={typeStart} date={itemDetail?.startDate}/>
    <TimeText icon={typeEnd} date={itemDetail?.endDate}/>
    <CountDown progressGoal={itemProgressGoal} projectStatus={itemStatus} startDate={itemDetail?.startDate} endDate={itemDetail?.endDate} />
  </div>

  const summary = (
    <div className='text-center'>
      <div className='row mb-3 mx-1'>
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
          <ProgressBarGoal progressGoal={itemProgressGoal}/>
        </div>

        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
          <hr className='hr-custome'></hr>
          { (itemDetail?.startDate && itemDetail?.endDate) ? <TimeRelativeQuantificationDetail startDate={itemDetail?.startDate} endDate={itemDetail?.endDate}/> : txtAbsentTakeUpData}
        </div>
      </div>
      <div className='row'>
        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <SummaryDetail number={formatLargeNumberMoneyUSD(itemDetail?.fundRaisingGoals / 5)} icon={iconSold} text={'Sold'} backgroundColor={bgYellow} />
        </div>
        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <SummaryDetail number={formatLargeNumberMoneyUSD(itemDetail?.tokenPrice)} icon={iconPayments} text={'Price'} backgroundColor={bgYellow}/>
        </div>
        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <SummaryDetail number={formatLargeNumber(itemDetail?.totalSupply)} icon={iconSupply} text={'Supply'} backgroundColor={bgYellow}/>
        </div>
        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <SummaryDetail number={formatLargeNumberMoneyUSD(itemDetail?.fundRaisingGoals)} icon={iconSupply} text={txtGoal} backgroundColor={bgYellow}/>
        </div>
      </div>
      <div className='mt-4'>
        <ButtonReportScam handleReportScam={handleReportScam} />
        <ButtonAddReview handleAddReview={handleAddReview}/>
      </div>
    </div>
  )

  const more = <div>
    <InformationHeader projectName={itemDetail?.projectName}/>
    <div className='card-body pt-3'>
      <InfoShortDetail itemDetail={itemDetail} />
      <InfoLaunchpadDetail projectName={itemDetail?.projectName} launchpads={itemDetail?.launchPads}/>
      <InfoWebsiteDetail itemDetail={itemDetail} />
      <InfoTagDetail itemTags={itemTags} />
    </div>
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
      numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
      similar={<ProductSimilar productType={SOON} similarList={productInfo?.similars} />}
    />
  )
}
export default SoonInfo
