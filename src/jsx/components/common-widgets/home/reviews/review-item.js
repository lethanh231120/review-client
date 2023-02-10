export const ReviewItem = ({ title, star, reason }) => {
  return <div className='card '>
    <div className='card-body'>
      <div className='row m-b-30'>
        <div className='col-md-5'>
          <div className='new-arrival-product mb-4 mb-xxl-4 mb-md-0'>
          </div>
        </div>
        <div className='col-md-7'>
          <div className='new-arrival-content position-relative'>
            <h4>
              {title}
            </h4>
            <div className='comment-review star-rating'>
              <ul>
                {' '}
                <li>
                  <i className='fa fa-star' />
                </li>{' '}
                <li>
                  <i className='fa fa-star' />
                </li>{' '}
                <li>
                  <i className='fa fa-star' />
                </li>{' '}
                <li>
                  <i className='fa fa-star' />
                </li>{' '}
                <li>
                  <i className='fa fa-star' />
                </li>
              </ul>
              <span className='review-text'>(34 reviews) </span>

            </div>
            {/* <p>
            Availability:{' '}
              <span className='item'>
                {' '}
              In stock{' '}
                <i className='fa fa-check-circle text-success' />
              </span>
            </p>
            <p>
            Product code: <span className='item'>0405689</span>{' '}
            </p>
            <p>
            Brand: <span className='item'>Lee</span>
            </p> */}
            <p className='text-content'>
              {reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
}
