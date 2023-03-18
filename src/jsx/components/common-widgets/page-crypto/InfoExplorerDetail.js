import React from 'react'
import InformationSubTitle, { typeExplorer } from '../page-detail/InformationSubTitle'
import { Dropdown } from 'react-bootstrap'
import { LinkOutlined, CopyOutlined } from '@ant-design/icons'
import { Image, Tooltip } from 'antd'
import { toCammelCase } from '../../../../utils/formatText'
import { copyAddress } from '../../../../utils/effect'

export const InfoExplorerDetail = ({ isShow, detail, multichain }) => {
  return <div className='crypto-info'>
    <div className=''>
      <InformationSubTitle type={typeExplorer}/>
      <div
        className='d-flex align-items-center'
        style={{ flexWrap: 'wrap', marginLeft: '1.5rem' }}
      >
        {isShow?.community && (
          <div
            className='basic-dropdown'
            style={{ marginRight: '10px', marginBottom: '10px' }}
          >
            <Dropdown>
              <Dropdown.Toggle
                variant='primary'
                className='cus-dropdown-select btn btn-primary light sharp'
              >
                        Community
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {detail &&
                          Object.keys(detail?.community).map(
                            (key) => {
                              return (
                                <React.Fragment key={key}>
                                  {detail?.community[key] !==
                                    '' && (
                                    <Dropdown.Item
                                      href={
                                        detail?.community[key]
                                      }
                                      key={key}
                                      className='crypto-tag-item-list-children-contract cus-dropdown-item'
                                      target='_blank'
                                    >
                                      {detail?.community[key] && (
                                        <>
                                          <span>
                                            {
                                              detail?.community[
                                                key
                                              ]?.split('/')[2]
                                            }
                                          </span>
                                          <LinkOutlined />
                                        </>
                                      )}
                                    </Dropdown.Item>
                                  )}
                                </React.Fragment>
                              )
                            }
                          )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {isShow?.sourceCode && (
          <div
            className='basic-dropdown'
            style={{ marginRight: '10px', marginBottom: '10px' }}
          >
            <Dropdown>
              <Dropdown.Toggle
                variant='primary'
                className='cus-dropdown-select btn btn-primary light sharp'
              >
                        Source Code
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {detail?.sourceCode &&
                          Object.keys(detail?.sourceCode)?.map(
                            (key) => {
                              return (
                                <React.Fragment key={key}>
                                  {detail?.sourceCode[key] !==
                                    '' && (
                                    <Dropdown.Item
                                      href={
                                        detail?.sourceCode[key]
                                      }
                                      key={key}
                                      className='crypto-tag-item-list-children-contract cus-dropdown-item'
                                      target='_blank'
                                    >
                                      {detail?.sourceCode[
                                        key
                                      ] && (
                                        <>
                                          {toCammelCase(key)}
                                          <LinkOutlined />
                                        </>
                                      )}
                                    </Dropdown.Item>
                                  )}
                                </React.Fragment>
                              )
                            }
                          )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {multichain && (
          <div
            className='basic-dropdown'
            style={{ marginRight: '10px', marginBottom: '10px' }}
          >
            <Dropdown>
              <Dropdown.Toggle
                variant='primary'
                className='cus-dropdown-select btn btn-primary light sharp'
              >
                        Contract
              </Dropdown.Toggle>
              <Dropdown.Menu className='cus-dropdown-menu'>
                {multichain?.map((item, index) => (
                  <Dropdown.Item
                    href={`${item?.exploreWebsite}${item?.path}${item?.address}`}
                    target='_blank'
                    key={index}
                    className='crypto-tag-item-list-children-contract'
                  >
                    <Image src={item?.image}
                      // preview={false}
                      alt='Website Logo'/>
                    <Tooltip title={toCammelCase(item?.chainName)}>
                      <h3
                        className='crypto-tag-item-list-children-contract-address product-name-text text-primary'
                        style={{ cursor: 'pointer' }}
                      >
                        {item?.address}
                      </h3>
                    </Tooltip>
                    <CopyOutlined
                      style={{ padding: '0, 1rem' }}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        copyAddress(e, item?.address, 'Copy address successfully!')
                      }}
                    />
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  </div>
}
