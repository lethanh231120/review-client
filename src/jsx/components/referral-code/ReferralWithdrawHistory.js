import React from 'react'
import { get } from '../../../api/BaseRequest'
import { useEffect } from 'react'
import { Card, Table } from 'react-bootstrap'
import { useState } from 'react'

const getReward = async() => {
  try {
    const resp = await get('reviews/referral/reward')
    const respData = resp?.data
    return respData
  } catch (err) {
    console.error(err)
  }
}

export const ReferralWithdrawHistory = () => {
  const [withdrawalHistory, setWithdrawalHistory] = useState()
  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    const respData = await getReward()
    setWithdrawalHistory(respData)
  }

  return <Card style={{ height: '100%' }}>
    <Card.Header>
      <Card.Title>
        <h3 className='heading text-center' style={{ textTransform: 'none' }}>{`Gear5's Blockchains Data`}</h3>
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Table responsive hover className='header-border verticle-middle table-bc cus-table-blockchain'>
        <thead className='text-center'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Total Click</th>
            <th scope='col'>Total Reward</th>
            <th scope='col'>Total Projects</th>
            <th scope='col'>Claimed Date</th>
            <th scope='col'>Approved</th>
          </tr>
        </thead>
        <tbody>
          {
            withdrawalHistory?.map((item, index) => {
              <tr className='text-center ' key={index}>
                <td >{index}</td>
                <td >
                  <div className='d-flex justify-content-start align-items-center'>
123
                  </div>
                </td>
                <td>
                </td>
                <td >
                </td>
                <td >
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </Card.Body>
  </Card>
}
