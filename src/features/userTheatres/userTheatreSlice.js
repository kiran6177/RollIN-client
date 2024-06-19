import { createSlice } from "@reduxjs/toolkit";
import { userGetTheatres } from "./userTheatreActions";

const initialState = {
    allTheatresData:null,
    singleScreenData:null,
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
            state.error = action.payload.reasons
            state.loading = false;
        })
    }
})

export const {} = userTheatreSlice.actions

export default userTheatreSlice.reducer