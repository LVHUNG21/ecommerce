import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';
 
const getProducts=async()=>{
    const respone=await axios.get(`${base_url}product`);
    if(respone.data){
        return respone.data;    
    }
}
const getSingleProduct=async(id)=>{
    const respone=await axios.get(`${base_url}product/${id}`);
    if(respone.data){
        return respone.data;    
    }
}
const addToWishList=async(prodId)=>{
    const respone=await axios.put(`${base_url}product/wishlist`,{prodId},config);
    if(respone.data){
        return respone.data;    
    }
}
export const productService={
    getSingleProduct,
getProducts,addToWishList
}