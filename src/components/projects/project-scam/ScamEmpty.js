import React from 'react'
import { Skeleton } from 'antd'
import './projectScam.scss'

const ScamEmpty = ({ key }) => {
  return (
    <div className="project-scam" key={key}>
        <div className="project-scam-image">
            <Skeleton.Image active />
        </div>
        <div className='project-scam-content'>
            <div className="project-content-name">
                <Skeleton.Button active size='small' shape='round' style={{ height: '2rem' }}/>
            </div>
        </div>
        <div className='project-scam-footer'>
            <Skeleton.Button active size='small' shape='round' style={{ height: '2rem' }} />
        </div>
    </div>
  )
}

export default ScamEmpty
