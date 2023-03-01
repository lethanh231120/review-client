import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageDapp from '../../../../images/absent_image_dapp.png'
import { formatLargeNumber } from '../../../../utils/formatNumber'
import NoImage from '../../common-widgets/no-image/NoImage'

const ItemDapp = ({ item, index, itemSubmit, setItemSubmit, global, setItem, isFormReport, refInput }) => {
  const navigate = useNavigate()
  return (
    <Link
      to={`../../products/dapp/${item?.dappId?.split('_')[2]}`}
      key={index}
      className={`${
        itemSubmit?.dappId === item?.dappId
          ? 'hover'
          : ''
      } form-search-data-item`}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        if (isFormReport) {
          setItem(item)
        } else {
          navigate(`../../products/dapp/${item?.dappId?.split('_')[2]}`)
          refInput.current.value = ''
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>
        {item?.dappId && item?.image ? (
          <Image src={isValidProductId(item?.dappId) ? formatImgUrlFromProductId(item?.dappId) : imgAbsentImageDapp} preview={false} alt='DApp Logo'/>
        )
          : (
            <NoImage
              alt={item?.name?.slice(0, 3)?.toUpperCase()}
              height={48}
              width={48}
            />
          )
        }
        <div className='form-search-data-item-content'>
          <div className='form-search-data-item-data-content'>
            <h6 className='cus-h6'>
              {item?.name}
            </h6>
            {item?.isScam ? (
              <Image src={scam} preview={false} alt='Scam'/>
            ) : item?.isWarning ? (
              <Image src={warning} preview={false} alt='Warning'/>
            ) : (
              ''
            )}
          </div>
          <div className='form-search-data-item-data-list'>
            {item?.chainName && (
              <div className='btn btn-primary light cus-btn'>
                {item?.chainName}
              </div>
            )}
            {item?.user24h > 0 && (
              <div className='btn btn-primary light cus-btn'>
                {formatLargeNumber(item?.user24h)}{' '}
                            User 24H
              </div>
            )}
          </div>
          {item?.chains && (
            <span className='form-search-data-item-data-content-list'>
              {item?.chains
                ?.split(',')
                ?.map((itemChain) => (
                  <div
                    className='btn btn-primary light cus-btn mr-2'
                    key={itemChain}
                  >
                    {itemChain}
                  </div>
                ))}
            </span>
          )}
        </div>
      </div>
      {item?.category && (
        <div className='btn btn-primary light cus-btn'>
          {item?.category}
        </div>
      )}
    </Link>
  )
}

export default ItemDapp
