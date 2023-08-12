"use client"
import Navbar from '../components/Navbar'
import React, { useEffect } from 'react'
import styles from "../styles/home.module.css"
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

function Page() {
  
  return (
    <div className={styles.container}>
  <Sidebar curentPage="home"/>
  <div className={styles.home}>
    <Navbar />
  </div>
    </div>
  )
}

export default Page
