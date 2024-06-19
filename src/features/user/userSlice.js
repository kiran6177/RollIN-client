import {  createSlice } from '@reduxjs/toolkit';
import { googleAuth, userEmailLogin, userLogout, userResendOtp, userVerifyOtp } from './userActions';



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
        },
        setUsersData:(state,action)=>{
            state.userData = action.payload?.data
            state.userToken = action.payload?.token
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
            // if(action.payload?.newUserToken){
            //     state.userToken = action.payload?.newUserToken;
            //     state.userData = action.payload?.newUserData 
            // }
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
            localStorage.removeItem('otpTime')
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
                localStorage.removeItem('otpTime')
                state.userData = null
            }
        })
        .addCase(userResendOtp.fulfilled,(state,action)=>{
            console.log(action);
            if(action.payload.success){
                state.message = 'OTP Resend Successfully.'
            }
            // state.userData = action.payload.userData
            state.success = true;
            state.loading = false;
        })
        .addCase(userResendOtp.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userResendOtp.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            state.loading = false;
        })
    }
})

export const { resetActions , logoutUser , setUsersData} =  userSlice.actions

export default userSlice.reducer