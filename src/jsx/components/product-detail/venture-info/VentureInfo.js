import { Avatar, Table, Modal, Collapse } from 'antd'
import React, { useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { DetailLayout } from '../detail-layout'
import { renderNumber } from '../../../../utils/formatNumber'
import _ from 'lodash'
import Description from '../description/Description'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import MyScoreComponent, { getFinalScore } from '../../score/scoreComponent'
import './ventureInfo.scss'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
// import { WARNING_ICON } from '../../common-widgets/logo/logo'
import ScamWarningDetail from '../scam-warning/ScamWarningDetail'
import { VENTURE } from '../../../constants/category'
import ShareButton from '../../common-widgets/page-detail/ShareButton'
import { WebsiteButton } from '../../common-widgets/page-detail/WebsiteButton'
import { ProductSimilar } from '../../common-widgets/page-detail/ProductSimilar'
// import InformationHeader from '../../common-widgets/page-detail/InformationHeader'
import share from '../../../../images/svg/share.svg'
import hands from '../../../../images/svg/hands.svg'
import ProductDetailHeader from '../../skeleton/product-detail-skeleton/ProductDetailHeader'
import ProductDetailInfo from '../../skeleton/product-detail-skeleton/ProductDetailInfo'
import ProductDetailSummary from '../../skeleton/product-detail-skeleton/ProductDetailSummary'
import InformationSubTitle, { typeExplorer, typeShort } from '../../common-widgets/page-detail/InformationSubTitle'
import ShortItem from '../../common-widgets/page-detail/ShortItem'
import ProductImage, { altVenture, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'
import SocialList from '../../common-widgets/page-detail/SocialList'
import { bgRed, SummaryDetail, bgGreen } from '../../common-widgets/page-detail/SummaryDetail'
import { domainGear5, emailContactText } from '../../referral-code/ReferralCodeNotification'

const { Panel } = Collapse

export const calculateTotalFund = (fund) =>{
  let total = 0
  fund && fund?.forEach(item => {
    total += item?.fundAmount
  })

  return total
}

const VentureInfo = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const navigate = useNavigate()
  const [top, setTop] = useState()
  const [openModalShare, setOpenModalShare] = useState(false)

  // const handleReportScam = () => {
  //   rest?.setData({
  //     ...rest.data,
  //     isScam: true
  //     // star: 1
  //   })
  //   rest?.form?.setFieldsValue({
  //     'isScam': true,
  //     'star': 1
  //   })
  //   window.scrollTo(0, top)
  // }

  // VENTURE HEADER
  const header = (
    <>
      {rest?.loadingDetail ? (
        <ProductDetailHeader/>
      ) : (
        <div className='profile-info'>
          <div className='profile-details'>
            <div className='profile-photo'>
              <ProductImage
                imageUrl={detail?.ventureLogo}
                productName={detail?.ventureName}
                altImageType={altVenture}
                size={sizeImg48}
              />
            </div>
            <div className='profile-name cus-profile-name'>
              <h1 className='text-primary mb-2 cus-h4 fs-22'>{detail?.ventureName}
              </h1>
              {
                detail?.subCategory
                  ? <h2 className='mb-0' style={{ lineHeight: '0' }}>
                    <Badge className='badge-sm' >{detail?.subCategory}</Badge>
                  </h2>
                  : ''
              }
            </div>
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
            <ShareButton name={detail?.ventureName} setOpenModalShare={setOpenModalShare}/>
          </Modal>
        </div>
      )}
    </>
  )

  // VENTURE SUMMARY
  const summary = <>
    {rest?.loadingDetail ? (<ProductDetailSummary/>) : (
      <div style={{ padding: '1rem 0' }}>
        <div>
          <div style={{ textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='summary-item display-1200'>
              <SummaryDetail number={new Intl.NumberFormat().format(detail?.totalReviews)} text={'Reviews'} backgroundColor={bgGreen} />
            </div>
            <div className='summary-item'>
              <SummaryDetail number={new Intl.NumberFormat().format(detail?.totalIsScam)} text={'Reported Scam'} backgroundColor={bgRed} />
            </div>
            <div className='summary-item'>
              <div className='mb-0 mt-3'>
                <MyScoreComponent score={detail?.score} type={VENTURE} />
              </div>
              <div>Score</div>
            </div>
          </div>
          <div style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '500', padding: '1rem 0' }}>
              Click
            <span className='summary-link' onClick={() => rest?.handleClickFilter()}>Here</span> to view a list of projects based on your preferences
          </div>
        </div>

        <>
          {detail?.isScam ? (
            <ScamWarningDetail
              isShow={true}
              scamWarningReason={detail?.proof?.isScam}
              proofType='error'
            />
          ) : detail?.isWarning ? (
            <ScamWarningDetail
              isShow={true}
              scamWarningReason={detail?.proof?.isWarning}
              proofType='warning'
            />
          ) : (
            ''
          )}
        </>

        <div className='profile-blog '>
          <div className='community-list'>
            {
              detail?.location || !_.isEmpty(productInfo?.mores?.fund) || detail?.yearFounded
                ? <InformationSubTitle type={typeShort}/>
                : ''
            }

            {
              detail?.location
                ? <div className='mb-3 col-12' >
                  <ShortItem
                    title={<>
                      <h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.ventureName}&apos;s location</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{detail?.location}</b>
                      </span>
                    </>}
                  />
                </div>
                : ''
            }

            {
              !_.isEmpty(productInfo?.mores?.fund)
                ? <div className='mb-3 col-12' >
                  <ShortItem
                    title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                      {detail?.ventureName}&apos;s total funds</h3>:&nbsp;
                    <span className='text-primary'>
                      <b>{renderNumber(calculateTotalFund(productInfo?.mores?.fund))}</b>
                    </span>
                    </>}
                  />
                </div>
                : ''
            }

            {
              detail?.yearFounded
                ? <div className='mb-3 col-12' >
                  <ShortItem
                    title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                      {detail?.ventureName}&apos;s year founded</h3>:&nbsp;
                    <span className='text-primary'>
                      <b>{detail?.yearFounded}</b>
                    </span>
                    </>}
                  />
                </div>
                : ''
            }

            {
              detail?.socials
                ? <>
                  <InformationSubTitle type={typeExplorer}/>
                  <SocialList detailSocials={detail?.socials} />
                </> : ''
            }

            <div style={{ fontSize: '1rem' }}>
              If you have any good or bad experience with
              <span className='text-primary'>
                {` ${detail?.ventureName}`}
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
        </div>
      </div>
    )}
  </>

  // const More = () => {
  //   return <div>
  //     {rest?.loadingDetail ? (<ProductDetailInfo/>) : (
  //       <>
  //         <InformationHeader projectName={detail?.ventureName}/>
  //         <div className='card-body pt-3'>
  //           <div className='profile-blog '>
  //             <div className='community-list'>
  //               {
  //                 detail?.location || !_.isEmpty(productInfo?.mores?.fund) || detail?.yearFounded
  //                   ? <InformationSubTitle type={typeShort}/>
  //                   : ''
  //               }

  //               {
  //                 detail?.location
  //                   ? <div className='mb-3 col-12' >
  //                     <ShortItem
  //                       title={<>
  //                         <h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
  //                           {detail?.ventureName}&apos;s location</h3>:&nbsp;
  //                         <span className='text-primary'>
  //                           <b>{detail?.location}</b>
  //                         </span>
  //                       </>}
  //                     />
  //                   </div>
  //                   : ''
  //               }

  //               {
  //                 !_.isEmpty(productInfo?.mores?.fund)
  //                   ? <div className='mb-3 col-12' >
  //                     <ShortItem
  //                       title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
  //                         {detail?.ventureName}&apos;s total funds</h3>:&nbsp;
  //                       <span className='text-primary'>
  //                         <b>{renderNumber(calculateTotalFund(productInfo?.mores?.fund))}</b>
  //                       </span>
  //                       </>}
  //                     />
  //                   </div>
  //                   : ''
  //               }

  //               {
  //                 detail?.yearFounded
  //                   ? <div className='mb-3 col-12' >
  //                     <ShortItem
  //                       title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
  //                         {detail?.ventureName}&apos;s year founded</h3>:&nbsp;
  //                       <span className='text-primary'>
  //                         <b>{detail?.yearFounded}</b>
  //                       </span>
  //                       </>}
  //                     />
  //                   </div>
  //                   : ''
  //               }

  //               {
  //                 detail?.socials
  //                   ? <>
  //                     <InformationSubTitle type={typeExplorer}/>
  //                     <SocialList detailSocials={detail?.socials} />
  //                   </> : ''
  //               }

  //               <p>
  //             If you have any good or bad experience with
  //                 <span className='text-primary'>
  //                   {` ${detail?.ventureName}`}
  //                 </span>, please share with us in informing everyone
  //                 <img src={hands} alt='icon-hand' style={{ marginLeft: '0.3rem', width: '1.1rem' }}/>
  //                 <img src={hands} alt='icon-hand' style={{ width: '1.1rem' }}/>
  //                 <img src={hands} alt='icon-hand' style={{ marginRight: '0.3rem', width: '1.1rem' }}/>
  //                 <span
  //                   onClick={() => {
  //                     rest?.setData({ ...rest.data, isScam: false })
  //                     rest?.form.setFieldsValue({
  //                       isScam: false,
  //                       star: undefined,
  //                       sources: []
  //                     })
  //                     window.scrollTo(0, top)
  //                   }}
  //                   className='text-primary txt-link'
  //                   style={{ marginLeft: '0.5rem' }}

  //                 >
  //               Review Now
  //                 </span>
  //               </p>
  //             </div>
  //           </div>
  //         </div>

  //       </>
  //     )}
  //   </div>
  // }

  const about = <>
    {rest?.loadingDetail ? (<ProductDetailInfo/>) : (
      <Description
        projectName={`About ${detail?.ventureName}`}
        text={detail?.description}
      />
    )}
  </>

  const handleonRowClicked = (projectId) => {
    if (projectId) {
      const type = projectId.split('_')[1]
      const name = projectId.split('_')[2]

      if (type === 'coin') {
        navigate(`../../../products/crypto/${type}/${name}`)
      } else if (type === 'token') {
        const address = projectId.split('_')[3]
        navigate(`../../../products/crypto/${type}/${name}/${address}`)
      }
    }
  }

  const PortfolioTable = () => {
    const portfolioColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: (_, record) => (<span><Avatar src={record?.projectLogo}/> {record?.projectName}</span>)
      },
      {
        title: 'Round',
        dataIndex: 'fundingRound',
        render: (_, record) => (<span>{record?.fundStageName}</span>)
      }, {
        title: 'Amount',
        dataIndex: 'fundAmount',
        render: (_, record) => <span>{renderNumber(record?.fundAmount)}</span>
      }, {
        title: 'Date',
        dataIndex: 'fundDate',
        render: (_, record) => <span>{moment(record?.fundDate)?.format('DD-MM-YYYY')}</span>
      },
      {
        title: 'Announcement',
        dataIndex: 'announcement',
        render: (_, record) => <a className='announcement-link' rel='noopener noreferrer' onClick={(e) =>{
          e.stopPropagation()
          window.open(record?.announcementUrl)
        }}><i className='fas fa-link me-1'></i>Link</a>
      }
    ]

    const list = productInfo?.mores?.fund
    // const [currentPage, setCurrentPage] = useState(2)

    // console.log(currentPage)

    return <>
      <div>
        <div className='card-header border-0 pb-0'>
          <h2 className='heading text-primary'>{detail?.ventureName} Portfolio</h2>
        </div>
        <div className='card-body pt-3'>
          <div className='profile-blog portfolio-table table-responsive'>
            <Table
              pagination={{ pageSize: 10,
                showSizeChanger: false,
                current: rest?.currentPage,
                onChange: (page) => rest?.setPage(page),
                style: { display: 'flex', justifyContent: 'center' }

              }}
              rowKey={(record) => {
                return `${record?.projectId || record?.projectCode}_${record?.fundStageCode}`
              }
              }
              columns={portfolioColumns}
              dataSource={list}
              onRow={(record) => ({
                onClick: () => {
                  handleonRowClicked(record?.projectId)
                }
              })}
            />
          </div>
        </div>
      </div>
    </>
  }

  // scam
  // const scam = (
  //   <>
  //     {detail?.isScam ? (
  //       <ScamWarningDetail
  //         isShow={true}
  //         scamWarningReason={detail?.proof?.isScam}
  //         proofType='error'
  //       />
  //     ) : detail?.isWarning ? (
  //       <ScamWarningDetail
  //         isShow={true}
  //         scamWarningReason={detail?.proof?.isWarning}
  //         proofType='warning'
  //       />
  //     ) : (
  //       ''
  //     )}
  //   </>
  // )

  const contentCryptoScoreDescription = <>
    {detail?.ventureName} scored <b className='text-primary'>{getFinalScore(detail?.score, VENTURE)}</b>/10 on the <b><a href={domainGear5} className='text-primary txt-link' target='_blank' rel='noreferrer'>Gear5.io</a></b>,  which we based on parameters such as liquidity on Dex exchanges, contract information such as whether there is a proxy or not, whether the contract is verified or not, which CEX and DEX exchanges it is traded on, trading volume, website information, number of holders, and transfers of COINS/TOKENS. If you have any questions about the score we provided, please contact {emailContactText}.
    <br />
    <br />
