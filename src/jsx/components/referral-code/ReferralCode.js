import React, { useContext, useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { get, post } from '../../../api/BaseRequest'
import { notifyTopRightFail } from '../Forms/form-report/FormReport'
import { notifyTopRightSuccess } from '../product-detail/ProductDetail'
import { CopyOutlined } from '@ant-design/icons'
import { copyAddress } from '../../../utils/effect'
import { ReferralCodeNotification } from './ReferralCodeNotification'
import { Authenticated } from '../../../App'
import { getCookie, STORAGEKEY } from '../../../utils/storage'
import ReferralChart from './ReferralChart'
import { MySkeletonLoadinng } from './../common-widgets/my-spinner'
import { formatChartDate } from '../insight/charts/BarChart'
import { formatDateStyle } from '../../../utils/time/time'

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
  const isLoadingComp = !code

  // For statistic
  const [totalClick, setTotalClick] = useState()
  const [totalRewardClick, setTotalRewardClick] = useState()
  const [totalClaimedValue, setTotalClaimedValue] = useState()
  const [totalRewardValue, setTotalRewardValue] = useState()
  const [todayShareComission, setTodayShareComission] = useState()
  const [lowestShareComission, setLowestShareComission] = useState()
  const [lowestShareComissionDate, setLowestShareComissionDate] = useState()
  const [highestShareComission, setHighestShareComission] = useState()
  const [highestShareComissionDate, setHighestShareComissionDate] = useState()

  // For chart
  const [rewardLabelsTime, setRewardLabelsTime] = useState()
  const [dataRewardClick, setDataRewardClick] = useState()
  const [dataRewardValue, setDataRewardValue] = useState()
  const [dataRewardTotal, setDataRewardTotal] = useState()

  const [claimedLabelsTime, setClaimedLabelsTime] = useState()
  const [dataClaimedClick, setDataClaimedClick] = useState()
  const [dataClaimedValue, setDataClaimedValue] = useState()

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const setReferralCodeAndClickChart = async() =>{
    const resp = await getReferralStatistics()
    setCode(resp?.code)

    const data = resp?.dailyCharts
    if (data) {
      const todayShareComission = data[0]?.rewardPrice
      const defaultDate = formatChartDate(data[0]?.createdDate, formatDateStyle)
      setTodayShareComission(todayShareComission)

      let totalClickLocal = 0
      let totalRewardClickLocal = 0
      let totalClaimedValueLocal = 0
      let totalRewardValueLocal = 0
      let lowestShareComissionLocal = todayShareComission
      let highestShareComissionLocal = todayShareComission
      let lowestShareComissionDateLocal = defaultDate
      let highestShareComissionDateLocal = defaultDate

      const rewardLabelsTimeLocal = []
      const dataRewardClickLocal = new Map()
      const dataRewardValueLocal = new Map()
      const dataRewardTotalLocal = new Map()

      const claimedLabelsTimeLocal = []
      const dataClaimedClickLocal = new Map()
      const dataClaimedValueLocal = new Map()
      // reverse array, then tranverse array (past to now)
      data?.slice()?.reverse()?.forEach(clickEachDay => {
        const formattedDate = formatChartDate(clickEachDay?.createdDate, formatDateStyle)
        const dailyClick = clickEachDay?.click
        const dailyRewardValue = clickEachDay?.rewardPrice
        const dailyRewardTotal = dailyRewardValue * dailyClick

        if (lowestShareComissionLocal > dailyRewardValue) {
          lowestShareComissionLocal = dailyRewardValue
          lowestShareComissionDateLocal = formattedDate
        }
        if (dailyRewardValue > highestShareComissionLocal) {
          highestShareComissionLocal = dailyRewardValue
          highestShareComissionDateLocal = formattedDate
        }

        totalClickLocal += dailyClick

        const isGetReward = !clickEachDay?.isClaimed
        if (isGetReward) {
          totalRewardClickLocal += dailyClick
          totalRewardValueLocal += dailyRewardTotal

          rewardLabelsTimeLocal?.push(formattedDate)
          dataRewardClickLocal?.set(formattedDate, dailyClick)
          dataRewardValueLocal?.set(formattedDate, dailyRewardValue)
          dataRewardTotalLocal?.set(formattedDate, dailyRewardTotal)

          // Fake data
          for (let i = 1; i <= 7; i++) {
            var date = new Date()
            // add a day
            date.setDate(date.getDate() + i)
            const formattedDate = formatChartDate(date, formatDateStyle)
            const fakeClick = getRndInteger(0, 1000)
            const fakeRewardValue = getRndInteger(1, 10)
            const fakeDailyReward = (clickEachDay?.rewardPrice * fakeClick)
            rewardLabelsTimeLocal?.push(formattedDate)
            dataRewardClickLocal?.set(formattedDate, fakeClick)
            dataRewardValueLocal?.set(formattedDate, fakeRewardValue)
            dataRewardTotalLocal?.set(formattedDate, fakeDailyReward)
          }
        } else {
          totalClaimedValueLocal += dailyRewardTotal

          claimedLabelsTimeLocal?.push(formattedDate)
          dataClaimedClickLocal?.set(formattedDate, dailyClick)
          dataClaimedValueLocal?.set(formattedDate, dailyRewardTotal)
        }
      })
      setRewardLabelsTime(rewardLabelsTimeLocal)
      setDataRewardClick(dataRewardClickLocal)
      setDataRewardValue(dataRewardValueLocal)
      setDataRewardTotal(dataRewardTotalLocal)

      setClaimedLabelsTime(claimedLabelsTimeLocal)
      setDataClaimedClick(dataClaimedClickLocal)
      setDataClaimedValue(dataClaimedValueLocal)

      // For statistic
      setTotalClick(totalClickLocal)
      setTotalRewardClick(totalRewardClickLocal)
      setTotalClaimedValue(totalClaimedValueLocal)
      setTotalRewardValue(totalRewardValueLocal)
      setLowestShareComission(lowestShareComissionLocal)
      setHighestShareComission(highestShareComissionLocal)
      if (lowestShareComissionDateLocal) {
        setLowestShareComissionDate(` (${lowestShareComissionDateLocal})`)
      }
      if (highestShareComissionDateLocal) {
        setHighestShareComissionDate(` (${highestShareComissionDateLocal})`)
      }
    }
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

  const getAllReward = async() => {
    try {
      const resp = await post('reviews/referral/claim', {}, { Referral: code })
      console.log(resp)
      if (resp?.status) {
        notifyTopRightSuccess('You claim all your rewards successfully')
      }
    } catch (e) {
      const codeBE = e?.response?.data?.code
      const codeWrongRequest = 'B.CODE.400'
      if (codeBE === codeWrongRequest) {
        notifyTopRightFail(`You can't claim reward in today, and the before days must accumulate at least 50$ to claim`)
      }
      console.log(e)
    }
  }

  const isActiveReferralCode = code
  const referralInfo = isActiveReferralCode
    ? <>
      <div className='row'>
        <div className='col-12 col-sm-4'>
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
          <p className='text-center'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={getAllReward}
            >
          Get Referral
            </button>
            <hr className='hr-custome my-2'></hr>
          </p>
        </div>
        <div className='col-12 col-sm-8'>
          <p>
      Total click from your share with referral code: <Badge pill bg='badge-l' className='badge-info progress-bar-striped progress-bar-animated'>{totalClick}</Badge>
          </p>
          <p>
      Total number of new clicks that have not received commission: <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{totalRewardClick}</Badge>
          </p>
          <p>
      Total share commission you&apos;ve received so far: <Badge pill bg='badge-l' className='badge-info progress-bar-striped progress-bar-animated'>{totalClaimedValue}</Badge>
          </p>
          <p>
      Total share commission you have not taken out yet: <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{totalRewardValue}</Badge>
          </p>
          <p>
      Share commission for 1 thousand views today: <Badge pill bg='badge-l' className='badge-info progress-bar-striped progress-bar-animated'>{todayShareComission}</Badge>
          </p>
          <p>
      Share the lowest price commission ever{lowestShareComissionDate}: <Badge pill bg='badge-l' className='badge-danger progress-bar-striped progress-bar-animated'>{lowestShareComission}</Badge>
          </p>
          <p>
      Share the highest price commission ever{highestShareComissionDate}: <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{highestShareComission}</Badge>
          </p>
        </div>
      </div>
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
    <ReferralChart
      rewardLabelsTime={rewardLabelsTime}
      dataRewardClick={dataRewardClick}
      dataRewardValue={dataRewardValue}
      dataRewardTotal={dataRewardTotal}
      claimedLabelsTime={claimedLabelsTime}
      dataClaimedClick={dataClaimedClick}
      dataClaimedValue={dataClaimedValue}
    />
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
