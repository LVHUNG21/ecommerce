import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';
 
const getProducts=async(data)=>{
    const respone=await axios.get(`${base_url}product?${data?.brand ? `brand=${data?.brand}&&` :"" }
    ${data?.tag ? `tags=${data?.tag}&&` :"" }
    ${data?.category? `category=${data?.category}&&` :"" }
    ${data?.minPrice? `price[gte]=${data?.minPrice}&&` :"" }
    ${data?.maxPrice? `price[gte]=${data?.maxPrice}&&` :"" }
    ${data?.sort? `sort=${data?.sort}&&` :"" }
    `);
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
const rateProduct=async(prodId)=>{
    const respone=await axios.put(`${base_url}product/rating`,data,config);
    if(respone.data){
        return respone.data;    
    }
}
export const productService={
    getSingleProduct,
getProducts,addToWishList
,rateProduct
}