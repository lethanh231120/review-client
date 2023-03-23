import React, { useState, useEffect, useContext } from 'react'
import _ from 'lodash'
import moment from 'moment'
import Swal from 'sweetalert2'
import { LoadingOutlined } from '@ant-design/icons'
import { beforeUpload, getBase64 } from '../form-report/FormReport'
import { patch, post } from '../../../../api/BaseRequest'
import { removeCookie, setCookie, STORAGEKEY } from '../../../../utils/storage'
import { NormalUserProfileContext } from '../../..'
import { Spin, Upload, Modal } from 'antd'
import profile from '../../../../images/product/user.png'

const FormProfile = ({ userInfo }) => {
  const profileModal = useContext(NormalUserProfileContext)

  // Upload image
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const onPreview = async(file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }

  const handleCancel = () => setPreviewOpen(false)

  const [fileList, setFileList] = useState([])

  const handleChangeFile = (e) =>{
    if (!e?.event && e?.file?.status === 'uploading') {
      const newFileList = []
      e?.fileList?.forEach(async(itemFile) => {
        newFileList.push({
          ...itemFile,
          status: 'done'
        })
        // pass de lay anh, khong tra error
        if (itemFile?.uid === e?.file?.uid) {
          const formData = new FormData()
          formData.append('file', itemFile?.originFileObj)
          const time = moment().unix()
          const fileName = `${itemFile?.uid}_${time}`
          const resp = await post(`reviews/upload/image?storeEndpoint=account&fileName=${fileName}`, formData)
          setUserAvatar(resp?.data)
        }
      })
      setFileList(newFileList)
    }

    if (e?.file?.status === 'removed') {
      const newFileList = []
      setFileList(newFileList)
      setUserAvatar(null)
    }
  }

  const [username, setUsername] = useState()
  const [userAvatar, setUserAvatar] = useState()
  const txtEnterUsername = 'Enter your username here'
  const errorsObj = { username: '' }
  const [errors, setErrors] = useState(errorsObj)
  const [isLoading, setIsLoading] = useState(false)
  const onChangProfile = async(e) => {
    e.preventDefault()
    let error = false
    const errorObj = { ...errorsObj }
    if (username === '') {
      errorObj.username = 'Username is Required'
      error = true
    }
    setErrors(errorObj)
    if (error) return

    try {
      const dataChangeProfile = { }
      if (username) {
        dataChangeProfile['userName'] = username
      }
      if (userAvatar) {
        dataChangeProfile['image'] = userAvatar
      }
      setIsLoading(true)
      const resp = await patch('reviews/auth/update/normal', dataChangeProfile)
      if (resp?.status) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          title: 'Update profile successfully',
          html: 'Your information will update soon. It could take a day or two to see the change on Gear5.io',
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
            profileModal?.setOpenModalUserProfile(false)
            if (userAvatar) {
              userInfo.image = userAvatar
            }
            if (username) {
              userInfo.userName = username
            }
            removeCookie(STORAGEKEY.USER_INFO)
            setCookie(STORAGEKEY.USER_INFO, userInfo)
            // update then continue update will get blank
            setFileList([])
          }
        })
      }
    } catch (e) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'Resgister failed',
        html: e?.response?.data?.error || 'Sorry for this inconvenience. Our server got problem, try again later',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        backdrop: `rgba(4,148,114,0.4)`
      })
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() =>{
    setUsername(userInfo?.userName)
  }, [])

  return <>
    <h3 className='form-title'>Profile</h3>
    <form onSubmit={onChangProfile} className='mt-4'>
      <div className='row'>
        <div className='col-3'>
          <Upload
            listType='picture-circle' // shape of uploader
            onPreview={onPreview} // view in eye
            beforeUpload={beforeUpload}
            onChange={handleChangeFile}
            fileList={fileList}
          >
            {fileList.length === 1 ? null
              : <div className='container-profile'>
                <img src={userInfo?.image ? userInfo?.image : profile} alt='error' width={64} height={64}/>
                <div className='centered-profile'>
                  <i className='material-icons'>upload</i>
                </div>
              </div>}
          </Upload>
        </div>
        <div className='col-9'>
          <div className='row'>
            <div className='form-group mb-3'>
              <i className='material-icons input-icon-sign-in-sign-up'>badge</i>
              <input
                type='text'
                className='form-control input-form-sign-in-sign-up-padding'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={txtEnterUsername}
                readOnly={isLoading}
              />
              {errors.username && (
                <div className='text-danger fs-12'>
                  {errors.username}
                </div>
              )}
            </div>
          </div>
          <div className='row'>
            <div className='col-12 d-flex align-items-center justify-content-center'>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={isLoading || (_.isEmpty(fileList) && username === userInfo?.userName)}
              >
                Update
              </button>
              {isLoading ? <>&nbsp;&nbsp; <Spin indicator={<LoadingOutlined spin />} size='large' /> </> : ''}
            </div>
          </div>
        </div>
      </div>

    </form>
    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
      <img
        alt='example'
        style={{
          width: '100%'
        }}
        src={previewImage}
      />
    </Modal>
  </>
}
export default FormProfile