In addition, we also provide user alerts for suspicious COINS/TOKENS based on simulated trading methods on DEX exchanges and checking their contract. The number of Spam reports also has a significant impact on our alert system.
  </>

  const cryptoDefinitionContent = <>
You can join the {detail?.ventureName} communities at { Object.keys(detail?.community)?.map(
      (websiteName) => detail?.community[websiteName] && <>
        <a className='text-primary txt-link' target='_blank' href={detail?.community[websiteName]} rel='noreferrer'>{websiteName}</a>,&nbsp;
      </>) }
    ... The {detail?.ventureName} team has released the source code here: { Object.keys(detail?.sourceCode)?.map(
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
          {`About ${detail?.ventureName}`}
        </h2>
      </div>
    </div>
    <Collapse bordered={false}>
      <Panel header={<h4>{`${detail?.ventureName}'s Score`}</h4>} key='1' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          {(contentCryptoScoreDescription)}
        </span>
      </Panel>
      <Panel header={(<h4>{`What is ${detail?.ventureName}'s community?`}</h4>)} key='2' className='panel'>
        <span className='cus-text-justify' style={{ display: 'inline', fontSize: '1.2rem', lineHeight: '2', fontWeight: '500', color: 'rgba(0, 0, 0, 0.6)' }}>
          {(cryptoDefinitionContent) }
        </span>
      </Panel>
    </Collapse>
  </>

  return (
    <DetailLayout
      type={'venture'}
      Header={header}
      summary={summary}
      // more={<More />}
      about={about}
      portfolioOrChartOrDesc={<PortfolioTable />}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
      // scam={scam}
      collap1={collap1}
      similar={<ProductSimilar productType={VENTURE} similarList={productInfo?.similars} />}
      productInfo={productInfo}
    />
  )
}

export default VentureInfo
