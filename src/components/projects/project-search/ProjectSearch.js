import React from 'react'
import './projectSearch.scss'
import { Image } from 'antd'
import scam from '../../../assets/images/scam.png'
import warning from '../../../assets/images/warning.png'
import { Link } from 'react-router-dom'

const ProjectSearch = ({ data }) => {
  return (
    <>
      <Link to={`../../../products/${data?.id}`} className='project-search'>
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
              {(data?.type === 'coin' || data?.type === 'token' || data?.type === 'ico') && (
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
            {data?.category && (
              <div className='project-search-category'>
                {data?.category}
              </div>
            )}
            {data?.chainName && (
              <div className='project-search-chain'>
                {data?.chainName}
              </div>
            )}
          </div>
        </div>
      </Link>
    </>
  )
}

export default ProjectSearch
