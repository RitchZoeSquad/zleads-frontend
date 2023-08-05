import React from 'react'
import styles from "../styles/navbar.module.css"
import Image from 'next/image'

function Navbar() {
  return (
    <nav className={styles.navbar}>
     <Image alt="profile_Picture"  className={styles.profile} src="/images/profile.png"  />
    </nav>
  )
}

export default Navbar
