"use client"

import { configureStore } from "@reduxjs/toolkit";
import usereducers from "../reducers/userSlice"
import leadsSlice from "../reducers/leadsSlice";
import  EmailVerifierSlice  from "../reducers/EmailVerifierSlice";


export default  configureStore({
    
reducer:{
  users:usereducers,
  leads:leadsSlice,
  emailverifier:EmailVerifierSlice
}        ,
middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });