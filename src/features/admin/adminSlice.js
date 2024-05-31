import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAdminService, logoutAdminService } from "./adminService";

export const adminLogin = createAsyncThunk('adminLogin',async({email,password},thunkAPI)=>{
    try {
        const response = await loginAdminService({email,password}) 
        return response.data;
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminLogout = createAsyncThunk('adminLogout',async (token,thunkAPI)=>{
    try {
        const response = await logoutAdminService(token);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

const initialState = {
    adminData: null,
    adminToken:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        resetAdminActions:(state)=>{
            state.error = ''
            state.loading = false
            state.message = ''
            state.success = ''
        },
        logoutAdmin:(state)=>{
            state.adminData = null
            state.adminToken = null
            state.success = false
            state.error = ''
            state.loading = false
            state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.loading = false
            state.adminData = action.payload.data
            state.adminToken = action.payload.accessToken
            state.success = true
            state.message = 'Login Successfully.'
        })
        .addCase(adminLogin.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.reasons
        })
        .addCase(adminLogout.fulfilled,(state,action)=>{
            console.log(action);
            state.message = action.payload.message
            state.loading = false
        })
        .addCase(adminLogout.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminLogout.rejected,(state,action)=>{
            state.error = action.payload.reasons
            state.loading = false
        })
    }

})

export const { resetAdminActions , logoutAdmin } = adminSlice.actions

export default adminSlice.reducer