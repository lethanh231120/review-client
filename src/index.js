import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import ThemeContext from './context/ThemeContext'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from 'react-error-boundary'
import { emailNika } from './jsx/components/privacy-policy/PrivacyPolicy'
import { Button } from 'react-bootstrap'

const templateAppCrashed = <>
  <p style={{
    fontSize: '4rem',
    color: '#039F7F' // main color
  }}>
    <center>Something went wrong.</center>
  </p>

  <p style={{
    fontSize: '2rem',
    color: '#039F7F' // main color
  }}>
    <a href='/'><Button className='btn btn-primary' style={{ marginRight: '1rem' }}>
                  Go Home
    </Button></a>
    , or contact us via email <b>{emailNika}</b>
  </p>

</>
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ErrorBoundary fallback={templateAppCrashed}>
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
