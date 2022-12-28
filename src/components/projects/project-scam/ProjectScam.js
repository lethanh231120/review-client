import React from 'react'
import { Image } from 'antd'
import './projectScam.scss'
import scam_mask from '../../../assets/images/mask-scam.png'
import scam from '../../../assets/images/scam.png'

const ProjectScam = ({ bgurl, image, chain, data, key }) => {
  return (
    <div className="project-scam" key={key}>
        <div className="project-scam-image">
            <Image src={data?.image} preview={false}/>
            <div className='project-scam-mask'>
                <div className='project-scam-mask-scam'>
                    <Image src={scam_mask} preview={false}/>
                    {data?.totalIsScam}
                </div>
            </div>
        </div>
        <div className='project-scam-content'>
            <div className="project-content-name">
                {data?.name}
            </div>
        </div>
        <div className='project-scam-footer'>
            <div className='project-scam-footer-founder'>
                LeThanh
            </div>
            <div className='project-scam-footer-icon'>
                <Image src={scam} preview={false}/>
            </div>
            <div className='project-scam-footer-date'>14/12</div>
        </div>
    </div>
  )
}

export default ProjectScam
