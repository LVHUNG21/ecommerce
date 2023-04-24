import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const getUserfromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;


const userDefaultState = {
    _id: null,
    firstname: null,
    lastname: null,
    email: null,
    mobile: null,
    token: null,
}

const initialState = {
    user: getUserfromLocalStorage,
    orders: [],
    orderbyuser: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const login = createAsyncThunk('auth/admin-login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getOrders = createAsyncThunk('order/get-orders', async (thunkAPI) => {
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getOrder = createAsyncThunk('order/get-order', async (id, thunkAPI) => {
    try {
        return await authService.getOrder(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateOrder = createAsyncThunk('order/update-order', async (data, thunkAPI) => {
    try {
        return await authService.updateOrder(data);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getMonthlyData = createAsyncThunk('orders/monthlydata', async (thunkAPI) => {
    try {
        return await authService.getMonthlyOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getYearlyData = createAsyncThunk('orders/yearlydata', async (thunkAPI) => {
    try {
        return await authService.getYearlyStats();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const authSlide = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.isLoading = true;
        })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            })
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
            }).addCase(getOrder.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.singleorder= action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.user=null;
                state.isLoading = false;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            }).addCase(getOrders.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.user=null;
                state.isLoading = false;
            }).addCase(getMonthlyData.pending, (state) => {
                state.isLoading = true;
            }).addCase(getMonthlyData.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
            })
            .addCase(getMonthlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.user=null;
                state.isLoading = false;
            })
            .addCase(getYearlyData.pending, (state) => {
                state.isLoading = true;
            }).addCase(getYearlyData.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
            })
            .addCase(getYearlyData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.user=null;
                state.isLoading = false;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            }).addCase(updateOrder.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updatedOrder= action.payload;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.user=null;
                state.isLoading = false;
            })
    },
})
export default authSlide.reducer;