import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js'
import adminReducer from '../features/admin/adminSlice.js'
import theatreReducer from '../features/theatre/theatreSlice.js'
import movieReducer from '../features/movie/movieSlice.js'
import userMovieReducer from '../features/userMovies/userMovieSlice.js'
import userTheatreReducer from '../features/userTheatres/userTheatreSlice.js'
import theatreFeatReducer from '../features/theatreFeat/theatreFeatSlice.js'
import theatreBookingReducer from '../features/theatreBookings/theatreBookingSlice.js'
import userBookingReducer from '../features/userBooking/userBookingSlice.js'

export const store = configureStore({
    reducer:{
        user: userReducer,
        admin:adminReducer,
        theatre:theatreReducer,
        movie:movieReducer,
        userMovie:userMovieReducer,
        userTheatre:userTheatreReducer,
        theatreFeat:theatreFeatReducer,
        theatreBooking:theatreBookingReducer,
        userBooking:userBookingReducer
    }
})