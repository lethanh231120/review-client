import { useNavigate } from 'react-router-dom'
import { formatMoney } from '../../../../utils/formatNumber'
export const SummaryCard = ({ title, number, bg, badgeStyle, icon, type }) => {
  const navigate = useNavigate()

  const onItemClicked = () => {
    navigate(`/${type}`)
  }

  return <div className='col-xl-3 col-sm-6 summary-item' onClick={onItemClicked}>
    <div className='widget-stat card' style={{ cursor: 'pointer' }}>
      <div className='card-body p-4'>
        <div className='media'>
          <span className={`me-2 ${bg}`} >
            {icon}
          </span>
          <div className='media-body ' style={{ marginLeft: '1rem' }}>
            <p className='mb-1'>{title}</p>
            <h4 className='mb-0'>{number > 0 && `${formatMoney(number)}`.replace('$', '')}</h4>
            {/* <span className={`badge ${badgeStyle}`}>3.5%</span> */}
          </div>
        </div>
      </div>
    </div>
  </div>
}
