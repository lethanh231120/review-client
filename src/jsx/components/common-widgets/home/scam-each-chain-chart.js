import React from 'react'
import {
  Card,
  Table,
  Badge,
  ProgressBar
} from 'react-bootstrap'
import { formatMoney } from '../../../../utils/formatNumber'

const color = ['success', 'info', 'warning', 'danger', 'secondary']

export const ScamEachChainsList = ({ data }) => {
  const tableItem = (index, chainName, scamPercent, scamAmount, color) => {
    return <tr className='text-center'>
      <th >{index}</th>
      <td>{chainName}</td>
      <td>
        {scamAmount}
      </td>
      <td >
        <ProgressBar variant={color} now={scamPercent} style={{ backgroundColor: '#A9A9A9' }}/>
      </td>
      <td >
        <Badge bg={color}>{scamPercent}%</Badge>
      </td>
    </tr>
  }

  return <Card>
    <Card.Header>
      <Card.Title>Scam Each Chains Data</Card.Title>
    </Card.Header>
    <Card.Body>
      <Table responsive hover className='header-border verticle-middle'>
        <thead className='text-center'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Chainname</th>
            <th scope='col'>Scam Projects</th>
            <th scope='col' >Scam Rate</th>
            <th scope='col'>Scam Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            const percentage = parseInt(item?.scam) * 100 / parseInt(item?.total)
            return tableItem(index + 1, item?.datatitle, percentage?.toFixed(2), formatMoney(item?.scam)?.replace('$', ''), color[index])
          })}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
}
