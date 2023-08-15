"use client"
import React from 'react'
import styles from "../styles/navbar.module.css"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'


function Navbar() {
  const router=useRouter()
  const users=useSelector((state)=>{return state.users})
    return (
    <nav className={styles.navbar}>
     {users.isloggedin?<Image onClick={()=>{router.push("/profile")}} src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${users.userdata.profilePhoto}`}  alt="profile_Picture" width={60} height={60}  className={styles.profile}    />:
    <div  onClick={()=>{router.push("/login")}} className={styles.log}  style={{color: "#ED6214"}}>Login</div>
  }
    </nav>
  )
}

export default Navbar
