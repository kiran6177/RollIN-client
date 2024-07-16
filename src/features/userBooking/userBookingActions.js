import { createAsyncThunk } from "@reduxjs/toolkit";
import { userGetShowDataByMovieService, userGetShowDataService, userGetSingleShowDataService, userPayNowService, userPayProcessService, userSeatReservationService } from "./userBookingService";
import { setUsersData } from "../user/userSlice";

export const userGetShowData = createAsyncThunk('userGetShowData', async (data,thunkAPI) =>{
    try {
        const response =  await userGetShowDataService(data); 
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userGetSingleShowData = createAsyncThunk('userGetSingleShowData', async ({data,token},thunkAPI) =>{
    try {
        const response =  await userGetSingleShowDataService(data,token); 
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userGetShowDataByMovie = createAsyncThunk('userGetShowDataByMovie', async (data,thunkAPI) =>{
    try {
        const response =  await userGetShowDataByMovieService(data); 
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userSeatReservation = createAsyncThunk('userSeatReservation', async ({data,token},thunkAPI) =>{
    try {
        const response =  await userSeatReservationService(data,token); 
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userPayNow = createAsyncThunk('userPayNow', async ({data,token},thunkAPI) =>{
    try {
        const response =  await userPayNowService(data,token); 
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userPayProcess = createAsyncThunk('userPayProcess', async ({data,token},thunkAPI) =>{
    try {
        const response =  await userPayProcessService(data,token); 
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})