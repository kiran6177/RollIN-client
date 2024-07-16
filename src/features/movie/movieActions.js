import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminAddMovieToDBService, adminDisableMovieService, adminEnableMovieService, adminGetAllTMDBMoviesService, adminGetMoviesFromDBService, adminGetPersonsFromDBService, adminGetTMDBMovieDetailService } from "./movieService";
import { setAdminsData } from "../admin/adminSlice";


export const adminGetAllTMDBMovies = createAsyncThunk('adminGetAllMovies', async ({filters,token},thunkAPI) =>{
    try {
        const response = await adminGetAllTMDBMoviesService(filters,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetTMDBMovieDetail = createAsyncThunk('adminGetTMDBMovieDetail', async ({movieid,token},thunkAPI) =>{
    try {
        const response = await adminGetTMDBMovieDetailService(movieid,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminAddMovieToDB = createAsyncThunk('adminAddMovieToDB', async ({movieid,release_date,token},thunkAPI) =>{
    try {
        const response = await adminAddMovieToDBService(movieid,release_date,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetMoviesFromDB = createAsyncThunk('adminGetMoviesFromDB', async ({page,token},thunkAPI) =>{
    try {
        const response = await adminGetMoviesFromDBService(page,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetPersonsFromDB = createAsyncThunk('adminGetPersonsFromDB', async ({page,token},thunkAPI) =>{
    try {
        const response = await adminGetPersonsFromDBService(page,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminDisableMovie = createAsyncThunk('adminDisableMovie', async ({data,token},thunkAPI) =>{
    try {
        const response = await adminDisableMovieService(data,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminEnableMovie = createAsyncThunk('adminEnableMovie', async ({data,token},thunkAPI) =>{
    try {
        const response = await adminEnableMovieService(data,token);
        console.log(response.data);
        if(response.data?.newAdminToken){
            thunkAPI.dispatch(setAdminsData({data:response.data.newAdminData,token:response.data.newAdminToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})