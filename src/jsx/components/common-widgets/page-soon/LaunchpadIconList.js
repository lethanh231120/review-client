import React, { useContext } from 'react'
import { Avatar, Tooltip } from 'antd'
// import { LaunchpadMapContext } from '../../../index'
import { LaunchpadMapContext } from '../../../../App'

const absentData = '__'
const LaunchpadIconList = ({ listLaunchpad }) => {
  const launchpadMapContext = useContext(LaunchpadMapContext)

  return (
    <Avatar.Group
      maxCount={2}
      size={20}
      maxStyle={{
        color: '#fff',
        backgroundColor: '#039F7F',
        cursor: 'pointer'
      }}
    >
      {listLaunchpad
        ? listLaunchpad?.map((key, index) => (
          <>
            <Tooltip title={launchpadMapContext?.get(key)?.name}>
              <Avatar
                size={20}
                src={launchpadMapContext?.get(key)?.thumbLogo}
                key={index}
                className='soon-table-blockchain'
                onClick={(e) => {
                  e.stopPropagation()
                }}
              />
            </Tooltip>
          </>
        ))
        : absentData}
    </Avatar.Group>
  )
}

export default LaunchpadIconList
