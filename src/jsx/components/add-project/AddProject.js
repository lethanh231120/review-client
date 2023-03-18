import React, { useEffect, useContext } from 'react'
import { getCookie, STORAGEKEY } from '../../../utils/storage'
import { SignInContext, FormLoginSignupKeyContext, SignInFromAddProductContext } from '../../../App'
import ModalAdd from '../modal/modal-add-product/ModalAdd'
import { logInKey } from '../common-widgets/user-form/account-tab'
import SEO from '../SEO/SEO'
import { getHeaderAddProject } from '../SEO/server/add-project'

const AddProject = ({ isModal }) => {
  const signContext = useContext(SignInContext)
  const formLoginSignupKeyContext = useContext(FormLoginSignupKeyContext)
  const signInFromAddProductContext = useContext(SignInFromAddProductContext)

  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  useEffect(() => {
    // already log in
    if (!userInfo) {
      // keep state in context, login form raise when click add project
      signInFromAddProductContext?.setIsOpenModalAddProduct(true)
      signContext?.handleSetOpenModal(true)
      formLoginSignupKeyContext?.setLoginSignupFormactiveTabKey(logInKey)
    }
  }, [userInfo])

  return <>
    <SEO props={{ title: getHeaderAddProject() }}/>
    <div className='card'>
      <div className='card-header'>
        <div className='heading'>Add Project</div>
      </div>
      <div className='card-body'>
        <ModalAdd isModal={false}/>
      </div>
    </div>
  </>
}

export default AddProject
