import React, { useState } from 'react'
import { Modal, Row, Col, Form, Input, Radio, Button } from 'antd'

const ModalAddProduct = ({ isModalAddProduct, setIsModalAddProduct }) => {
  const [form] = Form.useForm()
  const [openReason, setOpenReason] = useState(false)
  const handleChangeEvaluate = (e) => {
    console.log(e)
    console.log(e.target.value)
    if (e.target.value) {
        setOpenReason(true)
    }
  }

  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <Modal
      title="Modal Add Product"
      visible={isModalAddProduct}
      footer={false}
      onOk={() => setIsModalAddProduct(false)}
      onCancel={() => setIsModalAddProduct(false)}
    >
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Form.Item
                        label="Product Name"
                        name="productName"
                        rules={[{ required: true, message: 'Please input your productName!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Market"
                        name="market"
                        rules={[{ required: true, message: 'Please input your market!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Volumn"
                        name="volumn"
                        rules={[{ required: true, message: 'Please input your volumn!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Form.Item
                        label="Backer"
                        name="backer"
                        rules={[{ required: true, message: 'Please input your backer!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Tags"
                        name="tags"
                        rules={[{ required: true, message: 'Please input your tags!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Founder"
                        name="founder"
                        rules={[{ required: true, message: 'Please input your founder!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Chain"
                        name="chain"
                        rules={[{ required: true, message: 'Please input your chain!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Form.Item
                        label="Website"
                        name="website"
                        rules={[{ required: true, message: 'Please input your website!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Source"
                        name="source"
                        rules={[{ required: true, message: 'Please input your source!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="White Paper"
                        name="whitePaper"
                        rules={[{ required: true, message: 'Please input your whitePaper!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Contract"
                        name="contract"
                        rules={[{ required: true, message: 'Please input your contract!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Form.Item
                        label="Twitter"
                        name="twitter"
                        rules={[{ required: true, message: 'Please input your twitter!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Telegram"
                        name="telegram"
                        rules={[{ required: true, message: 'Please input your telegram!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Facebook"
                        name="facebook"
                        rules={[{ required: true, message: 'Please input your facebook!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        label="Discord"
                        name="discord"
                        rules={[{ required: true, message: 'Please input your discord!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Form.Item
                        label="Acticle Links"
                        name="acticleLinks"
                        rules={[{ required: true, message: 'Please input your acticleLinks!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Form.Item name={['scam', 'isScam']} label="Evaluate">
                    <Radio.Group defaultValue="good" buttonStyle="solid" onChange={handleChangeEvaluate}>
                        <Radio.Button value="false">Good</Radio.Button>
                        <Radio.Button value="true">Scam</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Row>
            <Row>
                {openReason && (
                    <Form.Item name={['scam', 'reason']} label="reason">
                        <Input placeholder='Enter reason project scam ...'/>
                    </Form.Item>
                )}
            </Row>
            <Form.Item>
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default ModalAddProduct
