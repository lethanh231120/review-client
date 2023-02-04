import { Nav, Tab } from 'react-bootstrap'
import { SignInComponent } from './sign-in-form'
import { SignUpComponent } from './sign-up-form'

export const logInKey = 'Navbuy'
export const signUpKey = 'Navsell'
const AccountTab = ({ activeTabKey }) => {
  return (
    <Tab.Container defaultActiveKey={activeTabKey}>
      <div className=''>
        <div className='buy-sell'>
          <Nav className='nav nav-tabs' eventKey='nav-tab2' role='tablist'>
            <Nav.Link
              as='button'
              className='nav-link'
              eventKey={logInKey}
              type='button'
            >
              Log&nbsp;In
            </Nav.Link>
            <Nav.Link
              as='button'
              className='nav-link'
              eventKey={signUpKey}
              type='button'
            >
              Sign&nbsp;Up
            </Nav.Link>
          </Nav>
        </div>
        <Tab.Content>
          <Tab.Pane eventKey={logInKey}>
            <Tab.Container defaultActiveKey='Navbuymarket'>
              <Tab.Content id='nav-tabContent1'>
                <Tab.Pane eventKey='Navbuymarket'></Tab.Pane>
                <Tab.Pane eventKey='Navbuylimit'></Tab.Pane>
              </Tab.Content>
              <div className='sell-element'>
                <SignInComponent />
              </div>
            </Tab.Container>
          </Tab.Pane>
          <Tab.Pane eventKey={signUpKey}>
            <Tab.Container defaultActiveKey='Navsellmarket'>
              <Tab.Content id='nav-tabContent2'>
                <Tab.Pane id='Navsellmarket'></Tab.Pane>
                <Tab.Pane id='Navselllimit'></Tab.Pane>
              </Tab.Content>
              <div className='sell-element'>
                <SignUpComponent />
              </div>
            </Tab.Container>
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  )
}

export default AccountTab
