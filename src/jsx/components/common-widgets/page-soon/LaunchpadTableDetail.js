import React, { useContext } from 'react'
import { LaunchpadMapContext } from './../../../../App'
import _ from 'lodash'

export const LaunchpadTableDetail = ({ launchpadId }) => {
  const launchpadMapContext = useContext(LaunchpadMapContext)
  console.log(launchpadMapContext, launchpadId, launchpadMapContext?.get(launchpadId))

  if (!_.isEmpty(launchpadMapContext) && launchpadId) {
    const dataLaunchpad = launchpadMapContext?.get(launchpadId)
    if (dataLaunchpad) {
      return <div className='mb-0 btn btn-primary light btn-xs' onClick={() => { window.open(dataLaunchpad?.website, '_blank') }}><img src={dataLaunchpad?.thumbLogo} height={24} width={24}/>&nbsp;{dataLaunchpad?.name}</div>
    }
  }
  return ''
}
