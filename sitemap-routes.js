import React from 'react'
import { Route, Routes } from 'react-router'
const TOTAL_TOKEN_ROUTES = 47

const allroutes = [
  { url: '', pathName: 'Home' },
  { url: 'dashboard', pathName: 'Dashboard' },
  { url: 'add-project', pathName: 'Add Project' },
  { url: 'report-scam', pathName: 'Report Scam' }
]

const subXml = [
  'exchanges.xml', 'ventures.xml', 'launchpads.xml', 'dapps.xml', 'idos.xml', 'coins.xml'
]

export default (
  <Routes>
    <Route >
      {allroutes.map((data, i) => (
        <Route key={i} path={`${data.url}`} element={data.component}/>
      ))}
      {
        subXml.map((item, index) => (<Route key={index} path={item}/>))
      }
      {
        [...Array(TOTAL_TOKEN_ROUTES)].map((_, index) => <Route key={index} path={`token_${index + 1}`}/>)
      }
      <Route path='confirm-email' />
      <Route path='search/:keyword' />
      <Route path='insight' >
      </Route>
      <Route path='products'>
        <Route path='crypto'>
        </Route>
        <Route path='dapp'>
        </Route>
        <Route path='launchpad'>
        </Route>
        <Route path='soon'>
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
  </Routes>
)
