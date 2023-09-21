"use client"
import React, { useState } from 'react'
import styles from "../../styles/forgetpassword.module.css"
import Image from 'next/image'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
function Page() {
  const [email,setemail]=useState('')
  const [error,seterror]=useState('')

  const validate = () => {
    if (!email ) {
        seterror("Provide All Details Carefully!");
        return false;
    }
    seterror('')
    return true;
}
  const forgetpassword=async()=>{
    let isValidated=validate();
    if(isValidated){
   
      const res=await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgetpassword`,{
        email
      })
  
      if(res.data.success===true){
        toast.success(res.data.message)
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
        <Image alt="logo" src="https://d3k81nzjgcglm8.cloudfront.net/images/logo.png" width={100} height={100} />
        <div className={styles.welc}>
         Forget Password
        </div>
        <p className={styles.instruction}>
        We will send instructions for resetting your account to your email 
        </p>

        <div className={styles.formItem}>
          <label htmlFor="Email">Email </label>
          <input value={email} onChange={(e)=>{setemail(e.target.value)}} className={styles.inp} placeholder='johndoe@gmail.com' type="text" id="Email" name="Email" />
        </div>


<button onClick={forgetpassword} className={styles.sendMail}>
  Send Email
</button>

      </div>
      <Toaster position="bottom-center"/>



    </div>
  )
}

export default Page
