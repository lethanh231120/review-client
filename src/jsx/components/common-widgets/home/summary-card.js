export const SummaryCard = ({ title, number }) => {
  return <div className='col-xl  col-lg col-sm summary-item'>
    <div className='widget-stat card'>
      <div className='card-body p-3'>
        <div className='media ai-icon'>
          {/* <span className='me-1 bgl-primary text-primary'>
            <svg
              id='icon-customers'
              xmlns='http://www.w3.org/2000/svg'
              width='10'
              height='10'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='feather feather-user'
            >
              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
              <circle cx='12' cy='7' r='4'></circle>
            </svg>
          </span> */}
          <div className='media-body'>
            <p className='mb-1'>{title}</p>
            <h4 className='mb-0'>{number}</h4>
            {/* <span className='badge badge-primary'>+3.5%</span> */}
          </div>
        </div>
      </div>
    </div>
  </div>
}
