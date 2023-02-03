import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'

const ItemCrypto = ({ item, index, itemSubmit, setOpenModalSearch, setItemSubmit, global }) => {
  const navigate = useNavigate()
  return (
    <Link
      to={`../../products/crypto/${item?.cryptoId?.split('_')[1]}/${item?.cryptoId?.split('_')[2]}/${item?.cryptoId?.split('_')[1] === 'token' ? item?.cryptoId?.split('_')[3] : ''}`}
      key={index}
      className={`${
        itemSubmit?.cryptoId === item?.cryptoId
          ? 'hover'
          : ''
      } form-search-data-item`}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate(`../../products/crypto/${item?.cryptoId?.split('_')[1]}/${item?.cryptoId?.split('_')[2]}/${item?.cryptoId?.split('_')[1] === 'token' ? item?.cryptoId?.split('_')[3] : ''}`)
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
            <div className='form-search-data-item-data-symbol'>
                        ({item?.symbol})
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
            {item?.addressShow && (
              <div className='form-search-data-item-data-address'>
                {item?.addressShow}
              </div>
            )}
          </div>
          {item?.chainname && (
            <div className='form-search-data-item-data-tag'>
              {item?.chainname}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ItemCrypto
