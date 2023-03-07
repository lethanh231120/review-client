import React from 'react'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { formatUrlDetailFromUrlImageExchange, getExchangeNameFromUrlImageExchage } from './../../../../utils/formatText'
import InformationSubTitle from '../page-detail/InformationSubTitle'
import { typeExchange } from './../page-detail/InformationSubTitle'
import ShortItem from './../page-detail/ShortItem'

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
      <InformationSubTitle type={typeExchange}/>
      <div className=''>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12' style={{ paddingLeft: '0' }}>
          <div
            className='form-check custom-checkbox mb-3 checkbox-success'
            style={{ padding: '0' }}
          >
            <>
              {exchangeList?.map((itemImageUrl, index) => (<div key={index} style={{ margin: '0.3rem 0.3rem 0 0', display: 'block' }}
                className='mb-3'
              >
                <ShortItem
                  title={<>
                    {coinName} are existing on
                    &nbsp;
                    <img src={itemImageUrl} height={18} width={18} alt='Exchange Logo' style={{ borderRadius: '2rem' }}/>
                      &nbsp;
                    <span onClick={(e) => { handleClickExchange(e, itemImageUrl) } }
                      className='text-primary txt-link'
                    >
                      {getExchangeNameFromUrlImageExchage(itemImageUrl)}
                    </span>
                  </>}
                />
              </div>
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  </div> : ''
}
