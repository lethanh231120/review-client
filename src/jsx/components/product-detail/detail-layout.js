import { Fragment } from 'react'

export const DetailLayout = ({ Header, summary, more, about, portfolioOrChart, report, isScam }) => {
  return <Fragment>
    <div className='row'>
      {/* detail Header: icon, name, score */}
      <div className='col-lg-12'>
        <div className='profile card card-body px-3 pt-3 pb-0'>
          {Header}
        </div>
      </div>
    </div>
    <div className='row'>

      <div className='col-xl-4'>
        <div className='row'>
          {/* Total Scam, Total Reviews, Score */}
          <div className='col-lg-12'>
            <div className='card'>
              <div className='card-body'>
                <div className='profile-statistics'>
                  {summary}
                </div>
              </div>
            </div>
          </div>
          {/* Scam/Warning message*/}
          {isScam && <div className='col-lg-12'>
            <div className='card'>
              <div className='card-body pt-3'>
                <div className='profile-interest '>
                </div>
              </div>
            </div>
          </div>}
          {/* Mores*/}
          <div className='col-lg-12'>
            <div className='card'>
              {more}
            </div>
          </div>
          {/* About */}
          <div className='col-lg-12'>
            <div className='card'>
              {about}
            </div>
          </div>
        </div>
      </div>
      <div className='col-xl-8'>
        {portfolioOrChart && <div className='card'>
          {portfolioOrChart}
        </div>
        }
        <div className='card'>
          <div className='card-body'>
            <div className='profile-tab'>
              <div className='custom-tab-1'>
                {report}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </Fragment>
}
