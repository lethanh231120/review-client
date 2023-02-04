import React from 'react'
import './description.scss'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

const Description = ({ text }) => {
  // max length displayed first time(more length withh display show more, less length withh display all)
  const length = 600
  const [showLess, setShowLess] = React.useState(true)

  return (
    <>
      <div className='description-list'>
        <div className='card-content'>
          {text.length < length ? (
            <p className={`text-justify`} dangerouslySetInnerHTML={{ __html: text }}></p>
          ) : (
            <>
              <p
                className={`text-justify`}
                dangerouslySetInnerHTML={{
                  __html: showLess ? `${text.slice(0, length)}...` : text
                }}
              ></p>
              <span
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
    </>
  )
}

export default Description
