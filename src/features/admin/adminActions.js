import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminGetAllMoviesService, adminGetHighMoviesService, adminGetRecentMoviesService, adminGetRegistrationDetailsService, adminGetTheatresService, adminGetUsersService, approveTheatreService, blockUnblockTheatresService, blockUnblockUsersService, getMoviesService, loginAdminService, logoutAdminService } from "./adminService";
import { setAdminsData } from "./adminSlice";

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
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetUsers = createAsyncThunk('adminGetUsers',async (token,thunkAPI) =>{
    try {
        const response = await adminGetUsersService(token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const blockUnblockUsers = createAsyncThunk('blockUnblockUsers', async ({userid,token},thunkAPI) =>{
    try {
        const response = await blockUnblockUsersService(userid,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetTheatres = createAsyncThunk('adminGetTheatres',async (token,thunkAPI) =>{
    try {
        const response = await adminGetTheatresService(token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const blockUnblockTheatres = createAsyncThunk('blockUnblockTheatres', async ({theatreid,token},thunkAPI) =>{
    try {
        const response = await blockUnblockTheatresService(theatreid,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const approveTheatre = createAsyncThunk('approveTheatre', async ({theatreid,token},thunkAPI) =>{
    try {
        const response = await approveTheatreService(theatreid,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetHighMovies = createAsyncThunk('adminGetHighMovies', async ({token},thunkAPI) =>{
    try {
        const response = await adminGetHighMoviesService(token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetRegistrationDetails = createAsyncThunk('adminGetRegistrationDetails', async ({data,token},thunkAPI) =>{
    try {
        const response = await adminGetRegistrationDetailsService(data,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetRecentMovies = createAsyncThunk('adminGetRecentMovies', async ({token},thunkAPI) =>{
    try {
        const response = await adminGetRecentMoviesService(token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})