import React, { useEffect } from 'react'
import {BsArrowDownRight} from "react-icons/bs";
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import {useDispatch} from 'react-redux';
import { Button, Table } from 'antd';
import { useSelector } from 'react-redux';
import { getMonthWiseOrderCount } from '../../../Backend/controller/useCtrl';
import { getMonthlyData, getOrders, getYearlyData } from '../features/auth/authSlide';
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
      title: 'Product Count',
      dataIndex: 'product',
    },
    {
      title: 'Total Price',
      dataIndex: 'price',
    },
    {
      title: 'Total Price After Discount',
      dataIndex: 'dprice',
    },
    {
        title: 'Status',
        dataIndex: 'address',
      },
  ];

const Dashboard = () => {
  const dispatch=useDispatch();
const monthlyState =useSelector(state=>state?.auth?.monthlyData);
const yearlyState=useSelector(state=>state?.auth?.yearlyState);
const orderState=useSelector(state=>state?.auth?.orders?.orders)
const [orderData,setOrderData]=useState([]);
const [dataMonthly,setDataMonthly]=useState([]);
const [dataMonthlySales,setDataMonthlySales]=useState([]);

useEffect(()=>{
  dispatch(getMonthlyData());
  dispatch(getYearlyData());
  dispatch(getOrders());``
},[])
useEffect(()=>{
    let monthNames=["january","Feb","Mar","April","May","June","July","August","September","october","November","December"]
  let data=[];
  let monthlyOrderCount=[];
  for (let index = 0; index < monthlyState?.length; index++) {
    data.push({type:monthNames[element?._id?.month],income:element?.amount})
    monthlyOrderCount.push({type:monthNames[element?._id?.month],sales:element?.count})

    
  }
  setDataMonthly(dataMonthly)
  setDataMonthly(monthlyOrderCount)
    const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i,
      name: orderState[i].user.firstname + orderState[i]?.user.lastname,
      product:orderState[i].orderItems?.length,
      price:orderState[i].totalPrice,
      dprice:orderState[i].totalPriceAfterDiscount,
      status:orderState[i]?.orderStatus,

    });
  }
  setOrderData(data1);
},[orderState])


      const config = {
        data:dataMonthlySales,
        xField: 'type',
        yField: 'Income',
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
       const config2 = {
        data:dataMonthly,
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
            alias: 'Sales',
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
                        <p className='desc'>Total Income</p>
                        <h4 className="mb-0 sub-title">{yearlyState && yearlyState[0]?.amount}</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6><BsArrowDownRight/>32%</h6>
                        <p className="mb-0 desc ">Compare To April</p>
                    </div>
                </div>
                <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Total Sales</p>
                        <h4 className="mb-0 sub-title">$2100</h4>
                    </div>

                    <div className='d-flex flex-column align-items-end'>
                        <p className="mb-0 desc">Income lát year from today</p>
                    </div>
                </div>
                <div className='d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div>
                        <p className='desc'>Total</p>
                        <h4 className="mb-0 sub-title ">{yearlyState && yearlyState[0]?.count}</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <p className="mb-0 desc">Sales in Last Year from Tday </p>
                    </div>
                </div>
            </div>
           <div className='d-flex justify-content-between gap-3'>
             <div className="mt-4 flex-grow-1">
                <h3 className='mt-5'>
                    Income Statisc
                </h3>
                <div>
                <Column {...config} />;
                </div>
            </div>
             <div className="mt-4">
                <h3 className='mt-5'>
                    Sales Statisc
                </h3>
                <div>
                <Column {...config2} />;
                </div>
            </div>

           </div>
            <div className="mt-4">
                <h3 className="mb-5">
                    Recent Orders
                </h3>
                <div>
                <Table  columns={columns} dataSource={orderData} />  
                </div>
            </div>
        </div>
    )
}

export default Dashboard