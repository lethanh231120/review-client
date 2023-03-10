import React from 'react'
import './description.scss'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

// projectName has data will description detail
// projectName has no data --> review
const Description = ({ projectName, text }) => {
  // max length displayed first time(more length withh display show more, less length withh display all)
  const length = 250
  const [showLess, setShowLess] = React.useState(true)

  return <div>
    {projectName && <div className='card-header border-0 pb-0'>
      <h5 className='heading text-primary d-flex align-items-start break-word'>
        <i className='material-icons fs-30 text-primary'>subject</i>
            About {projectName}
      </h5>
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
                  <p
                    className='cus-text-justify'
                    dangerouslySetInnerHTML={{
                      __html: showLess ? `${text?.slice(0, length)}...` : `${text}`
                    }}
                  ></p>
                  <span
                    style={{ color: '#18A594' }}
                    className='read-or-hide'
                    onClick={() => setShowLess(!showLess)}
                  >
                &nbsp;View {showLess ? 'More' : 'Less'}
                    {showLess ? <DownOutlined /> : <UpOutlined />}
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
