import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import adminReducer from './admin/adminSlice';
import theatreReducer from './theatre/theatreSlice';
import movieReducer from './movie/movieSlice.js'
import userMovieReducer from './userMovies/userMovieSlice.js'
import userTheatreReducer from './userTheatres/userTheatreSlice.js'
import theatreFeatReducer from './theatreFeat/theatreFeatSlice.js'
import theatreBookingReducer from './theatreBookings/theatreBookingSlice.js'
import userBookingReducer from './userBooking/userBookingSlice.js'

const rootReducer = combineReducers({
    user: userReducer,
    admin:adminReducer,
    theatre:theatreReducer,
    movie:movieReducer,
    userMovie:userMovieReducer,
    userTheatre:userTheatreReducer,
    theatreFeat:theatreFeatReducer,
    theatreBooking:theatreBookingReducer,
    userBooking:userBookingReducer
})

export default rootReducer