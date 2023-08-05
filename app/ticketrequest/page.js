import Navbar from '../../components/Navbar'
import React from 'react'
import styles from "../../styles/ticketrequest.module.css"
import Sidebar from '../../components/Sidebar'

function page() {
  return (
    <div className={styles.container}>
  <Sidebar curentPage="ticketrequest"/>
  <div className={styles.home}>
    <Navbar />
  </div>
    </div>
  )
}

export default page
