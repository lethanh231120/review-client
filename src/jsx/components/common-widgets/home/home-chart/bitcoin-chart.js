// import loadable from '@loadable/component'
// import pMinDelay from 'p-min-delay'
// import { formatMoney } from '../../../../../utils/formatNumber'
// import { MySpinner } from '../../my-spinner'
import { Avatar } from 'antd'
import { useState } from 'react'
import Select from 'react-select'
import TradingViewWidget from './trading-view-chart'

// const DashboardComboChart = loadable(() =>
//   pMinDelay(import('../../../Dashboard/Dashboard/DashboardComboChart'), 1000)
// )
export const TopCoinChart = ({ topCoinList }) => {
  const options = []

  if (topCoinList?.length > 6) {
    topCoinList?.slice(0, 6)?.forEach(item => {
      if (item?.symbol !== 'USDT' && item?.symbol !== 'USDC') {
        options.push({ value: `${item?.symbol}USDT`, label:
        <>
          <Avatar size={30} className='me-2' src={item?.thumbLogo}/>
          {item?.name}
        </> })
      }
    })
  }
  const [currentSelection, setCurrentSelection] = useState(options[0]?.value)
  const onSelected = (value) => {
    setCurrentSelection(value?.value)
  }

  return <div className='card' style={{ height: '100%', marginBottom: '0' }}>
    <div className='card-header border-0 align-items-start flex-wrap pb-0'>
      <div>
        <h2 className='heading'>Top Coin Chart</h2>
      </div>
      <div className='dropdown bootstrap-select'>
        <Select
          className='custom-react-select mb-xl-0 mb-3'
          options={options && options}
          defaultValue={options && options[0]}
          isSearchable={false}
          onChange={(value => onSelected(value))}
        />
      </div>
    </div>
    <div style={{ padding: '15px' }}>< TradingViewWidget symbol={currentSelection}/></div>
  </div>
}

