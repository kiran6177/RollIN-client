import { createAsyncThunk } from "@reduxjs/toolkit";
import { userGetShowDataService, userGetSingleShowDataService } from "./userBookingService";
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