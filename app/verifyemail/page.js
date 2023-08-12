"use client"
import React, { useEffect, useState } from 'react'
import styles from "../../styles/verifyemail.module.css"
import toast, { Toaster } from 'react-hot-toast';

import Image from 'next/image'
import Link from 'next/link'
import {  useRouter,notFound} from 'next/navigation'
import axios from "axios"

function Page() {
  const router=useRouter()
 const [otp,setotp]=useState('')
 const [error,seterror]=useState('')



 const validate = () => {
  if (!otp ) {
      seterror("Provide All Details Carefully!");
      return false;
  }
  seterror('')
  return true;
}

  const verifyotp=async()=>{
    let isValidated=validate();
if(isValidated){

    const res=await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/verifyemail`,{code:otp})
     if(res.data.success===true){
      toast.success("Email Verified Successfully")
      router.push("/login")
     }else{
      toast.error(res.data.message)
     }
}
else{
  toast.error(error)
  }
  }

 


return(

  <div className={styles.container}>
      <div className={styles.loginForm}>
        <Image alt="logo"   src="/images/logo.png" width={100} height={100} />
        <div className={styles.welc}>
        Email Verification
        </div>
        <p className={styles.instruction}>
       Enter the Verification Token below that you had recieved through your email
        </p>

        <div className={styles.formItem}>
          <label htmlFor="Email">Enter Token </label>
          <input value={otp} onChange={(e)=>{setotp(e.target.value)}} className={styles.inp} placeholder='0123' type="text"   id="Email" name="Email" />
        </div>


<button onClick={verifyotp} className={styles.sendMail}>
Verify
</button>

      </div>
      <Toaster position="top-right"/>

    </div>
  )
}
export default Page
