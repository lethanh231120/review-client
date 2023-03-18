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
        <div className='mb-3 col-12' >
          <ShortItem
            title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>{itemDetail?.projectName}&apos;s token type</h3>:&nbsp;
              <span className='text-primary'>
                <b>{itemDetail?.type}</b>
              </span>
            </>
            }
          />
        </div>
      }
      {
        itemDetail?.roundType &&
        <div className='mb-3 col-12' >
          <ShortItem
            title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>{itemDetail?.projectName}&apos;s current round</h3>:&nbsp;
              <span className='text-primary'>
                <b>{itemDetail?.roundType}</b>
              </span>
            </>
            }
          />
        </div>
      }
      {
        itemDetail?.acceptCurrency &&
        <div className='mb-3 col-12' >
          <ShortItem
            title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>{itemDetail?.projectName} is exchanged in currencies</h3>:&nbsp;
              <span className='text-primary'>
                <b>{itemDetail?.acceptCurrency?.split(',')?.map((keyName, index) => (
                  <span className='text-primary fs-16 text-uppercase' key={index}>
                    <b>{keyName}</b>
                    {/* last element in array */}
                    {index >= (itemDetail?.acceptCurrency?.split(',')?.length - 1) ? '' : <>,&nbsp;</>}
                  </span>
                ))}</b>
              </span>
            </>
            }
          />
        </div>
      }

      {
        !_.isEmpty(itemDetail?.blockchain) &&
        <div className='mb-3 col-12' >
          <ShortItem
            title={<><h3 className='fs-16 mb-0' style={{ color: '#A098AE' }}>{itemDetail?.projectName} lives on blockchains</h3>:&nbsp;
              <span className='text-primary'>
                <b>{Object.keys(itemDetail?.blockchain)?.map((keyName, index) => (
                  <span className='text-primary fs-16 text-capitalize' key={index}>
                    <b>{keyName}</b>
                    {/* last element in array */}
                    {index >= (Object.keys(itemDetail?.blockchain)?.length - 1) ? '' : <>,&nbsp;</>}
                  </span>
                ))}</b>
              </span>
            </>
            }
          />
        </div>
      }

      {
      // check like this cus && don't pass zero
        (itemDetail?.totalIsScam || itemDetail?.totalIsScam === 0)
          ? <div className='mb-3 col-12' >
            <ShortItemScamWarning
              type={typeScamReport}
              projectName={itemDetail?.projectName}
              total={itemDetail?.totalIsScam}
            />
          </div>
          : ''
      }

      {
      // check like this cus && don't pass zero
        (itemDetail?.totalReviews || itemDetail?.totalReviews === 0)
          ? <div className='mb-3 col-12' >
            <ShortItemScamWarning
              type={typeReview}
              projectName={itemDetail?.projectName}
              total={itemDetail?.totalReviews}
            />
          </div>
          : ''
      }

    </div> : ''
}
