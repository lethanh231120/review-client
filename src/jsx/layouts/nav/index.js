import React, { Fragment, useState } from 'react'

import SideBar from './SideBar'
import NavHader from './NavHader'
import Header from './Header'

const JobieNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3 }) => {
  const [toggle, setToggle] = useState('')
  const onClick = (name) => setToggle(toggle === name ? '' : name)
  const [isShowFullSearchSmallMode, setIsShowFullSearchSmallMode] = useState(false)

  return (
    <Fragment>
      <NavHader
        isShowFullSearchSmallMode={isShowFullSearchSmallMode}
      />
      <Header
        onNote={() => onClick('chatbox')}
        onNotification={() => onClick('notification')}
        onProfile={() => onClick('profile')}
        toggle={toggle}
        title={title}
        onBox={() => onClick('box')}
        onClick={() => ClickToAddEvent()}
        isShowFullSearchSmallMode={isShowFullSearchSmallMode}
        setIsShowFullSearchSmallMode={setIsShowFullSearchSmallMode}
      />
      <SideBar />
    </Fragment>
  )
}

export default JobieNav
