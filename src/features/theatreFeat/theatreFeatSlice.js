import { createSlice } from "@reduxjs/toolkit";
import { theatreAddScreen, theatreEditScreen, theatreEnrollMovie, theatreExtendMovieForScreen, theatreGetAllMovies, theatreGetTheatreData, theatreRemoveMovieFromScreen } from "./theatreFeatAction";

const initialState = {
    theatreScreenData:null,
    singleScreenData:null,
    editScreenData:null,
    moviesList:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const theatreFeatSlice = createSlice({
    name:'theatreFeat',
    initialState,
    reducers:{
        resetTheatreFeatActions:(state)=>{
            state.success = false
            state.loading = false
            state.error = ''
            state.message = ''
        },
        setEditData:(state,action)=>{
            state.editScreenData = action.payload
        },
        resetMovieList:(state)=>{
            state.moviesList = null
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(theatreGetTheatreData.fulfilled,(state,action)=>{
            state.success = true
            state.theatreScreenData = action.payload?.resultData
            state.loading = false

        })
        .addCase(theatreGetTheatreData.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetTheatreData.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreAddScreen.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.message = 'Screen added successfully.'
            state.loading = false

        })
        .addCase(theatreAddScreen.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreAddScreen.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreGetAllMovies.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.moviesList = state.moviesList ? [...state.moviesList,...action.payload?.resultData] : action.payload?.resultData
            state.loading = false

        })
        .addCase(theatreGetAllMovies.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetAllMovies.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreEnrollMovie.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            if(action.payload?.resultData){
                state.message = 'Movie Enrolled Successfully.'
                state.theatreScreenData = state.theatreScreenData.map(screen=>{
                    if(screen._id === action.payload?.resultData?._id){
                        return action.payload?.resultData
                    }
                    return screen
                })
            }
            state.loading = false

        })
        .addCase(theatreEnrollMovie.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreEnrollMovie.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreEditScreen.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            if(action.payload?.resultData){
                state.message = 'Screen Updated Successfully.'
                state.theatreScreenData = state.theatreScreenData.map(screen=>{
                    if(screen._id === action.payload?.resultData?._id){
                        return action.payload?.resultData
                    }
                    return screen
                })
            }
            state.loading = false

        })
        .addCase(theatreEditScreen.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreEditScreen.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreRemoveMovieFromScreen.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            if(action.payload?.resultData){
                state.message = 'Movie Removed Successfully.'
                state.theatreScreenData = state.theatreScreenData.map(screen=>{
                    if(screen._id === action.payload?.resultData?._id){
                        return action.payload?.resultData
                    }
                    return screen
                })
            }
            state.loading = false

        })
        .addCase(theatreRemoveMovieFromScreen.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreRemoveMovieFromScreen.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreExtendMovieForScreen.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            if(action.payload?.resultData){
                state.message = 'Movie Extended Successfully.'
                state.theatreScreenData = state.theatreScreenData.map(screen=>{
                    if(screen._id === action.payload?.resultData?._id){
                        return action.payload?.resultData
                    }
                    return screen
                })
            }
            state.loading = false

        })
        .addCase(theatreExtendMovieForScreen.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreExtendMovieForScreen.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
    }
})

export const { resetTheatreFeatActions , resetMovieList } = theatreFeatSlice.actions

export default theatreFeatSlice.reducer