import './App.css';
import React,{useState} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import MainLayout from './component/MainLayout';
import Login from './pages/Login';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customer';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addblog from './pages/Addblog';
import Addblogcat from './pages/Addblogcat';
import Addcolor from './pages/Addcolor';
import Addcat from './pages/Addcat';
import AddBrand from './pages/AddBrand';
import Addproduct from './pages/AddProduct';
import Couponlist from './pages/Couponlist';
import AddCoupon from './pages/AddCoupon';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';
import { PrivateRoutes } from './routing/privateRountes';
import { OpenRoutes } from './routing/openRoutes';
function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<OpenRoutes>
        <Login/> 
        </OpenRoutes>}/>
      <Route path='/admin' element={<PrivateRoutes><MainLayout/></PrivateRoutes>}>
        <Route index element={<Dashboard/>}/>
        <Route path='enquiries'element={<Enquiries/>}/>
        <Route path='enquiries/:id'element={<ViewEnq/>}/>
        <Route path='blog-list'element={<Bloglist/>}/>
        <Route path='blog'element={<Addblog/>}/>
        <Route path='blog/:id'element={<Addblog/>}/>
        <Route path='coupon-list'element={<Couponlist/>}/>
        <Route path='coupon'element={<AddCoupon/>}/>
        <Route path='blog-category-list'element={<Blogcatlist/>}/>
        <Route path='orders' element={<Orders/>}/>
        <Route path='order/:id' element={<ViewOrder/>}/>
        <Route path='list-color'element={<Colorlist/>}/>
        <Route path='color'element={<Addcolor/>}/>
        <Route path='customers'element={<Customers/>}/>
        <Route path='blog-category'element={<Addblogcat/>}/>
        <Route path='list-category'element={<Categorylist/>}/>
        <Route path='category'element={<Addcat/>}/>
        <Route path='category/:id'element={<Addcat/>}/>
        <Route path='list-brand'element={<Brandlist/>}/>
        <Route path='brand'element={<AddBrand/>}/>
        <Route path='brand/:id'element={<AddBrand/>}/>
        <Route path='list-product'element={<Productlist/>}/>
        <Route path='product'element={<Addproduct/>}/>
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
