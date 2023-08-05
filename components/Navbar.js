import React from 'react'
import styles from "../styles/navbar.module.css"
import profile from "../public/images/profile.png"
import Image from 'next/image'

function Navbar() {
  return (
    <nav className={styles.navbar}>
     <Image alt="profile_Picture"  className={styles.profile} src={profile}  />
    </nav>
  )
}

export default Navbar
