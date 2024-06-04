import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { googleUserAuthService , userEmailLoginService, userLogoutService, userVerifyOtpService} from './userService';

export const googleAuth = createAsyncThunk('userGoogleAuth',async (tokenResponse,thunkAPI)=>{
    try {
        console.log(tokenResponse);
        const response = await googleUserAuthService(tokenResponse.access_token)
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userLogout = createAsyncThunk('userLogout', async(token,thunkAPI)=>{
    try {
        const response = await userLogoutService(token)
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userEmailLogin = createAsyncThunk('userEmailLogin', async (email,thunkAPI) =>{
    try {
        const response = await userEmailLoginService(email);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const userVerifyOtp = createAsyncThunk('userVerifyOtp', async ({id,otp},thunkAPI)=>{
    try {
        const response = await userVerifyOtpService(id,otp)
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})


const initialState = {
    userData: null,
    userToken:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        resetActions:(state)=>{
            state.success = false
            state.error = '';
            state.loading = false
            state.message = ''
        },
        logoutUser:(state)=>{
            state.userData = null
            state.userToken = null
            state.success = false
            state.error = ''
            state.loading = false
            state.message = ''
        }
    },
    extraReducers(builder){
        builder
        .addCase(googleAuth.fulfilled,(state,action)=>{
            state.userData = action.payload.data;
            state.userToken = action.payload.accessToken;
            state.success = true;
        })
        .addCase(googleAuth.pending,(state)=>{
            state.loading = true;
        })
        .addCase(googleAuth.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
        })
        .addCase(userLogout.fulfilled,(state,action)=>{
            state.message = action.payload.message;
        })
        .addCase(userLogout.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userLogout.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
        })
        .addCase(userEmailLogin.fulfilled,(state,action)=>{
            console.log(action);
            state.userData = action.payload.userData
            state.success = true;
            state.loading = false;
        })
        .addCase(userEmailLogin.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userEmailLogin.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            state.loading = false;
        })
        .addCase(userVerifyOtp.fulfilled,(state,action)=>{
            console.log(action);
            state.userData = action.payload.data
            state.userToken = action.payload.accessToken
            state.success = true;
            state.loading = false;
        })
        .addCase(userVerifyOtp.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userVerifyOtp.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            if(action?.payload?.reasons.length > 0 && action.payload.reasons[0] === 'Ooops. OTP timed out!!'){
                state.userData = null
            }
        })
    }
})

export const { resetActions , logoutUser } =  userSlice.actions

export default userSlice.reducer