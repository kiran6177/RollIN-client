import { createSlice } from "@reduxjs/toolkit"
import { userGetAllMovies, userGetBannerMovies, userGetMoviesByGenre, userGetOneMovie, userGetPerson, userMovieQuery } from "./userMovieActions";


const initialState = {
    bannerMovies:null,
    recommendedMovies:null,
    moviesByGenre:null,
    allMoviesData:null,
    singleMovieDetail:null,
    allPersonData:null,
    movieSearchs:null,
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
            state.error = action.payload?.reasons
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
            state.error = action.payload?.reasons
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
            state.error = action.payload?.reasons
            state.loading = false;
        })
        // .addCase(userGetRecommendedMoviesWithLocation.fulfilled,(state,action)=>{
        //     console.log(action);
        //     state.recommendedMovies = action.payload?.resultData
        //     state.loading = false;
        // })
        // .addCase(userGetRecommendedMoviesWithLocation.pending,(state)=>{
        //     state.loading = true;
        // })
        // .addCase(userGetRecommendedMoviesWithLocation.rejected,(state,action)=>{ 
        //     console.log(action);
        //     state.error = action.payload?.reasons
        //     state.loading = false;
        // })
        .addCase(userGetPerson.fulfilled,(state,action)=>{
            console.log(action);
            state.allPersonData = state.allPersonData ? [...state.allPersonData , action.payload?.resultData] : [action.payload?.resultData]
            state.loading = false;
        })
        .addCase(userGetPerson.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetPerson.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
        // .addCase(userGetSingleMovie.fulfilled,(state,action)=>{
        //     console.log(action);
        //     state.recommendedMovies = state.recommendedMovies ? [...state.recommendedMovies , action.payload?.resultData] : [action.payload?.resultData]
        //     state.loading = false;
        // })
        // .addCase(userGetSingleMovie.pending,(state)=>{
        //     state.loading = true;
        // })
        // .addCase(userGetSingleMovie.rejected,(state,action)=>{
        //     console.log(action);
        //     state.error = action.payload?.reasons
        //     state.loading = false;
        // })
        .addCase(userGetOneMovie.fulfilled,(state,action)=>{
            console.log(action);
            state.singleMovieDetail =  action.payload?.resultData
            state.loading = false;
        })
        .addCase(userGetOneMovie.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetOneMovie.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
        .addCase(userMovieQuery.fulfilled,(state,action)=>{
            console.log(action);
            state.movieSearchs =  action.payload?.resultData
            state.loading = false;
        })
        .addCase(userMovieQuery.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userMovieQuery.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
    }
})

export const { resetAllMoviesData } = userMovieSlice.actions

export default userMovieSlice.reducer