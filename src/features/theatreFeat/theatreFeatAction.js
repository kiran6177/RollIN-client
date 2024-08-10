import { createAsyncThunk } from "@reduxjs/toolkit";
import { theatreAddScreenService, theatreChangeShowMovieService, theatreChangeTierOrderService, theatreEditScreenService, theatreEditTierService, theatreEnrollMovieService, theatreExtendMovieForScreenService, theatreGetAllMoviesService, theatreGetRunningMoviesService, theatreGetShowBookingStatusService, theatreGetTheatreDataService, theatreRemoveMovieFromScreenService } from "./theatreFeatService";
import { setTheatreData } from "../theatre/theatreSlice";

export const theatreGetTheatreData = createAsyncThunk('theatreGetTheatreData',async ({id,token},thunkAPI)=>{
    try {
        const response =  await theatreGetTheatreDataService(id,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreAddScreen = createAsyncThunk('theatreAddScreen',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreAddScreenService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreGetAllMovies = createAsyncThunk('theatreGetAllMovies',async ({filters,token},thunkAPI)=>{
    try {
        const response =  await theatreGetAllMoviesService(filters,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreEnrollMovie = createAsyncThunk('theatreEnrollMovie',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreEnrollMovieService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreEditScreen = createAsyncThunk('theatreEditScreen',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreEditScreenService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreRemoveMovieFromScreen = createAsyncThunk('theatreRemoveMovieFromScreen',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreRemoveMovieFromScreenService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreExtendMovieForScreen = createAsyncThunk('theatreExtendMovieForScreen',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreExtendMovieForScreenService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreEditTier = createAsyncThunk('theatreEditTier',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreEditTierService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreChangeTierOrder = createAsyncThunk('theatreChangeTierOrder',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreChangeTierOrderService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreChangeShowMovie = createAsyncThunk('theatreChangeShowMovie',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreChangeShowMovieService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreGetRunningMovies = createAsyncThunk('theatreGetRunningMovies',async ({token},thunkAPI)=>{
    try {
        const response =  await theatreGetRunningMoviesService(token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})