import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import userReducer from '../features/user/userSlice'
import blogReducer from '../features/blogs/blogSlice';
import contactReducer from '../features/contact/contactSlice'
export const store = configureStore({
  reducer: {
    
    user:userReducer,
    product:productReducer,
    blog:blogReducer,
    contact:contactReducer,
  },
});
