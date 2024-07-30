import { createSlice } from "@reduxjs/toolkit";
import {
  userAddReview,
  userGetAllMovies,
  userGetBannerMovies,
  userGetMoviesByGenre,
  userGetOneMovie,
  userGetPerson,
  userGetReviews,
  userLikeUnlikeReview,
  userMovieQuery,
} from "./userMovieActions";

const initialState = {
  bannerMovies: null,
  recommendedMovies: null,
  moviesByGenre: null,
  allMoviesData: null,
  singleMovieDetail: null,
  hashtags: null,
  reviews: null,
  allPersonData: null,
  movieSearchs: null,
  success: false,
  error: "",
  loading: false,
  message: "",
};

const userMovieSlice = createSlice({
  name: "userMovie",
  initialState,
  reducers: {
    resetAllMoviesData: (state) => {
      state.allMoviesData = null;
    },
    resetUserMovieActions: (state) => {
      state.success = false;
      state.error = "";
      state.loading = false;
      state.message = "";
    },
    resetReviewData: (state) => {
      state.reviews = null;
      state.hashtags = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGetBannerMovies.fulfilled, (state, action) => {
        console.log(action);
        state.bannerMovies = action.payload?.resultData;
        state.loading = false;
      })
      .addCase(userGetBannerMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(userGetBannerMovies.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload?.reasons;
        state.loading = false;
      })
      .addCase(userGetMoviesByGenre.fulfilled, (state, action) => {
        console.log(action);
        state.moviesByGenre = action.payload?.resultData;
        state.loading = false;
      })
      .addCase(userGetMoviesByGenre.pending, (state) => {
        state.loading = true;
      })
      .addCase(userGetMoviesByGenre.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload?.reasons;
        state.loading = false;
      })
      .addCase(userGetAllMovies.fulfilled, (state, action) => {
        console.log(action);
        state.allMoviesData = state.allMoviesData
          ? [...state.allMoviesData, ...action.payload?.resultData]
          : action.payload?.resultData;
        state.loading = false;
      })
      .addCase(userGetAllMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(userGetAllMovies.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload?.reasons;
        state.loading = false;
      })
      // .addCase(userGetRecommendedMoviesWithLocation.fulfilled,(state,action)=>{
      //     console.log(action);
      //     state.recommendedMovies = action.payload?.resultData
      //     state.loading = false;
      // })
      // .addCase(userGetRecommendedMoviesWithLocation.pending,(state)=>{
      //     state.loading = true;
      // })
      // .addCase(userGetRecommendedMoviesWithLocation.rejected,(state,action)=>{
      //     console.log(action);
      //     state.error = action.payload?.reasons
      //     state.loading = false;
      // })
      .addCase(userGetPerson.fulfilled, (state, action) => {
        console.log(action);
        state.allPersonData = state.allPersonData
          ? [...state.allPersonData, action.payload?.resultData]
          : [action.payload?.resultData];
        state.loading = false;
      })
      .addCase(userGetPerson.pending, (state) => {
        state.loading = true;
      })
      .addCase(userGetPerson.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload?.reasons;
        state.loading = false;
      })
      // .addCase(userGetSingleMovie.fulfilled,(state,action)=>{
      //     console.log(action);
      //     state.recommendedMovies = state.recommendedMovies ? [...state.recommendedMovies , action.payload?.resultData] : [action.payload?.resultData]
      //     state.loading = false;
      // })
      // .addCase(userGetSingleMovie.pending,(state)=>{
      //     state.loading = true;
      // })
      // .addCase(userGetSingleMovie.rejected,(state,action)=>{
      //     console.log(action);
      //     state.error = action.payload?.reasons
      //     state.loading = false;
      // })
      .addCase(userGetOneMovie.fulfilled, (state, action) => {
        console.log(action);
        state.singleMovieDetail = action.payload?.resultData;
        state.loading = false;
      })
      .addCase(userGetOneMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(userGetOneMovie.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload?.reasons;
        state.loading = false;
      })
      .addCase(userMovieQuery.fulfilled, (state, action) => {
        console.log(action);
        state.movieSearchs = action.payload?.resultData;
        state.loading = false;
      })
      .addCase(userMovieQuery.pending, (state) => {
        state.loading = true;
      })
      .addCase(userMovieQuery.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload?.reasons;
        state.loading = false;
      })
      .addCase(userGetReviews.fulfilled, (state, action) => {
        console.log(action);
        state.hashtags = state.hashtags
          ? { ...state.hashtags, ...action.payload?.resultData?.hashtags }
          : action.payload?.resultData?.hashtags;
        state.reviews =
          state.reviews?.length > 0
            ? [...state.reviews, ...action.payload?.resultData?.reviewsList]
            : action.payload?.resultData?.reviewsList;
        state.loading = false;
      })
      .addCase(userGetReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(userGetReviews.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload?.reasons;
        state.loading = false;
      })
      .addCase(userAddReview.fulfilled, (state, action) => {
        console.log(action);
        if (action.payload?.resultData) {
          state.message = "Review added successfully.";
          state.reviews = null;
          state.hashtags = null;
        }
        state.loading = false;
      })
      .addCase(userAddReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(userAddReview.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload?.reasons;
        state.loading = false;
      })
      .addCase(userLikeUnlikeReview.fulfilled, (state, action) => {
        console.log(action);
        if (action.payload?.resultData) {
          const reviewData = action.payload?.resultData;
          console.log(reviewData);
          state.reviews = state.reviews.map((review) => {
            if (review?._id?.toString() === reviewData?._id?.toString()) {
              return {
                ...review,
                likes: reviewData?.likes,
                dislikes: reviewData?.dislikes,
                likedUsers: reviewData?.likedUsers,
                dislikedUsers: reviewData?.dislikedUsers,
              };
            }
            return review;
          });
        }
        state.loading = false;
      })
      .addCase(userLikeUnlikeReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLikeUnlikeReview.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload?.reasons;
        state.loading = false;
      });
  },
});

export const { resetAllMoviesData, resetUserMovieActions, resetReviewData } =
  userMovieSlice.actions;

export default userMovieSlice.reducer;
