import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.js'
import adminReducer from '../features/admin/adminSlice.js'
import theatreReducer from '../features/theatre/theatreSlice.js'
import movieReducer from '../features/movie/movieSlice.js'

export const store = configureStore({
    reducer:{
        user: userReducer,
        admin:adminReducer,
        theatre:theatreReducer,
        movie:movieReducer
    }
})