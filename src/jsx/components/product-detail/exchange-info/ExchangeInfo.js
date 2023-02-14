import { Avatar, Image, Spin, Tooltip } from 'antd'
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
            <Image src={isValidProductId(detail?.exchangeId) ? formatImgUrlFromProductId(detail?.exchangeId) : imgAbsentImageExchange} preview={false} height={64} width={64}/>
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
    Open Exchange</Button>}
        </div>
      </div>
    </div>
  }

  // exchange summary
  const Summary =
  () => {
    return <div className='text-center'>
      <div className='row'>
        <div className='col'>
          <h3 className='m-b-0'>{formatLargeNumber(detail?.totalReviews)}</h3>
          <span>Reviews</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>{formatLargeNumber(detail?.totalIsScam)}</h3> <span>Reported Scam</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>{formatLargeNumber(detail?.score)}</h3> <span>Score</span>
        </div>
      </div>
      <div className='mt-4'>
        <Button
          as='a'
          href='#comment'
          className='btn btn-primary mb-1 me-1'
          onClick={handleReportScam}
        >
                    Report Scam
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
                  Add Review
        </Button>
      </div>
    </div>
  }

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
              {detail?.visit7d > 0 && dataItem('Visit 7d', detail?.visit7d)}
              {detail?.volume7d > 0 && dataItem('Volume 7d', renderNumber(detail?.volume7d))}
              {detail?.volume1y > 0 && dataItem('Volume 1y', renderNumber(detail?.volume1y))}
            </div>
            {detail?.founderYear && dataItem('Founder Year', moment(detail?.founderYear).format('DD-MM-YYYY'))}

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
      summary={<Summary />}
      more={<More />}
      about={<About />}
      isScam={detail?.isScam}
      // report={<FormReport />}
      numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
      rest={rest}
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
