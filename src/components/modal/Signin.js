import React from 'react'
import { Modal } from 'antd'
import FacebookLogin from 'react-facebook-login'
import { setCookie, STORAGEKEY } from '../../utils/storage'
import { post, get } from '../../api/products'

const Signin = ({ openModalSignin, setOpenModalSignin }) => {
    const responseFacebook = async(response) => {
        const dataSignup = {
          'userId': response?.userID,
          'userName': response?.name,
          'email': response?.email,
          'password': 'facebook',
          'accountType': 'facebook',
          'image': response?.picture?.data?.url
        }
        const dataSignin = {
          'userId': response?.userID,
          'email': response?.email,
          'password': 'facebook',
          'accountType': 'facebook'
        }
    
        try {
          // const signup = await post('reviews/auth/signup', dataSignup)
          // if (signup?.status) {
            const signin = await post('reviews/auth/signin', dataSignin)
            const token = signin?.data.jwt.token
            const userInfo = signin?.data.profile
            const accountId = signin?.data[1]?.id
            // if (token) {
              await setCookie(STORAGEKEY.ACCESS_TOKEN, token)
              // const userInfo = await get(`reviews/profile/accountId=${accountId}`)
              // if (userInfo) {
                // await setCookie(STORAGEKEY.USER_INFO, userInfo?.data)
                await setCookie(STORAGEKEY.USER_INFO, userInfo)
              // }
              setOpenModalSignin(false)
            // }
          // }
        } catch (error) {
          console.log('lỗi')
        }
    }
    return (
        <Modal
            title="Sign In"
            visible={openModalSignin}
            onOk={() => setOpenModalSignin(false)}
            onCancel={() => setOpenModalSignin(false)}
            footer={false}
        >
            <FacebookLogin
                icon='fa-facebook'
                appId='1270002070516522'
                autoLoad={false}
                fields='name,email,picture'
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick}>This is my custom FB button</button>
                )}
            />
        </Modal>
    )
}

export default Signin
