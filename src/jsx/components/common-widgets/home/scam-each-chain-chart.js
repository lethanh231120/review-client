import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend)
export const ScamEachChainChart = ({ data }) => {
  const chartData = {
    defaultFontFamily: 'Poppins',
    labels: data?.map(item => item?.datatitle),
    datasets: [
      {
        label: 'Expense',
        backgroundColor: '#ff2c53',
        hoverBackgroundColor: '#ff5777',
        barThickness: 9,
        data: data?.map(item => item?.scam)
      },
      {
        label: 'Earning',
        backgroundColor: '#F1F3F7',
        hoverBackgroundColor: '#F1F3F7',
        barThickness: 9,
        data: data?.map(item => item?.total)
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltips: {
        mode: 'index',
        intersect: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        stacked: true,
        barPercentage: 0.2,
        ticks: {
          display: false
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      },

      y: {
        display: false,
        stacked: true,
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }
    }
  }

  return <div className='card'>
    <div className='card-body pb-0'>
      <div className='row justify-content-between'>
        <div className='col-auto'>
          <h2 className='heading'>Scam Data In Each Blockchains</h2>
        </div>

      </div>
    </div>
    <div className='chart-wrapper'>
      <div style={{ height: '100%' }}>
        <Bar data={chartData} options={options} height={150} />
      </div>
    </div>
    <div className='card-footer'>
      {/* <div className='row'>
        <div className='col text-center'>
          <h5 className='font-weight-normal'>1230</h5>
          <span>Type A</span>
        </div>
        <div className='col text-center'>
          <h5 className='font-weight-normal'>1230</h5>
          <span>Type A</span>
        </div>
        <div className='col text-center'>
          <h5 className='font-weight-normal'>1230</h5>
          <span>Type A</span>
        </div>
      </div> */}
    </div>
  </div>
}
