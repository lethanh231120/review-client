import React from 'react'
import InformationSubTitle, { typeExplorer } from '../page-detail/InformationSubTitle'

export const InfoExplorerDetail = ({ isShow, detail, multichain }) => {
  return <div className='crypto-info'>
    <div className=''>
      <InformationSubTitle type={typeExplorer}/>
    </div>
  </div>
}
