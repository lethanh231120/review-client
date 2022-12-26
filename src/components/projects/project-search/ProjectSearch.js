import React from 'react'
import './projectSearch.scss'
import { Image } from 'antd'
import checked from '../../../assets/images/checked.png'
import { useNavigate } from 'react-router-dom'
import checked_scam from '../../../assets/images/checked_scam.png'

const ProjectSearch = ({ data }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className='project-search' onClick={() => navigate(`../../../products/${data?.id}`)}>
        <div className='project-search-image'>
          {data?.image ? (
            <Image src={data?.image} preview={false}/>
          ) : (
              <span className='project-search-image-logo'>
                {data?.name?.slice(0, 3)?.toUpperCase()}
            </span>
          )}
        </div>
        <div className='project-search-content'>
          <div className='project-search-name'>
              {data?.name}
              <div className='project-search-name-icon'>
                <Image src={data?.isScam ?  checked_scam : checked} preview={false}/>
              </div>
          </div>
          <div className='project-search-name-description'>
            {data?.desc}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectSearch
