import moment from 'moment'

const TIME_NOW = moment().format('YYYY-MM-DD')
const SIX_MONTH_AGO = moment().subtract(7, 'days').format('YYYY-MM-DD')
export const bitqueryEndpoint = 'https://graphql.bitquery.io'

export const API_KEY = 'BQYrPIyju9qAi2iSEg05RGdGLFJZo1Qk'

export const BITQUERY_QUERY = (network, exchangeName, baseCurrency, quoteCurrency) => {
  return `query{
        ethereum(network:${network}) {
          dexTrades(
            options: {limit: 200,asc: "timeInterval.hour"}
            date: {since: "${SIX_MONTH_AGO}", till: "${TIME_NOW}"}
            exchangeName: {is: "${exchangeName}"}
            baseCurrency: {is: "${baseCurrency}"},
            quoteCurrency: {is: "${quoteCurrency}"},
          ) 
          {
            timeInterval {
              hour(count: 1)  
            }
            high: quotePrice(calculate: maximum)
            low: quotePrice(calculate: minimum)
            open: minimum(of: block, get: quote_price)
            close: maximum(of: block, get: quote_price) 
          }
        }
      }`
}

export const WETH_CONNECTOR_QUERY = (network, exchangeName, baseCurrency, connectorCurrency, quoteCurrency) => {
  return `query{
    ethereum(network: ${network}) {
      dexTrades(
        options: {limit: 400,asc: "timeInterval.day"}
        date: {since: "${SIX_MONTH_AGO}", till: "${TIME_NOW}"}
        exchangeName: {is: "${exchangeName}"}
        any: [
          {
          baseCurrency: {is: "${baseCurrency}"}
          quoteCurrency: {is:  "${connectorCurrency}"},
          },
          {
          baseCurrency: {is: "${connectorCurrency}"}
          quoteCurrency: {is: "${quoteCurrency}"}
          }
],
      ) 
      {
        timeInterval {
          day(count: 1)  
        }
       buyCurrency: baseCurrency {
symbol
address
}
sellCurrency: quoteCurrency {
symbol
address
}
high: quotePrice(calculate: maximum)
low: quotePrice(calculate: minimum)
open: minimum(of: block, get: quote_price)
        close: maximum(of: block, get: quote_price)      
      }
    }
  }`
}

