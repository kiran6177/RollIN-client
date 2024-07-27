import { createSlice } from "@reduxjs/toolkit";
import { userGetSingleTheatre, userGetTheatres, userTheatreQuery } from "./userTheatreActions";

const initialState = {
    allTheatresData:null,
    theatresDetailData:null,
    theatreSearchs:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const userTheatreSlice = createSlice({
    name:'userTheatre',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(userGetTheatres.fulfilled,(state,action)=>{
            console.log(action);
            state.allTheatresData = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userGetTheatres.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetTheatres.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ['Some error occured!!']
            state.loading = false;
        })
        .addCase(userGetSingleTheatre.fulfilled,(state,action)=>{
            console.log(action);
            state.theatresDetailData = state.theatresDetailData ? [...state.theatresDetailData,action.payload?.resultData] : [action.payload?.resultData]
            state.loading = false;
        })
        .addCase(userGetSingleTheatre.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetSingleTheatre.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ['Some error occured!!']
            state.loading = false;
        })
        .addCase(userTheatreQuery.fulfilled,(state,action)=>{
            console.log(action);
            state.theatreSearchs = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userTheatreQuery.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userTheatreQuery.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ['Some error occured!!']
            state.loading = false;
        })
    }
})

export const {} = userTheatreSlice.actions

export default userTheatreSlice.reducer