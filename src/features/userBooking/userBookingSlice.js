import { createSlice } from "@reduxjs/toolkit"
import { userGetShowData, userGetSingleShowData } from "./userBookingActions";

const initialState = {
    singleTheatreShows:null,
    singleShowData:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const userBookingSlice = createSlice({
    name:'userBooking',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(userGetShowData.fulfilled,(state,action)=>{
            console.log(action);
            state.singleTheatreShows = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userGetShowData.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetShowData.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
        .addCase(userGetSingleShowData.fulfilled,(state,action)=>{
            console.log(action);
            state.singleShowData = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userGetSingleShowData.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetSingleShowData.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
    }
})

export const {} = userBookingSlice.actions;

export default userBookingSlice.reducer; 