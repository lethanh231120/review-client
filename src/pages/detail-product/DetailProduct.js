import React, { useEffect, useState } from 'react'

import { Image, Rate, Tooltip } from 'antd'
import { Form, Input, Upload } from 'antd'
import { DownOutlined, CodeOutlined, CaretUpOutlined, SendOutlined, FileImageOutlined } from '@ant-design/icons'
import './detail-coin/detailCoin.scss'
import checked from '../../assets/images/checked.png'
import checked_warning from '../../assets/images/checked_warning.png'
import checked_scam from '../../assets/images/checked_scam.png'
import user from '../../assets/images/user.png'
import moment from 'moment'
import '../styles/productDetail.scss'
import { get, post } from '../../api/products'
import ProductFooter from './product-footer/ProductFooter'
import chat_icon from '../../assets/images/chat-icon.png'
import liked from '../../assets/images/liked.png'
import mask_scam from '../../assets/images/mask-scam.png'
import Review from '../../components/list-review/Review'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { getCookie, STORAGEKEY } from '../../utils/storage'
import ReportScam from '../../components/modal/ReportScam'

const DetailProduct = () => {
    const TYPE_REVIEW = 'review'
    const TYPE_REPLY = 'reply'
    const TYPE_REACTION_FOR_REVIEW = 0
    const TYPE_REACTION_FOR_REPLY = 1
    const [form] = Form.useForm()
    const userInfo = getCookie(STORAGEKEY.USER_INFO)
    const [productInfo, setProductInfo] = useState()
    const { productId } = useParams()
    const [openComment, setOpenComment] = useState(false)
    const [openScam, setOpenScam] = useState(false)
    const [reload, setReload] = useState(false)
    const [dataAdd, setDataAdd] = useState()
    const [image, setImage] = useState()
    const [comment, setComment] = useState('')
    const [reactionData, setReactionData] = useState({
        type: '',
        data: {}
    })

    useEffect(() => {
        const getData = async() => {
            const product = await get(`reviews/product?productId=${productId}`)
            const accountId = []
            if (product?.data?.reviews !== null) {
                const newReviews = []
                product?.data?.reviews?.forEach((itemReview) => {
                    accountId.push(itemReview?.review?.accountId)
                    itemReview?.reactions?.forEach((itemReaction) => {
                        accountId.push(itemReaction?.accountId)
                    })
                    itemReview?.replies?.forEach((itemReplies) => {
                        accountId.push(itemReplies?.reply?.accountId)
                        itemReplies?.reactions?.forEach((itemReactionInReplies) => {
                            accountId.push(itemReactionInReplies?.accountId)
                        })
                    })
                })
                if (!_.isEmpty(accountId)) {
                    const onlyUnique = (value, index, self) => {
                        return (self.indexOf(value) === index && value !== '');
                    }
                    const unique = accountId?.filter(onlyUnique)
                    // get list account
                    const listUser = await post('reviews/auth/profiles', { "accountIds": unique })
                    if (!_.isEmpty(listUser?.data?.accounts)) {
                        product?.data?.reviews?.forEach((itemReview) => {
                            const account = listUser?.data?.accounts?.find(item => item?.id === itemReview?.review?.accountId)
                            const newReview = {
                                ...itemReview?.review,
                                accountType: account?.ccountType,
                                email: account?.email,
                                acountImage: account?.image,
                                role: account?.role,
                                userName: account?.userName
                            }
                            // reactions
                            const newReactions = []
                            itemReview?.reactions?.forEach((itemReaction) => {
                                const accountReaction = listUser?.data?.accounts?.find(item => item?.id === itemReaction?.accountId)
                                newReactions.push({
                                    ...itemReaction,
                                    accountType: accountReaction?.accountType,
                                    email: accountReaction?.email,
                                    acountImage: accountReaction?.image,
                                    userName: accountReaction?.userName,
                                    role: accountReaction?.role,
                                })
                            })
                            // replies
                            let replies = []
                            itemReview?.replies?.forEach((itemReplies) => {
                                const accountReply = listUser?.data?.accounts?.find(item => item?.id === itemReplies?.reply?.accountId)
                                const newReply = {
                                    ...itemReplies.reply,
                                    accountType: accountReply?.accountType,
                                    email: accountReply?.email,
                                    acountImage: accountReply?.image,
                                    userName: accountReply?.userName,
                                    role: accountReply?.role,
                                }
                                const newListReactionInReplies = []
                                itemReplies?.reactions?.forEach((itemReactionInReplies) => {
                                    const newReactionInReplies = listUser?.data?.accounts?.find(item => item?.id === itemReactionInReplies?.accountId)
                                    newListReactionInReplies.push({
                                        ...itemReactionInReplies,
                                        accountType: newReactionInReplies?.accountType,
                                        email: newReactionInReplies?.email,
                                        acountImage: newReactionInReplies?.image,
                                        userName: newReactionInReplies?.userName,
                                        role: newReactionInReplies?.role,
                                    })
                                })
                                replies.push({
                                    reply: newReply,
                                    reactions: newListReactionInReplies
                                })                                
                            })
                            newReviews.push({
                                reactions: newReactions,
                                review: newReview,
                                replies: replies
                            })
                        })
                    }
                }
                setProductInfo({
                    ...product?.data,
                    reviews: newReviews
                })
            } else {
                setProductInfo(product?.data)
            }
        }
        getData()
    }, [productId])

    useEffect(() => {
        if (dataAdd) {
            if (dataAdd?.type === TYPE_REVIEW) {
                const getReview = async() => {
                    const reviews = await get(`reviews/review?productId=${productInfo?.product?.id}`)
                    const reviewItem = reviews?.data?.find((item) => (item?.accountId === userInfo?.id && item?.updatedDate === dataAdd?.data?.updatedDate && item?.productId === dataAdd?.data?.productId))
                    const newReview = {
                        reactions: [],
                        replies: [],
                        review: {
                            ...reviewItem,
                            accountType: userInfo?.accountType,
                            email: userInfo?.email,
                            acountImage: userInfo?.image,
                            role: userInfo?.role,
                            userName: userInfo?.userName
                        }
                    }
                    if (productInfo?.reviews === null) {
                        setProductInfo({
                            ...productInfo,
                            reviews: [ newReview ] 
                        })
                    } else {
                        setProductInfo({
                            ...productInfo,
                            reviews: [
                                newReview,
                                ...productInfo?.reviews,
                            ] 
                        })
                    }
                }
                getReview()
            }
            if (dataAdd?.type === TYPE_REPLY) {
                const getReply = async() => {
                    const reply = await get(`reviews/reply?productId=${productInfo?.product?.id}`)
                    // tim trong mang data get reply theo projectid lays item co accounId, updatedDate, productId trung voi data cua reply vua them 
                    const replyItem = reply?.data?.find((item) => (item?.accountId === userInfo?.id && item?.updatedDate === dataAdd?.data?.updatedDate && item?.productId === dataAdd?.data?.productId && item?.reviewId === dataAdd?.data?.reviewId))
                    // time trong list review thuoc data detail cua product lay item co id === reviewId trong reply vua them
                    const reviewItem = productInfo?.reviews?.find((item) => item?.review?.id === dataAdd?.data?.reviewId)
                    // tao review moi
                    const newReview = {
                        ...reviewItem,
                        replies: [
                            {
                                reactions: [],
                                reply: {
                                    ...replyItem,
                                    accountType: userInfo?.accountType,
                                    email: userInfo?.email,
                                    acountImage: userInfo?.image,
                                    role: userInfo?.role,
                                    userName: userInfo?.userName
                                }
                            },
                            ...reviewItem?.replies
                        ],
                    }
                    // tim vi tri index cua review vua duoc add reply trong mang review cua data detail
                    const index = productInfo?.reviews?.findIndex((item) => item?.review?.id === reviewItem?.review?.id)
                    const newListReview = [...productInfo?.reviews]
                    newListReview[index] = newReview
                    // cap nhat lai data
                    setProductInfo({
                        ...productInfo,
                        reviews: newListReview
                    })
                }
                getReply()
            }
        }
    }, [reload, dataAdd])

    useEffect(() => {
        const setData = async() => {
            if (reactionData?.method === 'patch') {
                if (reactionData?.type === TYPE_REACTION_FOR_REVIEW) {
                    const newListReview = [...productInfo?.reviews]
                    const index = productInfo?.reviews?.findIndex((item) => (item?.review?.id === reactionData?.data?.commentId))
                    const newListReaction = []
                    newListReview[index]?.reactions?.forEach((itemReaction) => {
                        if (itemReaction?.accountId === userInfo?.id && itemReaction?.commentId === reactionData?.data?.commentId) {
                            newListReaction.push({
                                ...itemReaction,
                                reactionType: reactionData?.data?.reactionType
                            })
                        } else {
                            newListReaction.push(itemReaction)
                        }
                    })
                    newListReview[index] = {
                        ...newListReview[index],
                        reactions: newListReaction
                    }
                    setProductInfo({
                        ...productInfo,
                        reviews: newListReview
                    })
                }
                if (reactionData?.type === TYPE_REACTION_FOR_REPLY) {
                    const listReview = []
                    productInfo?.reviews?.forEach((itemReview) => {
                        const listReply = []
                        if (!_.isEmpty(itemReview?.replies)) {
                            itemReview?.replies?.forEach((itemReply) => {
                                const listReaction = []
                                if (itemReply?.reply?.id === reactionData?.data?.commentId) {
                                    itemReply?.reactions?.forEach((itemReaction) => {
                                        if (itemReaction?.accountId === userInfo.id && itemReaction?.commentId === reactionData?.data?.commentId) {
                                            listReaction.push({
                                                ...itemReaction,
                                                reactionType: reactionData?.data?.reactionType
                                            })
                                        } else {
                                            listReaction.push(itemReaction) 
                                        }
                                    })
                                    listReply.push({
                                        ...itemReply,
                                        reactions: listReaction
                                    })
                                } else {
                                    listReply.push(itemReply)
                                }
                            })
                            if (!_.isEmpty(listReply)) {
                                listReview.push({
                                    ...itemReview,
                                    replies: listReply
                                })
                            }
                        } else {
                            listReview.push(itemReview)
                        }
                    })
                    if (!_.isEmpty(listReview)) {
                        setProductInfo({
                            ...productInfo,
                            reviews: listReview
                        })
                    }
                }
            } else {
                if (reactionData?.type === TYPE_REACTION_FOR_REVIEW) {
                    // REACTION FOR REVIEW
                    const newListReview = [...productInfo?.reviews]
                    const index = productInfo?.reviews?.findIndex((item) => item?.review?.id === reactionData?.data?.commentId)
                    newListReview[index] = {
                        ...newListReview[index],
                        reactions: [
                            {
                                ...reactionData?.data,
                                accountType: userInfo?.accountType,
                                email: userInfo?.email,
                                image: userInfo?.image,
                                role: userInfo?.role,
                                userName: userInfo?.userName
                            },
                            ...newListReview[index]?.reactions
                        ]
                    }
                    setProductInfo({
                        ...productInfo,
                        reviews: newListReview
                    })
                }
                if (reactionData?.type === TYPE_REACTION_FOR_REPLY) {
                    // reaction for reply
                    const listReview = []
                    productInfo?.reviews?.forEach((itemReview) => {
                        const newListReply = []
                        itemReview?.replies?.forEach((itemReply) => {
                            let newReply = {}
                            if (itemReply?.reply?.id === reactionData?.data?.commentId) {
                                newReply = {
                                    ...itemReply,
                                    reactions: [
                                        {
                                            ...reactionData?.data,
                                            accountType: userInfo?.accountType,
                                            email: userInfo?.email,
                                            image: userInfo?.image,
                                            role: userInfo?.role,
                                            userName: userInfo?.userName
                                        },
                                        ...itemReply?.reactions
                                    ]
                                }
                            } else {
                                newReply = { ...itemReply }
                            }
                            newListReply.push(newReply)
                        })
                        if (!_.isEmpty(newListReply)) {
                            listReview.push({
                                ...itemReview,
                                replies: newListReply
                            })
                        }
                    })
                    if (!_.isEmpty(listReview)) {
                        setProductInfo({
                            ...productInfo,
                            reviews: listReview
                        })
                    }
                
                }
            }
        }
        if (reactionData?.type !== '' && reactionData) {
            setData()
        }
    }, [reactionData])

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const handleReply = async(e, type, reviewId) => {
        if (e.key === 'Enter') {
            if (e.target.value !== '') {
                if (type === TYPE_REVIEW) {
                    const data = {
                        content: e.target.value,
                        productId: productInfo?.product?.id,
                        star: 5,
                        image: image,
                    }
                    const dataAdd = await post('reviews/review', data)
                    if (dataAdd) {
                        setReload(true)
                        form.resetFields()
                        setDataAdd({
                            type: type,
                            data: dataAdd?.data
                        })
                        setImage()
                    }
                }
                if (type === TYPE_REPLY) {
                    const data = {
                        content: e.target.value,
                        reviewId: reviewId,
                        productId: productInfo?.product?.id,
                        image: image
                    }
                    const dataAdd = await post('reviews/reply', data)
                    if (dataAdd) {
                        setReload(true)
                        form.resetFields()
                        setDataAdd({
                            type: type,
                            data: dataAdd?.data
                        })
                        setImage()
                    }
                }
            }
        }
    }
    
    const handleSend = async(type, reviewId, datacomment) => {
        if (type === TYPE_REVIEW) {
            if (comment !== '') {
                const data = {
                    content: comment,
                    productId: productInfo?.product?.id,
                    star: 5,
                    image: image
                }
                const dataAdd = await post('reviews/review', data)
                if (dataAdd) {
                    setReload(true)
                    form.resetFields()
                    setDataAdd({
                        type: type,
                        data: dataAdd?.data
                    })
                    setImage()
                }
            }
        }
        if (type === TYPE_REPLY) {
            if (datacomment !== '') {
                const data = {
                    content: datacomment,
                    reviewId: reviewId,
                    productId: productInfo?.product?.id,
                    image: image
                }
                const dataAdd = await post('reviews/reply', data)
                if (dataAdd) {
                    setReload(true)
                    form.resetFields()
                    setDataAdd({
                        type: type,
                        data: dataAdd?.data
                    })
                    setImage()
                }
            }
        }
    }

    const handleChangeFile = (e) => {
        const formData = new FormData()
        formData.append('file', e?.fileList[0]?.originFileObj)
        const time = moment().unix()
        getBase64(e.file.originFileObj, async(url) => {
            const fileName= `${userInfo.id}_${time}`
            const dataImage = await post(`reviews/upload/image?storeEndpoint=test&fileName=${fileName}`, formData)
            setImage(dataImage?.data)
        });
    }

    console.log(productInfo)
    return (
        <div className='product'>
            <div className='product-detail'>
                <div className='product-content'>
                    <div className='product-overview'>
                        {productInfo?.product?.image ? (
                            <Image src={productInfo?.product?.image} preview={false}/>
                        ) : (
                            <span className='product-detail-image-logo'>
                              {productInfo?.product?.name?.slice(0, 3)?.toUpperCase()}
                          </span>
                        )}
                        <div className='product-overview-parameter'>
                            <div className='product-overview-parameter-info'>
                                <div className='product-overview-name'>{productInfo?.product?.name}</div>
                                {productInfo?.product?.symbol ? (
                                    <div className='product-overview-symbol'>{productInfo?.product?.symbol}</div>
                                ) : ''}
                                <div className='product-overview-evaluate'>
                                    <Tooltip placement="topLeft" title='reason scam'>
                                        <Image
                                            src={productInfo?.product?.isScam ? checked_scam : productInfo?.product?.isWarning ? checked_warning : checked}
                                            preview={false}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                            <div className='product-overview-parameter-reviews'>
                                <Rate allowHalf defaultValue={2.5} /> 4.9
                                {/* <div className='product-overview-parameter-reviews-amount'>Reviews 2.387</div> */}
                            </div>
                            <div className='product-overview-list-tags'>
                                <div className='product-tag'>{productInfo?.product?.type}</div>
                                {productInfo?.product?.holders > 0 && (
                                    <div className='product-tag'>{productInfo?.product?.holders} Holders</div>
                                )}
                                <div className='product-tag'>{productInfo?.product?.chainName}</div>
                            </div>
                        </div>
                    </div>
                    <div className='product-market'>
                        {productInfo?.product?.type === 'project' ? '' : (
                            <>
                                <div className='product-market-symbol'>BNB Price (BNB)</div>
                                <div className='product-market-price'>
                                    $234.76
                                    <div
                                    className='product-market-profit'
                                    style={{
                                        background: 'rgb(0 128 0 / 52%)',
                                        color: 'green'
                                    }}
                                    >
                                        <CaretUpOutlined />
                                        0.2%
                                    </div>
                                </div>
                            </>
                        )}
                        <div className='product-market-list'>
                            <div className='product-market-list-item'>
                                <div className='product-market-list-item-title'>Market Cap</div>
                                <div className='product-market-list-item-amount'>$1.000.234</div>
                            </div>
                            <div className='product-market-list-item'>
                                <div className='product-market-list-item-title'>Total Supply</div>
                                <div className='product-market-list-item-amount'>$1.000.234</div>
                            </div>
                            <div className='product-market-list-item'>
                                <div className='product-market-list-item-title'>Max Supply</div>
                                <div className='product-market-list-item-amount'>$1.000.234</div>
                            </div>
                            <div className='product-market-list-item'>
                                <div className='product-market-list-item-title'>Volumn Trading</div>
                                <div className='product-market-list-item-amount'>$1.000.234</div>
                            </div>
                        </div>
                    </div>
                    {productInfo?.product?.category && (
                        <div className='product-info'>
                            <div className='product-info-item'>
                                <div className='product-info-item-key'>Category: </div>
                                <div className='product-overview-list-tags'>
                                    {productInfo?.product?.category?.split(',')?.map((item) => (
                                        <div className='product-tag'>{item}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {productInfo?.product?.subcategory && (
                        <div className='product-info'>
                            <div className='product-info-item'>
                                <div className='product-info-item-key'>Sub Category: </div>
                                <div className='product-overview-list-tags'>
                                    {productInfo?.product?.subcategory?.split(';')?.map((item) => (
                                        <div className='product-tag'>{item}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className='product-info-item-key'>Product Info: </div>
                    <div className='product-info'>
                        <div className='product-info-item'>
                            <div className='product-tag-item'>
                                Source Code:
                                <CodeOutlined />
                                <div className='product-tag-item-list'>
                                    <div className='product-tag-item-list-children'>source 1</div>
                                    <div className='product-tag-item-list-children'>source 2</div>
                                    <div className='product-tag-item-list-children'>source 3</div>
                                    <div className='product-tag-item-list-children'>source 4</div>
                                    <div className='product-tag-item-list-children'>source 5</div>
                                </div>
                            </div>
                        </div>
                        <div className='product-info-item'>
                            <div className='product-tag-item'>
                                Social
                                <DownOutlined />
                                <div className='product-tag-item-list'>
                                    {productInfo?.product?.detail?.social?.map((item, index) => (
                                        <div className='product-tag-item-list-children' key={index}>
                                            <a href={`${item}`} rel="noreferrer" target='_blank'>{item}</a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='product-info-item'>
                            <div className='product-tag-item'>
                                Community
                                <DownOutlined />
                                <div className='product-tag-item-list'>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-info-item'>
                            <div className='product-tag-item'>
                                Contract
                                <DownOutlined />
                                <div className='product-tag-item-list'>
                                    {productInfo?.product?.contract?.contract?.map((item, index) => (
                                        <div className='product-tag-item-list-children' key={index}>
                                            <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>
                                                {item?.address} {item?.chainName}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='product-info-item'>
                            <div className='product-tag-item'>
                                Founders
                                <DownOutlined />
                                <div className='product-tag-item-list'>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-info-item'>
                            <div className='product-tag-item'>
                                Funds
                                <DownOutlined />
                                <div className='product-tag-item-list'>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-info-item'>
                            <div className='product-tag-item'>
                                More
                                <DownOutlined />
                                <div className='product-tag-item-list'>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-info-item'>
                            <div className='product-tag-item'>
                                Decimals
                                <DownOutlined />
                                <div className='product-tag-item-list'>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                    <div className='product-tag-item-list-children'>
                                        <a href='https://dev0-admin.gear5.guru/' rel="noreferrer" target='_blank'>community 1</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-info-item'>
                            <div className='product-tag-item'>
                                Websites
                                <DownOutlined />
                                <div className='product-tag-item-list'>
                                    <div className='product-tag-item-list-children'>
                                        <a href={`${productInfo?.detail?.website}`} rel="noreferrer" target='_blank'>{productInfo?.detail?.website}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='product-info-item-key'>Description: </div>
                    <div className='product-info-item-desc'>
                        {(productInfo?.product?.desc !== null) ? productInfo?.product?.desc : (productInfo?.product?.detail && productInfo?.product?.detail?.description !== null) ? productInfo?.product?.detail?.description : ''}
                    </div>
                    <ProductFooter
                        liked={liked}
                        chat_icon={chat_icon}
                        mask_scam={mask_scam}
                        setOpenComment={setOpenComment}
                        productInfo={productInfo}
                        setOpenScam={setOpenScam}
                    />
                    <Form form={form} style={{ width: '100%' }}>
                        <div className='review'>
                            {openComment && (
                                <div className='product-detail-form'>
                                    <div className='product-detail-form-avatar'>
                                        <Image src={userInfo?.image ? userInfo?.image : user} preview={false}/>
                                    </div>
                                    <Form.Item
                                        name='review'
                                    >
                                        <Input
                                            autoFocus
                                            name='reply'
                                            suffix={<>
                                                <Upload
                                                    onChange={handleChangeFile}
                                                >
                                                    <FileImageOutlined style={{ marginRight: '1rem', cursor: 'pointer' }}/>
                                                </Upload>
                                                <SendOutlined
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => handleSend(TYPE_REVIEW)}
                                                />
                                            </>
                                            }
                                            placeholder='Enter comment...'
                                            onChange={(e) => setComment(e.target.value)}
                                            onKeyPress={(e) => handleReply(e, TYPE_REVIEW)}
                                        />
                                        {image && (
                                            <div className='product-detail-form-comment-image'>
                                                <Image src={image} preview={false}/>
                                            </div>
                                        )}
                                    </Form.Item>
                                </div>
                            )}
                        </div>
                        {productInfo?.reviews?.map((item, index) => (
                            <Review
                                openComment={openComment}
                                key={index}
                                data={item}
                                productId={productInfo?.product?.id}
                                handleReply={handleReply}
                                handleSend={handleSend}
                                userInfo={userInfo}
                                setReactionData={setReactionData}
                                setImage={setImage}
                                setComment={setComment}
                            />
                        ))}
                    </Form>
                </div>
            </div>
            <ReportScam
                productInfo={productInfo}
                productId={productId}
                openScam={openScam}
                setOpenScam={setOpenScam}
                userInfo={userInfo}
            />
        </div>
    )
}

export default DetailProduct
