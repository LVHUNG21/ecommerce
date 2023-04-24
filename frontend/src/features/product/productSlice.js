
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { productService } from './productService';
// import thunk from "redux-thunk";
export const getAllProducts = createAsyncThunk(
    'product/get',
    async (data,thunkAPI) => {
        try {
            return productService.getProducts(data);

        } catch (error) {
            return thunkAPI.rejectWithValue(error)

        }
    }
)
export const getAProduct = createAsyncThunk(
    'product/getAProduct',
    async (id, thunkAPI) => {
        try {
            return productService.getSingleProduct(id);

        } catch (error) {
            return thunkAPI.rejectWithValue(error)

        }
    }
)
export const addToWishList = createAsyncThunk(
    'product/wishlist',
    async (prodId, thunkAPI) => {
        try {
            return productService.addToWishList(prodId);

        } catch (error) {
            return thunkAPI.rejectWithValue(error)

        }
    }
)
export const addRating = createAsyncThunk(
    'product/rating',
    async (data, thunkAPI) => {
        try {
            return productService.rateProduct(data);

        } catch (error) {
            return thunkAPI.rejectWithValue(error)

        }
    }
)
const productState = {
    product: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
export const productSlice = createSlice({

    name: "product"
    , initialState: productState
    , reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, state => {
            state.isLoading = true;

        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;

        })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error
            })
            .addCase(addToWishList.pending, state => {
                state.isLoading = true;

            }).addCase(addToWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addToWishList = action.payload;
                state.message = "Product added to wishlist!"

            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error
            })
            .addCase(getAProduct.pending, state => {
                state.isLoading = true;

            }).addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleproduct = action.payload;
                state.message = "Product fetch Successfully!"

            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error
                if (state.error) {
                    toast.error('get a product error')
                }
            })
              .addCase(addRating.pending, state => {
                state.isLoading = true;

            }).addCase(addRating.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.rating= action.payload;
                state.message = "Product fetch Successfully!"

            })
            .addCase(addRating.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error
                // if (state.error) {
                //     toast.error('get a product error')
                // }
            })
    }

})
export default productSlice.reducer;