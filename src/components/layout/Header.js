import { useState, useEffect, useContext } from "react";
import { Row, Col, Input, Typography, Image, Popover, Spin, Form, Empty, Button, Drawer } from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { getCookie, removeCookie, STORAGEKEY } from "../../utils/storage";
import { NavLink, useNavigate } from "react-router-dom";
import nodata from '../../assets/images/nodata.png'
import { get } from "../../api/search";
import _ from "lodash";

import chatbox from '../../assets/images/chatbox.png'
import gear5 from '../../assets/images/gear5.png'
import logo from "../../assets/images/logo.png";
import title from "../../assets/images/title.png";
import { SignInContext } from "./Main";
import Signin from "../modal/Signin";
import Sidenav from "./Sidenav";

import './styles/header.scss'

const { Title } = Typography
const profile = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
    ></path>
  </svg>,
];

const Header = ({ placement, handleSidenavColor, handleSidenavType, handleFixedNavbar, sidenavType, sidenavColor }) => {
  const signContext = useContext(SignInContext)
  const DEFAULT_TYPE = 'product'
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false);
  const [dataSearch, setDataSearch] = useState({
    data: [],
    loading: false,
    status: '',
    isActive: false
  })
  const [form] = Form.useForm()
  useEffect(() => window.scrollTo(0, 0));

  const token = Boolean(getCookie(STORAGEKEY.ACCESS_TOKEN))

  const logout = async() => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN)
    await removeCookie(STORAGEKEY.USER_INFO)
    setVisible(false)
    // await post('reviews/signout')
    navigate('/')
  }

  const handleDetailProduct = (item) => {
    console.log(item)
    navigate(`../../products/${item?.id}`)
  }

  const handleSubmitSearch = (e) => {
    if (e.key === 'Enter') {
      if (dataSearch?.data.length > 1) {
        navigate('../../../filter', { state: { dataSearch: dataSearch?.data }})
        setDataSearch({ data: [], isActive: false, status: '', loading: false })
        form.resetFields()
      } else {
        navigate(`../../../products/${dataSearch[0]?.id}`)
        form.resetFields()
      }
    }
  }

  const handleChangeWithDebounce = _.debounce(async (e) => {
    setDataSearch({
      ...dataSearch,
      loading: true,
      isActive: true
    })
    const params = {
      type: DEFAULT_TYPE,
      keyword: e.target.value
    }
    const search = await get('search/suggest', params)
    if (search) {
      const listDataSearch = []
      search?.data?.products?.forEach((item) => {
        const parts = [];
        parts.push(item?.id.slice(0,8));
        parts.push(item?.id.slice(8,12));
        parts.push(item?.id.slice(12,16));
        parts.push(item?.id.slice(16,20));
        parts.push(item?.id.slice(20,32));
        const GUID = parts.join('-'); 
        listDataSearch.push({
          ...item,
          id: GUID
        })
      })
      setDataSearch({
        loading: false,
        data: listDataSearch,
        status: 'done',
        isActive: true
      })
    }
  }, 250)

  return (
    <>
      <div className="setting-drwer" onClick={() => setVisible(!visible)}>
        <Image src={chatbox} preview={false}/>
      </div>
      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="header-control header">
          <div className="header-item">
            <Row>
              <Col xxl={{span:8}} sm={{span:0}}></Col>
              <Col xxl={{span:16}} sm={{span:24}} xs={{ span: 24 }}>
                <NavLink className="brand" to=''>
                  {/* <Image src={logo} preview={false} style={{ marginRight: '1rem' }}/> */}
                  {/* <Image src={title} preview={false} /> */}
                  <Image src={gear5} preview={false} />
                </NavLink>
              </Col>
            </Row>
          </div>
          <div className="header-item">
            <Form form={form}>
              <Form.Item name='keyword'>
                <Input
                  className="header-search"
                  placeholder="Search Projects, Tokens"
                  prefix={<SearchOutlined />}
                  onChange={handleChangeWithDebounce}
                  onKeyPress={handleSubmitSearch}
                  // onBlur={() => {
                  //   setDataSearch({ isActive: false, data: [], loading: false, status: '' })
                  //   form.resetFields()
                  // }}
                />
              </Form.Item>
            </Form>
            <div className={`header-item-form-data ${dataSearch?.isActive ? 'active' : ''}`}>
              {dataSearch?.loading ? (
                <>
                  <Spin size="large" />
                </>
              ) : (
                <>
                  {dataSearch?.status === 'done' && (
                    <>
                      {dataSearch?.data ? (
                        <>
                          {dataSearch?.data?.map((item, index) => (
                            <div
                              key={index}
                              className='header-item-form-data-item'
                              onClick={() => {
                                handleDetailProduct(item)
                                setDataSearch({ isActive: false, data: [], loading: false, status: '' })
                                form.resetFields()
                              }}
                            >
                                <div className='header-item-form-data-item-data'>
                                  {item?.image ? (
                                    <Image src={item?.image} preview={false}/>
                                  ) : (
                                    <span className='table-icon-coin-logo'>
                                        {item?.name?.slice(0, 3)?.toUpperCase()}
                                    </span>
                                  )}
                                  {item?.name}
                                </div>
                                {item?.category && (
                                  <div className='header-item-form-data-item-category'>
                                    {item?.category}
                                  </div>
                                )}
                            </div>
                          ))}
                        </>
                      ) : (
                        <Empty
                          image={nodata}
                          description={
                            <span>
                              <span style={{ fontSize: '1.8em', color: 'red', fontWeight: 600 }}>SORRY </span>
                              <span style={{ fontSize: '1.6rem', color: 'rgba(0, 0, 0, 0.6)', fontWeight: '600' }}>NO DATA FOUND</span>
                            </span>
                          }
                        />
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="header-item">
            <Row>
              <Col xxl={{span:16}} sm={{span:24}}>
                <div className="header-item-right">
                  <Button type="link" className='header-item-right-menu' onClick={() => setVisible(true)}>
                    <UnorderedListOutlined/>
                  </Button>
                  {token ? (
                    <Popover
                      placement='bottomRight'
                      content={(<>
                        <Typography
                          variant='subtitle1'
                          onClick={logout}
                          className='header__link'
                          style={{ cursor: 'pointer' }}
                        >
                          Logout
                        </Typography>
                      </>)}
                      trigger='click'
                      overlayClassName='menu-header-user-info-popover'
                    >
                      <Typography
                        component='span'
                        variant='subtitle1'
                        fontWeight='bold'
                        style={{ cursor: 'pointer' }}
                      >
                        <span className='menu-header-account'>
                          {profile}
                          <span className='menu-header-account-name'>Le Thanh</span>
                        </span>
                      </Typography>
                    </Popover>
                  ) : 
                    <span className="btn-sign-in" onClick={() => signContext?.handleSetOpenModal(true)}>
                      {profile}
                      <span>Sign in</span>
                    </span>
                  }
                  <Drawer
                    className="settings-drawer"
                    mask={true}
                    width={360}
                    onClose={() => setVisible(false)}
                    placement={placement}
                    visible={visible}
                  >
                    <div layout="vertical">
                      <div className="header-top">
                        <Title level={4}>
                          Category
                        </Title>
                      </div>
                      <div className="content-item menu-resize">
                        <Sidenav
                          color={sidenavColor}
                          setVisible={setVisible}
                          profile={profile}
                          token={token}
                          logout={logout}
                        />
                      </div>
                    </div>
                  </Drawer>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Signin
          openModalSignin={signContext?.openModalSignIn}
        />
      </Row>
    </>
  );
}

export default Header;
