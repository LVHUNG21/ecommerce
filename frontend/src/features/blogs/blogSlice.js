
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllOrders } from '../../../../Backend/controller/useCtrl';
import { blogService } from './productService';
// import thunk from "redux-thunk";
import { userService } from "./userService";
export const getAllBlogs= createAsyncThunk(
    'blog/get',
    async (thunkAPI) => {
        try {
            return blogService.getBlogs();
            
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
    ,initialState:blogState
    ,reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBlogs.pending,state=>{
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
    })


}
    
})
export default blogSlice.reducer;