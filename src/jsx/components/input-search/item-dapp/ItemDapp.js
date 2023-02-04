import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
const ItemDapp = ({ item, index, itemSubmit, setOpenModalSearch, setItemSubmit, global }) => {
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
        navigate(`../../products/dapp/${item?.dappId?.split('_')[2]}`)
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
            {item?.chainName && (
              <div className='form-search-data-item-data-tag'>
                {item?.chainName}
              </div>
            )}
            {item?.user24h > 0 && (
              <div className='form-search-data-item-data-tag'>
                {item?.user24h
                  ?.toFixed(2)
                  .replace(
                    /\d(?=(\d{3})+\.)/g,
                    '$&,'
                  )}{' '}
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
                    className='form-search-data-item-data-tag'
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
        <div className='form-search-data-item-data-content-tag'>
          {item?.category}
        </div>
      )}
    </Link>
  )
}

export default ItemDapp