import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'
import NoImage from './../../common-widgets/no-image/NoImage'

const ItemCrypto = ({ item, index, itemSubmit, setItemSubmit, global, setItem, isFormReport, refInput }) => {
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
        if (isFormReport) {
          setItem(item)
        } else {
          navigate(`../../products/crypto/${item?.cryptoId?.split('_')[1]}/${item?.cryptoId?.split('_')[2]}/${item?.cryptoId?.split('_')[1] === 'token' ? item?.cryptoId?.split('_')[3] : ''}`)
          refInput.current.value = ''
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>
        {item?.cryptoId && item?.image ? (
          <Image src={isValidProductId(item?.cryptoId) ? formatImgUrlFromProductId(item?.cryptoId) : imgAbsentImageCrypto} preview={false} />
        ) : (
          (
            <NoImage
              alt={item?.name?.slice(0, 3)?.toUpperCase()}
              height={48}
              width={48}
            />
          )
        )}
        <div>
          <div className='form-search-data-item-data-content'>
            <h6 className='cus-h6'>{item?.name}</h6>
            <h6 className='cus-h6'>({item?.symbol})</h6>
            {item?.isScam ? (
              <Image src={scam} preview={false} />
            ) : item?.isWarning ? (
              <Image src={warning} preview={false} />
            ) : (
              ''
            )}
          </div>
          {/* <div className='form-search-data-item-data-list'> */}
          {item?.addressShow && (<p className='cus-p'>{item?.addressShow}</p>)}
          {/* </div> */}
          {item?.chainname && (
            // <div className='form-search-data-item-data-tag'>
            //   {item?.chainname}
            // </div>
            <div className='btn btn-primary light cus-btn'>
              {item?.chainname}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ItemCrypto
