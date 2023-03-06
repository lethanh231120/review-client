import moment from 'moment'

export const onItemClicked = (type, detail, navigate) => {
  if (type === 'crypto') {
    if (detail?.productId?.split('_')[1] === 'coin') {
      navigate(`../../../../../products/crypto/${detail?.productId?.split('_')[1]}/${detail?.productId?.split('_')[2]}`)
    } else if (detail?.productId?.split('_')[1] === 'token') {
      navigate(`../../../../../products/crypto/${detail?.productId?.split('_')[1]}/${detail?.productId?.split('_')[2]}/${detail?.productId?.split('_')[3]}`)
    }
  } else if (type === 'dapp') {
    navigate(`../../../../../products/dapp/${detail?.productId?.split('_')[2]}`)
  } else if (type === 'exchange') {
    navigate(`../../../../../products/exchange/${detail?.productId?.split('_')[2]}`)
  } else if (type === 'venture') {
    navigate(`../../../../../products/venture/${detail?.productId?.split('_')[2]}`)
  } else if (type === 'soon') {
    navigate(`../../../../../products/soon/${detail?.productId?.split('_')[2]}`)
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
