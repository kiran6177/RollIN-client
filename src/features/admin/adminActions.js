import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminGetAllMoviesService, adminGetTheatresService, adminGetUsersService, approveTheatreService, blockUnblockTheatresService, blockUnblockUsersService, getMoviesService, loginAdminService, logoutAdminService } from "./adminService";

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

export const adminGetUsers = createAsyncThunk('adminGetUsers',async (token,thunkAPI) =>{
    try {
        const response = await adminGetUsersService(token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const blockUnblockUsers = createAsyncThunk('blockUnblockUsers', async ({userid,token},thunkAPI) =>{
    try {
        const response = await blockUnblockUsersService(userid,token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetTheatres = createAsyncThunk('adminGetTheatres',async (token,thunkAPI) =>{
    try {
        const response = await adminGetTheatresService(token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const blockUnblockTheatres = createAsyncThunk('blockUnblockTheatres', async ({theatreid,token},thunkAPI) =>{
    try {
        const response = await blockUnblockTheatresService(theatreid,token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const approveTheatre = createAsyncThunk('approveTheatre', async ({theatreid,token},thunkAPI) =>{
    try {
        const response = await approveTheatreService(theatreid,token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

