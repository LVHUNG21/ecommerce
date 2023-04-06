


import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllOrders } from '../../../../Backend/controller/useCtrl';
import { productService } from './productService';
// import thunk from "redux-thunk";
import { blogService } from './blogService';
export const getAllBlogs= createAsyncThunk(
    'blogs/get',
    async (thunkAPI) => {
        try {
            return blogService.getBlogs();
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
            
        }
    }
  )
export const getABlog= createAsyncThunk(
    'blog/get',
    async (id,thunkAPI) => {
        try {
            return blogService.getBlogs(id);
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
            
        }
    }
  )
const blogState={
        blog:'',
      isError:false,
      isSuccess:false,
      isLoading:false,
      message:''
}
export const blogSlice=createSlice({

    name:"blog"
    ,initialState:productState
    ,reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,state=>{
            state.isLoading=true;
       
    }).addCase(getAllBlogs.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blog=action.payload;

    })
    .addCase(getAllBlogs.rejected,(state,action)=>{
        state.isError=true;
        state.isLoading=false;
        state.isSuccess=false;
        state.message=action.error
    }).addCase(getABlog.pending,state=>{
        state.isLoading=true;
   
}).addCase(getABlog.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.singleblog=action.payload;

})
.addCase(getABlog.rejected,(state,action)=>{
    state.isError=true;
    state.isLoading=false;
    state.isSuccess=false;
    state.message=action.error
})
}
    
})
export default blogSlice.reducer;