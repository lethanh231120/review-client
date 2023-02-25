import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toCammelCase } from '../../../../utils/formatText'
import _ from 'lodash'
import { LaunchpadMapContext } from '../../../../App'
import { LAUNCHPAD, PREFIX_DETAIL } from '../../../constants/category'

const LaunchpadDetail = ({ projectName, launchpadList }) => {
  const launchpadMapContext = useContext(LaunchpadMapContext)
  const navigate = useNavigate()

  const forwardDetailLaunchpad = (e, launchpadObj) => {
    e.stopPropagation()
    e.preventDefault()
    const launchpadId = launchpadMapContext?.get(launchpadObj)?.launchPadId?.split('_')[2]
    if (launchpadId) {
      navigate(`/${PREFIX_DETAIL}/${LAUNCHPAD}/${launchpadId}`)
    }
  }

  return projectName &&
    !_.isEmpty(launchpadList) &&
    !_.isEmpty(launchpadMapContext) ? (
      <div className='profile-blog mb-3'>
        <Link to={'#'}>
          <h4>Launchpad(s):</h4>
        </Link>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
          <div
            className='form-check custom-checkbox mb-3 checkbox-success'
            style={{ padding: '0' }}
          >
            <>
              {launchpadList?.map((key, index) => (
                <>
                  <div style={{ display: 'block' }} onClick={(e) => { forwardDetailLaunchpad(e, key) } }>
                    {`${projectName} run on `}
                    <div key={index} style={{ margin: '0.3rem 0.3rem 0 0', display: 'inline-block' }} className='mb-0 btn btn-primary light btn-xs mb-2 me-1'>
                      <img src={launchpadMapContext?.get(key)?.thumbLogo} height={24} width={24} />
                      &nbsp;&nbsp;
                      {toCammelCase(launchpadMapContext?.get(key)?.name)}
                    </div>
                  </div>
                </>
              ))}
            </>
          </div>
        </div>
      </div>
    ) : (
      ''
    )
}

export default LaunchpadDetail
