import React, { Fragment, useState } from 'react'

import SideBar from './SideBar'
import NavHader from './NavHader'
import Header from './Header'

const JobieNav = ({ title, onClick: ClickToAddEvent }) => {
  const [toggle, setToggle] = useState('')
  const onClick = (name) => setToggle(toggle === name ? '' : name)

  return (
    <>
      <NavHader/>
      <Header
        onNote={() => onClick('chatbox')}
        onNotification={() => onClick('notification')}
        onProfile={() => onClick('profile')}
        toggle={toggle}
        title={title}
        onBox={() => onClick('box')}
        onClick={() => ClickToAddEvent()}
      />
      <SideBar />
    </>
  )
}

export default JobieNav
