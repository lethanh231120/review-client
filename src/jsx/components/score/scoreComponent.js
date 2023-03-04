import React from 'react'
import { Badge } from 'react-bootstrap'
import './score.scss'

const MyScoreComponent = ({ score, type }) => {
  let output = 0
  let classname = 'success'
  if (score) {
    if (type === 'launchpad') {
      output = score / 3.5
    }
    if (type === 'venture' || type === 'exchange') {
      output = score / 20
    }
    if (type === 'crypto' || type === 'dapp') {
      output = score / 10
    }

    // color
    if (parseInt(output) > 6) {
      classname = 'badge-success'
    } else if (parseInt(output) >= 4 && parseInt(output) <= 6) {
      classname = 'badge-warning'
    } else if (parseInt(output) < 4) {
      classname = 'badge-danger'
    }
  }
  return <Badge bg='badge-l' className={`progress-bar-striped progress-bar-animated ${classname}`}>{output.toFixed(1)}</Badge>
}

export default MyScoreComponent
