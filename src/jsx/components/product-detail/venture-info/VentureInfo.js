import { Avatar, Table, Tooltip } from 'antd'
import React from 'react'
import { Badge, Button } from 'react-bootstrap'
import { DetailLayout } from '../detail-layout'
import { socials, defaultSocial } from '../../../../utils/social-icons/socials-icon'
import { renderNumber } from '../../../../utils/formatNumber'
import _ from 'lodash'
import Description from '../description/Description'
import moment from 'moment'
import FormReport from '../../Forms/form-report/FormReport'
import { useNavigate } from 'react-router-dom'

const VentureInfo = ({ productInfo }) => {
  const detail = productInfo?.details
  const navigate = useNavigate()

  const calculateTotalFund = (fund) =>{
    let total = 0
    fund && fund?.forEach(item => {
      total += item?.fundAmount
    })

    return total
  }

  // VENTURE HEADER
  const Header = () => {
    return <div className='profile-head'>
      <div className='profile-info mb-1'>
        <div className='profile-photo'>
          <Avatar
            size={50}
            src={detail?.ventureLogo}
            className='img-fluid rounded-circle'
            alt='profile'
          />
        </div>
        <div className='profile-details'>
          <div className='profile-name px-3 ms-2 '>
            <h4 className='text-primary mb-0'>{detail?.ventureName}
            </h4>
            <Badge className='badge-sm' >{detail?.subCategory}</Badge>
          </div>
        </div>
      </div>
    </div>
  }

  // VENTURE SUMMARY
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

  // VENTURE MORE
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
              {detail?.location && dataItem('Location', detail?.location)}
              {!_.isEmpty(productInfo?.mores?.fund) && dataItem('Total funds', renderNumber(calculateTotalFund(productInfo?.mores?.fund)))}
            </div>
            <div className='col-6'>
              {detail?.yearFounded && dataItem('Founded Year', detail?.yearFounded)}
            </div>
            {detail?.website && <div className='col-12'>
              <div className='d-flex text-align-center mb-1'>
                <p className='mb-0 mt-1'>Website:</p>
                <a className='mt- ms-1' href={detail?.website}> <h5 className='ms-1 mt-1' >{detail?.website} </h5></a>
              </div>
            </div>}
            <div className='col-12'>
              {communityItem('Socials', detail?.socials)}
            </div>

          </div>
        </div>
      </div>
    </div>
  }

  const About = () => {
    return <div>
      <div className='card-header border-0 pb-0'>
        <h5 className='text-primary'>About {detail?.ventureName}:</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          {detail?.description && <Description text={detail?.description}/>}
        </div>
      </div>
    </div>
  }

  const portfolioColumns = [
    {
      title: 'Name',
      render: (_, record) => (<span>{record?.projectId?.split('_')[2]}</span>)
    },
    {
      title: 'Funding Round',
      render: (_, record) => (<span>{record?.fundStageName}</span>)
    }, {
      title: 'Fund Amount',
      render: (_, record) => <span>{renderNumber(record?.fundAmount)}</span>
    }, {
      title: 'Fund Date',
      render: (_, record) => <span>{moment(record?.fundDate)?.format('DD-MM-YYYY')}</span>
    }
  ]

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
    return <>
      <div className='card-header border-0 pb-0'>
        <h5 className='text-primary'>{detail?.ventureName} Portfolio:</h5>
      </div>
      <div className='card-body pt-3'>
        <div className='profile-blog '>
          <Table
            // loading={loading}
            columns={portfolioColumns}
            dataSource={productInfo?.mores?.fund}
            // onChange={handleChangeTable}
            pagination={true}
            rowKey={(record) => record?.projectId}
            onRow={(record) => ({
              onClick: () => {
                handleonRowClicked(record?.projectId)
              }
            })}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </div></>
  }

  return (
    <DetailLayout Header={<Header />} summary={<Summary />} more={<More />} about={<About />} portfolioOrChart={<PortfolioTable />} report={<FormReport />}/>
  )
}

export default VentureInfo
