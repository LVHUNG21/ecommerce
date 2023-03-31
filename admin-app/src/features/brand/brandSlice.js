import { createSlice,createAsyncThunk ,createAction} from "@reduxjs/toolkit";
import brandService from  './brandService'; 
export const getBrands=createAsyncThunk('brand/get-brands',async(thunkAPI)=>{
    try{
        return await brandService.getBrands();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});
export const getABrand=createAsyncThunk('brand/get-brand',async(thunkAPI)=>{
    try{
        return await brandService.getBrand(id);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
});
export const createBrands=createAsyncThunk('brand/create-brand',
async(brandData,thunkAPI)=>{
    try {
        return await brandService.createBrands(brandData);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})
export const updateBrands=createAsyncThunk('brand/update-brand',
async(brandData,thunkAPI)=>{
    try {
        return await brandService.updateBrands(brandData);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})
export const resetState=createAction("Reset_all");
const initialState={
    brands:[],
      isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
};
export const brandSlice=createSlice({
    name:'brands',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBrands.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBrands.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=false;
            state.brands=action.payload;
        }).addCase(getBrands.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(createBrands.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createBrands.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdBrands=action.payload;
        }).addCase(createBrands.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        }).addCase(getABrand.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getABrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.brandName=action.payload.title;
        }).addCase(getABrand.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
       .addCase(updateBrands.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateBrands.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedBrand=action.payload.title;
        }).addCase(updateBrands.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(resetState,()=>initialState)

    },
})
export default brandSlice.reducer;