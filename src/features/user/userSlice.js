import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { googleUserAuthService , userLogoutService} from './userService';

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
            state.pending = true;
        })
        .addCase(googleAuth.rejected,(state,action)=>{
            state.error = action.payload
        })
        .addCase(userLogout.fulfilled,(state,action)=>{
            state.message = action.payload.message;
        })
        .addCase(userLogout.pending,(state)=>{
            state.pending = true;
        })
        .addCase(userLogout.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload
        })
    }
})

export const { resetActions , logoutUser } =  userSlice.actions

export default userSlice.reducer