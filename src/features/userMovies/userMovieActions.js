import { createAsyncThunk } from "@reduxjs/toolkit";
import { userAddReviewService, userGetAllMoviesService, userGetBannerMoviesService, userGetMoviesByGenreService, userGetPersonService, userGetRecommendedMoviesWithLocationService, userGetReviewsService, userGetSingleMovieService, userLikeUnlikeReviewService, userMovieQueryService } from "./userMovieService";
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

// export const userGetRecommendedMoviesWithLocation = createAsyncThunk('userGetRecommendedMoviesWithLocation', async (data,thunkAPI) =>{
//     try {
//         const response =  await userGetRecommendedMoviesWithLocationService(data); 
//         console.log(response.data);
//         // if(response.data?.newUserToken){
//         //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
//         // }
//         return response.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.error);
//     }
// })

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

// export const userGetSingleMovie = createAsyncThunk('userGetSingleMovie', async (data,thunkAPI) =>{
//     try {
//         const response =  await userGetSingleMovieService(data); 
//         console.log(response.data);
//         // if(response.data?.newUserToken){
//         //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
//         // }
//         return response.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.error);
//     }
// })

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

export const userMovieQuery = createAsyncThunk('userMovieQuery', async (data,thunkAPI) =>{
    try {
        const response =  await userMovieQueryService(data); 
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userGetReviews = createAsyncThunk('userGetReviews', async (data,thunkAPI) =>{
    try {
        const response =  await userGetReviewsService(data); 
        console.log(response.data);
        // if(response.data?.newUserToken){
        //     thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        // }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userAddReview = createAsyncThunk('userAddReview', async ({data,token},thunkAPI) =>{
    try {
        const response =  await userAddReviewService(data,token); 
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})

export const userLikeUnlikeReview = createAsyncThunk('userLikeUnlikeReview', async ({data,token},thunkAPI) =>{
    try {
        const response =  await userLikeUnlikeReviewService(data,token); 
        console.log(response.data);
        if(response.data?.newUserToken){
            thunkAPI.dispatch(setUsersData({data:response.data.newUserData,token:response.data.newUserToken}))
        }
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);
    }
})