import React from 'react'

import { SummaryCard } from './summary-card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCoins, faExchangeAlt, faRocket } from '@fortawesome/free-solid-svg-icons'
import SekeletonSummaryItem from '../../../skeleton/skeleton-summary/SekeletonSummaryItem'

const SummaryRow = ({ data }) => {
  const tokenData = data?.coins + data?.tokens
  const exchangeData = data?.exchanges
  const venture = data?.ventures
  const idos = data?.soons
  return (
    <div className='row' style={{ width: '100%' }}>
      {data ? (
        <>
          <SummaryCard type='crypto' title={'Coins/Tokens'} number={tokenData} bg='bgl-primary text-primary' badgeStyle='badge-primary' icon={<FontAwesomeIcon icon={faCoins}/>}/>
          <SummaryCard type='exchange' title={'Exchanges'} number={exchangeData} bg='bgl-warning text-warning' badgeStyle='badge-warning' icon={<FontAwesomeIcon icon={faExchangeAlt}/>}/>
          <SummaryCard type='venture' title={'Ventures'} number={venture} bg='bgl-danger text-danger' badgeStyle='badge-danger' icon={<FontAwesomeIcon icon={faBuilding}/>}/>
          <SummaryCard type='soon' title={'IDO/ICOs'} number={idos} bg='bgl-success text-success' badgeStyle='badge-success' icon={<FontAwesomeIcon icon={faRocket}/>}/>
        </>
      ) : (
        <>
          <SekeletonSummaryItem/>
          <SekeletonSummaryItem/>
          <SekeletonSummaryItem/>
          <SekeletonSummaryItem/>
        </>
      )}
    </div>
  )
}
export default SummaryRow
