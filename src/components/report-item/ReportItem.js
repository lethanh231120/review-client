import React from 'react'
import './reportItem.scss'
import user from '../../assets/images/user.png'
import post from '../../assets/images/post.png'
import { Image } from 'antd'
import _ from 'lodash'
import { LinkOutlined } from '@ant-design/icons'
import moment from 'moment'

const ReportItem = ({ data }) => {
  console.log(data)
  return (
    <div className='report-item'>
      <div className='report-item-image'>
        <Image src={data?.userImage ? data?.userImage : user} preview={false}/>
      </div>
      <div className='report-item-content'>
        <div className='report-item-content-name'>
            {data?.userName}
            <div className='report-item-content-time'>
              {/* {moment(data?.createddate).subtract(10, 'days').calendar()}</div> */}
              {moment(data?.createddate).fromNow()}
            </div>
        </div>
        <div className='report-item-content-desc'>
            {data?.reason}
            {!_.isEmpty(data?.sources) && (
              <div className='report-item-content-source'>
                {data?.sources?.map((item, index) => (
                  <a href={item} target='_blank'><LinkOutlined style={{ marginRight: '0.5rem' }}/> Proof {index}</a>
                ))}
              </div>
            )}
        </div>
        {data?.image && (
          <div className='report-item-content-image'>
            <Image src={data?.image} preview={true}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportItem
