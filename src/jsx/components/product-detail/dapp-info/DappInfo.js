import { Avatar, Spin, Tooltip, Image } from 'antd'
import _ from 'lodash'
import React, { useContext, useState } from 'react'
import { Badge, Button, Dropdown } from 'react-bootstrap'
import { ChainListContext } from '../../../../App'
import { formatLargeNumber, formatMoney } from '../../../../utils/formatNumber'
// import FormReport from '../../Forms/form-report/FormReport'
import { DetailLayout } from '../detail-layout'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'
import { LoadingOutlined } from '@ant-design/icons'
import Description from '../description/Description'
import { isValidProductId, formatImgUrlFromProductId, toCammelCase } from '../../../../utils/formatText'
import imgAbsentImageDapp from '../../../../images/absent_image_dapp.png'
import { openWebsite } from '../../../../utils/effect'
import { websiteIcon } from '../../common-widgets/icons'
import MyScoreComponent from '../../score/scoreComponent'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'
import './dapp.scss'
import { WARNING_ICON } from '../../common-widgets/logo/logo'
import ScamWarningDetail from '../scam-warning/ScamWarningDetail'

const DappInfo = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const waitMillSecOpenWebsite = 3000
  const chainList = useContext(ChainListContext)
  const [loading, setLoading] = useState(false)
  const [top, setTop] = useState()

  // const onOpenDapp = (link) => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     link && window.open(link)
  //     setLoading(false)
  //   }, 3000)
  // }
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

  // DAPP HEADER
  const Header = () => {
    return <div className='profile-info mb-1'>
      <div className='profile-details'>
        <div className='profile-photo'>
          {productInfo?.details?.dAppId && productInfo?.details?.dAppLogo ? (
            <Image src={isValidProductId(productInfo?.details?.dAppId) ? formatImgUrlFromProductId(productInfo?.details?.dAppId) : imgAbsentImageDapp} preview={false} alt='DApp Logo'/>
          )
            : (<h2 className='image-list-no-data-detail'>
              {productInfo?.details?.dAppName?.slice(0, 3)}
            </h2>)
          }
        </div>
        <div className='profile-name'>
          <h4 className='text-primary mb-2 cus-h4'>{detail?.dAppName}</h4>
          <Badge className='badge-sm' >{detail?.subCategory}</Badge>
        </div>
        {
          detail?.website && <Button className='ms-auto' onClick={() => openWebsite(detail?.website, setLoading, waitMillSecOpenWebsite)}>
            {loading ? <Spin indicator={<LoadingOutlined spin />} style={{ color: 'white', marginRight: '0.3rem' }} /> : ''}
            {websiteIcon}
             Website
          </Button>
        }
      </div>
    </div>
  }

  // DAPP SUMMARY
  const summary =
    <div className='text-center'>
      <div className='row'>
        <div className='col'>
          <h3 className='m-b-0'>
            <Badge bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{productInfo?.details?.totalReviews}</Badge>
          </h3>
          <span>Reviews</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            <Badge bg='badge-l' className='badge-warning progress-bar-striped progress-bar-animated'>{productInfo?.details?.totalIsScam}</Badge>
          </h3>
          <span>
          Reported Scam
          </span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>
            <MyScoreComponent score={productInfo?.details?.score} />
          </h3>
          <span>
          Score
          </span>
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
          &nbsp;
        Report&nbsp;Scam
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
          <svg width='18' height='18' viewBox='0 0 1024 1024' className='icon' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M687.542857 965.485714H182.857143c-87.771429 0-160.914286-73.142857-160.914286-160.914285V256c0-87.771429 73.142857-160.914286 160.914286-160.914286h336.457143V146.285714H182.857143C124.342857 146.285714 73.142857 197.485714 73.142857 256v541.257143c0 58.514286 51.2 109.714286 109.714286 109.714286h504.685714c58.514286 0 109.714286-51.2 109.714286-109.714286V533.942857h58.514286v263.314286c-7.314286 95.085714-80.457143 168.228571-168.228572 168.228571z' fill='#fff' /><path d='M877.714286 95.085714l109.714285 138.971429c7.314286 7.314286 0 14.628571-7.314285 21.942857L629.028571 526.628571c-7.314286 7.314286-160.914286-7.314286-160.914285-7.314285s29.257143-146.285714 36.571428-153.6l351.085715-270.628572c7.314286-7.314286 14.628571-7.314286 21.942857 0z' fill='#F4B1B2' /><path d='M607.085714 555.885714c-21.942857 0-65.828571 0-138.971428-7.314285H438.857143V512c29.257143-160.914286 36.571429-160.914286 43.885714-168.228571L833.828571 73.142857c21.942857-14.628571 43.885714-14.628571 58.514286 7.314286L1002.057143 219.428571c14.628571 14.628571 7.314286 43.885714-7.314286 58.514286L643.657143 548.571429c-7.314286 7.314286-7.314286 7.314286-36.571429 7.314285z m-109.714285-58.514285c51.2 0 95.085714 7.314286 117.028571 7.314285L950.857143 241.371429l-87.771429-117.028572-336.457143 263.314286c-7.314286 14.628571-14.628571 58.514286-29.257142 109.714286z' fill='#fff' /></svg>
          &nbsp;
        Add Review
        </Button>
      </div>
    </div>

  // DAPP MORE
  const dataItem = (title, content) =>{
    return <div className='d-flex text-align-center mb-1'>
      <p className='mb-0'>{title}:</p>
      <h5 className='ms-1 ' >{content} </h5>
    </div>
  }

  const communityItem = (title, content) => {
    return <div className='d-flex align-items-start'>
      <p>{title}:</p>
      <div className='cus-d-flex'>
        {content && (
          Object.keys(content).map(
            (socialName) => {
              return content[socialName] !== '' ? (
                <Tooltip className='ms-1'
                  title={toCammelCase(socialName)}
                  key={socialName}
                >
                  <a
                    href={content[socialName]}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Avatar
                      alt='Social Logo'
                      className='img-fluid p-1 rounded-circle cus-avatar'
                      style={{ backgroundColor: '#F0F2F5' }}
                      // preview={false}
                      src={
                        socials?.find(
                          (social) =>
                            social?.key?.toLowerCase() ===
                            socialName?.toLowerCase()
                        )?.icon
                          ? socials?.find(
                            (social) =>
                              social?.key?.toLowerCase() ===
                                socialName?.toLowerCase()
                          ).icon
                          : defaultSocial
                      }
                    />
                  </a>
                </Tooltip>
              ) : null
            }
          )

        )}
      </div>
    </div>
  }

  const More = () => {
    return <div>
      <div className='card-header border-0 pb-0'>
        <h3 className='heading text-primary'>{detail?.dAppName} Information</h3>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog'>
          <div className='community-list'>
            {detail?.balance > 0 && (
              <div className='community-list-item'>
                {dataItem('Balance', formatMoney(detail?.balance))}
              </div>
            )}
            {detail?.totalUser > 0 && (
              <div className='community-list-item'>
                { dataItem('Total Users', detail?.totalUser)}
              </div>
            )}
            {!_.isEmpty(detail?.chains) && (
              <div className='community-list-item'>
                <div className='d-flex text-align-center mb-2'>
                  <p className='mb-0'>Chain:</p>
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
                </div>
              </div>
            )}
            {detail?.user24h > 0 && (
              <div className='community-list-item'>
                {dataItem('User 24h', formatLargeNumber(detail?.user24h)?.replace('$', ''))}
              </div>
            )}
            {detail?.volume24h > 0 && (
              <div className='community-list-item'>
                {dataItem('Volume 24h', formatMoney(detail?.volume24h))}
              </div>
            )}
            {detail?.socials && (
              <div className='community-list-item'>
                {communityItem('Social', detail?.socials)}
              </div>
            )}

            {!_.isEmpty(detail?.sourceCode) && <div className='col-12'>
              <Dropdown className='mt-1'>
                <Dropdown.Toggle variant='primary' className=' btn btn-success light sharp'>
                              Source Code
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.keys(detail?.sourceCode)?.map((key, index) => key && <Dropdown.Item key={index} ><a href={detail?.sourceCode[key]}>{detail?.sourceCode[key]}</a></Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
              {/* <div className='d-flex text-align-center mb-1'>
              <p className='mb-0'>Source Code:</p>
              <h4 className='ms-1 mb-1'>{detail?.sourceCode} </h4>
                      </div> */}
            </div>}
          </div>
        </div>
      </div>
    </div>
  }

  // VENTURE DESCRIPTION
  const About = () => {
    return <div>
      <div className='card-header border-0 pb-0'>
        <h3 className='heading text-primary'>About {detail?.dAppName}</h3>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          {detail?.description && <Description text={detail?.description}/>}
        </div>
      </div>
    </div>
  }

  const scam = (
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
  )

  return <DetailLayout Header={<Header />}
    summary={summary}
    more={<More/>}
    about={<About />}
    isScam={detail?.isScam}
    numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
    rest={rest}
    setTop={setTop}
    topDiscus={<TopDiscussed />}
    scam={scam}
  />
}

export default DappInfo
