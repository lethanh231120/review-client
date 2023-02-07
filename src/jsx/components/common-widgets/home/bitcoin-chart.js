import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import { formatMoney } from '../../../../utils/formatNumber'

const DashboardComboChart = loadable(() =>
  pMinDelay(import('../../Dashboard/Dashboard/DashboardComboChart'), 1000)
)

export const BitcoinChartAndData = ({ chartData, headerData }) => {
  return <div className='card'>
    <div className='card-header border-0 align-items-start flex-wrap pb-0'>
      <div>
        <h2 className='heading'>Bitcoin Chart</h2>
        <div className='market-data'>
          <div className='income data'>
            <span>Price</span>
            <h4>${new Intl.NumberFormat().format(headerData?.priceUSD)}</h4>
          </div>
          <div className='price data'>
            <span>Market Cap</span>
            <h4>
              {formatMoney(headerData?.marketcapUSD)}
            </h4>
          </div>
          <div className='rate data'>
            <span>Total Supply</span>
            <h4>21M</h4>
          </div>
          <div className='volume data'>
            <span>Holders</span>
            <h4>{formatMoney(headerData?.holders).replace('$', '')}</h4>
          </div>
          <div className='volume data'>
            <span>Transfers</span>
            <h4>801M</h4>
          </div>
        </div>
      </div>
    </div>
    <DashboardComboChart data={chartData}/>
  </div>
}
