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
import { formatChartDate } from '../insight/charts/BarChart'
import { formatDateStyle } from '../../../utils/time/time'
import { formatLargeNumberMoneyUSD } from '../../../utils/formatNumber'
import { ReferralWithdrawHistory } from './ReferralWithdrawHistory'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'

export const getReferralStatistics = async() =>{
  try {
    const resp = await get('reviews/referral')
    const respData = resp?.data
    return respData
  } catch (err) {
    console.error(err)
  }
}

const rewardPerView = 1000

export const getDDMMYYYYDate = (date) => new Date(formatChartDate(date, 'YYYY-MM-DD'))

export const ReferralCode = () => {
  const authenticated = useContext(Authenticated)
  const isSignedIn = authenticated?.isAuthenticated
  const userInfo = getCookie(STORAGEKEY?.USER_INFO)
  const ROLE_COLLABORATOR = 3
  const isCollaboratorUser = userInfo?.role === ROLE_COLLABORATOR
  // ################
  const [code, setCode] = useState()
  const [loadingGUI, setLoadingGUI] = useState(true) // access page, always loading first
  const isActiveReferralCode = code

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
  const [chartData, setChartData] = useState()
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
    setLoadingGUI(false)
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
        lastItem.rewardPrice = lastReward
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

        // format existed date same date format with dynamic gen missing date
        item.createdDate = getDDMMYYYYDate(item?.createdDate)
        newArray?.push(item)
        previousDate = currentDate // update previous date
        previousRewardPerClick = currentRewardPerClick // update previous rewardPrice
      })
      data = newArray
      extractDataFromChartData(data)
      setChartData(data)
    }
  }

  const extractDataFromChartData = (data) =>{
    const lastItem = data[data?.length - 1 ]
    const todayShareComission = lastItem?.rewardPrice
    setTodayShareComission(todayShareComission)
    let totalClickLocal = 0
    let totalRewardClickLocal = 0
    let totalClaimedValueLocal = 0
    let totalRewardValueLocal = 0
    let lowestShareComissionLocal = todayShareComission
    let highestShareComissionLocal = todayShareComission
    const defaultDate = formatChartDate(lastItem.createdDate, formatDateStyle)
    let lowestShareComissionDateLocal = defaultDate
    let highestShareComissionDateLocal = defaultDate

    const rewardLabelsTimeLocal = []
    const dataRewardClickLocal = new Map()
    const dataRewardValueLocal = new Map()
    const dataRewardTotalLocal = new Map()

    const claimedLabelsTimeLocal = []
    const dataClaimedClickLocal = new Map()
    const dataClaimedValueLocal = new Map()

    data?.forEach((clickEachDay) => {
      const formattedDate = formatChartDate(clickEachDay?.createdDate, formatDateStyle)
      const dailyClick = clickEachDay?.click
      const dailyRewardValue = clickEachDay?.rewardPrice
      const dailyRewardTotal = dailyRewardValue * (dailyClick / rewardPerView)

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
      if (resp?.status) {
        // update needed data change when claim

        setTotalClaimedValue(resp?.data?.totalReward)
        const lastItem = chartData[chartData?.length - 1]
        const todayValue = (lastItem?.click / rewardPerView) * lastItem?.rewardPrice

        const arrLabels = []
        arrLabels?.push(lastItem?.createdDate)
        setRewardLabelsTime(arrLabels)
        const mapClick = new Map()
        mapClick?.set(lastItem?.createdDate, lastItem?.click)
        setDataRewardClick(mapClick)
        const mapValue = new Map()
        mapValue?.set(lastItem?.createdDate, lastItem?.rewardPrice)
        setDataRewardValue(mapValue)
        const mapTotal = new Map()
        mapTotal?.set(lastItem?.createdDate, todayValue)
        setDataRewardTotal(mapTotal)

        setTotalRewardValue(todayValue)
        setTotalRewardClick(lastItem?.click)
        notifyTopRightSuccess(`You claim ${formatLargeNumberMoneyUSD(resp?.data?.totalReward)} for ${new Intl.NumberFormat().format(resp?.data?.totalClick)} click from your friends successfully`)
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
            Your new friends visit: <Badge pill bg='badge-l' className='badge-light progress-bar-striped progress-bar-animated'>
              {new Intl.NumberFormat().format(totalRewardClick)}
            </Badge>
          </p>
          <p>
            Available share commission reward: <Badge pill bg='badge-l' className='badge-light progress-bar-striped progress-bar-animated'>{formatLargeNumberMoneyUSD(totalRewardValue)}</Badge>
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
          Total your friend visit: <Badge pill bg='badge-l' className='badge-primary progress-bar-striped progress-bar-animated'>{new Intl.NumberFormat().format(totalClick)}</Badge>
          </p>

          <p>
          Total share commission reward claimed: <Badge pill bg='badge-l' className='badge-primary progress-bar-striped progress-bar-animated'>{formatLargeNumberMoneyUSD(totalClaimedValue)}</Badge>
          </p>

          <p>
          Share commission for {rewardPerView} views today: <Badge pill bg='badge-l' className='badge-primary progress-bar-striped progress-bar-animated'>{formatLargeNumberMoneyUSD(todayShareComission)}</Badge>
          </p>
          <p>
          Lowest share commission{lowestShareComissionDate}: <Badge pill bg='badge-l' className='badge-danger progress-bar-striped progress-bar-animated'>{formatLargeNumberMoneyUSD(lowestShareComission)}</Badge>
          </p>
          <p>
          Highest share commission{highestShareComissionDate}: <Badge pill bg='badge-l' className='badge-info progress-bar-striped progress-bar-animated'>{formatLargeNumberMoneyUSD(highestShareComission)}</Badge>
          </p>
        </div>
      </div>
    </>
    : loadingGUI ? <>
      <MySkeletonLoadinng count={3} height={30} />
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

  const withdrawHistory = <>
    <ReferralWithdrawHistory />
  </>

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
        <div className='col-12 col-sm-12'>
          {isActiveReferralCode
            ? <>
              <div className='profile card card-body'>
                { chart}
              </div>
            </>
            : ''
          }
        </div>
        <div className='col-12 col-sm-12'>
          {isActiveReferralCode
            ? <>
              <div className='profile card card-body'>
                {withdrawHistory}
              </div>
            </>
            : ''
          }
        </div>
      </div>
      <div>
        <div className='col-12'>
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
