import Navbar from '../../components/Navbar'
import React from 'react'
import styles from "../../styles/foundleads.module.css"
import Sidebar from '../../components/Sidebar'

function page() {
  return (
    <div className={styles.container}>
  <Sidebar curentPage="foundleads"/>
  <div className={styles.home}>
    <Navbar />
  </div>
    </div>
  )
}

export default page
