import React from 'react'
import { Skeleton } from 'antd'
import './projectItem.scss'

const ProjectEmpty = () => {
  return (
    <div className="project">
        <div className="project-image">
            <Skeleton.Image active />
        </div>
        <div className="project-content">
            <Skeleton active />
        </div>
        <div className="project-footer">
            <div className="project-footer-item">
                <Skeleton.Button active size='small' shape='round' style={{ height: '1.5rem' }}/>
            </div>
            <div className="project-footer-item">
                <Skeleton.Button active size='small' shape='round' style={{ height: '1.5rem' }}/>
            </div>
            <div className="project-footer-item">
                <Skeleton.Button active size='small' shape='round' style={{ height: '1.5rem' }}/>
            </div>
        </div>
    </div>
  )
}

export default ProjectEmpty
