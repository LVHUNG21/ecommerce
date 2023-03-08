import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io"
import { ImBlog } from "react-icons/im";
import { BiCategoryAlt } from 'react-icons/bi';
import { SiBrandfolder } from 'react-icons/si';
import { FaClipboardList, FaBloggerB } from 'react-icons/fa';
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlinePicLeft, AiOutlineUser, AiOutlineBgColors } from 'react-icons/ai';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <span className="sm-logo">LVH</span>
          <span className='lg-logo text-white fs-5 text-center py-3 mb-0'>
            ADMIN
          </span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == 'signout') {

            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className="fs-4" />,
              label: 'Dashboard',
            },
            {
              key: 'Customers',
              icon: <AiOutlineUser className="fs-4" />,
              label: 'Customers',
            },
            {
              key: 'Catalog',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Add Product',
                },
                {
                  key: 'list-product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Product',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className='fs-4' />,
                  label: "Brand List",
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-category  ",
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: "Category List"
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "list-color ",
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: "Category List"
                },
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Orders',
            },
            {
              key: 'blog',
              icon: <FaBloggerB className="fs-4" />,
              label: 'Blogs',
              chidlren: [
                {
                  key: 'blog',
                  icon: <ImBlog className="fs-4" />,
                  label: 'Add Blogs',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB className="fs-4" />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog className="fs-4" />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB className="fs-4" />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className='d-flex justify-content-between px-3 ps-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div className="d-flex gap-4 align-items-center">
            <div className='position-relative'>
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">3</span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown "  >
              <div>
                <img width={32} height={32} src="https://file.hstatic.net/200000104537/file/meo_1_7e0b7d4b748946c68883ca7a49f9c07e_grande.jpg" alt="">
                </img>
              </div>
              <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                <div className="mb-0"><h5 className='mb-0'>
                  HUNGd
                </h5>
                  <p className="mb-0">Hung@gmail.com</p>
                </div>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><Link className="dropdown-item py-1 mb-1 " style={{height:"auto",lineHeight:"20px"}} to="#">View Profile</Link></li>
                  <li><Link className="dropdown-item py-1 mb-1 " style={{height:"auto",lineHeight:"20px"}} to="#">SignOut</Link></li>
                  

                </div>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout 