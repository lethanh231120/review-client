import React from 'react'
import './score.scss'

const green = '#039F7F'
const yellow = '#F5B97F'
const red = '#EA3943'

const MyScoreComponent = ({ score }) => {
  let output = 0
  let color
  if (score || score === 0) {
    if (score > 200) {
      output = 10
    } else if (score <= 0) {
      output = 0
    } else {
      output = (score * 10 / 200)
    }

    // color
    if (parseInt(output) > 6) {
      color = green
    } else if (parseInt(output) >= 4 && parseInt(output) <= 6) {
      color = yellow
    } else if (parseInt(output) < 4) {
      color = red
    }
  }
  return <span className='score' style={{ backgroundColor: color }}>{output.toFixed(1)}</span>
}

export default MyScoreComponent
