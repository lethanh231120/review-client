import { Button } from 'react-bootstrap'
// images
// import scam from '../../../../../public/scam-alert.webp'
import { ReportModalContext } from '../../..'
import { useContext } from 'react'
import { WARNING_ICON } from '../logo/logo'

const Banner = () => {
  const reportModal = useContext(ReportModalContext)

  return <div className='card bubles banner-body'
    // style={{ marginBottom: '30%' }}
  >
    <div className='card-body cus-card-body'>
      <div className='buy-coin banner'>
        <div className='scam-img banner-phone'>
          <img src='/scam-alert.webp' className='img-fluid' alt='Scam Alert' />
        </div>
        <div className='banner-left'>
          {/* alias h1 */}
          <h2 className='report-title' style={{ fontSize: '2.25rem' }}>You got scammed, lost money?</h2>
          <h3 className='cus-p'>Please join us in warning everyone in the community!</h3>
          <Button className='btn-danger d-flex align-items-center' onClick={() => reportModal?.handleSetOpenModal(true)}
            style={{ backgroundColor: '#EB5757', borderColor: '#EB5757' }}
          >
            {WARNING_ICON('#fff', '18px')}&nbsp;&nbsp;
              Report&nbsp;now
          </Button>
        </div>
        <div className='scam-img'>
          <img src='/scam-alert.webp' className='img-fluid' alt='Scam Alert' />
        </div>
      </div>
    </div>
  </div>
}

export default Banner
