import React from 'react'
import _ from 'lodash'
import InformationSubTitle, { typeWebsite } from '../page-detail/InformationSubTitle'
import { LinkOutlined } from '@ant-design/icons'
import { Dropdown } from 'react-bootstrap'
import { toCammelCase } from '../../../../utils/formatText'

export const InfoWebsiteDetail = ({ itemDetail }) => {
  return <div className='crypto-info'>
    <div className=''>
      <InformationSubTitle type={typeWebsite}/>
      <div className='row mt-3' style={{ marginLeft: '0.2rem' }}>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' style={{ paddingLeft: '0' }}>
          {
            itemDetail?.whitepaperUrl ? <div className='mb-0 btn btn-primary light btn-xs me-1' onClick={() => window.open(itemDetail?.whitepaperUrl)}>
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
                <Dropdown.Toggle variant='primary' className='cus-dropdown-select btn btn-primary light sharp'>
                    Socials
                </Dropdown.Toggle>
                <Dropdown.Menu className='cus-dropdown-menu'>
                  {
                    Object.keys(itemDetail?.socials)?.map((keyName, index) => (
                      <Dropdown.Item
                        className='crypto-tag-item-list-children-contract cus-dropdown-item'
                        onClick={() => window.open(itemDetail?.socials[keyName])}
                        key={index}
                      >
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
}
