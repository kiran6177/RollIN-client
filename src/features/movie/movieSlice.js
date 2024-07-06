import { createSlice } from "@reduxjs/toolkit";
import { adminAddMovieToDB, adminDisableMovie, adminEnableMovie, adminGetAllTMDBMovies, adminGetMoviesFromDB, adminGetPersonsFromDB, adminGetTMDBMovieDetail } from "./movieActions";

const initialState = {
    moviesData:null,
    personData:null,
    addMoviesData:null,
    singleMovieDetail:null,
    singlePersonDetail:null,
    success:'',
    error:'',
    loading:false,
    message:'',
    resetToken:null,
    resetData:null
}

const movieSlice = createSlice({
    name:'movie',
    initialState,
    reducers:{
        resetMovieActions:(state)=>{
            state.error = ''
            state.loading = false
            state.message = ''
            state.success = ''
        },
        resetAddMovies:(state)=>{
            state.addMoviesData = null
        },
        resetDBMovies:(state)=>{
            state.moviesData = null
        },
        setSingleMovie:(state,action)=>{
            console.log(action);
            state.singleMovieDetail = action.payload
        },
        setSinglePerson:(state,action)=>{
            console.log(action);
            state.singlePersonDetail = action.payload
        },
        resetPersons:(state)=>{
            state.personData = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminGetAllTMDBMovies.fulfilled,(state,action)=>{
            console.log(action);
            state.addMoviesData = state.addMoviesData ? [...state.addMoviesData,...action.payload?.resultData] : action.payload?.resultData
            state.loading = false
        })
        .addCase(adminGetAllTMDBMovies.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminGetAllTMDBMovies.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ["Some Error Occured!!"]
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(adminGetTMDBMovieDetail.fulfilled,(state,action)=>{
            console.log(action);
            state.singleMovieDetail = action.payload.resultData;
            state.loading = false
        })
        .addCase(adminGetTMDBMovieDetail.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminGetTMDBMovieDetail.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ["Some Error Occured!!"]
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(adminAddMovieToDB.fulfilled,(state,action)=>{
            console.log(action);
            // state.singleMovieDetail = action.payload.resultData;
            if(action.payload?.resultData){
                state.message = 'Movie Added Successfully.'
            }
            state.loading = false
        })
        .addCase(adminAddMovieToDB.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminAddMovieToDB.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ["Some Error Occured!!"]
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(adminGetMoviesFromDB.fulfilled,(state,action)=>{
            console.log(action);
            state.moviesData = state.moviesData ? [...state.moviesData,...action.payload?.resultData] : action.payload?.resultData
            state.loading = false
        })
        .addCase(adminGetMoviesFromDB.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminGetMoviesFromDB.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ["Some Error Occured!!"]
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(adminGetPersonsFromDB.fulfilled,(state,action)=>{
            console.log(action);
            state.personData = state.personData ? [...state.personData,...action.payload?.resultData] : action.payload?.resultData
            state.loading = false
        })
        .addCase(adminGetPersonsFromDB.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminGetPersonsFromDB.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ["Some Error Occured!!"]
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(adminDisableMovie.fulfilled,(state,action)=>{
            console.log(action);
            if(action.payload?.resultData){
                state.message = 'Movie Disabled Successfully.'
            }
            state.loading = false
        })
        .addCase(adminDisableMovie.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminDisableMovie.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ["Some Error Occured!!"]
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(adminEnableMovie.fulfilled,(state,action)=>{
            console.log(action);
            if(action.payload?.resultData){
                state.message = 'Movie Enabled Successfully.'
            }
            state.loading = false
        })
        .addCase(adminEnableMovie.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminEnableMovie.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ["Some Error Occured!!"]
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
    }
})
export const { resetMovieActions ,resetAddMovies ,resetDBMovies ,setSingleMovie ,resetPersons , setSinglePerson} = movieSlice.actions;

export default movieSlice.reducer