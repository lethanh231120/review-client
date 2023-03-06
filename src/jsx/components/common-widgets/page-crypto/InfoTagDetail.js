import React from 'react'
import _ from 'lodash'
import { encodeUrl } from '../../../../utils/formatUrl'
import { CRYPTO } from '../../../constants/category'
import InformationSubTitle, { typeTag } from '../page-detail/InformationSubTitle'
import { useNavigate } from 'react-router-dom'

export const InfoTagDetail = ({ itemTags }) => {
  const navigate = useNavigate()
  const handleClickTag = (value) => {
    navigate(`../../../../../${CRYPTO}/${encodeUrl(value)}`)
  }

  return !_.isEmpty(itemTags)
    ? <div className='profile-blog mb-3 mt-2'>
      <InformationSubTitle type={typeTag}/>
      <div style={{ marginLeft: '1.5rem' }}>
        {itemTags?.map((item) => (
          <div
            className='mb-0 btn btn-primary light btn-xs mb-2 me-1'
            onClick={() => handleClickTag(item)}
            key={item}
          >
            {item}
          </div>
        )) }
      </div>
    </div>
    : ''
}
