import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import thunk from "redux-thunk";
import { userService } from "./userService";
export const resgisterUser = createAsyncThunk(
    'user/register',
    async (userData,thunkAPI) => {
        try {
            return userService.register(userData);
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
            
        }
    }
  )
  export const loginUser=createAsyncThunk('user/login' ,
  async (userData,thunkAPI) => {
    try {
        return userService.login(userData);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }
})
export const getUserProductWishlist=createAsyncThunk('user/wishlist',async(thunkAPI)=>{
    try {
       return await userService.getUserWishlist() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }


})
export const addProductToCart=createAsyncThunk('user/cart/add',  
  async (cartData,thunkAPI) => {
    try {
        return userService.addToCart(cartData);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }
})
export const getUserCart=createAsyncThunk('user/cart/get',  
  async (thunkAPI) => {
    try {
        return userService.getCart();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }
})
export const getOrders=createAsyncThunk('user/order/get',  
  async (thunkAPI) => {
    try {
        return userService.getUserOrders();
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }
})
export const deleteProductCart=createAsyncThunk('user/cart/product/delete',  
  async (id,thunkAPI) => {
    try {
        return userService.removeProductFromCart(id);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }
})
export const updateProductCart=createAsyncThunk('user/cart/product/update',  
  async (cartDetail,thunkAPI) => {
    try {
        return userService.updateProductFromCart(cartDetail);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }
})
export const updateProfile=createAsyncThunk('user/profile/update',  
  async (data,thunkAPI) => {
    try {
        return userService.updateProductFromCart(data);
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
        
    }
}
  
  
  )
  const getCustomerfromLocalStorage=localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')): null;
  const initialState={
      user:getCustomerfromLocalStorage,
      isError:false,
      isSuccess:false,
      isLoading:false,
      message:''
  }
export const userSlice=createSlice({
    name:"user"
    ,initialState
    ,reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(resgisterUser.pending,state=>{
            state.isLoading=true;
        }).addCase(resgisterUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdUser=action.payload;
            console.log(state.isSuccess);
            if(state.isSuccess===true){
                toast.info('User Create Successfully')
            }
        }).addCase(resgisterUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
            toast.error(action.error);
            }
        })
        .addCase(loginUser.pending,state=>{
            state.isLoading=true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user=action.payload

            if(state.isSuccess===true){
            localStorage.setItem('token',action.payload.token)
console.log(`token${localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null}`);
                toast.info('User Login Successfully')
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
            toast.error(action.error);
            }
        }) .addCase(addProductToCart.pending,state=>{
            state.isLoading=true;
        }).addCase(addProductToCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProduct=action.payload;
            // localStorage.setItem('token',action.payload.token)

            // console.log(state.isSuccess);

            if(state.isSuccess===true){
                toast.info('Product Added to Cart')
            
            }
        }).addCase(addProductToCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            // if(state.isError===true){
            // toast.error(action.error);
            // }
        })
        .addCase(getUserCart.pending,state=>{
            state.isLoading=true;
        }).addCase(getUserCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProducts=action.payload;
            // localStorage.setItem('token',action.payload.token)

            // console.log(state.isSuccess);

            // if(state.isSuccess===true){
            //     toast.info('get user cart successfull')
            
            // }
        }).addCase(getUserCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            // if(state.isError===true){
            // toast.error(action.error);
            // toast.error('get user card error')
            // }
        }) .addCase(deleteProductCart.pending,state=>{
            state.isLoading=true;
        }).addCase(deleteProductCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedCartProduct=action.payload;
            // localStorage.setItem('token',action.payload.token)

            // console.log(state.isSuccess);

            if(state.isSuccess===true){
                toast.info('Product delete from Cart successfully!')
            }
        }).addCase(deleteProductCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
            toast.error('Some thing went wrong!');
            }
        })
         .addCase(updateProductCart.pending,state=>{
            state.isLoading=true;
        }).addCase(updateProductCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedCartProduct=action.payload;
            // localStorage.setItem('token',action.payload.token)

            // console.log(state.isSuccess);

            if(state.isSuccess===true){
                toast.info('Product Update from Cart successfully!')
            }
        }).addCase(updateProductCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
            toast.error('Some thing went wrong! Update');
            }
        })
        .addCase(getUserProductWishlist.pending,state=>{
            state.isLoading=true;
        }).addCase(getUserProductWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
        state.wishlist=action.payload;
            localStorage.setItem('token',action.payload.token)

            console.log(state.isSuccess);

            if(state.isSuccess===true){
                toast.info('User Login Successfully')
            }
        }).addCase(getUserProductWishlist.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
            toast.error(action.error);
            }
        })
        .addCase(getOrders.pending,state=>{
            state.isLoading=true;
        }).addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
        state.getorderedproduct=action.payload;
            // localStorage.setItem('token',action.payload.token)

            // console.log(state.isSuccess);

            // if(state.isSuccess===true){
            //     toast.info('User Login Successfully')
            // }
        }).addCase(getOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
            toast.error(action.error);
            }
        })
        .addCase(updateProfile.pending,state=>{
            state.isLoading=true;
        }).addCase(updateProfile.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
        state.updatedProfile=action.payload;
            // localStorage.setItem('token',action.payload.token)

            // console.log(state.isSuccess);

            if(state.isSuccess===true){
                toast.info('update successfully')
            }
        }).addCase(updateProfile.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
            toast.error(action.error);
            }
        })


    }
    
})
export default userSlice.reducer;