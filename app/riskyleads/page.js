import Navbar from '../../components/Navbar'
import React from 'react'
import styles from "../../styles/riskyleads.module.css"
import Sidebar from '../../components/Sidebar'

function page() {
  return (
    <div className={styles.container}>
  <Sidebar curentPage="riskyleads"/>
  <div className={styles.home}>
    <Navbar />
  </div>
    </div>
  )
}

export default page
