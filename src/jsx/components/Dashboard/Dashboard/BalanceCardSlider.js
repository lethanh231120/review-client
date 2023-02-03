import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
//  import { Autoplay } from "swiper";

import 'swiper/css'
import { SummaryCard } from '../../common-widgets/home/summary-card'

// import ProfitLossArea from './ProfitLossArea'
// import TotaldipositChart from './TotaldipositChart'

const BalanceCardSlider = () => {
  return (
    <div className='row'>
      <SummaryCard title={'Cryptocurrencies'} number={'2.200.000'}/>
      <SummaryCard title={'Dapps'} number={'100.000'}/>
      <SummaryCard title={'Exchanges'} number={'1000'}/>
      <SummaryCard title={'Ventures'} number={'100.000'}/>
      <SummaryCard title={'IDO/ICOs'} number={'1000'}/>
    </div>
  )
}
export default BalanceCardSlider
