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
import { renderNumber } from './../../../utils/formatNumber'
import { formatLargeNumber } from './../../../utils/formatNumber'

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

  const getDDMMYYYYDate = (date) => new Date(formatChartDate(date, 'YYYY-MM-DD'))

  const millisecondsInADay = 86400000
  const addDay = (date, amountDate) => new Date(date.getTime() + (amountDate * millisecondsInADay))

  const dayBeetween2Day = (date1, date2) => (getDDMMYYYYDate(date1) - getDDMMYYYYDate(date2)) / millisecondsInADay

  const createClickPoint = (click, createdDate, isClaimed, rewardPrice) => {
    return {
      click: click,
      createdDate: createdDate,
      isClaimed: isClaimed,
      rewardPrice: rewardPrice
    }
  }

  const setReferralCodeAndClickChart = async() =>{
    const resp = await getReferralStatistics()
    setCode(resp?.code)

    let data = resp?.dailyCharts
    if (data) {
      // Sort first by createdate asc
      data?.sort((a, b) => getDDMMYYYYDate(a?.createdDate) - getDDMMYYYYDate(b?.createdDate))

      // ###### Adding missing day
      // ## Add today missing
      const lastItem = data[data?.length - 1 ]
      const lastDate = lastItem?.createdDate
      let lastReward = lastItem?.rewardPrice
      const today = new Date()

      // # admin still don't fix data reward (default  equal 0)
      // Both case no one click today, or atleast one click
      if (lastReward === 0) {
        var BreakException = {}
        try {
          // traverse opposite direction
          data?.slice()?.reverse()?.forEach(item => {
            const currentReward = item?.rewardPrice
            if (currentReward > 0) {
              lastReward = currentReward
              throw BreakException
            }
          })
        } catch (e) {
          console.error(e)
        }
      }

      // # today no one click referral link
      if (dayBeetween2Day(today, lastDate) !== 0) {
        const noClick = 0
        const today = new Date()
        const noClaimed = false
        data?.push(createClickPoint(noClick, today, noClaimed, lastReward))
      } else {
        // At least one person click referral link --> update lastReward admin not fix(equal zero)
        data[data?.length - 1 ].rewardPrice = lastReward
      }

      // ## Add day between two date missing
      const newArray = []
      let previousDate = data[0]?.createdDate
      let previousRewardPerClick = data[0]?.rewardPrice
      data?.forEach(item => {
        const currentDate = item?.createdDate
        const currentRewardPerClick = item?.rewardPrice
        const dayBetween2Date = dayBeetween2Day(currentDate, previousDate)
        // push missing dates
        const oneOrMoreDayBetween = 2
        if (dayBetween2Date >= oneOrMoreDayBetween) {
          // tranverse each missing date
          for (let dayNo = 1; dayNo < dayBetween2Date; dayNo++) {
            const cloneItem = JSON.parse(JSON.stringify(item))
            cloneItem.createdDate = addDay(getDDMMYYYYDate(currentDate), (-dayBetween2Date + dayNo))
            cloneItem.click = 0
            cloneItem.rewardPrice = previousRewardPerClick
            newArray?.push(cloneItem)
          }
        }

        newArray?.push(item)
        previousDate = currentDate // update previous date
        previousRewardPerClick = currentRewardPerClick // update previous rewardPrice
      })
      data = newArray

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

      // let startDate = getDDMMYYYYDate(data[data?.length - 1]?.createdDate)
      // const endDate = getDDMMYYYYDate(new Date())
      // const totalDatePoint = ((endDate - startDate) / millisecondsInADay) + 1 // end - start + 1 to get include point
      // reverse array, then tranverse array (past to now)
      data?.forEach((clickEachDay) => {
        // const currentDate = getDDMMYYYYDate(clickEachDay?.createdDate)
        // const indexExtra = (totalDatePoint - ((endDate - currentDate) / millisecondsInADay) - 1)
        // console.log(indexExtra, index, clickEachDay?.createdDate, add1Day(startDate))
        // startDate = getDDMMYYYYDate(clickEachDay?.createdDate)

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
          // if (!startDate){
          //   startDate =
          // }
          totalRewardClickLocal += dailyClick
          totalRewardValueLocal += dailyRewardTotal

          rewardLabelsTimeLocal?.push(formattedDate)
          dataRewardClickLocal?.set(formattedDate, dailyClick)
          dataRewardValueLocal?.set(formattedDate, dailyRewardValue)
          dataRewardTotalLocal?.set(formattedDate, dailyRewardTotal)

          // Fake data
          for (let i = 1; i <= 0; i++) {
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
        <div className='col-12 col-sm-6'>
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
            Available your new friends visit: <Badge pill bg='badge-l' className='badge-light progress-bar-striped progress-bar-animated'>
              {formatLargeNumber(totalRewardClick)}
            </Badge>
          </p>
          <p>
            Available share commission reward: <Badge pill bg='badge-l' className='badge-light progress-bar-striped progress-bar-animated'>{renderNumber(totalRewardValue)}</Badge>
          </p>
          <p className='text-center'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={getAllReward}
            >
            Claim rewards
            </button>
            <hr className='hr-custome my-2'></hr>
          </p>
        </div>
        <div className='col-12 col-sm-6'>
          <p>
          Total your friend visit: <Badge pill bg='badge-l' className='badge-primary progress-bar-striped progress-bar-animated'>{formatLargeNumber(totalClick)}</Badge>
          </p>

          <p>
          Total share commission reward: <Badge pill bg='badge-l' className='badge-primary progress-bar-striped progress-bar-animated'>{renderNumber(totalClaimedValue)}</Badge>
          </p>

          <p>
          Share commission for 1000 views today: <Badge pill bg='badge-l' className='badge-primary progress-bar-striped progress-bar-animated'>{renderNumber(todayShareComission)}</Badge>
          </p>
          <p>
          Lowest share commission{lowestShareComissionDate}: <Badge pill bg='badge-l' className='badge-danger progress-bar-striped progress-bar-animated'>{renderNumber(lowestShareComission)}</Badge>
          </p>
          <p>
          Highest share commission{highestShareComissionDate}: <Badge pill bg='badge-l' className='badge-info progress-bar-striped progress-bar-animated'>{renderNumber(highestShareComission)}</Badge>
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
