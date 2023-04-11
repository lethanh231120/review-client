import React from 'react'
import { CRYPTO, DAPP, EXCHANGE, INSIGHT, LAUNCHPAD, SOON, VENTURE } from '../../constants/category'

export const pageHome = 'home'
export const Ads = ({ pageType }) => {
  const adsCss = { border: '0px', padding: '0', margin: '1rem 0', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'transparent' }
  // Home
  if (!pageType) {
    return <>
      <iframe data-aa='2198618' src='//acceptable.a-ads.com/2198618' style={adsCss}></iframe>
    </>
  }
  if (pageType === INSIGHT) {
    return <>
      <iframe data-aa='2199032' src='//acceptable.a-ads.com/2199032' style={adsCss}></iframe>
    </>
  }

  // ###### Detail page ####
  if (pageType === CRYPTO) {
    return <>
      <iframe data-aa='2199023' src='//acceptable.a-ads.com/2199023' style={adsCss}></iframe>
    </>
  }

  if (pageType === DAPP) {
    return <>
      <iframe data-aa='2199024' src='//acceptable.a-ads.com/2199024' style={adsCss}></iframe>
    </>
  }

  if (pageType === VENTURE) {
    return <>
      <iframe data-aa='2199025' src='//acceptable.a-ads.com/2199025' style={adsCss}></iframe>
    </>
  }

  if (pageType === EXCHANGE) {
    return <>
      <iframe data-aa='2199026' src='//acceptable.a-ads.com/2199026' style={adsCss}></iframe>
    </>
  }

  if (pageType === SOON) {
    return <>
      <iframe data-aa='2199030' src='//acceptable.a-ads.com/2199030' style={adsCss}></iframe>
    </>
  }

  if (pageType === LAUNCHPAD) {
    return <>
      <iframe data-aa='2199031' src='//acceptable.a-ads.com/2199031' style={adsCss}></iframe>
    </>
  }
}
