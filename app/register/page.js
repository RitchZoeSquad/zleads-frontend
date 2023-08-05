"use client"
import React, { useState } from 'react'
import styles from "../../styles/register.module.css"
import logo from "../../public/images/logo.png"
import Image from 'next/image'
import Link from 'next/link'
function Page() {
    const [isChecked,setisChecked]=useState(true)
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <Image  alt="logo"  src={logo} width={100} height={100} />
        <div className={styles.welc}>
        SignUp
        </div>
        <p className={styles.loginToyourAcc}>
          Lets create your account 
        </p>
        <div className={styles.formItem}>
          <label htmlFor="Email">Email </label>
          <input className={styles.inp} placeholder='johndoe@gmail.com' type="text" id="Email" name="Email" />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="Password">Password </label>
          <input className={styles.inp} placeholder='Top Secret' type="password" id="Password" name="Password" />
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
      
<button className={styles.RegisterBtn}>
  Register
</button>

<div >Already have an account ? <Link href="/login" style={{"textDecoration":"none",color:"#ED6214"}} >Login</Link></div>
      </div>
    </div>
  )
}

export default Page
