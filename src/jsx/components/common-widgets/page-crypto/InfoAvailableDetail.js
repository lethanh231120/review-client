import React from 'react'
// import InformationSubTitle, { typeAvailable } from '../page-detail/InformationSubTitle'
// import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
// import ShortItem from './../page-detail/ShortItem'

const InfoAvailableDetail = ({ detail }) => {
  // return <div className='crypto-info'>
  return <span className='crypto-info'>
    {/* <div className=''> */}
    {/* <InformationSubTitle type={typeAvailable}/> */}
    {/* <div>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' style={{ paddingLeft: '0' }}> */}
    {(detail?.isCoinmarketcap !== null || detail?.isCoingecko)
      ? <div className='col-xxl-12 col-12'>
        <h3 className='fs-16 mb-0' style={{ display: 'inline', color: '#A098AE' }}>
          {detail?.name} is listed on
          {detail?.isCoinmarketcap ? <span className='text-primary'> Coinmarketcap</span> : ''}
          {detail?.isCoingecko ? <span className='text-primary'>, Coingecko</span> : ''}
        </h3>
        {/* <div
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
                      <h3 className='fs-16 mb-0' style={{ display: 'inline', color: '#A098AE' }}>
                        {detail?.name} are existing on <span className='text-primary'>Coinmarketcap</span>
                      </h3>
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
                    <h3 className='fs-16 mb-0' style={{ display: 'inline', color: '#A098AE' }}>
                      {detail?.name} are not existing on <span className='text-danger'>Coinmarketcap</span>
                    </h3>
                  }
                />
                ))}
              </div> */}
      </div> : ''
    }

    {/* {detail?.isCoingecko !== null ? <div className='col-xxl-12 col-12'>
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
                  <h3 className='fs-16 mb-0' style={{ display: 'inline', color: '#A098AE' }}>
                    {detail?.name} are existing on <span className='text-primary'>Coingecko</span>
                  </h3>
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
                  <h3 className='fs-16 mb-0' style={{ display: 'inline', color: '#A098AE' }}>
                    {detail?.name} are not existing on <span className='text-danger'>Coingecko</span>
                  </h3>
                }
              />
              ))}
            </div>
          </div> : ''} */}
    {/* </div>
      </div> */}
    {/* </div> */}
  </span>
}

export default InfoAvailableDetail
