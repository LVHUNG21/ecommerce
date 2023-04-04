
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllOrders } from '../../../../Backend/controller/useCtrl';
import { productService } from './productService';
// import thunk from "redux-thunk";
import { userService } from "./userService";
export const getAllProducts= createAsyncThunk(
    'product/get',
    async (thunkAPI) => {
        try {
            return productService.getProducts();
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
            
        }
    }
  )
  export const addToWishList= createAsyncThunk(
    'product/wishlist',
    async (prodId,thunkAPI) => {
        try {
            return productService.addToWishList(prodId);
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
            
        }
    }
  ) 
const productState={
        product:'',
      isError:false,
      isSuccess:false,
      isLoading:false,
      message:''
}
export const productSlice=createSlice({

    name:"product"
    ,initialState:productState
    ,reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,state=>{
            state.isLoading=true;
       
    }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product=action.payload;

    })
    .addCase(getAllProducts.rejected,(state,action)=>{
        state.isError=true;
        state.isLoading=false;
        state.isSuccess=false;
        state.message=action.error
    })
    .addCase(addToWishList.pending,state=>{
        state.isLoading=true;
   
}).addCase(addToWishList.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.addToWishList=action.payload;
        state.message="Product added to wishlist!"

})
.addCase(addToWishList.rejected,(state,action)=>{
    state.isError=true;
    state.isLoading=false;
    state.isSuccess=false;
    state.message=action.error
})

}
    
})
export default productSlice.reducer;