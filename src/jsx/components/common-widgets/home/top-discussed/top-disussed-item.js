import { Avatar } from 'antd'
import { Badge } from 'react-bootstrap'

export const TopDiscussedItem = ({ item }) => {
  return <li>
    <div className='timeline-panel'>
      <div className='media me-2'>
        <Avatar width='50' src={item.logo}/>

      </div>
      <div className='media-body'>
        <h5 className='mb-1'>{item.name}
          {item.type === 'Token' ? `(${item.symbol})` : null}
          <Badge className='badge-sm ms-2'>{item.type}</Badge></h5>
        <small className='d-block'>
          29 July 2022 - 02:26 PM

        </small>
      </div>
      <div>
      300K+ Reviews
      </div>
      {/* <Dropdown className='dropdown'>
        <Dropdown.Toggle
          variant='primary light'
          className=' i-false p-0 sharp'
        >
          <svg
            width='18px'
            height='18px'
            viewBox='0 0 24 24'
            version='1.1'
          >
            <g
              stroke='none'
              strokeWidth='1'
              fill='none'
              fillRule='evenodd'
            >
              <rect x='0' y='0' width='24' height='24' />
              <circle fill='#000000' cx='5' cy='12' r='2' />
              <circle fill='#000000' cx='12' cy='12' r='2' />
              <circle fill='#000000' cx='19' cy='12' r='2' />
            </g>
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-menu'>
          <Dropdown.Item
            className='dropdown-item'
            to='/widget-basic'
          >
          Edit
          </Dropdown.Item>
          <Dropdown.Item
            className='dropdown-item'
            to='/widget-basic'
          >
          Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
    </div>
  </li>
}
