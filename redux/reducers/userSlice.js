"use client"
import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
    name: 'users',
    initialState: {
        isloggedin:false,
        userdata:null,
        foundLeads:null,
        riskyLeads:null
    },
    reducers: {
     
      setdata(state,action){
        state.userdata=action.payload
      },
     
      setisLoggedin(state,action){
        state.isloggedin=action.payload
      },
      setfoundLeads(state,action){
        state.foundLeads=action.payload
      },
      setriskyLeads(state,action){
        state.riskyLeads=action.payload
      },
 
    },
  })


  export default UserSlice.reducer
  export const {setdata,setfoundLeads,setriskyLeads,setuserorders,setisLoggedin}=UserSlice.actions
  