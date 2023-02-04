import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
//  import { Autoplay } from "swiper";

import 'swiper/css'
import { SummaryCard } from '../../common-widgets/home/summary-card'

// import ProfitLossArea from './ProfitLossArea'
// import TotaldipositChart from './TotaldipositChart'

const customerIcon = <svg
  id='icon-customers'
  xmlns='http://www.w3.org/2000/svg'
  width='30'
  height='30'
  viewBox='0 0 24 24'
  fill='none'
  stroke='currentColor'
  strokeWidth='2'
  strokeLinecap='round'
  strokeLinejoin='round'
  className='feather feather-user'
>
  <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
  <circle cx='12' cy='7' r='4'></circle>
</svg>

const databaseIcon = <svg
  id='icon-database-widget'
  xmlns='http://www.w3.org/2000/svg'
  width='24'
  height='24'
  viewBox='0 0 24 24'
  fill='none'
  stroke='currentColor'
  strokeWidth='2'
  strokeLinecap='round'
  strokeLinejoin='round'
  className='feather feather-database'
>
  <ellipse cx='12' cy='5' rx='9' ry='3'></ellipse>
  <path d='M21 12c0 1.66-4 3-9 3s-9-1.34-9-3'></path>
  <path d='M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5'></path>
</svg>

const billIcon = <svg
  id='icon-orders'
  xmlns='http://www.w3.org/2000/svg'
  width='30'
  height='30'
  viewBox='0 0 24 24'
  fill='none'
  stroke='currentColor'
  strokeWidth='2'
  strokeLinecap='round'
  strokeLinejoin='round'
  className='feather feather-file-text'
>
  <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'></path>
  <polyline points='14 2 14 8 20 8'></polyline>
  <line x1='16' y1='13' x2='8' y2='13'></line>
  <line x1='16' y1='17' x2='8' y2='17'></line>
  <polyline points='10 9 9 9 8 9'></polyline>
</svg>

const revenueicon = <svg
  id='icon-revenue'
  xmlns='http://www.w3.org/2000/svg'
  width='30'
  height='30'
  viewBox='0 0 24 24'
  fill='none'
  stroke='currentColor'
  strokeWidth='2'
  strokeLinecap='round'
  strokeLinejoin='round'
  className='feather feather-dollar-sign'
>
  <line x1='12' y1='1' x2='12' y2='23'></line>
  <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
</svg>

const SummaryRow = () => {
  return (
    <div className='row'>
      <SummaryCard title={'Cryptos'} number={'2.2 M'} bg='bgl-primary text-primary' badgeStyle='badge-primary' icon={revenueicon}/>
      <SummaryCard title={'Exchanges'} number={'1000'} bg='bgl-warning text-warning' badgeStyle='badge-warning' icon={databaseIcon}/>
      <SummaryCard title={'Ventures'} number={'100 K'} bg='bgl-danger text-danger' badgeStyle='badge-danger' icon={customerIcon}/>
      <SummaryCard title={'IDO/ICOs'} number={'1000'} bg='bgl-success text-success' badgeStyle='badge-success' icon={billIcon}/>
    </div>
  )
}
export default SummaryRow
