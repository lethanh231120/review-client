export const formatScores = (score, type) => {
  const scoreNum = parseFloat(score)
  let outputScore = 0

  const DAPP = 10
  const CRYPTO = 9.5
  const EXCHANGE_VENTURE = 20

  if (scoreNum <= 0) {
    outputScore = 0
  } else {
    switch (type) {
      case 'crypto':
        outputScore = scoreNum / CRYPTO
        break
      case 'dapp':
        outputScore = scoreNum / DAPP
        break
      case 'exchange':
        outputScore = scoreNum / EXCHANGE_VENTURE
        break
      case 'venture':
        outputScore = scoreNum / EXCHANGE_VENTURE
        break
      default:
        outputScore = 0
    }
    return outputScore
  }
}
