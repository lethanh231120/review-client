import { Avatar } from 'antd'
import _ from 'lodash'
import React, { useContext } from 'react'
import {
  Card,
  Table,
  Badge
  // ProgressBar
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ChainListContext } from '../../../../../App'
// import { formatMoney } from '../../../../utils/formatNumber'
import './blockchain-data.scss'

const color = ['success', 'info', 'warning', 'danger', 'secondary']

export const ScamEachChainsList = ({ data }) => {
  const chainList = useContext(ChainListContext)
  const navigate = useNavigate()

  const getChainImage = (chainname) => {
    const item = Object.keys(chainList)?.find(element => element === chainname)
    return chainList[item]?.image
  }

  const onRowClicked = (chainName) => {
    if (chainName) {
      const chainnameUpper = _.capitalize(chainName)
      if (chainnameUpper === 'Others') {
        if (window.localStorage.getItem('crypto') !== '') {
          window.localStorage.removeItem('crypto')
        }
        navigate(`crypto`)
      } else {
        if (window.localStorage.getItem('crypto') !== '') {
          // window.localStorage.removeItem('crypto')
          window.localStorage.setItem('crypto', JSON.stringify({ tag: `${chainnameUpper}_Ecosystem` }))
        }

        navigate(`crypto/${chainnameUpper}_Ecosystem`)
      }
    }
  }

  const tableItem = (index, chainName, scamPercent, scamAmount, totalAmount, img, color) => {
    return <tr className='text-center ' key={index} onClick={() => onRowClicked(chainName)}>
      <td >{index}</td>
      <td >
        <div className='d-flex justify-content-start ms-5 align-items-center'>
          {chainName !== 'Others' && <Avatar size={25} src={img}/>}
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

  return <Card style={{ height: '100%' }}>
    <Card.Header>
      <Card.Title>
        <h2 className='heading text-center' style={{ textTransform: 'none' }}>{`Gear5's Blockchains Data`}</h2>
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Table responsive hover className='header-border verticle-middle table-bc'>
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
