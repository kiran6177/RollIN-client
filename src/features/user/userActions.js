import { createAsyncThunk } from '@reduxjs/toolkit';
import { googleUserAuthService , userEditEmailService, userEditProfileService, userEditResendService, userEmailLoginService, userGetNotificationsService, userLogoutService, userProfileVerifyOtpService, userResendOtpService, userVerifyOtpService} from './userService';
import { setUsersData } from './userSlice';

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

export const userEditProfile = createAsyncThunk('userEditProfile', async({data,token},thunkAPI)=>{
    try {
        const response = await userEditProfileService(data,token)
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userEditEmail = createAsyncThunk('userEditEmail', async({data,token},thunkAPI)=>{
    try {
        const response = await userEditEmailService(data,token)
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userEditResend = createAsyncThunk('userEditResend', async({data,token},thunkAPI)=>{
    try {
        const response = await userEditResendService(data,token)
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userProfileVerifyOtp = createAsyncThunk('userProfileVerifyOtp', async({data,token},thunkAPI)=>{
    try {
        const response = await userProfileVerifyOtpService(data,token)
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userGetNotifications = createAsyncThunk('userGetNotifications', async({data,token},thunkAPI)=>{
    try {
        const response = await userGetNotificationsService(data,token)
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

