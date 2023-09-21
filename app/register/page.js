"use client"
import React, { useState } from 'react'
import styles from "../../styles/register.module.css"

import Image from 'next/image'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"

function Page() {
    const [isChecked,setisChecked]=useState(true)
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [error,seterror]=useState('')



    const validate = () => {
      if (!email || !password || !name || !isChecked) {
          seterror("Provide All Details Carefully!");
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
  
      // All checks passed, validation successful

      seterror('')
      return true;
  }
    const submithandler=async()=>{

      let isValidated=validate();

      if(isValidated){

      const res=await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/register`,{
        name,email,password
      })

      if(res.data.success===true){
        toast.success("Congratulations! 🎉 Your Registration is Complete. Verify Your Email to Unlock Your Zleads Account 📬")
      }else{
        toast.error(`Error :${res.data.message}`)

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
        SignUp
        </div>
        <p className={styles.loginToyourAcc}>
          Lets create your account 
        </p>
        <div className={styles.formItem}>
          <label htmlFor="Name">Name </label>
          <input value={name} onChange={(e)=>{setname(e.target.value)}} className={styles.inp} placeholder='John Doe' type="text" id="Name" name="Name" />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="Email">Email </label>
          <input  value={email} onChange={(e)=>{setemail(e.target.value)}}   className={styles.inp} placeholder='johndoe@gmail.com' type="text" id="Email" name="Email" />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="Password">Password </label>
          <input  value={password} onChange={(e)=>{setpassword(e.target.value)}}   className={styles.inp} placeholder='Top Secret' type="text" id="Password" name="Password" />
        </div>
         
        <div>

    </div>
    <label className={styles.AcceptTerms}>
        <input 
        style={{ margin:"0px 10px",backgroundColor:"#ED6214"  }}
          type="checkbox"
          checked={isChecked}
          onChange={()=>{isChecked ? setisChecked(false) : setisChecked(true)}}
        />
      By creating your account, you agree to our{' '}
        <Link style={{"textDecoration":"none",color:"#ED6214"}}  href="/terms">Terms and Conditions</Link> &{' '}
        <Link style={{"textDecoration":"none",color:"#ED6214"}}  href="/privacy">Privacy Policy</Link>
      </label>
      
<button onClick={submithandler} className={styles.RegisterBtn}>
  Register
</button>

<div >Already have an account ? <Link href="/login" style={{"textDecoration":"none",color:"#ED6214"}} >Login</Link></div>
      </div>
      <Toaster position="bottom-center"/>


    </div>
    
  )
}

export default Page
