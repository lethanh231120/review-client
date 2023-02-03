import { Nav, Tab } from 'react-bootstrap'
import { SignInComponent } from './sign-in-form'
import { SignUpComponent } from './sign-up-form'

export const AccountTab = () => {
  return <Tab.Container defaultActiveKey='Navbuy'>
    <div className=''>
      <div className='buy-sell'>
        <Nav
          className='nav nav-tabs'
          eventKey='nav-tab2'
          role='tablist'
        >
          <Nav.Link
            as='button'
            className='nav-link'
            eventKey='Navbuy'
            type='button'
          >
                  Sign In
          </Nav.Link>
          <Nav.Link
            as='button'
            className='nav-link'
            eventKey='Navsell'
            type='button'
          >
                  Sign Up
          </Nav.Link>
        </Nav>
      </div>
      <Tab.Content>
        <Tab.Pane eventKey='Navbuy'>
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
        <Tab.Pane eventKey='Navsell'>
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
}
