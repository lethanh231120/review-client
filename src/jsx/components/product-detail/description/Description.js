import React, { useState } from 'react'
import './description.scss'

// projectName has data will description detail
// projectName has no data --> review
const Description = ({ projectName, text, skipMinimizeMode = false }) => {
  // max length displayed first time(more length withh display show more, less length withh display all)
  const length = 1000
  const [showLess, setShowLess] = useState(true)

  return <div>
    {(projectName) && <div className='card-header border-0 pb-0'>
      <div className='heading text-primary d-flex align-items-center break-word'>
        <i className='material-icons fs-30 text-primary'>subject</i>
        <h2 style={{ fontSize: '1.5rem' }} className='m-0 text-primary'>
          {projectName}
        </h2>
      </div>
    </div>
    }
    {text && <div className={projectName ? 'card-body pt-3' : ''}>
      <div className={projectName ? 'profile-blog' : ''}>
        <div className={projectName ? 'mb-0' : ''}>
          <div className='description-list'>
            <div className='card-content' style={{ fontSize: '1.2rem', lineHeight: '2' }}>
              {text?.length < length || skipMinimizeMode ? (
                <span className='cus-text-justify' dangerouslySetInnerHTML={{ __html: `${text}` }}></span>
              ) : (
                <>
                  <span
                    style={{ display: 'inline' }}
                    className='cus-text-justify'
                    dangerouslySetInnerHTML={{
                      __html: showLess ? `${text?.slice(0, 900)}...` : `${text}`
                    }}
                  ></span>
                  <span
                    style={{ color: '#18A594' }}
                    className='read-or-hide'
                    onClick={() => setShowLess(!showLess)}
                  >
                &nbsp;View {showLess ? 'More' : 'Less'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    }
  </div>
}

export const blockContent = (content) => <>
  <div className={ 'card-body pt-3' }>
    <div className={ 'profile-blog' }>
      <div className={ 'mb-0' }>
        <div className='description-list'>
          <div className='card-content' style={{ fontSize: '1rem', lineHeight: '2' }}>
            {content}
          </div>
        </div>
      </div>
    </div>
  </div>
</>

export default Description
