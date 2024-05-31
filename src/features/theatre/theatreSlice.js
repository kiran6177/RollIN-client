import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { completeTheatreService, loginTheatreService, logoutTheatreService, signupTheatreService } from "./theatreService";

export const theatreSignup = createAsyncThunk('theatreSignup',async (data,thunkAPI)=>{
    try {
        const response = await signupTheatreService(data)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
});

export const theatreLogout = createAsyncThunk('theatreLogout',async (token,thunkAPI)=>{
    try {
        const response = await logoutTheatreService(token);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const theatreLogin = createAsyncThunk('theatreLogin', async (data,thunkAPI)=>{
    try {
        const response = await loginTheatreService(data);
        console.log(response);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const completeTheatre = createAsyncThunk('completeTheatre' , async ({data,token},thunkAPI)=>{
    try {
        const response = await completeTheatreService(data,token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

const initialState = {
    theatreData:null,
    theatreToken:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const theatreSlice = createSlice({
    name:'theatre',
    initialState,
    reducers:{
        resetTheatreActions:(state)=>{
            state.error = ''
            state.loading = false
            state.message = ''
            state.success = ''
        },
        logoutTheatre:(state)=>{
            state.theatreData = null
            state.theatreToken = null
            state.success = false
            state.error = ''
            state.loading = false
            state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(theatreSignup.fulfilled,(state)=>{
            state.success = true
            state.loading = false

        })
        .addCase(theatreSignup.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreSignup.rejected,(state,action)=>{
            console.log(action);
            state.loading = false
            state.error = action.payload.reasons
        })
        .addCase(theatreLogout.fulfilled,(state,action)=>{
            console.log(action);
            state.theatreData = null
            state.theatreToken = null
            state.success = true
            state.message = action.payload.message
            state.loading = false
        })
        .addCase(theatreLogout.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreLogout.rejected,(state,action)=>{
            console.log(action.payload.reasons[0]);
            state.error = action.payload.reasons
            state.loading = false
        })
        .addCase(theatreLogin.fulfilled,(state,action)=>{
            state.loading = false
            state.theatreData = action.payload.theatreData
            state.theatreToken = action.payload.accessToken
            state.success = true
        })
        .addCase(theatreLogin.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreLogin.rejected,(state,action)=>{
            state.error = action.payload.reasons
            state.loading = false
        })
        .addCase(completeTheatre.fulfilled,(state,action)=>{
            console.log(action);
            state.loading = false
            if(!action.payload.theatreData.isVerified){
                state.theatreData = null
                state.theatreToken = null
                state.message = "You are under verification for updated credentials."
            }else{
            state.theatreData = action.payload.theatreData
            state.success = true;
            state.message = "Profile Updated Successfully."
            }
        })
        .addCase(completeTheatre.pending,(state)=>{
            state.loading = true
        })
        .addCase(completeTheatre.rejected,(state,action)=>{
            console.log(action.payload);
            if(action.payload && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Theatre!!'){
                state.theatreToken = null;
                state.theatreData = null;
            }
            state.error = action.payload.reasons
            state.loading = false
        })
    }
})

export const  { resetTheatreActions,logoutTheatre } = theatreSlice.actions

export default theatreSlice.reducer