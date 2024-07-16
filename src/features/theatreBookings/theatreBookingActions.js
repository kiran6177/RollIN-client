import { createAsyncThunk } from "@reduxjs/toolkit";
import { theatreCancelShowBookingsService, theatreGetShowBookingStatusService } from "./theatreBookingService";
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