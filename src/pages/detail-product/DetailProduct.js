import React, { useEffect, useState, useRef, useContext } from 'react'
import { Image, Rate, Tooltip, Popover } from 'antd'
import { Form, Input, Upload, Select, Checkbox } from 'antd'
import { DownOutlined, CodeOutlined, CaretUpOutlined, SendOutlined, CopyOutlined } from '@ant-design/icons'
import './detail-coin/detailCoin.scss'
import user from '../../assets/images/user.png'
import moment from 'moment'
import '../styles/productDetail.scss'
import { get, post } from '../../api/products'
import Review from '../../components/list-review/Review'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { getCookie, STORAGEKEY } from '../../utils/storage'
import ListReview from './product-footer/ListReview'
import smile from '../../assets/images/smile.png'
import EmojiPicker from 'emoji-picker-react'
import icon_image from '../../assets/images/image.png'
import { SignInContext } from '../../components/layout/Main'
import warning from '../../assets/images/warning.png'
import scam from '../../assets/images/scam.png'

const DetailProduct = () => {
    const DEFAULT_ALL = 'all'
    const DEFAULT_SCAM = 'scam'
    const DEFAULT_NOT_SCAM = 'notScam'
    const signInContext = useContext(SignInContext)
    const TYPE_REVIEW = 'review'
    const TYPE_REPLY = 'reply'
    const TYPE_REACTION_FOR_REVIEW = 0
    const TYPE_REACTION_FOR_REPLY = 1
    const [form] = Form.useForm()
    const userInfo = getCookie(STORAGEKEY.USER_INFO)
    const [productInfo, setProductInfo] = useState()
    const { productId } = useParams()
    const [openComment, setOpenComment] = useState(false)
    const [reload, setReload] = useState(false)
    const [dataAdd, setDataAdd] = useState()
    const [defaultFilter, setDefaultFilter] = useState(DEFAULT_ALL)
    const ref = useRef(null)
    const [openEmoji, setOpenEmoji] = useState(false)
    const [data, setData] = useState({
        isScam: false,
        content: '',
        sources: [],
        image: '',
        star: 5
    })
    const [reactionData, setReactionData] = useState({
        type: '',
        data: {}
    })
    const [dataSearch, setDataSearch] = useState()
    const [isShow, setIsShow] = useState()

    useEffect(() => {
        const getData = async() => {
            const product = await get(`reviews/product?productId=${productId}`)
            // check show data
            const shows = {
                sourceCode: false,
                community: false,
                founders: false,
                funds: false,
                moreInfo: false,
                decimals: false,
                website: false,
                contract: false
            }
            if (product?.data?.product?.detail) {
                if (product?.data?.product?.detail?.sourceCode) {
                    Object.keys(product?.data?.product?.detail?.sourceCode).forEach((key) => {
                        if (product?.data?.product?.detail?.sourceCode[key].length === 0) {
                            shows['sourceCode'] = false
                        } else {
                            shows['sourceCode'] = true
                        }
                    })
                }
                if (product?.data?.product?.detail?.community) {
                    Object.keys(product?.data?.product?.detail?.community).forEach((key) => {
                        if (product?.data?.product?.detail?.community[key].length === 0) {
                            shows['community'] = false
                        } else {
                            shows['community'] = true
                        }
                    })
                }
                if (product?.data?.product?.detail?.founders) {
                    Object.keys(product?.data?.product?.detail?.founders).forEach((key) => {
                        if (product?.data?.product?.detail?.founders[key].length === 0) {
                            shows['founders'] = false
                        } else {
                            shows['founders'] = true
                        }
                    })
                }
                if (product?.data?.product?.detail?.funds) {
                    Object.keys(product?.data?.product?.detail?.funds).forEach((key) => {
                        if (product?.data?.product?.detail?.funds[key].length === 0) {
                            shows['funds'] = false
                        } else {
                            shows['funds'] = true
                        }
                    })
                }
                if (product?.data?.product?.detail?.moreInfo) {
                    Object.keys(product?.data?.product?.detail?.moreInfo).forEach((key) => {
                        if (product?.data?.product?.detail?.moreInfo[key].length === 0) {
                            shows['moreInfo'] = false
                        } else {
                            shows['moreInfo'] = true
                        }
                    })
                }
                if (product?.data?.product?.detail?.decimals) {
                    Object.keys(product?.data?.product?.detail?.decimals).forEach((key) => {
                        if (_.isEmpty(product?.data?.product?.detail?.decimals[key])) {
                            shows['decimals'] = false
                        } else {
                            shows['decimals'] = true
                        }
                    })
                }
                if (product?.data?.product?.detail?.website) {
                    Object.keys(product?.data?.product?.detail?.website).forEach((key) => {
                        if (product?.data?.product?.detail?.website[key].length === 0) {
                            shows['website'] = false
                        } else {
                            shows['website'] = true
                        }
                    })
                }
                if (product?.data?.product?.contract) {
                    product?.data?.product?.contract?.contract?.forEach((item) => {
                        console.log(item)
                        if (_.isEmpty(item)) {
                            shows['contract'] = false
                        } else {
                            shows['contract'] = true
                        }
                    })
                }
            }
            setIsShow(shows)
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

    console.log(productInfo)
    const handleReply = async(e, type, reviewId) => {
        if (e.ctrlKey && e.key === 'Enter') {
            setData({
                ...data,
                content: `${data?.content}\n`
            })
        } else {
            e.preventDefault()
            if (e.target.value !== '') {
                if (type === TYPE_REVIEW) {
                    const params = {
                        ...data,
                        productId: productInfo?.product?.id,
                        productName: productInfo?.product?.name,
                        type: productInfo?.product?.type,
                    }
                    const dataAdd = await post('reviews/review', params)
                    if (dataAdd) {
                        setReload(true)
                        form.resetFields()
                        setDataAdd({
                            type: type,
                            data: dataAdd?.data
                        })
                        setOpenComment(false)
                        setData({
                            isScam: false,
                            content: '',
                            sources: [],
                            image: '',
                            star: 5
                        })
                    }
                }
                if (type === TYPE_REPLY) {
                    const params = {
                        content: e.target.value,
                        reviewId: reviewId,
                        productId: productInfo?.product?.id,
                        image: data?.image
                    }
                    const dataAdd = await post('reviews/reply', params)
                    if (dataAdd) {
                        setReload(true)
                        form.resetFields()
                        setDataAdd({
                            type: type,
                            data: dataAdd?.data
                        })
                        setData({
                            isScam: false,
                            content: '',
                            sources: [],
                            image: '',
                            star: 5
                        })
                    }
                }
            }
        }
    }

    const handleSend = async(type, reviewId, datacomment) => {
        if (type === TYPE_REVIEW) {
            if (data?.content !== '') {
                const params = {
                    ...data,
                    productId: productInfo?.product?.id,
                    productName: productInfo?.product?.name,
                    type: productInfo?.product?.type,
                }
                const dataAdd = await post('reviews/review', params)
                if (dataAdd) {
                    setReload(true)
                    form.resetFields()
                    setDataAdd({
                        type: type,
                        data: dataAdd?.data
                    })
                    setOpenComment(false)
                    setData({
                        isScam: false,
                        content: '',
                        sources: [],
                        image: '',
                        star: 5
                    })
                }
            }
        }
        if (type === TYPE_REPLY) {
            if (datacomment !== '') {
                const params = {
                    content: datacomment,
                    reviewId: reviewId,
                    productId: productInfo?.product?.id,
                    image: data?.image
                }
                const dataAdd = await post('reviews/reply', params)
                if (dataAdd) {
                    setReload(true)
                    form.resetFields()
                    setDataAdd({
                        type: type,
                        data: dataAdd?.data
                    })
                }
            }
        }
    }

    const copyAddress = (e, address) => {
        e.stopPropagation()
        navigator.clipboard.writeText(address)
    }

    const handleClickEmoji = (value) => {
        const cursor = ref.current.selectionStart;
        const text = data?.content.slice(0, cursor) + value.emoji;
        setData({
            ...data,
            content: text
        })
    }

    const handleChangeTextArea = (e) => {
        const urlR = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        if (e.target.value.match(urlR)) {
        } else {
            setData({
                ...data,
                content: e.target.value
            })
        }
        setOpenEmoji(false)
    }

    useEffect(() => {
        if (dataAdd) {
            if (dataAdd?.type === TYPE_REVIEW) {
                const getReview = async() => {
                    // const reviews = await get(`reviews/review?productId=${productInfo?.product?.id}`)
                    // const reviewItem = reviews?.data?.find((item) => (item?.accountId === userInfo?.id && item?.updatedDate === dataAdd?.data?.updatedDate && item?.productId === dataAdd?.data?.productId))
                    const newReview = {
                        reactions: [],
                        replies: [],
                        review: {
                            // ...reviewItem,
                            ...dataAdd?.data,
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
                    // const reply = await get(`reviews/reply?productId=${productInfo?.product?.id}`)
                    // tim trong mang data get reply theo projectid lays item co accounId, updatedDate, productId trung voi data cua reply vua them 
                    // const replyItem = reply?.data?.find((item) => (item?.accountId === userInfo?.id && item?.updatedDate === dataAdd?.data?.updatedDate && item?.productId === dataAdd?.data?.productId && item?.reviewId === dataAdd?.data?.reviewId))
                    // time trong list review thuoc data detail cua product lay item co id === reviewId trong reply vua them
                    
                    const reviewItem = productInfo?.reviews?.find((item) => item?.review?.id === dataAdd?.data?.reviewId)
                    // tao review moi
                    const newReview = {
                        ...reviewItem,
                        replies: [
                            {
                                reactions: [],
                                reply: {
                                    ...dataAdd?.data,
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

    const getBase64 = (img, callback) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    }

    const handleChangeFile = (e) => {
        if (userInfo) {
            const formData = new FormData()
            formData.append('file', e?.fileList[0]?.originFileObj)
            const time = moment().unix()
            getBase64(e.file.originFileObj, async(url) => {
                console.log('thanh')
                const fileName= `${userInfo.id}_${time}`
                const dataImage = await post(`reviews/upload/image?storeEndpoint=test&fileName=${fileName}`, formData)
                setData({
                    ...data,
                    image: dataImage?.data
                })
            });
        } else {
            signInContext?.handleSetOpenModal(true)
        }
    }

    const handleChange = (values) => {
        setData({
            ...data,
            sources: values
        })
    }

    useEffect(() => {
        if (defaultFilter === DEFAULT_ALL) {
            setDataSearch(productInfo)
        }
        if (defaultFilter === DEFAULT_NOT_SCAM) {
            const listReview = productInfo?.reviews?.filter((item) => item?.review?.isScam === false)
            setDataSearch({
                ...productInfo,
                reviews: listReview
            })
        }
        if (defaultFilter === DEFAULT_SCAM) {
            const listReview = productInfo?.reviews?.filter((item) => item?.review?.isScam === true)
            setDataSearch({
                ...productInfo,
                reviews: listReview
            })
        }
    }, [defaultFilter])

    const handleAddComment = (isOpen) => {
        const token = Boolean(getCookie(STORAGEKEY.ACCESS_TOKEN))
        if (!token) {
            signInContext?.handleSetOpenModal(true)
        } else {
            setOpenComment(isOpen)
        }
    }

    return (
        <div className='product'>
            <div className='product-detail'>
                <div className='product-content'>
                    <div className='product-header'>
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
                                        <Tooltip placement="topLeft" title={productInfo?.product?.proof?.isScam}>
                                            {/* <Image
                                                src={productInfo?.product?.isScam ? checked_scam : productInfo?.product?.isWarning ? checked_warning : checked}
                                                preview={false}
                                            /> */}
                                            {productInfo?.product?.isScam ? (
                                                <Image src={scam} preview={false}/>
                                            ) : (productInfo?.product?.isWarning) ? (
                                                    <Image src={warning} preview={false}/>
                                                ) : ''}
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className='product-overview-parameter-reviews'>
                                    <Rate allowHalf defaultValue={2.5} /> 4.9
                                    {/* <div className='product-overview-parameter-reviews-amount'>Reviews 2.387</div> */}
                                </div>
                                <div className='product-overview-list-tags'>
                                    {productInfo?.product?.type && (
                                        <div className='product-tag'>{productInfo?.product?.type}</div>
                                    )}
                                    {productInfo?.product?.detail !== null && (
                                        <>
                                            {parseInt(productInfo?.product?.detail?.holders) > 0 && (
                                                <div className='product-tag'>
                                                    {new Intl.NumberFormat().format(productInfo?.product?.detail?.holders)} Holders
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {productInfo?.product?.chainName !== null && (
                                        <div className='product-tag'>{productInfo?.product?.chainName}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* {productInfo?.product?.type === 'project' ? '' : ( */}
                            <div className='product-price'>
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
                            </div>
                        {/* )} */}
                    </div>
                    <div className='product-market'>
                        <div className='product-market-list'>
                            {productInfo?.product?.detail !== null && (
                                <div className='product-market-list-item'>
                                    <div className='product-market-list-item-title'>Market Cap</div>
                                    <div className='product-market-list-item-amount'>
                                        {productInfo?.product?.detail?.marketcap !== 0 ? `$ ${Number(productInfo?.product?.detail?.marketcap)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` : '__'}
                                    </div>
                                </div>
                            )}
                            {productInfo?.product?.detail !== null && (
                                <div className='product-market-list-item'>
                                    <div className='product-market-list-item-title'>Total Supply</div>
                                    <div className='product-market-list-item-amount'>
                                        {productInfo?.product?.detail?.marketcap !== 0 ? `$ ${Number(productInfo?.product?.detail?.totalSupply)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` : '__'}
                                    </div>
                                </div>
                            )}
                            {productInfo?.product?.detail !== null && (
                                <div className='product-market-list-item'>
                                    <div className='product-market-list-item-title'>Max Supply</div>
                                    <div className='product-market-list-item-amount'>
                                        {productInfo?.product?.detail?.maxSupply !== 0 ? `$ ${Number(productInfo?.product?.detail?.maxSupply)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` : '__'}
                                    </div>
                                </div>
                            )}
                            {productInfo?.product?.detail !== null && (
                                <div className='product-market-list-item'>
                                    <div className='product-market-list-item-title'>Volume Trading</div>
                                    <div className='product-market-list-item-amount'>
                                        {productInfo?.product?.detail?.volumeTrading !== 0 ? `$ ${Number(productInfo?.product?.detail?.volumeTrading)?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}` : '__'}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {productInfo?.product?.category && (
                        <div className='product-info'>
                            <div className='product-info-item'>
                                <div className='product-info-item-key'>Category: </div>
                                <div className='product-overview-list-tags'>
                                    {productInfo?.product?.category?.split(',')?.map((item, index) => (
                                        <div className='product-tag' key={index}>{item}</div>
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
                                    {(productInfo?.product?.subcategory?.split(','))?.map((item, index) => (
                                        <div className='product-tag' key={index}>{item}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {productInfo?.product?.detail && productInfo?.product?.detail !== null && (
                        <>
                            <div className='product-info-item-key'>Product Info: </div>
                            <div className='product-info'>
                                <div className='product-info-item'>
                                    {isShow?.sourceCode && (
                                        <div className='product-tag-item'>
                                            Source Code:
                                            <CodeOutlined />
                                            <div className='product-tag-item-list'>
                                                {Object.keys(productInfo?.product?.detail?.sourceCode).map((key) => {
                                                    return (<span key={key}>
                                                        {productInfo?.product?.detail?.sourceCode[key]?.map((item, index) => (
                                                            <div className='product-tag-item-list-children' key={index}>
                                                                <a href={item} target='_blank'  rel="noreferrer">{key}</a>
                                                            </div>
                                                        ))}
                                                    </span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* <div className='product-info-item'>
                                    {isShow?.community && (
                                        <div className='product-tag-item'>
                                            Community
                                            <DownOutlined />
                                            <div className='product-tag-item-list'>
                                                {Object.keys(productInfo?.product?.detail?.community).map((key) => {
                                                    return (<>
                                                        <>
                                                            {productInfo?.product?.detail?.community[key]?.map((item, index) => (
                                                                <div className='product-tag-item-list-children' key={index}>
                                                                    <a href={item} target='_blank'  rel="noreferrer">{key}</a>
                                                                </div>
                                                            ))}
                                                        </>
                                                    </>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div> */}
                                <div className='product-info-item'>
                                    {isShow?.contract && (
                                        <div className='product-tag-item'>
                                            Contract
                                            <DownOutlined />
                                            <div className='product-tag-item-list'>
                                                {productInfo?.product?.contract?.contract?.map((item, index) => (
                                                    <div className='product-tag-item-list-children' key={index}>
                                                        <div className='product-tag-item-list-children-contract'>
                                                            <span className='product-tag-item-list-children-contract-address'>
                                                                {item?.address}
                                                            </span>
                                                            <CopyOutlined
                                                                style={{ padding: '0, 1rem' }}
                                                                onClick={(e) => copyAddress(e, item?.address)}
                                                            />
                                                            <span className='product-tag-item-list-children-contract-chain'>
                                                                {item?.chainName}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='product-info-item'>
                                    {isShow?.founders && (
                                        <div className='product-tag-item'>
                                            Founders
                                            <DownOutlined />
                                            <div className='product-tag-item-list'>
                                                {productInfo?.product?.detail?.founders?.map((item, index) => (
                                                    <div className='product-tag-item-list-children' key={index}>
                                                        <a href={item?.social[0]} target='_blank' rel="noreferrer">{item?.name}</a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='product-info-item'>
                                    {isShow?.funds && (
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
                                    )}
                                </div>
                                <div className='product-info-item'>
                                    {isShow?.moreInfo && (
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
                                    )}
                                </div>
                                <div className='product-info-item'>
                                    {isShow?.decimals && (
                                        <div className='product-tag-item'>
                                            Decimals
                                            <DownOutlined />
                                            <div className='product-tag-item-list'>
                                                {Object.keys(productInfo?.product?.detail?.decimals).map((key) => {
                                                    return (<div key={key}>
                                                        <div className='product-tag-item-list-children'>
                                                            <div className='product-tag-item-list-children-contract'>
                                                                <span className='product-tag-item-list-children-contract-decimals'>
                                                                    {productInfo?.product?.detail?.decimals[key]?.contract_address}
                                                                </span>
                                                                <CopyOutlined
                                                                    style={{ padding: '0, 1rem' }}
                                                                    onClick={(e) => copyAddress(e, productInfo?.product?.detail?.decimals[key]?.contract_address)}
                                                                />
                                                                <span className='product-tag-item-list-children-contract-chain'>
                                                                    {key}
                                                                </span>
                                                                <span className='product-tag-item-list-children-contract-decimal'>
                                                                    {productInfo?.product?.detail?.decimals[key]?.decimal_place}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='product-info-item'>
                                    {isShow?.website && (
                                        <div className='product-tag-item'>
                                            Websites
                                            <DownOutlined />
                                            <div className='product-tag-item-list'>
                                                {Object.keys(productInfo?.product?.detail?.website).map((key) => {
                                                    return (<span key={key}>
                                                        {!_.isEmpty(productInfo?.product?.detail?.website[key]) && (
                                                            <>
                                                                {productInfo?.product?.detail?.website[key]?.map((item, index) => (
                                                                    <div className='product-tag-item-list-children' key={index}>
                                                                        <a href={item} target='_blank'  rel="noreferrer">{key}</a>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        )}
                                                    </span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {productInfo?.product?.desc && (
                        <>
                            <div className='product-info-item-key'>Description: </div>
                            <div className='product-info-item-desc'>
                                {(productInfo?.product?.desc !== null) ? productInfo?.product?.desc : (productInfo?.product?.detail && productInfo?.product?.detail?.description !== null) ? productInfo?.product?.detail?.description : ''}
                            </div>
                        </>
                    )}
                    
                    {/* <ProductFooter
                        liked={liked}
                        chat_icon={chat_icon}
                        mask_scam={mask_scam}
                        setOpenComment={setOpenComment}
                        productInfo={productInfo}
                        setOpenScam={setOpenScam}
                    /> */}
                    <ListReview
                        handleAddComment={handleAddComment}
                        defaultFilter={defaultFilter}
                        setDefaultFilter={setDefaultFilter}
                    />
                    {/* {productInfo?.reviews?.map((item, index) => (
                        <Review
                            openComment={openComment}
                            key={index}
                            data={item}
                            productId={productInfo?.product?.id}
                            handleReply={handleReply}
                            handleSend={handleSend}
                            userInfo={userInfo}
                            setReactionData={setReactionData}
                            setData={setData}
                            // setComment={setComment}
                        />
                    ))} */}

                    {openComment && (
                        <div className='product-detail-form'>
                            <div className='product-detail-form-avatar'>
                                <Image src={userInfo?.image ? userInfo?.image : user} preview={false}/>
                            </div>
                            <div className='product-detail-form-content'>
                                <div className='product-detail-form-content-text'>
                                    <div className='product-detail-form-content-rate'>
                                        <Rate
                                            defaultValue={data?.star}
                                            onChange={(value) => setData({...data, star: value})}
                                        />
                                    </div>
                                    <Input.TextArea
                                        className='product-detail-form-content-textarea'
                                        ref={ref}
                                        value={data?.content}
                                        autoFocus
                                        placeholder='Enter comment...'
                                        autoSize={{ minRows: 1 }}
                                        onChange={handleChangeTextArea}
                                        onFocus={() => setOpenEmoji(false)}
                                        onPressEnter={(e) => handleReply(e, TYPE_REVIEW)}
                                    />
                                    <Select
                                        value={data?.sources}
                                        placeholder="Enter multiple link"
                                        mode="tags"
                                        onChange={handleChange}
                                        onFocus={() => setOpenEmoji(false)}
                                    />
                                    <Popover
                                        content='Click to report scam project'
                                        overlayClassName='product-detail-form-content-popover'
                                    >
                                        <div style={{ margin: '1rem 0', width: 'fit-content' }}>
                                            <Checkbox
                                                onChange={() => setData({...data, isScam: !data?.isScam})}
                                                checked={data?.isScam}
                                            >
                                                Is Scam
                                            </Checkbox>
                                        </div>
                                    </Popover>
                                    {data?.image && (
                                        <div className='product-detail-form-image'>
                                            <Image src={data?.image} preview={false}/>
                                        </div>
                                    )}
                                </div>
                                <div className='product-detail-form-footer'>
                                    <div className='product-detail-form-footer-item'>
                                        <Upload
                                            onChange={handleChangeFile}
                                        >
                                            <Image src={icon_image} preview={false}/>
                                        </Upload>
                                    </div>
                                    <div className='product-detail-form-footer-item'>
                                        <Image
                                            src={smile}
                                            preview={false}
                                            onClick={() => setOpenEmoji(!openEmoji)}
                                            className='product-detail-form-icon-emoji'
                                        />
                                    </div>
                                    <div className='product-detail-form-footer-item'>
                                        {openEmoji && 
                                            <EmojiPicker
                                                emojiStyle='facebook'
                                                height={250}
                                                width={250}
                                                lazyLoadEmojis={true}
                                                onEmojiClick={handleClickEmoji}
                                                
                                            />
                                        }
                                    </div>
                                    <div className='product-detail-form-footer-item'>
                                        <SendOutlined
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleSend(TYPE_REVIEW)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <Form form={form}>
                        {(dataSearch ? dataSearch : productInfo)?.reviews?.map((item, index) => (
                            <Review
                                key={index}
                                data={item}
                                productId={productInfo?.product?.id}
                                handleReply={handleReply}
                                handleSend={handleSend}
                                userInfo={userInfo}
                                setReactionData={setReactionData}
                                setData={setData}
                            />
                        ))}
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
