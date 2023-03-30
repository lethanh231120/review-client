import React, { useContext, useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { get } from '../../../api/BaseRequest'
import { notifyTopRightFail } from '../Forms/form-report/FormReport'
import { notifyTopRightSuccess } from '../product-detail/ProductDetail'
import { CopyOutlined } from '@ant-design/icons'
import { copyAddress } from '../../../utils/effect'
import { ReferralCodeNotification } from './ReferralCodeNotification'
import { Authenticated } from '../../../App'
import { getCookie, STORAGEKEY } from '../../../utils/storage'

export const getReferralStatistics = async() =>{
  try {
    const resp = await get('reviews/referral')
    const respData = resp?.data
    return respData
  } catch (err) {
    console.error(err)
  }
}

export const ReferralCode = () => {
  const [code, setCode] = useState()
  const [clickChart, setClickChart] = useState([])

  const createCode = async() => {
    try {
      const resp = await get('reviews/referral/create')
      const status = resp?.status
      if (status) {
        notifyTopRightSuccess('Activate your referral code successfully')
        setReferralCodeAndClickChart()
      } else {
        throw new Error('error')
      }
    } catch (err) {
      console.error(err)
      notifyTopRightFail('Something when wrong while activate your referral code')
    }
  }

  const setReferralCodeAndClickChart = async() =>{
    const resp = await getReferralStatistics()
    setCode(resp?.code)
    setClickChart(resp?.dailyCharts)
    console.log(clickChart, resp?.dailyCharts)
  }

  useEffect(() => {
    setReferralCodeAndClickChart()
  }, [])

  const isActiveReferralCode = code

  const referralInfo = isActiveReferralCode
    ? <>
      {/* Get referral code click */}
      <p>
      My referral code:  <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{code}</Badge>
      &nbsp;
        <CopyOutlined
          onClick={(e) =>
            copyAddress(e, code, 'Copy referral code successfully')
          }
        />
      </p>
      <p>
      Total click from your share with referral code: <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{1}</Badge>
      </p>
    </>
    : <>
      {/* Active referral code */}
      <div className=' d-flex align-items-center justify-content-center'>
        <button
          type='submit'
          className='btn btn-primary'
          onClick={createCode}
        >
    Activate my referral code
        </button>
      </div>
    </>

  const referralMsg = <>
  Price: 7$/1000 view
  </>

  const chart = <>
  Chart here
  </>

  const authenticated = useContext(Authenticated)
  const isSignedIn = authenticated?.isAuthenticated
  const userInfo = getCookie(STORAGEKEY?.USER_INFO)
  const ROLE_COLLABORATOR = 3
  const isCollaboratorUser = userInfo?.role === ROLE_COLLABORATOR
  if (isSignedIn && isCollaboratorUser) {
    return <>
      <div className='row'>
        {/* detail header: icon, name, score */}
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
          <div className='profile card card-body'>
            {referralInfo}
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5'>
          <div className='profile card card-body'>
            {referralMsg}
          </div>
        </div>
        <div className='col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7'>
          <div className='profile card card-body'>
            {chart}
          </div>
        </div>
      </div>

    </>
  } else {
    // Not login, or login but don't have role collaborator
    return <>
      <ReferralCodeNotification
        isSignedIn={isSignedIn}
        isCollaboratorUser={isCollaboratorUser}
      />
    </>
  }
}
