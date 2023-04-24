import {Navigate} from 'react-router-dom';
export const PrivateRoutes=({children})=>{
    const getTokenFromLocalStorage=JSON.parse(localStorage.getItem("user"))
    if(getTokenFromLocalStorage.token!==null){
        return getTokenFromLocalStorage.token!==undefined? children :(<Navigate to='/admin' replace={true}></Navigate>)
    }
}