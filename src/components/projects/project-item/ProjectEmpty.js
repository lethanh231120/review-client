import React from 'react'
import { Skeleton } from 'antd'
import './projectItem.scss'
import checked_scam from '../../../assets/images/checked_scam.png'

const ProjectEmpty = ({ data, checked, chat_icon, love_icon, scam_icon }) => {
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
