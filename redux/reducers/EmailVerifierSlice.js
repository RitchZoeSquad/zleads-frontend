"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const STATUS=Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading'
})

export const EmailVerifier=createAsyncThunk("emailverfier",async(data)=>{
    const res=await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/services/verifyEmail`,{email:data}, { withCredentials: true,credentials: 'include'});   
      return res;
  })

const EmailVerifierSlice = createSlice({
    name: 'emailverifier',
    initialState: {
        status:STATUS.IDLE,
        data:null,
        error:null,
    },
    reducers: {
        setData(state,action){
            state.data=action.payload
          },
        setStatus(state,action){
            state.status=action.payload
          },
     
    },
    extraReducers: (builder)=>{
        
        builder.addCase(EmailVerifier.pending,(state,action)=>{
            state.status=STATUS.LOADING
        }),
        builder.addCase(EmailVerifier.fulfilled,(state,action)=>{
            if(action.payload.data.success===true){
                state.status=STATUS.IDLE
                state.data=action.payload.data.message
            }else{
                state.status=STATUS.ERROR
                state.error=action.payload.data.message
            }
          
        }),
        builder.addCase(EmailVerifier.rejected,(state,action)=>{
            state.status=STATUS.ERROR
            state.error="Internal Server Error Occured!"
        })
    }
  })



export default EmailVerifierSlice.reducer
export const {setData,setStatus}=EmailVerifierSlice.actions
export {STATUS}