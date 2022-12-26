import React from 'react'
import { Image } from 'antd'
import './productFooter.scss'

const ProductFooter = ({ liked, chat_icon, mask_scam, handleClickReaction, setOpenComment, productInfo, setOpenScam }) => {
    const TYPE_POST = 0

    return (
        <div className='product-footer'>
            <div className='product-footer-item'>
                <Image src={liked} preview={false}/>
                {productInfo?.reviews?.length ? productInfo?.reviews?.length : 0}
                <div className='product-footer-item-emoji'>
                    <div
                        className='product-footer-item-emoji-item'
                        onClick={() => handleClickReaction('💓', TYPE_POST, productInfo?.product?.id, true)}
                    >
                        &#128147;
                    </div>
                    <div
                        className='product-footer-item-emoji-item'
                        onClick={() => handleClickReaction('👍', TYPE_POST, productInfo?.product?.id, true)}
                    >
                        &#128077;
                    </div>
                    <div
                        className='product-footer-item-emoji-item'
                        onClick={() => handleClickReaction('👎', TYPE_POST, productInfo?.product?.id, true)}
                    >
                        &#128078;
                    </div>
                    <div
                        className='product-footer-item-emoji-item'
                        onClick={() => handleClickReaction('😆', TYPE_POST, productInfo?.product?.id, true)}
                    >
                        &#128516;
                    </div>
                    <div
                        className='product-footer-item-emoji-item'
                        onClick={() => handleClickReaction('😍', TYPE_POST, productInfo?.product?.id, true)}
                    >
                        &#128525;
                    </div>
                </div>
            </div>
            <div
                className='product-footer-item'
                onClick={() => setOpenComment(true)}
            >
                <Image src={chat_icon} preview={false}/>
                {productInfo?.totalReviews ? productInfo?.totalReviews : 0}
            </div>
            <div
                className='product-footer-item'
                onClick={() => setOpenScam(true)}
            >
                <Image src={mask_scam} preview={false}/>
                20
            </div>
        </div>
    )
}

export default ProductFooter
