import React from 'react'

export const ProgressBarGoal = ({ progressGoal }) => {
  return <div className='progress' style={{ height: '1.2rem' }}>
    <div className={`progress-bar progress-bar-striped progress-bar-animated ${progressGoal <= 20 ? 'bg-danger' : progressGoal <= 50 ? 'bg-warning' : progressGoal <= 99 ? 'bg-info' : ''}`} role='progressbar' style={{ width: `${progressGoal}%` }} aria-valuenow='0' aria-valuemin='0' aria-valuemax='100'><span>{progressGoal >= 25 ? `${progressGoal?.toFixed(2)}% goal` : ''}</span></div>
    <span style={{ marginTop: '0.15rem', paddingLeft: '1rem' }} className='text-primary'>
      {progressGoal < 25 ? `${progressGoal?.toFixed(2)}% goal` : '' }
    </span>
  </div>
}
