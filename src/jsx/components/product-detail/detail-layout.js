// import { scaleBand } from 'd3-scale'
import { useEffect } from 'react'
import FormReport from '../Forms/form-report/FormReport'
import ReviewItem from './review/review-item/ReviewItem'
import { Pagination } from 'antd'
import { SOON, CRYPTO, VENTURE, LAUNCHPAD } from '../../constants/category'

export const DetailLayout = (props) => {
  const { Header, type, roundSale, portfolioOrChartOrDesc, timeAndPercentProcess, summary, more, about, scam, exchange, topDiscus, similar, rest, setTop, productInfo } = props
  const PAGE_SIZE = 50

  const getPosition = () => {
    const top = document.getElementById('div2')?.offsetTop
    rest?.setOffsetTopByListComment && rest?.setOffsetTopByListComment(top - 150)
  }

  useEffect(() => {
    window.addEventListener('load', getPosition)
  }, [])

  // useEffect(() => {
  //   window.addEventListener('mouseover', getPosition)
  // }, [])

  return <>
    <div className='row'>
      {/* detail header: icon, name, score */}
      <div className='col-lg-12'>
        <div className='profile card card-body'>
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

    {type === CRYPTO || type === VENTURE || type === LAUNCHPAD || type === SOON
      ? <>
        <div className='row'>
          <div className='col-xl-5'>
            <div className='row'>
              {type === SOON && (timeAndPercentProcess && <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='profile-statistics'>
                      {timeAndPercentProcess}
                    </div>
                  </div>
                </div>
              </div>)}

              {summary && <div className='col-lg-12'>
                <div className='card'>
                  <div className='card-body'>
                    <div className='profile-statistics'>
                      {summary}
                    </div>
                  </div>
                </div>
              </div>}

              {/* Total Scam, Total Reviews, Score */}
              {scam && <div className='col-lg-12'>
                {scam}
              </div>}

              {/* Mores*/}
              {more && <div className='col-lg-12'>
                <div className='card'>
                  {more}
                </div>
              </div>}

              {/* trading on */}
              {exchange && <div className='col-lg-12'>
                <div className='card'>
                  {exchange}
                </div>
              </div>}

              {/* About */}
              {about && <div className='col-lg-12'>
                <div className='card'>
                  {about}
                </div>
              </div>}

              <div className='col-lg-12'>
                {topDiscus}
              </div>

              {/* similar*/}
              {similar && <div className='col-lg-12 mt-4'>
                <div className='card'>
                  {similar}
                </div>
              </div>}
            </div>
          </div>
          <div className='col-xl-7'>
            {portfolioOrChartOrDesc && <div className='card cus-margin-top'>
              {portfolioOrChartOrDesc}
            </div>}
            {/* form report */}
            <div className='product-detail' id='comment'>
              <FormReport
                // use in filter review
                isFormReport={true}
                numberReviews={rest?.totalReviews}
                rest={rest}
                setTop={setTop}
                productInfo={productInfo}
              />
              <div id='div2'>
                {rest?.reviews && rest?.reviews?.map((item, index) => (
                  <ReviewItem
                    index={index}
                    key={item?.id}
                    data={item}
                    reviews={rest?.reviews}
                    setReviews={rest?.setReviews}
                    setCurrentReview={rest?.setCurrentReview}
                    curentReview={rest?.curentReview}
                    productId={rest?.productId}
                  />
                ))}
              </div>
              <div className='category-paginate cus-category-paginate'>
                {rest?.totalReviews > PAGE_SIZE && (
                  <Pagination
                    total= {rest?.totalReviews}
                    current={rest?.defaultFilter?.page}
                    pageSize={PAGE_SIZE}
                    showSizeChanger={false}
                    onChange={(value) => rest?.setDefaultFilter({
                      ...rest.defaultFilter,
                      page: value
                    })}
                  />
                )}
              </div>
            </div>
          </div>
        </div></>
      : <>
        {/* DAPP, EXCHANGE, VENTURE, SOON */}
        <div className='row'>
          <div className='col-xl-5'>
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

            <div className='col-lg-12'>
              {topDiscus}
            </div>

            {/* similar*/}
            {similar && <div className='col-lg-12 mt-4'>
              <div className='card'>
                {similar}
              </div>
            </div>}
          </div>

          {/* Comments */}
          <div className='col-xl-7'>
            <div className='product-detail' id='comment'>
              <FormReport
              // use in filter review
                isFormReport={true}
                numberReviews={rest?.totalReviews}
                rest={rest}
                setTop={setTop}
                productInfo={productInfo}
              />
              <div id='div2'>
                {rest?.reviews && rest?.reviews?.map((item, index) => (
                  <ReviewItem
                    index={index}
                    key={item?.id}
                    data={item}
                    reviews={rest?.reviews}
                    setReviews={rest?.setReviews}
                    productId={rest?.productId}
                    setCurrentReview={rest?.setCurrentReview}
                    curentReview={rest?.curentReview}
                  />
                ))}
              </div>
              <div className='category-paginate cus-category-paginate'>
                {rest?.totalReviews > PAGE_SIZE && (
                  <Pagination
                    total= {rest?.totalReviews}
                    current={rest?.defaultFilter?.page}
                    pageSize={PAGE_SIZE}
                    showSizeChanger={false}
                    onChange={(value) => rest?.setDefaultFilter({
                      ...rest.defaultFilter,
                      page: value
                    })}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

      </>}

  </>
}
