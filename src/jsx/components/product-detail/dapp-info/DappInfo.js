import { Avatar, Spin, Tooltip } from 'antd'
import _ from 'lodash'
import React, { useContext, useState } from 'react'
import { Badge, Button, Dropdown, Image } from 'react-bootstrap'
import { ChainListContext } from '../../..'
import { formatMoney } from '../../../../utils/formatNumber'
import FormReport from '../../Forms/form-report/FormReport'
import { DetailLayout } from '../detail-layout'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'
import { LoadingOutlined } from '@ant-design/icons'
//  import styles

const DappInfo = ({ productInfo }) => {
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
  const header =
  <div className='profile-head'>
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

  // DAPP SUMMARY
  const summary =
          <div className='text-center'>
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

  // DAPP MORE
  const dataItem = (title, content) =>{
    return <div className='d-flex text-align-center mb-1'>
      <p className='mb-0'>{title}:</p>
      <h4 className='ms-1 mb-1' >{content} </h4>
    </div>
  }

  const communityItem = (title, content) => {
    return <div className='d-flex'>
      <p className='mt-2 '>{title}:</p>
      {content && (
        <div className='mt-1' style={{ marginLeft: '10px' }}>
          {Object.keys(content).map(
            (socialName) => {
              return content[socialName] !== '' ? (
                <Tooltip
                  placementTooltip='topLeft'
                  title={socialName}
                  key={socialName}
                >
                  <span className='mr-1'>
                    <a
                      href={content[socialName]}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Image
                        className='me-1 img-fluid p-1 rounded-circle'
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
                  </span>
                </Tooltip>
              ) : null
            }
          )}
        </div>
      )}
    </div>
  }

  const more = <div>
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
          <div className='col-12'>
            {communityItem('Community', detail?.community)}
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
            {/* <div className='d-flex text-align-center mb-1'>
              <p className='mb-0'>Source Code:</p>
              <h4 className='ms-1 mb-1'>{detail?.sourceCode} </h4>
                      </div> */}
          </div>}
        </div>
      </div>
    </div>
  </div>

  const about = <div>
    <div className='card-header border-0 pb-0'>
      <h5 className='text-primary'>About {detail?.dAppName}:</h5>
    </div>
    <div className='card-body pt-3'>
      <div className='profile-blog '>
        <p className='ms-1'>{detail?.description} </p>
      </div>
    </div>
  </div>
  return <DetailLayout header={header} summary={summary} more={more} about={about} isScam={detail?.isScam} report={<FormReport />}/>
}

export default DappInfo
