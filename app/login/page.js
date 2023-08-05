import React from 'react'
import styles from "../../styles/login.module.css"
import logo from "../../public/images/logo.png"
import Image from 'next/image'
import Link from 'next/link'
function page() {
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <Image src={logo} width={100} height={100} />
        <div className={styles.welc}>
          Welcome to Zleads
        </div>
        <p className={styles.loginToyourAcc}>
          Login to your account
        </p>

        <div className={styles.formItem}>
          <label htmlFor="Email">Email </label>
          <input className={styles.inp} placeholder='johndoe@gmail.com' type="text" id="Email" name="Email" />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="Password">Password </label>
          <input className={styles.inp} placeholder='Top Secret' type="password" id="Password" name="Password" />
        </div>
        
        <Link className={styles.forgetpassword} href="/forgetpassword" >
        Forget Password ?
        </Link>

<button className={styles.loginBtn}>
  Login
</button>

<div >Dont have an account ? <Link href="/register" style={{"textDecoration":"none",color:"#ED6214"}} >Signup</Link></div>
      </div>
    </div>
  )
}

export default page
