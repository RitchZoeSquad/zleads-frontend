import React from 'react'
import styles from "../../styles/forgetpassword.module.css"
import logo from "../../public/images/logo.png"
import Image from 'next/image'
import Link from 'next/link'
function page() {
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <Image src={logo} width={100} height={100} />
        <div className={styles.welc}>
         Forget Password
        </div>
        <p className={styles.instruction}>
        We will send instructions for resetting your account to your email 
        </p>

        <div className={styles.formItem}>
          <label htmlFor="Email">Email </label>
          <input className={styles.inp} placeholder='johndoe@gmail.com' type="text" id="Email" name="Email" />
        </div>


<button className={styles.sendMail}>
  Send Email
</button>

      </div>
    </div>
  )
}

export default page
