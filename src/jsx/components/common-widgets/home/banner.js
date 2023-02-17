import imgReportProject from '../../../../images/svg/report-project-white.svg'
import { Button } from 'react-bootstrap'

// images
import hacker from '../../../../images/crack.png'
// import steal from './../../../images/crack44.png'
import lite from '../../../../images/litecoin.png'
import tether from '../../../../images/tether.png'
import btc from '../../../../images/btc.png'
import avalanche from '../../../../images/avalanche.png'
import ethereum from '../../../../images/ethereum.png'
import bnb from '../../../../images/binance.png'
import polygon from '../../../../images/polygon.png'
import { ReportModalContext } from '../../..'
import { useContext } from 'react'

const Banner = () => {
  const reportModal = useContext(ReportModalContext)

  return <div className='card bubles banner-body'
    // style={{ marginBottom: '30%' }}
  >
    <div className='card-body '>
      <div className='buy-coin '>
        <div>
          <h2 className='report-title' style={{ width: '100%' }}>You got scammed <br></br>lost money</h2>
          <p className='join-us-text' style={{ width: '100%' }}>
            Please join us to warn everyone in the community
          </p>
          <Button className='btn-danger' onClick={() => reportModal?.handleSetOpenModal(true)} style={{ backgroundColor: '#EB5757', borderColor: '#EB5757' }}>
            <img src={imgReportProject} className='img-fluid noti ms-2'/>
              &nbsp;
              Report&nbsp;now
          </Button>

        </div>
        {/* <img src={lite} className='decoration lite'/> */}
        <img src={btc} className='decoration btc'/>
        <img src={ethereum} className='decoration ethereum'/>
        <img src={bnb} className='decoration bnb'/>
        <img src={avalanche} className='decoration avalanche'/>
        <img src={tether} className='decoration tether'/>
        <img src={polygon} className='decoration polygon'/>
        <img src={lite} className='decoration lite'/>
        <div className='coin-img'>
          <img src={hacker} className='img-fluid' alt='' />
        </div>
        {/* <div className='coin-img'>
            <img src={steal} className='img-fluid' alt='' style={{ width: '200px' }} />
          </div> */}
      </div>
    </div>
  </div>
}

export default Banner
