import React from 'react'
import InformationSubTitle, { typeAvailable } from '../page-detail/InformationSubTitle'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import ShortItem from './../page-detail/ShortItem'

const InfoAvailableDetail = ({ detail }) => {
  return <div className='crypto-info'>
    <div className=''>
      <InformationSubTitle type={typeAvailable}/>
      <div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' style={{ paddingLeft: '0' }}>
          { detail?.isCoinmarketcap !== null ? <div className='col-xxl-12 col-12'>
            <div
              className='form-check custom-checkbox mb-3 checkbox-success'
              style={{ padding: '0', display: 'flex' }}
            >
              { (detail?.isCoinmarketcap ? (
                <ShortItem
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
                      {detail?.name} are existing on{' '}
                      <span className='text-primary'>Coinmarketcap</span>
                    </span>
                  }
                />
              ) : (<ShortItem
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
                    {detail?.name} are not existing on{' '}
                    <span className='text-danger'>Coinmarketcap</span>
                  </span>
                }
              />
              ))}
            </div>
          </div> : ''
          }

          {detail?.isCoingecko !== null ? <div className='col-xxl-12 col-12'>
            <div
              className='form-check custom-checkbox mb-3 checkbox-success'
              style={{ padding: '0', display: 'flex' }}
            >
              { (detail?.isCoingecko ? (<ShortItem
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
                    {detail?.name} are existing on{' '}
                    <span className='text-primary'>Coingecko</span>
                  </span>
                }
              />
              ) : (<ShortItem
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
                    {detail?.name} are not existing on{' '}
                    <span className='text-danger'>Coingecko</span>
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

export default InfoAvailableDetail
