import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ShortItem from './ShortItem'
import _ from 'lodash'
import ShortItemScamWarning, { typeReview, typeScamReport } from './ShortItemScamWarning'
import LaunchpadDetail from '../../product-detail/launchpad-info/LaunchpadDetail'
import { LinkOutlined } from '@ant-design/icons'
import { toCammelCase } from '../../../../utils/formatText'
import { SOON } from '../../../constants/category'
import { encodeUrl } from '../../../../utils/formatUrl'

export const ShortItemsSoon = ({ productInfo }) => {
  const navigate = useNavigate()
  const itemDetail = productInfo?.details
  const itemTags = productInfo?.mores?.tag

  const handleClickTag = (value) => {
    navigate(`../../../../../${SOON}/${encodeUrl(value)}`)
  }

  return (itemDetail && itemTags) && <div>
    <div className='card-header border-0 pb-0'>
      <h5 className='heading text-primary d-flex align-items-center'>
        <i className='material-icons fs-30 text-primary'>info</i>
        &nbsp;
        {itemDetail?.projectName} Information
      </h5>
    </div>
    <div className='card-body pt-3'>
      {/* exist alest 1 to display this component */}
      {itemDetail?.projectName && (itemDetail?.roundType || !_.isEmpty(itemDetail?.blockchain || itemDetail?.acceptCurrency || itemDetail?.type || (itemDetail?.totalIsScam || itemDetail?.totalIsScam === 0) || (itemDetail?.totalReviews || itemDetail?.totalReviews === 0)))
        ? <div className='profile-blog mb-4'>
          <Link to={'#'} >
            <h4 className='d-flex align-items-center'>
              <i className='material-icons fs-23 text-primary'>short_text</i>
            Short:
            </h4>
          </Link>
          {
            itemDetail?.type &&
          <ShortItem
            title={`${itemDetail?.projectName}'s token type:`}
            content={itemDetail?.type}
          />
          }
          {
            itemDetail?.roundType &&
          <ShortItem
            title={`${itemDetail?.projectName}'s current round:`}
            content={itemDetail?.roundType}
          />
          }
          {
            itemDetail?.acceptCurrency &&
          <ShortItem
            title={`${itemDetail?.projectName} is exchanged in currencies:`}
            content={itemDetail?.acceptCurrency?.split(',')?.map((keyName, index) => (
              <span className='text-primary fs-16 text-uppercase' key={index}>
                <b>{keyName}</b>
                {/* last element in array */}
                {index >= (itemDetail?.acceptCurrency?.split(',')?.length - 1) ? '' : <>,&nbsp;</>}
              </span>
            ))}
          />
          }

          {
            !_.isEmpty(itemDetail?.blockchain) &&
          <ShortItem
            title={`${itemDetail?.projectName} lives on blockchains:`}
            content={Object.keys(itemDetail?.blockchain)?.map((keyName, index) => (
              <span className='text-primary fs-16 text-capitalize' key={index}>
                <b>{keyName}</b>
                {/* last element in array */}
                {index >= (Object.keys(itemDetail?.blockchain)?.length - 1) ? '' : <>,&nbsp;</>}
              </span>
            ))}
          />
          }

          {
          // check like this cus && don't pass zero
            (itemDetail?.totalIsScam || itemDetail?.totalIsScam === 0)
              ? <ShortItemScamWarning
                type={typeScamReport}
                projectName={itemDetail?.projectName}
                total={itemDetail?.totalIsScam}
              />
              : ''
          }

          {
          // check like this cus && don't pass zero
            (itemDetail?.totalReviews || itemDetail?.totalReviews === 0)
              ? <ShortItemScamWarning
                type={typeReview}
                projectName={itemDetail?.projectName}
                total={itemDetail?.totalReviews}
              />
              : ''
          }

        </div> : ''}

      <LaunchpadDetail projectName={itemDetail?.projectName} launchpadList={itemDetail?.launchPads}/>

      <div className='crypto-info'>
        <div className=''>
          <Link to={'#'} >
            <h4 className='d-flex align-items-center'>
              <i className='material-icons fs-23 text-primary'>language</i>
            Website:
            </h4>
          </Link>
          <div className='row mt-3' style={{ marginLeft: '1.5rem' }}>
            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' style={{ paddingLeft: '0' }}>
              {
                itemDetail?.whitepaperUrl ? <div className='mb-0 btn btn-primary light btn-xs mb-2 me-1' onClick={() => window.open(itemDetail?.whitepaperUrl)}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                Whitepaper&nbsp;
                    <LinkOutlined />
                  </div>
                </div> : ''
              }

              {
                itemDetail?.linkDemo ? <div className='mb-0 btn btn-primary light btn-xs mb-2 me-1' onClick={() => window.open(itemDetail?.linkDemo)}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                Link&nbsp;Demo&nbsp;
                    <LinkOutlined />
                  </div>
                </div> : ''
              }

              {
                itemDetail?.socials && !_.isEmpty(itemDetail?.socials)
                  ? <Dropdown style={{ display: 'inline-block' }}>
                    <Dropdown.Toggle variant='primary' className='mb-0 btn btn-primary light btn-xs mb-2 me-1'>
                      Socials
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='cus-dropdown-menu'>
                      {
                        Object.keys(itemDetail?.socials)?.map((keyName, index) => (
                          <Dropdown.Item onClick={() => window.open(itemDetail?.socials[keyName])} key={index}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {toCammelCase(keyName)}
                            &nbsp;
                              <LinkOutlined />
                            </div>
                          </Dropdown.Item>
                        ))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                  : ''
              }
              {
                itemDetail?.additionalLinks && !_.isEmpty(itemDetail?.additionalLinks)
                  ? <Dropdown style={{ display: 'inline-block' }}>
                    <Dropdown.Toggle variant='primary' className='mb-0 btn btn-primary light btn-xs mb-2 me-1'>
                    Additional Links
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='cus-dropdown-menu'>
                      {
                        Object.keys(itemDetail?.additionalLinks)?.map((keyName, index) => (
                          <Dropdown.Item onClick={() => window.open(itemDetail?.additionalLinks[keyName])} key={index}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {toCammelCase(keyName)}
                            &nbsp;
                              <LinkOutlined />
                            </div>
                          </Dropdown.Item>
                        ))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                  : ''
              }

              {
                itemDetail?.sourceCode && !_.isEmpty(itemDetail?.sourceCode)
                  ? <Dropdown style={{ display: 'inline-block' }}>
                    <Dropdown.Toggle variant='primary' className='mb-0 btn btn-primary light btn-xs mb-2 me-1'>
                  Source Code
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='cus-dropdown-menu'>
                      {
                        Object.keys(itemDetail?.sourceCode)?.map((keyName, index) => (
                          <Dropdown.Item onClick={() => window.open(itemDetail?.sourceCode[keyName])} key={index}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {toCammelCase(keyName)}
                            &nbsp;
                              <LinkOutlined />
                            </div>
                          </Dropdown.Item>
                        ))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                  : ''
              }

            </div>
          </div>
        </div>
      </div>

      { !_.isEmpty(itemTags)
        ? <div className='profile-blog mb-3'>
          <Link to={'#'} >
            <h4 className='d-flex align-items-center'>
              <i className='material-icons fs-23 text-primary'>sell</i>
            Tag:
            </h4>
          </Link>
          <div style={{ marginLeft: '1.5rem' }}>
            { Object.keys(itemTags)?.map((index) => (
              <div
                className='mb-0 btn btn-primary light btn-xs mb-2 me-1'
                onClick={() => handleClickTag(itemTags[index]?.name)}
                key={index}
              >
                {itemTags[index]?.name}
              </div>
            )) }
          </div>
        </div> : ''}

    </div>
  </div>
}
