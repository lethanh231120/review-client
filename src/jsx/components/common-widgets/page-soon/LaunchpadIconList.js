import React, { useContext } from 'react'
import { Avatar, Tooltip } from 'antd'
import { LaunchpadMapContext } from '../../../../App'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { LAUNCHPAD, PREFIX_DETAIL } from './../../../constants/category'
import { filterDuplicateLaunchpadId } from './LaunchpadDetail'

const absentData = '__'
const LaunchpadIconList = ({ listLaunchpad }) => {
  const launchpadMapContext = useContext(LaunchpadMapContext)
  listLaunchpad = filterDuplicateLaunchpadId(listLaunchpad)
  const navigate = useNavigate()

  const forwardDetailLaunchpad = (e, launchpadObj) => {
    e.stopPropagation()
    e.preventDefault()
    const launchpadId = launchpadMapContext?.get(launchpadObj)?.launchPadId?.split('_')[2]
    if (launchpadId) {
      navigate(`/${PREFIX_DETAIL}/${LAUNCHPAD}/${launchpadId}`)
    }
  }

  return (
    <Avatar.Group
      alt='Launchpads Logos'
      maxCount={2}
      size={20}
      maxStyle={{
        color: '#fff',
        backgroundColor: '#039F7F',
        cursor: 'pointer'
      }}
    >
      {listLaunchpad && !_.isEmpty(listLaunchpad) && !_.isEmpty(launchpadMapContext)
        ? listLaunchpad?.map((key, index) => (
          <Tooltip title={launchpadMapContext?.get(key)?.name} key={index} >
            <Avatar
              alt='Launchpad Logo'
              size={20}
              src={launchpadMapContext?.get(key)?.thumbLogo}
              className='soon-table-blockchain'
              onClick={(e) => {
                forwardDetailLaunchpad(e, key)
              }}
            />
          </Tooltip>
        ))
        : absentData}
    </Avatar.Group>
  )
}

export default LaunchpadIconList
