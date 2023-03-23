import React from 'react'
import InformationSubTitle, { typeContract } from '../page-detail/InformationSubTitle'
import { CloseCircleOutlined, CheckCircleOutlined, ApartmentOutlined } from '@ant-design/icons'
import ShortItem from './../page-detail/ShortItem'

const InfoContractDetail = ({ detail, mainExplorer }) => {
  return <div className='crypto-info'>
    <div className=''>
      <InformationSubTitle type={typeContract}/>
      <div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' style={{ paddingLeft: '0' }}>
          { detail?.address
            ? <div className='col-xxl-12 col-12'>
              <div
                className='form-check custom-checkbox mb-3 checkbox-success'
                style={{ padding: '0', display: 'flex' }}
              > <ShortItem title={
                  <span>
                Address is:{' '}
                    <a className='text-primary txt-link text-break'
                      href={detail?.explorer || mainExplorer}
                      target='_blank'
                      rel='noreferrer'>{detail?.address}</a>
                  </span>
                } />
              </div>
            </div>
            : ''
          }

          {
            detail?.contractVerified !== null ? <div className='col-xxl-12 col-12'>
              <div
                className='form-check custom-checkbox mb-3 checkbox-success'
                style={{ padding: '0', display: 'flex' }}
              >
                { (detail?.contractVerified ? (<ShortItem
                  icon={
                    <>
                      <CheckCircleOutlined
                        style={{
                          color: 'green',
                          display: 'flex',
                          alignItems: 'center',
                          paddingRight: '0.3rem'
                        }}
                      />
                    </>
                  }
                  title={
                    <span>
                      {detail?.name} is a{' '}
                      <span className='text-primary'>verified contract</span>
                    </span>
                  }
                />
                ) : (
                  <>
                    <ShortItem
                      icon={
                        <>
                          <CloseCircleOutlined
                            style={{
                              color: 'red',
                              display: 'flex',
                              alignItems: 'center',
                              paddingRight: '0.3rem'
                            }}
                          />
                        </>
                      }
                      title={
                        <span>
                          {detail?.name} is not a{' '}
                          <span className='text-danger'>verified contract</span>
                        </span>
                      }
                    />

                  </>
                ))}
              </div>
            </div> : ''
          }

          {detail?.isProxy !== null ? <div className='col-xxl-12 col-12'>
            <div
              className='form-check custom-checkbox mb-3 checkbox-success'
              style={{ padding: '0', display: 'flex' }}
            >
              { (detail?.isProxy ? (<ShortItem
                icon={
                  <>
                    <ApartmentOutlined
                      style={{
                        color: 'red',
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '0.3rem'
                      }}
                    />
                  </>
                }
                title={
                  <span>
                    {detail?.name} is a{' '}
                    <span className='text-danger'>proxy contract</span>
                  </span>
                }
              />
              ) : (<ShortItem
                icon={
                  <>
                    <ApartmentOutlined
                      style={{
                        color: 'green',
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '0.3rem'
                      }}
                    />
                  </>
                }
                title={
                  <span>
                    {detail?.name} is not a{' '}
                    <span className='text-primary'>proxy contract</span>
                  </span>
                }
              />
              ))}
            </div>
          </div> : ''}
        </div>
      </div>
    </div>
  </div>
}

export default InfoContractDetail
