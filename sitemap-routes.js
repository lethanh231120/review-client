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
        <Route path=':category'>
          <Route path='' />
          <Route
            path=':subCategory'
          />
        </Route>
      </Route>
      <Route path='insight' >
      </Route>
      <Route path='products'>
        <Route path='crypto'>
          <Route path=':type'>
            <Route path=':productName'>
              <Route path='' />
              {/* token only */}
              <Route path=':path'/>
            </Route>
          </Route>
        </Route>
        <Route path=':categoryName'>
          <Route path=':productName'>
            <Route path='' />
            <Route path=':path'/>
          </Route>
          <Route
            path=':productId'
          />
        </Route>
        <Route
          path=':productId'
        />
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
