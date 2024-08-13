import { createSlice } from "@reduxjs/toolkit"
import { theatreBookSeat, theatreCancelShowBookings, theatreGetBookingsByScreen, theatreGetCollectionReport, theatreGetCompleteBookings, theatreGetLatestOrders, theatreGetMovieCollections, theatreGetScreenCollections, theatreGetShowBookingStatus, theatreGetSingleShow } from "./theatreBookingActions"

const initialState = { 
    reservationStatus:null,
    screenshows:null,
    singleShowDetails:null,
    ordersData:null,
    screenCollections:null,
    movieCollections:null,
    latestOrders:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const theatreBookingSlice = createSlice({
    name:'theatreBooking',
    initialState,
    reducers:{
        resetOrdersData:(state)=>{
            state.ordersData = null
        },
        resetReservationStatus:(state)=>{
            state.reservationStatus = null
        },
        resetTheatreBookingActions:(state)=>{
            state.success = false
            state.error = ''
            state.loading = false
            state.message = ''
        },
        resetScreenShows:(state)=>{
            state.screenshows = null
        },
        resetCollections:(state)=>{
            state.screenCollections = null
            state.movieCollections = null
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
        .addCase(theatreGetBookingsByScreen.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.screenshows = state.screenshows?.length > 0 ? [...state.screenshows,...action.payload?.resultData] : action.payload?.resultData
            state.loading = false

        })
        .addCase(theatreGetBookingsByScreen.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetBookingsByScreen.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreGetSingleShow.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.singleShowDetails = action.payload?.resultData
            state.loading = false

        })
        .addCase(theatreGetSingleShow.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetSingleShow.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreGetCompleteBookings.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.ordersData = state?.ordersData?.length > 0 ? [...state?.ordersData,...action.payload?.resultData] : action.payload?.resultData
            state.loading = false
        })
        .addCase(theatreGetCompleteBookings.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetCompleteBookings.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreBookSeat.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.message = 'Seat Booked Successfully.'
            state.loading = false

        })
        .addCase(theatreBookSeat.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreBookSeat.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreGetScreenCollections.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.screenCollections = action.payload?.resultData
            state.loading = false

        })
        .addCase(theatreGetScreenCollections.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetScreenCollections.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreGetMovieCollections.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.movieCollections = action.payload?.resultData
            state.loading = false

        })
        .addCase(theatreGetMovieCollections.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetMovieCollections.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreGetLatestOrders.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.latestOrders = action.payload?.resultData
            state.loading = false

        })
        .addCase(theatreGetLatestOrders.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetLatestOrders.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
        .addCase(theatreGetCollectionReport.fulfilled,(state,action)=>{
            console.log(action);
            state.success = true
            state.message = 'Report Downloaded Successfully.'
            state.loading = false

        })
        .addCase(theatreGetCollectionReport.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetCollectionReport.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload?.reasons
        })
    }
})

export const { resetReservationStatus , resetTheatreBookingActions ,resetScreenShows , resetOrdersData, resetCollections} = theatreBookingSlice.actions;

export default theatreBookingSlice.reducer