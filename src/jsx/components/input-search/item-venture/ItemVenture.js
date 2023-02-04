import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'

const ItemVenture = ({ item, index, itemSubmit, setOpenModalSearch, setItemSubmit, global }) => {
  const navigate = useNavigate()
  return (
    <Link
      to={`../../products/venture/${item?.ventureId?.split('_')[2]}`}
      key={index}
      className={`${
        itemSubmit?.ventureId === item?.ventureId
          ? 'hover'
          : ''
      } form-search-data-item`}
      onClick={() => {
        navigate(`../../products/venture/${item?.ventureId?.split('_')[2]}`)
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
            <h6 className='cus-h6'>
              {item?.name}
            </h6>
          </div>
          {item?.location && (
            <span className='form-search-data-item-data-content-list'>
              <div className='btn btn-primary light cus-btn'>
                {item?.location}
              </div>
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ItemVenture
