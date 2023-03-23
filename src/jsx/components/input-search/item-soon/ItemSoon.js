import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductImage, { altSoon, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'

const ItemSoon = ({ item, itemSubmit, setItemSubmit, global, setItemSearch, isFormReport, refInput }) => {
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
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        if (isFormReport) {
          setItemSearch(item)
        } else {
          navigate(`../../products/soon/${item?.soonId?.split('_')[2]}${item?.soonId?.split('_')[3] ? `/${item?.soonId?.split('_')[3]}` : ''}`)
          refInput.current.value = ''
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>
        <ProductImage
          imageUrl={item?.image}
          productName={item?.symbol || item?.name}
          altImageType={altSoon}
          size={sizeImg48}
        />
        <div>
          <div className='form-search-data-item-data-content'>
            <h6 className='cus-h6'>{item?.name}</h6>
            {item?.symbol && (
              <h6 className='cus-h6'>({item?.symbol})</h6>
            )}
          </div>
          <div className='form-search-data-item-data-list'>
            {item?.roundType && (
              <div className='btn btn-primary light cus-btn cus-tag'>
                {item?.roundType}
              </div>
            )}
            {item?.blockchain && (
              <span className='form-search-data-item-data-content-list'>
                {item?.blockchain
                  ?.split(';')
                  ?.map((itemSoon) => (
                    <div
                      className='btn btn-primary light cus-btn cus-tag'
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
