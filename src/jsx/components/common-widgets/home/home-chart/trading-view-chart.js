// TradingViewWidget.js

import React, { useEffect, useRef } from 'react'

let tvScriptLoadingPromise

export default function TradingViewWidget({symbol}) {
  const onLoadScriptRef = useRef()
  useEffect(
    () => {
      onLoadScriptRef.current = createWidget

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script')
          script.id = 'tradingview-widget-loading-script'
          script.src = 'https://s3.tradingview.com/tv.js'
          script.type = 'text/javascript'
          script.onload = resolve

          document.head.appendChild(script)
        })
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current())

      return () => onLoadScriptRef.current = null

      function createWidget() {
        if (document.getElementById('tradingview_02bd5') && 'TradingView' in window) {
          new window.TradingView.widget({
            symbol: symbol,
            width: '100%',
            height: 450,
            interval: 'D',
            timezone: 'Etc/UTC',
            theme: 'light',
            style: '3',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            hide_top_toolbar: true,
            hide_legend: true,
            range: "1D",
            container_id: 'tradingview_02bd5',
            save_image: false,
          })
        }
      }
    },
    [symbol]
  )

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_02bd5' />
      <div className='tradingview-widget-copyright'>
        <a href='https://www.tradingview.com/symbols/NASDAQ-AAPL/' rel='noopener noreferrer' target='_blank'>
          </a>
      </div>
    </div>
  )
}
