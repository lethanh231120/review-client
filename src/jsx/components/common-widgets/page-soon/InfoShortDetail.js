import React from 'react'
import _ from 'lodash'
import InformationSubTitle, { typeShort } from '../page-detail/InformationSubTitle'
import ShortItem from '../page-detail/ShortItem'
import ShortItemScamWarning, { typeReview, typeScamReport } from '../page-detail/ShortItemScamWarning'

export const InfoShortDetail = ({ itemDetail }) => {
  return itemDetail?.projectName && (itemDetail?.roundType || !_.isEmpty(itemDetail?.blockchain || itemDetail?.acceptCurrency || itemDetail?.type || (itemDetail?.totalIsScam || itemDetail?.totalIsScam === 0) || (itemDetail?.totalReviews || itemDetail?.totalReviews === 0)))
    ? <div className='profile-blog mb-4'>
      <InformationSubTitle type={typeShort}/>
      {
        itemDetail?.type &&
          <ShortItem
            title={`${itemDetail?.projectName}'s token type:`}
            content={itemDetail?.type}
          />
      }
      {
        itemDetail?.roundType &&
          <ShortItem
            title={`${itemDetail?.projectName}'s current round:`}
            content={itemDetail?.roundType}
          />
      }
      {
        itemDetail?.acceptCurrency &&
          <ShortItem
            title={`${itemDetail?.projectName} is exchanged in currencies:`}
            content={itemDetail?.acceptCurrency?.split(',')?.map((keyName, index) => (
              <span className='text-primary fs-16 text-uppercase' key={index}>
                <b>{keyName}</b>
                {/* last element in array */}
                {index >= (itemDetail?.acceptCurrency?.split(',')?.length - 1) ? '' : <>,&nbsp;</>}
              </span>
            ))}
          />
      }

      {
        !_.isEmpty(itemDetail?.blockchain) &&
          <ShortItem
            title={`${itemDetail?.projectName} lives on blockchains:`}
            content={Object.keys(itemDetail?.blockchain)?.map((keyName, index) => (
              <span className='text-primary fs-16 text-capitalize' key={index}>
                <b>{keyName}</b>
                {/* last element in array */}
                {index >= (Object.keys(itemDetail?.blockchain)?.length - 1) ? '' : <>,&nbsp;</>}
              </span>
            ))}
          />
      }

      {
      // check like this cus && don't pass zero
        (itemDetail?.totalIsScam || itemDetail?.totalIsScam === 0)
          ? <ShortItemScamWarning
            type={typeScamReport}
            projectName={itemDetail?.projectName}
            total={itemDetail?.totalIsScam}
          />
          : ''
      }

      {
      // check like this cus && don't pass zero
        (itemDetail?.totalReviews || itemDetail?.totalReviews === 0)
          ? <ShortItemScamWarning
            type={typeReview}
            projectName={itemDetail?.projectName}
            total={itemDetail?.totalReviews}
          />
          : ''
      }

    </div> : ''
}
