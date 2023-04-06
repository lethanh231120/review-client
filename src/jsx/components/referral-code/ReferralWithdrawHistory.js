import React from 'react'
import { get } from '../../../api/BaseRequest'
import { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useState } from 'react'
import { Table, Tooltip } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { renderNumber } from '../../../utils/formatNumber'
import { formatChartDate } from '../insight/charts/BarChart'
import { formatDateStyle } from '../../../utils/time/time'
import { getDDMMYYYYDate } from './referralCode'
import _ from 'lodash'

const getReward = async() => {
  try {
    const resp = await get('reviews/referral/reward')
    const respData = resp?.data
    return respData
  } catch (err) {
    console.error(err)
  }
}

export const ReferralWithdrawHistory = ({ newClaimedHistory }) => {
  const [withdrawalHistory, setWithdrawalHistory] = useState()
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (newClaimedHistory && withdrawalHistory) {
      setWithdrawalHistory([newClaimedHistory, ...withdrawalHistory])
    }
  }, [newClaimedHistory])

  const getData = async() => {
    let respData = await getReward()

    // Sort first by createdate desc
    respData?.sort((a, b) => getDDMMYYYYDate(b?.createdDate) - getDDMMYYYYDate(a?.createdDate))
    const verifiedArray = []
    const notVerifiedArray = []
    respData?.forEach((item) => {
      const isVerified = item?.isVerify
      if (isVerified) {
        verifiedArray?.push(item)
      } else {
        notVerifiedArray?.push(item)
      }
    })
    respData = [...notVerifiedArray, ...verifiedArray]

    setWithdrawalHistory(respData)
  }

  const columns = [
    {
      title: '#',
      align: 'right',
      render: (_, record, index) => <span>{new Intl.NumberFormat().format(index + 1)}</span>
    },
    {
      title: 'Total Click',
      align: 'right',
      render: (_, record) => <span>{new Intl.NumberFormat().format(record?.totalClick)}</span>
    },
    {
      title: 'Total Reward',
      align: 'right',
      render: (_, record) => <span>{renderNumber(record?.totalReward)}</span>
    },
    {
      title: 'Claimed Date',
      align: 'right',
      render: (_, record) => <span>{formatChartDate(record?.createdDate, formatDateStyle)}</span>
    },
    {
      title: <span className='d-flex align-items-center justify-content-center'>
        Approved
        &nbsp;
        <Tooltip title='Admin verify your claim to send you reward or not'>
          <InfoCircleOutlined />
        </Tooltip>
      </span>,
      align: 'center',
      render: (_, record) => <>
        <span className='d-flex justify-content-center'>

          {
            record?.isVerify
              ? <>
                <CheckCircleOutlined
                  style={{
                    color: 'green',
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '0.3rem'
                  }}
                />
              </>
              : <>
                <CloseCircleOutlined
                  style={{
                    color: 'red',
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: '0.3rem'
                  }}
                />
              </>
          }
        </span>
      </>
    }
  ]

  return !_.isEmpty(withdrawalHistory) && <div className='mb-2'>
    <Card style={{ height: '100%' }}>
      <Card.Header>
        <Card.Title>
          <h3 className='heading text-center' style={{ textTransform: 'none' }}>{`Widthdrawal History`}</h3>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Table
          pagination={{ pageSize: 5 }}
          className='custom-table'
          columns={columns}
          dataSource={withdrawalHistory}/>
      </Card.Body>
    </Card>
  </div>
}
