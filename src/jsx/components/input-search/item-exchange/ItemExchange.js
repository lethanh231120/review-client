import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageExchange from '../../../../images/absent_image_exchange.png'
import NoImage from '../../common-widgets/no-image/NoImage'

const ItemExchange = ({ item, index, itemSubmit, setItemSubmit, global, setItem, isFormReport, refInput }) => {
  const navigate = useNavigate()
  return (
    <Link
      to={`../../products/exchange/${item?.exchangeId?.split('_')[2]}`}
      key={index}
      className={`${
        itemSubmit?.exchangeId === item?.exchangeId
          ? 'hover'
          : ''
      } form-search-data-item`}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        if (isFormReport) {
          setItem(item)
        } else {
          navigate(`../../products/exchange/${item?.exchangeId?.split('_')[2]}`)
          refInput.current.value = ''
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>

        {item?.exchangeId ? (
          <Image src={isValidProductId(item?.exchangeId) ? formatImgUrlFromProductId(item?.exchangeId) : imgAbsentImageExchange} preview={false} />
        )
          : (
            <NoImage
              alt={item?.name?.slice(0, 3)?.toUpperCase()}
              height={48}
              width={48}
            />
          )
        }
        <div>
          <div className='form-search-data-item-data-content'>
            <h6 className='cus-h6'>
              {item?.name}
            </h6>
            {item?.isScam ? (
              <Image src={scam} preview={false} />
            ) : item?.isWarning ? (
              <Image src={warning} preview={false} />
            ) : (
              ''
            )}
          </div>
          <div className='form-search-data-item-data-list'>
            {item?.volume7d > 0 && (
              <div className='btn btn-primary light cus-btn cus-tag'>
                {item?.volume7d
                  ?.toFixed(2)
                  .replace(
                    /\d(?=(\d{3})+\.)/g,
                    '$&,'
                  )}{' '}
                    Volume 7D
              </div>
            )}
            {item?.category && (
              <div className='btn btn-primary light cus-btn'>
                {item?.category}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ItemExchange
