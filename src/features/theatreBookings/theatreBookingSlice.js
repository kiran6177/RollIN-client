import { createSlice } from "@reduxjs/toolkit"
import { theatreCancelShowBookings, theatreGetShowBookingStatus } from "./theatreBookingActions"

const initialState = { 
    reservationStatus:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const theatreBookingSlice = createSlice({
    name:'theatreBooking',
    initialState,
    reducers:{
        resetReservationStatus:(state)=>{
            state.reservationStatus = null
        },
        resetTheatreBookingActions:(state)=>{
            state.success = false
            state.error = ''
            state.loading = false
            state.message = ''
        } 
    },
    extraReducers:(builder)=>{
        builder
        .addCase(theatreGetShowBookingStatus.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.reservationStatus = action.payload?.resultData
            state.loading = false

        })
        .addCase(theatreGetShowBookingStatus.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetShowBookingStatus.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreCancelShowBookings.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            if(action.payload?.resultData){
                state.message = 'Cancellation Successfull.'
            }
            state.loading = false

        })
        .addCase(theatreCancelShowBookings.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreCancelShowBookings.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
    }
})

export const { resetReservationStatus , resetTheatreBookingActions} = theatreBookingSlice.actions;

export default theatreBookingSlice.reducer