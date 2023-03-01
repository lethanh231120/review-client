import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
import { isValidProductId, formatImgUrlFromProductId } from '../../../../utils/formatText'
import imgAbsentImageCrypto from '../../../../images/absent_image_crypto.png'
import NoImage from '../../common-widgets/no-image/NoImage'

const ItemLaunch = ({ item, index, itemSubmit, setItemSubmit, global, setItem, isFormReport, refInput }) => {
  const navigate = useNavigate()
  return (
    <Link
      to={`../../products/launchpad/${item?.launchPadId?.split('_')[2]}`}
      key={index}
      className={`${
        itemSubmit?.launchPadId === item?.launchPadId
          ? 'hover'
          : ''
      } form-search-data-item`}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        if (isFormReport) {
          setItem(item)
        } else {
          navigate(`../../products/launchpad/${item?.launchPadId?.split('_')[2]}`)
          refInput.current.value = ''
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>
        {item?.launchPadId && item?.image ? (
          <Image src={isValidProductId(item?.launchPadId) ? formatImgUrlFromProductId(item?.launchPadId) : imgAbsentImageCrypto} preview={false} alt='Launchpad Logo'/>
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
            <div className='form-search-data-item-data-content-name'>
              <h6 className='cus-h6'>{item?.name}</h6>
              {item?.symbol && (
                <h6 className='cus-h6'>({item?.symbol})</h6>
              )}
            </div>
            {item?.isScam ? (
              <Image src={scam} preview={false} alt='Scam'/>
            ) : item?.isWarning ? (
              <Image src={warning} preview={false} alt='Warning'/>
            ) : (
              ''
            )}
            {item?.chains && (
              <span className='form-search-data-item-data-content-list'>
                {item?.chains
                  ?.split(',')
                  ?.map((itemChain) => (
                    <div
                      className='btn btn-primary light cus-btn mr-2'
                      key={itemChain}
                    >
                      {itemChain}
                    </div>
                  ))}
              </span>
            )}
          </div>
          <div className='form-search-data-item-data-list'>
            {item?.marketCap > 0 && (
              <div className='btn btn-primary light cus-btn cus-tag'>
                {item?.marketCap
                  ?.toFixed(2)
                  .replace(
                    /\d(?=(\d{3})+\.)/g,
                    '$&,'
                  )}{' '}
                    Market cap
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ItemLaunch
