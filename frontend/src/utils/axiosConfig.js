export const base_url='http://localhost:5000/api/'
const getTokenFromLocalStorage= localStorage.getItem('token');

export const config={
    headers:{
        Authorization:`Bearer ${localStorage?.getItem('token')}`,
        Accept:"application/json",  
    },
};