import { createAsyncThunk } from "@reduxjs/toolkit";
import { theatreBookSeatService, theatreCancelShowBookingsService, theatreGetBookingsByScreenService, theatreGetCompleteBookingsService, theatreGetShowBookingStatusService, theatreGetSingleShowService } from "./theatreBookingService";
import { setTheatreData } from "../theatre/theatreSlice";

export const theatreGetShowBookingStatus = createAsyncThunk('theatreGetShowBookingStatus',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreGetShowBookingStatusService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreCancelShowBookings = createAsyncThunk('theatreCancelShowBookings',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreCancelShowBookingsService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreGetBookingsByScreen = createAsyncThunk('theatreGetBookingsByScreen',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreGetBookingsByScreenService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreGetSingleShow = createAsyncThunk('theatreGetSingleShow',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreGetSingleShowService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreGetCompleteBookings = createAsyncThunk('theatreGetCompleteBookings',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreGetCompleteBookingsService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreBookSeat = createAsyncThunk('theatreBookSeat',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreBookSeatService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})