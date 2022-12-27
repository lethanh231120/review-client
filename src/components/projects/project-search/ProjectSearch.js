import React from 'react'
import './projectSearch.scss'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import scam from '../../../assets/images/scam.png'
import warning from '../../../assets/images/warning.png'

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
              {(data?.type === 'coin' || data?.type === 'token') && (
                <>
                  {data?.symbol && (
                    <div className='project-search-symbol'>{data?.symbol}</div>
                  )}
                </>
              )}
              <div className='project-search-name-icon'>
                {data?.isScam ? (
                  <Image src={scam} preview={false}/>
                ) : (data?.isWarning) ? (
                  <Image src={warning} preview={false}/>
                ) : ''}
              </div>
          </div>
          {data?.desc && (
            <div className='project-search-name-description'>
              {data?.desc}
            </div>
          )}
          <div className='project-search-more'>
            <div className='project-search-category'>
              Blockchain Games
            </div>
            <div className='project-search-chain'>
              Ethereum
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectSearch
