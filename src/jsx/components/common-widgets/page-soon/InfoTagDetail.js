import React from 'react'
import _ from 'lodash'
import { encodeUrl } from '../../../../utils/formatUrl'
import { SOON } from '../../../constants/category'
import { useNavigate } from 'react-router-dom'
import InformationSubTitle, { typeTag } from '../page-detail/InformationSubTitle'

export const InfoTagDetail = ({ itemTags }) => {
  const navigate = useNavigate()

  const handleClickTag = (value) => {
    navigate(`../../../../../${SOON}/${encodeUrl(value)}`)
  }

  return !_.isEmpty(itemTags)
    ? <div className='profile-blog mb-3'>
      <InformationSubTitle type={typeTag}/>
      <div style={{ marginLeft: '1.5rem' }}>
        { Object.keys(itemTags)?.map((index) => (
          <div
            className='mb-0 btn btn-primary light btn-xs mb-2 me-1'
            onClick={() => handleClickTag(itemTags[index]?.name)}
            key={index}
          >
            {itemTags[index]?.name}
          </div>
        )) }
      </div>
    </div>
    : ''
}
