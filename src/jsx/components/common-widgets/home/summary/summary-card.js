import { useNavigate } from 'react-router-dom'
import { formatMoney } from '../../../../../utils/formatNumber'
import '../../../../../scss/base/home.scss'
import './summary-card.scss'

export const SummaryCard = ({ title, number, bg, badgeStyle, icon, type }) => {
  const navigate = useNavigate()

  const onItemClicked = () => {
    navigate(`/${type}`)
  }

  return <div className='col-xl-3 col-sm-6' onClick={onItemClicked}>
    <div className='widget-stat card cus-summary-card' style={{ marginBottom: '0', marginTop: '1rem' }} >
      <div className='card-body p-3'>
        <div className='media'>
          <span className={`${bg}`} >
            {icon}
          </span>
          <div className='media-body custom-media-body' >
            <p className='mb-1'>{title}</p>
            <h4 className='mb-0'>{number > 0 && `${formatMoney(number)}`.replace('$', '')}+</h4>
            {/* <span className={`badge ${badgeStyle}`}>3.5%</span> */}
          </div>
        </div>
      </div>
    </div>
  </div>
}
