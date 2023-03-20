import React from 'react'
import './description.scss'
import { toCammelCase } from '../../../../utils/formatText'

// projectName has data will description detail
// projectName has no data --> review
const Description = ({ projectName, text, descriptionToken, chainName }) => {
  // max length displayed first time(more length withh display show more, less length withh display all)
  const length = 500
  const [showLess, setShowLess] = React.useState(true)

  return <div>
    {projectName && <div className='card-header border-0 pb-0'>
      <div className='heading text-primary d-flex align-items-center break-word'>
        <i className='material-icons fs-30 text-primary'>subject</i>
        <h2 style={{ fontSize: '1.5rem' }} className='m-0 text-primary'>
        About {projectName}
        </h2>
      </div>
    </div>
    }
    {text && <div className={projectName ? 'card-body pt-3' : ''}>
      <div className={projectName ? 'profile-blog' : ''}>
        <div className={projectName ? 'mb-0' : ''}>
          <div className='description-list'>
            <div className='card-content' style={{ fontSize: '1rem', lineHeight: '2' }}>
              {text?.length < length ? (
                <p className='cus-text-justify' dangerouslySetInnerHTML={{ __html: `${text}` }}></p>
              ) : (
                <>
                  {descriptionToken
                    ? <>
                      <h1 style={{ fontSize: '14px', color: '#A098AE', fontWeight: '400', display: 'inline' }}>{descriptionToken}</h1>
                      on chain {toCammelCase(chainName)}.&nbsp;
                    </>
                    : ''}
                  <p
                    style={{ display: 'inline' }}
                    className='cus-text-justify'
                    dangerouslySetInnerHTML={{
                      __html: showLess ? `${text?.slice(0, 350)}...` : `${text}`
                    }}
                  ></p>
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

export default Description
