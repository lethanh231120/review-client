import React from 'react'
import InformationSubTitle, { typeLaunchpad } from '../page-detail/InformationSubTitle'
import LaunchpadDetail from './LaunchpadDetail'

export const InfoLaunchpadDetail = ({ projectName, launchpads }) => {
  return launchpads && <>
    <InformationSubTitle type={typeLaunchpad}/>
    <LaunchpadDetail projectName={projectName} launchpadList={launchpads}/>
  </>
}
