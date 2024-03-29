import axios from 'axios';
import { base_url } from '../../utils/axiosConfig';
import { config } from '../../utils/axiosConfig';
 
const register=async(userData)=>{
    const respone=await axios.post(`${base_url}user/register`,userData);
    if(respone.data){
        if(respone.data){
            localStorage.setItem('customer',JSON.stringify(respone.data))
        }
        return respone.data;    
    }
}
const login=async(userData)=>{
    const respone=await axios.post(`${base_url}user/login`,userData);
    if(respone.data){
        return respone.data;    
    }
}
const forgotPasswordToken= async(data)=>{
    const respone=await axios.post(`${base_url}user/forgot-password-token`,data)
    if(respone.data){
        return respone.data;    
    }

}
const resetPassword= async(data)=>{
    const respone=await axios.post(`${base_url}user/reset-password/${data.token}`,{password:data?.password})
    if(respone.data){
        return respone.data;    
    }

}
const addToCart= async(cartData)=>{
    const respone=await axios.post(`${base_url}user/cart`,cartData,config);
    if(respone.data){
        return respone.data;    
    }

}
const getUserWishlist=async()=>{
    const respone=await axios.get(`${base_url}user/wishlist`,config);

    if(respone.data){
        return respone.data;    
    }
}
const getCart= async()=>{
    const respone=await axios.get(`${base_url}user/cart`,config);
    if(respone.data){
        return respone.data;    
    }
}
const removeProductFromCart= async(cartItemId)=>{
    const respone=await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`,config);
    if(respone.data){
        return respone.data;    
    }
}
const updateProductFromCart= async(cartDetail)=>{
    const respone=await axios.put(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,config);
    if(respone.data){
        return respone.data;    
    }
}
//create order


const getUserOrders =async()=>{
    const response=await axios.get(`${base_url}user/getmyorders`,config)
    if(response.data){
        return response.data;
    }
}
const updateUser =async(data)=>{
    const response=await axios.put(`${base_url}user/edit-user`,data,config)
    if(response.data){
        return response.data;
    }

}
const createOrder=async(orderDetail)=>{
    const response=await axios.post(`${base_url}user/cart/create-order`,orderDetail,config)
    if(response.data){
        return response.data;
    }

}
export const userService={
    getUserOrders,
updateProductFromCart,getUserWishlist,
    getCart,
    addToCart,
    register ,
    createOrder,
    login,removeProductFromCart,
    forgotPasswordToken,
    updateUser,resetPassword
}