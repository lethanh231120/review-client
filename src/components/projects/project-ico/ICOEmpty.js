import React from 'react'
import { Skeleton } from 'antd';
import './projectICO.scss'

const ICOEmpty = ({ bgurl, data }) => {
  return (
    <div className="project-ico">
        <div
            className='project-ico-banner'
            style={{
                backgroundImage: "url(" + bgurl + ")"
            }}
        >
            <div className="project-ico-image">
                <Skeleton.Avatar active size='large' shape='circle' />
            </div>
            <Skeleton.Button active shape='round' style={{ width: '2.5rem', height: '1.2rem' }}/>
        </div>
        <div className="project-ico-content">
            <Skeleton active />
        </div>
    </div>
  )
}

export default ICOEmpty
