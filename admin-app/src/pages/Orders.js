

import React, { useEffect } from 'react'
import {BiEdit} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai';
import {Table} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import {getOrders, updateOrder} from "../features/auth/authSlide"
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
      title:'Amount',
      dataIndex:'amount',
    },
    {
      title:'Date',
      dataIndex:'date',
    },
    {
        title: 'Action',
        dataIndex: 'action',
      },
  ]; 
const Orders= () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getOrders());
  },[]);
  const orderState=useSelector((state)=>state.auth.orders.orders);
  // console.log(orderState[3].orderby.firstname);
  console.log(orderState.length);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i+1,
      name: orderState[i]?.user?.firstname,
      product:<Link to={`/admin/order/${orderState[i]._id}`}>
          View Orders
      </Link>,
      amount:orderState[i]?.totalPrice,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action:(<>
      <select name='' id='' defaultValue={orderState[i]?.orderStatus} onChange={()=>{
        updateOrderStatus(orderState[i]?._id,e.target.value);
      }} className='form-control form-select'>
        <option value='Ordered' disabled selected>Order</option>
        <option value='Processed'>Processed</option>
        <option value='Shipper'>Shipper</option>
        <option value='Out For Delivery'>Our for Delivery</option>
        <option value='Out For Delivery'> Out For Delivery</option>

      </select>
      </>)
    });}
const updateOrderStatus=(a,b)=>{
  dispatch(updateOrder({id:a,status:b}));
}
  return (
    <div>
    <h3 className="mb-4 title">Orders</h3>
    <div>
    <Table columns={columns} dataSource={data1} />
    </div>
</div>
  )
}

export default Orders 