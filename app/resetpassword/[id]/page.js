"use client"
import React, { useState } from 'react'
import styles from "../../../styles/resetpassword.module.css"

import Image from 'next/image'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import { redirect, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

function Page({ params}) {
  const [password,setpassword]=useState('')
  const [Cpassowrd,setCpassword]=useState('')
  const [error,seterror]=useState('')
  const router=useRouter()
  const searchParam=useSearchParams()

  const email  = searchParam.get("email");
  

  const validate = () => {
    if (!Cpassowrd || !password) {
        seterror("Provide All Details Carefully!");
        return false;
    }
    if (Cpassowrd!==password) {
        seterror("Passwords does not matched!");
        return false;
    }
    if (password.length < 8) {
      seterror("Password should be at least 8 characters long.");
      return false;
  }

  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      seterror("Password must contain at least one special character.");
      return false;
  }


    seterror('')
    return true;
}
  const resetpassword=async()=>{

    let isValidated=validate();

    if(isValidated){
   

    const res=await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/resetpassword`,{
      Newpassword:password,
      code:params.id,
      email:email
    })

    if(res.data.success===true){
      toast.success(res.data.message)
      router.push("/login")
    }else{
      toast.error(`Error : ${res.data.message}`)
    }
  }
else{
toast.error(error)
}
  }
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <img  alt="logo"  src="https://d3k81nzjgcglm8.cloudfront.net/images/logo.png"  width={100} height={100} />
        <div className={styles.welc}>
          Create New Password
        </div>
        <div className={styles.formItem}>
          <label htmlFor="Password">New Password </label>
          <input value={password} onChange={(e)=>{setpassword(e.target.value)}} className={styles.inp} placeholder='Top Secret' type="text" id="Password" name="Password" />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="Confirm_Password">Confirm Password </label>
          <input value={Cpassowrd} onChange={(e)=>{setCpassword(e.target.value)}}  className={styles.inp} placeholder='Top Secret' type="text" id="Confirm_Password" name="Confirm_Password" />
        </div>

<button onClick={resetpassword} className={styles.loginBtn}>
Change Password
</button>

      </div>
      <Toaster position="bottom-center"/>



    </div>
  )
}

export default Page
