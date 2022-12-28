import React from 'react'
import { Image } from 'antd'
import './projectItem.scss'
import scam from '../../../assets/images/scam.png'
import warning from '../../../assets/images/warning.png'

const ProjectItem = ({ data, checked, chat_icon, love_icon, scam_icon }) => {
  return (
    <div className="project">
        <div className="project-image">
            <Image src={data?.image} preview={false}/>
        </div>
        <div className="project-content">
        <div className="project-content-name">
            <span>{data?.name}</span>
            <div className="project-content-icon">
                {data?.isScam ? (
                  <Image src={scam} preview={false}/>
                ) : (data?.isWarning) ? (
                  <Image src={warning} preview={false}/>
                ) : ''}
            </div>
        </div>
        <div className="project-content-description">
            {data?.desc ? data?.desc : ''}
            {/* The live Bitcoin price today is $16.749,67 USD with a 24-hour trading volume of $11.784.572.436 USD. We update our BTC to USD price in real-time */}
        </div>
        </div>
        <div className="project-footer">
        <div className="project-footer-item">
            <Image src={chat_icon} preview={false}/>
            {data?.totalReviews}
        </div>
        <div className="project-footer-item">
            <Image src={love_icon} preview={false}/>
            {data?.totalNotScam}
        </div>
        <div className="project-footer-item">
            <Image src={scam_icon} preview={false}/>
            {data?.totalIsScam}
        </div>
        </div>
    </div>
  )
}

export default ProjectItem
