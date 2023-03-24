import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Image } from 'antd'
import scam from '../../../../images/product/scam.png'
import warning from '../../../../images/product/warning.png'
import ProductImage, { altDApp, sizeImg48 } from '../../common-widgets/page-detail/ProductImage'

const ItemDapp = ({ item, index, itemSubmit, setItemSubmit, global, setItemSearch, isFormReport, refInput }) => {
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
        e.stopPropagation()
        e.preventDefault()
        if (isFormReport) {
          setItemSearch(item)
        } else {
          navigate(`../../products/dapp/${item?.dappId?.split('_')[2]}`)
          refInput.current.value = ''
        }
      }}
      onMouseEnter={() => global ? setItemSubmit(item) : ''}
    >
      <div className='form-search-data-item-data'>
        <ProductImage
          imageUrl={item?.image}
          productName={item?.name}
          altImageType={altDApp}
          size={sizeImg48}
        />
        <div className='form-search-data-item-content'>
          <div className='form-search-data-item-data-content'>
            <h6 className='cus-h6'>
              {item?.name}
            </h6>
            {item?.isScam ? (
              <Image src={scam} preview={false} alt='Scam'/>
            ) : item?.isWarning ? (
              <Image src={warning} preview={false} alt='Warning'/>
            ) : (
              ''
            )}
          </div>
          <div className='form-search-data-item-data-list'>
            {item?.chainName && (
              <div className='btn btn-primary light cus-btn'>
                {item?.chainName}
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
      {item?.category && (
        <div className='btn btn-primary light cus-btn-primary'>
          {item?.category}
        </div>
      )}
    </Link>
  )
}

export default ItemDapp
