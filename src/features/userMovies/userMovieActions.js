import { createAsyncThunk } from "@reduxjs/toolkit";
import { userGetAllMoviesService, userGetBannerMoviesService, userGetMoviesByGenreService, userGetRecommendedMoviesWithLocationService } from "./userMovieService";
import { setUsersData } from "../user/userSlice";

export const userGetBannerMovies = createAsyncThunk('userGetBannerMovies', async (data,thunkAPI) =>{
    try {
        const response =  await userGetBannerMoviesService(data); 
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userGetMoviesByGenre = createAsyncThunk('userGetMoviesByGenre', async (data,thunkAPI) =>{
    try {
        const response =  await userGetMoviesByGenreService(data);
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data.error);
    }
})

export const userGetAllMovies = createAsyncThunk('userGetAllMovies', async (filters,thunkAPI) =>{
    try {
        const response =  await userGetAllMoviesService(filters);
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data.error);
    }
})

export const userGetRecommendedMoviesWithLocation = createAsyncThunk('userGetRecommendedMoviesWithLocation', async (data,thunkAPI) =>{
    try {
        const response =  await userGetRecommendedMoviesWithLocationService(data); 
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})