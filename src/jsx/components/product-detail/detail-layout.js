// import { scaleBand } from 'd3-scale'
import { Fragment } from 'react'
import FormReport from '../Forms/form-report/FormReport'
import ReviewItem from './review/review-item/ReviewItem'

export const DetailLayout = ({ Header, type, roundSale, portfolioOrChart, summary, more, about, scam, topDiscus, numberReviews, rest }) => {
  return <Fragment>
    <div className='row'>
      {/* detail header: icon, name, score */}
      <div className='col-lg-12'>
        <div className='profile card card-body px-3 pt-3 pb-0'>
          {Header}
        </div>
      </div>
    </div>
    {
      roundSale ? <div className='row'>
        {/* round sale:   */}
        <div className='col-lg-12'>
          <div className='profile card card-body px-3 pt-3 pb-0'>
            {roundSale}
          </div>
        </div>
      </div>
        : ''
    }

    {type === 'crypto'
      ? <>
        <div className='row'>
        </div>
        <div className='row'>
          <div className='col-xl-5'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='profile-statistics'>
                      {summary}
                    </div>
                  </div>
                </div>
              </div>
              {/* Total Scam, Total Reviews, Score */}
              <div className='col-lg-12'>
                {scam}
              </div>
              {/* Mores*/}
              <div className='col-lg-12'>
                <div className='card'>
                  {more}
                </div>
              </div>
              {/* About */}
              <div className='col-lg-12'>
                <div className='card'>
                  {about}
                </div>
              </div>
              <div className='col-lg-12'>
                {topDiscus}
              </div>
            </div>
          </div>
          <div className='col-xl-7'>
            {/* {coinChart} */}
            {portfolioOrChart && <div className='card'>
              {portfolioOrChart}
            </div>
            }
            {/* {report} */}
            {/* form report */}
            <div className='product-detail' id='comment'>
              <FormReport
                // use in filter review
                isFormReport={true}
                numberReviews={numberReviews}
                rest={rest}
              />
              {(rest?.dataFilter)?.reviews?.map((item) => (
                <ReviewItem
                  key={item?.review?.id}
                  data={item}
                  productId={rest?.productId}
                />
              ))}
            </div>
          </div>
        </div></>
      : <>
        {/* DAPP, EXCHANGE, VENTURE, SOON */}

        <div className='row'>
          <div className='col-5'>
            <div className='card'>
              <div className='card-body'>
                <div className='profile-statistics'>
                  {summary}
                </div>
              </div>
            </div>

            {/* Total Scam, Total Reviews, Score */}
            <div className='col-lg-12'>
              {scam}
            </div>

            {/* More */}
            <div className='card'>
              {more}
            </div>

            {/* About */}
            <div className='card'>
              {about}
            </div>
          </div>

          {/* Comments */}
          <div className='col-7'>
            <div className='product-detail' id='comment'>
              <FormReport
              // use in filter review
                isFormReport={true}
                numberReviews={numberReviews}
                rest={rest}
              />
              {(rest?.dataFilter)?.reviews?.map((item) => (
                <ReviewItem
                  key={item?.review?.id}
                  data={item}
                  productId={rest?.productId}
                />
              ))}
            </div>
          </div>
        </div>

      </>}

  </Fragment>
}
