import { createAsyncThunk } from "@reduxjs/toolkit";
import { userGetAllMoviesService, userGetBannerMoviesService, userGetMoviesByGenreService, userGetPersonService, userGetRecommendedMoviesWithLocationService, userGetSingleMovieService } from "./userMovieService";
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

export const userGetPerson = createAsyncThunk('userGetPerson', async (data,thunkAPI) =>{
    try {
        const response =  await userGetPersonService(data); 
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userGetSingleMovie = createAsyncThunk('userGetSingleMovie', async (data,thunkAPI) =>{
    try {
        const response =  await userGetSingleMovieService(data); 
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userGetOneMovie = createAsyncThunk('userGetOneMovie', async (data,thunkAPI) =>{
    try {
        const response =  await userGetSingleMovieService(data); 
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})