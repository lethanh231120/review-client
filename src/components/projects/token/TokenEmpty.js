import React from 'react'
import { Skeleton } from 'antd'
import './token.scss'

const TokenEmpty = () => {
    return (
        <div className="token">
            <div className="token-header">
                <div className="token-header-item">
                    <Skeleton.Button active size='small' shape='round' style={{ height: '2rem' }}/>
                </div>
                <div className="token-header-item">
                    <Skeleton.Button active size='small' shape='round' style={{ height: '2rem' }}/>
                </div>
                <div className="token-header-item">
                    <Skeleton.Button active size='small' shape='round' style={{ height: '2rem' }}/>
                </div>
            </div>
            <div className="token-image">
                <Skeleton.Image active style={{ height: '10rem' }}/>
            </div>
            <div className='token-parameter'>
                <Skeleton.Button active size='small' shape='round' style={{ height: '3rem' }}/>
                <Skeleton.Button active size='small' shape='round' style={{ height: '3rem' }}/>
            </div>
        </div>
    )
}

export default TokenEmpty
