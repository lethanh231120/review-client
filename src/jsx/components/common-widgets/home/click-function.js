import moment from 'moment'

export const onItemClicked = (type, detail, navigate) => {
  if (type === 'crypto') {
    if (detail?.cryptoId?.split('_')[1] === 'coin') {
      navigate(`../../../../../products/crypto/${detail?.cryptoId?.split('_')[1]}/${detail?.cryptoId?.split('_')[2]}`)
    } else if (detail?.cryptoId?.split('_')[1] === 'token') {
      navigate(`../../../../../products/crypto/${detail?.cryptoId?.split('_')[1]}/${detail?.cryptoId?.split('_')[2]}/${detail?.cryptoId?.split('_')[3]}`)
    }
  } else if (type === 'dapp') {
    navigate(`../../../../../products/dapp/${detail?.dAppId?.split('_')[2]}`)
  } else if (type === 'exchange') {
    navigate(`../../../../../products/exchange/${detail?.exchangeId?.split('_')[2]}`)
  } else if (type === 'venture') {
    navigate(`../../../../../products/venture/${detail?.ventureId?.split('_')[2]}`)
  } else if (type === 'soon') {
    navigate(`../../../../../products/soon/${detail?.projectId?.split('_')[2]}`)
  }
}

export const timeAgoConvert = (date) => {
  if (date) {
    var actionTime = moment(date, 'YYYY-MM-DD HH:mm:ss')
    return actionTime.fromNow()
  } else {
    return ''
  }
}
