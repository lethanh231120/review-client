import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'

// ../../../Dashboard/AssetsChart
const AssetsChart = loadable(() =>
  pMinDelay(import('../../Dashboard/Dashboard/AssetsChart'), 1000)
)

export const DataAllocationChart = ({ data, header }) => {
  return <div className='card summary-chart'>
    <div className='card-header border-0 pb-0'>
      <h2 className='heading'>{header}</h2>
    </div>
    <div className='card-body text-center pt-0 '>
      <div id='morris_donught' className='custome-donut'>
        <AssetsChart data={data}/>
      </div>
      <div className='chart-items'>
        <div className='row'>
          <div className=' col-xl-12 col-sm-12 '>
            <div className='text-start chart-legend'>
              {data?.map((data, ind) => (
                <div className='color-picker' key={ind}>
                  <span className='mb-0 col-6 fs-14'>
                    <svg
                      className='me-2'
                      width='16'
                      height='16'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <rect
                        width='14'
                        height='14'
                        rx='4'
                        fill={data.fillcolor}
                      />
                    </svg>
                    {data?.datatitle}
                  </span>
                  <h5>{new Intl.NumberFormat().format(data?.amount)}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
