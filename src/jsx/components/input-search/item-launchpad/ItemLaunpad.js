import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
import ProductImage, { altLaunchpad, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'

const ItemLaunch = ({ item, index, itemSubmit, setItemSubmit, global, setItemSearch, isFormReport, refInput }) => {
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
          setItemSearch(item)
        } else {
          navigate(`../../products/launchpad/${item?.launchPadId?.split('_')[2]}`)
          refInput.current.value = ''
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>
        <ProductImage
          imageUrl={item?.bigLogo || item?.smallLogo || item?.thumbLogo}
          productName={item?.name}
          altImageType={altLaunchpad}
          size={sizeImg48}
        />
        <div className='form-search-data-item-content'>
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
          </div>
          <div className='form-search-data-item-data-list'>
            {item?.avgRoiCurrent > 0 && (
              <div className='btn btn-primary light cus-btn cus-tag'>
                {item?.avgRoiCurrent
                  ?.toFixed(2)
                  .replace(
                    /\d(?=(\d{3})+\.)/g,
                    '$&,'
                  )}{' '}x
                      Current Roi
              </div>
            )}
          </div>
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
      </div>
    </Link>
  )
}

export default ItemLaunch
