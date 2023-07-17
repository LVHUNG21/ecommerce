
import {Navigate} from 'react-router-dom';
export const OpenRoutes=({children})=>{
    // const getTokenFromLocalStorage=localStorage.getItem("customer")
    // console.log(`gettokenfr:${getTokenFromLocalStorage}`);
    console.log(`tokennn:${localStorage?.getItem('token')}`)
    // if(getTokenFromLocalStorage?.token!==null){
        return localStorage?.getItem('token') === null? children :(<Navigate to='/' replace={true}></Navigate>)
    // }
}