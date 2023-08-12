"use client"

import { configureStore } from "@reduxjs/toolkit";
import usereducers from "../reducers/userSlice"


export default  configureStore({
    
reducer:{
  users:usereducers
}        
  });