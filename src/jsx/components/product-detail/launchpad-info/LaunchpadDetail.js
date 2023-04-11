import { Avatar, Table, Tooltip, Modal, Collapse } from 'antd'
import React, { useContext, useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { DetailLayout } from '../detail-layout'
import Description from '../description/Description'
// import FormReport from '../../Forms/form-report/FormReport'
import { useNavigate } from 'react-router-dom'
import MyScoreComponent, { getFinalScore } from '../../score/scoreComponent'
// import { WARNING_ICON } from '../../common-widgets/logo/logo'
import { formatLargeNumber, formatMoney } from '../../../../utils/formatNumber'
import { ChainListContext } from '../../../../App'
import _ from 'lodash'
import './LaunchpadInfo.scss'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import { formatImgUrlFromProductId, toCammelCase } from '../../../../utils/formatText'
import { LAUNCHPAD } from '../../../constants/category'
import ShareButton from '../../common-widgets/page-detail/ShareButton'
import { WebsiteButton } from '../../common-widgets/page-detail/WebsiteButton'
import { ProductSimilar } from '../../common-widgets/page-detail/ProductSimilar'
// import InformationHeader from '../../common-widgets/page-detail/InformationHeader'
import share from '../../../../images/svg/share.svg'
import hands from '../../../../images/svg/hands.svg'
import ProductDetailHeader from '../../skeleton/product-detail-skeleton/ProductDetailHeader'
import ProductDetailInfo from '../../skeleton/product-detail-skeleton/ProductDetailInfo'
import ProductDetailSummary from '../../skeleton/product-detail-skeleton/ProductDetailSummary'
import InformationSubTitle, { typeBlockchain, typeExplorer, typeShort } from '../../common-widgets/page-detail/InformationSubTitle'
import ShortItem from '../../common-widgets/page-detail/ShortItem'
import ProductImage, { altLaunchpad, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'
import SocialList from '../../common-widgets/page-detail/SocialList'
import { bgRed, SummaryDetail, bgGreen } from '../../common-widgets/page-detail/SummaryDetail'
import { domainGear5, emailContactText } from '../../referral-code/ReferralCodeNotification'

const { Panel } = Collapse

const LaunchpadDetail = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const navigate = useNavigate()
  const chainList = useContext(ChainListContext)
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

  const onItemClicked = (url) =>{
    url && window.open(url)
  }

  // launchpad HEADER
  const header = (
    <>
      {rest?.loadingDetail ? (
        <ProductDetailHeader/>
      ) : (
        <div className='profile-info mb-1'>
          <div className='profile-details'>
            <div className='profile-photo'>
              <ProductImage
                imageUrl={detail?.bigLogo || detail?.smallLogo || detail?.thumbLogo}
                productName={detail?.name}
                altImageType={altLaunchpad}
                size={sizeImg48}
              />
            </div>
            <div className='profile-name cus-profile-name'>
              <h1 className='text-primary mb-2 cus-h4 fs-20'>{detail?.name} {detail?.symbol ? `(${detail?.symbol})` : null}</h1>
              <Badge className='badge-sm' >{detail?.type}</Badge>
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
            <ShareButton name={detail?.name} setOpenModalShare={setOpenModalShare}/>
          </Modal>
        </div>
      )}
    </>
  )

  const More = () => {
    return <div>
      {rest?.loadingDetail ? (<ProductDetailInfo/>) : (
        <>
          {/* <InformationHeader projectName={detail?.name}/> */}
          {/* <div className='card-body pt-3'> */}
          <div className='profile-blog'>
            <div className='community-list'>
              {
                detail?.minTokenToParticipate || detail?.yearFounded
                  ? <InformationSubTitle type={typeShort}/>
                  : ''
              }

              { (detail?.minTokenToParticipate)
                ? <div className='mb-3 col-12' >
                  <ShortItem
                    title={<>
                      <h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                        {detail?.name}&apos;s entry threshold</h3>:&nbsp;
                      <span className='text-primary'>
                        <b>{`${detail?.minTokenToParticipate} ${detail?.symbol}`}</b>
                      </span>
                    </>}
                  />
                </div>
                : ''
              }

              { (detail?.yearFounded)
                ? <div className='mb-3 col-12' >
                  <ShortItem
                    title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>
                      {detail?.name}&apos;s year founded</h3>:&nbsp;
                    <span className='text-primary'>
                      <b>{detail?.yearFounded}</b>
                    </span>
                    </>}
                  />
                </div>
                : ''
              }

              {
                !_.isEmpty(detail?.chains)
                  ? <InformationSubTitle type={typeBlockchain}/>
                  : ''
              }

              {!_.isEmpty(detail?.chains)
                ? <div className='mb-3 col-12' >
                  <ShortItem
                    title={<>
                      <Avatar.Group className='ms-1'
                        alt='Blockchains Logos'
                        maxCount={4}
                        size={20}
                        maxStyle={{
                          color: '#fff',
                          backgroundColor: '#039F7F',
                          cursor: 'pointer'
                        }}
                      >
                        {detail?.chains && Object.keys(detail?.chains).map((keyChainName, index) => (
                          <div key={index}>
                            {keyChainName && (
                              <Tooltip title={toCammelCase(keyChainName)} >
                                <Avatar
                                  alt='Gear5'
                                  size={20}
                                  src={chainList[keyChainName]?.image}
                                  className='crypto-info-exchange'
                                />
                              </Tooltip>
                            )}
                          </div>
                        ))}
                      </Avatar.Group>
                    </>}
                  />
                </div> : ''
              }

              {
                detail?.socials
                  ? <>
                    <InformationSubTitle type={typeExplorer}/>
                    <SocialList detailSocials={detail?.socials} />
                  </> : ''
              }

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
          {/* </div> */}
        </>
      )}
    </div>
  }

  const about = <>
    {rest?.loadingDetail ? (<ProductDetailInfo/>) : (
      <Description
        projectName={`What is ${detail?.name}`}
        text={detail?.description}
      />
    )}
  </>

  const portfolioColumns = [
    {
      title: 'Name',
      render: (_, record) => (<span><Avatar src={formatImgUrlFromProductId(record?.projectId)}/> {record?.projectName}</span>)
    },
    {
      title: 'Blockchains',
      render: (_, record) =>
        <div className='d-flex text-align-center mb-2'>
          <Avatar.Group className='ms-1 '
            alt='Blockchains Logos'
            maxCount={4}
            size={25}
            maxStyle={{
              color: '#fff',
              backgroundColor: '#039F7F',
              cursor: 'pointer'
            }}
          >
            {record?.blockchain && Object.keys(record?.blockchain)?.map((key, index) => (
              <>
                {key && (
                  <Tooltip key={index} title={chainList[key]?.chainName}>
                    <Avatar
                      alt='Blockchain Logo'
                      onClick={() => onItemClicked(chainList[key]?.exploreWebsite)}
                      size={25}
                      src={chainList[key]?.image}
                      key={index}
                      className='crypto-info-exchange'
                    />
                  </Tooltip>
                )}
              </>
            ))}
          </Avatar.Group>
        </div>
      // responsive: ['xxl']
    },
    {
      title: 'Status',
      render: (_, record) => (<Badge className='bg-success badge-sm badge' style={{ textTransform: 'uppercase' }}>{record?.status && record?.status}</Badge>)
    },
    {
      title: 'Supply',
      render: (_, record) => <span>{record?.totalSupply && formatLargeNumber(record?.totalSupply)}</span>
    },
    {
      title: 'Market Cap',
      render: (_, record) => <span>{record?.fullyDilutedMarketcap && formatMoney(record?.fullyDilutedMarketcap)}</span>
    },
    {
      title: 'Goal',
      render: (_, record) => <span>{record?.fundRaisingGoals && formatMoney(record?.fundRaisingGoals)}</span>
    }

  ]

  const handleInvestItemClicked = (projectId) => {
    const splitted = projectId?.split('_')
    const type = splitted[1]

    if (type === 'soon') {
      navigate(`../../../products/${type}/${splitted[2]}`)
    }
  }

  const IDOList = () => {
    return <>
      <div className=' coin-content '>
        {/* <div className='card-header border-0 flex-wrap cus-card-header'>
          <div className='mb-2'>
            <h2 className='heading text-primary'>{detail?.name} Invest Data</h2>
          </div>
        </div> */}
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between flex-wrap'>
            <div className='d-flex align-items-center justify-content-between flex-wrap'>
              {detail?.avgRoiCurrent && <div className='price-content'>
                <span className='fs-18 d-block mb-2'>Current AVG ROI
                </span>
                <div className='fs-20 font-w600' style={{ color: 'black' }}>
                  {detail?.avgRoiCurrent?.toFixed(2)}x
                  {detail?.avgRoiCurrentPercent !== 0 && <span className={detail?.avgRoiCurrentPercent > 0 ? ' text-success' : ' text-danger'} style={{ fontSize: '14px', marginLeft: '5px' }}>{detail?.avgRoiCurrentPercent?.toFixed(2)}%</span>}
                </div>
              </div>}
              {detail?.avgRoiATH && <div className='price-content'>
                <span className='fs-18 d-block mb-2'>ATH AVG ROI
                </span>
                <div className='fs-20 font-w600' style={{ color: 'black' }}>
                  {detail?.avgRoiATH?.toFixed(2)}x
                  {detail?.avgRoiATHPercent !== 0 && <span className={detail?.avgRoiATHPercent > 0 ? ' text-success' : ' text-danger'} style={{ fontSize: '14px', marginLeft: '5px' }}>{detail?.avgRoiATHPercent?.toFixed(2)}%</span>}
                </div>
              </div>}
              {detail?.marketCap && <div className='price-content'>
                <span className='fs-18 d-block mb-2'>Market Cap
                </span>
                <div className='fs-20 font-w600' style={{ color: 'black' }}>
                  {formatMoney(detail?.marketCap)}
                </div>
              </div>}
              {detail?.volume24h && <div className='price-content'>
                <span className='fs-18 d-block mb-2'>Volume 24H
                </span>
                <div className='fs-20 font-w600' style={{ color: 'black' }}>
                  {formatMoney(detail?.volume24h)}
                </div>
              </div>}
            </div>
          </div>
          {
            productInfo?.mores?.soon ? <div className='mt-5 table-responsive'>
              <Table
                className='invest-table'
                columns={portfolioColumns}
                dataSource={productInfo?.mores?.soon}
                onRow={(record) => ({
                  onClick: () => {
                    handleInvestItemClicked(record?.projectId)
                  }
                })}
                rowKey={(record) => record?.projectId}
                pagination={{ pageSize: 10, showSizeChanger: false, hideOnSinglePage: true }}
              />
            </div> : null
          }
        </div>
      </div>
    </>
  }

  // LAUNCHPAD SUMMARY
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
                <MyScoreComponent score={detail?.score} type={LAUNCHPAD} />
              </div>
              <div>Score</div>
            </div>
          </div>
          <div style={{ fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '500', padding: '1rem 0' }}>
              Click
            <a href='' target='_blank' className='summary-link'>Here</a> to view a list of projects based on your preferences
          </div>
        </div>

        <More/>
      </div>
    )}
  </>

  const contentCryptoScoreDescription = <>
    {detail?.symbol} scored <b className='text-primary'>{getFinalScore(detail?.score, LAUNCHPAD)}</b>/10 on the <b><a href={domainGear5} className='text-primary txt-link' target='_blank' rel='noreferrer'>Gear5.io</a></b>,  which we based on parameters such as liquidity on Dex exchanges, contract information such as whether there is a proxy or not, whether the contract is verified or not, which CEX and DEX exchanges it is traded on, trading volume, website information, number of holders, and transfers of COINS/TOKENS. If you have any questions about the score we provided, please contact {emailContactText}.
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

    {/* {!_.isEmpty(detail?.multichain) ? <>... Additionally, {detail?.name} has currently been launched on {detail?.multichain?.length} chains with addresses:</> : ''}
    { contractAddress } */}
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

  return (
    <DetailLayout
      type='launchpad'
      Header={header}
      summary={summary}
      // more={<More />}
      about={about}
      portfolioOrChartOrDesc={<IDOList />}
      rest={rest}
      setTop={setTop}
      topDiscus={<TopDiscussed />}
      collap1={collap1}
      similar={<ProductSimilar productType={LAUNCHPAD} similarList={productInfo?.similars} />}
      productInfo={productInfo}
    />
  )
}

export default LaunchpadDetail
