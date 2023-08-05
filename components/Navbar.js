import React from 'react'
import styles from "../styles/navbar.module.css"
import Image from 'next/image'

function Navbar() {
  return (
    <nav className={styles.navbar}>
     <Image src="/images/user.png"  alt="profile_Picture" width={60} height={60}  className={styles.profile}   />
    </nav>
  )
}

export default Navbar
