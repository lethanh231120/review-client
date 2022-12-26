import React, { useState, useRef, useEffect } from 'react'
import { Modal, Input, Image, Select, Upload, Button, Empty } from 'antd'
import EmojiPicker from 'emoji-picker-react'
import ReportItem from '../report-item/ReportItem'
import './reportScam.scss'
import moment from 'moment'
import { post, get } from '../../api/products'
import _ from 'lodash'
import nodata from '../../assets/images/nodata.png'

import user from '../../assets/images/user.png'
import image from '../../assets/images/image.png'
import smile from '../../assets/images/smile.png'

const ReportScam = ({ productInfo, openScam, userInfo, setOpenScam, productId }) => {
    const ref = useRef(null)
    const [openEmoji, setOpenEmoji] = useState(false)
    const [data, setData] = useState({
        isScam: true,
        reason: '',
        sources: [],
        image: ''
    })
    const [scams, setScams] = useState([])

    const handleClickEmoji = (value) => {
        const cursor = ref.current.selectionStart;
        const text = data?.reason.slice(0, cursor) + value.emoji;
        setData({
            ...data,
            reason: text
        })
    }

    const handleChangeTextArea = (e) => {
        const urlR = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        if (e.target.value.match(urlR)) {
            console.log('data la link')
        } else {
            setData({
                ...data,
                reason: e.target.value
            })
        }
        setOpenEmoji(false)
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleChangeFile = (e) => {
        const formData = new FormData()
        formData.append('file', e?.fileList[0]?.originFileObj)
        const time = moment().unix()
        getBase64(e.file.originFileObj, async(url) => {
            const fileName= `${userInfo.id}_${time}`
            const dataImage = await post(`reviews/upload/image?storeEndpoint=test&fileName=${fileName}`, formData)
            setData({
                ...data,
                image: dataImage?.data
            })
        });
    }

    const handleChange = (values) => {
        setData({
            ...data,
            sources: values
        })
    }

    useEffect(() => {
        const getListScam = async() => {
            const scams = await get(`reviews/evaluate?productId=${productId}`)
            const listScam = []
            if (scams?.data !== null) {
                scams?.data?.forEach((item) => {
                    const newSources = []
                    item?.sources?.split(',')?.forEach((item) => {
                        newSources.push(item)
                    })
                    listScam.push({
                        ...item,
                        userImage: userInfo.image,
                        sources: newSources
                    })
                })
                setScams(listScam)
            } else {
                setScams([])
            }
        }
        openScam && getListScam()
    }, [productId, openScam, userInfo])

    const handlSubmitForm = async() => {
        const params = {
            ...data,
            productId: productInfo?.product?.id,
            productName: productInfo?.product?.name,
            type: productInfo?.product?.type,
        }
        const postData = await post('reviews/evaluate', params)
        const newSources = []
        postData?.data?.sources?.split(',')?.forEach((item) => {
            newSources.push(item)
        })
        setData({
            ...data,
            reason: '',
            sources: [],
            image: ''
        })
        setScams([
            {
                ...postData?.data,
                sources: newSources,
                userImage: userInfo?.image
            },
            ...scams
        ])
    }

    return (
        <Modal
            centered
            title='Report Scam'
            className='modal-report-scam'
            visible={openScam}
            width={1000}
            onOk={() => setOpenScam(false)}
            onCancel={() => setOpenScam(false)}
            footer={false}
        >
            <div className='modal-report-body'>
                <div className='modal-report-body-content'>
                    <div className='modal-report-image'>
                        <Image src={userInfo?.image ? userInfo?.image : user} preview={false}/>
                    </div>
                    <div className='modal-report-content'>
                        <div className='modal-report-name'>
                            {userInfo?.name}
                        </div>
                        <div className='modal-report-form'>
                            <div className='modal-report-text'>
                                <Input.TextArea
                                    ref={ref}
                                    value={data?.reason}
                                    autoFocus
                                    placeholder='Enter Reson...'
                                    autoSize={{ minRows: 4 }}
                                    onChange={handleChangeTextArea}
                                    onFocus={() => setOpenEmoji(false)}
                                    onPressEnter={handlSubmitForm}
                                />
                                <Select
                                    value={data?.sources}
                                    placeholder="Enter multiple link"
                                    mode="tags"
                                    onChange={handleChange}
                                    onFocus={() => setOpenEmoji(false)}
                                />
                                {data?.image && (
                                    <div className='modal-report-form-image'>
                                        <Image src={data?.image} preview={false}/>
                                    </div>
                                )}
                            </div>
                            <div className='modal-report-footer'>
                                <div className='modal-report-footer-left'>
                                    <Upload
                                        onChange={handleChangeFile}
                                    >
                                        <Image src={image} preview={false}/>
                                    </Upload>
                                    <Image
                                        src={smile}
                                        preview={false}
                                        onClick={() => setOpenEmoji(!openEmoji)}
                                        className='modal-report-icon-emoji'
                                    />
                                    {openEmoji && 
                                    // <div>
                                        <EmojiPicker
                                            emojiStyle='google'
                                            // searchDisabled={false}
                                            height={400}
                                            lazyLoadEmojis={true}
                                            // autoFocusSearch={false}
                                            onEmojiClick={handleClickEmoji}
                                            // suggestedEmojisMode='recent'
                                            
                                        />
                                    // {/* </div> */}
                                    }
                                </div>
                                <Button type="primary" onClick={handlSubmitForm}>
                                    Report
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modal-report-list'>
                    <div className='modal-report-list-title'>
                        Report Scam {!_.isEmpty(scams) && (scams?.length)}
                    </div>
                    {_.isEmpty(scams) ? (
                        <Empty
                            image={nodata}
                            imageStyle={{
                              height: 60,
                            }}
                            description={
                            <span>
                                <span style={{ fontSize: '1.6rem', color: 'red', fontWeight: 600 }}>SORRY </span>
                                <span style={{ fontSize: '1.6rem', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '600' }}>NO REPORT SCAM</span>
                            </span>
                            }
                        />
                    ) : (
                        <>
                            {scams?.map((item, index) => (
                                <ReportItem key={index} data={item}/>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default ReportScam
