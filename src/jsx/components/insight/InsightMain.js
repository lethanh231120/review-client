import { Card, Col, Row } from 'react-bootstrap'
import Barchart from './charts/BarChart'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'

const InsightMain = () => {
  return (
    <>
      <h3 style={{ marginBottom: '20px' }}>Gear5 Data Insights</h3>
      <Row >
        {chartSection('Token Allocation Bar Chart', <Barchart/>)}
        {chartSection('Token Allocation Pie Chart', <PieChart />)}
        {chartSection('Blockchains Allocation Line Chart', <LineChart />)}
        {chartSection('Token Allocation Bar Chart', <Barchart/>)}
        {chartSection('Token Allocation Pie Chart', <PieChart />)}
        {chartSection('Blockchains Allocation Line Chart', <LineChart />)}
        {chartSection('Token Allocation Bar Chart', <Barchart/>)}
        {chartSection('Token Allocation Pie Chart', <PieChart />)}
        {chartSection('Blockchains Allocation Line Chart', <LineChart />)}
      </Row>
    </>
  )
}

const chartSection = (title, chart) => {
  return <Col xl={4} lg={4} style={{ display: 'flex' }} >
    <Card style={{ width: '100%' }}>
      <Card.Header>
        <h4 className='card-title'>{title}</h4>
      </Card.Header>
      <Card.Body>
        {chart}
      </Card.Body>
    </Card>
  </Col>
}

export default InsightMain
