import React from 'react'
import { Image } from 'antd';
import './projectICO.scss'
import moment from 'moment'

const ProjectICO = ({ bgurl, data }) => {
  return (
    <div className="project-ico">
        <div
            className='project-ico-banner'
            style={{
                backgroundImage: "url(" + bgurl + ")"
            }}
        >
            <div className="project-ico-image">
                <Image src={data?.image} preview={false}/>
            </div>
            <div className="project-ico-chain">
                {/* <Image src={chain} preview={false}/> */}
                {data?.chainName}
            </div>
        </div>
        <div className="project-ico-content">
            <div className="project-ico-content-name">{data?.name}</div>
            <div className='project-ico-content-parameter'>
                Place:
                <div className="project-ico-content-parameter-value">{data?.detail?.listplace}</div>
            </div>
            <div className='project-ico-content-parameter'>
                Goal
                <div className="project-ico-content-parameter-value">
                    {data?.detail?.goal?.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </div>
            </div>
            <div className='project-ico-content-parameter'>
                Founder
                <div className="project-ico-content-parameter-value">
                    {data?.detail?.founder}
                </div>
            </div>
            <div className='project-ico-content-parameter'>
                Start date
                <div className="project-ico-content-parameter-value">
                    {moment(data?.detail?.startDate).subtract(10, 'days').calendar()}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProjectICO
