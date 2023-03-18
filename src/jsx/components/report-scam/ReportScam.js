import React from 'react'
import ModalReport from '../modal/modal-report/ModalReport'
import { SEO } from './../SEO/SEO'
import { getHeaderReportScam } from './../SEO/server/report-scam'

const ReportScam = () => {
  return <>
    <SEO props={{ title: getHeaderReportScam() }}/>
    <div className='card'>
      <div className='card-header'>
        <div className='heading'>Report Scam</div>
      </div>
      <div className='card-body'>
        { open && <ModalReport isModal={false}/>}
      </div>
    </div>
  </>
}

export default ReportScam
