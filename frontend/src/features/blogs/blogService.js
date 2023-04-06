
import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';
 
const getBlogs=async()=>{
    const respone=await axios.get(`${base_url}blog`);
    if(respone.data){
        return respone.data;    
    }
}
const getBlog=async(id)=>{
    const respone=await axios.get(`${base_url}blog/${id}`);
    if(respone.data){
        return respone.data;    
    }
}
export const blogService={
    getBlogs,getBlog
}