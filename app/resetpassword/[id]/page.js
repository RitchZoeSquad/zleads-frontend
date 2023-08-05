import React from 'react'
import styles from "../../../styles/resetpassword.module.css"
import logo from "../../../public/images/logo.png"
import Image from 'next/image'
import Link from 'next/link'
function page() {
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <Image src={logo} width={100} height={100} />
        <div className={styles.welc}>
          Create New Password
        </div>
        <div className={styles.formItem}>
          <label htmlFor="Password">New Password </label>
          <input className={styles.inp} placeholder='Top Secret' type="password" id="Password" name="Password" />
        </div>

        <div className={styles.formItem}>
          <label htmlFor="Confirm_Password">Confirm Password </label>
          <input className={styles.inp} placeholder='Top Secret' type="password" id="Confirm_Password" name="Confirm_Password" />
        </div>

<button className={styles.loginBtn}>
Change Password
</button>

      </div>
    </div>
  )
}

export default page
