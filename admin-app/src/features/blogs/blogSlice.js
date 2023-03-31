import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import blogService from  './blogService'; 
// import getProducts from "../features/product/productService";
export const getBlog=createAsyncThunk('blog/get-blogs',async(thunkAPI)=>{
    try{
        return await blogService.getBlogs();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});
export const createBlog=createAsyncThunk('blog/create-blog',
async(blogData,thunkAPI)=>{
    try {
        return await blogService.createBlog(blogData);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})
export const resetState=createAction("Reset_all");
const initialState={
    blogs:[],
      isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
};
export const blogSlice=createSlice({
    name:'blogs',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=false;
            state.blogs=action.payload;
        }).addCase(getBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(createBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=false;
            state.createdBlog=action.payload;
        }).addCase(createBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(resetState,()=>initialState)

    },
})
export default blogSlice.reducer;