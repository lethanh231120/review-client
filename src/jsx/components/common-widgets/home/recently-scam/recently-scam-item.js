import { Avatar } from 'antd'
import { Badge } from 'react-bootstrap'

export const ScamItem = ({ item }) => {
  return <li key={item?.address}>
    <div className='timeline-panel'>
      <div className='media me-2'><Avatar src={item.logo} ></Avatar></div>
      <div className='media-body'>
        <h5 className='mb-1'>
          {item?.name} {item?.type === 'Token' ? `(${item?.symbol})` : null}
          <Badge className='badge-sm ms-2 ' bg='danger light'>{item?.type}</Badge>
        </h5>
        <p className='mb-1'>
          {(item.type === 'Token' ? item.address?.substring(0, 20) : item.website?.substring(0, 20))}...
        </p>

      </div>
      <p className='mb-1'>
        {item?.reason}
      </p>

    </div>
  </li>
}
