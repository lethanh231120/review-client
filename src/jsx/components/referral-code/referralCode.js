import React, { useContext, useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { notifyTopRightFail } from '../Forms/form-report/FormReport'
import { notifyTopRightSuccess } from '../product-detail/ProductDetail'
import { CopyOutlined } from '@ant-design/icons'
import { copyAddress } from '../../../utils/effect'
import { ReferralCodeNotification } from './ReferralCodeNotification'
import { Authenticated } from '../../../App'
import { getCookie, STORAGEKEY } from '../../../utils/storage'
import ReferralChart from './ReferralChart'
import { formatChartDate } from '../insight/charts/BarChart'
import { formatLargeNumberMoneyUSD } from '../../../utils/formatNumber'
import { ReferralWithdrawHistory } from './ReferralWithdrawHistory'
import { MySkeletonLoadinng } from '../common-widgets/my-spinner'
import Swal from 'sweetalert2'

export const getReferralStatistics = async() =>{
  try {
    // const resp = await get('reviews/referral')
    // const respData = resp?.data
    // return respData
  } catch (err) {
    console.error(err)
  }
}

const rewardPerView = 1000

export const getDDMMYYYYDate = (date) => new Date(formatChartDate(date, 'YYYY-MM-DD'))

export const txtClaimReward = 'Claim rewards'

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

  // For chart
  const [chartData, setChartData] = useState()

  // // // 7 day
  const [rewardLabelsTime7day, setRewardLabelsTime7day] = useState()
  const [dataRewardClick7day, setDataRewardClick7day] = useState()
  const [dataRewardValue7day, setDataRewardValue7day] = useState()
  const [dataRewardTotal7day, setDataRewardTotal7day] = useState()
  // // 9 month
  const [rewardLabelsTime9month, setRewardLabelsTime9month] = useState()
  const [dataRewardClick9month, setDataRewardClick9month] = useState()
  const [dataRewardValue9month, setDataRewardValue9month] = useState()
  const [dataRewardTotal9month, setDataRewardTotal9month] = useState()
  // // all (each year)
  const [rewardLabelsTimeAlltime, setRewardLabelsTimeAlltime] = useState()
  const [dataRewardClickAlltime, setDataRewardClickAlltime] = useState()
  const [dataRewardValueAlltime, setDataRewardValueAlltime] = useState()
  const [dataRewardTotalAlltime, setDataRewardTotalAlltime] = useState()
  // chang chart type
  const [pickedRewardLabelsTime, setPickedRewardLabelsTime] = useState()
  const [pickedRewardClick, setPickedRewardClick] = useState()
  const [pickedRewardValue, setPickedRewardValue] = useState()
  const [pickedRewardTotal, setPickedRewardTotal] = useState()

  const [newClaimedHistory, setNewClaimedHistory] = useState()

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

    const data = resp?.dailyCharts
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
      let previousIsClaimed = data[0]?.isClaimed
      data?.forEach(item => {
        const currentRewardPerClick = item?.rewardPrice
        const currentIsClaimed = item?.isClaimed
        const currentDate = item?.createdDate
        const marginFromNow = (Date.now() - getDDMMYYYYDate(currentDate)?.getTime()) / millisecondsInADay

        // only add missing day in 7 day recently
        if (marginFromNow <= 7) {
          const dayBetween2Date = dayBeetween2Day(currentDate, previousDate)
          // push missing dates
          const oneOrMoreDayBetween = 2
          if (dayBetween2Date >= oneOrMoreDayBetween) {
            // tranverse each missing date
            for (let dayNo = 1; dayNo < dayBetween2Date; dayNo++) {
              const cloneItem = JSON.parse(JSON.stringify(item))
              cloneItem.createdDate = addDay(getDDMMYYYYDate(currentDate), (-dayBetween2Date + dayNo))
              cloneItem.click = 0
              cloneItem.isClaimed = previousIsClaimed
              cloneItem.rewardPrice = previousRewardPerClick
              newArray?.push(cloneItem)
            }
          }
        }

        // format existed date same date format with dynamic gen missing date
        item.createdDate = getDDMMYYYYDate(item?.createdDate)
        newArray?.push(item)
        previousDate = currentDate // update previous date
        previousRewardPerClick = currentRewardPerClick // update previous rewardPrice
        previousIsClaimed = currentIsClaimed // update previous isClaimed
      })
      extractDataFromChartData(newArray)
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

    const rewardLabelsTimeLocal = []
    const dataRewardClickLocal = new Map()
    const dataRewardValueLocal = new Map()
    const dataRewardTotalLocal = new Map()

    data?.forEach((clickEachDay) => {
      const currentate = clickEachDay?.createdDate
      const dailyClick = clickEachDay?.click
      const dailyRewardValue = clickEachDay?.rewardPrice
      const dailyRewardTotal = dailyRewardValue * (dailyClick / rewardPerView)

      totalClickLocal += dailyClick

      const isGetReward = !clickEachDay?.isClaimed
      if (isGetReward) {
        totalRewardClickLocal += dailyClick
        totalRewardValueLocal += dailyRewardTotal
      } else {
        // Not yet claimed
        totalClaimedValueLocal += dailyRewardTotal
      }

      // Both claimed and not claimed point
      rewardLabelsTimeLocal?.push(currentate)
      dataRewardClickLocal?.set(currentate, dailyClick)
      dataRewardValueLocal?.set(currentate, dailyRewardValue)
      dataRewardTotalLocal?.set(currentate, dailyRewardTotal)
    })
    // For chart

    const rewardLabelsTime7dayLocal = []
    const dataRewardClick7dayLocal = new Map()
    const dataRewardValue7dayLocal = new Map()
    const dataRewardTotal7dayLocal = new Map()

    const map9monthLabel = new Map()
    let previoustTimeLabel = ''
    const rewardLabelsTime9monthLocal = []
    const dataRewardClick9monthLocal = new Map()
    const dataRewardValue9monthLocal = new Map()
    const dataRewardTotal9monthLocal = new Map()

    const mapAlltimeLabel = new Map()
    const rewardLabelsTimeAlltimeLocal = []
    const dataRewardClickAlltimeLocal = new Map()
    const dataRewardValueAlltimeLocal = new Map()
    const dataRewardTotalAlltimeLocal = new Map()
    rewardLabelsTimeLocal?.forEach((date, index) => {
      // chart 7 day (get latest 7 chartPoint in array)
      if (index >= rewardLabelsTimeLocal?.length - 7) {
        // only day no
        const formattedDateAsDoW = formatChartDate(date, 'dddd')
        const dailyClick = dataRewardClickLocal?.get(date)
        const dailyRewardValue = dataRewardValueLocal?.get(date)
        const dailyRewardTotal = dataRewardTotalLocal?.get(date)
        rewardLabelsTime7dayLocal?.push(formattedDateAsDoW)
        dataRewardClick7dayLocal?.set(formattedDateAsDoW, dailyClick)
        dataRewardValue7dayLocal?.set(formattedDateAsDoW, dailyRewardValue)
        dataRewardTotal7dayLocal?.set(formattedDateAsDoW, dailyRewardTotal)
      }

      // chart 9 month
      const formattedDateAsMonth = formatChartDate(date, 'MMMM YYYY')
      const monthYear = map9monthLabel?.get(formattedDateAsMonth)
      const dailyClick = dataRewardClickLocal?.get(date)
      const dailyRewardValue = dataRewardValueLocal?.get(date)
      const dailyRewardTotal = dataRewardTotalLocal?.get(date)
      // not exist month before list
      if (!monthYear) {
        map9monthLabel?.set(formattedDateAsMonth, true)
        rewardLabelsTime9monthLocal?.push(formattedDateAsMonth)
        dataRewardClick9monthLocal?.set(formattedDateAsMonth, dailyClick)
        dataRewardValue9monthLocal?.set(formattedDateAsMonth, dailyRewardValue)
        dataRewardTotal9monthLocal?.set(formattedDateAsMonth, dailyRewardTotal)
        previoustTimeLabel = formattedDateAsMonth
      } else {
        let existedClick = dataRewardClick9monthLocal?.get(formattedDateAsMonth)
        existedClick += dailyClick
        dataRewardClick9monthLocal?.set(formattedDateAsMonth, existedClick)

        let existedValue = dataRewardValue9monthLocal?.get(formattedDateAsMonth)
        // common time key -> Incremental
        if (formattedDateAsMonth === previoustTimeLabel) {
          existedValue += dailyRewardValue
        } else {
          // new time key -> get average of sum all
          existedValue = (existedValue / dataRewardValue9monthLocal?.length)
        }
        dataRewardValue9monthLocal?.set(formattedDateAsMonth, existedValue)

        let existedTotal = dataRewardTotal9monthLocal?.get(formattedDateAsMonth)
        existedTotal += dailyRewardTotal
        dataRewardTotal9monthLocal?.set(formattedDateAsMonth, existedTotal)
      }

      // chart all time
      const formattedDateAsYear = formatChartDate(date, 'YYYY')
      const year = mapAlltimeLabel?.get(formattedDateAsYear)
      // not exist month before list
      if (!year) {
        mapAlltimeLabel?.set(formattedDateAsYear, true)
        rewardLabelsTimeAlltimeLocal?.push(formattedDateAsYear)
        dataRewardClickAlltimeLocal?.set(formattedDateAsYear, dailyClick)
        dataRewardValueAlltimeLocal?.set(formattedDateAsYear, dailyRewardValue)
        dataRewardTotalAlltimeLocal?.set(formattedDateAsYear, dailyRewardTotal)
      } else {
        let existedClick = dataRewardClickAlltimeLocal?.get(formattedDateAsYear)
        existedClick += dailyClick
        dataRewardClickAlltimeLocal?.set(formattedDateAsYear, existedClick)

        let existedValue = dataRewardValueAlltimeLocal?.get(formattedDateAsYear)
        existedValue += dailyRewardValue
        dataRewardValueAlltimeLocal?.set(formattedDateAsYear, existedValue)

        let existedTotal = dataRewardTotalAlltimeLocal?.get(formattedDateAsYear)
        existedTotal += dailyRewardTotal
        dataRewardTotalAlltimeLocal?.set(formattedDateAsYear, existedTotal)
      }
    })
    setRewardLabelsTime7day(rewardLabelsTime7dayLocal)
    setDataRewardClick7day(dataRewardClick7dayLocal)
    setDataRewardValue7day(dataRewardValue7dayLocal)
    setDataRewardTotal7day(dataRewardTotal7dayLocal)

    // get latest 9 month recently
    setRewardLabelsTime9month(rewardLabelsTime9monthLocal?.slice(rewardLabelsTime9monthLocal.length - 9))
    setDataRewardClick9month(dataRewardClick9monthLocal)
    setDataRewardValue9month(dataRewardValue9monthLocal)
    setDataRewardTotal9month(dataRewardTotal9monthLocal)

    // all time
    setRewardLabelsTimeAlltime(rewardLabelsTimeAlltimeLocal)
    setDataRewardClickAlltime(dataRewardClickAlltimeLocal)
    setDataRewardValueAlltime(dataRewardValueAlltimeLocal)
    setDataRewardTotalAlltime(dataRewardTotalAlltimeLocal)

    // First time set chart 7 day
    setPickedRewardLabelsTime(rewardLabelsTime7dayLocal)
    setPickedRewardClick(dataRewardClick7dayLocal)
    setPickedRewardValue(dataRewardValue7dayLocal)
    setPickedRewardTotal(dataRewardTotal7dayLocal)

    // For statistic
    setTotalClick(totalClickLocal)
    setTotalRewardClick(totalRewardClickLocal)
    setTotalClaimedValue(totalClaimedValueLocal)
    setTotalRewardValue(totalRewardValueLocal)
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
      // const resp = await get('reviews/referral/create')
      // const status = resp?.status
      // if (status) {
      //   notifyTopRightSuccess('Activate your referral code successfully')
      //   setReferralCodeAndClickChart()
      // } else {
      //   throw new Error('error')
      // }
    } catch (err) {
      console.error(err)
      notifyTopRightFail('Something when wrong while activate your referral code')
    }
  }

  const getTodayRewardAndClickFromChartData = (chartData) => {
    const lastItem = chartData[chartData?.length - 1]
    const todayReward = (lastItem?.click / rewardPerView) * lastItem?.rewardPrice
    const todayClick = lastItem?.click
    return [todayReward, todayClick]
  }

  const getAllReward = async() => {
    const minDollarWidthdrawl = 50
    const errMsgValidate = `You can't claim reward in today, and the before days must accumulate at least ${minDollarWidthdrawl}$ to claim`
    const [todayReward, todayClick] = getTodayRewardAndClickFromChartData(chartData)
    const totalRewardValueWithoutToday = totalRewardValue - todayReward
    // Validate FE
    if (totalRewardValueWithoutToday < minDollarWidthdrawl) {
      notifyTopRightFail(errMsgValidate)
      return
    } else {
      const address = await Swal.fire({
        icon: 'info',
        title: txtClaimReward,
        inputLabel: 'Enter your wallet on binace blockchain here',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Claim',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        // for validate
        preConfirm: (binanceAddress) =>{
          if (binanceAddress === '') {
            Swal.showValidationMessage(
              `Can't leave be blank`
            )
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          return result.value
        }
      })

      // Claim click (already input address)
      if (address) {
        const isCancelConfirm = await Swal.fire({
          title: `Are you confirm ${address} is your wallet address ?`,
          text: "You won't be able to revert this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Confirm'
        }).then(async(result) => {
          if (result.isConfirmed) {
            await Swal.fire(
              'Claimed',
              'Your request has been sent',
              'success'
            )
            return false
          } else if (result.isDismissed) {
            return result.isDismissed
          }
        })

        if (isCancelConfirm) {
          return
        }
      } else {
        // Cancel Claim rewards
        return
      }

      try {
        // const resp = await post(`reviews/referral/claim?address=${address}&chainname=binance`, {}, { Referral: code })
        const resp = {}
        if (resp?.status) {
          // update needed data change when claim

          setTotalClaimedValue(resp?.data?.totalReward)

          setTotalRewardValue(todayReward)
          setTotalRewardClick(todayClick)

          setNewClaimedHistory(resp?.data) // append in table withdrawl history
          notifyTopRightSuccess(`You claim ${formatLargeNumberMoneyUSD(resp?.data?.totalReward)} for ${new Intl.NumberFormat().format(resp?.data?.totalClick)} click from your friends successfully`)
        }
      } catch (e) {
        const codeBE = e?.response?.data?.code
        const codeWrongRequest = 'B.CODE.400'
        if (codeBE === codeWrongRequest) {
          notifyTopRightFail(errMsgValidate)
        }
        console.error(e)
      }
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
              {txtClaimReward}
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
    <div className='d-flex align-items-center justify-content-center'>
      <button
        className='btn btn-primary mx-2 active'
        data-bs-toggle='button' aria-pressed='true'
        onClick={()=>{
          setPickedRewardLabelsTime(rewardLabelsTime7day)
          setPickedRewardClick(dataRewardClick7day)
          setPickedRewardValue(dataRewardValue7day)
          setPickedRewardTotal(dataRewardTotal7day)
        }}>7 day</button>
      <button
        className='btn btn-primary mx-2'
        onClick={()=>{
          setPickedRewardLabelsTime(rewardLabelsTime9month)
          setPickedRewardClick(dataRewardClick9month)
          setPickedRewardValue(dataRewardValue9month)
          setPickedRewardTotal(dataRewardTotal9month)
        }}>9 month</button>
      <button
        className='btn btn-primary mx-2'
        onClick={()=>{
          setPickedRewardLabelsTime(rewardLabelsTimeAlltime)
          setPickedRewardClick(dataRewardClickAlltime)
          setPickedRewardValue(dataRewardValueAlltime)
          setPickedRewardTotal(dataRewardTotalAlltime)
        }}>All time</button>

    </div>

    <ReferralChart
      rewardLabelsTime={pickedRewardLabelsTime} // get latest 7 point in array for display chart
      dataRewardClick={pickedRewardClick}
      dataRewardValue={pickedRewardValue}
      dataRewardTotal={pickedRewardTotal}
    />
  </>

  const withdrawHistory = <>
    <ReferralWithdrawHistory newClaimedHistory={newClaimedHistory} />
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
              {withdrawHistory}
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
