import { Avatar, Spin, Tooltip } from 'antd'
import _ from 'lodash'
import React, { useContext, useState } from 'react'
import { Badge, Button, Dropdown } from 'react-bootstrap'
import { ChainListContext } from '../../../../App'
import { formatMoney } from '../../../../utils/formatNumber'
import FormReport from '../../Forms/form-report/FormReport'
import { DetailLayout } from '../detail-layout'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'
import { LoadingOutlined } from '@ant-design/icons'
import Description from '../description/Description'
//  import styles

const DappInfo = ({ productInfo, ...rest }) => {
  const detail = productInfo?.details
  const chainList = useContext(ChainListContext)
  const [loading, setLoading] = useState(false)

  const onOpenDapp = (link) => {
    setLoading(true)
    setTimeout(() => {
      link && window.open(link)
      setLoading(false)
    }, 3000)
  }

  // DAPP HEADER
  const Header = () => {
    return <div className='profile-head'>
      <div className='profile-info mb-1'>
        <div className='profile-photo'>
          <Avatar
            size={50}
            src={detail?.dAppLogo}
            className='img-fluid rounded-circle'
            alt='profile'
          />
        </div>
        <div className='profile-details'>
          <div className='profile-name px-3 ms-2 '>
            <h4 className='text-primary mb-0'>{detail?.dAppName}
            </h4>
            <Badge className='badge-sm' >{detail?.subCategory}</Badge>
          </div>
          <Button className='ms-auto' onClick={() => onOpenDapp(detail?.website)}>
            {loading ? <Spin indicator={<LoadingOutlined spin />} style={{ color: 'white', marginRight: '10px' }} /> : <div></div>}
    Open Dapp</Button>
        </div>
      </div>
    </div>
  }

  // DAPP SUMMARY
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

  // DAPP MORE
  const dataItem = (title, content) =>{
    return <div className='d-flex text-align-center mb-1'>
      <p className='mb-0'>{title}:</p>
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
              {dataItem('Balance', formatMoney(detail?.balance))}
              {!_.isEmpty(detail?.chains) && (
                <div className='d-flex text-align-center mb-2'>
                  <p className='mb-0'> Chains:</p>
                  <Avatar.Group className='ms-1 '
                    maxCount={4}
                    size={25}
                    maxStyle={{
                      color: '#f56a00',
                      backgroundColor: '#fde3cf',
                      cursor: 'pointer'
                    }}
                  >
                    {detail?.chains && Object.keys(detail?.chains).map((key, index) => (
                      <>
                        {key && (
                          <Avatar
                            size={25}
                            src={chainList[key]?.image}
                            key={index}
                            className='crypto-info-exchange'
                          />
                        )}
                      </>
                    ))}
                  </Avatar.Group>
                </div>
              )}
            </div>
            <div className='col-6'>
              {dataItem('User 24h', detail?.user24h)}
              {dataItem('Volume 24h', formatMoney(detail?.volume24h))}
              {detail?.totalUser > 0 && dataItem('Total Users', detail?.totalUser)}
            </div>
            <div className='col-12'>
              {communityItem('Socials', detail?.socials)}
            </div>

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
        <h5 className='text-primary'>About {detail?.dAppName}:</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          {detail?.description && <Description text={detail?.description}/>}
        </div>
      </div>
    </div>
  }

  return <DetailLayout Header={<Header />}
    summary={<Summary />}
    more={<More/>}
    about={<About />}
    isScam={detail?.isScam}
    report={<FormReport />}
    numberReviews={productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
    rest={rest}/>
}

export default DappInfo
