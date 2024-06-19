import { createSlice } from "@reduxjs/toolkit"
import { userGetAllMovies, userGetBannerMovies, userGetMoviesByGenre } from "./userMovieActions";


const initialState = {
    bannerMovies:null,
    moviesByGenre:null,
    allMoviesData:null,
    singleMovieDetail:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const userMovieSlice = createSlice({
    name:'userMovie',
    initialState,
    reducers:{
        resetAllMoviesData:(state)=>{
            state.allMoviesData = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(userGetBannerMovies.fulfilled,(state,action)=>{
            console.log(action);
            state.bannerMovies = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userGetBannerMovies.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetBannerMovies.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            state.loading = false;
        })
        .addCase(userGetMoviesByGenre.fulfilled,(state,action)=>{
            console.log(action);
            state.moviesByGenre = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userGetMoviesByGenre.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetMoviesByGenre.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            state.loading = false;
        })
        .addCase(userGetAllMovies.fulfilled,(state,action)=>{
            console.log(action);
            state.allMoviesData = state.allMoviesData ? [...state.allMoviesData,...action.payload?.resultData] : action.payload?.resultData
            state.loading = false;
        })
        .addCase(userGetAllMovies.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetAllMovies.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            state.loading = false;
        })
    }
})

export const { resetAllMoviesData } = userMovieSlice.actions

export default userMovieSlice.reducer