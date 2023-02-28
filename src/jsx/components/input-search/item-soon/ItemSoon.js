import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageSoon from '../../../../images/absent_image_soon.png'
import NoImage from './../../common-widgets/no-image/NoImage'

const ItemSoon = ({ item, itemSubmit, setItemSubmit, global, setItem, isFormReport, refInput }) => {
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
          setItem(item)
        } else {
          navigate(`../../products/soon/${item?.soonId?.split('_')[2]}${item?.soonId?.split('_')[3] ? `/${item?.soonId?.split('_')[3]}` : ''}`)
          refInput.current.value = ''
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>
        {item?.soonId && item?.image ? (
          <Image src={isValidProductId(item?.soonId) ? formatImgUrlFromProductId(item?.soonId) : imgAbsentImageSoon} preview={false} />
        )
          : (
            <NoImage
              alt={item?.name?.slice(0, 3)}
              height={48}
              width={48}
            />
          )}
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
