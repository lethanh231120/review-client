import React from 'react'

export const ProgressBarGoal = ({ progressGoal }) => {
  return <div className='progress' style={{ height: '1.2rem' }}>
    <div className={`progress-bar progress-bar-striped progress-bar-animated ${progressGoal <= 20 ? 'bg-danger' : progressGoal <= 50 ? 'bg-warning' : progressGoal <= 99 ? 'bg-info' : ''}`} role='progressbar' style={{ width: `${progressGoal}%` }} aria-valuenow='25' aria-valuemin='0' aria-valuemax='100'>{progressGoal}% goal</div>
  </div>
}
