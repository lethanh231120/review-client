import React from 'react'
import './description.scss'
import { toCammelCase } from '../../../../utils/formatText'
import _ from 'lodash'

// projectName has data will description detail
// projectName has no data --> review
const Description = ({ projectName, text, descriptionTokenMultichain }) => {
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
                <span className='cus-text-justify' dangerouslySetInnerHTML={{ __html: `${text}` }}></span>
              ) : (
                <>
                  <span
                    style={{ display: 'inline' }}
                    className='cus-text-justify'
                    dangerouslySetInnerHTML={{
                      __html: showLess ? `${text?.slice(0, 350)}...` : `${text}`
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
              { !_.isEmpty(descriptionTokenMultichain)
                ? <>
                  <br />
                  <br />
                  <b className='fs-16 text-primary'>{projectName}&apos;s Contract Address:</b>
                  <br />

                  <div>
                    {descriptionTokenMultichain.map((chain) => (<>
                      {
                        chain?.split('_')?.length >= 4
                          ? <div className='mb-3'>
                            <h3 style={{ fontSize: '14px', color: '#A098AE', fontWeight: '400', display: 'inline' }}>
                              <span className='text-primary text-break'>{chain?.split('_')[3]}</span>&nbsp;
                            on chain {toCammelCase(chain?.split('_')[2])}
                            </h3>
                          </div>
                          : ''
                      }
                    </>
                    ))}
                  </div>
                  &nbsp;
                </>
                : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
    }
  </div>
}

export default Description
