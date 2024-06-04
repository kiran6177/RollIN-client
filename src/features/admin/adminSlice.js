import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminGetTheatresService, adminGetUsersService, blockUnblockTheatresService, blockUnblockUsersService, loginAdminService, logoutAdminService } from "./adminService";

export const adminLogin = createAsyncThunk('adminLogin',async({email,password},thunkAPI)=>{
    try {
        const response = await loginAdminService({email,password}) 
        return response.data;
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminLogout = createAsyncThunk('adminLogout',async (token,thunkAPI)=>{
    try {
        const response = await logoutAdminService(token);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error.message);
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetUsers = createAsyncThunk('adminGetUsers',async (token,thunkAPI) =>{
    try {
        const response = await adminGetUsersService(token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response.data.error
    }
})

export const blockUnblockUsers = createAsyncThunk('blockUnblockUsers', async ({userid,token},thunkAPI) =>{
    try {
        const response = await blockUnblockUsersService(userid,token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

export const adminGetTheatres = createAsyncThunk('adminGetTheatres',async (token,thunkAPI) =>{
    try {
        const response = await adminGetTheatresService(token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error.response.data.error
    }
})

export const blockUnblockTheatres = createAsyncThunk('blockUnblockTheatres', async ({theatreid,token},thunkAPI) =>{
    try {
        const response = await blockUnblockTheatresService(theatreid,token);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error)
    }
})

const initialState = {
    adminData: null,
    adminToken:null,
    usersData:null,
    theatresData:null,
    success:false,
    error:'',
    loading:false,
    message:''
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        resetAdminActions:(state)=>{
            state.error = ''
            state.loading = false
            state.message = ''
            state.success = ''
        },
        logoutAdmin:(state)=>{
            state.adminData = null
            state.adminToken = null
            state.usersData = null
            state.theatresData = null
            state.success = false
            state.error = ''
            state.loading = false
            state.message = ''
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.loading = false
            state.adminData = action.payload.data
            state.adminToken = action.payload.accessToken
            state.success = true
            state.message = 'Login Successfully.'
        })
        .addCase(adminLogin.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload.reasons
        })
        .addCase(adminLogout.fulfilled,(state,action)=>{
            console.log(action);
            state.message = action.payload.message
            state.loading = false
        })
        .addCase(adminLogout.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminLogout.rejected,(state,action)=>{
            state.error = action.payload.reasons
            state.loading = false
        })
        .addCase(adminGetUsers.fulfilled,(state,action)=>{
            console.log(action);
            state.usersData = action.payload
            state.loading = false
        })
        .addCase(adminGetUsers.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminGetUsers.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
            }
            state.loading = false
        })
        .addCase(blockUnblockUsers.fulfilled,(state,action)=>{
            console.log(action);
            const userData = action.payload.userData
            state.usersData = state.usersData.map(user=>{
                if(user.id === userData.id){
                    return {
                        ...user,
                        isVerified:userData.isVerified,
                    }
                }
                return user
            })
            state.loading = false
        })
        .addCase(blockUnblockUsers.pending,(state)=>{
            state.loading = true
        })
        .addCase(blockUnblockUsers.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
            }
            state.loading = false
        })
        .addCase(adminGetTheatres.fulfilled,(state,action)=>{
            console.log(action);
            state.theatresData = action.payload
            state.loading = false
        })
        .addCase(adminGetTheatres.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminGetTheatres.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
            }
            state.loading = false
        })
        .addCase(blockUnblockTheatres.fulfilled,(state,action)=>{
            console.log(action);
            const theatreData = action.payload.theatreData
            state.theatresData = state.theatresData.map(theatre=>{
                if(theatre.id === theatreData.id){
                    return {
                        ...theatre,
                        isBlocked:theatreData.isBlocked,
                    }
                }
                return theatre
            })
            state.loading = false
        })
        .addCase(blockUnblockTheatres.pending,(state)=>{
            state.loading = true
        })
        .addCase(blockUnblockTheatres.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload.reasons
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
            }
            state.loading = false
        })
    }

})

export const { resetAdminActions , logoutAdmin } = adminSlice.actions

export default adminSlice.reducer