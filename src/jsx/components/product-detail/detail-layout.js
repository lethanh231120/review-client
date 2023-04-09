// import { scaleBand } from 'd3-scale'
import { useEffect } from 'react'
import FormReport from '../Forms/form-report/FormReport'
import ReviewItem from './review/review-item/ReviewItem'
import { Pagination } from 'antd'
import { SOON, CRYPTO, VENTURE, LAUNCHPAD } from '../../constants/category'
// import logocolor from '../../../images/logo/gear5_logo_notext.webp'
import logo from '../../../images/logo/logo.png'
import hands from '../../../images/svg/hands.svg'
import rocket from '../../../images/svg/rocket.svg'
import shit_review from '../../../images/svg/shit-review.svg'

export const dataReviewFounder = {
  acountImage: logo,
  accountName: 'Gear5 Founder',
  content: <p className='cus-text-justify'>
    <span>
    We understand that the cryptocurrency market has the potential to be a lucrative investment channel
      <img src={rocket} alt='icon-rocket' style={{ marginLeft: '0.3rem' }}/>
      <img src={rocket} alt='icon-rocket'/>
      <img src={rocket} alt='icon-rocket' style={{ marginRight: '0.3rem' }}/>
      . However, ALMOST 99%+ PROJECTS  has been evaluated as SCAM / DEAD ones
      <img src={shit_review} alt='icon shit review' style={{ marginLeft: '0.3rem' }}/>
      <img src={shit_review} alt='icon shit review'/>
      <img src={shit_review} alt='icon shit review' style={{ marginRight: '0.3rem' }}/>
      {`, so BE TOTALLY AWARE whenever you're about to make any investment decision by reading other Gear5 users’ reviews beforehand. And if any of you are the VICTIMS of any scam project, RAISE YOUR VOICE with other investors about your negative experience to join hands R.I.P that project, and make a better cryptocurrency community`}
      <img src={hands} alt='icon-hand' style={{ marginLeft: '0.3rem' }}/>
      <img src={hands} alt='icon-hand'/>
      <img src={hands} alt='icon-hand' style={{ marginRight: '0.3rem' }}/>
      .
    </span>
  </p>
}
export const DetailLayout = (props) => {
  const { Header, type, roundSale, portfolioOrChartOrDesc, timeAndPercentProcess, summary, more, about, scam, exchange, topDiscus, similar, rest, setTop, productInfo,
    // { /* START DEMO: TEST NEW GUI FOR SEO */ }
    test1, test3, test4,
    test6, test7, test8
    // { /* END DEMO: TEST NEW GUI FOR SEO */ }
  } = props
  const PAGE_SIZE = 25

  const getPosition = () => {
    const top = document.getElementById('div2')?.offsetTop
    rest?.setOffsetTopByListComment && rest?.setOffsetTopByListComment(top - 150)
  }

  useEffect(() => {
    getPosition()
    // window.addEventListener('load', getPosition)
    window.addEventListener('mouseover', getPosition)
    window.addEventListener('resize', getPosition)
  }, [])

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

              {/* START DEMO: TEST NEW GUI FOR SEO */}
              {/* Test1 */}
              {test1 && <div className='col-lg-12'>
                <div className='card'>
                  {test1}
                </div>
              </div>}
              {/* Test3 */}
              {test3 && <div className='col-lg-12'>
                <div className='card'>
                  {test3}
                </div>
              </div>}
              {/* Test4 */}
              {test4 && <div className='col-lg-12'>
                <div className='card'>
                  {test4}
                </div>
              </div>}
              {/* END DEMO: TEST NEW GUI FOR SEO */}

              <div className='display-desktop'>
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
                <div className='review-founder'>
                  <ReviewItem
                    type='founder'
                    data={dataReviewFounder}
                  />
                </div>
                {rest?.reviews && rest?.reviews?.map((item, index) => (
                  <ReviewItem
                    type='normal'
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
                    onChange={(value) => {
                      rest?.setDefaultFilter({
                        ...rest.defaultFilter,
                        page: value
                      })
                      rest?.setLoadingFilter(true)
                    }}
                  />
                )}
              </div>
            </div>

            <div className='display-mobile'>
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

            {/* START DEMO: TEST NEW GUI FOR SEO */}
            {/* Test7 */}
            {test7 && <div className='col-lg-12 mt-3'>
              <div className='card'>
                {test7}
              </div>
            </div>}

            {/* Test8 */}
            {test8 && <div className='col-lg-12'>
              <div className='card'>
                {test8}
              </div>
            </div>}

            {/* Test6 */}
            {test6 && <div className='col-lg-12'>
              <div className='card'>
                {test6}
              </div>
            </div>}
            {/* END DEMO: TEST NEW GUI FOR SEO */}
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

            <div className='display-desktop'>
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
                <div className='review-founder'>
                  <ReviewItem
                    type='founder'
                    data={dataReviewFounder}
                  />
                </div>
                {rest?.reviews && rest?.reviews?.map((item, index) => (
                  <ReviewItem
                    type='normal'
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
                    onChange={(value) => {
                      rest?.setDefaultFilter({
                        ...rest.defaultFilter,
                        page: value
                      })
                      rest?.setLoadingFilter(true)
                    }}
                  />
                )}
              </div>
            </div>

            <div className='display-mobile'>
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
        </div>
      </>}
  </>
}
