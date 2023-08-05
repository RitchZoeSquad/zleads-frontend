import React from 'react'
import styles from "../../styles/verifyemail.module.css"

import Image from 'next/image'
import Link from 'next/link'
function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <Image alt="logo"   src="/images/logo.png" width={100} height={100} />
        <div className={styles.welc}>
        OTP Verification
        </div>
        <p className={styles.instruction}>
       Enter the OTP below that you had recieved through your email
        </p>

        <div className={styles.formItem}>
          <label htmlFor="Email">Enter OTP </label>
          <input className={styles.inp} placeholder='0123' type="number"   id="Email" name="Email" />
        </div>


<button className={styles.sendMail}>
Verify
</button>

      </div>
    </div>
  )
}

export default Page
