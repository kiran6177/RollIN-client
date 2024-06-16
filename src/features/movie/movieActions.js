import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminAddMovieToDBService, adminGetAllTMDBMoviesService, adminGetMoviesFromDBService, adminGetTMDBMovieDetailService } from "./movieService";
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
