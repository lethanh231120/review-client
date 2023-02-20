import { Avatar, Spin, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Badge, Button, Dropdown } from 'react-bootstrap'
import { DetailLayout } from '../detail-layout'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'
import { formatLargeNumber, renderNumber } from '../../../../utils/formatNumber'
import _ from 'lodash'
import moment from 'moment'
import Description from '../description/Description'
// import FormReport from '../../Forms/form-report/FormReport'
import { LoadingOutlined } from '@ant-design/icons'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageExchange from '../../../../images/absent_image_exchange.png'
import { websiteIcon } from '../../common-widgets/icons'
import MyScoreComponent from '../../score/scoreComponent'
import imgReportProject from '../../../../images/svg/report-project-white.svg'
import { TopDiscussed } from '../../common-widgets/home/top-discussed/top-discuss-project'

const ExchangeInfo = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const [loading, setLoading] = useState(false)

  const onOpenDapp = (link) => {
    setLoading(true)
    setTimeout(() => {
      link && window.open(link)
      setLoading(false)
    }, 3000)
  }

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
  }

  // exchange header
  const Header = () => {
    return <div className='profile-head'>
      <div className='profile-info mb-1'>
        <div className='profile-photo'>
          {detail?.exchangeId && detail?.smallLogo ? (
            <Avatar size={60} src={isValidProductId(detail?.exchangeId) ? formatImgUrlFromProductId(detail?.exchangeId) : imgAbsentImageExchange} preview={false} height={64} width={64}/>
          )
            : (<span className='image-list-no-data-detail'>
              {detail?.name?.slice(0, 3)}
            </span>)
          }
        </div>
        <div className='profile-details'>
          <div className='profile-name px-3 ms-2 '>
            <h4 className='text-primary mb-0'>{detail?.name}
            </h4>
            <Badge className='badge-sm' >{detail?.subCategory}</Badge>
          </div>
          {detail?.website && <Button className='ms-auto' onClick={() => onOpenDapp(detail?.website)}>
            {loading ? <Spin indicator={<LoadingOutlined spin />} style={{ color: 'white', marginRight: '10px' }} /> : <div></div>}
            {websiteIcon}
    Website</Button>}
        </div>
      </div>
    </div>
  }

  // exchange summary
  const summary =
  <div className='text-center'>
    <div className='row'>
      <div className='col'>
        <h3 className='m-b-0'>
          <Badge bg='badge-l' className='badge-success'>{productInfo?.details?.totalReviews}</Badge>
        </h3>
        <span>Reviews</span>
      </div>
      <div className='col'>
        <h3 className='m-b-0'>
          <Badge bg='badge-l' className='badge-warning'>{productInfo?.details?.totalIsScam}</Badge>
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
    <div className='mt-4'>
      <Button
        as='a'
        href='#comment'
        className='mb-1 me-1'
        variant='danger'
        onClick={handleReportScam}
      >
        <img src={imgReportProject} alt='err' />
        &nbsp;
      Report&nbsp;Scam
      </Button>
      <Button
        as='a'
        href='#comment'
        className='btn btn-primary mb-1 ms-1'
        onClick={() => {
          rest?.setData({ ...rest.data, isScam: false })
          rest?.form.setFieldsValue({
            isScam: false,
            star: undefined,
            sources: []
          })
        }}
      >
        <svg width='24' height='24' viewBox='0 0 1024 1024' className='icon' version='1.1' xmlns='http://www.w3.org/2000/svg'><path d='M687.542857 965.485714H182.857143c-87.771429 0-160.914286-73.142857-160.914286-160.914285V256c0-87.771429 73.142857-160.914286 160.914286-160.914286h336.457143V146.285714H182.857143C124.342857 146.285714 73.142857 197.485714 73.142857 256v541.257143c0 58.514286 51.2 109.714286 109.714286 109.714286h504.685714c58.514286 0 109.714286-51.2 109.714286-109.714286V533.942857h58.514286v263.314286c-7.314286 95.085714-80.457143 168.228571-168.228572 168.228571z' fill='#fff' /><path d='M877.714286 95.085714l109.714285 138.971429c7.314286 7.314286 0 14.628571-7.314285 21.942857L629.028571 526.628571c-7.314286 7.314286-160.914286-7.314286-160.914285-7.314285s29.257143-146.285714 36.571428-153.6l351.085715-270.628572c7.314286-7.314286 14.628571-7.314286 21.942857 0z' fill='#F4B1B2' /><path d='M607.085714 555.885714c-21.942857 0-65.828571 0-138.971428-7.314285H438.857143V512c29.257143-160.914286 36.571429-160.914286 43.885714-168.228571L833.828571 73.142857c21.942857-14.628571 43.885714-14.628571 58.514286 7.314286L1002.057143 219.428571c14.628571 14.628571 7.314286 43.885714-7.314286 58.514286L643.657143 548.571429c-7.314286 7.314286-7.314286 7.314286-36.571429 7.314285z m-109.714285-58.514285c51.2 0 95.085714 7.314286 117.028571 7.314285L950.857143 241.371429l-87.771429-117.028572-336.457143 263.314286c-7.314286 14.628571-14.628571 58.514286-29.257142 109.714286z' fill='#fff' /></svg>
        &nbsp;
      Add Review
      </Button>
    </div>
  </div>

  // EXCHANGE MORE
  const dataItem = (title, content) =>{
    return <div className='d-flex text-align-center mb-1'>
      <p className='mb-0 mt-1'>{title}:</p>
      <h5 className='ms-1 mt-1' >{content} </h5>
    </div>
  }

  const communityItem = (title, content) => {
    return <div className='d-flex'>
      <p className='mt-2 '>{title}:</p>
      {content && (
        // <Avatar.Group
        //   size={25}
        //   maxCount={2}
        //   maxStyle={{
        //     color: '#f56a00',
        //     backgroundColor: '#fde3cf',
        //     cursor: 'pointer'
        //   }}
        //   className='mt-1'
        //   style={{ marginLeft: '10px' }}>
      // {
        Object.keys(content).map(
          (socialName) => {
            return content[socialName] !== '' ? (
              <Tooltip
                className='ms-1 mt-2'
                placementTooltip='topLeft'
                title={socialName}
                key={socialName}
              >
                <a
                  href={content[socialName]}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Avatar
                    size={25}
                    className=' img-fluid p-1 rounded-circle'
                    style={{ backgroundColor: '#F0F2F5' }}
                    preview={false}
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
        // }
        // </Avatar.Group>
      )}
    </div>
  }

  const More = () => {
    return <div>
      <div className='card-header border-0 pb-0'>
        <h5 className='text-primary'>{detail?.dAppName} Information:</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          <div className='row'>
            <div className='col-6'>
              {detail?.detail && detail?.detail['Country'] && dataItem('Country', shortenString(detail?.detail['Country'])) }
              {detail?.pairCount > 0 && dataItem('Pairs Count', detail?.pairCount)}
              {detail?.volume24h > 0 && dataItem('Volume 24h', renderNumber(detail?.volume24h))}
              {detail?.volume1m > 0 && dataItem('Volume 1m', renderNumber(detail?.volume1m))}
            </div>
            <div className='col-6'>
              {detail?.feeTxs > 0 && dataItem('Fee Transaction', `${detail?.feeTxs}%`)}
              {detail?.visit7d > 0 && dataItem('Visit 7d', formatLargeNumber(detail?.visit7d))}
              {detail?.volume7d > 0 && dataItem('Volume 7d', renderNumber(detail?.volume7d))}
              {detail?.volume1y > 0 && dataItem('Volume 1y', renderNumber(detail?.volume1y))}
            </div>
            {detail?.founderYear && dataItem('Founded Year', moment(detail?.founderYear)?.year())}

            <div className='col-12'>
              {communityItem('Socials', detail?.socials)}
            </div>
            {!_.isEmpty(detail?.sourceCode) && <div className='col-12'>
              <Dropdown className='mt-1'>
                <Dropdown.Toggle variant='primary' className=' btn btn-success light sharp'>
                            Source Code
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.keys(detail?.sourceCode)?.map((key, index) => key && <Dropdown.Item key={index} >{detail?.sourceCode[key]}</Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </div>}
          </div>
        </div>
      </div>
    </div>
  }

  const About = () => {
    return <div>
      <div className='card-header border-0 pb-0'>
        <h5 className='text-primary'>About {detail?.name}:</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          {detail?.fullDescription && <Description text={detail?.fullDescription}/>}
        </div>
      </div>
    </div>
  }

  return (
    <DetailLayout
      Header={<Header />}
      summary={summary}
      more={<More />}
      about={<About />}
      isScam={detail?.isScam}
      numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
      rest={rest}
      topDiscus={<TopDiscussed />}
    />

  )
}

const shortenString = (text) => {
  if (text.length > 10) {
    return text.substring(0, 10)
  } else {
    return text
  }
}

export default ExchangeInfo
