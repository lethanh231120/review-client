// import { scaleBand } from 'd3-scale'
import { useEffect } from 'react'
import FormReport from '../Forms/form-report/FormReport'
import ReviewItem from './review/review-item/ReviewItem'
import { Pagination } from 'antd'
// import { SOON, CRYPTO, VENTURE, LAUNCHPAD } from '../../constants/category'
import { CRYPTO, LAUNCHPAD, SOON, VENTURE } from '../../constants/category'
// import logocolor from '../../../images/logo/gear5_logo_notext.webp'
import logo from '../../../images/logo/logo.png'
import hands from '../../../images/svg/hands.svg'
import rocket from '../../../images/svg/rocket.svg'
import shit_review from '../../../images/svg/shit-review.svg'
import { Row, Col } from 'antd'

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
  const { Header, portfolioOrChartOrDesc, roundSale, summary, about, exchange, topDiscus, similar, rest, more, collap1, FAQs, setTop, productInfo, cryptoPriceLiveData, holders, type, timeAndPercentProcess } = props
  // const { Header, type, roundSale, portfolioOrChartOrDesc, timeAndPercentProcess, summary, more, about, scam, exchange, topDiscus, similar, rest, collap1, FAQs, setTop, productInfo,
  //   // { /* START DEMO: TEST NEW GUI FOR SEO */ }
  //   cryptoPriceLiveData, test2, test3, test4, test5,
  //   test6, test7, holders
  //   // { /* END DEMO: TEST NEW GUI FOR SEO */ }
  // } = props
  const PAGE_SIZE = 25

  const getPosition = () => {
    const top = document.getElementById('div2')?.offsetTop
    const top2 = document.getElementById('comment')?.offsetTop
    setTop && setTop(top2)
    rest?.setOffsetTopByListComment(top)
  }

  useEffect(() => {
    getPosition()
    // window.addEventListener('load', getPosition)
    window.addEventListener('mouseover', getPosition)
    window.addEventListener('resize', getPosition)
  }, [])

  return <>
    <Row gutter={20}>
      <Col xl={{ span: 17 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
        <div style={{ background: '#fff' }}>
          <div style={{ padding: '1rem' }}>
            {Header}
          </div>

          {/* if type is Launchpad OR crypto, then the display order on screens <1200 would be: header, portfolioOrChartOrDesc, summary, what is..., live data, about, FAQs, reviews,
          if type is dapp, the display order <1200 would be: header, summary, what is, about,
          if type is venture, the display order <1200 would be: header, summary, what is, portfolioOrChartOrDesc, about,
          if type is exchange, the display order <1200 would be: header, summary, what is, about,
          if type is soon, the display order <1200 would be: header, timeAndPercentProcess, summary, more, what is, about, FAQs */}
          {type === SOON && (
            <div style={{ padding: '1rem' }}>
              <div className='box-summary display-block-1200' style={{ padding: '1rem' }}>
                {type === SOON && (timeAndPercentProcess &&
                  <div className='profile-statistics'>
                    {timeAndPercentProcess}
                  </div>)}
              </div>
              <div>
                <div className='box-summary'>
                  {summary}
                </div>
              </div>
            </div>
          )}

          {(type === LAUNCHPAD || type === CRYPTO) && (
            <>
              {portfolioOrChartOrDesc && (
                <>
                  {portfolioOrChartOrDesc}
                </>
              )}
            </>
          )}

          {type !== SOON && (
            <div style={{ padding: '0 1rem' }}>
              <div className='display-block-1200 box-summary'>
                {summary}
              </div>
            </div>
          )}

          {type !== CRYPTO && (
            <div style={{ padding: '0 1rem' }}>
              {more && (
                <div className='display-block-1200' style={{ background: '#fff', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
                  {more}
                </div>
              )}
            </div>
          )}

          {type === VENTURE && (
            <>
              {about}
            </>
          )}

          {type !== LAUNCHPAD && type !== CRYPTO && (
            <>
              {portfolioOrChartOrDesc && (
                <>
                  {portfolioOrChartOrDesc}
                </>
              )}
            </>
          )}

          {type !== VENTURE && (
            <>
              {about}
            </>
          )}

          <>
            {cryptoPriceLiveData}
          </>
          <>
            {collap1}
          </>
          <>
            {FAQs}
          </>

          <div className='display-block-1200'>
            <Row gutter={[15, 15]}>
              {similar && (
                <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                  <div className='box-in-maxWidth-1200'>
                    {similar && (
                      <>
                        {similar}
                      </>
                    )}
                  </div>
                </Col>
              )}
              {topDiscus && (
                <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                  <div className='box-in-maxWidth-1200'>
                    {topDiscus}
                  </div>
                </Col>
              )}
            </Row>
          </div>
          <div className='display-block-1200'>
            <Row gutter={[15, 15]}>
              {exchange && (
                <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                  <div className='box-in-maxWidth-1200'>
                    {exchange}
                  </div>
                </Col>
              )}
              {holders && (
                <Col md={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                  <div className='box-in-maxWidth-1200'>
                    {holders}
                  </div>
                </Col>
              )}
            </Row>
          </div>
          <div className='box-form-report' id='comment'>
            <FormReport
              isFormReport={true}
              numberReviews={rest?.totalReviews}
              rest={rest}
              productInfo={productInfo}
            />

          </div>
          <div id='div2' style={{ padding: '0 1rem' }}>
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
      </Col>
      <Col xl={{ span: 7 }} md={{ span: 0 }} sm={{ span: 0 }} xs={{ span: 0 }}>
        <div>
          {type === SOON && (timeAndPercentProcess &&
          <div className='box-summary display-none-1200'>
            <div className='profile-statistics'>
              {timeAndPercentProcess}
            </div>
          </div>)}

          {type !== SOON && (
            <>
              {summary && (
                <div className='box-summary display-none-1200'>
                  {summary}
                </div>
              )}
            </>
          )}

          {/* if type !== crypto => display more */}
          {type !== CRYPTO && (
            <>
              {more && (
                <div className='display-none-1200' style={{ background: '#fff', border: '1px solid rgba(0, 0, 0, 0.1)', marginBottom: '1rem' }}>
                  {more}
                </div>
              )}
            </>
          )}

          {similar && (
            <div className='box-in-minWidth-1200'>
              {similar}
            </div>
          )}

          {topDiscus && (
            <div className='box-in-minWidth-1200'>
              {topDiscus}
            </div>
          )}

          {holders && (
            <div className='box-in-minWidth-1200'>
              {holders}
            </div>
          )}

          {exchange && (
            <div className='box-in-minWidth-1200'>
              {exchange}
            </div>
          )}
        </div>
      </Col>
    </Row>
    {
      roundSale ? <div className='row'>
        <div className='col-lg-12'>
          <div className='profile card card-body px-3 pt-3 pb-0'>
            {roundSale}
          </div>
        </div>
      </div>
        : ''
    }
    {/* {type === CRYPTO || type === VENTURE || type === LAUNCHPAD || type === SOON
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

              {scam && <div className='col-lg-12'>
                {scam}
              </div>}

              {more && <div className='col-lg-12'>
                <div className='card'>
                  {more}
                </div>
              </div>}

              {exchange && <div className='col-lg-12'>
                <div className='card'>
                  {exchange}
                </div>
              </div>}

              {about && <div className='col-lg-12'>
                <div className='card'>
                  {about}
                </div>
              </div>}

              {cryptoPriceLiveData && <div className='col-lg-12'>
                <div className='card'>
                  {cryptoPriceLiveData}
                </div>
              </div>}

              {test2 && <div className='col-lg-12'>
                <div className='card'>
                  {cryptoSocreDescription}
                </div>
              </div>}

              {test3 && <div className='col-lg-12'>
                <div className='card'>
                  {cryptoDefinition}
                </div>
              </div>}

              {test4 && <div className='col-lg-12'>
                <div className='card'>
                  {test4}
                </div>
              </div>}

              {test5 && <div className='col-lg-12'>
                <div className='card'>
                  {test5}
                </div>
              </div>}

              <div className='display-desktop'>
                <div className='col-lg-12'>
                  {topDiscus}
                </div>

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

            <div className='product-detail' id='comment'>
              <FormReport
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

              {similar && <div className='col-lg-12 mt-4'>
                <div className='card'>
                  {similar}
                </div>
              </div>}
            </div>

            {test7 && <div className='col-lg-12 mt-3'>
              <div className='card'>
                {test7}
              </div>
            )}

            {holders && <div className='col-lg-12'>
              <div className='card'>
                {holders}
              </div>
            </div>}

            {test6 && <div className='col-lg-12'>
              <div className='card'>
                {test6}
              </div>
            </div>}
          </div>
        </div></>
      : <>
        <div className='row'>
          <div className='col-xl-5'>
            <div className='card'>
              <div className='card-body'>
                <div className='profile-statistics'>
                  {summary}
                </div>
              </div>
            </div>

            <div className='col-lg-12'>
              {scam}
            </div>

            <div className='card'>
              {more}
            </div>

            <div className='card'>
              {about}
            </div>

            <div className='display-desktop'>
              <div className='col-lg-12'>
                {topDiscus}
              </div>

              {similar && <div className='col-lg-12 mt-4'>
                <div className='card'>
                  {similar}
                </div>
              </div>}
            </div>
          </div>

          <div className='col-xl-7'>
            <div className='product-detail' id='comment'>
              <FormReport
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

              {similar && <div className='col-lg-12 mt-4'>
                <div className='card'>
                  {similar}
                </div>
              </div>}
            </div>
          </div>
        </div>
      </>} */}
  </>
}
