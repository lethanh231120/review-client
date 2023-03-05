import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { websiteIcon } from '../icons'
import { openWebsite } from '../../../../utils/effect'

export const WebsiteButton = ({ website }) => {
  const waitMillSecOpenWebsite = 3000
  const [websiteLoading, setWebsiteLoading] = useState(false)

  return website && <Button
    className='btn btn-primary ms-auto'
    onClick={() => openWebsite(website, setWebsiteLoading, waitMillSecOpenWebsite)}
  >
    <div className='d-flex align-items-center'>
      {websiteLoading ? <Spin indicator={<LoadingOutlined spin />} size='small' style={{ color: 'white', marginRight: '0.3rem' }} /> : ''}
      {websiteIcon}Website
    </div>
  </Button>
}
