import React from 'react'
import { Route, Routes } from 'react-router'

const allroutes = [
  { url: '', pathName: 'Home' },
  { url: 'dashboard', pathName: 'Dashboard' },
  { url: 'add-project', pathName: 'Add Project' },
  { url: 'report-scam', pathName: 'Report Scam' }
]

export default (
  <Routes>
    <Route >
      {allroutes.map((data, i) => (
        <Route key={i} path={`${data.url}`} element={data.component}/>
      ))}
      <Route path='confirm-email' />
      <Route path='/' ></Route>
      <Route path='search/:keyword' />
      <Route path=''>
      </Route>
      <Route path='insight' >
      </Route>
      <Route path='products'>
        <Route path='crypto'>
        </Route>
        <Route path='dapp'>
        </Route>
        <Route path='launchpad'>
        </Route>
        <Route path='ICO/IDO/IEO'>
        </Route>
        <Route path='venture'>
        </Route>
        <Route path='exchange'>
        </Route>

      </Route>
      <Route path='not-found-product' />
      <Route path='server-error' />
      <Route path='not-found' />
      <Route path='*' />
    </Route>
    <Route path='terms-of-service' />
    <Route path='privacy-policy' />
    <Route path='not-found-product' />
    <Route path='server-error' />
    <Route path='not-found' />
    <Route path='*' />
  </Routes>
)
