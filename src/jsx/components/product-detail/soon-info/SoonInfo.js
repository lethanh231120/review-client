import React, { useState } from 'react'
import './SoonInfo.scss'
import { DetailLayout } from '../detail-layout'
import { Button, Dropdown } from 'react-bootstrap'
import { formatLargeNumberMoneyUSD, formatLargeNumber } from '../../../../utils/formatNumber'
import Description from '../description/Description'
import { LoadingOutlined } from '@ant-design/icons'
import { websiteIcon } from '../../common-widgets/icons'
import _ from 'lodash'
import { SOON } from '../../../constants/category'
import { Spin, Image } from 'antd'
import { formatImgUrlFromProductId, isValidProductId } from '../../../../utils/formatText'
import imgAbsentImageSoon from '../../../../images/absent_image_soon.png'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import Similar from '../similar/Similar'
import { FacebookIcon, LinkedinIcon, PinterestIcon, RedditIcon, TelegramIcon, TwitterIcon } from 'react-share'
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, LinkedinShareButton, PinterestShareButton, RedditShareButton } from 'react-share'
import InformationHeader from '../../common-widgets/page-detail/InformationHeader'
import { txtGoal } from '../../../constants/page-soon'
import { txtAbsentTakeUpData } from '../../../constants/data'
import { getStatusBackgroundFromSoonStatus, getStatusFromStartDateAndEndDate } from '../../../../utils/page-soon/status'
import TimeRelativeQuantificationDetail from '../../common-widgets/page-soon/TimeRelativeQuantificationDetail'
import TableRoundSale from '../../common-widgets/page-soon/TableRoundSale'
import { InfoTagDetail } from '../../common-widgets/page-soon/InfoTagDetail'
import { InfoWebsiteDetail } from '../../common-widgets/page-soon/InfoWebsiteDetail'
import { InfoLaunchpadDetail } from '../../common-widgets/page-soon/InfoLaunchpadDetail'
import { InfoShortDetail } from './../../common-widgets/page-soon/InfoShortDetail'
import { iconPayments, iconSold, iconSupply, SummaryDetail } from '../../common-widgets/page-detail/SummaryDetail'
import { ButtonReportScam } from '../../common-widgets/page-detail/ButtonReportScam'
import ButtonAddReview from '../../common-widgets/page-detail/ButtonAddReview'
import { ProgressBarGoal } from '../../common-widgets/page-soon/ProgressBarGoal'
import { CountDown } from '../../common-widgets/page-soon/CountDown'
import TimeText, { typeEnd, typeStart } from './../../common-widgets/page-soon/TimeText'
import { ScreenShot } from './../../common-widgets/page-soon/ScreenShot'

const SoonInfo = ({ productInfo, ...rest }) => {
  const itemDetail = productInfo?.details
  const itemTags = productInfo?.mores?.tag
  const itemRoundSales = productInfo?.mores?.roundSale
  const itemProgressGoal = 20 // sold / goal * 100
  const [websiteLoading, setWebsiteLoading] = useState(false)
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
        <div className='profile-photo'>
          {itemDetail?.projectId ? (
            <Image alt='IDO/ICO/IEO Logo' src={isValidProductId(itemDetail?.projectId) ? formatImgUrlFromProductId(itemDetail?.projectId) : imgAbsentImageSoon} preview={false}/>
          )
            : (<span className='image-list-no-data-detail'>
              {itemDetail?.projectName?.slice(0, 3)}
            </span>
            )}
        </div>
        <div className='profile-name cus-soon-name px-2 pt-2'>
          <h4 className='text-primary mb-0'>{itemDetail?.projectName}</h4>
          <p style={{ paddingTop: '0.1rem' }} >
            {itemDetail?.projectSymbol}
          </p>
        </div>
        <div className='profile-email px-2 pt-2'>
          <p className='text-muted mb-0'>
            {
              itemDetail?.startDate && itemDetail?.endDate ? <span className={`badge badge-rounded ${getStatusBackgroundFromSoonStatus(itemStatus)}`}>
                {itemStatus?.toUpperCase()}
              </span> : txtAbsentTakeUpData
            }
          </p>
          {itemDetail?.countryOrigin &&
            <p style={{ display: 'flex' }}>
              <i className='material-icons text-primary' style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center' }}>location_on</i>
              {itemDetail?.countryOrigin}
            </p>
          }

        </div>
        <div className='detail-button ms-auto'>
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
          {
            itemDetail?.website && <Button
              className='btn btn-primary ms-auto'
              onClick={() => {
                setWebsiteLoading(true)
                setTimeout(() =>{
                  itemDetail?.website && window.open(itemDetail?.website)
                  setWebsiteLoading(false)
                }, 3000)
              }}
            >
              {websiteLoading ? <Spin indicator={<LoadingOutlined spin />} size='small' style={{ color: 'white', marginRight: '0.3rem' }} /> : ''}
              {websiteIcon}Website
            </Button>
          }
        </div>
      </div>
    </div>
  ) : ''

  const roundSale = (itemRoundSales && !_.isEmpty(itemRoundSales)) && <TableRoundSale projectName={itemDetail?.projectName} roundSales={itemRoundSales} />

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
          <SummaryDetail number={formatLargeNumberMoneyUSD(itemDetail?.fundRaisingGoals / 5)} icon={iconSold} text={'Sold'} />
        </div>
        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <SummaryDetail number={formatLargeNumberMoneyUSD(itemDetail?.tokenPrice)} icon={iconPayments} text={'Price'} />
        </div>
        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <SummaryDetail number={formatLargeNumber(itemDetail?.totalSupply)} icon={iconSupply} text={'Supply'} />
        </div>
        <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>
          <SummaryDetail number={formatLargeNumberMoneyUSD(itemDetail?.fundRaisingGoals)} icon={iconSupply} text={txtGoal} />
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

  const similar = <>
    {!_.isEmpty(productInfo?.similars) && (
      <>
        <div className='card-header border-0 pb-0 cus-card-header'>
          <h5 className='heading text-primary cus-heading'>Similar</h5>
        </div>
        <div className='card-body pt-3'>
          <div className='profile-interest '>
            <Similar type={SOON} listProjectId={productInfo?.similars}/>
          </div>
        </div>
      </>
    )}
  </>

  return (
    <DetailLayout
      Header={header}
      roundSale={roundSale}
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
      similar={similar}
    />
  )
}
export default SoonInfo
