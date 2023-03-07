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
export const typeBlockchain = ''
export const typeSocial = ''

const titleShort = 'Short:'// Soon detail
const titleWebsite = 'Website:'// Soon detail
const titleTag = 'Tag:'// Soon, Crypto detail
const titleLaunchpad = 'Launchpad:' // Soon detail
const titleContract = 'Contract detail:'// Crypto detail
const titleAvailable = 'Available on:'// Crypto detail
const titleExchange = 'Exchange:'// Crypto detail
const titleExplorer = 'Explorer:' // Crypto detail
const titleBlockchain = 'Chain:' // Dapp detail
const titleSocial = 'Social:' // Dapp detail

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
    case typeBlockchain:
      title = titleBlockchain
      break
    case typeSocial:
      title = titleSocial
      break
    default:
      break
  }

  return <Link to={'#'} >
    <h4 className='d-flex align-items-center' style={{ cursor: 'auto' }}>
      <i className='material-icons fs-20 text-primary'>{type}</i>
      &nbsp;
      { title }
    </h4>
  </Link>
}

export default InformationSubTitle
