import { createAsyncThunk } from "@reduxjs/toolkit";
import { userGetAllMoviesService, userGetBannerMoviesService, userGetMoviesByGenreService } from "./userMovieService";
import { setUsersData } from "../user/userSlice";

export const userGetBannerMovies = createAsyncThunk('userGetBannerMovies', async (_,thunkAPI) =>{
    try {
        const response =  await userGetBannerMoviesService();
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userGetMoviesByGenre = createAsyncThunk('userGetMoviesByGenre', async (_,thunkAPI) =>{
    try {
        const response =  await userGetMoviesByGenreService();
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