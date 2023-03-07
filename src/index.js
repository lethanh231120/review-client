import React from 'react'
import ReactDOM from 'react-dom/client'
// import { render } from 'react-snapshot'
// import './index.css';
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import { HelmetProvider } from 'react-helmet-async'
// import { Helmet } from 'react-helmet'
// const helmetContext = {}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HelmetProvider>
    <BrowserRouter>
      {/* <Helmet>
      <title>HELMET TEST</title>
      <meta name='description' content='Web3 In Your Hand'></meta>
    </Helmet> */}
      <ThemeContext>
        <App />
      </ThemeContext>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
