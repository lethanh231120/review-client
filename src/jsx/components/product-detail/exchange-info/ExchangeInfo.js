import { Avatar, Tooltip } from 'antd'
import React from 'react'
import { Badge, Button, Dropdown } from 'react-bootstrap'
import { DetailLayout } from '../detail-layout'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'
import { renderNumber } from '../../../../utils/formatNumber'
import _ from 'lodash'
import moment from 'moment'
import Description from '../description/Description'
import FormReport from '../../Forms/form-report/FormReport'

const ExchangeInfo = ({ productInfo }) => {
  const detail = productInfo?.details
  // exchange header
  const Header = () => {
    return <div className='profile-head'>
      <div className='profile-info mb-1'>
        <div className='profile-photo'>
          <Avatar
            size={50}
            src={detail?.smallLogo}
            className='img-fluid rounded-circle'
            alt='profile'
          />
        </div>
        <div className='profile-details'>
          <div className='profile-name px-3 ms-2 '>
            <h4 className='text-primary mb-0'>{detail?.name}
            </h4>
            <Badge className='badge-sm' >{detail?.subCategory}</Badge>
          </div>
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
          <h3 className='m-b-0'>{detail?.totalReviews}</h3>
          <span>Reviews</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>{detail?.totalIsScam}</h3> <span>Reported Scam</span>
        </div>
        <div className='col'>
          <h3 className='m-b-0'>{detail?.score}</h3> <span>Score</span>
        </div>
      </div>
      <div className='mt-4'>
        <Button
          as='a'
          href='#'
          className='btn btn-primary mb-1 ms-1'
        >
       Report Scam
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
        <Avatar.Group
          size={25}
          maxCount={2}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            cursor: 'pointer'
          }}
          className='mt-1'
          style={{ marginLeft: '10px' }}>
          {Object.keys(content).map(
            (socialName) => {
              return content[socialName] !== '' ? (
                <Tooltip
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
          )}
        </Avatar.Group>
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
            {detail?.website && <div className='col-12'>
              <div className='d-flex text-align-center mb-1'>
                <p className='mb-0 mt-1'>Website:</p>
                <a href={detail?.website}> <h5 className='ms-1 mt-1' >{detail?.website}</h5></a>
              </div>
            </div>}
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
    <DetailLayout Header={<Header />} summary={<Summary />} more={<More />} about={<About />} isScam={detail?.isScam} report={<FormReport />}/>
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
