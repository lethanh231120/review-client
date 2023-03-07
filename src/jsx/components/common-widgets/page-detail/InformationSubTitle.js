import React from 'react'
import { Link } from 'react-router-dom'

export const typeShort = 'short_text'
export const typeWebsite = 'language'
export const typeTag = 'sell'
export const typeLaunchpad = 'rocket_launch'
export const typeContract = 'integration_instructions'
export const typeAvailable = 'check'
export const typeExchange = 'currency_exchange'
export const typeExplorer = 'travel_explore'

const titleShort = 'Short:'
const titleWebsite = 'Website:'
const titleTag = 'Tag:'
const titleLaunchpad = 'Launchpad:'
const titleContract = 'Contract detail:'
const titleAvailable = 'Available on:'
const titleExchange = 'Exchange:'
const titleExplorer = 'Explorer:'

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
    case typeLaunchpad:
      title = titleLaunchpad
      break
    case typeContract:
      title = titleContract
      break
    case typeAvailable:
      title = titleAvailable
      break
    case typeExchange:
      title = titleExchange
      break
    case typeExplorer:
      title = titleExplorer
      break
    default:
      break
  }

  return <Link to={'#'} >
    <h4 className='d-flex align-items-center'>
      <i className='material-icons fs-20 text-primary'>{type}</i>
      &nbsp;
      { title }
    </h4>
  </Link>
}

export default InformationSubTitle
