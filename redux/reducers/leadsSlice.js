"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./EmailVerifierSlice";
import axios from "axios";

export const FoundResult=createAsyncThunk("foundLeads",async(data,thunkAPI)=>{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/services/googlePlacesApiSearch`, { query: data?.query, region: data?.Location?.value, typeOfSearch: data?.typeOfSearch, category: data?.Industry?.value }, { timeout: 300000, withCredentials: true, credentials: 'include' });
     
     thunkAPI.dispatch(setTypeOfSearch(data.typeOfSearch));
     thunkAPI.dispatch(setsearched(data.query));
     
     return res;
})

const LeadsSlice = createSlice({
    name: 'leads',
    initialState: {
        searchedText:'',
        foundResult:null,
        typeOfSearch:"withWebsite",
        status:STATUS.IDLE,
        error:null,
    },
    reducers: {
     
      setsearched(state,action){
        state.searchedText=action.payload
      },
      setTypeOfSearch(state,action){
        state.typeOfSearch=action.payload
      },
      setfoundResult(state,action){
        state.foundResult=action.payload
      },
    
    },
    extraReducers:(builder)=>{
        builder.addCase(FoundResult.pending,(state,action)=>{
            state.status=STATUS.LOADING
        }),
        builder.addCase(FoundResult.fulfilled ,(state,action)=>{
            if(action.payload.data.success===true){
                state.status=STATUS.IDLE
                state.foundResult=action.payload.data.message
            }else{
                state.status=STATUS.ERROR
                state.foundResult=null
                state.error=action.payload.data.message
            }
          
        }),
        builder.addCase(FoundResult.rejected,(state,action)=>{
            state.status=STATUS.ERROR
            state.error="Internal Server Error Occured!"
        })
    }
  })


export default LeadsSlice.reducer
export const {setsearched,setfoundResult,setTypeOfSearch}=LeadsSlice.actions
  