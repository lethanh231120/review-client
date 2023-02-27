// import imgReportProject from '../../../../images/svg/report-project-white.svg'
import { Button } from 'react-bootstrap'
// images
import scam from '../../../../images/scam-alert.png'
// import lite from '../../../../images/litecoin.png'
// import tether from '../../../../images/tether.png'
// import btc from '../../../../images/btc.png'
// import avalanche from '../../../../images/avalanche.png'
// import ethereum from '../../../../images/ethereum.png'
// import bnb from '../../../../images/binance.png'
// import polygon from '../../../../images/polygon.png'
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
          <img src={scam} className='img-fluid' alt='Scam Alert' />
        </div>
        <div className='banner-left'>
          <h2 className='report-title'>You got scammed and lost money ?</h2>
          <p className='cus-p'>Please join us in warning everyone in the community !</p>
          <Button className='btn-danger d-flex align-items-center' onClick={() => reportModal?.handleSetOpenModal(true)}
            style={{ backgroundColor: '#EB5757', borderColor: '#EB5757' }}
          >
            {WARNING_ICON('#fff', '18px')}&nbsp;&nbsp;
              Report&nbsp;now
          </Button>
        </div>
        <div className='scam-img'>
          <img src={scam} className='img-fluid' alt='Scam Alert' />
        </div>
      </div>
    </div>
  </div>
}

export default Banner
