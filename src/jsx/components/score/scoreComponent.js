import React from 'react'
import { Badge } from 'react-bootstrap'
import './score.scss'
import { CRYPTO, DAPP, EXCHANGE, LAUNCHPAD, VENTURE } from './../../constants/category'

const MyScoreComponent = ({ score, type }) => {
  let output = 0
  let classname
  if (score) {
    if (score <= 0) {
      output = 0
    } else {
      if (type === LAUNCHPAD) {
        output = score / 3.5
      }
      if (type === VENTURE || type === EXCHANGE) {
        output = score / 20
      }
      if (type === CRYPTO || type === DAPP) {
        output = score / 10
      }
    }

    // color
    if (parseInt(output) > 6) {
      classname = 'badge-success'
    } else if (parseInt(output) >= 4 && parseInt(output) <= 6) {
      classname = 'badge-warning'
    } else if (parseInt(output) < 4) {
      classname = 'badge-danger'
    }
  } else {
    classname = 'badge-danger'
  }

  return <Badge bg='badge-l' className={`progress-bar-striped progress-bar-animated ${classname}`}>{output === 0 ? '0.0' : output.toFixed(1)}</Badge>
}

export default MyScoreComponent
