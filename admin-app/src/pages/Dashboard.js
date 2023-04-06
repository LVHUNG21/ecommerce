import React from 'react'
import {BsArrowDownRight} from "react-icons/bs";
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { Button, Table } from 'antd';
const columns = [
    {
      title: 'Sno',
      dataIndex: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'address',
      },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
const Dashboard = () => {
    const data = [
        {
          type: 'Jan',
          sales: 38,
        },
        {
          type: 'Feb',
          sales: 52,
        },
        {
          type: 'Mar',
          sales: 61,
        },
        {
          type: 'Apr',
          sales: 145,
        },
        {
          type: 'Five',
          sales: 48,
        },
        {
          type: 'Jun',
          sales: 38,
        },
        {
          type: 'Aug',
          sales: 38,
        },
        {
          type: 'Sep',
          sales: 38,
        },
        {
          type: 'Oct',
          sales: 38,
        },
        {
          type: 'Nov',
          sales: 38,
        },
        {
          type: 'Dec',
          sales: 38,
        },
      ];
      const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle',
          // 'top', 'bottom', 'middle',
          // 配置样式
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: 'Month',
          },
          sales: {
            alias: 'Income',
          },
        },
      };
      console.log(`token${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null}`);

    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex justify-content-between align-items-center gap-3">
                <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Total</p>
                        <h4 className="mb-0 sub-title">$2100</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6><BsArrowDownRight/>32%</h6>
                        <p className="mb-0 desc ">Compare To April</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Total</p>
                        <h4 className="mb-0 sub-title">$2100</h4>
                    </div>

                    <div className='d-flex flex-column align-items-end'>
                        <h6 className="red"><BsArrowDownRight/>32%</h6>
                        <p className="mb-0 desc">Compare To April</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Total</p>
                        <h4 className="mb-0 sub-title ">$2100</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6 className="green"><BsArrowDownRight/>32%</h6>
                        <p className="mb-0 desc">Compare To April</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className='mt-5'>
                    Income Statisc
                </h3>
                <div>
                <Column {...config} />;
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-5">
                    Recent Orders
                </h3>
                <div>
                <Table  columns={columns} dataSource={data1} />  
                </div>
            </div>
        </div>
    )
}

export default Dashboard