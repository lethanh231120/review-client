import React from 'react'
import { Link } from 'react-router-dom'

export const typeShort = 'short_text'
export const typeWebsite = 'language'
export const typeTag = 'sell'
const titleShort = 'Short:'
const titleWebsite = 'Website:'
const titleTag = 'Tag:'

const InformationSubTitle = ({ type }) => {
  let title
  switch (type) {
    case typeShort:
      title = titleShort
      break
    case typeWebsite:
      title = titleWebsite
      break
    case typeTag:
      title = titleTag
      break
    default:
      break
  }

  return <Link to={'#'} >
    <h4 className='d-flex align-items-center'>
      <i className='material-icons fs-23 text-primary'>{type}</i>
      { title }
    </h4>
  </Link>
}

export default InformationSubTitle
