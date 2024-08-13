import { createAsyncThunk } from "@reduxjs/toolkit";
import { theatreBookSeatService, theatreCancelShowBookingsService, theatreGetBookingsByScreenService, theatreGetCollectionReportService, theatreGetCompleteBookingsService, theatreGetLatestOrdersService, theatreGetMovieCollectionsService, theatreGetScreenCollectionsService, theatreGetShowBookingStatusService, theatreGetSingleShowService } from "./theatreBookingService";
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

export const theatreGetScreenCollections = createAsyncThunk('theatreGetScreenCollections',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreGetScreenCollectionsService(data,token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreGetMovieCollections = createAsyncThunk('theatreGetMovieCollections',async ({token},thunkAPI)=>{
    try {
        const response =  await theatreGetMovieCollectionsService(token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreGetLatestOrders = createAsyncThunk('theatreGetLatestOrders',async ({token},thunkAPI)=>{
    try {
        const response =  await theatreGetLatestOrdersService(token);
        console.log(response.data);
        if(response.data?.newTheatreToken){
            thunkAPI.dispatch(setTheatreData({data:response.data.newTheatreData,token:response.data.newTheatreToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const theatreGetCollectionReport = createAsyncThunk('theatreGetCollectionReport',async ({data,token},thunkAPI)=>{
    try {
        const response =  await theatreGetCollectionReportService(data,token);
        console.log(response.data);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'RollIn-Collection-Report.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})