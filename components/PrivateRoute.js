import React from 'react';
import { useSelector } from 'react-redux';
import { redirect, useRouter } from 'next/navigation'

const ProtectedRoute = ({children}) => {
  const {isloggedin} = useSelector(state => state.users);

   if(isloggedin===false){
       redirect('/login')
   }else{
    return children;
   }
};

export default ProtectedRoute;
