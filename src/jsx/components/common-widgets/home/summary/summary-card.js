import { useNavigate } from 'react-router-dom'
import { formatMoney } from '../../../../../utils/formatNumber'
import '../../../../../scss/base/home.scss'
import './summary-card.scss'
import { MySkeletonLoadinng } from '../../my-spinner'

export const SummaryCard = ({ title, number, bg, badgeStyle, icon, type }) => {
  const navigate = useNavigate()

  const onItemClicked = () => {
    navigate(`/${type}`)
  }

  return <div className='col-xl-3 col-sm-6' onClick={onItemClicked}>
    {number
      // ? <div className='widget-stat card cus-summary-card' style={{ marginBottom: '0', marginTop: '1rem' }} >
      ? <div className='widget-stat card cus-summary-card' style={{ marginBottom: '0', marginTop: '1.5rem' }}>
        <div className='card-body p-3'>
          <div className='media'>
            <span className={`${bg} summary-icon`}>
              {icon}
            </span>
            <div className='media-body custom-media-body text-etc-overflow' >
              <h4 className='mb-1 text-etc-overflow summary-title '
              // Alias p tag
                style={{ display: 'block', textTransform: 'uppercase', fontWeight: '500', color: '#828690', fontSize: '0.8rem' }}>
                {title}
              </h4>
              {/* <br /> */}
              <h5 className='mb-0'><span className='text-etc-overflow summary-statistic'>{number > 0 && `${formatMoney(number)}`.replace('$', '')}+</span></h5>
            </div>
          </div>
        </div>
      </div> : <MySkeletonLoadinng count={1} height={100}/>}
  </div>
}
