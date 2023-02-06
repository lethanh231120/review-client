import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
//  import { Autoplay } from "swiper";

import 'swiper/css'
import { SummaryCard } from '../../common-widgets/home/summary-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCoins, faExchangeAlt, faRocket } from '@fortawesome/free-solid-svg-icons'
// import ProfitLossArea from './ProfitLossArea'
// import TotaldipositChart from './TotaldipositChart'

const SummaryRow = ({ data }) => {
  const tokenData = data?.coins + data?.tokens
  const exchangeData = data?.exchanges
  const venture = data?.ventures
  const idos = data?.soons

  return (
    <div className='row'>
      <SummaryCard title={'Cryptos'} number={tokenData} bg='bgl-primary text-primary' badgeStyle='badge-primary' icon={<FontAwesomeIcon icon={faCoins}/>}/>
      <SummaryCard title={'Exchanges'} number={exchangeData} bg='bgl-warning text-warning' badgeStyle='badge-warning' icon={<FontAwesomeIcon icon={faExchangeAlt}/>}/>
      <SummaryCard title={'Ventures'} number={venture} bg='bgl-danger text-danger' badgeStyle='badge-danger' icon={<FontAwesomeIcon icon={faBuilding}/>}/>
      <SummaryCard title={'IDO/ICOs'} number={idos} bg='bgl-success text-success' badgeStyle='badge-success' icon={<FontAwesomeIcon icon={faRocket}/>}/>
    </div>
  )
}
export default SummaryRow
