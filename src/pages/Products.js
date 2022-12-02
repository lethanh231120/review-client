import React, { useState } from 'react'
import { Row, Col, Card, Layout, Button, Input, Select, Tabs } from 'antd'

import ListProduct from '../components/product-tab/ListProduct'
import ProductPending from '../components/product-tab/ProductPending'
import ProductScam from '../components/product-tab/ProductScam'
import ModalAddProduct from '../components/modal/ModalAddProduct'

const { Content } = Layout
const { TabPane } = Tabs

const Products = () => {
  const [isModalAddProduct, setIsModalAddProduct] = useState(false)
  return (
    <div>
        <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Products"
                    extra={
                        <Button
                          type='primary'
                          onClick={() => setIsModalAddProduct(!isModalAddProduct)}
                        >
                            Add product
                        </Button>
                    }
                >
                    <Row>
                        <Col span={22} offset={1}> 
                            <Content
                                style={{
                                borderRadius: '1.2rem',
                                margin: '2rem 0',
                                padding: '2rem',
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Input placeholder='Enter key word....'/>
                                    </Col>
                                    <Col span={8}>
                                        <Input placeholder='Enter user name....'/>
                                    </Col>
                                    <Col span={8}>
                                    <Select
                                        defaultValue="great than 1000"
                                        style={{
                                            width: '100%',
                                        }}
                                        // onChange={handleChangeSelect}
                                        placeholder='Amount dislike'
                                        options={[
                                            {
                                                value: 'great than 1000',
                                                label: '> 1000',
                                            },
                                            {
                                                value: 'less than 1000',
                                                label: '< 1000',
                                            }
                                        ]}
                                        />
                                    </Col>
                                </Row>
                                <div className='review-button-search'
                                    
                                >
                                    <Button type='primary'>Submit</Button>
                                    <Button>Reset</Button>
                                </div>
                            </Content>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={22} offset={1}> 
                            <Content
                                style={{
                                borderRadius: '1.2rem',
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                margin: 0
                                }}
                            >
                                <Tabs
                                //   onChange={callback}
                                    type="card"
                                >
                                    <TabPane tab="List Product" key="1">
                                        <div className="table-responsive">
                                            <ListProduct/>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Pending" key="2">
                                        <div className="table-responsive">
                                            <ProductPending/>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="Scam" key="3">
                                        <div className="table-responsive">
                                            <ProductScam/>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </Content>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
        <ModalAddProduct
            isModalAddProduct={isModalAddProduct}
            setIsModalAddProduct={setIsModalAddProduct}
        />
    </div>
  )
}

export default Products
