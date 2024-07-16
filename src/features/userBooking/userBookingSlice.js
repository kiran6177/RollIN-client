import { createSlice } from "@reduxjs/toolkit"
import { userGetShowData, userGetShowDataByMovie, userGetSingleShowData, userPayNow, userPayProcess, userSeatReservation } from "./userBookingActions";

const initialState = {
    singleTheatreShows:null,
    singleMovieShows:null,
    singleShowData:null,
    selectedSeats:null,
    payment_data:null,
    booking_data:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const userBookingSlice = createSlice({
    name:'userBooking',
    initialState,
    reducers:{
        resetUserBookings:(state)=>{
            state.success = false
            state.error = ''
            state.loading = false
            state.message = ''
        },
        setSelectedSeats:(state,action)=>{
            state.selectedSeats = action.payload
        },
        resetSelectedSeats:(state)=>{
            state.selectedSeats = null
        },
        resetPaymentStatus:(state)=>{
            state.payment_data = null
        },
        resetBookingData:(state)=>{
            state.booking_data = null
        }
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
        .addCase(userGetShowDataByMovie.fulfilled,(state,action)=>{
            console.log(action);
            state.singleMovieShows = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userGetShowDataByMovie.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetShowDataByMovie.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
        .addCase(userSeatReservation.fulfilled,(state,action)=>{
            console.log(action);
            state.message = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userSeatReservation.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userSeatReservation.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
        .addCase(userPayNow.fulfilled,(state,action)=>{
            console.log(action);
            state.payment_data = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userPayNow.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userPayNow.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
        .addCase(userPayProcess.fulfilled,(state,action)=>{
            console.log(action);
            state.booking_data = action.payload?.resultData
            state.loading = false;
        })
        .addCase(userPayProcess.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userPayProcess.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
    }
})

export const { resetUserBookings , setSelectedSeats , resetSelectedSeats , resetPaymentStatus ,resetBookingData} = userBookingSlice.actions;

export default userBookingSlice.reducer;  