import React from 'react'
import InformationSubTitle, { typeContract } from '../page-detail/InformationSubTitle'
import { CloseCircleOutlined, CheckCircleOutlined, ApartmentOutlined } from '@ant-design/icons'

const InfoContractDetail = ({ detail }) => {
  return <div className='crypto-info'>
    <div className=''>
      <InformationSubTitle type={typeContract}/>
      <div className='row' style={{ marginLeft: '1.5rem' }}>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' style={{ paddingLeft: '0' }}>
          {
            detail?.contractVerified !== null ? <div className='col-xxl-12 col-12'>
              <div
                className='form-check custom-checkbox mb-3 checkbox-success'
                style={{ padding: '0', display: 'flex' }}
              >
                { (detail?.contractVerified ? (
                  <>
                    <CheckCircleOutlined
                      style={{
                        color: 'green',
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '0.3rem'
                      }}
                    />
                    <span>
                      {detail?.name} is a{' '}
                      <span className='text-primary'>verified contract</span>
                    </span>
                  </>
                ) : (
                  <>
                    <CloseCircleOutlined
                      style={{
                        color: 'red',
                        display: 'flex',
                        alignItems: 'center',
                        paddingRight: '0.3rem'
                      }}
                    />
                    <span>
                      {detail?.name} is not a{' '}
                      <span className='text-danger'>verified contract</span>
                    </span>
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
              { (detail?.isProxy ? (
                <>
                  <ApartmentOutlined
                    style={{
                      color: 'red',
                      display: 'flex',
                      alignItems: 'center',
                      paddingRight: '0.3rem'
                    }}
                  />
                  <span>
                    {detail?.name} is a{' '}
                    <span className='text-danger'>proxy contract</span>
                  </span>
                </>
              ) : (
                <>
                  <ApartmentOutlined
                    style={{
                      color: 'green',
                      display: 'flex',
                      alignItems: 'center',
                      paddingRight: '0.3rem'
                    }}
                  />
                  <span>
                    {detail?.name} is not a{' '}
                    <span className='text-primary'>proxy contract</span>
                  </span>
                </>
              ))}
            </div>
          </div> : ''}
        </div>
      </div>
    </div>
  </div>
}

export default InfoContractDetail
