import {  createSlice } from '@reduxjs/toolkit';
import { googleAuth, userEditEmail, userEditProfile, userEditResend, userEmailLogin, userGetNotifications, userLogout, userProfileVerifyOtp, userResendOtp, userVerifyOtp } from './userActions';



const initialState = {
    userData: null,
    userToken:null,
    notifications:null,
    unread:null,
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
        resetNotifications:(state)=>{
            state.notifications = null
        },
        logoutUser:(state)=>{
            state.userData = null
            state.userToken = null
            state.success = false
            state.error = ''
            state.loading = false
            state.message = ''
            state.unread = null
        },
        setUsersData:(state,action)=>{
            state.userData = action.payload?.data
            state.userToken = action.payload?.token
        },
        setUnread:(state,action)=>{
            state.unread = action.payload
        },
        updateUnread:(state,action)=>{
            state.unread = state.unread?.length > 0 ? [...state.unread,action.payload] : [action.payload]
        }
    },
    extraReducers(builder){
        builder
        .addCase(googleAuth.fulfilled,(state,action)=>{
            state.userData = action.payload.data;
            state.userToken = action.payload.accessToken;
            state.success = true;
            state.loading = false
        })
        .addCase(googleAuth.pending,(state)=>{
            state.loading = true;
        })
        .addCase(googleAuth.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
        })
        .addCase(userLogout.fulfilled,(state,action)=>{
            state.message = action.payload.message;
            // if(action.payload?.newUserToken){
            //     state.userToken = action.payload?.newUserToken;
            //     state.userData = action.payload?.newUserData 
            // }
            state.loading = false
        })
        .addCase(userLogout.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userLogout.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
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
            state.error = action.payload?.reasons
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
            state.error = action.payload?.reasons
            state.loading = false;
        })
        .addCase(userEditProfile.fulfilled,(state,action)=>{
            console.log(action);
            if(action.payload?.resultData){
                state.userData = action.payload.resultData
                state.message = 'Profile Updated Successfully.'
            }
            state.success = true;
            state.loading = false;
        })
        .addCase(userEditProfile.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userEditProfile.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            if(action.payload && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized User!!'){
                state.userToken = null;
                state.userData = null;
            }
            state.loading = false;
        })
        .addCase(userEditEmail.fulfilled,(state,action)=>{
            console.log(action);
            if(action.payload?.resultData){
                console.log("EMAIL CHANGED LOGOUT");
                state.message = 'OTP is sent to your email.'
            }
            state.success = true;
            state.loading = false;
        })
        .addCase(userEditEmail.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userEditEmail.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            if(action.payload && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized User!!'){
                state.userToken = null;
                state.userData = null;
            }
            state.loading = false;
        })
        .addCase(userProfileVerifyOtp.fulfilled,(state,action)=>{
            console.log(action);
            if(action.payload?.resultData){
                state.userData = action.payload.resultData
                state.message = 'Email Updated Successfully.'
            }
            state.success = true;
            state.loading = false;
        })
        .addCase(userProfileVerifyOtp.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userProfileVerifyOtp.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            if(action.payload && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized User!!'){
                state.userToken = null;
                state.userData = null;
            }
            state.loading = false;
        })
        .addCase(userEditResend.fulfilled,(state,action)=>{
            console.log(action);
            if(action.payload.success){
                state.message = 'OTP Resend Successfully.'
            }
            // state.userData = action.payload.userData
            state.success = true;
            state.loading = false;
        })
        .addCase(userEditResend.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userEditResend.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            state.loading = false;
        })
        .addCase(userGetNotifications.fulfilled,(state,action)=>{
            console.log(action);
            state.notifications = state.notifications?.length > 0 ? [...state.notifications,...action.payload?.resultData] : action.payload?.resultData
            state.success = true;
            state.loading = false;
        })
        .addCase(userGetNotifications.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userGetNotifications.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            if(action.payload && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized User!!'){
                state.userToken = null;
                state.userData = null;
            }
            state.loading = false;
        })
    }
})

export const { resetActions , logoutUser , setUsersData , resetNotifications , setUnread , updateUnread } =  userSlice.actions

export default userSlice.reducer