import {Navigate} from 'react-router-dom';
export const PrivateRoutes=({children})=>{
    // const getTokenFromLocalStorage=localStorage.getItem("customer")
    // if(getTokenFromLocalStorage?.token!==null){
        return localStorage?.getItem('token') !== null ? children :(<Navigate to='/login' replace={true}/>)
    // }
}