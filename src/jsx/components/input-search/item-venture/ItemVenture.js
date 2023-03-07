import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageVenture from '../../../../images/absent_image_venture.png'
import NoImage from '../../common-widgets/no-image/NoImage'
import { absentImageElasticSearch } from '../item-crypto/ItemCrypto'

const ItemVenture = ({ item, index, itemSubmit, setItemSubmit, global, setItemSearch, isFormReport, refInput }) => {
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
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        if (isFormReport) {
          setItemSearch(item)
        } else {
          navigate(`../../products/venture/${item?.ventureId?.split('_')[2]}`)
          refInput.current.value = ''
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>
        {(item?.ventureId && item?.image && item?.image !== absentImageElasticSearch) ? (
          <Image src={isValidProductId(item?.ventureId) ? formatImgUrlFromProductId(item?.ventureId) : imgAbsentImageVenture} preview={false} alt='Venture Logo'/>
        )
          : (
            <NoImage
              alt={item?.name?.slice(0, 3)}
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
