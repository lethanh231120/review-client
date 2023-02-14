import { Avatar } from 'antd'
import React, { useContext } from 'react'
import {
  Card,
  Table,
  Badge
  // ProgressBar
} from 'react-bootstrap'
import { ChainListContext } from '../../../../App'
// import { formatMoney } from '../../../../utils/formatNumber'

const color = ['success', 'info', 'warning', 'danger', 'secondary']

export const ScamEachChainsList = ({ data }) => {
  const chainList = useContext(ChainListContext)

  const getChainImage = (chainname) => {
    const item = Object.keys(chainList)?.find(element => element === chainname)
    return chainList[item]?.image
  }

  const tableItem = (index, chainName, scamPercent, scamAmount, totalAmount, img, color) => {
    return <tr className='text-center' key={index}>
      <td >{index}</td>
      <td >
        <div className='d-flex justify-content-center'>
          <Avatar size={25} src={img}/>
          <span className='ms-2'>{capitalizeFirstLetter(chainName)}</span>
        </div>
      </td>
      <td>
        {scamAmount}
      </td>
      <td >
        {totalAmount}
        {/* <ProgressBar variant={color} now={scamPercent} style={{ backgroundColor: '#A9A9A9' }}/> */}
      </td>
      <td >
        <Badge bg={color}>{scamPercent}%</Badge>
      </td>
    </tr>
  }

  return <Card>
    <Card.Header>
      <Card.Title>Blockchains Data</Card.Title>
    </Card.Header>
    <Card.Body>
      <Table responsive hover className='header-border verticle-middle'>
        <thead className='text-center'>
          <tr>
            <th scope='col' >#</th>
            <th scope='col' >Chain Name</th>
            <th scope='col'>Scam or Dead Projects</th>
            <th scope='col' >Total Projects</th>
            <th scope='col'>Scam Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => {
            const percentage = parseInt(item?.scam) * 100 / parseInt(item?.total)
            const img = getChainImage(item?.datatitle)
            return tableItem(index + 1, item?.datatitle, percentage?.toFixed(2), new Intl.NumberFormat().format(item?.scam), new Intl.NumberFormat().format(item?.total), img, color[index])
          })}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
}

function capitalizeFirstLetter(string) {
  return string && string.charAt(0).toUpperCase() + string.slice(1)
}
