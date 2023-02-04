const dividendShortcutTrillion = 1e12
const dividendShortcutBillion = 1e9
const dividendShortcutMillion = 1e6
const dividendShortcutKilo = 1e3 // thousand

export const formatMoney = (data) =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short'
  }).format(data)
export const smallNumber = (number) => {
  return ('' + +number).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function(a, b, c, d, e) {
      return e < 0
        ? b + '0.' + Array(1 - e - c.length).join(0) + c + d
        : b + c + d + Array(e - d.length + 1).join(0)
    }
  )
}
export const bigNumber = (number) => {
  return Number(number).toLocaleString('fullwide', { useGrouping: false })
}

export const renderNumber = (value) => {
  // avoid round floating point to round value is zero
  if (value >= 1) {
    value = parseInt(value)
  }
  if (value > 0) {
    if (isInt(value)) {
      if (value >= dividendShortcutTrillion) {
        return (
          <span>
            ${formatBigMoney(value / dividendShortcutTrillion)}{' '}T
          </span>
        )
      }
      if (value >= dividendShortcutBillion) {
        return (
          <span>
            ${formatBigMoney(value / dividendShortcutBillion)}{' '}B
          </span>
        )
      }
      if (value >= dividendShortcutMillion) {
        return (
          <span>
            ${formatBigMoney(value / dividendShortcutMillion)}{' '}M
          </span>
        )
      }
      if (value >= dividendShortcutKilo) {
        return (
          <span>
            ${formatBigMoney(value / dividendShortcutKilo)}{' '}K
          </span>
        )
      }
      if (value > 0 && value < dividendShortcutKilo) {
        return (
          <span>${formatBigMoney(value)}</span>
        )
      }
    } else { // float number
      return <span>${new Intl.NumberFormat().format(value)}</span>
    }
  }
}

const formatBigMoney = (number) => {
  return number?.toFixed(2)?.replace(/\d(?=(\d{3})+\.)/g, '$&,')?.toString()?.replace('.', ',')
}

export const formatMoneyGreaterEqualOneDollar = (number) => {
  if (number >= 1) {
    // is integer
    if (isInt(number)) {
      return (
        <span>${new Intl.NumberFormat().format(number)}</span>
      )
    } else {
      return (
        <span>${new Intl.NumberFormat().format(Number.parseFloat(number)?.toFixed(2))}</span>
      )
    }
  }
}

export const formatMoneyLessOneDollar = (number) => {
  if (number > 0 && number < 1) {
    const zeroCount = Math.ceil(getBaseLog(10, 10000 / number))
    return (
      // var x = 1.234000 becomes 1.234
      <span>${Number.parseFloat(number)?.toFixed(zeroCount)?.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1') }</span>
    )
  }
}

export const getBaseLog = (x, y) => {
  return Math.log(y) / Math.log(x)
}

export const isInt = (number) => {
  return number % 1 === 0
}
export const formatLargeNumberMoneyUSD = (data) =>
  new Intl.NumberFormat('en-EN', {
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD'
  }).format(data)
