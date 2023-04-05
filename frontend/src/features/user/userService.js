import axios from 'axios';
import { base_url } from '../../utils/axiosConfig';
 
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
const addToCart= async(cartData)=>{
    const respone=await axios.post(`${base_url}user/cart`,cartData,config);
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
    const respone=await axios.update(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,config);
    if(respone.data){
        return respone.data;    
    }
}
export const userService={
    updateProductFromCart,
    getCart,
    addToCart,
    register ,
    login,removeProductFromCart,
}