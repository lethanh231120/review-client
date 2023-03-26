import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from 'react-error-boundary'
import { emailNika } from './jsx/components/privacy-policy/PrivacyPolicy'

const templateNewVersion = <>
  <p style={{
    fontSize: '4rem',
    color: '#039F7F' // main color
  }}>
    <center>The website has a new update.</center>
  </p>

  <p style={{
    fontSize: '2rem',
    color: '#039F7F' // main color
  }}>
  Please clear your browser cache, or press key combination <code>Ctrl</code> <code>Shift</code> <code>R</code>
  </p>

  <p style={{
    fontSize: '2rem',
    color: '#039F7F' // main color
  }}>
  In the worst case try closing the browser and reopening it, or contact us via email <b>{emailNika}</b>
  </p>

</>
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ErrorBoundary fallback={templateNewVersion}>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeContext>
          <App />
        </ThemeContext>
      </BrowserRouter>
    </HelmetProvider>
  </ErrorBoundary>,
  document.getElementById('root')

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
