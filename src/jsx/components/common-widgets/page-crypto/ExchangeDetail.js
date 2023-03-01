import React from 'react'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { formatUrlDetailFromUrlImageExchange, getExchangeNameFromUrlImageExchage } from './../../../../utils/formatText'

export const ExchangeDetail = ({ coinName, exchangeList }) => {
  const navigate = useNavigate()

  const handleClickExchange = (e, item) => {
    e.stopPropagation()
    e.preventDefault()
    const urlDetail = formatUrlDetailFromUrlImageExchange(item)
    navigate(`../../../../../${urlDetail}`)
  }

  return coinName && !_.isEmpty(exchangeList) ? <div className='crypto-info'>
    <div>
      <div className='crypto-info-item-key'>Exchange(s): </div>
      <div className='row mt-3'>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
          <div
            className='form-check custom-checkbox mb-3 checkbox-success'
            style={{ padding: '0' }}
          >
            <>
              {exchangeList?.map((itemImageUrl, index) => (
                <>
                  <div style={{ display: 'block' }}>
                    {`${coinName} is existing on `}
                    <div key={index} style={{ margin: '0.3rem 0.3rem 0 0', display: 'inline-block' }} className='mb-0 btn btn-primary light btn-xs mb-2 me-1' onClick={(e) => { handleClickExchange(e, itemImageUrl) } }>
                      <img src={itemImageUrl} height={24} width={24} alt='Exchange Logo'/>
                      &nbsp;&nbsp;
                      {getExchangeNameFromUrlImageExchage(itemImageUrl)}
                    </div>
                  </div>
                </>
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  </div> : ''
}
