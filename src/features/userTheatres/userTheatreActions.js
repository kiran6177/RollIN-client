import { createAsyncThunk } from "@reduxjs/toolkit";
import { userGetSingleTheatreService, userGetTheatresService } from "./userTheatresService";

export const userGetTheatres = createAsyncThunk('userGetTheatres',async (data,thunkAPI)=>{
    try {
        const response =  await userGetTheatresService(data);
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userGetSingleTheatre = createAsyncThunk('userGetSingleTheatre',async (data,thunkAPI)=>{
    try {
        const response =  await userGetSingleTheatreService(data);
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.error);
    }
})