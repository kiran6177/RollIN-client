import { createAsyncThunk } from '@reduxjs/toolkit';
import { googleUserAuthService , userEmailLoginService, userLogoutService, userResendOtpService, userVerifyOtpService} from './userService';

export const googleAuth = createAsyncThunk('userGoogleAuth',async (tokenResponse,thunkAPI)=>{
    try {
        console.log(tokenResponse);
        const response = await googleUserAuthService(tokenResponse.access_token)
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userLogout = createAsyncThunk('userLogout', async(token,thunkAPI)=>{
    try {
        const response = await userLogoutService(token)
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userEmailLogin = createAsyncThunk('userEmailLogin', async (email,thunkAPI) =>{
    try {
        const response = await userEmailLoginService(email);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userVerifyOtp = createAsyncThunk('userVerifyOtp', async ({id,otp},thunkAPI)=>{
    try {
        const response = await userVerifyOtpService(id,otp)
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userResendOtp = createAsyncThunk('userResendOtp', async (id,thunkAPI) =>{
    try {
        const response =  await userResendOtpService(id);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

