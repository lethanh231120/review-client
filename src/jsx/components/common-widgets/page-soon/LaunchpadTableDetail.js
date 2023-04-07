import React, { useContext } from 'react'
import { LaunchpadMapContext } from './../../../../App'
import _ from 'lodash'

export const LaunchpadTableDetail = ({ launchpadId, linkBuy }) => {
  const launchpadMapContext = useContext(LaunchpadMapContext)

  if (!_.isEmpty(launchpadMapContext) && launchpadId) {
    const dataLaunchpad = launchpadMapContext?.get(launchpadId)
    if (dataLaunchpad) {
      return <>

        <a className='mb-0 link-success txt-link' href={linkBuy || dataLaunchpad?.website} target='_blank' rel='noopener noreferrer'><img src={dataLaunchpad?.thumbLogo} height={18} width={18}/>{dataLaunchpad?.name}</a>
      </>
    }
  }
  return ''
}
