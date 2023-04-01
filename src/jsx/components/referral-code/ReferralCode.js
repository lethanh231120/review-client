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
// import LineChart from '../insight/charts/LineChart'
import ReferralChart from './ReferralChart'
import { MySkeletonLoadinng } from './../common-widgets/my-spinner'

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
  const authenticated = useContext(Authenticated)
  const isSignedIn = authenticated?.isAuthenticated
  const userInfo = getCookie(STORAGEKEY?.USER_INFO)
  const ROLE_COLLABORATOR = 3
  const isCollaboratorUser = userInfo?.role === ROLE_COLLABORATOR
  // ################
  const [code, setCode] = useState()
  const [clickChart, setClickChart] = useState()
  const [totalClick, setTotalClick] = useState()
  const [totalClickReward, setTotalClickReward] = useState()
  const isLoadingComp = !code

  const setReferralCodeAndClickChart = async() =>{
    const resp = await getReferralStatistics()
    setCode(resp?.code)
    setClickChart(resp?.dailyCharts)

    let totalClickClaimed = 0
    let totalClickReward = 0
    resp?.dailyCharts?.forEach(chartPoint => {
      const isGetReward = !chartPoint?.isClaimed
      const dailyClick = chartPoint?.click
      if (isGetReward) {
        totalClickReward += dailyClick
      } else {
        totalClickClaimed += dailyClick
      }
    })
    setTotalClickReward(totalClickReward)
    const totalClick = totalClickClaimed + totalClickReward
    setTotalClick(totalClick)
  }

  // at same page, sign in will run here
  useEffect(() => {
    // only sign in call API
    if (isSignedIn) {
      setReferralCodeAndClickChart()
    }
  }, [isSignedIn])

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
      Total click from your share with referral code: <Badge pill bg='badge-l' className='badge-info progress-bar-striped progress-bar-animated'>{totalClick}</Badge>
      </p>
      <p>
      Total number of new clicks that have not received commission: <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{totalClickReward}</Badge>
      </p>
      <p>
      Total share commission you&apos;ve received so far: <Badge pill bg='badge-l' className='badge-info progress-bar-striped progress-bar-animated'>{totalClickReward}</Badge>
      </p>
      <p>
      Total share commission you have not taken out yet: <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{totalClickReward}</Badge>
      </p>
      <p>
      Share commission for 1 thousand views today: <Badge pill bg='badge-l' className='badge-info progress-bar-striped progress-bar-animated'>{totalClickReward}</Badge>
      </p>
      <p>
      Share the lowest price commission ever: <Badge pill bg='badge-l' className='badge-danger progress-bar-striped progress-bar-animated'>{totalClickReward}</Badge>
      </p>
      <p>
      Share the highest price commission ever: <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{totalClickReward}</Badge>
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
    <ReferralCodeNotification
      isSignedIn={isSignedIn}
      isCollaboratorUser={isCollaboratorUser}
    />
  </>

  const chart = <>
    <ReferralChart data={clickChart}/>
  </>

  if (isSignedIn && isCollaboratorUser) {
    return <>
      <div className='row'>
        {/* detail header: icon, name, score */}
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12'>
          <div className='profile card card-body'>
            {
              isLoadingComp
                ? <MySkeletonLoadinng count={3} height={30} />
                : <>
                  {referralInfo}
                </>
            }
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12 col-sm-12'>
          <div className='profile card card-body'>
            {isLoadingComp
              ? <MySkeletonLoadinng count={1} height={150}/>
              : chart}
          </div>
        </div>
      </div>
      <div>
        <div className='col-12 col-sm-12'>
          <div className=''>
            {referralMsg}
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
