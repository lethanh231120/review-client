import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toCammelCase } from '../../../../utils/formatText'
import _ from 'lodash'
import { LaunchpadMapContext } from '../../../../App'
import { LAUNCHPAD, PREFIX_DETAIL } from '../../../constants/category'

export const filterDuplicateLaunchpadId = (launchpadList) => {
  const mapLaunchpad = new Map()
  const outputListLaunchpad = []
  launchpadList?.forEach((launchpad) =>{
    const isExist = mapLaunchpad.get(launchpad)
    if (!isExist) {
      mapLaunchpad.set(launchpad, true)
      outputListLaunchpad.push(launchpad)
    }
  })
  return outputListLaunchpad
}

const LaunchpadDetail = ({ projectName, launchpadList }) => {
  const launchpadMapContext = useContext(LaunchpadMapContext)
  launchpadList = filterDuplicateLaunchpadId(launchpadList)
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
          <h4 className='d-flex align-items-center'>
            <i className={`material-icons fs-23 text-primary`}>rocket_launch</i>
            Launchpad:
          </h4>
        </Link>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
          <div
            className='form-check custom-checkbox mb-3 checkbox-success'
            style={{ padding: '0' }}
          >
            <div style={{ display: 'block', marginLeft: '1.5rem' }}>

              {`${projectName} launches on `}
              {launchpadList?.map((key, index) => (
                <>
                  <div key={index} style={{ margin: '0.3rem 0.3rem 0 0', display: 'inline-block' }} className='mb-0 btn btn-primary light btn-xs mb-2 me-1' onClick={(e) => { forwardDetailLaunchpad(e, key) } }>
                    <img alt='Launchpad Logo' src={launchpadMapContext?.get(key)?.thumbLogo} height={24} width={24} />
                      &nbsp;&nbsp;
                    {toCammelCase(launchpadMapContext?.get(key)?.name)}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      ''
    )
}

export default LaunchpadDetail
