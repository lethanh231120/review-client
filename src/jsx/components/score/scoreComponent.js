import React from 'react'
import { Badge } from 'react-bootstrap'
import './score.scss'

const MyScoreComponent = ({ score }) => {
  const MAX_SCORE = 100
  let output = 0
  let classname = 'success'
  if (score || score === 0) {
    if (score > MAX_SCORE) {
      output = 10
    } else if (score <= 0) {
      output = 0
    } else {
      output = (score * 10 / MAX_SCORE)
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
  return <Badge bg=' badge-l' className={classname}>{output.toFixed(1)}</Badge>
}

export default MyScoreComponent
