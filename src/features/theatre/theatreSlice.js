import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { completeTheatreService, loginTheatreService, logoutTheatreService, signupTheatreService, theatreGetNotificationsService, theatreGoogleAuthService, theatreLoginOtpVerifyService, theatreProfileUpdateService, theatreRegisterOtpVerifyService, theatreResendOtpService } from "./theatreService";

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

export const theatreGoogleAuth = createAsyncThunk('theatreGoogleAuth', async (accessToken,thunkAPI) =>{
    try {
        const response = await theatreGoogleAuthService(accessToken)
        console.log(response.data);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const theatreLoginOtpVerify = createAsyncThunk('theatreLoginOtpVerify', async ({id,otp},thunkAPI)=>{
    try {
        const response = await theatreLoginOtpVerifyService(id,otp);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const theatreRegisterOtpVerify = createAsyncThunk('theatreRegisterOtpVerify', async ({id,otp},thunkAPI)=>{
    try {
        const response = await theatreRegisterOtpVerifyService(id,otp);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const theatreResendOtp = createAsyncThunk('theatreResendOtp', async (id,thunkAPI)=>{
    try {
        const response =  await theatreResendOtpService(id)
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const theatreProfileUpdate = createAsyncThunk('theatreProfileUpdate', async ({data,token},thunkAPI) =>{
    try {
        const response = await theatreProfileUpdateService(data,token)
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const theatreGetNotifications = createAsyncThunk('theatreGetNotifications', async ({data,token},thunkAPI) =>{
    try {
        const response = await theatreGetNotificationsService(data,token)
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
    unread:null,
    notifications:null,
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
            state.notifications = null
            state.unread = null
        },
        setTheatreData:(state,action)=>{
            state.theatreData = action.payload?.data
            state.theatreToken = action.payload?.token
        },
        resetTheatreNotifications:(state)=>{
            state.notifications = null
        },
        setTheatreUnread:(state,action)=>{
            state.unread = action.payload
        },
        updateTheatreUnread:(state,action)=>{
            state.unread = state.unread?.length > 0 ? [...state.unread,action.payload] : [action.payload]
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(theatreSignup.fulfilled,(state,action)=>{
            state.success = true
            state.theatreData = action.payload.theatreData
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
            if(action.payload.theatreData.isAccepted){
                state.success = true
            }
        })
        .addCase(theatreLogin.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreLogin.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            state.loading = false
        })
        .addCase(completeTheatre.fulfilled,(state,action)=>{
            console.log(action);
            state.loading = false
            if(action.payload.success){
                state.theatreData = null
                state.theatreToken = null
                state.message = "You are under verification for updated credentials."
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
        .addCase(theatreGoogleAuth.fulfilled,(state,action)=>{
            state.loading = false
            state.theatreData = action.payload.theatreData
            state.theatreToken = action.payload.accessToken
            state.success = true
        })
        .addCase(theatreGoogleAuth.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGoogleAuth.rejected,(state,action)=>{
            state.error = action.payload.reasons
            state.loading = false
        })
        .addCase(theatreLoginOtpVerify.fulfilled,(state,action)=>{
            console.log(action);
            state.loading = false
        })
        .addCase(theatreLoginOtpVerify.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreLoginOtpVerify.rejected,(state,action)=>{
            console.log(action);
            if(action?.payload?.reasons?.length > 0 && action?.payload?.reasons[0] === 'Registration completed. You are under verfication.'){
                state.theatreData = null
            }
            state.error = action.payload.reasons
            state.loading = false
        })
        .addCase(theatreRegisterOtpVerify.fulfilled,(state,action)=>{
            console.log(action);
            state.loading = false
            state.success = true
            state.theatreData = null
        })
        .addCase(theatreRegisterOtpVerify.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreRegisterOtpVerify.rejected,(state,action)=>{
            console.log(action);
            if(action?.payload?.reasons?.length > 0 && action?.payload?.reasons[0] === 'Registration completed. You are under verfication.'){
                state.theatreData = null
            }
            state.error = action.payload.reasons
            state.loading = false
        })
        .addCase(theatreResendOtp.fulfilled,(state,action)=>{
            console.log(action);
            state.loading = false
            if(action.payload.success){
                state.message = 'OTP Resend Successfully.'
            }
        })
        .addCase(theatreResendOtp.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreResendOtp.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            state.loading = false
        })
        .addCase(theatreProfileUpdate.fulfilled,(state,action)=>{
            console.log(action);
            state.loading = false
            if(action.payload?.success){
                if(action.payload?.theatreData.isBlocked){
                    state.theatreData = null
                    state.theatreToken = null
                }
                if(action.payload?.newTheatreData?.isBlocked){
                    state.theatreData = null
                    state.theatreToken = null
                }
                if(action.payload?.newTheatreToken){
                    state.theatreToken = action.payload?.newTheatreToken;
                    // state.theatreData = action.payload?.newTheatreData 
                }
                state.theatreData = action.payload.theatreData;
                state.message = "Updation Successfull."
            }else{
                state.theatreData = null;
                state.theatreToken = null;
                state.message = "New Credentials are under verfication."
            }
        })
        .addCase(theatreProfileUpdate.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreProfileUpdate.rejected,(state,action)=>{
            console.log(action.payload);
            if(action.payload && action.payload.reasons.length > 0 && (action.payload.reasons[0] === 'UnAuthorized Theatre!!' || action.payload.reasons[0] === 'You are temporarily blocked by admin!!') ){
                state.theatreToken = null;
                state.theatreData = null;
            }
            state.error = action.payload.reasons
            state.loading = false
        })
        .addCase(theatreGetNotifications.fulfilled,(state,action)=>{
            console.log(action);
            state.loading = false
            state.notifications = state.notifications?.length > 0 ? [...state.notifications,...action.payload?.resultData] : action.payload?.resultData
        })
        .addCase(theatreGetNotifications.pending,(state)=>{
            state.loading = true
        })
        .addCase(theatreGetNotifications.rejected,(state,action)=>{
            console.log(action.payload);
            if(action.payload && action.payload.reasons.length > 0 && (action.payload.reasons[0] === 'UnAuthorized Theatre!!' || action.payload.reasons[0] === 'You are temporarily blocked by admin!!') ){
                state.theatreToken = null;
                state.theatreData = null;
            }
            state.error = action.payload.reasons
            state.loading = false
        })
    }
})

export const  { resetTheatreActions,logoutTheatre ,setTheatreData , resetTheatreNotifications ,updateTheatreUnread , setTheatreUnread} = theatreSlice.actions

export default theatreSlice.reducer