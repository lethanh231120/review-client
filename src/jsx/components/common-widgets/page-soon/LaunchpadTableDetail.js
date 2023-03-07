import React, { useContext } from 'react'
import { LaunchpadMapContext } from './../../../../App'
import _ from 'lodash'

export const LaunchpadTableDetail = ({ launchpadId }) => {
  const launchpadMapContext = useContext(LaunchpadMapContext)

  if (!_.isEmpty(launchpadMapContext) && launchpadId) {
    const dataLaunchpad = launchpadMapContext?.get(launchpadId)
    if (dataLaunchpad) {
      return <a className='mb-0 btn-xs link-success' style={{ textDecoration: 'underline' }} href={dataLaunchpad?.website} target='_blank' rel='noreferrer'><img src={dataLaunchpad?.thumbLogo} height={24} width={24}/>&nbsp;{dataLaunchpad?.name}</a>
    }
  }
  return ''
}
