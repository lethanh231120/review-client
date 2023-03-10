import { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
// import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { get } from '../../../api/BaseRequest'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'
import Barchart from './charts/BarChart'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'

const InsightMain = () => {
  // const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  useEffect(() =>{
    const getInsightChart = async() => {
      const res = await get('reviews/chart')
      if (res?.code === 'B.CODE.200') {
        setData(res?.data)
        setLoading(false)
      }
    }

    getInsightChart()
  }, [])

  const getChartType = (data) => {
    switch (data?.typechart) {
      case 'pie':
        return <PieChart dataSet={data} height={200} isDetail={false}/>
      case 'line':
        return <LineChart dataSet={data} height={150} isDetail={false}/>
      case 'bar':
        return <Barchart dataSet={data} height={150} isDetail={false}/>
      default:
        return null
    }
  }

  const chartSection = (data, chartId) => {
    return <Col key={chartId} xl={4} lg={12} style={{ display: 'flex', cursor: 'pointer' }} >
      <Card style={{ width: '100%' }}>
        <Card.Header>
          <h4 className='card-title'>{data?.title}</h4>
        </Card.Header>
        <Card.Body>
          <Link to={`${chartId}`}
            style={{ width: '100%' }}
          // state={chartId}
          >
            {getChartType(data)}
          </Link>
        </Card.Body>
      </Card>
    </Col>
  }

  return loading ? <MySkeletonLoadinng count={4} height={100}/>
    : <>
      {/* <h3 style={{ marginBottom: '20px' }}>Gear5 Data Insights</h3> */}
      <Row >
        {data && Object.keys(data)?.map(key => chartSection(data[key], key))}
      </Row>
    </>
}

export default InsightMain
