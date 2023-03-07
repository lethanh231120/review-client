import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toCammelCase } from '../../../../utils/formatText'
import _ from 'lodash'
import { LaunchpadMapContext } from '../../../../App'
import { LAUNCHPAD, PREFIX_DETAIL } from '../../../constants/category'
import ShortItem from './../page-detail/ShortItem'

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

  return !_.isEmpty(launchpadList) &&
    !_.isEmpty(launchpadMapContext) ? (
      <div className='profile-blog mb-3'>
        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
          <div
            className='form-check custom-checkbox mb-3 checkbox-success'
            style={{ padding: '0' }}
          >
            <div style={{ display: 'block' }}>
              {launchpadList?.map((key, index) => (
                <>
                  <div key={index} style={{ margin: '0.3rem 0.3rem 0 0', display: 'block' }}
                    className='mb-3'
                  >
                    <ShortItem
                      title={<>
                        {projectName} is traded on
                        &nbsp;
                        <img src={launchpadMapContext?.get(key)?.thumbLogo} height={18} width={18} alt='Exchange Logo' style={{ borderRadius: '2rem' }}/>
                        &nbsp;
                        <span onClick={(e) => { forwardDetailLaunchpad(e, key) } }
                          className='text-primary txt-link'
                        >
                          {toCammelCase(launchpadMapContext?.get(key)?.name)}
                        </span>
                      </>}
                    />
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
