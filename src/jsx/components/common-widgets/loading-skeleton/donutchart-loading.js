import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'

export const DonutChartSkeleton = () => {
  return <div className='card summary-chart'>
    <div >
      <Placeholder as={Card.Title} animation='glow'>
        <Placeholder xs={12}/>
      </Placeholder>
    </div>
    <div className='card-body text-center pt-0 '>
      <div id='morris_donught' className='custome-donut'>
        <Placeholder as={Card.Body} animation='glow'>   <Placeholder /></Placeholder>
      </div>
      <div className='chart-items'>
        <div className='row'>
          <div className=' col-xl-12 col-sm-12 '>
            <div className='text-start chart-legend'>
              <Placeholder as={Card.Footer} animation='glow'><Placeholder /></Placeholder>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
