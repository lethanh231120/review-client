import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'

const ItemSoon = ({ item, itemSubmit, setOpenModalSearch, setItemSubmit, global }) => {
  const navigate = useNavigate()
  return (
    <Link
      to={`../../products/soon/${item?.soonId?.split('_')[2]}${item?.soonId?.split('_')[3] ? `/${item?.soonId?.split('_')[3]}` : ''}`}
      key={item?.soonId}
      className={`${
        itemSubmit?.soonId === item?.soonId
          ? 'hover'
          : ''
      } form-search-data-item`}
      onClick={() => {
        navigate(`../../products/soon/${item?.soonId?.split('_')[2]}${item?.soonId?.split('_')[3] ? `/${item?.soonId?.split('_')[3]}` : ''}`)
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
          </div>
          <div className='form-search-data-item-data-list'>
            {item?.roundType && (
              <div className='form-search-data-item-data-tag'>
                {item?.roundType}
              </div>
            )}
            {item?.blockchain && (
              <span className='form-search-data-item-data-content-list'>
                {item?.blockchain
                  ?.split(';')
                  ?.map((itemSoon) => (
                    <div
                      className='form-search-data-item-data-tag'
                      key={itemSoon}
                    >
                      {itemSoon}
                    </div>
                  ))}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ItemSoon
