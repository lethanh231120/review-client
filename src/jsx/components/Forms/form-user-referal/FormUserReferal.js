import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { get } from '../../../../api/BaseRequest'
import profile from '../../../../images/product/user.png'
import { notifyTopRightSuccess } from '../../product-detail/ProductDetail'
import { notifyTopRightFail } from '../form-report/FormReport'
import { CopyOutlined } from '@ant-design/icons'
import { copyAddress } from '../../../../utils/effect'

export const getReferralStatistics = async() =>{
  try {
    const resp = await get('reviews/referral')
    const respData = resp?.data
    return [respData?.code, respData?.click]
  } catch (err) {
    console.error(err)
  }
}

export const FormUserReferal = ({ userInfo }) => {
  const [code, setCode] = useState()
  const [click, setClick] = useState()

  const setReferralCodeAndClick = async() =>{
    const [code, click] = await getReferralStatistics()
    setCode(code)
    setClick(click)
  }

  const createCode = async() => {
    try {
      const resp = await get('reviews/referral/create')
      const status = resp?.status
      if (status) {
        notifyTopRightSuccess('Activate your referral code successfully')
        setReferralCodeAndClick()
      } else {
        throw new Error('error')
      }
    } catch (err) {
      console.error(err)
      notifyTopRightFail('Something when wrong while activate your referral code')
    }
  }

  useEffect(() => {
    setReferralCodeAndClick()
  }, [])

  return <>
    <h3 className='form-title'>Referral</h3>
    <div className='row'>
      <div className='col-3'>
        <img src={userInfo?.image ? userInfo?.image : profile} alt='error' width={64} height={64}/>
      </div>
      <div className='col-9'>
        <div className='row'>
          <div className='form-group mb-3'>
            <i className='material-icons input-icon-sign-in-sign-up'>badge</i>
            <span
              className='form-control input-form-sign-in-sign-up-padding'
            >
              {userInfo?.userName}
            </span>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            {
              (code && (click || click === 0))
                ? <>
                  <p>
                    My referral code:  <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{code}</Badge>
                    &nbsp;
                    <CopyOutlined
                      onClick={(e) =>
                        copyAddress(e, code, 'Copy referral code successfully')
                      }
                    />
                  </p>
                  <p>
                    Total click from your share with referral code: <Badge pill bg='badge-l' className='badge-success progress-bar-striped progress-bar-animated'>{click}</Badge>
                  </p>
                </>
                : <div className=' d-flex align-items-center justify-content-center'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    onClick={createCode}
                  >
                  Activate my referral code
                  </button>
                </div>
            }

          </div>
        </div>
      </div>
    </div>

  </>
}
