import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser:null,
  loading:false,
  error:null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserSuccess:(state,action)=>{
        state.currentUser = action.payload;
        state.loading = false;
        state.error  =null;
    },
    deleteUserStart:(state)=>{
      state.loading=true;
    },
    deleteUserFailure:(state,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
})

export const { signInFailure, signInSuccess, signInStart,updateStart,updateUser,updateUserFailure,
deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserFailure,signOutUserSuccess,signOutUserStart} = userSlice.actions

export default userSlice.reducer