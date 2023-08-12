"use client"
import React, { useState } from 'react'
import styles from "../../styles/login.module.css"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { setdata, setisLoggedin } from '@/redux/reducers/userSlice';
import { useRouter } from 'next/navigation';
function Page() {

  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [error,seterror]=useState('')

  const dispatch=useDispatch()

  const router=useRouter()

  const validate = () => {
    if (!email || !password) {
        seterror("Provide All Details Carefully!");
        return false;
    }
    seterror('')
    return true;
}
  const submithandler=async()=>{
  
    console.log("url",`${process.env.NEXT_PUBLIC_SERVER_URL}`)
    let isValidated=validate();

    if(isValidated){
   
    const res=await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,{
      email,password
    })

    if(res.data.success===true){
      toast.success("Login Successfull")

      dispatch(setisLoggedin(true))
      dispatch(setdata(res.data.message))

      router.push("/")

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
        <Image alt="logo"   src="/images/logo.png" width={100} height={100} />
        <div className={styles.welc}>
          Welcome to Zleads
        </div>
        <p className={styles.loginToyourAcc}>
          Login to your account
        </p>

        <div className={styles.formItem}>
          <label htmlFor="Email">Email </label>
          <input value={email} onChange={(e)=>{setemail(e.target.value)}} className={styles.inp} placeholder='johndoe@gmail.com' type="text" id="Email" name="Email" />
        </div>
            
        <div className={styles.formItem}>
          <label htmlFor="Password">Password </label>
          <input  value={password} onChange={(e)=>{setpassword(e.target.value)}}  className={styles.inp} placeholder='Top Secret' type="password" id="Password" name="Password" />
        </div>
        
        <Link className={styles.forgetpassword} href="/forgetpassword" >
        Forget Password ?
        </Link>

<button onClick={submithandler} className={styles.loginBtn}>
  Login
</button>

<div >Dont have an account ? <Link href="/register" style={{"textDecoration":"none",color:"#ED6214"}} >Signup</Link></div>
      </div>
      <Toaster position="top-right"/>

    </div>
  )
}

export default Page
