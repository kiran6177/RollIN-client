import {  createSlice } from "@reduxjs/toolkit";
import { adminLogin,adminGetTheatres,adminGetUsers,adminLogout,approveTheatre,blockUnblockTheatres,blockUnblockUsers } from "./adminActions";


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
        },
        setAdminsData:(state,action)=>{
            state.adminData = action.payload?.data
            state.adminToken = action.payload?.token
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
            state.error = action.payload?.reasons
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
            state.error = action.payload?.reasons
            state.loading = false
        })
        .addCase(adminGetUsers.fulfilled,(state,action)=>{
            console.log(action);
            state.usersData = action.payload.usersData
            if(action.payload?.newAdminToken){
                state.adminToken = action.payload?.newAdminToken;
                state.adminData = action.payload?.newAdminData 
            }
            state.loading = false
        })
        .addCase(adminGetUsers.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminGetUsers.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(blockUnblockUsers.fulfilled,(state,action)=>{
            console.log(action);
            const userData = action.payload.userData
            if(action.payload?.newAdminToken){
                state.adminToken = action.payload?.newAdminToken;
                state.adminData = action.payload?.newAdminData 
            }
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
            state.error = action.payload?.reasons
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(adminGetTheatres.fulfilled,(state,action)=>{
            console.log(action);
            state.theatresData = action.payload.TheatresData
            if(action.payload?.newAdminToken){
                state.adminToken = action.payload?.newAdminToken;
                state.adminData = action.payload?.newAdminData 
            }
            state.loading = false
        })
        .addCase(adminGetTheatres.pending,(state)=>{
            state.loading = true
        })
        .addCase(adminGetTheatres.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(blockUnblockTheatres.fulfilled,(state,action)=>{
            console.log(action);
            const theatreData = action.payload.theatreData
            if(action.payload?.newAdminToken){
                state.adminToken = action.payload?.newAdminToken;
                state.adminData = action.payload?.newAdminData 
            }
            state.theatresData = state.theatresData.map(theatre=>{
                if(theatre.id === theatreData.id){
                    return {
                        ...theatre,
                        isBlocked:theatreData.isBlocked,
                    }
                }
                return theatre
            })
            if(theatreData.isBlocked){
                state.message = "Theatre Blocked Successfully."
            }else{
                state.message = "Theatre Unblocked Successfully."
            }
            state.loading = false
        })
        .addCase(blockUnblockTheatres.pending,(state)=>{
            state.loading = true
        })
        .addCase(blockUnblockTheatres.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
        .addCase(approveTheatre.fulfilled,(state,action)=>{
            console.log(action);
            const theatreData = action.payload.theatreData
            if(action.payload?.newAdminToken){
                state.adminToken = action.payload?.newAdminToken;
                state.adminData = action.payload?.newAdminData 
            }
            state.theatresData = state.theatresData.map(theatre=>{
                if(theatre.id === theatreData.id){
                    return {
                        ...theatre,
                        isVerified:theatreData.isVerified,
                    }
                }
                return theatre
            })
            state.loading = false
        })
        .addCase(approveTheatre.pending,(state)=>{
            state.loading = true
        })
        .addCase(approveTheatre.rejected,(state,action)=>{
            console.log(action);
            state.error = action.payload?.reasons || ["Some Error Occured!!"]
            if(action.payload?.reasons && action.payload.reasons.length > 0 && action.payload.reasons[0] === 'UnAuthorized Admin!!'){
                state.adminData = null
                state.adminToken = null
                state.usersData = null
                state.theatresData = null
            }
            state.loading = false
        })
    }

})

export const { resetAdminActions , logoutAdmin ,setAdminsData} = adminSlice.actions

export default adminSlice.reducer