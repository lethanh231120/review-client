import imgReportProject from '../../../../images/svg/report-project-white.svg'
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

const Banner = () => {
  const reportModal = useContext(ReportModalContext)

  return <div className='card bubles banner-body'
    // style={{ marginBottom: '30%' }}
  >
    <div className='card-body '>
      <div className='buy-coin '>
        <div style={{ zIndex: 2 }}>
          <h2 className='report-title' style={{ width: '100%' }}>You got scammed <br></br>and lost money ?</h2>
          <Button className='btn-danger' onClick={() => reportModal?.handleSetOpenModal(true)}
            style={{ backgroundColor: '#EB5757', borderColor: '#EB5757', marginTop: '50px' }}
          >
            <img src={imgReportProject} className='img-fluid noti ms-2'/>
              &nbsp;
              Report&nbsp;now
          </Button>
        </div>
        {/* <img src={lite} className='decoration lite'/> */}
        {/* <img src={btc} className='decoration btc' style={{ zIndex: 0 }}/>
        <img src={ethereum} className='decoration ethereum' style={{ zIndex: 0 }}/>
        <img src={bnb} className='decoration bnb' style={{ zIndex: 0 }}/>
        <img src={avalanche} className='decoration avalanche' style={{ zIndex: 0 }}/>
        <img src={tether} className='decoration tether' style={{ zIndex: 0 }}/>
        <img src={polygon} className='decoration polygon' style={{ zIndex: 0 }}/>
        <img src={lite} className='decoration lite' style={{ zIndex: 0 }}/> */}
        <div className='scam-img'>
          <img src={scam} className='img-fluid' alt='Scam Alert' />
        </div>
        {/* <div className='coin-img'>
            <img src={steal} className='img-fluid' alt='' style={{ width: '200px' }} />
          </div> */}
      </div>
    </div>
  </div>
}

export default Banner
