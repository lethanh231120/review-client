import React, { useEffect, useContext, useState } from 'react'
import { getCookie, STORAGEKEY } from '../../../utils/storage'
import Swal from 'sweetalert2'
import { SignInContext, FormLoginSignupKeyContext } from '../../../App'
import ModalAdd from '../modal/modal-add-product/ModalAdd'
import { logInKey } from '../common-widgets/user-form/account-tab'

const AddProject = ({ isModal }) => {
  const signContext = useContext(SignInContext)
  const formLoginSignupKeyContext = useContext(FormLoginSignupKeyContext)

  const userInfo = getCookie(STORAGEKEY.USER_INFO)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    // already log in
    if (userInfo) {
      setOpen(true)
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Please login first',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        backdrop: `rgba(4,148,114,0.4)`
      }).then((result) => {
        // click out modal notification, or click [OK] in modal
        if (result?.isDismissed || result?.isConfirmed) {
          // keep state in context, login form raise when click add project
          signContext?.handleSetOpenModal(true)
          formLoginSignupKeyContext?.setLoginSignupFormactiveTabKey(logInKey)
        }
      })
    }
  }, [userInfo])

  return (
    <div className='card'>
      <div className='card-header'>
        <h2 className='heading'>Add Project</h2>
      </div>
      <div className='card-body'>
        { open && <ModalAdd isModal={false}/>}
      </div>
    </div>
  )
}

export default AddProject
