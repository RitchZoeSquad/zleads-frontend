import Navbar from '../components/Navbar'
import React from 'react'
import styles from "../styles/home.module.css"
import Sidebar from '../components/Sidebar'

function page() {
  return (
    <div className={styles.container}>
  <Sidebar curentPage="home"/>
  <div className={styles.home}>
    <Navbar />
  </div>
    </div>
  )
}

export default page
