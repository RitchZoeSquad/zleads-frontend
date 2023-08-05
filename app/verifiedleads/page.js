import Navbar from '../../components/Navbar'
import React from 'react'
import styles from "../../styles/verifiedleads.module.css"
import Sidebar from '../../components/Sidebar'

function Page() {
  return (
    <div className={styles.container}>
  <Sidebar curentPage="verifiedleads"/>
  <div className={styles.home}>
    <Navbar />
  </div>
    </div>
  )
}

export default Page
