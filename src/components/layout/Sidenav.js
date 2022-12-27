import React, { useState, useEffect, useContext } from 'react'
import { Menu, Tooltip } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import './styles/sidebar.scss'
import { get } from '../../api/products';
import { RightCircleOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { SignInContext } from './Main';

function Sidenav({ color, setVisible, profile, token, logout }) {
  const signContext = useContext(SignInContext)
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const [categories, setCategories] = useState()

  useEffect(() => {
    const getcategories = async() => {
      const categorie = await get('reviews/category/all')
      const categories = []
      Object.keys(categorie?.data?.categoriesDetail).forEach(function(categoryItem) {
        const newSub = []
        categorie?.data?.categoriesDetail[categoryItem]?.subCategories?.forEach((item) => {
          newSub.push({
            ...item,
            url: `filter/${item?.name?.toLowerCase()?.replace(/\s\//g, '-')}`,
            image: billing
          })
        })
        categories.push({
          ...categorie?.data?.categoriesDetail[categoryItem]?.category,
          image: dashboard,
          url: `filter/${categorie?.data?.categoriesDetail[categoryItem]?.category?.name?.toLowerCase()?.replace(/\s/g, '-')}`,
          children: newSub
        })
      })
      setCategories(categories)
    }
    getcategories()
  }, [])

  return (
    <div className='sidebar'>
      <Menu theme="light" mode="inline">
        {categories?.map((item, index) => (
          <React.Fragment key={index}>
            {!_.isEmpty(item?.children) ? (
              <Menu.SubMenu
                key={index}
                title={(
                    <NavLink
                      onClick={(e) => {
                        // e.stopPropagation()
                        // setVisible(false)
                      }}
                      to={{ pathname: item?.url }}
                      state={{ params: { category: item?.name, page: 1, subcategory: '' } }}
                      className='sidebar-submenu'
                    >
                      <span
                        className="icon"
                        style={{
                          background: page === item?.url ? color : "",
                        }}
                      >
                        {item?.image}
                      </span>
                      <span className="label">{item?.name}</span>
                    </NavLink>
                )}
              >
                {item?.children?.map((subItem, i) => (
                  <Menu.Item key={`sub ${i} ${subItem.id}`}> 
                    <NavLink
                      onClick={() => setVisible(false)}
                      to={{ pathname: subItem?.url }}
                      state={{ params: { subcategory: subItem?.name, page: 1, category: '' } }}
                      className='sidebar-menu-item'
                    >
                      <div className="sidebar-subcategory">
                        <div 
                          style={{
                            marginLeft: '35px',
                            marginRight: '1rem'
                          }}
                        >
                          <span className="label">{subItem?.name}</span>
                        </div>
                        <div className="number-menu">23</div>
                      </div>
                    </NavLink>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={index}>
                <NavLink
                  onClick={() => setVisible(false)}
                  to={item?.url}
                  state={{ params: { category: item?.name, page: 1, subcategory: '' } }}
                >
                  <span
                    className="icon"
                    style={{
                      background: page === item?.url ? color : "",
                    }}
                  >
                    {item?.image}
                  </span>
                  <span className="label">{item?.name}</span>
                </NavLink>
              </Menu.Item>
            )}
          </React.Fragment>
        ))}
      </Menu>
      {token ? (
        <div className='sidebar-account'>
          <span className='menu-header-account' style={{ display: 'flex', alignItems: 'center' }}>
            {profile}
            Le Thanh
          </span>
          <Tooltip content='Logout'>
            <RightCircleOutlined onClick={logout}/>
          </Tooltip>
        </div>
      ) : 
        <span className="btn-sign-in" onClick={() => signContext?.handleSetOpenModal(true)}>
          {profile}
          <span>Sign in</span>
        </span>
      }
    </div>
  );
}

export default Sidenav;
