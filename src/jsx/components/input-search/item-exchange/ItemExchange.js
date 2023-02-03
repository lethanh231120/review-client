import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
const ItemExchange = ({ item, index, itemSubmit, setOpenModalSearch, setItemSubmit, global }) => {
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
      onClick={() => {
        navigate(`../../products/exchange/${item?.exchangeId?.split('_')[2]}`)
        if (setOpenModalSearch !== undefined) {
          setOpenModalSearch(false)
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>
        {item?.image ? (
          <Image src={item?.image} preview={false} />
        ) : (
          <span className='table-icon-coin-logo'>
            {item?.name?.slice(0, 3)?.toUpperCase()}
          </span>
        )}
        <div>
          <div className='form-search-data-item-data-content'>
            <div className='form-search-data-item-data-name'>
              {item?.name}
            </div>
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
              <div className='form-search-data-item-data-tag'>
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
              <div className='form-search-data-item-data-tag'>
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
