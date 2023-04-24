import axios from "axios"
import { base_url } from "../../untils/base_url"
const getTokenFromLocalStorage=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const config={
    headers:{
        Authorization:`Bearer ${getTokenFromLocalStorage?.token}`,
        Accept:"application/json",
    },
}
const login=async(userData) =>{
    const response=await axios.post(`${base_url}user/admin-login`,userData);
if(response.data){
    localStorage.setItem('user',JSON.stringify(response.data))
}
return response.data;
}
const getOrders=async() =>{
    const response=await axios.get(`${base_url}user/getallorders`,config);

// if(response.data){
//     localStorage.setItem('user',JSON.stringify(response.data))
// }
return response.data;
}
const getOrder=async(id) =>{
    const response=await axios.get(`${base_url}user/getaOrder/${id}`,config);

// if(response.data){
//     localStorage.setItem('user',JSON.stringify(response.data))
// }
return response.data;
}
const updateOrder=async(data) =>{
    const response=await axios.put(`${base_url}user/updateOrder/${data.id}`,{status:data.status},config);

// if(response.data){
//     localStorage.setItem('user',JSON.stringify(response.data))
// }
return response.data;
}
const getMonthlyOrders =async(id) =>{
    const response=await axios.post(`${base_url}/getMonthWiseOrderIncome/${id}`,"",config);

// if(response.data){
//     localStorage.setItem('user',JSON.stringify(response.data))
// }
return response.data;
}
const getYearlyStats=async(id) =>{
    const response=await axios.post(`${base_url}/getMonthWiseOrderIncome/${id}`,"",config);

// if(response.data){
//     localStorage.setItem('user',JSON.stringify(response.data))
// }
return response.data;
}
const authService={
    login,getOrders,getMonthlyOrders
    ,getOrder,getYearlyStats,updateOrder
}
export default authService;