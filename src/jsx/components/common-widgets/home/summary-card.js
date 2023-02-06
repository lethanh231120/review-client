import { formatMoney } from '../../../../utils/formatNumber'
import { MySpinner } from '../my-spinner'
export const SummaryCard = ({ title, number, bg, badgeStyle, icon }) => {
  return <div className='col-xl-3  col-lg-6 col-sm-6'>
    <div className='widget-stat card'>
      <div className='card-body  p-4'>
        {number ? <div className='media'>
          <span className={`me-2 ${bg}`} >
            {icon}
          </span>
          <div className='media-body ' style={{ marginLeft: '1rem' }}>
            <p className='mb-1'>{title}</p>
            <h4 className='mb-0'>{number > 0 && `${formatMoney(number)}`.replace('$', '')}</h4>
            {/* <span className={`badge ${badgeStyle}`}>3.5%</span> */}
          </div>
        </div> : <MySpinner fontSize={50}/>}
      </div>
    </div>
  </div>
}
