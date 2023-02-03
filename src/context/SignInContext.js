import React, { createContext, useState } from 'react'

export const SignInContext = createContext()

const SignInContextProvider = (props) => {
  const [openModalSignIn, setOpenModalSignIn] = useState(false)

  const stateSignIn = {
    openModalSignIn: openModalSignIn,
    handleSetOpenModal: (isOpen) => setOpenModalSignIn(isOpen)
  }

  return (
    <SignInContext.Provider value={{
      stateSignIn
    }}>
      {props.children}
    </SignInContext.Provider>
  )
}

export default SignInContextProvider
