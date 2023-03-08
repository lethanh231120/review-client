import { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { get } from '../../../api/BaseRequest'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'
import Barchart from './charts/BarChart'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'

const InsightMain = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  console.log(data)
  useEffect(() =>{
    const getInsightChart = async() => {
      const res = await get('reviews/chart')
      if (res?.code === '200' || res?.code === 200) {
        setData(res?.data)
        setLoading(false)
      }
    }

    getInsightChart()
  }, [])

  return loading ? <MySkeletonLoadinng count={4} height={100}/>
    : <>
      <h3 style={{ marginBottom: '20px' }}>Gear5 Data Insights</h3>
      <Row >
        {data && data?.map(item => chartSection(item))}
      </Row>
    </>
}

const getChartType = (data) => {
  switch (data?.typechart) {
    case 'pie':
      return <PieChart dataSet={data}/>
    case 'line':
      return <LineChart dataSet={data}/>
    case 'bar':
      return <Barchart dataSet={data}/>
    default:
      return null
  }
}

const chartSection = (data) => {
  return <Col xl={4} lg={4} style={{ display: 'flex' }} >
    <Card style={{ width: '100%' }}>
      <Card.Header>
        <h4 className='card-title'>{data?.title}</h4>
      </Card.Header>
      <Card.Body>
        {getChartType(data)}
      </Card.Body>
    </Card>
  </Col>
}

export default InsightMain
