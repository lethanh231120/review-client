import React from 'react'
import ModalReport from '../modal/modal-report/ModalReport'

const ReportScam = () => {
  return (
    <div className='card'>
      <div className='card-header'>
        <h2 className='heading'>Add Project</h2>
      </div>
      <div className='card-body'>
        { open && <ModalReport isModal={false}/>}
      </div>
    </div>
  )
}

export default ReportScam
